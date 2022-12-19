'use strict';

module.exports = function(Manifold, util){
  var app = new Manifold();
  function rootHandle(){ return; }

  var sample = util.sample();
  it('add test data', function(){
    sample.forEach(app.set.bind(app));
    app.set(rootHandle);
  });

  it('should have properties ({ref: true})', function(){
    app.get({ref: true})
      .should.have.property('handle', rootHandle);
  });

  it('should not have properties ({ref: true})', function(){
    app.get({ref: true})
      .should.not.have.property(['path', 'parent']);
  });

  it('should have properties ({ref: true})', function(){
    app.get()
      .should.have.properties(['handle', 'notFound']);
  });

};
