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
    var dp = [];

    // dp[i][j] means the max value if finished activities from i, with j energy at the beginning
    for (var i = vs.length - 1; i >= 0; i--) {
        dp[i] = [];
        for (var j = 0; j <= e; j++) {
            if (i == vs.length - 1) {
                dp[i][j] = vs[i] * j;
                continue;
            }

            var m = -Infinity;
            for (var k = 0; k <= j; k++) {
                m = Math.max(m, vs[i] * k + dp[i + 1][Math.min(e, j - k + r)]);
            }
            dp[i][j] = m;
        }
    }

    return dp[0][e];
}
