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
    var mcache = prepare(ds);
    // binary search
    var min = 0;
    var max = ls.length + ls[0].length;
    while (max - min > 0) {
        var middle = Math.floor((min + max) / 2);
        if (check(ds, mcache, middle)) {
            if (max - min === 1) break;
            max = middle;
        } else {
            if (max - min === 1) { min = max; break; }
            min = middle;
        }
    }
    return min;
}

function prepare(ds) {
    var mins = Infinity;  // min x + y
    var maxs = -Infinity; // max x + y
    var minm = Infinity;  // min x - y
    var maxm = -Infinity; // max x - y
    var ret = {}; // d -> {mins, maxs, minm, maxm}
    Object.keys(ds)
        .map((x) => +x)
        .sort((a, b) => b - a)
        .map((d) => {
            ret[d] = {mins: mins, maxs: maxs, minm: minm, maxm: maxm};
            ds[d].forEach((node) => {
                var s = node.r + node.c;
                var m = node.r - node.c;
                if (s > maxs) maxs = s;
                if (s < mins) mins = s;
                if (m > maxm) maxm = m;
                if (m < minm) minm = m;
            });
        });
    return ret;
}

function check(ds, mcache, k) {
    if (!mcache[k]) return true;

    var mins = mcache[k].mins;
    var maxs = mcache[k].maxs;
    var minm = mcache[k].minm;
    var maxm = mcache[k].maxm;
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
    var nq = [];
    var visited = {};
    var d = 0;
    while (1) {
        for (var i = 0; i < q.length; i++) {
            var node = q[i];
            if (visited[key(node)]) continue;
            visited[key(node)] = 1;
            if (d) {
                ds[d].push(node);
            }

            push({r: node.r + 1, c: node.c}, nq, visited, ls);
            push({r: node.r - 1, c: node.c}, nq, visited, ls);
            push({r: node.r, c: node.c + 1}, nq, visited, ls);
            push({r: node.r, c: node.c - 1}, nq, visited, ls);
        }

        if (!nq.length) break;
        d++;
        ds[d] = [];
        q = nq;
        nq = [];
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
