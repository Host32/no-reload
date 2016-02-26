(function (NR, NRT) {
    'use strict';

    NRT.module("Utils.Promise");

    NRT.test("Promise must be accept", function (assert) {
        var done = assert.async(),
            promise = new NR.Promise(function (accept) {
                setTimeout(function () {
                    accept(true);
                }, 200);
            });

        promise.then(function (ret) {
            assert.ok(ret, "Promise accepted");
            done();
        }, function (ret) {
            assert.ok(ret, "Promise rejected");
            done();
        });
    });

    NRT.test("Promise must be rejected", function (assert) {
        var done = assert.async(),
            promise = new NR.Promise(function (accept, reject) {
                setTimeout(function () {
                    reject(true);
                }, 200);
            });

        promise.then(function (ret) {
            assert.ok(ret, "Promise accepted");
            done();
        }, function (ret) {
            assert.ok(ret, "Promise rejected");
            done();
        });
    });
}(window.NR, window.NRT));
