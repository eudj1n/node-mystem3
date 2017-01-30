var assert = require('chai').assert;

var MyStem = require('../lib/MyStem');

test('Lemmatize known word', function (done) {
    var myStem = new MyStem();
    myStem.start();

    myStem.parse("немцы").then(function (lemma) {
        assert.equal(lemma[0].analysis[0].lex, "немец");
    }).then(function () {
        myStem.stop();
        done();
    });
});

test('Lemmatize text', function (done) {
    var myStem = new MyStem();
    myStem.start();

    myStem.parse("Программа производит морфологический анализ текста на русском языке").then(function (lemma) {
        assert.equal(lemma.length, 8);
    }).then(function () {
        myStem.stop();
        done();
    });
});


test('Lemmatize unknown word', function (done) {
    var myStem = new MyStem();
    myStem.start();

    myStem.parse("кркркрк").then(function (lemma) {
        assert.equal(lemma[0].text, 'кркркрк');
    }).then(function () {
        myStem.stop();
        done();
    });
});

test('Lemmatize non word', function (done) {
    var myStem = new MyStem();
    myStem.start();

    myStem.parse("123яблоко").then(function (lemma) {
        assert.equal(lemma.length, 0);
    }).then(function () {
        myStem.stop();
        done();
    });
});