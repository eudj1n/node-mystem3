[![Build Status](https://travis-ci.org/eudj1n/node-mystem3.svg)](https://travis-ci.org/eudj1n/node-mystem3)

MyStem
------

This module contains a wrapper for an excellent morphological analyzer for Russian language Yandex Mystem 3.0 released in June 2014. A morphological analyzer can perform lemmatization of text and derive a set of morphological attributes for each token.


This module start mystem as separate process and communicates with it. 
This allows to avoid process start overhead.

## Installation

```bash
npm i eudj1n/node-mystem3 --save
```

## Example

```javascript

const MyStem = require('mystem3');

let myStem = new MyStem();
myStem.start(); // Run mystem in separate process

myStem.parse("немцы").then(function(lemma) {
    console.log(lemma);
}).then(function() {
    myStem.stop(); // Or you can write process.exit();
}).catch(console.error);

```

## Methods

### new MyStem(options)

Return myStem object. Supported options are:

1. "path" (optional, by default module downloads mystem binary itself) - path to mystem executable. If PATH env variable contains path to the folder with mystem binary then you can write ```new MyStem({"path": "mystem"})```

### myStem.start(options)

Starts mystem as separate process and establishes communication with it. This gives huge performance boost. As we do not need to start mystem for every word

Param "options" contains run options for mystem. Default values:

```bash
--format json --eng-gr -i
```
See all available options here: https://tech.yandex.ru/mystem/doc/index-docpage/#options
### myStem.stop()

Stops mystem process. Will be automatically stopped on process.exit();

### myStem.parse(text)

Returns promise with analysis of provided text.

## AUTHOR
eudj1n (Eugene Kozlov)

Forked from koorchik (Viktor Turskyi)