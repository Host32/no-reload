(function (NRTest) {
    'use strict';

    NRTest.test("a basic test example", function (assert) {
        assert.equal(window.NR.hello, "world", "We expect hello to be world");
    });
}(window.NRTest));