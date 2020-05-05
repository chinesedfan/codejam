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

    var min = d - 1;
    ts.forEach(target => {
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
        if (done) {
            min = Math.min(min, cut);
            return;
        }

        done = ss.some(s => {
            if (s > target && !dividedBy(s, target)) {
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

function dividedBy(a, b) {
    return Math.abs(Math.floor(a / b) * b - a) < 1e-7;
}
