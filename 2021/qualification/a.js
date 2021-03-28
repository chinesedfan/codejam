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
        lines[l++];
        var tokens = lines[l++].split(' ').map(Number);
        console.log('Case #%d: %s', i + 1, solve(tokens));
    }
});

function solve(lst) {
    let cost = 0
    for (let i = 0; i < lst.length - 1; i++) {
        let min = -1
        for (let j = i; j < lst.length; j++) {
            if (min < 0 || lst[j] < lst[min]) {
                min = j
            }
        }

        lst = lst.slice(0, i)
            .concat(lst.slice(i, min + 1).reverse())
            .concat(lst.slice(min + 1))
        cost += min - i + 1
    }
    return cost
}
