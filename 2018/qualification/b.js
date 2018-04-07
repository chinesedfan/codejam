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
        l++;
        var tokens = lines[l++].split(' ').map(function(x) { return parseInt(x); });
        console.log('Case #%d: %s', i + 1, solve(tokens));
    }
});

function solve(arr) {
    var a1 = [], a2 = [];
    for (var i = 0; i < arr.length; i++) {
        if (i & 1) {
            a2.push(arr[i]);
        } else {
            a1.push(arr[i]);
        }
    }
    var f = function(a, b) { return a - b; };
    a1.sort(f); // even
    a2.sort(f); // odd

    for (var i = 0; i < a1.length; i++) {
        if (i < a2.length && a1[i] > a2[i]) return i * 2;
        if (i > 0 && a1[i] < a2[i - 1]) return i * 2 - 1;
    }
    return 'OK';
}
