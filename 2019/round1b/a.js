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
        console.log('Case #%d: %s', i + 1, solve(tokens[1],
                lines.slice(l, l + tokens[0]).map((str) => str.split(' '))));
        l += tokens[0];
    }
});

function solve(q, ps) {
    ps.forEach((p) => {
        p[0] = +p[0];
        p[1] = +p[1];
    });

    var mh, mv;
    for (var i = 0; i < ps.length; i++) {
        var n = next(ps[i]);
        var c = 0;
        for (var j = 0; j < ps.length; j++) {
            if (valid(n, ps[j])) c++;
        }
        n.c = c;

        if (isH(ps[i])) {
            if (!mh || c > mh.c) mh = n;
        } else {
            if (!mv || c > mv.c) mv = n;
        }
    }
    var x = mh ? mh[0] : 0;
    var y = mv ? mv[1] : 0;
    return x + ' ' + y;
}

function next(p) {
    switch (p[2]) {
    case 'E':
        return [p[0] + 1, p[1]];
    case 'W':
        return [p[0] - 1, p[1]];
    case 'N':
        return [p[0], p[1] + 1];
    case 'S':
        return [p[0], p[1] - 1];
    }
    throw new Error('invalid dir');
}

function isH(p) {
    return p[2] == 'W' || p[2] == 'E';
}

function valid(p1, p2) {
    switch (p2[2]) {
    case 'E':
        return p1[0] < p2[0];
    case 'W':
        return p1[0] > p2[0];
    case 'N':
        return p1[1] > p2[1];
    case 'S':
        return p1[1] < p2[1];
    }
    return false;
}
