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
        var n = +tokens[0];
        var k = +tokens[1];
        var p = +tokens[2];
        console.log('Case #%d: %s', i + 1, solve(n, k, p, lines.slice(l, l + n).map(str => str.split(' ').map((x) => +x))));
        l += n;
    }
});

function solve(n, k, p, values) {
    var sum = [];
    for (var i = 0; i < n; i++) {
        sum[i] = [];
        for (var j = 0; j < k; j++) {
            sum[i][j] = j ? sum[i][j - 1] + values[i][j] : values[i][j];
        }
        sum[i].unshift(0);
    }

    var dp = []; // for i stacks, pick j total ones
    for (var i = 0; i < n; i++) {
        dp[i] = [];
        for (var j = 0; j <= p; j++) {
            dp[i][j] = 0;
            for (var x = 0; x <= k; x++) { // for i-th stack, pick 0~x
                if (x > j) break;

                dp[i][j] = Math.max(dp[i][j], (i ? dp[i - 1][j - x] : 0) + sum[i][x]);
            }
        }
    }
    return dp[n - 1][p];
}
