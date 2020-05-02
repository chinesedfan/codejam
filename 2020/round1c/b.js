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
    qs.forEach(item => {
        var r = item[1];
        for (var i = 0; i < r.length; i++) {
            chs[r[i]] = 1;
        }
    });

    var ps = {};
    var add = (ch, p) => { // position of `ch` (starts from 0) must be <= `p`
        ps[ch] = ps[ch] || 10;
        ps[ch] = Math.min(ps[ch], p);
    }

    qs.forEach(item => {
        var m = item[0];
        if (m === '-1') return;

        var r = item[1];
        if (m.length === r.length) {
            for (var i = 0; i < r.length; i++) {
                var ch = r[i];
                if (i === 0) {
                    add(ch, +m[i]);
                    break;
                }
            }
        }
    });

    var ret = [''];
    for (var k in ps) {
        ret[ps[k]] = k;
        chs[k] = 0;
    }
    for (var k in chs) {
        if (chs[k]) {
            ret[0] = k;
            break;
        }
    }
    return ret.join('');
}
