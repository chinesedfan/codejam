var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var lines = [];
rl.on('line', function (input) {
    lines.push(input);
});
rl.on('close', function () {
    var t = parseInt(lines[0]);
    var l = 1;
    for (var i = 0; i < t; i++) {
        var tokens = lines[l++].split(' ');
        console.log('Case #%d: %s', i + 1, solve(+tokens[0], +tokens[1], lines[l++].split(' ').map(x => +x)));
    }
});

function solve(n, d, ss) {
    ss.sort((a, b) => a - b); // asc

    var ts = [];
    for (var i = 1; i <= d; i++) {
        ss.forEach(s => {
            ts.push(s / i);
        });
    }
    ts.sort((a, b) => a - b);

    // find the largest possible target
    var idx = binarySearch(0, ts.length, (x) => {
        var target = ts[x];

        var count = 0;
        var cut = 0;
        var done = ss.some(s => {
            if (s === target) {
                count++;
                if (count === d) return true;
            } else if (s > target) {
                if (dividedBy(s, target)) {
                    var x = Math.floor(s / target);
                    x = Math.min(x, d - count);
                    cut += (x === s / target) ? x - 1 : x;
                    count += x;
                    if (count === d) return true;
                }
            }
        });
        if (done) return true;

        done = ss.some(s => {
            if (s > target && !dividedBy(s, target)) {
                var x = Math.floor(s / target);
                x = Math.min(x, d - count);
                cut += x;
                count += x;
                if (count === d) return true;
            }
        });
        return done;
    });
    var limit = ts[idx];

    var map = new Map();
    ss.forEach(s => {
        for (var c = 1; c <= d; c++) {
            if (s / c > limit) continue;

            var g = gcd(s, c);
            var k = `${s / g}#${c / g}`;
            var [full, count] = map.get(k) || [0, 0];
            if (count + c > d) continue;

            map.set(k, [full + 1, count + c]);
        }
    });

    var max = 0;
    map.forEach(([full, count]) => {
        max = Math.max(max, full);
    });
    return d - max;
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
function gcd(a, b) {
    if (a > b) return gcd(b, a);

    while (1) {
        var r = b % a;
        if (!r) break;
        b = a;
        a = r;
    }
    return a;
}
function dividedBy(a, b) {
    return Math.abs(Math.floor(a / b) * b - a) < 1e-7;
}
