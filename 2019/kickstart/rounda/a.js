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
        var n = +tokens[0];
        var p = +tokens[1];
        console.log('Case #%d: %s', i + 1, solve(n, p, lines[l++].split(' ').map((x) => +x)));
    }
});

function solve(n, p, s) {
    s.sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });

    var cost = 0;
    for (var i = 0; i < p; i++) {
        cost += s[p - 1] - s[i];
    }

    var min = cost;
    for (i = p; i < s.length; i++) {
        var add = (s[i] - s[i - 1]) * p;
        var save = s[i] - s[i - p];
        cost = cost + add - save;
        // console.log(i, add, save, cost, min)
        if (cost < min) min = cost;
    }
    return min;
}
