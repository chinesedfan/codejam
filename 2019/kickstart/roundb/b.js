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
    var rs = [];
    var fs = []; // rocks that always there
    for (var i = 0; i < rocks.length; i++) {
        if (rocks[i][2] == 0) {
            fs.push(rocks[i]);
        } else {
            rs.push(rocks[i]);
            mt = Math.max(mt, Math.ceil(rocks[i][1] / rocks[i][2]));
        }
    }

    // compare s1 * l2 with s2 * l1, lose less, eat first
    // but in every iteration, we try to eat new stone first, so reverse here
    rs.sort((a, b) => a[0] * b[2] - b[0] * a[2]);
    rs.reverse();

    var ts = []; // i,j means total energy that use stones [0,i] and after j seconds
    for (var i = 0; i < rs.length; i++) {
        ts.push([]);
        var r = rs[i];
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

    return (ts.length ? ts[ts.length - 1][0] : 0) + fs.reduce((sum, r) => sum + r[1], 0);
}
