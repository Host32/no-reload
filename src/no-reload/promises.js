/*global module, require*/
(function () {
    'use strict';

    var Promise = require('./promise');

    /**
     * <p>Injectable wrapper for Promise class</p>
     *
     * @module $promises
     * @memberof NR
     */
    module.exports = {

        /**
         * <p>Create a new Promise</p>
         *
         * @param {function} func Function that will execute something asynchronously and be
         *                        responsible for resolving or rejecting promise
         * @returns {NR.Promise}
         * @see {@link http://docs.ractivejs.org/latest/promises|Ractive Promises}
         */
        create: function (callback) {
            return new Promise(callback);
        },

        /**
         * <p>Returns a Promise that will be resolved when all of the promises passed as paramethers
         * has be resolved</p>
         * <pre>
         * $promises.all([
         *   ajax.get( 'list.json' ),       // loads our app data
         *   new Promise(someFunc)          // another async process
         * ]).then( function ( results ) {
         *   var ajaxData = results[0];
         *   //...
         * });
         * </pre>
         *
         * @param   {Array|Object} promises Async tasks
         * @returns {Promise}
         */
        all: function (promises) {
            return Promise.all(promises);
        }
    };

}());
