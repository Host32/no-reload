(function (NR, NRT) {
    'use strict';

    NRT.module("$http");

    NRT.test("Promise must be rejected", ['$promises', function ($promises) {
        var assert = this,
            done = assert.async(),

            promise = $promises.create(function (accept, reject) {
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
    }]);

}(window.NR, window.NRT));
