/*global window, module, require*/
(function () {
    'use strict';

    /**
     * Teste
     * @constructor
     */
    var NR = {
        Promise: require('./utils/promise')
    };

    window.NR = module.exports = NR;
}());