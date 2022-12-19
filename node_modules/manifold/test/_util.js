'use strict';

var fs = require('fs');

module.exports = {
  irand : function (){
    return Math.random()*10;
  },
  sample : function(){

    var self = this;
    return [
      'get',
      'get page.',
      'get page.view',
      'get page.data',
      'get /',
      'get /:page',
      'get /:page/view',
      'get /:page/:view'
    ].sort(function(){
      return self.irand()*Math.pow(-1, Math.floor(self.irand()));
    }, self);
  },
  testSuite : function(){
    var testSuite = fs.readdirSync(__dirname);

    // first tests
    var first = [
      'sample.js',
      'rootNode.js',
      'parent.js'
    ];
    // files to exclude
    var exclude = [
      '_main.js',
      '_util.js',
      '.jshintrc'
    ];
    // last
    var last = [ ];

    // omit _main & _util files
    first.concat(exclude, last).forEach(function(file){
      testSuite.splice(testSuite.indexOf(file), 1);
    });

    return first.concat(testSuite, last);
  }
};
