/*global module, require*/
(function () {
    'use strict';
    var Promise = require('./promise'),

        $config = require('./config'),

        $http = require('./http'),

        ModuleError = require('./module-error'),

        modules = {},

        queues = {},

        LOAD_TECHNIQUES = {
            XHR_EVAL: 'xhr_eval',
            XHR_INJECTION: 'xhr_injection',
            SCRIPT_DOM_ELEMENT: 'script_dom_element'
        };

    $config.set('lazyLoadDeps', true);
    $config.set('scriptLoadTechnique', LOAD_TECHNIQUES.XHR_INJECTION);

    /**
     * Adds a `/` to the end of the folder name
     *
     * @param   {string}   folder Folder name
     * @returns {string}
     */
    function safeFolderName(folder) {
        return (folder.substr(folder.length - 1, 1) === '/') ? folder : (folder + '/');
    }

    /**
     * Convert the characters `.` and `_` to `/` to locate the dependency in folder system
     *
     * Ex:
     * package.subpackage.dep -> package/subpackage/dep
     * packate_subpackage_dep -> package/subpackage/dep
     *
     * @param   {string}   name Dependency name
     * @returns {string}
     */
    function packageToFile(name) {
        return name.replace('.', '/') + '.js';
    }

    /**
     * Adds a version query param to end of the file name if the current app is versioned.
     *
     * @param   {string} url
     * @returns {string} Versioned url
     */
    function versione(url) {
        var appVersion = $config.get('appVersion');
        return url + (appVersion ? ('?version=' + appVersion) : '');
    }

    /**
     * <p>Resolve the path when the module is declared based on code conventions.
     * By default, the modules are located on `app/modules`</p>
     * <p>A module called `myPackage.myModule` is resolved as
     * `app/modules/myPackage/myModule.js?version=x.x.x`, the version flag is setted in
     * accourd of appVersion config.</p>
     *
     * @param   {string} name Module name
     * @returns {string} The destination path to script that declare the module.
     */
    function resolveModulePath(name) {
        return versione(safeFolderName($config.get('modulesFolder')) + packageToFile(name));
    }

    /**
     * Use eval
     *
     * @param {string} url
     */
    function loadByXhrEval(url) {
        $http.request({
            url: url,
            dataType: 'text/javascript'
        }).then(function (response) {
            /*jslint evil: true */
            eval(response);
        }, function () {
            throw new ModuleError('module-provider', 'error when trying to inject a script by XHR Eval', {
                showStack: true
            });
        });
    }

    /**
     * Create a script element and insert the script content inside it
     *
     * @param {string} url
     */
    function loadByXhrInjection(url) {
        $http.request({
            url: url,
            dataType: 'text/javascript'
        }).then(function (response) {
            var scriptElement = document.createElement('script');
            document.getElementsByTagName('head')[0].appendChild(scriptElement);
            scriptElement.text = response;
        }, function () {
            throw new ModuleError('module-provider', 'error when trying to inject a script by XHR Injection', {
                showStack: true
            });
        });
    }

    /**
     * Create a script element and set the src attribute as the url
     *
     * @param {string} url
     */
    function loadByScriptDomElement(url) {
        var scriptElement = document.createElement('script');
        scriptElement.src = url;
        document.getElementsByTagName('head')[0].appendChild(scriptElement);
    }

    /**
     * <p>Load a remote script using the thecnique defined in `scriptLoadTechnique` config.</p>
     * <p>The default thecnique is `xhr_injection`</p>
     *
     * @method
     * @param {string} url Script url
     */
    function loadScript(url) {
        var thecnique = $config.get('scriptLoadTechnique');

        switch (thecnique) {
            case LOAD_TECHNIQUES.XHR_EVAL:
                return loadByXhrEval(url);
            case LOAD_TECHNIQUES.XHR_INJECTION:
                return loadByXhrInjection(url);
            case LOAD_TECHNIQUES.SCRIPT_DOM_ELEMENT:
                return loadByScriptDomElement(url);
        }
    }

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
        return new Promise(function (resolve, reject) {
            task(function () {
                if (!modules[name]) {
                    if (!$config.get('lazyLoadDeps')) {
                        reject(new ModuleError('$moduleProvider', 'The dependency' + name + ' has not defined and the system is not configured to load dependencies lazily'));
                    }

                    modules[name] = {};

                    putOnQueue(name, resolve);

                    loadScript(resolveModulePath(name));
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
        return new Promise(function (resolve, reject) {
            task(function () {
                var promises = deps.map(function (dep) {
                    return loadDependency(dep);
                });

                Promise.all(promises).then(function (loadedDependencies) {
                    resolve(func.apply(scope || null, loadedDependencies));
                }, function (error) {
                    reject(error);
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
            }, function (error) {
                throw error;
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
        },

        /**
         * <p>Removes a module previously registered.</p>
         *
         * @param {string} name The module name
         */
        remove: function (name) {
            if (!modules[name]) {
                return;
            }

            delete modules[name];
        }
    };
}());
