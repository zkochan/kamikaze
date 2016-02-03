'use strict'
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var chai = require('chai')
var expect = chai.expect
var kamikaze = require('.')

chai.use(sinonChai)

describe('kamikaze input', function() {
  it('should throw error if first parameter is not a number', function() {
    expect(function() {
      kamikaze('not a number')
    }).to.throw(Error)
  })

  it('should throw error if second parameter is not a function', function() {
    expect(function() {
      kamikaze(1, 'not a function')
    }).to.throw(Error)
  })
})

describe('kamikaze', function() {
  beforeEach(function() {
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function() {
    this.clock.restore()
  })

  it('should pass an error to the callback if the wrapper wasn\'t executed in time', function() {
    var cb = sinon.spy()
    kamikaze(10, cb)

    this.clock.tick(20)

    expect(cb).to.have.been.calledOnce
    expect(cb.getCall(0).args[0].message)
      .to.be.eq('Method execution exceeded the time limit of `10`')
  })

  it('shouldn\'t do an emergency execution of the callback if the wrapper was called before timeout', function() {
    var cb = sinon.spy()
    var wcb = kamikaze(1000, cb)
    wcb(1, 2, 3)

    this.clock.tick(2000)

    expect(cb).to.have.been.calledOnce
    expect(cb).to.have.been.calledWithExactly(1, 2, 3)
  })

  it('should never do an emergency execution of the callback if the timeout is set to Infinity', function() {
    var cb = sinon.spy()
    var wcb = kamikaze(Infinity, cb)

    this.clock.tick(10000)

    expect(cb).to.not.have.been.called
  })

  it('shouldn\'t execute the callback after emergency execution', function() {
    var cb = sinon.spy()
    var func = kamikaze(10, cb)

    this.clock.tick(20)

    func()

    expect(cb).to.have.been.calledOnce
    expect(cb.getCall(0).args[0].message)
      .to.be.eq('Method execution exceeded the time limit of `10`')
  })

  it('should never execute the callback more than once', function() {
    var cb = sinon.spy()
    var func = kamikaze(Infinity, cb)

    func()
    func()

    expect(cb).to.have.been.calledOnce
  })
})
