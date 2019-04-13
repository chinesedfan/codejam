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
        var n = +lines[l++];
        console.log('Case #%d: %s', i + 1, solve(n, lines.slice(l, l + n)));
        l += n;
    }
});

function solve(n, ws) {
    var r = {ch: '', isw: false, children: { /* ch -> node */ }};
    ws.forEach((w) => {
        var p = r;
        for (var i = w.length - 1; i >= 0; i--) {
            if (!p.children[w[i]]) {
                p.children[w[i]] = {ch: w[i], isw: false, children: {}};
            }
            if (i == 0) {
                p.children[w[i]].isw = true;
            }
            p = p.children[w[i]];
        }
    });

    return ws.length - cal(r, true);
}

function cal(node, r) {
    var keys = Object.keys(node.children);
    if (!keys.length) return 1;

    var sum = keys.reduce((s, k) => s + cal(node.children[k]), 0);
    if (node.isw) sum++;
    if (!r && sum >= 2) sum -= 2;
    return sum;
}
