var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var n = +lines[l++];
    console.log('Case #%d: %s', i + 1, solve(
        lines.slice(l, l + n).map((str) => str.split(' ').map((x) => +x)))
    );
    l += n;
}

function solve(rs) {
    var xm = {};
    var ym = {};
    var pm = {};
    var c = 0;
    for (var i = 0; i < rs.length; i++) {
        var [x1, y1, x2, y2] = rs[i];
        for (var x = x1; x <= x2; x++) {
            for (var y = y1; y <= y2; y++) {
                xm[x] = (xm[x] || 0) + 1;
                ym[y] = (ym[y] || 0) + 1;
                pm[`${x}#${y}`] = {x: x, y: y};
                c++;
            }
        }
    }

    var sx = calAbs(xm, c);
    var sy = calAbs(ym, c);

    var min = Infinity;
    var mx, my;
    for (var k in pm) {
        var p = pm[k];
        var sum = sx[p.x] + sy[p.y];

        if (sum < min) {
            min = sum;
            mx = p.x;
            my = p.y;
        } else if (sum == min) {
            if (p.x < mx) {
                mx = p.x;
                my = p.y;
            } else if (p.x == mx) {
                my = Math.min(p.y, my);
            }
        }
    }
    return [mx, my, min].join(' ');
}

function calAbs(xm, c) {
    var xs = Object.keys(xm).map((x) => +x).sort((a, b) => a - b);

    // sum(abs(xi - xj)), where i is fixed, and j is [0, n]
    // = sum(cj * (xi - xj)) + sum(ck * (xk - xi)), j < i <= k
    // = (sum(cj) - sum(ck)) * xi - sum(cj * xj) + sum(ck * xk)
    // = a * xi - sum(cj * xj) + sum(ck * xk)
    var a = -c;
    var xi = a * xs[0] - 0 + xs.reduce((s, x) => s + xm[x] * x, 0);

    var sx = {};
    sx[xs[0]] = xi;
    for (var i = 1; i < xs.length; i++) {
        xi += (a + 2 * xm[xs[i - 1]]) * xs[i] - a * xs[i - 1]
            - 2 * (xm[xs[i - 1]] * xs[i - 1]);
        a += 2 * xm[xs[i - 1]];
        sx[xs[i]] = xi;
    }
    return sx;
}
