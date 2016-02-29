/*global module*/
(function () {
    'use strict';

    /**
     * <p>Convets a string to integer</p>
     *
     * @function
     * @memberof NR
     * @param {string} str Value to be converted
     * @returns {Number}
     */
    function toInt(str) {
        return parseInt(str, 10);
    }

    /**
     * <p>Convets a string to float</p>
     *
     * @function
     * @memberof NR
     * @param {string} str Value to be converted
     * @returns {Number}
     */
    function toFloat(str) {
        return parseFloat(str);
    }

    /**
     * <p>Checks if the value is a string</p>
     *
     * @function
     * @memberof NR
     * @param {*} value Value to be checked
     * @returns {Boolean}
     */
    function isString(value) {
        return typeof value === 'string';
    }

    /**
     * <p>Checks if the value is a number</p>
     *
     * @function
     * @memberof NR
     * @param {*} value Value to be checked
     * @returns {Boolean}
     */
    function isNumber(value) {
        return typeof value === 'number';
    }

    /**
     * <p>Checks if the value is defined</p>
     *
     * @function
     * @memberof NR
     * @param {*} value Value to be checked
     * @returns {Boolean}
     */
    function isDefined(value) {
        return typeof value !== 'undefined';
    }

    /**
     * <p>Checks if the value is undefined</p>
     *
     * @function
     * @memberof NR
     * @param {*} value Value to be checked
     * @returns {Boolean}
     */
    function isUndefined(value) {
        return typeof value === 'undefined';
    }

    /**
     * <p>Checks if the value is an object</p>
     *
     * @function
     * @memberof NR
     * @param {*} value Value to be checked
     * @returns {Boolean}
     */
    function isObject(value) {
        return value !== null && typeof value === 'object';
    }

    /**
     * <p>Checks if the value is null</p>
     *
     * @function
     * @memberof NR
     * @param {*} value Value to be checked
     * @returns {Boolean}
     */
    function isNull(value) {
        return value === null;
    }

    /**
     * <p>Checks if the value is not null</p>
     *
     * @function
     * @memberof NR
     * @param {*} value Value to be checked
     * @returns {Boolean}
     */
    function isNotNull(value) {
        return value !== null;
    }

    /**
     * <p>Checks if the value is a function</p>
     *
     * @function
     * @memberof NR
     * @param {*} value Value to be checked
     * @returns {Boolean}
     * @returns {Boolean}
     */
    function isFunction(value) {
        return typeof value === 'function';
    }

    /**
     * <p>Checks if the value is a boolean</p>
     *
     * @function
     * @memberof NR
     * @param {*} value Value to be checked
     * @returns {Boolean}
     */
    function isBoolean(value) {
        return typeof value === 'boolean';
    }

    /**
     * <p>Checks if the value is an array</p>
     *
     * @function
     * @memberof NR
     * @param {*} value Value to be checked
     * @returns {Boolean}
     */
    function isArray(value) {
        return Array.isArray(value);
    }

    /**
     * <p>Retrieve all the names of the object's own enumerable properties.</p>
     *
     * @function
     * @memberof NR
     * @param {Object} obj Object to be retrieved the keys
     * @returns {string[]} obj keys
     */
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

    /**
     * <p>Retrieve all the names of object's own and inherited properties.</p>
     *
     * @function
     * @memberof NR
     * @param {Object} obj Object to be retrieved the keys
     * @returns {string[]} obj keys
     */
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

    /**
     * <p>Makes a clone of an object</p>
     *
     * @function
     * @memberof NR
     * @param {Object} obj Object to be cloned
     * @returns {Object}
     */
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
        toInt: toInt,
        toFloat: toFloat,
        isString: isString,
        isNumber: isNumber,
        isDefined: isDefined,
        isUndefined: isUndefined,
        isObject: isObject,
        isNull: isNull,
        isNotNull: isNotNull,
        isFunction: isFunction,
        isBoolean: isBoolean,
        isArray: isArray,
        keys: keys,
        allKeys: allKeys,
        extend: extend,
        clone: clone
    };

}());
