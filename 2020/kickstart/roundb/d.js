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
        console.log('Case #%d: %s', i + 1, solve(...lines[l++].split(' ').map((x) => +x)));
    }
});

function solve(w, h, l, u, r, d) {
    var p = [];
    for (var i = 1; i <= h; i++) {
        p[i] = [];
        for (var j = 1; j <= w; j++) {
            if (i == 1 && j == 1) {
                p[i][j] = 1;
                continue;
            }
            if (i >= u && j >= l) continue;

            p[i][j] = next(w, h, p, i - 1, j) + next(w, h, p, i, j - 1);
        }
    }

    var sum = 0;
    if (u - 1 >= 1) {
        for (var i = l; i <= r; i++) {
            sum += next(w, h, p, u - 1, i);
        }
    }
    if (l - 1 >= 1) {
        for (var i = u; i <= d; i++) {
            sum += next(w, h, p, i, l - 1);
        }
    }
    return 1 - sum;
}

function next(w, h, p, i, j) {
    if (i < 1 || j < 1) return 0;

    return (i == h || j == w) ? p[i][j] : p[i][j] / 2;
}
