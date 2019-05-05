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
        var tokens = lines[l++].split(' ').map((x) => +x);
        console.log('Case #%d: %s', i + 1, solve(tokens[1],
                lines.slice(l, l + tokens[0]).map((str) => str.split(' ').map((x) => +x))));
        l += tokens[0];
    }
});

function solve(p, cs) {
    cs = cs.map((c) => ({
        // w: c[0],
        // h: c[1],
        base: 2 * (c[0] + c[1]),
        l: 2 * Math.min(c[0], c[1]),
        r: 2 * Math.sqrt(c[0] * c[0] + c[1] * c[1])
    }));

    var sum = cs.reduce((s, item) => s + item.base, 0);
    p = p - sum;

    // as long as doesn't exceed p
    var prev, next;
    for (var i = 0; i < cs.length; i++) {
        var item = cs[i];
        next = [];
        for (var j = 0; j <= p; j++) {
            if (i == 0) {
                // not cut
                next[j] = 0;
                // cut
                if (item.l <= j) {
                    next[j] = Math.min(j, item.r);
                }
            } else {
                // not cut
                next[j] = prev[j];
                // cut
                if (item.l <= j) {
                    next[j] = Math.min(j, prev[j - item.l] + item.r);
                    next[j] = Math.max(prev[j], next[j]);
                }
            }
        }
        prev = next;
    }

    return sum + prev[p];
}
