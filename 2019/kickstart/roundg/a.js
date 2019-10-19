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
        var n = tokens[0];
        var ms = lines[l++].split(' ').map((x) => +x);
        var rs = lines[l++].split(' ').map((x) => +x);
        console.log('Case #%d: %s', i + 1, solve(n, ms, rs));
    }
});

function solve(n, ms, rs) {
    var sum = rs.reduce((s, r) => s + Math.floor(n / r), 0);

    ms.forEach((x) => {
        rs.forEach((r) => {
            if (!(x % r)) sum--;
        });
    });

    return sum;
}
