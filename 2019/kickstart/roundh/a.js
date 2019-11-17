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
        var n = tokens[0];
        var cs = lines[l++].split(' ').map((x) => +x);
        console.log('Case #%d: %s', i + 1, solve(cs));
    }
});

function solve(cs) {
    var h = 0;
    var ns = []; // sorted asc
    return cs.map((n, i) => {
        var c = cs[i];
        var idx = binarySearch(0, i - 1, (x) => ns[x] <= c);
        ns.splice(idx + 1, 0, c);

        var sep = binarySearch(0, i, (x) => ns[x] < h + 1);
        if (ns.length - (sep + 1) >= h + 1) {
            h++;
        }
        return h;
    }).join(' ');
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
