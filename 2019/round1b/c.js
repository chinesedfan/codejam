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
        console.log('Case #%d: %s', i + 1, solve(tokens[0], tokens[1],
                lines[l++].split(' ').map((x) => +x),
                lines[l++].split(' ').map((x) => +x)));
    }
});

function solve(n, klimit, cs, ds) {
    var count = 0;
    for (var i = 0; i < n; i++) {
        for (var j = i; j < n; j++) {
            var mc = -Infinity;
            var md = -Infinity;
            for (var k = i; k <= j; k++) {
                mc = Math.max(mc, cs[k]);
                md = Math.max(md, ds[k]);
            }
            if (Math.abs(mc - md) <= klimit) count++;
        }
    }
    return count;
}
