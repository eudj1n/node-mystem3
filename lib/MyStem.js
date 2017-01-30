'use strict';

var childProcess = require('child_process');
var readline = require('readline');
var path = require('path');

function MyStem(args) {
    args = args || {};
    this.path = args.path || path.join(__dirname, '..', 'vendor', process.platform, 'mystem');
    this.handlers = [];
}

MyStem.prototype = {

    start: function (params) {

        if (this.mystemProcess) return;

        var options = params || ['--format', 'json', '--eng-gr', '-i'];

        this.mystemProcess = childProcess.spawn(this.path, options);
        var rd = readline.createInterface({input: this.mystemProcess.stdout, terminal: false});

        rd.on('line', function (line) {
            var handler = this.handlers.shift();

            if (handler) {
                var data = JSON.parse(line);
                handler.resolve(this._getAnalysis(data) || handler.word);
            }
        }.bind(this));

        this.mystemProcess.on('error', function (err) {
            var handler = this.handlers.shift();

            if (handler) {
                handler.reject(err);
            }
        }.bind(this));

        process.on('exit', function () {
            if (this.mystemProcess) {
                this.mystemProcess.kill();
            }
        }.bind(this));
    },

    stop: function () {
        if (this.mystemProcess) {
            this.mystemProcess.kill();
        }
    },

    parse: function (text) {
        return new Promise(function (resolve, reject) {

            if (!this.mystemProcess) {
                throw 'You should call MyStem.start()';
            }

            this.mystemProcess.stdin.write(text + '\n');

            this.handlers.push({
                resolve: resolve,
                reject: reject,
                text: text
            });

        }.bind(this));
    },

    _getAnalysis: function (data) {
        return data;
    }
};


module.exports = MyStem;