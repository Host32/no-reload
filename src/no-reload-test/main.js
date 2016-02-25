/*global window, module, require*/
(function () {
    'use strict';

    var NRTest = require('qunitjs');
    NRTest.start();

    window.NRTest = module.exports = NRTest;
}());