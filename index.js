'use strict';

var once = require('once');

function kamikaze(cb, ttl) {
  if (typeof cb !== 'function') {
    throw new Error('cb has to be a function');
  }

  if (typeof ttl !== 'number') {
    throw new Error('ttl has to be a number');
  }

  var wcb = once(cb);

  if (ttl === Infinity) {
    return wcb;
  }

  var timeoutId = setTimeout(function() {
    wcb(new Error('Method execution exceeded the time limit of `' + ttl + '`'));
  }, ttl);

  return function() {
    clearTimeout(timeoutId);
    return wcb.apply(this, arguments);
  };
}

module.exports = kamikaze;
