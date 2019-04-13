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
    var r = {ch: '', c: 0, children: { /* ch -> node */ }};
    ws.forEach((w) => {
        var p = r;
        for (var i = w.length - 1; i >= 0; i--) {
            if (!p.children[w[i]]) {
                p.children[w[i]] = {ch: w[i], c: 0, children: {}};
            }
            p.children[w[i]].c++;
            p = p.children[w[i]];
        }
    });

    var pair = 0;
    var q = Object.keys(r.children)
        .map((ch) => r.children[ch]);
    while (q.length) {
        var node = q.shift();
        var sorted = Object.keys(node.children)
            .map((ch) => node.children[ch])
            .sort((a, b) => a.c - b.c);

        var ignore = false;
        var rest = false;
        sorted.forEach((child) => {
            switch (child.c) {
            case 1:
                if (!ignore) {
                    if (rest) {
                        pair++;
                        rest = false;
                        ignore = true;
                    } else {
                        rest = true;
                    }
                }
                break;
            case 2:
                pair++;
                break;
            default:
                q.push(child);
            }
        });
    }

    return pair * 2;
}
