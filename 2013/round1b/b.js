var fs = require('fs');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var tokens = lines[l++].split(' ');
    console.log('Case #%d: %s', i + 1, solve(
        +tokens[0], +tokens[1], +tokens[2]
    ));
}

function solve(n, cx, cy) {
    var h = 1;
    var total = 1;
    while (total < n) {
        h += 2;
        total += 2 * h - 1;
    }

    var rh = h - 2;
    if (total == n) rh = h;
    if (Math.abs(cx) <= rh - 1 && cy <= rh - 1) return 1;
// console.log(n, total)
    var b = h - 1;
    if ((cy == cx + b || cy == -cx + b)) {
        var side = cy + 1;
        if (side >= 1 && side <= h) {
            if (side == h) side = 2 * h - 1;
            var rest = n - (total - (2 * h - 1));
            // console.log(`${side}/${rest}`);
            var ans = calc(rest, side);
            while (rest--) {
                ans /= 2;
            }
            return ans;
        }
    }

    return 0;
}

function calc(n, m) {
    var cm = [];
    for (var i = 1; i <= n; i++) {
        cm[i] = [];
        for (var j = 1; j <= n; j++) {
            cm[i][j] = i <= j ? 1 : cm[i - 1][j] + (j == 1 ? 1 : cm[i - 1][j - 1]);
        }
    }

    var sum = 0;
    for (var i = m; i <= n; i++) {
        sum += cm[n][i];
    }
    return sum;
}
