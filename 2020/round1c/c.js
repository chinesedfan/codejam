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

    var map = {};
    ss.forEach(s => {
        map[s] = map[s] || 0;
        map[s]++;
    });
    var max = -Infinity;
    var smax;
    for (var s in map) {
        if (map[s] > max) {
            max = map[s];
            smax = s;
        }
    }
    var t = Math.ceil(d / max); // cut 1 into `t`
    var xt = Math.floor(d / t); // requires cut `xt` or +1
    var rest = d - xt * t;
    var min = xt * (t - 1) + (d - xt * t);
    if (rest === t) min--;

    // var min = d - 1;
    ss.forEach(target => {
        var count = 0;
        var cut = 0;
        var done = ss.some(s => {
            if (s === target) {
                count++;
                if (count === d) return true;
            } else if (s > target) {
                if (!(s % target)) {
                    var x = Math.min(s / target, d - count);
                    cut += (x === s / target) ? x - 1 : x;
                    count += x;
                    if (count === d) return true;
                }
            }
        });
        if (done) {
            min = Math.min(min, cut);
            return;
        }

        done = ss.some(s => {
            if (s > target && (s % target)) {
                var x = Math.floor(s / target);
                x = Math.min(x, d - count);
                cut += x;
                count += x;
                if (count === d) return true;
            }
        });
        if (done) {
            min = Math.min(min, cut);
            return;
        }
    });

    return min;
}
