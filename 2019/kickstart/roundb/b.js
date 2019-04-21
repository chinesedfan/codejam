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

    var ts = []; // i,k,j means total energy that use stones [0,i], with k as last and after j seconds
    var max = [];
    for (var i = 0; i < rs.length; i++) {
        ts.push([]);
        max.push([]);
        for (var j = 0; j <= mt; j++) {
            ts[i].push([]);
            max[i][j] = -Infinity;
            for (var k = 0; k <= i; k++) {
                var r = rocks[k];
                var s = r[0];
                var e = r[1];
                var l = r[2];

                var cur = Math.max(0, e - j * l);
                if (i == 0) {
                    ts[i][j][k] = cur;
                } else {
                    ts[i][j][k] = Math.max(
                        max[i - 1][j],
                        max[i - 1][Math.min(j + s, mt)] + cur
                    );
                }
                max[i][j] = Math.max(max[i][j], ts[i][j][k]);
            }
        }
    }

    return (ts.length ? max[ts.length - 1][0] : 0) + fs.reduce((sum, r) => sum + r[1], 0);
}
