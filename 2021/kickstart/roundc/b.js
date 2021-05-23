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
        console.log('Case #%d: %s', i + 1, solve(+lines[l++]));
    }
});

function solve(g) {
    const factors = getFactors(2 * g)

    let count = 0
    factors.forEach(f => {
        // (k + k + f - 1) * f = 2 * g
        const k2 = 2 * g / f - (f - 1)
        if (!(k2 & 1)) count++
    })
    return count
}

function getFactors(n) {
    const limit = Math.floor(Math.sqrt(n))
    const factors = []
    for (let i = 1; i <= limit; i++) {
        if (!(n % i)) factors.push(i)
    }
    return factors
}
