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

    // as long as `base + l` doesn't exceed p
    var prev, next;
    for (var i = 0; i < cs.length; i++) {
        var item = cs[i];
        next = [];
        for (var j = 0; j <= p; j++) {
            if (i == 0) {
                // not add
                next[j] = {l: 0, r: 0};
                if (item.base <= j) {
                    // add
                    update(next[j], {l: item.base, r: item.base});
                }
                if (item.base + item.l <= j) {
                    // add and cut
                    update(next[j], {
                        l: item.base + item.l,
                        r: item.base + item.r
                    });
                }
            } else {
                // not add
                next[j] = {l: prev[j].l, r: prev[j].r};
                if (prev[j].l + item.base <= j) {
                    // add
                    update(next[j], {
                        l: prev[j].l + item.base,
                        r: prev[j].r + item.base
                    });
                }
                if (prev[j].l + item.base + item.l <= j) {
                    // add and cut
                    update(next[j], {
                        l: prev[j].l + item.base + item.l,
                        r: prev[j].r + item.base + item.r
                    });
                }
            }
        }
        prev = next;
    }

    return prev[p].r > p ? p : prev[p].r;
}

function update(s1, s2) {
    if (s2.l > s1.l) {
        s1.l = s2.l;
        s1.r = s2.r;
    }
}
