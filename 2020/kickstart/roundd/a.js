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
    let max = -Infinity;
    return hs.filter((x, i) => {
        const ret = x > max && (i === n - 1 || x > hs[i + 1]);
        max = Math.max(max, x);
        return ret;
    }).length;
}
