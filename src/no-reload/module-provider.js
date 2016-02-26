/*global module, require*/
(function () {
    'use strict';
    var Promise = require('promise'),

        modules = {};

    /**
     * <p></p>
     *
     * @module $moduleProvider
     * @memberof NR
     */
    module.exports = {

        /**
         * <p></p>
         *
         * @typedef {Object} Module
         * @property {String} name Module name
         * @property {Object} scope Module scope
         * @property {String[]} deps Module dependencies
         * @property {function} func Module declaration function
         */

        /**
         * <p></p>
         *
         * @param {String} name Module name
         * @param {function|Array} info Module declaration
         * @param {Object} [scope] Module scope
         */
        define: function () {

        },

        /**
         * <p></p>
         *
         * @param {function|Array} info Function that will be invoked
         * @param {Object} [scope] Scope where the function will be invoked
         */
        invoke: function () {

        },

        /**
         * <p></p>
         *
         * @param {string} name Name of the module that will be removed
         */
        clear: function () {

        },

        /**
         * <p></p>
         *
         * @param {string} name Name of the module that will be removed
         * @returns {Module} The Module especification saved in ModuleProvider
         */
        getModule: function () {

        }
    };
}());
