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
        var aps = lines[l++].split(' ').map((x) => +x);
        var bps = lines[l++].split(' ').map((x) => +x);
        console.log('Case #%d: %s', i + 1, solve(tokens[0], tokens[1], aps, bps));
    }
});

function solve(n, h, aps, bps) {
    var mid = Math.floor(n / 2);
    var left = getAllPairs(aps.slice(0, mid), bps.slice(0, mid));
    var right = getAllPairs(aps.slice(mid), bps.slice(mid));

    var c = 0;
    for (var a1 in left) {
        for (var a2 in right) {
            if (+a1 + +a2 < h) continue;

            for (var i = 0; i < left[a1].length; i++) {
                var b1 = left[a1][i];
                var idx = binarySearch(0, right[a2].length - 1, (x) => b1 + right[a2][x] >= h);
                c += idx + 1;
            }
        }
    }

    return c;
}

function getAllPairs(aps, bps) {
    var n = aps.length;
    var max = Math.pow(3, n);

    var hp = {}; // ah -> [bh], where bh is sorted dec
    for (var i = 0; i < max; i++) {
        var a = 0;
        var b = 0;
        var temp = i;
        for (var j = 0; j < n; j++) {
            var c = temp % 3;
            if (c == 0) {
                a += aps[j];
                b += bps[j];
            } else if (c == 1) {
                a += aps[j];
            } else {
                b += bps[j];
            }
            temp /= 3;
        }
        hp[a] = hp[a] || [];
        var idx = binarySearch(0, hp[a].length - 1, (x) => hp[a][x] > b);
        hp[a].splice(idx + 1, 0, b);
    }

    return hp;
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
