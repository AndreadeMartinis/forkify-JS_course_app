'use strict';

module.exports = function(Manifold, util){
  var app = new Manifold();
  var sample = util.sample();

  it('add test data', function(){
    sample.forEach(app.set.bind(app));
  });

  it('should parent object attached', function(){
    var parent = app.store['get /'];
    app.set('get /:page', {parent: 'get /'});
    app.get('get /page', {ref: true}).parent
       .should.be.eql(parent);
  });
};
