# kamikaze

Making functions self destructing in a few seconds if not executed.

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

var cb = kamikaze(function(err) {
  if (err) {
    console.error(err);
  }
  console.log('Hello world!');
}, 5000);
```


## License

The MIT License (MIT)
