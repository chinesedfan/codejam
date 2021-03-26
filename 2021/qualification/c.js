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
        var tokens = lines[l++].split(' ').map(Number);
        console.log('Case #%d: %s', i + 1, solve(...tokens));
    }
});

function solve(n, cost) {
    const min = n - 1
    // n, n - 1, ..., 2
    const max = (n + 2) * (n - 1) / 2
    if (cost < min || cost > max) return 'IMPOSSIBLE'

    let lst = []
    for (let i = 0; i < n; i++) lst[i] = i + 1

    const cs = []
    for (let i = 0; i < lst.length - 1; i++) {
        const maxCurrent = lst.length - i
        const minRest = min - i - 1
        const cur = Math.min(maxCurrent, cost - minRest)
        cost -= cur
        cs.push(cur)
    }

    for (let i = lst.length - 2; i >= 0; i--) {
        const cur = cs[i]
        lst = lst.slice(0, i)
            .concat(lst.slice(i, i + cur).reverse())
            .concat(lst.slice(i + cur))
    }
    return lst.join(' ')
}
