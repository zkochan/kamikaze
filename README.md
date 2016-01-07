# kamikaze

A callback wrapper that executes it with a timeout error if not called in time.

[![Dependency Status](https://david-dm.org/zkochan/kamikaze/status.svg?style=flat)](https://david-dm.org/zkochan/kamikaze)
[![Build Status](https://travis-ci.org/zkochan/kamikaze.svg?branch=master)](https://travis-ci.org/zkochan/kamikaze)
[![npm version](https://badge.fury.io/js/kamikaze.svg)](http://badge.fury.io/js/kamikaze)


## Installation

```js
npm install --save kamikaze
```


## Usage

```js
var kamikaze = require('kamikaze');

var cb = kamikaze(5000, function(err) {
  if (err) {
    console.error(err);
  }
  console.log('Hello world!');
});
```


## License

The MIT License (MIT)
