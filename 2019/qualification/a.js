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
        console.log('Case #%d: %s', i + 1, solve(lines[l++]));
    }
});

function solve(str) {
    var s1 = [], s2 = [];
    str.split('').map((ch) => {
        if (ch === '4') {
            s1.push(2);
            s2.push(2);
        } else if (ch === '7') {
            s1.push(2);
            s2.push(5);
        } else if (ch === '8') {
            s1.push(3);
            s2.push(5);
        } else if (ch === '9') {
            s1.push(3);
            s2.push(6);
        } else {
            var n = +ch;
            s1.push(Math.floor(n / 2));
            s2.push(Math.ceil(n / 2));
        }
    });

    while (!s1[0]) s1.shift();
    while (!s2[0]) s2.shift();

    return s1.join('') + ' ' + s2.join('');
}
