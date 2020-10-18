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
        console.log('Case #%d: %s', i + 1, solve(
            lines[l++]
        ));
    }
});

function solve(str) {
    const s1 = find(str, 'KICK')
    const s2 = find(str, 'START')

    let i1 = 0
    let i2 = 0
    let count = 0
    while (i1 < s1.length && i2 < s2.length) {
        if (s1[i1] < s2[i2]) {
            i1++
            count += s2.length - i2
        } else {
            i2++
        }
    }
    return count
}
function find(str, pattern) {
    const ret = []
    for (let i = 0; i + pattern.length - 1 < str.length; i++) {
        if (str.substr(i, pattern.length) === pattern) ret.push(i)
    }
    return ret
}
