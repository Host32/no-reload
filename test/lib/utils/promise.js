(function (NR, NRT) {
    'use strict';

    NRT.module("Utils.Promise");

    NRT.test("Promise must be accept", function (assert) {
        var done = assert.async(),
            promise = new NR.Promise(function (accept) {
                setTimeout(function () {
                    accept();
                }, 200);
            });

        promise.then(function () {
            assert.ok(true, "Promise accepted");
            done();
        }, function () {
            assert.ok(false, "Promise rejected");
            done();
        });
    });

    NRT.test("Promise must be rejected", function (assert) {
        var done = assert.async(),
            promise = new NR.Promise(function (accept, reject) {
                setTimeout(function () {
                    reject();
                }, 200);
            });

        promise.then(function () {
            assert.ok(false, "Promise accepted");
            done();
        }, function () {
            assert.ok(true, "Promise rejected");
            done();
        });
    });
}(window.NR, window.NRT));