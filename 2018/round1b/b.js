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
    var max = 1;
    var count = 0;

    var prev;
    for (var i = 0; i < signs.length; i++) {
        var m = signs[i][0] + signs[i][1];
        var n = signs[i][0] - signs[i][2];
        if (!prev) {
            prev = {
                length: 1,
                lockm: false, // did confirm or not
                lockn: false,
                m: m,
                n: n
            };
            count++;
        } else {
            var okm = !prev.lockm || prev.m == m;
            var okn = !prev.lockn || prev.n == n;
            if (okm || okn) {
                prev.length++;
                prev.lockm = prev.lockm || prev.n != n;
                prev.lockn = prev.lockn || prev.m != m;
                prev.m = m;
                prev.n = n;
                if (prev.length > max) max = prev.length;
            } else {
                prev = {
                    length: 1,
                    lockm: false,
                    lockn: false,
                    m: m,
                    n: n
                };
                count++;
            }
        }
    }

    return max + ' ' + count;
}
