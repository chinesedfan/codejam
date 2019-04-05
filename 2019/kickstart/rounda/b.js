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
        var r = +tokens[0];
        var c = +tokens[1];
        console.log('Case #%d: %s', i + 1, solve(r, c, lines.slice(l, l + r)));
        l += r;
    }
});

function solve(row, col, ls) {
    var min = cal(ls);
    for (var i = 0; i < ls.length; i++) {
        for (var j = 0; j < ls[i].length; j++) {
            if (ls[i][j] === '1') continue;

            var cur = cal(ls.map((l, n) => n === i ? l.substr(0, j) + '1' + l.substr(j + 1) : l));
            if (cur < min) min = cur;
        }
    }
    return min;
}

function cal(ls) {
    var t = -Infinity;
    for (var i = 0; i < ls.length; i++) {
        for (var j = 0; j < ls[i].length; j++) {
            if (ls[i][j] === '1') {
                t = Math.max(t, 0);
            } else {
                t = Math.max(t, distance(i, j, ls));
            }
        }
    }
    return t;
}

function distance(row, col, ls) {
    var q = [{r: row, c: col, d: 0}];
    var visited = {};
    while (q.length) {
        var node = q.shift();
        if (visited[key(node)]) continue;
        visited[key(node)] = 1;
        if (ls[node.r][node.c] === '1') return node.d;

        push({r: node.r + 1, c: node.c, d: node.d + 1}, q, visited, ls);
        push({r: node.r - 1, c: node.c, d: node.d + 1}, q, visited, ls);
        push({r: node.r, c: node.c + 1, d: node.d + 1}, q, visited, ls);
        push({r: node.r, c: node.c - 1, d: node.d + 1}, q, visited, ls);
    }
}
function key(node) {
    return node.r + '#' + node.c;
}
function push(node, q, visited, ls) {
    if (node.r < 0 || node.r === ls.length || node.c < 0 || node.c === ls[0].length
        || visited[key(node)]) return;

    q.push(node);
}
