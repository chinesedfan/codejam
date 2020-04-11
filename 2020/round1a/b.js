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

var vals = getVals(500);
function solve(n) {
    if (n === 1) return '1 1';

    var path = [{r: 1, k: 1, ns: getNexts(1, 1), p: 0}];
    path.s = 1;

    while (1) {
        var nd = path[path.length - 1];
        if (nd.p >= nd.ns.length || path.some((x, i) => nd.r === x.r && nd.k === x.k && i !== path.length - 1)) {
            path.pop();
            path[path.length - 1].p++;
            continue;
        }

        var next = nd.ns[nd.p];
        var sum = path.s + vals[key(next.r, next.k)];
        if (sum === n) {
            path.push(next);
            return path.map((nd) => key(nd.r, nd.k)).join('\n');
        } else if (sum > n) {
            path.pop();
            path[path.length - 1].p++;
        } else {
            next.ns = getNexts(next.r, next.k);
            next.p = 0;
            path.push(next);
            path.s = sum;
        }
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
function getNexts(r, k) {
    var ns = [];
    add(ns, r - 1, k - 1);
    add(ns, r - 1, k);
    add(ns, r, k - 1);
    add(ns, r, k + 1);
    add(ns, r + 1, k);
    add(ns, r + 1, k + 1);
    return ns;
}
function add(ns, r, k) {
    if (r >= 1 && k >= 1 && r >= k) {
        ns.push({r: r, k: k});
    }
}
function key(r, k) {
    return r + ' ' + k;
}
