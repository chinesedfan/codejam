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
        var r = +tokens[0];
        var c = +tokens[1];
        var grid = lines.slice(l, l + r).map(str => str.split(' ').map(Number))
        console.log('Case #%d: %s', i + 1, solve(r, c, grid));
        l += r;
    }
});

function solve(r, c, grid) {
    var hs = []; // [row, start, end], both included
    for (let i = 0; i < r; i++) {
        let p = -1
        for (let j = 0; j < c; j++) {
            if (grid[i][j]) {
                if (p < 0) {
                    p = j;
                } else {
                    let k = p
                    while (j - k >= 1) {
                        hs.push([i, k, j]);
                        k++;
                    }
                }
            } else {
                p = -1
            }
        }
    }
    var vs = [];
    for (let j = 0; j < c; j++) {
        let p = -1
        for (let i = 0; i < r; i++) {
            if (grid[i][j]) {
                if (p < 0) {
                    p = i;
                } else {
                    let k = p
                    while (i - k >= 1) {
                        vs.push([j, k, i]);
                        k++;
                    }
                }
            } else {
                p = -1
            }
        }
    }
    // console.log(hs, vs)
    let count = 0;
    hs.forEach(h => {
        vs.forEach(v => {
            if (check(h, v)) {
                count++;
                // console.log(h, v)
            }
        })
    });
    return count;
}

function check(h, v) {
    const [r, c1, c2] = h;
    const [c, r1, r2] = v;
    const hl = c2 - c1 + 1;
    const vl = r2 - r1 + 1;
    if (hl !== vl * 2 && hl !== vl / 2) return false
    return (r === r1 || r === r2) && (c === c1 || c === c2)
}
