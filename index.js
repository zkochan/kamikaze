'use strict';

function kamikaze(cb, ttl) {
  if (ttl === Infinity) {
    return cb;
  }

  var killed = false;
  var timeoutId = setTimeout(function() {
    cb(new Error('Method execution exceeded the time limit of `' + ttl + '`'));
    killed = true;
  }, ttl);

  return function() {
    if (killed) {
      return;
    }
    clearTimeout(timeoutId);
    return cb.apply(this, arguments);
  };
}

module.exports = kamikaze;
