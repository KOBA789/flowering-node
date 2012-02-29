var fs = require('fs');
var flowering = require('../');

var foo = fs.readFile.flower('/tmp/a.txt', 'utf-8');
var bar = fs.readFile.flower('/tmp/b.txt', 'utf-8');

var join = function (a, b, next) {
  next(null, a.trim() + '-' + b.trim());
};

var baz = join.flower(foo, bar);

console.log.flower(baz).force();