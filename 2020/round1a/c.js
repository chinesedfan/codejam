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
        var row = +tokens[0];
        var col = +tokens[1];
        console.log('Case #%d: %s', i + 1, solve(row, col, lines.slice(l, l + row).map((str) => str.split(' ').map((x) => +x))));
        l += row;
    }
});

function solve(row, col, grid) {
    var total = 0;
    for (var r = 0; r < row; r++) {
        for (var c = 0; c < col; c++) {
            total += grid[r][c];
        }
    }
    var sum = total;

    var state = Array(row).fill(0).map(
        (row, r) => Array(col).fill(0).map(
            (col, c) => ({rm: false, l: c - 1, r: c + 1, t: r - 1, b: r + 1})
        )
    );
    var el = [];
    var dec = 0;
    var calc = (r, c) => {
        if (!valid(grid, r, c) || state[r][c].rm) return;

        var ns = getNs(grid, state, r, c);
        var keep = !ns.count || (grid[r][c] >= ns.sum / ns.count);
        if (!keep) {
            el.push({r: r, c: c});
            dec += grid[r][c];
        }
    }
    var update = () => {
        if (!el.length) return;
        
        el.forEach((item) => state[item.r][item.c].rm = 1);
        total -= dec;
        sum += total;
    }

    for (var r = 0; r < row; r++) {
        for (var c = 0; c < col; c++) {
            calc(r, c);
        }
    }
    update();

    while (1) {
        if (!el.length) break;

        var pel = el;
        el = [];
        dec = 0;
        pel.forEach((item) => {
            var s = state[item.r][item.c];
            calc(item.r, s.l);
            calc(item.r, s.r);
            calc(s.t, item.c);
            calc(s.b, item.c);
        });
        update();
    }
    return sum;
}

function getNs(grid, state, r, c) {
    var item = state[r][c];
    var ret = {sum: 0, count: 0};
    check(grid, state, item, ret, r, item.l, 0, -1);
    check(grid, state, item, ret, r, item.r, 0, 1);
    check(grid, state, item, ret, item.t, c, -1, 0);
    check(grid, state, item, ret, item.b, c, 1, 0);
    return ret;
}
function valid(grid, r, c) {
    return r >= 0 && r < grid.length
        && c >= 0 && c < grid[0].length;
}
function check(grid, state, item, ret, r, c, ir, ic) {
    while (valid(grid, r, c)) {
        if (state[r][c].rm) {
            r += ir;
            c += ic;
        } else {
            if (ir) item.r = r;
            if (ic) item.c = c;
            ret.sum += grid[r][c];
            ret.count++;
            break;
        }
    }
}
