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
    var m = []; // i,j -> ok
    for (var i = 0; i < str.length; i++) {
        m.push([]);
        var odd = 0;
        var count = {}; // ch -> count
        for (var j = i; j < str.length; j++) {
            var ch = str[j];
            count[ch] = (count[ch] || 0) + 1;
            if (count[ch] & 1) {
                odd++;
            } else {
                odd--;
            }
            m[i][j] = odd < 2;
        }
    }

    var qc = 0;
    qs.forEach((ts) => {
        if (m[ts[0] - 1][ts[1] - 1]) qc++;
    });

    return qc;
}
