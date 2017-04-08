var fs = require('fs');
var _ = require('lodash');
var debug = require('debug')('debug');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var tokens = lines[l++].split(' ');
    console.log('Case #%d: %s', i + 1, solve(parseInt(tokens[0]), parseInt(tokens[1])));
}

function solve(n, k) {
    var status = n2maxmin(n);
    status.maxCount = 1;
    status.minCount = 1;

    var i = 1;
    var maxResult, minResult;
    while (i < k) {
        maxResult = n2maxmin(status.max);
        minResult = n2maxmin(status.min);
        if (i + status.maxCount >= k) {
            status = maxResult;
            break;
        }
        i += status.maxCount + status.minCount;
        if (i >= k) {
            status = minResult;
            break;
        }

        if (status.max == status.min) {
            status.max = maxResult.max;
            status.min = maxResult.min;
            status.maxCount = status.maxCount + status.minCount;
            status.minCount = status.maxCount;
        } else if (status.max & 1) {
            status.max = minResult.max;
            status.min = minResult.min;
            status.maxCount = status.maxCount * 2 + status.minCount;
        } else {
            status.max = maxResult.max;
            status.min = maxResult.min;
            status.minCount = status.maxCount + status.minCount * 2;
        }
        debug(`${status.max}: ${status.maxCount}, ${status.min}: ${status.minCount}`);
    }
    return status.max + ' ' + status.min;
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
