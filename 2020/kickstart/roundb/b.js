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
    var last = xs.map(x => Math.floor(d / x) * x);
    var first = Math.min(...last);
    return Math.floor(first / xs[0]) * xs[0];
}
