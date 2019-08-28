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
        var m = +tokens[1];
        console.log('Case #%d: %s', i + 1, solve(
            n, m,
            lines.slice(l, l + m).map(str => str.split(' ').map((x) => +x)))
        );
        l += m;
    }
});

function solve(n, m, bs) {
    if (!bs.length) return 2 * (n - 1);

    var blacks = {};
    // set blacks
    bs.forEach((l) => {
        var a = l[0] - 1;
        var b = l[1] - 1;
        blacks[a] = 1;
        blacks[b] = 1;
    });

    var c = Object.keys(blacks).length;
    return c - 1 + 2 * (n - c);
}
