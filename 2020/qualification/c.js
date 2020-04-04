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
        console.log('Case #%d: %s', i + 1, solve(n, lines.slice(l, l + n).map((str) => str.split(' ').map((x) => +x))));
        l += n;
    }
});

function solve(n, acts) {
    acts = acts.map((ts, id) => ({id: id, ts: ts}));
    acts.sort((a, b) => {
        a = a.ts;
        b = b.ts;
        if (a[0] === b[0]) {
            return a[1] - b[1]; 
        } else {
            return a[0] - b[0];
        }
    });

    var e1 = 0, e2 = 0; // c or j
    var res = [];
    var failed = acts.some((obj) => {
        var s = obj.ts[0];
        var e = obj.ts[1];
        if (s >= e1) {
            res.push([obj.id, 'C']);
            e1 = e;
        } else if (s >= e2) {
            res.push([obj.id, 'J']);
            e2 = e;
        } else {
            return true;
        }
    });
    if (failed) return 'IMPOSSIBLE';
        
    var farr = [];
    res.forEach((item) => {
        farr[item[0]] = item[1];
    });
    return farr.join('');
}
