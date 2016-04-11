var fs = require('fs');
var _ = require('lodash');
var BigInteger = require('biginteger').BigInteger;

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
    var arr = _(costs.slice(0, n)).map(function(c, i) {
        return {
            index: i,
            cost: 0
        };
    }).sortBy(function(item) {
        return item.cost;
    }).value();

    _.each(costs, function(c, i) {
        var cost = c, pos;
        while (1) {
            pos = findInsertPosition(arr, cost, i); 
            arr.splice(pos, 0, {
                index: i,
                cost: cost
            });
            if (pos >= n - 1) break;

            cost += c;
        }
        arr = arr.slice(0, n);
    });
    return arr[n - 1].index + 1; // starts from 1
}
function findInsertPosition(arr, c, i) {
    var left = 0, right = arr.length - 1, mid;
    if (c < arr[left].cost) return left;
    if (c > arr[right].cost) return right + 1;

    while (left < right) {
        mid = Math.floor((left + right) / 2);
        if (c > arr[mid].cost) {
            left = mid + 1;
        } else if (c < arr[mid].cost) {
            right = mid - 1;
        } else {
            return (i < arr[mid].index) ? mid : mid + 1;
        }
    }

    if (arr[left].cost < c) {
        return left + 1;
    } else if (arr[left].cost > c) {
        return left;
    } else {
        return (i < arr[left].index) ? left : left + 1;
    }
}

