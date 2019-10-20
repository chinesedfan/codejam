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
        var arr = lines[l++].split(' ').map((x) => +x);
        console.log('Case #%d: %s', i + 1, solve(tokens[0], tokens[1], arr));
    }
});

function solve(n, m, arr) {
    var max = Math.max.apply(Math, arr);
    max = Math.max(max, Math.floor(m / n));
    var r = 1;
    while (max) {
        max >>= 1;
        r <<= 1;
    }
    r >>= 1;
    r = Math.max(r, 1);

    var ones = {}; // r -> c
    for (var i = r; i; i >>= 1) {
        ones[i] = arr.reduce((s, a) => s + ((a & i) ? 1 : 0), 0);
    }

    // search bit by bit, left to right
    var q = [{ r, k: 0, s: 0 }];
    var res = -1;
    while (q.length) {
        var state = q.shift();

        var valid = false;
        var oneBits = ones[state.r];
        // if (oneBits >= arr.length / 2) {
        if (!valid) {
            // use 1
            var sum = state.s + (arr.length - oneBits) * state.r;
            if (sum <= m) {
                if (state.r == 1) {
                    res = Math.max(res, state.k + state.r);
                    continue;
                }
                q.push({r: state.r / 2, k: state.k + state.r, s: sum});
                valid = true;
            }
        }
        // if (oneBits <= arr.length / 2) {
        if (!valid) {
            // use 0
            var sum = state.s + oneBits * state.r;
            if (sum <= m) {
                if (state.r == 1) {
                    res = Math.max(res, state.k);
                    continue;
                }
                q.push({r: state.r / 2, k: state.k, s: sum});
            } else {
                break;
            }
        }
    }

    return res;
}
