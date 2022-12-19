'use strict';

var Parth = require('parth');

exports = module.exports = {};

// dependencies
//
exports.type = require('utils-type');
exports.merge = require('lodash.merge');
exports.clone = require('lodash.clone');
exports.inherits = require('inherits');

// Super helper
//
exports.super = function(instance, method){
  return function (/* arguments */){
    return Parth.prototype[method].apply(instance, arguments);
  };
};
