'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var kamikaze = require('./');

describe('kamikaze input', function() {
  it('should throw error if first parameter is not a function', function() {
    expect(function() {
      kamikaze(1);
    }).to.throw(Error);
  });

  it('should throw error if second parameter is not a number', function() {
    expect(function() {
      kamikaze(function() {}, 'string');
    }).to.throw(Error);
  });
});

describe('kamikaze', function() {
  before(function() {
    this.clock = sinon.useFakeTimers();
  });

  afterEach(function() {
    this.clock.restore();
  });

  it('if the function wasn`t executed the callback function is called with an error', function() {
    var spy = sinon.spy();
    kamikaze(spy, 10);
    this.clock.tick(20);
    expect(spy.calledOnce).to.be.true;
    expect(spy.getCall(0).args[0].message)
      .to.be.eq('Method execution exceeded the time limit of `10`');
  });

  it('if the function was executed the callback function is not called with an error', function() {
    var spy = sinon.spy();
    var func = kamikaze(spy, 1000);
    func(1, 2, 3);
    this.clock.tick(2000);

    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWithExactly(1, 2, 3)).to.be.true;
  });

  it('if the timeout is set to infinity then never call the function', function() {
    var spy = sinon.spy();
    var func = kamikaze(spy, Infinity);

    this.clock.tick(10000);

    expect(spy.called).to.be.false;
  });
});
