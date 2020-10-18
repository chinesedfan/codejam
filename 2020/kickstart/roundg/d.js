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
        console.log('Case #%d: %s', i + 1, solve(
            n,
            lines[l++].split(' ').map((x) => +x)
        ));
    }
});

function solve(n, ns) {
    // O(n!)
    var total = 0
    var game = 0

    getPicks(n).forEach(picks => {
        var cards = [...ns]
        var score = 0
        picks.forEach(p => {
            var sum = cards[p] + cards[p + 1]
            cards.splice(p, 2, sum)
            score += sum
        })
        total += score
        game++
    })
    return total / game
}

function getPicks(n) {
    if (n === 2) return [[0]]

    var ret = []
    var pp = getPicks(n - 1)
    for (var i = 0; i < n - 1; i++) {
        ret = ret.concat(pp.map(other => [i].concat(other)))
    }
    return ret
}
