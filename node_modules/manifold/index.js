'use strict';

var util = require('./lib/util');
var Parth = require('parth');

exports = module.exports = Manifold;

/*
  ## module.exports
*/
function Manifold(){
  if(!(this instanceof Manifold)){
    return new Manifold();
  }

  this.root = {};
  Parth.call(this);
}
util.inherits(Manifold, Parth);

/* ## manifold.set([path, props])
> set a path to regex mapping for an object

_arguments_
- `path` type string
- `props` type function or plainObject
 - when is a function it will be assigned to the `options.handle`
 - when is a plainObject, all option properties
   are passed first to a `parser` if there is one and if not,
  that property is cloned and assigned to the node props

_returns_ this

The path is taken as a regular expression
using the [parth](http://github.com/stringparser/parth) module,
which uses the usual conventions on for path to regexp parsing.
So you know... interesting things can happen.
*/

Manifold.prototype.set = function(path, opt){
  opt = opt || path;

  var o = util.type(opt).plainObject || {};
  o.path = util.type(o.path || path).string;
  o.handle = util.type(o.handle || opt).function;
  o.parent = util.type(o.parent).string;

  var node = this.root;
  if(o.path && !node[o.path]){
    util.super(this, 'set')(o.path);
    node = this.store[o.path];
  } else if(this.store[o.path]){
    node = this.store[o.path];
  }

  if(o.parent && o.parent !== o.path && this.store[o.parent]){
    node.parent = this.store[o.parent];
    o.parent = null;
  }

  Object.keys(o).forEach(function(key){
    var value = o[key]; if(!value){ return; }
    if(util.type(value).plainObject){
      if(!node[key]){ node[key] = {}; }
      util.merge(node[key], util.clone(value, true));
    } else {
      node[key] = util.clone(o[key], true);
    }
  }, this);

  return this;
};

/*
## manifold.get
```js
function get([string path, object options])
```
Get an object previously set matching the `path` given.

_arguments_
 - `path`, optional, type string
 - `options`, optional, type object with all extra information

_when_
 - `options.ref` is `true` the original node is returned
 - the node found has a parent property the parent properties are cloned into the returned object

_returns_ the object (cloned/by reference) `node` found
*/

var skipRE = /children|parent/;

Manifold.prototype.get = function(path, opt){
  var o = util.type(opt || path).plainObject || {};
  var stem = util.super(this, 'get')(path, o);
  var node = stem ? this.store[stem.path] : this.root;

  if(o.ref){ return node; }

  (function whilst(){
    Object.keys(node).forEach(function(key){
      if(skipRE.test(key)){ return; }
      o[key] = util.clone(node[key], true);
    });

    if(node.parent && node !== node.parent){
      node = node.parent;
      whilst();
    }
  })();

  return o;
};
