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
        var n = +lines[l++];
        var grid = [];
        for (var j = 0; j < n; j++) {
            grid.push(
                lines[l++].split(' ').map((x) => +x)
            )
        }
        console.log('Case #%d: %s', i + 1, solve(
            n,
            grid
        ));
    }
});

function solve(n, grid) {
    const row = grid.length
    const col = grid[0].length

    let max = -Infinity
    for (let i = 0; i < row; i++) {
        let sum = 0
        for (let j = 0; j < col; j++) {
            if (i + j >= row) break
            sum += grid[i + j][j]
        }
        max = Math.max(max, sum)
    }
    for (let j = 0; j < col; j++) {
        let sum = 0
        for (let i = 0; i < row; i++) {
            if (i + j >= col) break
            sum += grid[i][i + j]
        }
        max = Math.max(max, sum)
    }
    return max
}
