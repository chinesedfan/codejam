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
    var hmap = {}
    for (let i = 0; i < r; i++) {
        let p = -1
        for (let j = 0; j < c; j++) {
            if (grid[i][j]) {
                if (p < 0) {
                    p = j;
                } else {
                    let k = p
                    while (j - k >= 1) {
                        hmap[key(i, k, j)] = 1;
                        k++;
                    }
                }
            } else {
                p = -1
            }
        }
    }
    let count = 0;
    for (let j = 0; j < c; j++) {
        let p = -1
        for (let i = 0; i < r; i++) {
            if (grid[i][j]) {
                if (p < 0) {
                    p = i;
                } else {
                    let k = p
                    while (i - k >= 1) {
                        const v = [j, k, i];
                        count += test(v, hmap);
                        k++;
                    }
                }
            } else {
                p = -1
            }
        }
    }
    return count;
}

function key(...args) {
    return args.join('#');
}
function test(v, hmap) {
    let count = 0;
    const [c, r1, r2] = v;
    const len = r2 - r1 + 1;
    if (check([r1, c - len * 2 + 1, c], v, hmap)) count++;
    if (check([r2, c - len * 2 + 1, c], v, hmap)) count++;
    if (check([r1, c, c + len * 2 - 1], v, hmap)) count++;
    if (check([r2, c, c + len * 2 - 1], v, hmap)) count++;
    if (!(len & 1)) {
        if (check([r1, c - len / 2 + 1, c], v, hmap)) count++;
        if (check([r2, c - len / 2 + 1, c], v, hmap)) count++;
        if (check([r1, c, c + len / 2 - 1], v, hmap)) count++;
        if (check([r2, c, c + len / 2 - 1], v, hmap)) count++;
    }
    return count;
}
function check(h, v, hmap) {
    if (!hmap[key(...h)]) return false;

    const [r, c1, c2] = h;
    const [c, r1, r2] = v;
    const hl = c2 - c1 + 1;
    const vl = r2 - r1 + 1;
    if (hl !== vl * 2 && hl !== vl / 2) return false
    return (r === r1 || r === r2) && (c === c1 || c === c2)
}
