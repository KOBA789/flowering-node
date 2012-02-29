var request = require('request');

Function.prototype.fbind = function () {
  var args = Array.prototype.slice.call(arguments);
  return function (next) {
    this.apply(null, args.concat(next));
  }.bind(this);
};

Function.prototype.flazy = function () {
  var args = Array.prototype.slice.call(arguments);
  return function (next) {
    
  }.bind(this);
};

var foo = request.fbind('http://koba789.com/storage/a.txt');
var bar = request.fbind('http://koba789.com/storage/b.txt');

function join(a, b) {
  return a + b;
}

var joined = join.flazy(foo, bar);

joined(function (err, val) {
  console.log(err, val);
});