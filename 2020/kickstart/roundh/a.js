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
        var tokens = lines[l++].split(' ').map(Number);
        console.log('Case #%d: %s', i + 1, solve(...tokens));
    }
});

function solve(n, k, s) {
    return k + Math.min(k - s + n - s, n)
}
