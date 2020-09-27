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
        console.log('Case #%d: %s', i + 1, solve(
            +tokens[0],
            +tokens[1],
            lines[l++].split(' ').map((x) => +x)
        ));
    }
});

function solve(n, t, hs) {
    return hs .map((v, i) => ({v, i})).sort((a, b) => {
        var ma = Math.floor(a.v / t);
        var mb = Math.floor(b.v / t);
        if (ma == mb) {
            return a.i - b.i;
        } else {
            return ma - mb;
        }
    })
    .map(({v, i}) => i + 1)
    .join(' ');
}
