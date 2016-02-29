/*global window, module, require*/
(function () {
    'use strict';

    var helpers = require('./helpers'),
        NR = helpers.clone(helpers);

    NR.Promise = require('./promise');

    /**
     * @classdesc <p>No-Reload main namespace</p>
     * 
     * @module NR
     * @namespace
     */
    window.NR = module.exports = NR;
}());
