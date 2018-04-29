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
        var n = parseInt(tokens[0]);
        var lang = parseInt(tokens[1]);
        var resps = lines[l++].split(' ').map(x => parseInt(x));
        console.log('Case #%d: %s', i + 1, solve(n, lang, resps));
    }
});

function solve(n, lang, count) {
    var sorted = count.sort((a, b) => {
        return getAdd(getRate(b, n), n) - getAdd(getRate(a, n), n);
    });

    var rest = n;
    count.forEach((x) => {
        rest -= x;
    });

    var sum = 0;
    for (var i = 0; i < sorted.length; i++) {
        var x = sorted[i]; // count
        while (rest && getAdd(getRate(x, n)) < 0.5) {
            x++;
            rest--;
        }
        sum += getRound(getRate(x, n));
    }

    var unit = Math.max(1, 0.5 * n / 100);
    // console.log(count, sorted, rest, unit);
    while (rest >= unit) {
        sum += getRound(getRate(unit, n));
        rest -= unit;
    }

    return sum;
}
function getRate(x, n) {
    return x * 100 / n;
}
function getAdd(x) {
    return x - Math.floor(x);
}
function getRound(x) {
    return getAdd(x) >= 0.5 ? Math.ceil(x) : Math.floor(x);
}
