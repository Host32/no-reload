/*global module, require*/
(function () {
    'use strict';

    /**
     * <p>Promises are a way to deal with asynchronous operations - that is, 
     * operations that don't complete immediately. 
     * The way to interact with a promise is with its then() method. </p>
     * <p>No-Reload uses the {@link http://docs.ractivejs.org/latest/promises|Ractive.Promise} 
     * implementation. </p>
     *
     * @module utils/promise
     * @class
     * @see {@link http://docs.ractivejs.org/latest/promises|Ractive Promises}
     */
    module.exports = require('Ractive').Promise;
}());