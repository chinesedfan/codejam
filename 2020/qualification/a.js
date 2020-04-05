var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var lines = [];
rl.on('line', function (input) {
    lines.push(input);
});
rl.on('close', function () {
    var t = parseInt(lines[0]);
    var l = 1;
    for (var i = 0; i < t; i++) {
        var n = +lines[l++];
        console.log('Case #%d: %s', i + 1, solve(lines.slice(l, l + n).map((str) => str.split(' ').map((x) => +x))));
        l += n;
    }
});

function solve(grid) {
    var k = grid.reduce((s, row, i) => s + grid[i][i], 0);
    var r = grid.filter((row) => {
        var m = {};
        return row.some((x) => {
            if (m[x]) return true;
            
            m[x] = 1;
        });
    }).length;
    var c = grid.filter((row, i) => {
        var m = {};
        return row.some((val, j) => {
            var x = grid[j][i];
            if (m[x]) return true;
            
            m[x] = 1;
        });
    }).length;
    return [k, r, c].join(' ');
}
