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
        var tokens = lines[l++].split(' ').map((x) => +x);
        console.log('Case #%d: %s', i + 1, solve(tokens[1],
                lines.slice(l, l + tokens[0]).map((str) => str.split(' '))));
        l += tokens[0];
    }
});

function solve(q, ps) {
    var max = 0, x, y;
    for (var i = 0; i <= q; i++) {
        for (var j = 0; j <= q; j++) {
            var pc = ps.filter((p) => {
                switch (p[2]) {
                case 'E': return i > p[0];
                case 'W': return i < p[0];
                case 'N': return j > p[1];
                case 'S': return j < p[1];
                }
                return false;
            }).length;
            if (pc > max) {
                max = pc;
                x = i;
                y = j;
            }
        }
    }
    return x + ' ' + y;
}
