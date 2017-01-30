'use strict';

const MyStem = require('../lib/MyStem');

const myStem = new MyStem();

myStem.start();

let words = ['карусели', 'немцы', 'печалька'];

let promises = words.map(function (word) {
    return myStem.parse(word)
});

Promise.all(promises).then((lemmas) => {
    console.log(lemmas);
    myStem.stop();
});