'use strict';

var app = require('./.')();

var input = [
  {
    path: 'get /user/:page(\\d+)', opt: {
      parent: 'get /user',
      handle: function getUserPage(){}
    },
  },
  {
    path: 'get /user', opt: {
      picture: function getPicture(){},
      render: function markup(){}
    }
  }
].map(function(input){
  app.set(input.path, input.opt);
  return input;
});

console.log(input);
console.log(' ---- ');

console.log(app.get('get /user/10'));
