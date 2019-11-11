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
        var tokens = lines[l++].split(' ');
        var d = +tokens[0];
        var s = +tokens[1];
        console.log('Case #%d: %s', i + 1, solve(
            lines.slice(l, l + s).map(str => str.split(' ').map((x) => +x)),
            lines.slice(l + s, l + s + d).map(str => str.split(' ').map((x) => +x))
        ));
        l += s + d;
    }
});

function solve(slots, days) {
    // sort by performance of C dec, as well as E asc
    slots.sort((a, b) => {
        var ka = a[0] / a[1];
        var kb = b[0] / b[1];
        return kb - ka;
    });

    var cs = []; // sum of c for slot [0,i]
    var es = []; // sum of e for slot [0,i]
    var sum = 0;
    for (var s = 0; s < slots.length; s++) {
        var c = slots[s][0];
        var e = slots[s][1];
        if (s) {
            cs[s] = cs[s - 1] + c;
            es[s] = es[s - 1] + e;
        } else {
            cs[s] = c;
            es[s] = e;
        }
        sum += e;
    }

    var ret = [];
    for (var d = 0; d < days.length; d++) {
        var mc = days[d][0];
        var me = days[d][1];

        var idx = binarySearch(0, slots.length - 1, (x) => cs[x] < mc);
        if (idx === slots.length - 1) {
            ret[d] = 'N';
        } else {
            var c = slots[idx + 1][0];
            var e = slots[idx + 1][1];
            var f = Math.max((mc - (idx < 0 ? 0 : cs[idx])) / c, 0);
            var se = (sum - es[idx + 1]) + (1 - f) * e;
            ret[d] = se >= me ? 'Y' : 'N';
        }
    }
    return ret.join('');
}

function binarySearch(l, r, fn) { // for any [l, x], fn returns true
    while (l <= r) {
        var middle = Math.floor((l + r) / 2);
        if (fn(middle)) {
            l = middle + 1;
        } else {
            r = middle - 1;
        }
    }
    return r;
}
