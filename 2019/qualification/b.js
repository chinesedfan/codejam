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
        console.log('Case #%d: %s', i + 1, solve(n, lines[l++].split('')));
    }
});

function solve(n, p) {
    var ce = 0, cs = 0, prev = '', len = 0;
    var ps = []; // parts
    for (var i = 0; i < p.length; i++) {
        if (p[i] !== prev) {
            if (p[i] === 'E') {
                ce++;
            } else {
                cs++;
            }
            if (prev) {
                ps.push({
                    ch: prev,
                    length: len
                });
            }
            len = 1;
            prev = p[i];
        } else {
            len++;
        }
    }
    if (len) {
        ps.push({
            ch: prev,
            length: len
        });
    }

    var start = p[0] === 'E' ? 'S' : 'E';
    if (ce == cs) {
        return Array(n - 1).fill(start)
            .concat(Array(n - 1).fill(p[0]))
            .join('');
    } else {
        var x = 0;
        for (var i = 0; i < ps.length; i++) {
            if (ps[i].ch == start) {
                if (ps[i].length > 1) {
                    x++;
                    break;
                } else {
                    x += ps[i].length;
                }
            }
        }
        return Array(x).fill(start)
            .concat(Array(n - 1).fill(p[0]))
            .concat(Array(n - 1 - x).fill(start))
            .join('');
    }
}
