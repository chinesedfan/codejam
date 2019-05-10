var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var n = +lines[l++];
    console.log('Case #%d: %s', i + 1, solve(lines.slice(l, l + n).map((str) => str.split(''))));
    l += n;
}

function solve(grid) {
    var rs = [];
    var bs = [];
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid.length; j++) {
            if (grid[i][j] == 'R') rs.push({x: i, y: j});
            if (grid[i][j] == 'B') bs.push({x: i, y: j});
        }
    }
    if (Math.abs(rs.length - bs.length) > 1) return 'Impossible';

    var wr;
    wr = win(grid, rs, rs.filter((n) => n.x == 0), 'R', (n) => n.x == grid.length - 1);
    if (wr.connected) {
        if (wr.valid && rs.length >= bs.length) return 'Red wins';
        else return 'Impossible';
    }

    wr = win(grid, bs, bs.filter((n) => n.y == 0), 'B', (n) => n.y == grid.length - 1);
    if (wr.connected) {
        if (wr.valid && bs.length >= rs.length) return 'Blue wins';
        else return 'Impossible';
    }

    return 'Nobody wins';
}

function win(grid, ss, rs, color, fn) {
    var connected = bfs(grid, rs, {}, color, fn);
    if (!connected) return {connected: false};

    var valid = false;
    for (var i = 0; i < ss.length; i++) {
        var node = ss[i];
        grid[node.x][node.y] = '.';
        connected = bfs(grid, rs, {}, color, fn);
        if (!connected) valid = true;
        grid[node.x][node.y] = color;
        if (valid) break;
    }
    return {
        connected: true,
        valid: valid
    };
}

function bfs(grid, q, visited, color, fn) {
    q = q.slice(0);

    while (q.length) {
        var n = q.shift();
        if (grid[n.x][n.y] === '.') continue;
        if (visited[key(n)]) continue;
        visited[key(n)] = 1;
        if (fn(n)) return true;

        add(q, visited, grid, n.x, n.y - 1, color);
        add(q, visited, grid, n.x, n.y + 1, color);
        add(q, visited, grid, n.x - 1, n.y, color);
        add(q, visited, grid, n.x - 1, n.y + 1, color);
        add(q, visited, grid, n.x + 1, n.y, color);
        add(q, visited, grid, n.x + 1, n.y - 1, color);
    }

    return false;
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
