/*global window, module, require*/
(function () {
    'use strict';

    /**
     * @classdesc <p>No-Reload main namespace</p>
     * 
     * @module NR
     * @namespace
     */
    window.NR = module.exports = {
        Promise: require('./utils/promise')
    };
}());
