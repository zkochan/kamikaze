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

  it('should pass an error to the callback if the wrapper wasn\'t executed in time', function() {
    var spy = sinon.spy();
    kamikaze(spy, 10);
    this.clock.tick(20);
    expect(spy.calledOnce).to.be.true;
    expect(spy.getCall(0).args[0].message)
      .to.be.eq('Method execution exceeded the time limit of `10`');
  });

  it('shouldn\'t do an emergency execution of the callback if the wrapper was called before timeout', function() {
    var spy = sinon.spy();
    var func = kamikaze(spy, 1000);
    func(1, 2, 3);
    this.clock.tick(2000);

    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWithExactly(1, 2, 3)).to.be.true;
  });

  it('should never do an emergency execution of the callback if the timeout is set to Infinity', function() {
    var spy = sinon.spy();
    var func = kamikaze(spy, Infinity);

    this.clock.tick(10000);

    expect(spy.called).to.be.false;
  });
});
