var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var lines = [];
rl.on('line', function(input) {
    lines.push(input);
});
rl.on('close', function() {
    var t = parseInt(lines[0]);
    var l = 1;
    for (var i = 0; i < t; i++) {
        var tokens = lines[l++].split(' ');
        var n = +tokens[0];
        var k = +tokens[1];
        console.log('Case #%d: %s', i + 1, solve(n, k, lines[l++].split(' ').map((x) => +x)));
    }
});

function solve(n, k, costs) {
    var diff = [];
    var max = -Infinity;
    for (var i = 1; i < costs.length; i++) {
        var d = costs[i] - costs[i - 1];
        diff.push(d);
        max = Math.max(max, d);
    }

    return max - binarySeach(0, max - 1, (x) => {
        x = max - x;

        var sum = 0;
        for (var i = 0; i < diff.length; i++) {
            if (diff[i] > x) {
                sum += Math.ceil(diff[i] / x) - 1;
            }
        }

        return sum <= k;
    });
}

function binarySeach(left, right, fn) {
    while (left <= right) {
        var mid = Math.floor((left + right) / 2)
        if (fn(mid)) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return right
}
