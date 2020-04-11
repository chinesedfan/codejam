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

    var rm = Array(row).fill(0).map(() => Array(col).fill(false));
    var sum = total;
    while (1) {
        var el = [];
        var dec = 0;
        for (var r = 0; r < row; r++) {
            for (var c = 0; c < col; c++) {
                if (rm[r][c]) continue;

                var ns = getNs(grid, rm, r, c);
                var keep = !ns.count || (grid[r][c] >= ns.sum / ns.count);
                // console.log(r, c, grid[r][c], ns.sum / ns.count)
                if (!keep) {
                    el.push({r: r, c: c});
                    dec += grid[r][c];
                }
            }
        }
// console.log(el.length)
        if (!el.length) break;
        el.forEach((item) => rm[item.r][item.c] = 1);
        total -= dec;
        sum += total;
    }
    return sum;
}

function getNs(grid, rm, r, c) {
    var ret = {sum: 0, count: 0};
    check(grid, rm, ret, r, c, -1, 0);
    check(grid, rm, ret, r, c, 0, -1);
    check(grid, rm, ret, r, c, 0, 1);
    check(grid, rm, ret, r, c, 1, 0);
    return ret;
}
function check(grid, rm, ret, r, c, ir, ic) {
    r += ir;
    c += ic;
    while (r >= 0 && r < grid.length
        && c >= 0 && c < grid[0].length) {
        if (rm[r][c]) {
            r += ir;
            c += ic;
        } else {
            ret.sum += grid[r][c];
            ret.count++;
            break;
        }
    }
}
