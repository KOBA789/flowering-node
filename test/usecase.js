var flowering = require('../lib');
var Nothing = flowering.Nothing;
var Just = flowering.Just;

var http = require('http');
var url = require('url');

var fetch = function (urlString, next) {
  var options = url.parse(urlString);
  
  http.get(options, function(res) {
    next(Just(res.body));
  }).on('error', function(e) {
    next(Nothing());
  });
};

fetch = flowering.flower(fetch);

var a = fetch('http://koba789.com/storage/a.txt');
var b = fetch('http://koba789.com/storage/b.txt');
var c = fetch('http://koba789.com/storage/c.txt');

a.show = function (val) {
  console.log('a:' , val);
};

var concat = function (a, b, c) {
  return Just([a, b, c].join(' '));
};

var joined = concat.flower(a, b, c);

joined.show = function (val) {
  console.log('joined:', val);
};