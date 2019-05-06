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
    // filter direct connected rooms
    var m = {};
    var c = 0;
    for (var i = 0; i < rs.length; i++) {
        m[rs[i]] = m[rs[i]] || {
            i: c++,
            v: rs[i]
        };
    }
    var rrs = _.values(m);

    var n = rrs.length;
    var ds = [];
    for (var i = 0; i < n; i++) {
        ds[i] = [];
        for (var j = 0; j < n; j++) {
            ds[i][j] = rrs[i] == rrs[j] ? 0 : Infinity;
        }
    }
    for (var i = 0; i < ts.length; i++) {
        var t = ts[i];
        t[0] = rs[t[0] - 1];
        t[1] = rs[t[1] - 1]; // find the room id
        t[0] = m[t[0]].i;
        t[1] = m[t[1]].i;
        ds[t[0]][t[1]] = Math.min(t[2], ds[t[0]][t[1]]);
    }

    // floyd, i to j with only [0, k]
    var f = Array(n);
    for (var i = 0; i < n; i++) {
        f[i] = Array(n);
    }
    for (var k = 0; k < n; k++) {
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                // ds means previous now
                f[i][j] = Math.min(ds[i][j], ds[i][k] + ds[k][j]);
            }
        }
        ds = f;
    }

    return ss.map((s) => {
        s[0] = rs[s[0] - 1];
        s[1] = rs[s[1] - 1];
        s[0] = m[s[0]].i;
        s[1] = m[s[1]].i;
        var x = f[s[0]][s[1]];
        return x === Infinity ? -1 : x;
    }).join('\n');
}
