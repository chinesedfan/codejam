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
        var n = +tokens[0];
        var s = +tokens[1];
        console.log('Case #%d: %s', i + 1, solve(n, s, lines[l++].split(' ').map((x) => +x)));
    }
});

function solve(n, s, ts) {
    var cs = [];
    var count = {}; // ch -> count
    for (var i = 0; i < ts.length; i++) {
        count[ts[i]] = (count[ts[i]] || 0) + 1;
        cs.push(Object.assign({}, count));
    }

    var mx = -Infinity;
    for (var i = 0; i < ts.length; i++) {
        for (var j = i; j < ts.length; j++) {
            var beg = cs[i - 1];
            var end = cs[j];
            var sum = 0;
            for (var key in end) {
                var before = beg ? (+beg[key] || 0) : 0;
                var after = +end[key];
                sum += (after - before > s) ? 0 : after - before;
            }
            mx = Math.max(mx, sum);
        }
    }

    return mx;
}
