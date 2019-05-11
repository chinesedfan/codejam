var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var r = +lines[l++].split(' ')[0];
    var points = lines[l++].split(' ').map((x) => +x);
    var grid = [];
    while (r--) {
        grid.push(lines[l++].split(' ').map((x) => +x));
    }
    console.log('Case #%d: %s', i + 1, solve(grid, points));
}

function solve(grid, points) {
    var src = {x: points[0], y: points[1]};
    src.v = grid[src.x][src.y];
    var dst = {x: points[2], y: points[3]};

    var visited = {};
    visited[key(src.x, src.y)] = src.v;

    var q = [src];
    while (1) {
        var max = getMaxNext(q, grid, visited);
        if (!max) break;
        if (max.x == dst.x && max.y == dst.y) return max.v;

        q.push(max);
        visited[key(max.x, max.y)] = 1;
    }

    return 'Mission Impossible.';
}

function getMaxNext(q, grid, visited) {
    var o = {
        v: -Infinity
    };
    for (var i = 0; i < q.length; i++) {
        var node = q[i];
        add(o, grid, visited, node.x - 1, node.y, node.v);
        add(o, grid, visited, node.x + 1, node.y, node.v);
        add(o, grid, visited, node.x, node.y - 1, node.v);
        add(o, grid, visited, node.x, node.y + 1, node.v);
    }
    return o.v === -Infinity ? null : o;
}
function add(o, grid, visited, x, y, v) {
    if (valid(grid, visited, x, y) && v + grid[x][y] > o.v) {
        o.x = x;
        o.y = y;
        o.v = v + grid[x][y];
    }
}
function valid(grid, visited, x, y) {
    return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length
        && !visited[key(x, y)]
        && grid[x][y] >= 0;
}
function key(x, y) {
    return x + '#' + y;
}
