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
        var signs = [];
        for (var j = 0; j < n; j++) {
            var tokens = lines[l++].split(' ').map((x) => parseInt(x));
            signs.push(tokens);
        }
        console.log('Case #%d: %s', i + 1, solve(signs));
    }
});

function solve(signs) {
    var subs = [];

    var prev;
    for (var i = 0; i < signs.length; i++) {
        var m = signs[i][0] + signs[i][1];
        var n = signs[i][0] - signs[i][2];
        var cur = {
            m: {
                m: m,
                n: n,
                len: 1, // valid length that have the same `m` or `n`
                rlen: 1 // pure length that have the same `m`
            },
            n: {
                m: m,
                n: n,
                len: 1,
                rlen: 1
            }
        };
        if (prev) {
            if (prev.m.m == m) {
                cur.m = Object.assign({}, prev.m);
                cur.m.len++;
                cur.m.rlen++;
            } else {
                cur.m.m = m;
                cur.m.n = prev.n.n;
                cur.m.len = (prev.n.n == n ? prev.n.len : prev.n.rlen) + 1; // connected by coincidence
                cur.m.rlen = 1;
            }

            if (prev.n.n == n) {
                cur.n = Object.assign({}, prev.n);
                cur.n.len++;
                cur.n.rlen++;
            } else {
                cur.n.n = n;
                cur.n.m = prev.m.m;
                cur.n.len = (prev.m.m == m ? prev.m.len : prev.m.rlen) + 1;
                cur.n.rlen = 1;
            }
        }
        prev = cur;
        subs.push({
            length: Math.max(prev.m.len, prev.n.len)
        });
    }

    var max = Math.max.apply(Math, subs.map((item) => item.length));
    var count = subs.filter((item) => item.length === max).length;

    return max + ' ' + count;
}
