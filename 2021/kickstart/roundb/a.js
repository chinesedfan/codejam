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
        l++
        console.log('Case #%d: %s', i + 1, solve(lines[l++]));
    }
});

function solve(str) {
    const r = []
    for (let i = 0; i < str.length; i++) {
        let val
        if (i) {
            if (str[i] > str[i - 1]) {
                val = r[i - 1] + 1
            } else {
                val = 1
            }
        } else {
            val = 1
        }
        r.push(val)
    }
    return r.join(' ')
}
