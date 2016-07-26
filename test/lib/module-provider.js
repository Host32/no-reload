(function (NR, NRT) {
    'use strict';


    var LOAD_TECHNIQUES = {
        XHR_EVAL: 'xhr_eval',
        XHR_INJECTION: 'xhr_injection',
        SCRIPT_DOM_ELEMENT: 'script_dom_element',
        WRITE_SCRIPT_TAG: 'write_script_tag'
    };

    NRT.module("ModuleProvider");

    NRT.test("Lazy module must be loaded by XHR Injection thecnique", ['$config', function ($config) {

        var assert = this,
            done = assert.async();

        $config.set('scriptLoadTechnique', LOAD_TECHNIQUES.XHR_INJECTION);
        NR.run(['myTest1', function (myTest1) {
            assert.strictEqual(myTest1.testData, 1, "The data has be loaded");
            done();
        }]);
    }]);

    NRT.test("Lazy module must be loaded by XHR Eval thecnique", ['$config', function ($config) {

        var assert = this,
            done = assert.async();

        $config.set('scriptLoadTechnique', LOAD_TECHNIQUES.XHR_EVAL);
        NR.run(['myTest2', function (myTest2) {
            assert.strictEqual(myTest2.testData, 2, "The data has be loaded");
            done();
        }]);
    }]);

    NRT.test("Lazy module must be loaded by Script DOM Element", ['$config', function ($config) {

        var assert = this,
            done = assert.async();

        $config.set('scriptLoadTechnique', LOAD_TECHNIQUES.SCRIPT_DOM_ELEMENT);
        NR.run(['myTest3', function (myTest3) {
            assert.strictEqual(myTest3.testData, 3, "The data has be loaded");
            done();
        }]);
    }]);


}(window.NR, window.NRT));
