var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var rn = +lines[l++];
    var rs = lines.slice(l, l + rn);
    l += rn;
    var tn = +lines[l++];
    var ts = lines.slice(l, l + tn).map((s) => s.split(' ').map((x) => +x));
    l += tn;
    var sn = +lines[l++];
    var ss = lines.slice(l, l + sn).map((s) => s.split(' ').map((x) => +x));
    l += sn;
    console.log('Case #%d:\n%s', i + 1, solve(rs, ts, ss));
}

function solve(rs, ts, ss) {
    var ds = [];
    for (var i = 0; i < rs.length; i++) {
        ds[i] = [];
        for (var j = 0; j < rs.length; j++) {
            ds[i][j] = rs[i] == rs[j] ? 0 : Infinity;
        }
    }
    for (var i = 0; i < ts.length; i++) {
        var t = ts[i];
        t[0]--;
        t[1]--;
        ds[t[0]][t[1]] = Math.min(t[2], ds[t[0]][t[1]]);
    }

    // floyd, i to j with only [0, k]
    var f = [];
    for (var i = 0; i < rs.length; i++) {
        f[i] = [];
        for (var j = 0; j < rs.length; j++) {
            f[i][j] = Array(rs.length);
        }
    }
    for (var k = 0; k < rs.length; k++) {
        for (var i = 0; i < rs.length; i++) {
            for (var j = 0; j < rs.length; j++) {
                if (k == 0) {
                    f[i][j][k] = Math.min(ds[i][j], ds[i][0] + ds[0][j]);
                } else {
                    f[i][j][k] = Math.min(f[i][j][k - 1], f[i][k][k - 1] + f[k][j][k - 1]);
                }
            }
        }
    }

    return ss.map((s) => {
        var x = f[s[0] - 1][s[1] - 1][rs.length - 1];
        return x === Infinity ? -1 : x;
    }).join('\n');
}
