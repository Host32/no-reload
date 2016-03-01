(function (NR, NRT) {
    'use strict';

    NRT.module("Helpers");

    NRT.test("toInt", function () {
        var assert = this;

        assert.strictEqual(NR.toInt("10"), 10, "a lonely number has be converted");
        assert.strictEqual(NR.toInt("10s"), 10, "a confused number has be converted");
        assert.ok(isNaN(NR.toInt("s")), "a non-number cannot be converted");
    });

    NRT.test("toFloat", function () {
        var assert = this;

        assert.strictEqual(NR.toFloat("10"), 10, "a lonely number has be converted");
        assert.strictEqual(NR.toFloat("10s"), 10, "a confused number has be converted");
        assert.strictEqual(NR.toFloat("10.5"), 10.5, "a decimal lonely number has be converted");
        assert.strictEqual(NR.toFloat("10.5s"), 10.5, "a decimal confused number has be converted");
        assert.ok(isNaN(NR.toFloat("s")), "a non-number cannot be converted");
    });

    NRT.test("isString", function () {
        var assert = this;

        assert.ok(NR.isString("s"), "'s' is a String");
        assert.notOk(NR.isString(10), "10 is not a String");
        assert.notOk(NR.isString(10.5), "10.5 is not a String");
        assert.notOk(NR.isString({}), "object is not a String");
        assert.notOk(NR.isString(null), "null is not a String");
        assert.notOk(NR.isString(undefined), "undefined is not a String");
        assert.notOk(NR.isString(function () {}), "function is not a String");
        assert.notOk(NR.isString(false), "boolean is not a String");
        assert.notOk(NR.isString([]), "array is not a String");
    });

    NRT.test("isNumber", function () {
        var assert = this;

        assert.notOk(NR.isNumber("s"), "'s' is not a number");
        assert.ok(NR.isNumber(10), "10 is a number");
        assert.ok(NR.isNumber(10.5), "10.5 is a number");
        assert.notOk(NR.isNumber({}), "object is not a number");
        assert.notOk(NR.isNumber(null), "null is not a number");
        assert.notOk(NR.isNumber(undefined), "undefined is not a number");
        assert.notOk(NR.isNumber(function () {}), "function is not a number");
        assert.notOk(NR.isNumber(false), "boolean is not a number");
        assert.notOk(NR.isNumber([]), "array is not a number");
    });

    NRT.test("isDefined", function () {
        var assert = this;

        assert.ok(NR.isDefined("s"), "'s' is defined");
        assert.ok(NR.isDefined(10), "10 is defined");
        assert.ok(NR.isDefined(10.5), "10.5 is defined");
        assert.ok(NR.isDefined({}), "object is defined");
        assert.ok(NR.isDefined(null), "null is defined");
        assert.notOk(NR.isDefined(undefined), "undefined is not defined");
        assert.ok(NR.isDefined(function () {}), "function is defined");
        assert.ok(NR.isDefined(false), "boolean is defined");
        assert.ok(NR.isDefined([]), "array is defined");
    });

    NRT.test("isUndefined", function () {
        var assert = this;

        assert.notOk(NR.isUndefined("s"), "'s' is not undefined");
        assert.notOk(NR.isUndefined(10), "10 is not undefined");
        assert.notOk(NR.isUndefined(10.5), "10.5 is not undefined");
        assert.notOk(NR.isUndefined({}), "object is not undefined");
        assert.notOk(NR.isUndefined(null), "null is not undefined");
        assert.ok(NR.isUndefined(undefined), "undefined is undefined");
        assert.notOk(NR.isUndefined(function () {}), "function is not undefined");
        assert.notOk(NR.isUndefined(false), "boolean is not undefined");
        assert.notOk(NR.isUndefined([]), "array is not undefined");
    });

    NRT.test("isObject", function () {
        var assert = this;

        assert.notOk(NR.isObject("s"), "'s' is not an object");
        assert.notOk(NR.isObject(10), "10 is not an object");
        assert.notOk(NR.isObject(10.5), "10.5 is not an object");
        assert.ok(NR.isObject({}), "object is an object");
        assert.notOk(NR.isObject(null), "null is not an object");
        assert.notOk(NR.isObject(undefined), "undefined is not an object");
        assert.notOk(NR.isObject(function () {}), "function is not an object");
        assert.notOk(NR.isObject(false), "boolean is not an object");
        assert.ok(NR.isObject([]), "array is an object");
    });

    NRT.test("isNull", function () {
        var assert = this;

        assert.notOk(NR.isNull("s"), "'s' is not null");
        assert.notOk(NR.isNull(10), "10 is not null");
        assert.notOk(NR.isNull(10.5), "10.5 is not null");
        assert.notOk(NR.isNull({}), "object is not null");
        assert.ok(NR.isNull(null), "null is null");
        assert.notOk(NR.isNull(undefined), "undefined is not null");
        assert.notOk(NR.isNull(function () {}), "function is not null");
        assert.notOk(NR.isNull(false), "boolean is not null");
        assert.notOk(NR.isNull([]), "array is not null");
    });

    NRT.test("isNotNull", function () {
        var assert = this;

        assert.ok(NR.isNotNull("s"), "'s' is not null");
        assert.ok(NR.isNotNull(10), "10 is not null");
        assert.ok(NR.isNotNull(10.5), "10.5 is not null");
        assert.ok(NR.isNotNull({}), "object is not null");
        assert.notOk(NR.isNotNull(null), "null is null");
        assert.ok(NR.isNotNull(undefined), "undefined is not null");
        assert.ok(NR.isNotNull(function () {}), "function is not null");
        assert.ok(NR.isNotNull(false), "boolean is not null");
        assert.ok(NR.isNotNull([]), "array is not null");
    });

    NRT.test("isFunction", function () {
        var assert = this;

        assert.notOk(NR.isFunction("s"), "'s' is not a function");
        assert.notOk(NR.isFunction(10), "10 is not a function");
        assert.notOk(NR.isFunction(10.5), "10.5 is not a function");
        assert.notOk(NR.isFunction({}), "object is not a a function");
        assert.notOk(NR.isFunction(null), "null is not a function");
        assert.notOk(NR.isFunction(undefined), "undefined is not a function");
        assert.ok(NR.isFunction(function () {}), "function is a function");
        assert.notOk(NR.isFunction(false), "boolean is not a function");
        assert.notOk(NR.isFunction([]), "array is not a function");
    });

    NRT.test("isBoolean", function () {
        var assert = this;

        assert.notOk(NR.isBoolean("s"), "'s' is not a boolean");
        assert.notOk(NR.isBoolean(10), "10 is not a boolean");
        assert.notOk(NR.isBoolean(10.5), "10.5 is not a boolean");
        assert.notOk(NR.isBoolean({}), "object is not a a boolean");
        assert.notOk(NR.isBoolean(null), "null is not a boolean");
        assert.notOk(NR.isBoolean(undefined), "undefined is not a boolean");
        assert.notOk(NR.isBoolean(function () {}), "function is not a boolean");
        assert.ok(NR.isBoolean(false), "boolean is a boolean");
        assert.notOk(NR.isBoolean([]), "array is not a boolean");
    });

    NRT.test("isArray", function () {
        var assert = this;

        assert.notOk(NR.isArray("s"), "'s' is not an array");
        assert.notOk(NR.isArray(10), "10 is not an array");
        assert.notOk(NR.isArray(10.5), "10.5 is not an array");
        assert.notOk(NR.isArray({}), "object is not a an array");
        assert.notOk(NR.isArray(null), "null is not an array");
        assert.notOk(NR.isArray(undefined), "undefined is not an array");
        assert.notOk(NR.isArray(function () {}), "function is not an array");
        assert.notOk(NR.isArray(false), "boolean is not an array");
        assert.ok(NR.isArray([]), "array is an array");
    });


    NRT.test("clone", function () {
        var assert = this,
            number = 10,
            string = "str",
            float = 10.5,
            array = [10, 20, 5],
            object = {
                param1: 5,
                param2: "str",
                param3: [
                    {
                        ok: true
                    }]
            },
            arrayClone = NR.clone(array),
            objectClone = NR.clone(object);

        assert.strictEqual(NR.clone(number), number, "number was cloned correctly");
        assert.strictEqual(NR.clone(string), string, "string was cloned correctly");
        assert.strictEqual(NR.clone(float), float, "float was cloned correctly");

        assert.propEqual(arrayClone, array, "array properties was cloned correctly");
        assert.propEqual(objectClone, object, "array properties was cloned correctly");

        assert.notEqual(arrayClone, array, "array was cloned correctly");
        assert.notEqual(objectClone, object, "array was cloned correctly");
    });

    NRT.test('keys', function () {
        var assert = this,
            a,
            trouble,
            troubleKeys;

        assert.deepEqual(NR.keys({
            one: 1,
            two: 2
        }), ['one', 'two'], 'can extract the keys from an object');
        // the test above is not safe because it relies on for-in enumeration order
        a = [];
        a[1] = 0;
        assert.deepEqual(NR.keys(a), ['1'], 'is not fooled by sparse arrays; see issue #95');
        assert.deepEqual(NR.keys(null), []);
        assert.deepEqual(NR.keys(void 0), []);
        assert.deepEqual(NR.keys(1), []);
        assert.deepEqual(NR.keys('a'), []);
        assert.deepEqual(NR.keys(true), []);

        // keys that may be missed if the implementation isn't careful
        trouble = {
            constructor: Object,
            valueOf: function () {},
            hasOwnProperty: null,
            toString: 5,
            toLocaleString: void 0,
            propertyIsEnumerable: /a/,
            isPrototypeOf: this,
            '__defineGetter__': Boolean,
            '__defineSetter__': {},
            '__lookupSetter__': false,
            '__lookupGetter__': []
        };
        troubleKeys = ['constructor', 'valueOf', 'hasOwnProperty', 'toString', 'toLocaleString', 'propertyIsEnumerable',
              'isPrototypeOf', '__defineGetter__', '__defineSetter__', '__lookupSetter__', '__lookupGetter__'].sort();
        assert.deepEqual(NR.keys(trouble).sort(), troubleKeys, 'matches non-enumerable properties');
    });

    NRT.test('allKeys', function () {
        var assert = this,
            a,
            trouble,
            troubleKeys,
            b;

        assert.deepEqual(NR.allKeys({
            one: 1,
            two: 2
        }), ['one', 'two'], 'can extract the allKeys from an object');
        // the test above is not safe because it relies on for-in enumeration order
        a = [];
        a[1] = 0;
        assert.deepEqual(NR.allKeys(a), ['1'], 'is not fooled by sparse arrays; see issue #95');

        a.a = a;
        assert.deepEqual(NR.allKeys(a), ['1', 'a'], 'is not fooled by sparse arrays with additional properties');

        [null, void 0, 1, 'a', true, NaN, {}, [], 5, new Date(0)].forEach(function (val) {
            assert.deepEqual(NR.allKeys(val), []);
        });

        // allKeys that may be missed if the implementation isn't careful
        trouble = {
            constructor: Object,
            valueOf: function () {},
            hasOwnProperty: null,
            toString: 5,
            toLocaleString: void 0,
            propertyIsEnumerable: /a/,
            isPrototypeOf: this
        };
        troubleKeys = ['constructor', 'valueOf', 'hasOwnProperty', 'toString', 'toLocaleString', 'propertyIsEnumerable',
              'isPrototypeOf'].sort();
        assert.deepEqual(NR.allKeys(trouble).sort(), troubleKeys, 'matches non-enumerable properties');

        function A() {}
        A.prototype.foo = 'foo';
        b = new A();
        b.bar = 'bar';
        assert.deepEqual(NR.allKeys(b).sort(), ['bar', 'foo'], 'should include inherited keys');

        function y() {}
        y.x = 'z';
        assert.deepEqual(NR.allKeys(y), ['x'], 'should get keys from constructor');
    });

    NRT.test('extend', function () {
        var assert = this,
            result,
            F,
            subObj;

        assert.equal(NR.extend({}, {
            a: 'b'
        }).a, 'b', 'can extend an object with the attributes of another');

        assert.equal(NR.extend({
            a: 'x'
        }, {
            a: 'b'
        }).a, 'b', 'properties in source override destination');

        assert.equal(NR.extend({
            x: 'x'
        }, {
            a: 'b'
        }).x, 'x', "properties not in source don't get overriden");

        result = NR.extend({
            x: 'x'
        }, {
            a: 'a'
        }, {
            b: 'b'
        });

        assert.deepEqual(result, {
            x: 'x',
            a: 'a',
            b: 'b'
        }, 'can extend from multiple source objects');

        result = NR.extend({
            x: 'x'
        }, {
            a: 'a',
            x: 2
        }, {
            a: 'b'
        });

        assert.deepEqual(result, {
            x: 2,
            a: 'b'
        }, 'extending from multiple source objects last property trumps');

        result = NR.extend({}, {
            a: void 0,
            b: null
        });

        assert.deepEqual(NR.keys(result), ['a', 'b'], 'extend copies undefined values');

        F = function () {};
        F.prototype = {
            a: 'b'
        };
        subObj = new F();
        subObj.c = 'd';

        assert.deepEqual(NR.extend({}, subObj), {
            a: 'b',
            c: 'd'
        }, 'extend copies all properties from source');

        NR.extend(subObj, {});
        assert.ok(!subObj.hasOwnProperty('a'), "extend does not convert destination object's 'in' properties to 'own' properties");

        try {
            result = {};
            NR.extend(result, null, void 0, {
                a: 1
            });
        } catch (e) { /* ignored */ }

        assert.equal(result.a, 1, 'should not error on `null` or `undefined` sources');

        assert.strictEqual(NR.extend(null, {
            a: 1
        }), null, 'extending null results in null');

        assert.strictEqual(NR.extend(void 0, {
            a: 1
        }), void 0, 'extending undefined results in undefined');
    });
}(window.NR, window.NRT));
