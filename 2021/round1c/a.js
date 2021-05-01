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
    for (var i = 1; i < ns.length; i++) {
        ds.push(ns[i] - ns[i - 1])
    }
    var dmax = Math.max(...ds)
    // in same slots
    var dsame = dmax - 1

    // in different slots
    ds = ds.map(d => Math.floor(d / 2))
    if (ns[0] !== 1) {
        ds.push(ns[0] - 1)
    }
    if (ns[ns.length - 1] !== k) {
        ds.push(k - ns[ns.length - 1])
    }
    var ddiff = -Infinity
    if (ds.length >= 2) {
        ds.sort((a, b) => b - a)
        ddiff = ds[0] + ds[1]
    } else if (ds.length == 1) {
        ddiff = ds[0]
    }
    return Math.max(dsame, ddiff, 0) / k
}
