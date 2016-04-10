var fs = require('fs');
var _ = require('lodash');
var BigInteger = require('biginteger').BigInteger;

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var n = parseInt(lines[l++]);
    var counts = _.map(lines[l++].split(' '), function(x) { return parseInt(x); });
    console.log('Case #%d: %d %d', i + 1, solve1(counts), solve2(counts));
}

function solve1(counts) {
    return _.reduce(counts, function(sum, n, i) {
        if (i != 0 && n < counts[i - 1]) {
            sum += counts[i - 1] - n;
        }
        return sum;
    }, 0);
}

function solve2(counts) {
    var max = 0;
    _.each(counts, function(n, i) {
        if (i != 0 && n < counts[i - 1] && counts[i - 1] - n > max) {
            max = counts[i - 1] - n;
        }
    });

    return _.reduce(counts, function(sum, n, i) {
        if (i == 0) {
            // skip
        } else {
            sum += Math.min(counts[i - 1], max);
        }
        return sum;
    }, 0);
}
