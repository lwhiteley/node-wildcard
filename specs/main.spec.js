var test = require('tap').test;
var wildcard = require('../');
var forEach = require('lodash.foreach');

test('node-wildcard suite: ', function (t) {
    t.test('when wildcard is called without options: ', function (t) {

        var result = wildcard('a', 'a.*' );

        t.notOk(result, 'should be false when a string does not match wildcard criteria ');
        t.notOk(wildcard(1233, '123*'), 'should be false when a number is passed but type not included') // => false
        t.notOk(wildcard(false, 'fal*'), 'should be false when a boolean is passed but type not included') // => false
        t.notOk(wildcard(/false/, '*fal*'), 'should be false when a regexp is passed but type not included ') // => false

        t.end();
    });

    t.test('when wildcard is called with empty options: ', function (t) {

        t.notOk(wildcard(1233, '123*', {}), 'should be false when a number is passed')
        t.notOk(wildcard(false, 'fal*', {}), 'should be false when a boolean is passed')
        t.notOk(wildcard(/false/, '*fal*', {}), 'should be false when a regexp is passed')

        t.end();
    });

    t.test('when wildcard is called with options and empty include array: ', function (t) {

        t.notOk(wildcard(1233, '123*', {include:[]}), 'should be false when a number is passed')
        t.notOk(wildcard(false, 'fal*', {include:[]}), 'should be false when a boolean is passed')
        t.notOk(wildcard(/false/, '*fal*', {include:[]}), 'should be false when a regexp is passed')

        t.end();
    });

    t.test('when wildcard is called with options and include array excludes passed type: ', function (t) {

        t.notOk(wildcard(1233, '123*', {include:['regexp', 'boolean']}), 'should be false when a number is passed')
        t.notOk(wildcard(false, 'fal*', {include:['regexp', 'number']}), 'should be false when a boolean is passed')
        t.notOk(wildcard(/false/, '*fal*', {include:['number', 'boolean']}), 'should be false when a regexp is passed')

        t.end();
    });

    t.test('when wildcard is called with options and include array includes passed type: ', function (t) {

        t.ok(wildcard(1233, '123*', {include:['number', 'boolean']}), 'should be true when a number is passed')
        t.ok(wildcard(false, 'fal*', {include:['boolean', 'number']}), 'should be true when a boolean is passed')
        t.ok(wildcard(/false/, '*fal*', {include:['regexp', 'boolean']}), 'should be true when a regexp is passed')

        t.end();
    });

    t.test('when wildcard is called with object as passed value: ', function (t) {
      var testObj = {
        'a.b': {},
        'a': {},
        'controllers:users': {}
      }
      var expected = {
        'a.b': {}
      }
      var expected2 = {
        'controllers:users': {}
      }
      var testArray = ['a.b', 'a']

        t.same(wildcard(testObj, 'a.*' ), expected, 'should return object with only properties that match the wildcard')
        t.same(wildcard(testObj, 'controllers:*' ), expected2, 'should return object with only properties that match the wildcard even if special chars are in wildcard')
        t.same(wildcard(testObj, 'fal*'), {}, 'should return empty obj if none match')

        t.end();
    });

    t.test('when wildcard is called with array as passed value: ', function (t) {

      var expected = ['a.b']
      var testArray = ['a.b', 'a']

        t.same(wildcard(testArray, 'a.*' ), expected, 'should return array with only values that match the wildcard')
        t.same(wildcard(testArray, 'fal*'), [], 'should return empty array if none match')

        t.end();
    });

    t.end();
});
