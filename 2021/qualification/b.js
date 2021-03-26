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
        console.log('Case #%d: %s', i + 1, solve(...tokens));
    }
});

function solve(x, y, str) {
    x = +x
    y = +y
    str = str.split('')

    const dp = [] // i -> [C, J] -> cost, for [0, i], end with C or J
    for (let i = 0; i < str.length; i++) {
        dp[i] = []

        let costC
        if (i) {
            const c1 = dp[i - 1][0]
            const c2 = dp[i - 1][1] + y
            switch (str[i - 1]) {
            case 'C': costC = c1; break
            case 'J': costC = c2; break
            case '?': costC = Math.min(c1, c2); break
            }
        } else {
            costC = 0
        }

        let costJ
        if (i) {
            const c1 = dp[i - 1][0] + x
            const c2 = dp[i - 1][1]
            switch (str[i - 1]) {
            case 'C': costJ = c1; break
            case 'J': costJ = c2; break
            case '?': costJ = Math.min(c1, c2); break
            }
        } else {
            costJ = 0
        }

        if (str[i] === 'C') {
            dp[i] = [costC, Infinity]
        } else if (str[i] === 'J') {
            dp[i] = [Infinity, costJ]
        } else {
            dp[i] = [costC, costJ]
        }
    }
    return Math.min(...dp[str.length - 1])
}
