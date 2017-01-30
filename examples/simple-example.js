'use strict';

var MyStem = require('../lib/MyStem');

var myStem = new MyStem();

myStem.start();

var words = ['карусели', 'немцы', 'печалька'];

var promises = words.map(function(word) {
    return myStem.parse(word)
});

Promise.all(promises).then(function(lemmas) {
    console.log(lemmas);
    myStem.stop();
});
