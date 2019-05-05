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
    var ret = [];
    var beats = {};

    var i = 0;
    while (i < ps.length) {
        var chs = {R: [], P: [], S: []};
        for (var j = 0; j < ps.length; j++) {
            if (beats[j]) continue;

            var ri = i % ps[j].length;
            var other = ps[j][ri];
            chs[other].push(j);
        }

        var includes = Object.keys(chs).filter((ch) => chs[ch].length);
        if (includes.length == 3) {
            return 'IMPOSSIBLE';
        } else if (includes.length == 0) {
            // any one can be choosen
            ret.push('R');
            i++;
        } else {
            var ch = getBeater(includes[0]);
            if (includes.length == 2) {
                // choose the one that ties with one and beats the other
                if (getBeater(includes[1]) == includes[0]) {
                    ch = includes[0];
                }
            }

            chs[getCanBeat(ch)].forEach((x) => beats[x] = 1);
            ret.push(ch);
            i++;
        }
    }

    return ret.join('');
}

// who can beat `ch`?
function getBeater(ch) {
    if (ch === 'R') return 'P';
    if (ch === 'S') return 'R';
    if (ch === 'P') return 'S';
    throw new Error('unknown ch:', ch);
}

// who can be beaten by `ch`?
function getCanBeat(ch) {
    if (ch === 'R') return 'S';
    if (ch === 'S') return 'P';
    if (ch === 'P') return 'R';
    throw new Error('unknown ch:', ch);
}
