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
        var [n, k] = lines[l++].split(' ').map(Number)
        var ns = lines[l++].split(' ').map(Number)
        console.log('Case #%d: %s', i + 1, solve(k, ns));
    }
});

function solve(k, ns) {
    ns.sort((a, b) => a - b)

    var ds = []
    for (var i = 0; i < ns.length; i++) {
        if (i === 0) {
            if (ns[i] !== 1) {
                ds.push(ns[i] - 1)
            }
        } else {
            ds.push(Math.floor((ns[i] - ns[i - 1]) / 2))
        }

        if (i === ns.length - 1) {
            if (ns[i] !== k) {
                ds.push(k - ns[i])
            }
        }
    }
    if (ds.length === 1) {
        return (k - 1) / k
    }

    ds.sort((a, b) => b - a)
    return (ds[0] + ds[1]) / k
}
