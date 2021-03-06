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

function solve(left, right) {
    return cal(right, true) - cal(left, false)
}
function ok(n) {
    n = '' + n

    for (let i = 1; i <= n.length; i++) {
        if ((i & 1) ^ (+n[i - 1] & 1)) return false
    }
    return true
}
function cal(n, include) {
    let sum = 0
    let len = n.length - 1
    while (len) {
        sum += full(len)
        len--
    }
    //
    let valid = true
    for (let i = 1; i <= n.length; i++) {
        const x = +n[i - 1]
        let p
        if (i & 1) {
            // 2 3 -> 1
            p = Math.floor(x / 2)
            valid = x & 1
        } else {
            // 1 2 -> 1
            p = Math.ceil(x / 2)
            valid = !(x & 1)
        }
        sum += p * full(n.length - i)
        if (!valid) break
    }
    if (include && valid) sum++
    return sum
}
function full(len) {
    return Math.pow(5, len)
}
