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
        var n = +lines[l++];
        console.log('Case #%d: %s', i + 1, solve(n, lines[l++].split(' ').map((x) => +x)));
    }
});

function solve(n, hs) {
    let count = 0;
    let prev = 0;
    return hs.reduce((s, x, i) => {
        if (i) {
            let cur = 0;
            if (hs[i] > hs[i - 1]) {
                cur = 1;
            } else if (hs[i] < hs[i - 1]) {
                cur = -1;
            }

            if (cur === prev) {
                count++;
            } else {
                count = 2;
            }

            if (cur && count > 4) {
                count = 1;
                s++;
            }

            prev = cur;
        }
        return s;
    }, 0);
}
