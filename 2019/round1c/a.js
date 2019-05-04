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
        console.log('Case #%d: %s', i + 1, solve(n, lines.slice(l, l + n)));
        l += n;
    }
});

function solve(n, ps) {
    var mlen = Math.max.apply(Math, ps.map((p) => p.length));
    var ret = [];

    for (var i = 0; i < mlen; i++) {
        var cans = {R: 1, P: 1, S: 1};
        for (var j = 0; j < ps.length; j++) {
            var ri = i % ps[j].length;
            var other = ps[j][ri];
            if (other === 'S') {
                cans.P = 0;
            } else if (other === 'P') {
                cans.R = 0;
            } else if (other === 'R') {
                cans.S = 0;
            }
        }

        if (cans.R) {
            ret.push('R');
        } else if (cans.S) {
            ret.push('S');
        } else if (cans.P) {
            ret.push('P');
        } else {
            return 'IMPOSSIBLE';
        }
    }

    return ret.join('');
}
