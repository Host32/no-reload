/*global window, module, require*/
(function () {
    'use strict';

    var helpers = require('./utils/helpers'),
        NR = helpers.clone(helpers);

    NR.Promise = require('./utils/promise');

    /**
     * @classdesc <p>No-Reload main namespace</p>
     * 
     * @module NR
     * @namespace
     */
    window.NR = module.exports = NR;
}());
