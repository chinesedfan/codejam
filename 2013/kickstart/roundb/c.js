var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var n = +lines[l++];
    console.log('Case #%d: %s', i + 1, solve(lines.slice(l, l + n)));
    l += n;
}

function solve(grid) {
    var rn = 0;
    var bn = 0;
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid.length; j++) {
            if (grid[i][j] == 'R') rn++;
            if (grid[i][j] == 'B') bn++;
        }
    }
    if (Math.abs(rn - bn) > 1) return 'Impossible';

    var rs = [];
    for (var i = 0; i < grid.length; i++) {
        if (grid[0][i] == 'R') {
            var n = {x: 0, y: i};
            rs.push(n);
        }
    }
    var r1 = bfs(grid, rs, {}, 'R', (x) => x.x == grid.length - 1);
    var r2 = bfs(grid, r1, {}, 'R', (x) => x.x == 0, true, 0);
    if (r2.length) {
        if (rn >= bn) return 'Red wins';
        else return 'Impossible';
    }

    var bs = [];
    for (var i = 0; i < grid.length; i++) {
        if (grid[i][0] == 'B') {
            var n = {x: i, y: 0};
            bs.push(n);
        }
    }
    var b1 = bfs(grid, bs, {}, 'B', (x) => x.y == grid.length - 1);
    var b2 = bfs(grid, b1, {}, 'B', (x) => x.y == 0, true, 1);
    if (b2.length) {
        if (bn >= rn) return 'Blue wins';
        else return 'Impossible';
    }

    return 'Nobody wins';
}

function bfs(grid, q, visited, color, fn, twice, groupbyindex) {
    q = q.slice(0);

    var c = [];
    while (q.length) {
        var n = q.shift();
        if (visited[key(n)]) continue;
        visited[key(n)] = 1;
        if (fn(n)) c.push(n);

        add(q, visited, grid, n.x, n.y - 1, color);
        add(q, visited, grid, n.x, n.y + 1, color);
        add(q, visited, grid, n.x - 1, n.y, color);
        add(q, visited, grid, n.x - 1, n.y + 1, color);
        add(q, visited, grid, n.x + 1, n.y, color);
        add(q, visited, grid, n.x + 1, n.y - 1, color);
    }

    if (twice) {
        var m = {};
        for (var str in visited) {
            var fs = str.split('#');
            var k = fs[groupbyindex];
            var v = fs[groupbyindex ? 0 : 1];
            m[k] = m[k] || [];
            m[k].push(v);
        }
        var flag = false;
        for (var k in m) {
            if (m[k].length == 1) {
                flag = true;
                break;
            }
        }
        if (!flag) c = [];
    }

    return c;
}
function add(q, visited, grid, x, y, color) {
    var n = {x: x, y: y};
    if (x >= 0 && x < grid.length
        && y >= 0 && y < grid.length
        && !visited[key(n)]
        && grid[x][y] == color) {
        q.push(n);
    }
}
function key(n) {
    return n.x + '#' + n.y;
}
