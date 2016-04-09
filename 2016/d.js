var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
_.each(lines, function(line, i) {
    if (i == 0) return;

    console.log('Case #%d: %s', i, solve(line));
});

function solve(line) {
    var tokens = line.split(' ');
    var k = parseInt(tokens[0]);
    var c = parseInt(tokens[1]);
    var s = parseInt(tokens[2]);

    return fSmall(k, c);
}
function fSmall(k, c) {
    if (k == 1) return 0;

    var x = (Math.pow(k, c) - 1) / (k - 1);
    var pos = [];
    for (var i = 0; i < k; i++) {
        pos.push(i * x + 1); // starts from 1
    }
    return pos.join(' ');
}
