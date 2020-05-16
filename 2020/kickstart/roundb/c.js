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

function solve(ms) {
    var stack = [];
    var offset = [0, 0]; // ew, ns
    for (var i = 0; i < ms.length; i++) {
        var ch = ms[i];
        switch (ch) {
        case '(':
            stack.push([i, offset]);
            offset = [0, 0];
            break;
        case ')':
            var [idx, o] = stack.pop(i);
            var repeat = +ms[idx - 1];
            offset = cal(o, repeat, offset);
            break;
        case 'N':
            add(offset, 1, -1);
            break;
        case 'S':
            add(offset, 1, 1);
            break;
        case 'E':
            add(offset, 0, 1);
            break;
        case 'W':
            add(offset, 0, -1);
            break;
        }
    }

    // start from [1, 1]
    return offset.map(x => {
        x++;
        if (x > 1e9) x = 1;
        if (x < 1) x += 1e9;
        return x;
    }).join(' ');
}

function cal(offset, r, o) { // offset + r * o
    return offset.map((x, i) => (x + r * o[i]) % 1e9);
}
function add(offset, i, delta) {
    offset[i] = (offset[i] + delta) % 1e9;
}
