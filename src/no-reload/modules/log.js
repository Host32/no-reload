/*global module, require, NR*/
(function () {
    'use strict';

    var $moduleProvider = require('../core/module-provider');

    $moduleProvider.define('$log', [function () {

        function formatError(arg) {
            if (arg instanceof Error) {
                if (arg.stack) {
                    arg = (arg.message && arg.stack.indexOf(arg.message) === -1) ? 'Error: ' + arg.message + '\n' + arg.stack : arg.stack;
                } else if (arg.sourceURL) {
                    arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
                }
            }
            return arg;
        }

        function consoleLog(type) {
            var console = window.console || {},
                logFn = console[type] || console.log || NR.noop,
                hasApply = false;

            // Note: reading logFn.apply throws an error in IE11 in IE8 document mode.
            // The reason behind this is that console.log has type "object" in IE8...
            try {
                hasApply = !!logFn.apply;
            } catch (e) {}

            if (hasApply) {
                return function () {
                    var args = [],
                        key;
                    for (key in arguments) {
                        if (arguments.hasOwnProperty(key)) {
                            args.push(formatError(arguments[key]));
                        }
                    }
                    return logFn.apply(console, args);
                };
            }

            // we are IE which either doesn't have window.console => this is noop and we do nothing,
            // or we are IE where console.log doesn't have apply so we log at least first 2 args
            return function (arg1, arg2) {
                logFn(arg1, arg2 === null ? '' : arg2);
            };
        }

        var debug = true;

        /**
         * <p>Simple service for logging. Default implementation safely writes the message
         * into the browser's console (if present).</p>
         *
         * @memberof NR
         * @module $log
         */
        return {
            /**
             * <p>Enable and disable debug messages</p>
             *
             * @function
             * @param   {boolean=} flag Enable or disable debug level messages
             * @returns {*} Current value if used as getter or itself (chaining) if used as setter
             */
            debugEnabled: function (flag) {
                if (NR.isDefined(flag)) {
                    debug = flag;
                    return this;
                } else {
                    return debug;
                }
            },
            /**
             * <p>Write a log message</p>
             */
            log: consoleLog('log'),

            /**
             * <p>Write an information message</P>
             */
            info: consoleLog('info'),

            /**
             * <p>Write a warning message</p>
             */
            warn: consoleLog('warn'),

            /**
             * <p>Write an error message</p>
             */
            error: consoleLog('error'),

            /**
             * <p>Write a debug message</p>
             */
            debug: (function () {
                var fn = consoleLog('debug'),
                    self = this;

                return function () {
                    if (debug) {
                        fn.apply(self, arguments);
                    }
                };
            }())
        };

    }]);

}());
