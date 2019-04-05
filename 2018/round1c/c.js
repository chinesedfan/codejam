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
        var n = parseInt(lines[l++]);
        var ws = lines[l++].split(' ').map((x) => parseInt(x));
        console.log('Case #%d: %s', i + 1, solve(ws));
    }
});

function solve(ws) {
    var k = determineK(1e9);

    var g = [];
    var s = 0;
    for (var x = 0; x < ws.length; x++) {
        g[x] = [];
        for (var y = 0; y <= k; y++) {
            if (y == 0) {
                g[x][y] = 0;
            } else if (x == 0) {
                g[x][y] = y == 1 ? ws[x] : Infinity;
            } else {
                var g1 = g[x - 1][y];
                var g2 = Infinity;
                if (x && y && g[x - 1][y - 1] <= 6 * ws[x]) g2 = g[x - 1][y - 1] + ws[x];

                g[x][y] = Math.min(g1, g2);
            }

            if (Number.isFinite(g[x][y]) && y > s) s = y;
        }
    }

    return s;
}

function determineK(limit) {
    var sum = 1;
    var count = 1;
    var x = 1;
    while (1) {
        x = Math.max(x, Math.ceil(sum / 6));
        if (x > limit) break;

        sum += x;
        count++;
    }

    return count;
}
