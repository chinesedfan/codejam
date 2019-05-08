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
            rs.push({x: 0, y: i, l: 0});
        }
    }
    var r1 = bfs(grid, rs, {}, 'R', (x) => x.x == grid.length - 1);
    var r2 = bfs(grid, r1, {}, 'R', (x) => x.x == 0, true);
    if (r2.length) {
        if (r2.valid && rn >= bn) return 'Red wins';
        else return 'Impossible';
    }

    var bs = [];
    for (var i = 0; i < grid.length; i++) {
        if (grid[i][0] == 'B') {
            bs.push({x: i, y: 0, l: 0});
        }
    }
    var b1 = bfs(grid, bs, {}, 'B', (x) => x.y == grid.length - 1);
    var b2 = bfs(grid, b1, {}, 'B', (x) => x.y == 0, true);
    if (b2.length) {
        if (b2.valid && bn >= rn) return 'Blue wins';
        else return 'Impossible';
    }

    return 'Nobody wins';
}

function bfs(grid, q, visited, color, fn, twice) {
    q = q.slice(0);

    var c = [];
    var m = {}; // l -> c
    var l = Infinity;
    while (q.length) {
        var n = q.shift();
        if (visited[key(n)]) continue;
        visited[key(n)] = 1;
        m[n.l] = (m[n.l] || 0) + 1;
        if (fn(n)) {
            c.push({x: n.x, y: n.y, l: 0}); // clean l for reuse
            l = Math.min(l, n.l);
        }

        add(q, visited, grid, n.x, n.y - 1, n.l + 1, color);
        add(q, visited, grid, n.x, n.y + 1, n.l + 1, color);
        add(q, visited, grid, n.x - 1, n.y, n.l + 1, color);
        add(q, visited, grid, n.x - 1, n.y + 1, n.l + 1, color);
        add(q, visited, grid, n.x + 1, n.y, n.l + 1, color);
        add(q, visited, grid, n.x + 1, n.y - 1, n.l + 1, color);
    }

    if (twice) {
        var flag = false;
        for (var k in m) {
            if (+k > l) continue; // ingore if connected
            if (m[k] == 1) {
                flag = true;
                break;
            }
        }
        c.valid = flag;
    }

    return c;
}
function add(q, visited, grid, x, y, l, color) {
    var n = {x: x, y: y, l: l};
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
