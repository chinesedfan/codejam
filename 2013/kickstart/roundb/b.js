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
    for (var i = 0; i < rs.length; i++) {
        var [x1, y1, x2, y2] = rs[i];
        for (var x = x1; x <= x2; x++) {
            for (var y = y1; y <= y2; y++) {
                xm[x] = (xm[x] || 0) + 1;
                ym[y] = (ym[y] || 0) + 1;
                pm[`${x}#${y}`] = {x: x, y: y};
            }
        }
    }

    var min = Infinity;
    var mx, my;
    for (var k in pm) {
        var p = pm[k];
        var sum = 0;
        for (var x in xm) {
            sum += xm[x] * Math.abs(p.x - +x);
        }
        for (var y in ym) {
            sum += ym[y] * Math.abs(p.y - +y);
        }

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
