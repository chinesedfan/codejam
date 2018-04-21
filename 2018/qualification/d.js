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
    // sin + cos = area
    var a = 1;
    var b = -area;
    var c = (area * area - 1) / 2;
    var delta = Math.sqrt(b * b - 4 * a * c);

    var sin = (-b + delta) / (2 * a);
    var cos = (-b - delta) / (2 * a);

    console.log(0.5 * cos, 0.5 * sin, 0);
    console.log(-0.5 * sin, 0.5 * cos, 0);
    console.log(0, 0, 0.5);
}
