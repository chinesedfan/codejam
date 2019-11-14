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
    var hasOne = left <= 1 && right >= 1;
    var hasEight = left <= 8 && right >= 8;
    var lower = Math.ceil((left - 2) / 4);
    var upper = Math.floor((right - 2) / 4);
    return countPrimes(left, right) + (upper - lower + 1)
        + (hasOne ? 1 : 0)
        + (hasEight ? 1 : 0);
}

function countPrimes(left, right) {
    var flags = Array(right - left + 1).fill(1);
    var sqrt = Math.sqrt(right);
    for (var i = 2; i <= sqrt; i++) {
        for (var j = left; j <= right; j++) {
            if (j > i && !(j % i)) {
                flags[j - left] = 0;
            }
        }
    }
    return flags.filter(Boolean).length;
}
