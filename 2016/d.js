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
 * So it requires to check `k / c` tiles at least
 */
function solve(k, c, s) {
    if (s * c < k) {
        return 'IMPOSSIBLE';
    }

    var result = [];
    for (var i = 0; i < k; i += c) {
        result.push(posForArr(k, c, _.range(i, Math.min(i + c, k))));
    }
    return result.join(' ');
}

/**
 * @return {String} the position which contains tiles arr[0] to arr[arr.length - 1]
 */
function posForArr(k, c, arr) {
    // the sum of arr[0]*k^0 + arr[1]*k^1 + ... + arr[c-1]*k^(c-1)
    var i = 0, x = BigInteger(1),
        limit = arr.length,
        sum = BigInteger(0);

    while (i < limit) {
        sum = sum.add(x.multiply(arr[i]));
        i++;
        x = x.multiply(k);
    }
    return sum.add(1).toString();
}
