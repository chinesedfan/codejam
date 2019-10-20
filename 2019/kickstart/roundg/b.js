var readline = require('readline');
var BigInteger = require('biginteger').BigInteger; // replace with source to submit

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
        max = Math.floor(max / 2);
        r <<= 1;
    }
    r /= 2;
    r = Math.max(r, 1);

    var ones = {}; // r -> c
    for (var i = r; i; i /= 2) {
        ones[i] = arr.reduce((s, a) => s + ((a & i) ? 1 : 0), 0);
    }

    // precompute the min
    var agg = BigInteger.ZERO;
    var min = {}; // r -> min
    for (var i = 1; i <= r; i <<= 1) {
        agg = agg.add(BigInteger(i).multiply(Math.min(ones[i], arr.length - ones[i])));
        min[i] = agg;
    }

    // search bit by bit, left to right
    var q = [{ r, k: 0, s: BigInteger.ZERO }];
    var res = -1;
    while (q.length) {
        var state = q.shift();

        var valid = false;
        var oneBits = ones[state.r];
        // if (oneBits >= arr.length / 2) {
        if (!valid) {
            // use 1
            var sum = state.s.add(BigInteger(state.r) * (arr.length - oneBits));
            if (sum.compare(m) <= 0 && (state.r == 1 || sum.add(min[state.r / 2]).compare(m) <= 0)) {
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
            var sum = state.s.add(BigInteger(state.r) * oneBits);
            if (sum.compare(m) <= 0) {
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
