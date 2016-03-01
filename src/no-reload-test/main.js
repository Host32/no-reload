/*global window, module, require*/
(function (NR) {
    'use strict';

    var QUnit = require('qunitjs');

    /**
     * @classdesc <p>No-Reload test namespace</p>
     * <p>No-Reload uses {@link http://qunitjs.com/|QUnit} as default test suite.</p>
     * 
     * @module NRT
     * @namespace
     * @see {@link http://qunitjs.com/|QUnit}
     */
    window.NRT = module.exports = {
        /**
         * <p>Used for agroup test cases</p>
         *
         * @function
         * @memberof NRT
         * @param {String} name Module name
         */
        module: function (name) {
            QUnit.module(name);
        },

        /**
         * <p>Allows the usage of dependency injection for test cases</p>
         *
         * <p>The assert object is the function scope</p>
         * <pre>
         *  NRT.test("A sample test case", ['dep1', '$http', function(dep1, $http){
         *      var assert = this,
         *          done = assert.async();
         *
         *      assert.ok(dep1.getTrue(), 'dep1 need return true');
         *
         *      $http.get('someUrl').then(function(data){
         *          assert.equals(data, 'expected', 'Data need be expected');
         *
         *          done();
         *      });
         *  }]);
         * </pre>
         *
         * @function
         * @memberof NRT
         * @param {string}         name Test case name
         * @param {function|Array} info Function that will be invoked by the dependecy injection system,
         *                              can be a function when the deps is the arguments names or a array
         *                              when the firsts arguments are the deps and the last argument is the
         *                              function
         */
        test: function (name, info) {
            QUnit.test(name, function (assert) {
                var done = assert.async();
                NR.run(info, assert).then(function () {
                    done();
                });
            });
        },

        /**
         * <p>Start the tests</p>
         *
         * @function
         * @memberof NRT
         */
        start: function () {
            QUnit.start();
        }
    };


}(window.NR));
