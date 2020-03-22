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
        var b = +tokens[1];
        console.log('Case #%d: %s', i + 1, solve(n, b, lines[l++].split(' ').map((x) => +x)));
    }
});

function solve(n, b, costs) {
    var dp = [];
    for (var i = 0; i < costs.length; i++) {
        dp[i] = [];
        for (var j = 0; j <= b; j++) {
            if (i) {
                if (j >= costs[i]) {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - costs[i]] + 1);
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            } else {
                dp[i][j] = j >= costs[i] ? 1 : 0;
            }
        }
    }
    return dp[n - 1][b];
}
