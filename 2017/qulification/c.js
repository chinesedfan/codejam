var fs = require('fs');
var _ = require('lodash');
var BigInteger = require('biginteger').BigInteger;
var debug = require('debug')('debug');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var tokens = lines[l++].split(' ');
    console.log('Case #%d: %s', i + 1, solve(BigInteger(tokens[0]), BigInteger(tokens[1])));
}

function solve(n, k) {
    var status = n2maxmin(n);
    status.maxCount = BigInteger(1);
    status.minCount = BigInteger(1);

    var i = BigInteger(1);
    var maxResult, minResult;
    while (i.compare(k) < 0) {
        maxResult = n2maxmin(status.max);
        minResult = n2maxmin(status.min);
        i = i.add(status.maxCount);
        if (i.compare(k) >= 0) {
            status = maxResult;
            break;
        }
        i = i.add(status.minCount);
        if (i.compare(k) >= 0) {
            status = minResult;
            break;
        }

        if (status.max.compare(status.min) == 0) {
            status.max = maxResult.max;
            status.min = maxResult.min;
            status.maxCount = status.maxCount.add(status.minCount);
            status.minCount = status.maxCount;
        } else if (status.max.isOdd()) {
            status.max = minResult.max;
            status.min = minResult.min;
            status.maxCount = status.maxCount.multiply(2).add(status.minCount);
        } else {
            status.max = maxResult.max;
            status.min = maxResult.min;
            status.minCount = status.minCount.multiply(2).add(status.maxCount);
        }
        debug(`${status.max}: ${status.maxCount}, ${status.min}: ${status.minCount}`);
    }
    return status.max.toString() + ' ' + status.min.toString();
}

function n2maxmin(n) {
    return n.isOdd() ? {
        max: n.subtract(1).divide(2),
        min: n.subtract(1).divide(2)
    } : {
        max: n.divide(2),
        min: n.subtract(2).divide(2)
    };
}
