/*global module, require*/
(function () {
    'use strict';

    var $h = require('./helpers'),

        arrayDiffer = require('.'),

        nonEnumberableProperties = ['name', 'message', 'stack'],

        propertiesNotToDisplay = nonEnumberableProperties.concat(['module', 'showStack', 'showProperties', '__safety', '_stack']);

    /**
     * <p></p>
     *
     * @classdesc <p></p>
     *
     * @memberof NR
     * @class ModuleError
     */
    function ModuleError(module, message, options) {
        if (!(this instanceof ModuleError)) {
            throw new Error('Call ModuleError using new');
        }

        Error.call(this);

        options = options || {};
        if (typeof module === 'object') {
            options = module;
        } else {
            if (message instanceof Error) {
                options.error = message;
            } else if (typeof message === 'object') {
                options = message;
            } else {
                options.message = message;
            }
            options.module = module;
        }

        options = $h.extend({
            showStack: false,
            showProperties: true
        }, options);

        var self = this,

            properties = ['name', 'message', 'fileName', 'lineNumber', 'stack', 'showStack', 'showProperties', 'module'],

            safety;

        if (options.error) {
            // These properties are not enumerable, so we have to add them explicitly.
            $h.keys(options.error).concat(nonEnumberableProperties).forEach(function (prop) {
                self[prop] = options.error[prop];
            });
        }

        // options object can override
        properties.forEach(function (prop) {
            if (options.hasOwnProperty(prop)) {
                this[prop] = options[prop];
            }
        }, this);

        // defaults
        if (!this.name) {
            this.name = 'Error';
        }

        if (!this.stack) {
            // Error.captureStackTrace appends a stack property which relies on the toString method of the object it is applied to.
            // Since we are using our own toString method which controls when to display the stack trace if we don't go through this
            // safety object, then we'll get stack overflow problems.
            safety = {
                toString: function () {
                    return this.$messageWithDetails() + '\nStack:';
                }.bind(this)
            };
            Error.captureStackTrace(safety, this.constructor);
            this.$$safety = safety;
        }

        if (!this.module) {
            throw new Error('Missing module name');
        }
        if (!this.message) {
            throw new Error('Missing error message');
        }
    }

    $h.extend(ModuleError, Error);


    ModuleError.prototype.$messageWithDetails = function () {
        var messageWithDetails = 'Message:\n    ' + this.message,

            details = this.$messageDetails();

        if (details !== '') {
            messageWithDetails += '\n' + details;
        }

        return messageWithDetails;
    };

    ModuleError.prototype.$messageDetails = function () {
        if (!this.showProperties) {
            return '';
        }

        var properties = arrayDiffer(Object.keys(this), propertiesNotToDisplay),

            self = this;

        if (properties.length === 0) {
            return '';
        }

        properties = properties.map(function stringifyProperty(prop) {
            return '    ' + prop + ': ' + self[prop];
        });

        return 'Details:\n' + properties.join('\n');
    };

    ModuleError.prototype.toString = function () {
        var sig = this.name + ' in module \'' + this.module + '\'',

            detailsWithStack = function (stack) {
                return this.$messageWithDetails() + '\nStack:\n' + stack;
            }.bind(this),

            msg;

        if (this.showStack) {
            if (this.$$safety) { // There is no wrapped error, use the stack captured in the ModuleError ctor
                msg = this.$$safety.stack;
            } else if (this.$stack) {
                msg = detailsWithStack(this.$stack);
            } else { // Stack from wrapped error
                msg = detailsWithStack(this.stack);
            }
        } else {
            msg = this.$messageWithDetails();
        }

        return sig + '\n' + msg;
    };

    module.exports = ModuleError;

}());
