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
         * @returns {Number}
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
         * @returns {Number}
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
         * @returns {Boolean}
         */
        isString: function (value) {
            return typeof value === 'string';
        },

        /**
         * <p>Checks if the value is a number</p>
         * 
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         * @returns {Boolean}
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
         * @returns {Boolean}
         */
        isDefined: function (value) {
            return typeof value !== 'undefined';
        },

        /**
         * <p>Checks if the value is undefined</p>
         * 
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         * @returns {Boolean}
         */
        isUndefined: function (value) {
            return typeof value === 'undefined';
        },

        /**
         * <p>Checks if the value is an object</p>
         * 
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         * @returns {Boolean}
         */
        isObject: function (value) {
            return value !== null && typeof value === 'object';
        },

        /**
         * <p>Checks if the value is null</p>
         * 
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         * @returns {Boolean}
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
         * @returns {Boolean}
         */
        isNotNull: function (value) {
            return value !== null;
        },

        /**
         * <p>Checks if the value is a function</p>
         * 
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         * @returns {Boolean}
         * @returns {Boolean}
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
         * @returns {Boolean}
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
         * @returns {Boolean}
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
         * @returns {string[]} obj keys
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
         * @returns {string[]} obj keys
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
         * @returns {Object}
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
         * @returns {Object}
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
