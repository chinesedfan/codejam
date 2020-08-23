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

function solve(n, a, b, c) {
    const hs = Array(n).fill(1);
    if (a + b <= n) {
        const left = range(n - (a - 1), n);
        const right = range(n - (b - 1), n - 1).reverse();
        fill(hs, left, 0);
        fill(hs, right, n - (b - 1));
    } else {
        const common = a + b - n;
        if (common > c) {
            return 'IMPOSSIBLE';
        } else {
            const left = range(n - 1 - (a - c), n - 1);
            const right = range(n - 1 - (b - c), n - 1).reverse();
            fill(hs, left, 0);
            fill(hs, right, n - (b - c));
            const all = Array(c).fill(n);
            fill(hs, all, a - c);
        }
    }
    return hs.join(' ');
}

function range(start, end) {
    var ret = [];
    for (var i = start; i <= end; i++) {
        ret.push(i);
    }
    return ret;
}
function fill(a, b, p) {
    for (var i = 0; i < b.length; i++) {
        a[p + i] = b[i];
    }
}
