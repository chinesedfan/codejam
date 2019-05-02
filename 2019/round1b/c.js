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
        var tokens = lines[l++].split(' ').map((x) => +x);
        console.log('Case #%d: %s', i + 1, solve(tokens[0], tokens[1],
                lines[l++].split(' ').map((x) => +x),
                lines[l++].split(' ').map((x) => +x)));
    }
});

function solve(n, klimit, cs, ds) {
    var root = createTree(ds, 0, ds.length - 1);

    var count = 0;
    for (var i = 0; i < n; i++) {
        var cl = binarySearch(0, i, (x) => x == 0 || cs[i - x] < cs[i]);
        var cr = binarySearch(i, n - 1, (x) => cs[x] <= cs[i]); // if has ties, we can the smallest index, which is i

        // good enough
        var l1 = binarySearch(0, cl, (x) => {
            return cs[i] >= findMax(root, i - x, i) - klimit;
        });
        var r1 = binarySearch(i, cr, (x) => {
            return cs[i] >= findMax(root, i, x) - klimit;
        });
        // too good
        var l2 = binarySearch(0, cl, (x) => {
            return cs[i] > findMax(root, i - x, i) + klimit;
        });
        var r2 = binarySearch(i, cr, (x) => {
            return cs[i] > findMax(root, i, x) + klimit;
        });

        var c1 = (l1 + 1) * (r1 - i + 1);
        var c2 = (l2 + 1) * (r2 - i + 1);
        count += c1 - c2;
    }
    return count;
}

function createTree(ds, l, r) {
    var root = {
        l: l,
        r: r
    };
    if (l < r) {
        var middle = Math.floor((l + r) / 2);
        root.left = createTree(ds, l, middle);
        root.right = createTree(ds, middle + 1, r);

        root.max = Math.max(root.left.max, root.right.max);
    } else {
        root.max = ds[l];
    }
    return root;
}
function findMax(root, l, r) {
    if (l == root.l && r == root.r) return root.max;

    var middle = Math.floor((root.l + root.r) / 2);
    if (r <= middle) {
        return findMax(root.left, l, r);
    } else if (l > middle) {
        return findMax(root.right, l, r);
    } else {
        return Math.max(findMax(root.left, l, middle), findMax(root.right, middle + 1, r));
    }
}

function binarySearch(l, r, fn) { // for any [l, x], fn returns true
    while (l <= r) {
        var middle = Math.floor((l + r) / 2);
        if (fn(middle)) {
            l = middle + 1;
        } else {
            r = middle - 1;
        }
    }
    return r;
}
