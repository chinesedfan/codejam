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
        console.log('Case #%d: %s', i + 1, solve(...lines[l++].split(' ').map((x) => +x)));
    }
});

function solve(n, a, b, c) {
    // console.log(n, a, b, c)
    const common = a + b - n;
    if (common > c || (a == 1 && b == 1 && n > 1)) {
        return 'IMPOSSIBLE';
    }

    const hs = Array(n).fill(1);
    const left = rangeWithEnd(n - 1, a - c);
    const right = rangeWithEnd(n - 1, b - c).reverse();
    fill(hs, left, 0);
    fill(hs, right, n - (b - c));

    const all = Array(c).fill(n);
    fill(hs, all, a - c);

    if (n > 2 && (!right.length || right[0] == 1)) {
        hs[a - 1] = 1;
        hs[n - (b - c)] = n;
    }

    // check(hs, a, b, c);
    return hs.join(' ');
}

function rangeWithEnd(end, length) {
    const start = end - length + 1;
    return range(start, end);
}
function range(start, end) {
    var ret = [];
    for (var i = start; i <= end; i++) {
        ret.push(i);
    }
    return ret;
}
function fill(a, b, p) {
    for (var i = 0; i < b.length; i++) {
        a[p + i] = b[i];
    }
}

function check(arr, ra, rb, rc) {
    var m1 = -Infinity, m2 = -Infinity;
    var s1 = {}, s2 = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= m1) {
            s1[i] = 1;
            m1 = arr[i];
        }
        const j = arr.length - 1 - i;
        if (arr[j] >= m2) {
            s2[j] = 1;
            m2 = arr[j];
        }
    }

    var a = 0, b = 0, c = 0;
    for (let i = 0; i < arr.length; i++) {
        if (s1[i]) a++;
        if (s2[i]) b++;
        if (s1[i] && s2[i]) c++;
    }
    if (a != ra || b != rb || c != rc) {
        console.log('expected:', ra, rb, rc, 'got:', a, b, c, arr)
    }
}
