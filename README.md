# node-wildcard
simple wildcard matcher for string, arrays and objects.

This module has the ability to pass in options to include non string values to be tested as well.

Allowed non-string types are: 'number', 'boolean', 'regexp'

eg.
```js
var wildcard = require('node-wildcard');
var testObj = {
  'a.b': {},
  'a': {}
}
var testArray = ['a.b', 'a']

// ways to use
console.log(wildcard('a', 'a.*' )) // => false
console.log(wildcard('a.', 'a.*' )) // => true
console.log(wildcard(testObj, 'a.*' )) // => { 'a.b': {} }
console.log(wildcard(testArray, 'a.*' )) // => [ 'a.b' ]

var options = {include: ['number', 'boolean', 'regexp']}

console.log(wildcard(143, '123*', options)) // => false
console.log(wildcard(1233, '123*' , options)) // => true
console.log(wildcard(false, 'fal*' , options)) // => true
console.log(wildcard(/false/, '*fal*' , options)) // => true
```

Better Docs Coming Soon


pull requests are encouraged.
