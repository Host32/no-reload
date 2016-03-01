/*global module, require*/
(function () {
    'use strict';

    var $confs = require('./confs');

    function safeFolderName(folder) {
        return folder.endsWith('/') ? folder : (folder + '/');
    }

    function unpackName(name) {
        return name.replace('.', '/');
    }

    function versione(url) {
        var appVersion = $confs.get('appVersion');
        return url + (appVersion ? ('?version=' + appVersion) : '');
    }

    /**
     * <p></p>
     *
     * @module $pathResolver
     * @memberof NR
     */
    module.exports = {
        modulePath: function (name) {
            return versione(safeFolderName($confs.get('modulesFolder')) + unpackName(name) + '.js');
        }
    };

}());
