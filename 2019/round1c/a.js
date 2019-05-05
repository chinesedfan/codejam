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
    var beats = {};
    var stack = [];

    var i = 0;
    while (i <= mlen) {
        var chs = {R: [], P: [], S: []};
        for (var j = 0; j < ps.length; j++) {
            if (beats[j]) continue;

            var ri = i % ps[j].length;
            var other = ps[j][ri];
            chs[other].push(j);
        }

        var next = [];
        if (!chs.P.length) next.push('R');
        if (!chs.R.length) next.push('S');
        if (!chs.S.length) next.push('P');

        var all = true;
        if (i == mlen) {
            for (var j = 0; j < ps.length; j++) {
                if (!beats[j]) {
                    all = false;
                    break;
                }
            }
            if (all) break;
        }

        if (next.length == 0 || !all) {
            if (!stack.length) return 'IMPOSSIBLE';

            var state = stack.pop();
            ret = state.ret;
            beats = state.beats;
            i = state.i;

            chs[getCanBeat(state.other)].forEach((x) => beats[x] = 1);
            ret.push(state.other);
            i++;
        } else {
            if (next.length == 2) {
                stack.push({
                    ret: ret.slice(0),
                    beats: Object.assign(beats),
                    i: i,
                    other: next[1]
                });
            } // ignore if equals 3

            chs[getCanBeat(next[0])].forEach((x) => beats[x] = 1);
            ret.push(next[0]);
            i++;
        }
    }

    return ret.join('');
}

function getCanBeat(ch) {
    if (ch === 'R') return 'S';
    if (ch === 'S') return 'P';
    if (ch === 'P') return 'R';
    throw new Error('unknown ch:', ch);
}
