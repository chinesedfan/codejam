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

    var more = ce > cs ? 'E' : 'S';
    var cut = -1;
    for (var i = 0; i < ps.length; i++) {
        if (ps[i].ch != more && ps[i].length > 1) {
            cut = i;
            break;
        }
    }

    var ret = []; // parts
    for (var i = 0; i < ps.length;) {
        if (cut < 0) {
            // simple reverse
            ret.push(Array(ps[i + 1].length).fill(ps[i].ch == 'E' ? 'S' : 'E').join(''));
            ret.push(Array(ps[i].length).fill(ps[i].ch).join(''));
            i += 2;
        } else {
            if (i == cut - 1) {
                ret.push(ps[i].ch == 'E' ? 'S' : 'E'); // offset 1
                ret.push(Array(ps[i].length + ps[i + 2].length).fill(ps[i].ch).join(''));
                ret.push(Array(ps[i + 1].length - 1).fill(ps[i].ch == 'E' ? 'S' : 'E').join(''));
                i += 3;
            } else {
                ret.push(Array(ps[i + 1].length).fill(ps[i].ch == 'E' ? 'S' : 'E').join(''));
                ret.push(Array(ps[i].length).fill(ps[i].ch).join(''));
                i += 2;
            }
        }
    }
    return ret.join('');
}