var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var lines = [];
rl.on('line', function (input) {
    lines.push(input);
});
rl.on('close', function () {
    var t = parseInt(lines[0]);
    var l = 1;
    for (var i = 0; i < t; i++) {
        console.log('Case #%d: %s', i + 1, solve(lines[l++]));
    }
});

function solve(str) {
    var ns = str.split('').map((x) => +x);
    var left = [];
    var right = [];
    ns.forEach((x, i) => {
        var j;

        j = i - 1;
        while (j >= 0 && ns[j] >= x) j--;
        left[i] = j + 1;

        j = i + 1;
        while (j < ns.length && ns[j] >= x) j++;
        right[i] = j - 1;
    });

    var cleft = Array(ns.length + 1).fill(0); // insert cleft[i] `(` at position i
    var cright = cleft.slice();
    var ds = Array(ns.length).fill(0);
    for (var n = 1; n < 10; n++) {
        ns.forEach((x, i) => {
            if (x !== n) return;

            cleft[left[i]] += x - ds[left[i]];
            cright[right[i] + 1] += x - ds[right[i]];
            for (var j = left[i]; j <= right[i]; j++) ds[j] = x;
        });
    }

    var res = [];
    ns.forEach((x, i) => {
        var sl = Array(cright[i]).fill(')').join('');
        var sr = Array(cleft[i]).fill('(').join('');
        res.push(sl + sr, x);
    });
    var sl = Array(cright[ns.length]).fill(')').join('');
    var sr = Array(cleft[ns.length]).fill('(').join('');
    res.push(sl + sr);
    return res.join('');
}
