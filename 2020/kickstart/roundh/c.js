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
        var n = +lines[l++];
        var dots = lines.slice(l, l + n).map(str => str.split(' ').map(Number));
        l += n;
        console.log('Case #%d: %s', i + 1, solve(dots));
    }
});

function solve(dots) {
    const startX = findMedium(dots.map((x, i) => x[0] - i))
    const ys = dots.map(x => x[1])
    const targetY = findMedium(ys)
    return cal(dots, startX, targetY)
}
function cal(dots, startX, targetY) {
    const xs = dots.map(x => x[0])
    const s1 = xs.sort((a, b) => a - b)
        .reduce((s, x, i) => s + Math.abs(startX + i - x), 0)

    const ys = dots.map(x => x[1])
    const s2 = ys.reduce((s, y) => s + Math.abs(y - targetY), 0)
    return s1 + s2
}
function findMedium(xs) {
    xs.sort((a, b) => a - b)
    return xs.length & 1
        // 3 -> 1
        ? xs[Math.floor(xs.length / 2)]
        // 4 -> 1/2
        : xs[xs.length / 2]
}
