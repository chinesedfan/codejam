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
        console.log('Case #%d:', i + 1);
        solve(parseFloat(lines[l++]));
    }
});

function solve(area) {
    // FIXME: only consider small data sets
    // 1 / area = Math.cos(angle)
    var angle = Math.acos(1 / area);

    console.log(0.5 * Math.sin(angle), 0.5 * Math.cos(angle), 0);
    console.log(-0.5 * Math.cos(angle), 0.5 * Math.sin(angle), 0);
    console.log(0, 0, 0.5);
}
