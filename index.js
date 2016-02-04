'use strict'
var once = require('once')

module.exports = kamikaze

function kamikaze(ttl, cb) {
  if (typeof ttl !== 'number') {
    throw new Error('ttl has to be a number')
  }

  if (typeof cb !== 'function') {
    throw new Error('cb has to be a function')
  }

  var safecb = once(cb)

  if (ttl === Infinity) {
    return safecb
  }

  var timeoutId = setTimeout(function() {
    safecb(new Error('Method execution exceeded the time limit of `' + ttl + '`'))
  }, ttl)

  function result() {
    clearTimeout(timeoutId)
    return safecb.apply(this, arguments)
  }
  result.timeoutId = timeoutId

  return result
}
