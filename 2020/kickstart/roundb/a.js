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
        var n = +lines[l++];
        console.log('Case #%d: %s', i + 1, solve(n, lines[l++].split(' ').map((x) => +x)));
    }
});

function solve(n, hs) {
    return hs.filter((x, i) => {
        return i && i != hs.length && x > hs[i - 1] && x > hs[i + 1];
    }).length;
}
