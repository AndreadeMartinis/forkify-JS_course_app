'use strict';

var Manifold = require('../');
var should = require('should');
var util = require('./_util.js');

var path = require('path');
var packageName = require('../package').name;

describe(packageName, function(){
  util.testSuite().forEach(function(file){
    var suite = path.basename(file, path.extname(file));
    describe(suite, function(){
      // the actual suite code
      require('./'+file)(Manifold, util);
    });
  });
});
