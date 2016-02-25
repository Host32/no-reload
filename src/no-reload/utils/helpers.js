/*global module*/
(function () {
    'use strict';

    module.exports = {
        /**
         * <p>Convets a string to integer</p>
         * 
         * @function
         * @memberof NR
         * @param {string} str Value to be converted
         */
        toInt: function (str) {
            return parseInt(str, 10);
        },

        /**
         * <p>Convets a string to float</p>
         * 
         * @function
         * @memberof NR
         * @param {string} str Value to be converted
         */
        toFloat: function (str) {
            return parseFloat(str);
        },

        /**
         * <p>Checks if the value is a string</p>
         * 
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         */
        isString: function (value) {
            return typeof value === 'string';
        },

        /**
         * <p>Checks if the value is a number</p>
         * 
         * @param {*} value Value to be checked
         */
        isNumber: function (value) {
            return typeof value === 'number';
        },

        /**
         * <p>Checks if the value is defined</p>
         * 
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         */
        isDefined: function (value) {
            return typeof value !== 'undefined';
        },

        /**
         * <p>Checks if the value is undefined</p>
         * 
         * @param {*} value Value to be checked
         */
        isUndefined: function (value) {
            return typeof value === 'undefined';
        },

        /**
         * <p>Checks if the value is an object</p>
         * 
         * @param {*} value Value to be checked
         */
        isObject: function (value) {
            return value !== null && typeof value === 'object';
        },

        /**
         * <p>Checks if the value is null</p>
         * 
         * @param {*} value Value to be checked
         */
        isNull: function (value) {
            return value === null;
        },

        /**
         * <p>Checks if the value is not null</p>
         * 
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         */
        isNotNull: function (value) {
            return value !== null;
        },

        /**
         * <p>Checks if the value is a function</p>
         * 
         * @param {*} value Value to be checked
         */
        isFunction: function (value) {
            return typeof value === 'function';
        },

        /**
         * <p>Checks if the value is a boolean</p>
         * 
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         */
        isBoolean: function (value) {
            return typeof value === 'boolean';
        },

        /**
         * <p>Checks if the value is an array</p>
         * 
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         */
        isArray: function (value) {
            return Array.isArray(value);
        },

        /**
         * <p>Makes an object extends to other</p>
         * 
         * @function
         * @memberof NR
         * @param {Object} child Child object
         * @param {...Object} parents Parents objects
         */
        extend: function () {
            //TODO
            throw 'Extend is not implemented yet';
        },


        /**
         * <p>Makes a clone of an object</p>
         * 
         * @function
         * @memberof NR
         * @param {Object} object Object to be cloned
         */
        clone: function () {
            //TODO
            throw 'clone is not implemented yet';
        }
    };

}());
