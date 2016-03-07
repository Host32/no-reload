/*global module, require*/
(function () {
    'use strict';

    var $config = require('./config');

    /**
     * Adds a `/` to the end of the folder name
     *
     * @param   {string}   folder Folder name
     * @returns {string}
     */
    function safeFolderName(folder) {
        return folder.endsWith('/') ? folder : (folder + '/');
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
        return name.replace('.', '/').replace('_', '/') + '.js';
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
     * <p>Resolver for locate the script path of some dependencies</p>
     *
     * @module $pathResolver
     * @memberof NR
     */
    module.exports = {
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
        resolveModulePath: function (name) {
            return versione(safeFolderName($config.get('modulesFolder')) + packageToFile(name));
        }
    };

}());
