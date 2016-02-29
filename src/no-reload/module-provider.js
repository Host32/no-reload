/*global module, require*/
(function () {
    'use strict';
    var Promise = require('./promise'),

        modules = {},

        queues = {},

        load = null;

    function forEach(arr, func) {
        var length = arr ? arr.length : 0,
            i;
        for (i = 0; i < length; i += 1) {
            func(arr[i], i);
        }
    }

    /**
     * Execute a asynchronous task
     *
     * @param {string} func
     */
    function task(func) {
        setTimeout(func, 0);
    }

    /**
     * Put a resolve callback on queue list
     *
     * @param {string} name Dependency name
     * @param {function} func Callback
     */
    function putOnQueue(name, func) {
        if (!queues[name]) {
            queues[name] = [];
        }
        queues[name].push(func);
    }

    /**
     * Execute all resolve functions in queue list for this dependency
     *
     * @param {string} name Dependency name
     */
    function runQueue(name) {
        forEach(queues[name], function (func) {
            func(modules[name].obj);
        });
        delete queues[name];
    }

    /**
     * Assynchronous dependency loading
     *
     * @param {string} name Dependency name
     * @returns {Promise} A promise that will be resolved when the dependency has been declared
     */
    function loadDependency(name) {
        return new Promise(function (resolve) {
            task(function () {
                if (!modules[name]) {
                    if (!load) {
                        throw "Module Loader has not defined";
                    }

                    modules[name] = {};

                    putOnQueue(name, resolve);

                    load(name, function (obj) {
                        if (obj) {
                            modules[name] = {
                                obj: obj
                            };
                            resolve(modules[name].obj);
                        }
                    });
                } else {
                    if (modules[name].obj !== undefined) {
                        resolve(modules[name].obj);
                    } else {
                        putOnQueue(name, resolve);
                    }
                }
            });
        });
    }

    /**
     * Extract arguments names of a function
     *
     * @param   {function} func
     * @returns {string[]} Arguments list
     */
    function getFuncArgs(func) {
        var args = /^function\s*[\w\d$_]*\(([\w\d,_$\s]*)\)/.exec(func.toString())[1];
        return args === '' ? [] : args.replace(/\s+/gm, '').split(",");
    }

    /**
     * Execute the dependency injection for a function
     *
     * @param   {function} func Function with dependencies
     * @param   {Array} deps The explicit dependencies
     * @param   {Object} [scope=null] The scope when the function is be called
     * @returns {Promise} A Promisse that will be resolved when all the dependencies has be resolved
     *                    and the function returns will be passed to the resolve function
     */
    function invoke(func, deps, scope) {
        return new Promise(function (resolve) {
            task(function () {
                var promises = deps.map(function (dep) {
                    return loadDependency(dep);
                });

                Promise.all(promises).then(function (loadedDependencies) {
                    resolve(func.apply(scope || null, loadedDependencies));
                });
            });
        });
    }

    /**
     * Use the function arguments to extract the module options
     *
     * @param   {Array} args Can be [name, function, scope] or [name, [dep1, dep2, ..., function], scope]
     *                       when the name and scope are optional
     * @returns {Module}
     */
    function createModule(args) {
        var info,
            obj = {},
            copy;

        if (typeof args[0] === 'string') {
            obj.name = args[0];
            info = args[1];
            obj.scope = args[2] || null;
        } else {
            info = args[0];
            obj.scope = args[1] || null;
        }

        if (typeof info === 'function') {
            obj.deps = getFuncArgs(info);
            obj.func = info;
        } else {
            copy = info.slice(0);
            obj.func = copy.pop();
            obj.deps = copy;
        }

        return obj;
    }

    /**
     * <p></p>
     *
     * @module $moduleProvider
     * @memberof NR
     */
    module.exports = {

        /**
         * <p></p>
         *
         * @typedef {Object} Module
         * @property {String} name Module name
         * @property {Object} scope Module scope
         * @property {String[]} deps Module dependencies
         * @property {function} func Module declaration function
         * @property {Object} obj Declared Module
         */

        /**
         * <p>Declare a module executing the dependency injection for it and saving
         * the module return in ModuleProvider as a new dependency that can be injected</p>
         *
         * @param {String} name Module name
         * @param {function|Array} info Module declaration, can be a function when the
         *                              deps is the arguments names or a array when the firsts
         *                              arguments are the deps and the last argument is the function
         * @param {Object} [scope] Module scope
         */
        define: function () {
            var moduleObj = createModule(arguments),
                target;

            if (moduleObj.name) {
                //We are checking whether module is requested or loaded.
                //if target object is available + dependencies, it means that we have duplicates
                //if we have only target but not dependencies, it means that module was requested by get call and module
                //has been downloaded and now the real module is registering it self.
                target = modules[moduleObj.name];
                if (target && target.deps) {
                    return;
                }
                modules[moduleObj.name] = moduleObj;
            }

            invoke(moduleObj.func, moduleObj.deps, moduleObj.scope).then(function (obj) {
                modules[moduleObj.name].obj = obj;
                runQueue(moduleObj.name);
            });
        },

        /**
         * <p>Execute the dependency injection for a function</p>
         *
         * @param {function|Array} info Function that will be invoked, can be a function when the
         *                              deps is the arguments names or a array when the firsts
         *                              arguments are the deps and the last argument is the function
         * @param {Object} [scope] Scope where the function will be invoked
         * @returns {Promise} A Promisse that will be resolved when all the dependencies has be resolved
         *                    and the function returns will be passed to the resolve function
         */
        invoke: function () {
            var moduleObj = createModule(arguments);
            return invoke(moduleObj.func, moduleObj.deps, moduleObj.scope);
        },

        /**
         * <p>Return a declared module by their name</p>
         *
         * @param {string} name Name of the module
         * @returns {Object}
         */
        getModule: function (name) {
            if (modules[name]) {
                return modules[name].obj;
            }
            return null;
        }
    };
}());
