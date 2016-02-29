/*global module, require*/
(function () {
    'use strict';

    var Promise = require('promise'),
        Ajax = require('simple-ajax');

    function request(params) {
        return new Promise(function (resolve, reject) {
            var ajax = new Ajax(params);
            ajax.on('success', function (event) {
                resolve(event);
            });
            ajax.on('error', function (event) {
                reject(event);
            });
            ajax.send();
        });
    }

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
         * @returns {NR.Promise}
         */
        request: request,

        /**
         * <p>Shortcut method to perform GET request.</p>
         *
         * @param {string} url Relative or absolute URL specifying the destination of the request
         * @param {HTTPParams} [config] Optional configuration object
         * @returns {NR.Promise}
         */
        get: function (url, params) {
            params = params || {};
            params.url = url;
            params.method = 'get';

            return request(params);
        },

        /**
         * <p>Shortcut method to perform POST request.</p>
         *
         * @param {string} url Relative or absolute URL specifying the destination of the request
         * @param {*} data Request content
         * @param {HTTPParams} [config] Optional configuration object
         * @returns {NR.Promise}
         */
        post: function (url, data, params) {
            params = params || {};
            params.url = url;
            params.method = 'post';
            params.data = data;

            return request(params);
        },

        /**
         * <p>Shortcut method to perform PUT request.</p>
         *
         * @param {string} url Relative or absolute URL specifying the destination of the request
         * @param {*} data Request content
         * @param {HTTPParams} [config] Optional configuration object
         * @returns {NR.Promise}
         */
        put: function (url, data, params) {
            params = params || {};
            params.url = url;
            params.method = 'put';
            params.data = data;

            return request(params);
        },

        /**
         * <p>Shortcut method to perform HEAD request.</p>
         *
         * @param {string} url Relative or absolute URL specifying the destination of the request
         * @param {HTTPParams=} config Optional configuration object
         * @returns {NR.Promise}
         */
        head: function (url, params) {
            params = params || {};
            params.url = url;
            params.method = 'head';

            return request(params);
        },

        /**
         * <p>Shortcut method to perform DELETE request.</p>
         *
         * @param {string} url Relative or absolute URL specifying the destination of the request
         * @param {HTTPParams} [config] Optional configuration object
         * @returns {NR.Promise}
         */
        'delete': function (url, params) {
            params = params || {};
            params.url = url;
            params.method = 'delete';

            return request(params);
        }
    };
}());
