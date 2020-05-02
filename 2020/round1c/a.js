var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var lines = [];
rl.on('line', function (input) {
    lines.push(input);
});
rl.on('close', function () {
    var t = parseInt(lines[0]);
    var l = 1;
    for (var i = 0; i < t; i++) {
        var tokens = lines[l++].split(' ');
        console.log('Case #%d: %s', i + 1, solve(+tokens[0], +tokens[1], tokens[2]));
    }
});

function solve(x, y, ps) {
    if (x === 0 && y === 0) return 0;

    for (var i = 0; i < ps.length; i++) {
        var ch = ps[i];
        if (ch === 'S') {
            y--;
        } else if (ch === 'N') {
            y++;
        } else if (ch === 'E') {
            x++;
        } else if (ch === 'W') {
            x--;
        }

        if (Math.abs(x) + Math.abs(y) <= i + 1) return i + 1;
    }
    return 'IMPOSSIBLE';
}

