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
        console.log('Case #%d: %s', i + 1, solve(+tokens[0], +tokens[1]));
    }
});

function solve(row, col) {
    var grid = init(row, col);
    var target = row * col;
    var steps = [];
    var prev;
    while (steps.length < target) {
        var node = step(grid, prev);
        if (!node) break;
        node.f = true;
        steps.push(node);
        prev = node;
    }

    if (steps.length < target) return 'IMPOSSIBLE';
    return 'POSSIBLE\n' + steps.map((s) => [s.r + 1, s.c + 1].join(' ')).join('\n');
}

function init(row, col) {
    var grid = [];
    for (var i = 0; i < row; i++) {
        grid.push([]);
        for (var j = 0; j < col; j++) {
            grid[i].push({r: i, c: j, f: false});
        }
    }
    return grid;
}
function step(grid, prev) {
    var max; // {r, c}
    var mc;
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            var n = grid[i][j];
            if (!n.f && valid(prev, n)) {
                var count = neigbors(grid, n);
                if (!max || count > mc) {
                    max = n;
                    mc = count;
                }
            }
        }
    }
    return max;
}
function neigbors(grid, node) {
    var count = 0;
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            var n = grid[i][j];
            if (!n.f && !valid(node, n)) count++;
        }
    }
    return count;
}
function valid(a, b) {
    if (!a) return true;
    return a.r != b.r && a.c != b.c
        && a.r + a.c != b.r + b.c && a.r - a.c != b.r - b.c;
}
