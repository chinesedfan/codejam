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
        var args = lines[l++].split(' ').map((x) => +x);
        var cs = [];
        for (var j = 0; j < args[5]; j++) {
            cs.push(
                lines[l++].split(' ').map((x) => +x)
            );
        }
        args.push(cs);
        console.log('Case #%d: %s', i + 1, solve(...args));
    }
});

function solve(s, ra, pa, rb, pb, c, cs) {
    var grid = [];
    for (var i = 0; i <= s; i++) {
        grid[i] = [];
        for (var j = 0; j <= s; j++) {
            grid[i][j] = 0; // 0, 1, 2; -1 means c
        }
    }
    grid[ra][pa] = 1;
    grid[rb][pb] = 2;
    cs.forEach(([r, p]) => {
        grid[r][p] = -1;
    });
    //
    grid.ca = 1;
    grid.cb = 1;
    grid.pa = [ra, pa];
    grid.pb = [rb, pb];

    return findMax(grid);
}

function findMax(grid) {
    return findNext(grid, true);
}
function findMin(grid) {
    return findNext(grid, false);
}
function findNext(grid, isA, isAlone) {
    var s = grid.length - 1;
    var moves = isA ? getAdj(grid, s, grid.pa[0], grid.pa[1]) : getAdj(grid, s, grid.pb[0], grid.pb[1]);
    if (!moves.length) {
        if (isAlone) return grid.ca - grid.cb;
        return isA ? findNext(grid, false, true) : findNext(grid, true, true);
    }

    if (isA) {
        return Math.max.apply(
            Math,
            moves.map(([nr, np]) => {
                var ng = getGrid(grid, nr, np, true);
                return findMin(ng);
            })
        );
    } else {
        return Math.min.apply(
            Math,
            moves.map(([nr, np]) => {
                var ng = getGrid(grid, nr, np, false);
                return findMax(ng);
            })
        );
    }
}

function getGrid(grid, r, p, isA) {
    const {ca, cb, pa, pb} = grid;
    grid = grid.map(arr => arr.slice());
    if (isA) {
        grid[r][p] = 1;
        grid.ca = ca + 1;
        grid.cb = cb;
        grid.pa = [r, p];
        grid.pb = pb;
    } else {
        grid[r][p] = 2;
        grid.ca = ca;
        grid.cb = cb + 1;
        grid.pa = pa;
        grid.pb = [r, p];
    }
    return grid;
}

function getAdj(grid, s, r, p) {
    var ret = [];
    add(ret, grid, s, r, p - 1);
    add(ret, grid, s, r, p + 1);
    if (p & 1) {
        add(ret, grid, s, r + 1, p + 1);
    } else {
        add(ret, grid, s, r - 1, p - 1);
    }
    return ret;
}
function add(ret, grid, s, r, p) {
    if (r >= 1 && r <= s
        && p >= 1 && p <= (2 * r - 1)
        && !grid[r][p]) ret.push([r, p]);
}
