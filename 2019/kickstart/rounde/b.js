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

    var ret = [];
    for (var d = 0; d < days.length; d++) {
        var mc = days[d][0];
        var me = days[d][1];
        var sc = 0;
        var se = 0;
        for (var s = 0; s < slots.length; s++) {
            var c = slots[s][0];
            var e = slots[s][1];
            if (sc < mc) {
                var f = Math.min(1, (mc - sc) / c);
                sc += f * c;
                se += (1 - f) * e;
            } else {
                se += e;
            }
        }
        ret[d] = sc >= mc && se >= me ? 'Y' : 'N';
    }
    return ret.join('');
}
