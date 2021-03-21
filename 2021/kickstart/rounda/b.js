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
    var hranges = [] // r -> [ranges], [start, end)
    for (let i = 0; i < r; i++) {
        hranges[i] = []
        let p = -1
        for (let j = 0; j < c; j++) {
            if (grid[i][j]) {
                if (p < 0) {
                    p = j;
                }
            } else {
                if (j - p >= 2 && p >= 0) hranges[i].push([p, j]);
                p = -1
            }
        }
        if (p >= 0 && c - p >= 2) {
            hranges[i].push([p, c]);
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
                        count += test(v, hranges);
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

function test(v, hranges) {
    let count = 0;
    const [c, r1, r2] = v;
    const len = r2 - r1 + 1;
    if (check([r1, c - len * 2 + 1, c], v, hranges)) count++;
    if (check([r2, c - len * 2 + 1, c], v, hranges)) count++;
    if (check([r1, c, c + len * 2 - 1], v, hranges)) count++;
    if (check([r2, c, c + len * 2 - 1], v, hranges)) count++;
    if (!(len & 1)) {
        if (check([r1, c - len / 2 + 1, c], v, hranges)) count++;
        if (check([r2, c - len / 2 + 1, c], v, hranges)) count++;
        if (check([r1, c, c + len / 2 - 1], v, hranges)) count++;
        if (check([r2, c, c + len / 2 - 1], v, hranges)) count++;
    }
    return count;
}
function check(h, v, hranges) {
    const [r, c1, c2] = h;
    const [c, r1, r2] = v;
    const ranges = hranges[r]
    const rindex = binarySeach(0, ranges.length - 1, (idx) => {
        return c1 >= ranges[idx][0]
    })
    if (rindex < 0) return false;
    const [start, end] = ranges[rindex];
    if (c2 >= end) return false;

    const hl = c2 - c1 + 1;
    const vl = r2 - r1 + 1;
    if (hl < 2 || vl < 2) return false;
    if (hl !== vl * 2 && hl !== vl / 2) return false
    return (r === r1 || r === r2) && (c === c1 || c === c2)
}
function binarySeach(left, right, fn) {
    while (left <= right) {
        var mid = Math.floor((left + right) / 2)
        if (fn(mid)) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return right
}
