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
        var q = +tokens[1];
        var str = lines[l++];
        console.log('Case #%d: %s', i + 1, solve(n, q, str, lines.slice(l, l + q).map((s) =>
            s.split(' ').map((x) => +x))));
        l += q;
    }
});

function solve(n, q, str, qs) {
    var cs = [];
    var count = {}; // ch -> count
    for (var i = 0; i < str.length; i++) {
        count[str[i]] = (count[str[i]] || 0) + 1;
        cs.push(Object.assign({}, count));
    }

    var qc = 0;
    qs.forEach((ts) => {
        var beg = cs[ts[0] - 2];
        var end = cs[ts[1] - 1];
        var hasOdd = false;
        for (var key in end) {
            var before = beg ? (+beg[key] || 0) : 0;
            var after = +end[key];
            if ((after - before) & 1) {
                if (!hasOdd) {
                    hasOdd = true;
                } else {
                    return;
                }
            }
        }
        qc++;
    });

    return qc;
}
