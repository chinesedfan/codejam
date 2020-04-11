var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var lines = [];
rl.on('line', function (input) {
    lines.push(input);
});
rl.on('close', function () {
    var t = parseInt(lines[0]);
    var l = 1;
    for (var i = 0; i < t; i++) {
        var n = +lines[l++];
        console.log('Case #%d:\n%s', i + 1, solve(n));
    }
});

function solve(n) {
    var fp = [{r: 1, k: 1}];
    fp.s = 1;

    var q = [fp];
    var visited = {}; // key -> v
    var vals = getVals(1000);
    var add = addFn.bind(this, q, visited, vals, n);
    while (q.length) {
        var path = q.shift();
        if (path.s === n) {
            return path.map((nd) => key(nd.r, nd.k)).join('\n');
        }

        var nd = path[path.length - 1];
        add(path, nd.r - 1, nd.k - 1);
        add(path, nd.r - 1, nd.k);
        add(path, nd.r, nd.k - 1);
        add(path, nd.r, nd.k + 1);
        add(path, nd.r + 1, nd.k);
        add(path, nd.r + 1, nd.k + 1);
    }

    // impossible
}

function getVals(n) {
    var ret = {};
    for (var r = 1; r <= n; r++) {
        for (var k = 1; k <= r; k++) {
            if (k === 1 || k === r) {
                ret[key(r, k)] = 1;
            } else {
                ret[key(r, k)] = ret[key(r - 1, k - 1)] + ret[key(r - 1, k)]
            }
        }
    }
    return ret;
}
function key(r, k) {
    return r + ' ' + k;
}
function addFn(q, visited, vals, n, /**/ path, r, k) {
    if (r >= 1 && k >= 1 && r >= k) {
        var visited = path.some((nd) => nd.r === r && nd.k === k);
        if (visited) return;

        var v = vals[key(r, k)];
        if (path.s + v > n) return;

        var np = path.slice();
        np.push({r: r, k: k});
        np.s = path.s + v;

        q.push(np);
    }
}
