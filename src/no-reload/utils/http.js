/*global module, require*/
(function () {
    'use strict';
    var Ajax = require('simple-ajax'),
        Promise = require('promise');

    /**
     * <p>Generate HTTP requests.</p>
     * 
     * @module $http
     * @memberof NR
     */
    module.exports = {

        /**
         * <p>Available options to create a request</p>
         * 
         * @typedef {Object} HTTPParams
         * @property {String} url Url to request
         * @property {String} method Method to request with
         * @property {Boolean} cors Is CORS request (only needed for IE)
         * @property {Boolean} cache Set to false to explicitly break cache
         * @property {Object} data Data to be sent with request
         * @property {String} dataType Type of expected response
         * @property {String} contentType If JSON will try to parse response data
         * @property {String} requestedWith Defaults to XMLHttpRequest
         * @property {String} auth Used to set the Authorization header
         * @property {String} headers Custom headers object
         */

        /**
         * <p>Takes a single argument — a configuration object — that is used to generate an 
         * HTTP request and returns a promise.</p>
         * 
         * @param {HTTPParams} params Request settings
         */
        request: function (params) {

        }
    };
}());