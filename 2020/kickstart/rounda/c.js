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
        var k = +tokens[1];
        console.log('Case #%d: %s', i + 1, solve(n, k, lines[l++].split(' ').map((x) => +x)));
    }
});

function solve(n, k, costs) {
    var top2 = [];
    for (var i = 1; i < costs.length; i++) {
        var diff = costs[i] - costs[i - 1];
        if (i === 1) {
            top2.push(diff);
        } else if (i === 2) {
            if (diff > top2[0]) {
                top2.unshift(diff);
            } else {
                top2.push(diff);
            }
        } else {
            if (diff > top2[0]) {
                top2.unshift(diff);
                top2.pop();
            } else if (diff > top2[1]) {
                top2[1] = diff;
            }
        }
    }

    if (top2.length === 1) {
        return Math.ceil(top2[0] / 2);
    } else {
        return Math.max(Math.ceil(top2[0] / 2), top2[1]);
    }
}
