var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var lines = [];
rl.on('line', function (input) {
    lines.push(input);
});
rl.on('close', function () {
    var t = parseInt(lines[0]);
    var l = 1;
    for (var i = 0; i < t; i++) {
        var n = +lines[l++];
        console.log('Case #%d: %s', i + 1, solve(lines.slice(l, l + n)));
        l += n;
    }
});

function solve(ps) {
    var ret = ps[0].split('').slice(1); // remove the first *
    var failed = ps.some((p) => {
        for (var i = 0; i < p.length; i++) {
            var ch = p[p.length - 1 - i];
            if (ch === '*') continue;

            var ridx = ret.length - 1 - i;
            if (ridx < 0) {
                ret.unshift(ch);
            } else {
                if (ch !== ret[ridx]) return true;
            }
        }
    });
    return failed ? '*' : ret.join('');
}
