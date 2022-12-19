'use strict';

module.exports = function(Manifold, util){

  it('data creation should not fail', function(){
    util.sample();
  });

  it('sample data should be random', function(){
    var sampleData = util.sample();
    util.sample().should.not.be.eql(sampleData);
  });
};
