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
        var tokens = lines[l++].split(' ').map((x) => +x);
        console.log('Case #%d: %s', i + 1, solve(tokens[1], tokens[2], tokens[3], tokens[4], lines[l++]));
    }
});

function solve(r, c, sr, sc, instrs) {
    var rm = {}; // r -> [{beg, end}]
    rm[sr] = [{beg: sc, end: sc}];
    var cm = {};
    cm[sc] = [{beg: sr, end: sr}];

    var p = {
        r: sr,
        c: sc
    };
    for (var i = 0; i < instrs.length; i++) {
        var ch = instrs[i];
        switch (ch) {
        case 'N':
            p.r = next(cm, p.c, p.r, -1);
            next(rm, p.r, p.c, 0);
            break;
        case 'E':
            p.c = next(rm, p.r, p.c, 1);
            next(cm, p.c, p.r, 0);
            break;
        case 'W':
            p.c = next(rm, p.r, p.c, -1);
            next(cm, p.c, p.r, 0);
            break;
        case 'S':
            p.r = next(cm, p.c, p.r, 1);
            next(rm, p.r, p.c, 0);
            break;
        }
        // console.log('rm', rm);
        // console.log('cm', cm);
        // console.log('p', p);
    }

    return p.r + ' ' + p.c;
}
function next(m, k, v, offset) {
    v = v + offset;

    var mk = m[k];
    if (!mk) {
        m[k] = [{beg: v, end: v}];
        return v;
    }

    var ib = -1;
    var ie = -1;
    for (var i = 0; i < mk.length; i++) {
        var o = mk[i];
        if (v >= o.beg) ib = i;
        if (v > o.end) ie = i;
    }

    // if inside, convert to gap
    if (ib != ie) {
        if (offset > 0) {
            v = mk[ib].end + 1;
            ie = ib;
        } else if (offset < 0) {
            v = mk[ib].beg - 1;
            ib = ie;
        } else {
            return v;
        }
    }

    if (ib < 0) {
        if (v == mk[ib + 1].beg - 1) {
            return --mk[ib + 1].beg;
        } else {
            mk.unshift({beg: v, end: v});
        }
    } else if (ib == mk.length - 1) {
        if (v == mk[ib].end + 1) {
            return ++mk[ib].end;
        } else {
            mk.push({beg: v, end: v});
        }
    } else {
        if (mk[ib].end + 2 == mk[ib + 1].beg) {
            mk.splice(ib, 1);
        } else if (v == mk[ib].beg - 1) {
            return --mk[ib].beg;
        } else if (v == mk[ib + 1].end + 1) {
            return ++mk[ib + 1].end;
        } else {
            mk.unshift({beg: v, end: v});
        }
    }
    return v;
}
