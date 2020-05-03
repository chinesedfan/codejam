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
        var u = +lines[l++];
        var n = 1e4;
        console.log('Case #%d: %s', i + 1, solve(u, lines.slice(l, l + n).map((str) => str.split(' '))));
        l += n;
    }
});

function solve(u, qs) {
    var chs = {};
    var count = {};
    qs.forEach(item => {
        var [m, r] = item;

        for (var i = 0; i < r.length; i++) {
            chs[r[i]] = 1;
        }

        var k = r[0];
        count[k] = (count[k] || 0) + 1;
    });

    var ret = Object.keys(count)
        .map(k => ({k, v: count[k]}))
        .sort((a, b) => b.v - a.v)
        .map(o => o.k);

    for (var k in count) {
        chs[k] = 0;
    }
    for (var k in chs) {
        if (chs[k]) {
            ret.unshift(k);
            break;
        }
    }

    return ret.join('');
}
