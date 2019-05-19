var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var tokens = lines[l++].split(' ');
    var vs = lines[l++].split(' ').map((x) => +x);
    console.log('Case #%d: %s', i + 1, solve(
        +tokens[0], +tokens[1], +tokens[2], vs
    ));
}

function solve(e, r, n, vs) {
    var next = []; // next[i] means the index that has larger value than i
    var stack = [];
    for (var i = 0; i < vs.length; i++) {
        while (stack.length && vs[stack[stack.length - 1]] < vs[i]) {
            var j = stack.pop();
            next[j] = i;
        }
        stack.push(i);
    }

    var energy = e;
    var value = 0; // only save value % 10^15
    var n15 = 0;
    for (var i = 0; i < vs.length; i++) {
        if (!next[i]) {
            value += energy * vs[i];
            energy = 0;
        } else {
            var expected = r * (next[i] - i);
            var usable = energy + expected - e;
            if (usable > 0) {
                usable = Math.min(usable, energy);
                value += usable * vs[i];
                energy -= usable;
            }
        }
        energy = Math.min(energy + r, e);

        //
        n15 += Math.floor(value / 1e15);
        value = value % 1e15;
    }

    if (n15) {
        var s = String(value).split('');
        while (s.length < 15) s.unshift(0);

        return n15 + s.join('');
    }
    return value;
}
