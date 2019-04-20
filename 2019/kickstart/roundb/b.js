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
    var mt = -Infinity;
    for (var i = 0; i < rocks.length; i++) {
        mt = Math.max(mt, Math.ceil(rocks[i][1] / rocks[i][2]));
    }

    var ts = []; // i,j means total energy that use stones [0,i] and after j seconds
    for (var i = 0; i < rocks.length; i++) {
        ts.push([]);
        var r = rocks[i];
        var s = r[0];
        var e = r[1];
        var l = r[2];
        for (var j = 0; j <= mt; j++) {
            var cur = Math.max(0, e - j * l);
            if (i == 0) {
                ts[i][j] = cur;
            } else {
                ts[i][j] = Math.max(ts[i - 1][j], ts[i - 1][Math.min(j + s, mt)] + cur);
            }
        }
    }

    return ts[n - 1][0];
}
