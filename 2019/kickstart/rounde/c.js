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
        var tokens = lines[l++].split(' ');
        console.log('Case #%d: %s', i + 1, solve(
            +tokens[0],
            +tokens[1]
        ));
    }
});

function solve(left, right) {
    var lower = Math.ceil((left - 2) / 4);
    var upper = Math.floor((right - 2) / 4);

    // n = a * 2^x, where a is an odd number with k odd divisiors
    // diff = abs(k - k * x) = abs(k(1 - x))
    // - x = 0, k = 1 or 2, then n = 1 or odd primes
    var n1 = hasX(left, right, 1) + countOddPrimes(left, right);
    // - x = 1, k = any, then n = 2(2n + 1)
    var n2 = upper - lower + 1;
    // - x = 2, k = 1 or 2, then n = 4 * (1 or odd primes)
    var n3 = hasX(left, right, 4) + countOddPrimes(Math.ceil(left / 4), Math.floor(right / 4));
    // - x = 3, k = 1, then n = 8
    var n4 = hasX(left, right, 8);

    return n1 + n2 + n3 + n4;
}

function hasX(left, right, x) {
    return left <= x && right >= x ? 1 : 0;
}
function countOddPrimes(left, right) {
    var flags = Array(right - left + 1).fill(1);
    var sqrt = Math.sqrt(right);
    for (var i = 2; i <= sqrt; i++) {
        for (var j = left; j <= right; j++) {
            if (j > i && !(j % i)) {
                flags[j - left] = 0;
            }
        }
    }
    return flags.filter(Boolean).length - hasX(left, right, 1) - hasX(left, right, 2);
}
