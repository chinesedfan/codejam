var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var tokens = lines[l++].split(' ');
    var b = parseInt(tokens[0]);
    var n = parseInt(tokens[1]);
    var costs = _.map(lines[l++].split(' '), function(x) { return parseInt(x); });
    console.log('Case #%d: %d', i + 1, solve(costs, n));
}

function solve(costs, n) {
    var left = 0, right = 1, mid, count;
    // the started count should be less or equal to n - 1
    n--;
    // find the upper bound
    while (getStartedCount(costs, right) < n) right *= 2;
    while (left < right) {
        mid = Math.floor((left + right) / 2);
        count = getStartedCount(costs, mid);
        if (count < n) {
            left = mid + 1
        } else if (count > n) {
            right = mid - 1;
        } else {
            left = mid;
            break;
        }
    }

    count = getStartedCount(costs, left);
    if (count > n) {
        count = getStartedCount(costs, --left);
    } else {
        while (getStartedCount(costs, left + 1) == count) left++;
    }

    var result;
    _.some(costs, function(c, i) {
        if (left % c) return false;

        // available now
        count++;
        if (count == n + 1) {
            result = i + 1;
            return true;
        }
    });
    return result;
}
function getStartedCount(costs, time) {
    // just before `time`, how many customers have started?
    return _.reduce(costs, function(sum, c) {
        sum += Math.ceil(time / c);
        return sum;
    }, 0);
}
