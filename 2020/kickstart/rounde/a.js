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
        var n = +lines[l++];
        console.log('Case #%d: %s', i + 1, solve(n, lines[l++].split(' ').map((x) => +x)));
    }
});

function solve(n, hs) {
    var max = -Infinity;
    var prev, count = 0;
    for (let i = 1; i < n; i++) {
        var diff = hs[i] - hs[i - 1];
        if (count === 0) {
            count = 2;
        } else if (diff === prev) {
            count++;
        } else {
            count = 2;
        }
        prev = diff;
        max = Math.max(max, count);
    }
    return max;
}
