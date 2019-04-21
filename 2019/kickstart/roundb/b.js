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
        console.log('Case #%d: %s', i + 1, solve(n, lines.slice(l, l + n).map((s) =>
            s.split(' ').map((x) => +x))));
        l += n;
    }
});

function solve(n, rocks) {
    rocks.sort((a, b) => {
        if (a[2] != b[2]) {
            return b[2] - a[2]; // eat the faster one first
        } else {
            return b[1] - a[1]; // eat the larger one first
        }
    });

    var total = 0;
    var t = 0;
    rocks.forEach((r) => {
        var s = r[0];
        var e = r[1];
        var l = r[2];
        var cur = Math.max(0, e - t * l);
        if (cur) {
            total += cur;
            t += s;
        }
    });
    return total;
}
