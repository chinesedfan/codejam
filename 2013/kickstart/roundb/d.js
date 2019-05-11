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

    var max = {};
    max[key(src.x, src.y)] = src.v;
    var visited = {};
    visited[key(src.x, src.y)] = 1;

    var q = [src];
    while (1) {
        var nq = []; // next layer
        for (var i = 0; i < q.length; i++) {
            var node = q[i];
            var v = max[key(node.x, node.y)];
            add(nq, grid, visited, node.x - 1, node.y, v);
            add(nq, grid, visited, node.x + 1, node.y, v);
            add(nq, grid, visited, node.x, node.y - 1, v);
            add(nq, grid, visited, node.x, node.y + 1, v);
        }
        if (!nq.length) break;

        q = [];
        var nv = {};
        for (var i = 0; i < nq.length; i++) {
            var node = nq[i];
            var k = key(node.x, node.y);
            max[k] = Math.max(max[k] || -Infinity, node.v);
            visited[k] = 1;

            if (!nv[k]) {
                q.push(node);
                nv[k] = 1;
            }
        }

        var m = max[key(dst.x, dst.y)];
        if (m) return m;
    }

    return 'Mission Impossible.';
}

function add(nq, grid, visited, x, y, v) {
    if (valid(grid, visited, x, y)) {
        nq.push({x: x, y: y, v: v + grid[x][y]});
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
