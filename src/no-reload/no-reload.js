/*global window, module, require*/
(function () {
    'use strict';

    var helpers = require('./helpers'),

        NR = helpers.clone(helpers),

        $confs = require('./confs'),

        $moduleProvider = require('./module-provider'),

        $promises = require('./promises'),

        $http = require('./http'),

        $nameResolver = require('./name-resolver'),

        $scriptLoader = require('./script-loader');


    // Define the modules on Dependecy Injector
    $moduleProvider.define('$confs', function () {
        return $confs;
    });
    $moduleProvider.define('$promises', function () {
        return $promises;
    });
    $moduleProvider.define('$http', function () {
        return $http;
    });
    $moduleProvider.define('$nameResolver', function () {
        return $nameResolver;
    });
    $moduleProvider.define('$scriptLoader', function () {
        return $scriptLoader;
    });
    $moduleProvider.define('$moduleProvider', function () {
        return $moduleProvider;
    });


    NR.Promise = require('./promise');

    /**
     * <p>Define and return the app version</p>
     *
     * @function
     * @memberof NR
     * @param   {string} [version] App version to set
     * @returns {string} Current app version
     */
    NR.appVersion = function (version) {
        if (helpers.isDefined(version)) {
            $confs.set('appVersion', version);
            return version;
        } else {
            return $confs.get('appVersion');
        }
    };

    /**
     * <p>Define and return the current enviroment</p>
     *
     * @function
     * @memberof NR
     * @param   {string} [version] App enviroment to set
     * @returns {string} Current app enviroment
     */
    NR.enviroment = function (env) {
        if (helpers.isDefined(env)) {
            $confs.set('enviroment', env);
            return env;
        } else {
            return $confs.get('enviroment');
        }
    };

    /**
     * <p>Execute the dependency injection for a function</p>
     *
     * @function
     * @memberof NR
     * @param {function|Array} info Function that will be invoked, can be a function when the
     *                              deps is the arguments names or a array when the firsts
     *                              arguments are the deps and the last argument is the function
     * @param {Object} [scope] Scope where the function will be invoked
     * @returns {Promise} A Promisse that will be resolved when all the dependencies has be resolved
     *                    and the function returns will be passed to the resolve function
     */
    NR.run = function () {
        return $moduleProvider.invoke.apply(null, arguments);
    };

    /**
     * <p>Declare a module executing the dependency injection for it and saving
     * the module return as a new dependency that can be injected</p>
     *
     * @function
     * @memberof NR
     * @param {String} name Module name
     * @param {function|Array} info Module declaration, can be a function when the
     *                              deps is the arguments names or a array when the firsts
     *                              arguments are the deps and the last argument is the function
     * @param {Object} [scope] Module scope
     */
    NR.defModule = function () {
        $moduleProvider.define.apply(null, arguments);
    };


    /**
     * <p>Removes a module previously registered.</p>
     *
     * @function
     * @memberof NR
     * @param {string} name The module name
     */
    NR.undefModule = function (name) {
        $moduleProvider.remove(name);
    };

    /**
     * @classdesc <p>No-Reload main namespace</p>
     *
     * @module NR
     * @namespace
     */
    window.NR = module.exports = NR;
}());
