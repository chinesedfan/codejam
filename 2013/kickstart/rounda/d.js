var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var n = +lines[l++];
    console.log('Case #%d: %s', i + 1, solve(n, lines.slice(l, l + n),
            lines[l + n].split(' ').map((x) => +x)));
    l += n + 1;
}

function solve(n, grid, xys) {
    var node = {x: xys[0], y: xys[1]};
    var dir = getStartDir(node.x, node.y);
    var path = [];
    var ok = false;
    var visited = {};
    while (path.length < 10000) {
        var key = node.x + '#' + node.y + '#' + dir;
        if (visited[key]) break;
        visited[key] = 1;
        if (node.x == xys[2] && node.y == xys[3]) {
            ok = true;
            break;
        }

        // prepare for next
        var x = 4;
        while (x--) {
            var next = getNextNode(node, dir);
            if (valid(n, grid, next.x, next.y)) {
                path.push(dir);
                node = next;
                dir = getNextDir(dir, -1);
        // console.log('good', next, dir, n)
                break;
            }
        // console.log('bad', next, dir, n)
            dir = getNextDir(dir, 1);
        }
        if (x < 0) break;
    }

    if (!ok) return 'Edison ran out of energy.';

    return path.length + '\n' + path.join('');
}

function getStartDir(x, y) {
    if (x == 1 && y == 1) return 'E';
    if (x == 1) return 'S';
    if (y == 1) return 'W';
    return 'N';
}
function getNextNode(node, dir) {
    var x = node.x;
    var y = node.y;
    switch (dir) {
    case 'N': x--; break;
    case 'E': y++; break;
    case 'W': y--; break;
    case 'S': x++; break;
    }
    return {x: x, y: y};
}
function getNextDir(dir, d) {
    var s = 'ESWN';
    var i = s.indexOf(dir);
    i = (i + d + s.length) % s.length;
    return s[i];
}
function valid(n, grid, x, y) {
    return x > 0 && x <= n && y > 0 && y <= n && grid[x - 1][y - 1] === '.';
}
