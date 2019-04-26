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
        console.log('Case #%d: %s', i + 1, solve(tokens[0], tokens[1], tokens[2],
                lines.slice(l, l + tokens[2]).map((str) => str.split(' ').map((x) => +x))));
        l += tokens[2];
    }
});

function solve(r, b, c, cs) {
    cs = cs.map((x) => ({
        m: x[0],
        s: x[1],
        p: x[2]
    }));

    var min = 0;
    var max = b * Math.max.apply(Math, cs.map((x) => x.s))
        + Math.max.apply(Math, cs.map((x) => x.p));
    while (min < max) {
        var middle = Math.floor((min + max) / 2);
        if (check(middle, cs, r, b)) {
            max = middle;
        } else {
            if (min + 1 == max) break;
            min = middle;
        }
    }

    return max;
}
function check(t, cs, r, b) {
    cs.sort((c1, c2) => {
        return getCap(t, c2) - getCap(t, c1);
    });

    return b <= cs.slice(0, r).reduce((s, item) => s += getCap(t, item), 0);
}
function getCap(t, item) {
    return Math.max(0, Math.min(item.m, Math.floor((t - item.p) / item.s)));
}
