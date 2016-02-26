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
         * @property {String} [method=get] Method to request with
         * @property {Boolean} [cors=false] Is CORS request (only needed for IE)
         * @property {Boolean} [cache=true] Set to false to explicitly break cache
         * @property {*} [data] Data to be sent with request
         * @property {String} [dataType=json] Type of expected response
         * @property {String} [contentType=application/json; charset=utf-8] If JSON will try to parse response data
         * @property {String} [requestedWith=XMLHttpRequest] Defaults to XMLHttpRequest
         * @property {String} [auth] Used to set the Authorization header
         * @property {String} [headers] Custom headers object
         */

        /**
         * <p>Takes a single argument — a configuration object — that is used to generate an 
         * HTTP request and returns a promise.</p>
         * 
         * @param {HTTPParams} params Request settings
         */
        request: function (params) {

        },

        /**
         * <p>Shortcut method to perform GET request.</p>
         *
         * @param {string} url Relative or absolute URL specifying the destination of the request
         * @param {HTTPParams} [config] Optional configuration object
         */
        get: function (url, config) {

        },

        /**
         * <p>Shortcut method to perform POST request.</p>
         *
         * @param {string} url Relative or absolute URL specifying the destination of the request
         * @param {*} data Request content
         * @param {HTTPParams} [config] Optional configuration object
         */
        post: function (url, data, config) {

        },

        /**
         * <p>Shortcut method to perform PUT request.</p>
         *
         * @param {string} url Relative or absolute URL specifying the destination of the request
         * @param {*} data Request content
         * @param {HTTPParams} [config] Optional configuration object
         */
        put: function (url, data, config) {

        },

        /**
         * <p>Shortcut method to perform HEAD request.</p>
         *
         * @param {string} url Relative or absolute URL specifying the destination of the request
         * @param {HTTPParams=} config Optional configuration object
         */
        head: function (url, config) {

        },

        /**
         * <p>Shortcut method to perform DELETE request.</p>
         *
         * @param {string} url Relative or absolute URL specifying the destination of the request
         * @param {HTTPParams} [config] Optional configuration object
         */
        'delete': function (url, config) {

        }
    };
}());
