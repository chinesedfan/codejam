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
    // the done count should be less or equal to n - 1
    n--;
    // find the upper bound
    while (getDoneCount(costs, right) < n) right *= 2;
    // binary search
    while (left < right) {
        mid = Math.floor((left + right) / 2);
        count = getDoneCount(costs, mid);
        if (count < n) {
            left = mid + 1
        } else if (count > n) {
            right = mid - 1;
        } else {
            return 1;
        }
    }

    count = getDoneCount(costs, left);
    if (count == n) return 1;
    if (count > n) count = getDoneCount(costs, --left);

    var result;
    _.some(costs, function(c, i) {
        if ((left + 1) % c) return false;

        // available at the next time
        count++;
        if (count == n + 1) {
            result = i + 1;
            return true;
        }
    });
    return result;
}
function getDoneCount(costs, time) {
    return _.reduce(costs, function(sum, c) {
        sum += Math.floor(time / c);
        return sum;
    }, 0);
}
