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
        console.log('Case #%d: %s', i + 1, solve(tokens[0], tokens[1],
                lines[l++].split(' ').map((x) => +x),
                lines[l++].split(' ').map((x) => +x)));
    }
});

function solve(n, klimit, cs, ds) {
    var cq = prepareRMQ(cs);
    var dq = prepareRMQ(ds);

    var count = 0;
    for (var i = 0; i < n; i++) {
        var cl = binarySearch(0, i, (x) => {
            return x == 0 || cs[i] > findMax(cq, i - x, i - 1);
        });
        var cr = binarySearch(i, n - 1, (x) => {
            // if has ties, we choose the smallest index, which is i
            return cs[i] >= findMax(cq, i, x);
        });

        // good enough
        var l1 = binarySearch(0, cl, (x) => {
            return cs[i] >= findMax(dq, i - x, i) - klimit;
        });
        var r1 = binarySearch(i, cr, (x) => {
            return cs[i] >= findMax(dq, i, x) - klimit;
        });
        // too good
        var l2 = binarySearch(0, cl, (x) => {
            return cs[i] > findMax(dq, i - x, i) + klimit;
        });
        var r2 = binarySearch(i, cr, (x) => {
            return cs[i] > findMax(dq, i, x) + klimit;
        });

        var c1 = (l1 + 1) * (r1 - i + 1);
        var c2 = (l2 + 1) * (r2 - i + 1);
        count += c1 - c2;
    }
    return count;
}

function prepareRMQ(ds) {
    var ret = [];

    var p = 0;
    var step = 1;
    while (step <= ds.length) {
        ret.push([]);

        for (var i = 0; i < ds.length; i++) {
            if (p == 0) {
                ret[p][i] = ds[i];
            } else {
                ret[p][i] = Math.max(ret[p - 1][i], i + step / 2 < ds.length ? ret[p - 1][i + step / 2] : -Infinity);
            }
        }

        p++;
        step <<= 1;
    }

    return ret;
}
function findMax(m, l, r) {
    var p = 0;
    var step = 1;
    while (step * 2 <= r - l) {
        p++;
        step <<= 1;
    }
    return Math.max(m[p][l], m[p][r - step + 1]);
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
