var forEach = require('lodash.foreach'),
    wildcardMatcher = require('wildcard2'),
    matchers = {},
    itypeof = function (val) {
        return Object.prototype.toString.call(val).replace(/(\[|object|\s|\])/g, '').toLowerCase();
    };

var normalize = function(value, options){
  if(itypeof(options) === 'object' && options.convertNumbers && itypeof(value) === 'number'){
    value = value.toString();
  }
  return value;
};

matchers.number = matchers.string = function(value, wildcard, options){
  return wildcardMatcher(normalize(value, options), wildcard);
};

matchers.object = function(obj, wildcard, options){
  var result = {};
  forEach(obj, function(value, key){
    if(matchers.string(normalize(key, options), wildcard)){
      result[key] = value;
    }
  });
  return result;
};

matchers.array = function(array, wildcard, options){
  var result = [];
  forEach(array, function(value, key){
    if(matchers.string(normalize(value, options), wildcard)){
      result.push(value);
    }
  });
  return result;
};

module.exports = function(value, wildcard, options){
  var type = itypeof(value);
  var result = null;
  if(matchers[type]){
    result = matchers[type](value, wildcard, options);
  }
  if(!result){
    return false;
  }
  return result;
};
