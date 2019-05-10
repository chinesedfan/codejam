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
    var src = {x: points[0], y: points[1], l: 0, v: 0};
    src.v = grid[src.x][src.y];
    var dst = {x: points[2], y: points[3]};

    var step = bfs(src, dst, grid, 10000);
    if (step == Infinity) return 'Mission Impossible.';

    return bfs(src, dst, grid, step, true);
}

function bfs(src, dst, grid, limit, returnPower) {
    var visited = {};
    var q = [src];
    var step = Infinity;
    var power = -Infinity;
    while (q.length) {
        var node = q.shift();
        if (node.l > limit) continue;
        var key = node.x + '#' + node.y;

        if (returnPower) {
            if (visited[key] && node.v <= visited[key]) continue;
            visited[key] = node.v;
            if (node.x == dst.x && node.y == dst.y) {
                power = Math.max(power, node.v);
                continue;
            }
        } else {
            if (visited[key]) continue;
            visited[key] = 1;
            if (node.x == dst.x && node.y == dst.y) {
                step = node.l;
                break;
            }
        }

        add(q, grid, node.x - 1, node.y, node.l, node.v);
        add(q, grid, node.x + 1, node.y, node.l, node.v);
        add(q, grid, node.x, node.y - 1, node.l, node.v);
        add(q, grid, node.x, node.y + 1, node.l, node.v);
    }

    if (returnPower) {
        return power;
    } else {
        return step;
    }
}
function add(q, grid, x, y, l, v) {
    if (valid(grid, x, y)) {
        q.push({x: x, y: y, l: l + 1, v: v + grid[x][y]});
    }
}
function valid(grid, x, y) {
    return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length && grid[x][y] >= 0;
}
