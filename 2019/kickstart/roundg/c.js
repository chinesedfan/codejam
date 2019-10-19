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
        var aps = lines[l++].split(' ').map((x) => +x);
        var bps = lines[l++].split(' ').map((x) => +x);
        console.log('Case #%d: %s', i + 1, solve(tokens[0], tokens[1], aps, bps));
    }
});

function solve(n, h, aps, bps) {
    var max = Math.pow(2, n);
    var c = 0;
    for (var i = 0; i < max; i++) {
        for (var j = 0; j < max; j++) {
            var ap = aps.reduce((s, p, x) => s + (isHappy(i, x) ? p : 0), 0);
            var bp = bps.reduce((s, p, x) => s + (isHappy(j, x) ? p : 0), 0);
            if (ap >= h && bp >= h) c++;
        } 
    }
    return c;
}

function isHappy(idx, i) {
    return idx & (1 << i); 
}
