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
        var d = +tokens[1];
        console.log('Case #%d: %s', i + 1, solve(n, d, lines[l++].split(' ').map((x) => +x)));
    }
});

function solve(n, d, xs) {
    var tf = Math.floor(d / xs[0]);
    var idx = binarySeach(1, tf, (i) => {
        var start = i * xs[0];
        return xs.every(x => {
            if (start % x) {
                start = Math.floor(start / x) * x + x;
                return start <= d;
            } else {
                return true;
            }
        });
    });
    return idx * xs[0];
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
