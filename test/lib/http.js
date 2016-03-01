(function (NR, NRT) {
    'use strict';

    NRT.module("$http");

    NRT.test("request method get", ['$http', function ($http) {
        var assert = this,
            done = assert.async();

        $http.request({
            url: 'resources/users.json'
        }).then(function (users) {
            assert.strictEqual(users[0].name, "Ivan", "The first user name must be Ivan");
            assert.strictEqual(users[0].age, 21, "The first user age must be 21");
            assert.strictEqual(users[0].enable, true, "The first user enabled must be true");

            assert.strictEqual(users[1].name, "sample", "The second user name must be sample");
            assert.strictEqual(users[1].age, 32, "The second user age must be 32");
            assert.strictEqual(users[1].enable, false, "The second user enabled must be false");

            done();
        });

    }]);

    NRT.test("get", ['$http', function ($http) {
        var assert = this,
            done = assert.async();

        $http.get('resources/users.json').then(function (users) {
            assert.strictEqual(users[0].name, "Ivan", "The first user name must be Ivan");
            assert.strictEqual(users[0].age, 21, "The first user age must be 21");
            assert.strictEqual(users[0].enable, true, "The first user enabled must be true");

            assert.strictEqual(users[1].name, "sample", "The second user name must be sample");
            assert.strictEqual(users[1].age, 32, "The second user age must be 32");
            assert.strictEqual(users[1].enable, false, "The second user enabled must be false");

            done();
        });

    }]);
}(window.NR, window.NRT));
