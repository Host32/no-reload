/*global module, require*/
(function () {
    'use strict';

    /**
     * <p>Instantiate a new Promise that will be resolved or rejected in a asynchronous proccess.</p>
     *
     * @classdesc <p>Promises are a way to deal with asynchronous operations - that is, 
     * operations that don't complete immediately. 
     * The way to interact with a promise is with its then() method. </p>
     * <p>No-Reload uses the {@link http://docs.ractivejs.org/latest/promises|Ractive.Promise} 
     * implementation. </p>
     * <p>Usage examples:</p>
     * <pre>
     * var p = new NR.Promise( function ( resolve, reject ) {
     *     doSomethingAsync( function ( error, result ) {
     *         if ( error ) {
     *              reject( error );
     *         }
     *
     *         resolve( result );
     *     });
     * });
     *
     * p.then(function () {
     *     // any transitions resulting from operation have now completed
     *    alert( 'transitions complete!' );
     * });
     * </pre>
     *
     * @param {callback} resolve Function called when the promise is resolved with success.
     * @param {callback} reject Fnction called when the primise is rejected because a error or something else.
     * @memberof NR
     * @class Promise
     * @see {@link http://docs.ractivejs.org/latest/promises|Ractive Promises}
     */
    module.exports = require('Ractive').Promise;

}());