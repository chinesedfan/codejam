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
    const top = []
    const bottom = []
    const left = []
    const right = []
    for (let i = 0; i < r; i++) {
        top[i] = Array(c).fill(0)
        bottom[i] = Array(c).fill(0)
        left[i] = Array(c).fill(0)
        right[i] = Array(c).fill(0)
        for (let j = 0; j < c; j++) {
            if (!grid[i][j]) continue
            top[i][j] = i ? top[i - 1][j] + 1 : 1
            left[i][j] = j ? left[i][j - 1] + 1 : 1
        }
    }
    for (let i = r - 1; i >= 0; i--) {
        for (let j = c - 1; j >= 0; j--) {
            if (!grid[i][j]) continue
            bottom[i][j] = i < r - 1 ? bottom[i + 1][j] + 1 : 1
            right[i][j] = j < c - 1 ? right[i][j + 1] + 1 : 1
        }
    }

    let count = 0;
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            count += cal(top[i][j], left[i][j])
            count += cal(bottom[i][j], left[i][j])
            count += cal(top[i][j], right[i][j])
            count += cal(bottom[i][j], right[i][j])
        }
    }
    return count;
}
function cal(a, b) {
    if (!(a >= 2 && b >= 2)) return 0

    return Math.min(a, Math.floor(b / 2))
        + Math.min(b, Math.floor(a / 2))
        - 2
}
