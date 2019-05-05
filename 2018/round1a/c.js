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

    var is = [{
        l: 0,
        r: 0
    }];
    for (var i = 0; i < cs.length; i++) {
        var is2 = is.map((item) => ({
            l: item.l + cs[i].l,
            r: item.r + cs[i].r
        }));
        for (var j = 0; j < is2.length; j++) {
            merge(p, is, is2[j]);
        }
    }

    return sum + is[is.length - 1].r;
}

function merge(p, is, item) {
    if (item.l > p) return;

    var fin = (x, val) => {
        // 2i means at the left of interval i
        // 2i + 1 means in the middle of interval i
        var i = Math.floor(x / 2);
        if (x & 1) {
            return val >= is[i].l;
        } else {
            return i == 0 || val > is[i - 1].r;
        }
    };

    var l = binarySearch(0, 2 * is.length, (x) => {
        return fin(x, item.l);
    });
    var r = binarySearch(0, 2 * is.length, (x) => {
        return fin(x, item.r);
    });
    var il = Math.floor(l / 2);
    var ir = Math.floor(r / 2);
    var added = {
        l: (l & 1) ? is[il].l : item.l,
        r: (r & 1) ? is[ir].r : item.r
    };
    added.r = Math.min(p, added.r);

    is.splice(il, ir - il + ((r & 1) ? 1 : 0), added);
}

function binarySearch(l, r, fn) { // for any [l, x], fn returns true
    while (l <= r) {
        var middle = Math.floor((l + r) / 2);
        if (fn(middle)) {
            l = middle + 1;
        } else {
            r = middle - 1;
        }
    }
    return r;
}
