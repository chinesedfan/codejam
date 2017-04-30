var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var i = 1;
var l = 1;
while (i <= t && l < lines.length) {
    var token = lines[l++].split(' ');
    var n = parseInt(token[0]);
    var k = parseInt(token[1]);
    var u = parseFloat(lines[l++]);
    var arr = lines[l++].split(' ');
    console.log('Case #%d: %s', i++, solve(n, k, u, arr.map((x) => parseFloat(x))));
}

function solve(n, k, u, arr) {
    var failSum = _(arr).map((p) => 1 - p).sum();
    if (failSum <= u) return 1;

    var sorted = _(arr).sort().reverse();
    var result;
    sorted.some((max, i) => {
        var avg = (u + sorted.slice(i).sum()) / (n - i);
        if (avg >= max) {
            result = sorted.reduce((memo, p, j) => {
                return memo * (j >= i ? avg : p);
            }, 1);
            return true;
        }
    });
    return result;
}
