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
        var tokens = lines[l++].split(' ');
        console.log('Case #%d: %s', i + 1, solve(+tokens[0], +tokens[1]));
    }
});

function solve(n, k) {
    var grid = Array(n).fill(0)
        .map((x) => Array(n).fill(0));
    var mask = Array(n).fill(0)
        .map((x) => Array(n).fill(0).map(x => [0, 0]));
    
    var d = Math.floor(k / n);
    var r = k % n;
    for (var i = 0; i < n; i++) {
        grid[i][i] = i < r ? d + 1 : d;
        setMask(grid, mask, i, i);
    }
    
    var p = {r: 0, c: 0};
    var q = [];
    while (p.r < n && p.c < n) {
        // console.log(p.r, p.c)
        // console.log(grid.map((row) => row.join(' ')).join('\n'))
        // console.log('\n');

        if (grid[p.r][p.c]) {
            next(n, p);
        } else {
            var bits = mask[p.r][p.c];
            var found = false;
            for (var i = ('val' in p ? p.val + 1 : 0); i < n; i++) {
                var pos = i < 32 ? 0 : 1;
                var offset = i < 32 ? i : i - 32;
                if (!(bits[pos] & (1 << offset))) {
                    var state = {
                        grid: clone(grid),
                        mask: clone(mask, true),
                        r: p.r,
                        c: p.c,
                        val: i,
                    };
                    q.push(state);

                    found = true;

                    grid[p.r][p.c] = i + 1;
                    setMask(grid, mask, p.r, p.c);
                    next(n, p);
                    break;
                }
            }
            if (!found) {
                if (!q.length) break;

                var state = q.pop();
                grid = state.grid;
                mask = state.mask;
                p.r = state.r;
                p.c = state.c;
                p.val = state.val;
            }
        }
    }

    if (p.r === n) {
        return 'POSSIBLE\n' + grid.map((row) => row.join(' ')).join('\n');
    }

    return 'IMPOSSIBLE';
}

function next(n, p) {
    p.c++;
    if (p.c === n) {
        p.c = 0;
        p.r++;
    }
    delete p.val;
}
function prev(n, p) {
    p.c--;
    if (p.c < 0) {
        p.c = 0;
        p.r--;
    }
}
function clone(grid, eleIsArray) {
    return grid.map((row) =>
        eleIsArray ? row.map((x) => x.slice()) : row.slice()
    );
}
function setMask(grid, mask, r, c) {
    var x = grid[r][c] - 1;
    var n = mask.length;
    for (var i = 0; i < n; i++) {
        var pos = x < 32 ? 0 : 1;
        var offset = x < 32 ? x : x - 32;
        mask[r][i][pos] |= 1 << offset;
        mask[i][c][pos] |= 1 << offset;
    }
}
