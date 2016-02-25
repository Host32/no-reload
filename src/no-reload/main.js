/*global window, module, require*/
(function () {
    'use strict';
    var NR = {
        Promise: require('./utils/promise')
    };

    window.NR = module.exports = NR;
}());