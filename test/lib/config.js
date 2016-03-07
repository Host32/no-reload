(function (NR, NRT) {
    'use strict';

    NRT.module("$config");

    NRT.test("Get a default conf", ['$config', function ($config) {
        var assert = this;

        assert.strictEqual($config.get('appFolder'), 'app/', 'By default, app folder is "app/"');
        assert.strictEqual($config.get('modulesFolder'), 'app/modules/', 'By default, modules folder is "app/modules/"');
    }]);

    NRT.test("Define a new conf", ['$config', function ($config) {
        var assert = this;

        $config.set('newRandomConf', 123);

        assert.strictEqual($config.get('newRandomConf'), 123, 'Must be possible to set a new conf');

        $config.set('newRandomConf', undefined);
    }]);

    NRT.test("Update an existing conf", ['$config', function ($config) {
        var assert = this;

        $config.set('appFolder', 'anotherAppFolder/');

        assert.strictEqual($config.get('appFolder'), 'anotherAppFolder/', 'Must be possible to update an existing conf');

        $config.set('appFolder', 'app/');
    }]);
}(window.NR, window.NRT));
