var request = require('request');

var join = function () {
  var args = arguments;
  var results = Array(args.length);
  var count = 0;
  return function (next) {
    for (var i = 0; i < args.length; ++ i) {
      (function (i) {
        args[i](function () {
          if (results[i] === undefined) {
            results[i] = arguments;
            count ++;
            if (count >= args.length) {
              process.nextTick(function () {
                next.apply(null, results);
              });
            }
          }
        });
      })(i);
    }
  };
};

Function.prototype.flower = function () {
  var args = Array.prototype.slice.call(arguments);
  return function (next) {
    this.apply(null, args.concat(next));
  }.bind(this);
};

var a = request.flower('http://koba789.com/storage/a.txt');
var b = request.flower('http://koba789.com/storage/b.txt');
var c = request.flower('http://koba789.com/storage/c.txt');

join(a,b,c)(function (a, b, c) {
  console.log([a[2], b[2], c[2]].join(''));
});