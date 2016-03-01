/*global window, module, require*/
(function () {
    'use strict';

    require('./promises');
    require('./http');

    var helpers = require('./helpers'),
        $moduleProvider = require('./module-provider'),
        NR = helpers.clone(helpers);

    NR.Promise = require('./promise');

    NR.run = function () {
        return $moduleProvider.invoke.apply(null, arguments);
    };

    NR.defModule = function () {
        $moduleProvider.define.apply(null, arguments);
    };

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
