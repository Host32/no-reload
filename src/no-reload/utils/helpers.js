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
         * <p>Retrieve all the names of the object's own enumerable properties.</p>
         *
         * @function
         * @memberof NR
         * @param {Object} obj Object to be retrieved the keys
         */
        keys: function (obj) {
            if (!this.isObject(obj)) {
                return [];
            }
            if (Object.keys) {
                return Object.keys(obj);
            }
            var keys = [],
                key;
            for (key in obj) {
                /*jslint forin: true*/
                if (Object.hasOwnProperty.call(obj, key)) {
                    keys.push(key);
                }
            }
            return keys;
        },

        /**
         * <p>Retrieve all the names of object's own and inherited properties.</p>
         *
         * @function
         * @memberof NR
         * @param {Object} obj Object to be retrieved the keys
         */
        allKeys: function (obj) {
            if (!this.isObject(obj) && !this.isFunction(obj)) {
                return [];
            }
            var keys = [],
                key;
            /*jslint forin: true*/
            for (key in obj) {
                keys.push(key);
            }
            return keys;
        },

        /**
         * <p>Copy all of the properties in the parents objects over to the child object,
         * and return the child object. It's in-order, so the last parents will override
         * properties of the same name in previous arguments.</p>
         * 
         * @function
         * @memberof NR
         * @param {Object} child Child object
         * @param {...Object} parents Parents objects
         */
        extend: function (obj) {
            var length = arguments.length,
                index,
                source,
                i,
                key,
                keys;

            if (length < 2 || obj === null || this.isUndefined(obj)) {
                return obj;
            }
            for (index = 1; index < length; index += 1) {
                source = arguments[index];
                keys = this.allKeys(source);
                for (i = 0; i < keys.length; i += 1) {
                    key = keys[i];
                    obj[key] = source[key];
                }
            }
            return obj;
        },


        /**
         * <p>Makes a clone of an object</p>
         * 
         * @function
         * @memberof NR
         * @param {Object} obj Object to be cloned
         */
        clone: function (obj) {
            var copy, attr, len, i;

            // Handle the 3 simple types, and null or undefined
            if (!this.isObject(obj)) {
                return obj;
            }

            // Handle Date
            if (obj instanceof Date) {
                copy = new Date();
                copy.setTime(obj.getTime());
                return copy;
            }

            // Handle Array
            if (this.isArray(obj)) {
                copy = [];
                for (i = 0, len = obj.length; i < len; i += 1) {
                    copy[i] = this.clone(obj[i]);
                }
                return copy;
            }

            // Handle Object
            copy = {};
            for (attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = this.clone(obj[attr]);
                }
            }
            return copy;
        }
    };

}());
