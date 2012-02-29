function Flower(func, args) {
  this.func = func;
  this.args = args;
}

Flower.prototype.force = function (next) {
  var args = this.args;
  var isDoneFlags = Array(args.length);
  var count = 0;
  var realArgs = Array(args.length);
  var isFailure = false;

  args.forEach(function (val, i) {
    if (val instanceof Flower) {
      count ++;
      val.force(function (err) {
        if (isFailure) return;
        if (isDoneFlags[i]) return;

        isDoneFlags[i] = true;
        count --;
        if (err instanceof Error) {
          isFailure = true;
          error();
        }        
        var result = Array.prototype.slice.call(arguments, 1);
        if (result.length === 0) {
          realArgs[i] = undefined; 
        } else if (result.length === 1) {
          realArgs[i] = result[0];
        } else{
          realArgs[i] = result;
        }
        done();
      });
    } else {
      realArgs[i] = val;
      done();
    }
  });

  var that = this;

  function error () {
    if (next) {
      next();
    }
  }

  function done () {
    if (count <= 0) {
      process.nextTick(function () {
        if (next) {
          that.func.apply(null, realArgs.concat([next]));
        } else {
          that.func.apply(null, realArgs);
        }
      });
    }
  }
};

Function.prototype.flower = function (/* args */) {
  var args = Array.prototype.slice.call(arguments);
  return new Flower(this, args);
};