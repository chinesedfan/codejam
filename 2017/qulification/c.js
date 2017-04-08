var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var tokens = lines[l++].split(' ');
    console.log('Case #%d: %s', i + 1, solve(parseInt(tokens[0]), parseInt(tokens[1])));
}

function solve(n, k) {
    var result = n2maxmin(n);
    var bin = n2bin(k);
    for (var i = 1; i < bin.length; i++) {
        if (n & 1) {
            result = n2maxmin(result.max);
        } else if (!bin[i]) {
            result = n2maxmin(result.max);
        } else {
            result = n2maxmin(result.min);
        }
    }
    return result.max + ' ' + Math.max(0, result.min);
}

function n2maxmin(n) {
    return (n & 1) ? {
        max: (n - 1) / 2,
        min: (n - 1) / 2
    } : {
        max: n / 2,
        min: (n - 2) / 2
    };
}
function n2bin(n) {
    var result = [];
    while (n) {
        result.unshift(n & 1);
        n >>= 1;
    }
    return result;
}
