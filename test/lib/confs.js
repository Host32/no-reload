(function (NR, NRT) {
    'use strict';

    NRT.module("$confs");

    NRT.test("Get a default conf", ['$confs', function ($confs) {
        var assert = this;

        assert.strictEqual($confs.get('appFolder'), 'app/', 'By default, app folder is "app/"');
        assert.strictEqual($confs.get('modulesFolder'), 'app/modules/', 'By default, modules folder is "app/modules/"');
    }]);

    NRT.test("Define a new conf", ['$confs', function ($confs) {
        var assert = this;

        $confs.set('newRandomConf', 123);

        assert.strictEqual($confs.get('newRandomConf'), 123, 'Must be possible to set a new conf');

        $confs.set('newRandomConf', undefined);
    }]);

    NRT.test("Update an existing conf", ['$confs', function ($confs) {
        var assert = this;

        $confs.set('appFolder', 'anotherAppFolder/');

        assert.strictEqual($confs.get('appFolder'), 'anotherAppFolder/', 'Must be possible to update an existing conf');

        $confs.set('appFolder', 'app/');
    }]);
}(window.NR, window.NRT));
