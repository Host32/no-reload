/*global module*/
(function () {
    'use strict';

    function toInt(str) {
        return parseInt(str, 10);
    }

    function toFloat(str) {
        return parseFloat(str);
    }

    function isString(value) {
        return typeof value === 'string';
    }

    function isNumber(value) {
        return typeof value === 'number';
    }

    function isDefined(value) {
        return typeof value !== 'undefined';
    }

    function isUndefined(value) {
        return typeof value === 'undefined';
    }

    function isObject(value) {
        return value !== null && typeof value === 'object';
    }

    function isNull(value) {
        return value === null;
    }

    function isNotNull(value) {
        return value !== null;
    }

    function isFunction(value) {
        return typeof value === 'function';
    }

    function isBoolean(value) {
        return typeof value === 'boolean';
    }

    function isArray(value) {
        return Array.isArray(value);
    }

    function keys(obj) {
        if (!isObject(obj)) {
            return [];
        }
        if (Object.keys) {
            return Object.keys(obj);
        }
        var objKeys = [],
            key;
        for (key in obj) {
            /*jslint forin: true*/
            if (Object.hasOwnProperty.call(obj, key)) {
                objKeys.push(key);
            }
        }
        return objKeys;
    }

    function allKeys(obj) {
        if (!isObject(obj) && !isFunction(obj)) {
            return [];
        }
        var keys = [],
            key;
        /*jslint forin: true*/
        for (key in obj) {
            keys.push(key);
        }
        return keys;
    }

    function extend(obj) {
        var length = arguments.length,
            index,
            source,
            i,
            key,
            keys;

        if (length < 2 || obj === null || isUndefined(obj)) {
            return obj;
        }
        for (index = 1; index < length; index += 1) {
            source = arguments[index];
            keys = allKeys(source);
            for (i = 0; i < keys.length; i += 1) {
                key = keys[i];
                obj[key] = source[key];
            }
        }
        return obj;
    }

    function clone(obj) {
        var copy, attr, len, i;

        // Handle the 3 simple types, and null or undefined
        if (!isObject(obj)) {
            return obj;
        }

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (isArray(obj)) {
            copy = [];
            for (i = 0, len = obj.length; i < len; i += 1) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        copy = {};
        for (attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = clone(obj[attr]);
            }
        }
        return copy;
    }


    module.exports = {
        /**
         * <p>Convets a string to integer</p>
         *
         * @function
         * @memberof NR
         * @param {string} str Value to be converted
         * @returns {Number}
         */
        toInt: toInt,

        /**
         * <p>Convets a string to float</p>
         *
         * @function
         * @memberof NR
         * @param {string} str Value to be converted
         * @returns {Number}
         */
        toFloat: toFloat,

        /**
         * <p>Checks if the value is a string</p>
         *
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         * @returns {Boolean}
         */
        isString: isString,

        /**
         * <p>Checks if the value is a number</p>
         *
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         * @returns {Boolean}
         */
        isNumber: isNumber,

        /**
         * <p>Checks if the value is defined</p>
         *
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         * @returns {Boolean}
         */
        isDefined: isDefined,

        /**
         * <p>Checks if the value is undefined</p>
         *
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         * @returns {Boolean}
         */
        isUndefined: isUndefined,

        /**
         * <p>Checks if the value is an object</p>
         *
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         * @returns {Boolean}
         */
        isObject: isObject,

        /**
         * <p>Checks if the value is null</p>
         *
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         * @returns {Boolean}
         */
        isNull: isNull,

        /**
         * <p>Checks if the value is not null</p>
         *
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         * @returns {Boolean}
         */
        isNotNull: isNotNull,

        /**
         * <p>Checks if the value is a function</p>
         *
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         * @returns {Boolean}
         * @returns {Boolean}
         */
        isFunction: isFunction,

        /**
         * <p>Checks if the value is a boolean</p>
         *
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         * @returns {Boolean}
         */
        isBoolean: isBoolean,

        /**
         * <p>Checks if the value is an array</p>
         *
         * @function
         * @memberof NR
         * @param {*} value Value to be checked
         * @returns {Boolean}
         */
        isArray: isArray,

        /**
         * <p>Retrieve all the names of the object's own enumerable properties.</p>
         *
         * @function
         * @memberof NR
         * @param {Object} obj Object to be retrieved the keys
         * @returns {string[]} obj keys
         */
        keys: keys,

        /**
         * <p>Retrieve all the names of object's own and inherited properties.</p>
         *
         * @function
         * @memberof NR
         * @param {Object} obj Object to be retrieved the keys
         * @returns {string[]} obj keys
         */
        allKeys: allKeys,

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
        extend: extend,


        /**
         * <p>Makes a clone of an object</p>
         *
         * @function
         * @memberof NR
         * @param {Object} obj Object to be cloned
         * @returns {Object}
         */
        clone: clone
    };

}());
