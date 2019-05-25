var fs = require('fs');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var tokens = lines[l++].split(' ');
    console.log('Case #%d: %s', i + 1, solve(
        +tokens[0], +tokens[1], +tokens[2]
    ));
}

function solve(n, cx, cy) {
    var h = 1;
    var total = 1;
    while (total < n) {
        h += 2;
        total += 2 * h - 1;
    }

    var rh = h - 2;
    if (total == n) rh = h;
    if (cy <= cx + rh && cy <= -cx + rh) return 1;
// console.log(n, total)
    var b = h - 1;
    if ((cy == cx + b || cy == -cx + b)) {
        var side = cy + 1;
        if (side >= 1 && side <= h) {
            var rest = n - (total - (2 * h - 1));
            // console.log(`${side}/${rest}`);
            return calc(rest, side, h);
        }
    }

    return 0;
}

function calc(n, m, h) {
    var states = {};
    add(states, 0, 1, 0.5);
    add(states, 1, 0, 0.5);

    for (var i = 2; i <= n; i++) {
        var next = {};
        for (var left in states) {
            left = +left;
            for (var right in states[left]) {
                right = +right;
                var p = states[left][right];
                if (left + 1 < h && right + 1 < h) {
                    add(next, left + 1, right, p / 2);
                    add(next, left, right + 1, p / 2);
                } else if (left + 1 < h) {
                    add(next, left + 1, right, p);
                } else if (right + 1 < h) {
                    add(next, left, right + 1, p);
                }
            }
        }
        // for (var left in next) {
        //     for (var right in next[left]) {
        //         add(states, left, right, next[left][right]);
        //     }
        // }
        states = next;
        // console.log(states)
    }

    var p = 0;
    for (var left in states) {
        for (var right in states[left]) {
            if (+left >= m) p += states[left][right];
        }
    }
    return p;
}
function add(cache, y, x, p) {
    cache[y] = cache[y] || {};
    cache[y][x] = (cache[y][x] || 0) + p;
}
