var fs = require('fs');
var _ = require('lodash');
var BigInteger = require('biginteger').BigInteger;

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t;
_.each(lines, function(line, i) {
    if (i == 0) {
        t = parseInt(line);
        return;
    } else if (i <= t) {
        var tokens = line.split(' ');
        var k = parseInt(tokens[0]);
        var c = parseInt(tokens[1]);
        var s = parseInt(tokens[2]);
        console.log('Case #%d: %s', i, solve(k, c, s));
    }
});

/**
 * Suppose L = 1, G = 0, the origin artwork is [T0, T1, ..., Tk-1]
 * If c = 1, and present the position as `a`(base k), then the tile is `Ta`
 * If c = 2, and present the position as `ab`(base k), then the tile is `Ta & Tb`
 * So it requires to check `k + 1 - c` tiles at least
 */
function solve(k, c, s) {
    if (s < k + 1 - c) {
        return 'IMPOSSIBLE';
    }

    var result = [];
    result.push(posForMost(k, c));
    for (var i = c; i < k; i++) {
        result.push(posForSingle(k, c, i));
    }
    return result.join(' ');
}
/**
 * @return {String} the position which only affected by tile i
 */
function posForSingle(k, c, i) {
    if (k == 1) return 1; // starts from 1

    var bigK = BigInteger(k);
    var bigX = bigK.pow(c).subtract(1).divide(k - 1);
    // the sum of i*k^0 + i*k^1 + ... + i*k^(c-1) = i*(k^c - 1)/(k - 1)
    return bigX.multiply(i).add(1).toString();
}
/**
 * @return {String} the position which contains tiles 0 to c - 1
 */
function posForMost(k, c) {
    // the sum of 0*k^0 + 1*k^1 + ... + (c-1)*k^(c-1)
    var i = 0, x = BigInteger(1),
        limit = Math.min(k, c),
        sum = BigInteger(0);

    while (i < limit) {
        sum = sum.add(x.multiply(i));
        i++;
        x = x.multiply(k);
    }
    return sum.add(1).toString();
}
