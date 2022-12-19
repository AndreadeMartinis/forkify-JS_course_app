'use strict';

var primitive = /undefined|null|string|number|boolean|symbol/;
var __toString = Object.prototype.toString;

exports = module.exports = type;

function type(src){
  var strRep;
  var className = getClassName(src);

  var o = Object.create(null);
  if(primitive.test(className)){
    if(className === 'number'){
      strRep = src + '';
      if(parseInt(strRep) === src){
        o.integer = src;
      } else if(/\./.test(strRep)){
        o.float = src;
      } else if(src){
        o.infinity = src;
      } else {
        o.nan = true;
        return o;
      }
    }
    o[className] = src || Boolean(src + '') || ' ';
    return o;
  }

  // everything else is an object
  o[className] = o.object = src;
  var ctorName = (src.constructor.name || '').toLowerCase();

  if (className !== ctorName) {
    o[ctorName] = src;
  } else if(className === 'object'){
    o.plainObject = src;
    return o;
  }

  // exploit node's util.inherits pattern
  var super_ = src.constructor.super_;
  while(super_){
    o[super_.name.toLowerCase()] = src;
    super_ = super_.super_;
  }

  return o;
}

function getClassName(src){
  return __toString.call(src).match(/\w+/g)[1].toLowerCase();
}
