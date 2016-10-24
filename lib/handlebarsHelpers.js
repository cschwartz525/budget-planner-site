var ifeq = function(a, b, opts) {
  if(a === b) {
    return opts.fn(this);
  }
  else {
    return opts.inverse(this);
  }
};

module.exports = {
  ifeq: ifeq
};
