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
    var ds = cal(ls);
    // binary search
    var min = 0;
    var max = ls.length + ls[0].length;
    while (max - min > 0) {
        var middle = Math.floor((min + max) / 2);
        if (check(ds, middle)) {
            if (max - min === 1) break;
            max = middle;
        } else {
            if (max - min === 1) { min = max; break; }
            min = middle;
        }
    }
    return min;
}

function check(ds, k) {
    var mins = Infinity;  // min x + y
    var maxs = -Infinity; // max x + y
    var minm = Infinity;  // min x - y
    var maxm = -Infinity; // max x - y
    for (var d in ds) {
        if (+d > k) {
            ds[d].forEach((node) => {
                var s = node.r + node.c;
                var m = node.r - node.c;
                if (s > maxs) maxs = s;
                if (s < mins) mins = s;
                if (m > maxm) maxm = m;
                if (m < minm) minm = m;
            });
        }
    }

    if (mins === Infinity) return true;

    // add the new office in the center
    var x = Math.max(maxs - mins, maxm - minm);
    if (maxs - mins == maxm - minm
        && (((maxs + mins + maxm + minm) / 2) & 1)) {
        return Math.ceil((x + 1) / 2) <= k;
    }
    return Math.ceil(x / 2) <= k;
}
function cal(ls) {
    var ds = {}; // d -> [{r, c}]
    ds[0] = [];
    for (var i = 0; i < ls.length; i++) {
        for (var j = 0; j < ls[i].length; j++) {
            if (ls[i][j] === '1') {
                ds[0].push({r: i, c: j, d: 0});
            }
        }
    }

    distance(ds, ls);
    return ds;
}

function distance(ds, ls) {
    var q = ds[0];
    var visited = {};
    while (q.length) {
        var node = q.shift();
        if (visited[key(node)]) continue;
        visited[key(node)] = 1;
        if (node.d) {
            ds[node.d] = ds[node.d] || [];
            ds[node.d].push(node);
        }

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
