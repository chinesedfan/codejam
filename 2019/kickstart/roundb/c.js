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
        var n = +tokens[0];
        var s = +tokens[1];
        console.log('Case #%d: %s', i + 1, solve(n, s, lines[l++].split(' ').map((x) => +x)));
    }
});

function solve(n, s, ts) {
    var count = {};
    var init = [];
    ts.forEach((t, i) => {
        count[t] = count[t] || [];
        count[t].push(i);

        if (count[t].length <= s) {
            init[i] = 1;
        } else if (count[t].length == s + 1) {
            init[i] = -s;
        } else {
            init[i] = 0;
        }
    });
    var mx = -Infinity;
    var root = createTree(init, 0, ts.length - 1);
    mx = Math.max(mx, root.max);

    for (var i = 1; i < ts.length; i++) {
        // change left from i - 1 to i
        updateTree(root, i - 1, 0);

        var t = ts[i - 1];
        if (count[t].length > s) {
            updateTree(root, count[t][s], 1);
        }
        if (count[t].length > s + 1) {
            updateTree(root, count[t][s + 1], -s);
        }
        count[t].shift();

        mx = Math.max(mx, root.max);
    }

    return mx;
}

function createTree(init, l, r) {
    var root = {
        l: l,
        r: r,
        sum: 0, // sum of this segment
        max: -Infinity
    };
    if (r > l) {
        var len = Math.ceil((r - l + 1) / 2);
        root.left = createTree(init, l, l + len - 1);
        root.right = createTree(init, l + len, r);
        merge(root);
    } else {
        root.sum = init[l];
        root.max = root.sum;
    }
    return root;
}
function merge(p) {
    var c1 = p.left;
    var c2 = p.right;

    p.sum = c1.sum + c2.sum;
    p.max = Math.max(c1.max, c1.sum + c2.max);
}
function updateTree(root, index, value) {
    if (index < root.l || index > root.r) return;

    if (root.r > root.l) {
        updateTree(root.left, index, value);
        updateTree(root.right, index, value);
        merge(root);
    } else {
        root.sum = value;
        root.max = value;
    }
}
