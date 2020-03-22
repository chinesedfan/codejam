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
        var b = +tokens[1];
        console.log('Case #%d: %s', i + 1, solve(n, b, lines[l++].split(' ').map((x) => +x)));
    }
});

function solve(n, b, costs) {
    costs.sort((c1, c2) => c1 - c2);

    var sums = [];
    for (var i = 0; i < costs.length; i++) {
        if (i) {
            sums[i] = sums[i - 1] + costs[i];
        } else {
            sums[i] = costs[i];
        }
    }

    return binarySeach(0, costs.length - 1, (x) => sums[x] <= b) + 1;
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
