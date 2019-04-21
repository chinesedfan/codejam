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
        var s = +tokens[1];
        console.log('Case #%d: %s', i + 1, solve(n, s, lines[l++].split(' ').map((x) => +x)));
    }
});

function solve(n, s, ts) {
    var mx = -Infinity;
    for (var i = 0; i < ts.length; i++) {
        var count = {}; // ch -> count
        var sum = 0;
        for (var j = i; j < ts.length; j++) {
            var type = ts[j];
            if (count[type] < 0) continue;
            count[type] = (count[type] || 0) + 1;

            sum++;
            if (count[type] > s) {
                sum -= count[type];
                count[type] = -1; // forbidden
            }

            mx = Math.max(mx, sum);
        }
    }

    return mx;
}
