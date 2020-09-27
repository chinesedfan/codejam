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
        var intervals = [];
        for (var j = 0; j < n; j++) {
            intervals.push(
                lines[l++].split(' ').map((x) => +x)
            )
        }
        console.log('Case #%d: %s', i + 1, solve(
            n,
            +tokens[1],
            intervals
        ));
    }
});

function solve(n, k, intervals) {
    var sorted = intervals.sort((a, b) => a[0] - b[0]);

    var c = 0;
    var end = 0;
    sorted.forEach(([s, e]) => {
        if (end > s) {
            s = end;
        }

        c += Math.ceil((e - s) / k);
        end = s + Math.ceil((e - s) / k) * k;
    });
    return c;
}
