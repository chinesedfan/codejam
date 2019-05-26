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
        console.log('Case #%d: %s', i + 1, solve(tokens[0], tokens[1], tokens[2],
            lines.slice(l, l + tokens[0]).map((str) => str.split(' ').map((x) => +x))
        ));
        l = l + tokens[0];
    }
});

function solve(r, c, k, grid) {
    // var cols = [];
    // for (var i = 0; i < grid[0].length; i++) {
    //     cols[i] = [];
    //     for (var j = 0; j < grid.length; j++) {
    //         cols[i].push(grid[j][i]);
    //     }
    // }

    var rminRMQs = grid.map((row) => prepareRMQ(row, Math.min));
    var rmaxRMQs = grid.map((row) => prepareRMQ(row, Math.max));
    // var cminRMQs = grid.map((col) => prepareRMQ(col, Math.min));
    // var cmaxRMQs = grid.map((col) => prepareRMQ(col, Math.max));

    // var m = [];

    var size = -Infinity;
    for (var bc = 0; bc < grid[0].length; bc++) {
        for (var ec = bc; ec < grid[0].length; ec++) {
            var mc = 0;
            var c = 0; // how many continues rows
            for (var i = 0; i < grid.length; i++) {
                if (find(rmaxRMQs[i], bc, ec, Math.max) - find(rminRMQs[i], bc, ec, Math.min) > k) {
                    c = 0;
                } else {
                    c++;
                    mc = Math.max(mc, c);
                }
            }
            // console.log(bc, ec, mc)
            var nsize = mc * (ec - bc + 1);
            if (nsize > size) size = nsize;
        }
    }
    return size;
}

function prepareRMQ(ds, fn) {
    var ret = [];

    var p = 0;
    var step = 1;
    while (step <= ds.length) {
        ret.push([]);

        for (var i = 0; i < ds.length; i++) {
            if (p == 0) {
                ret[p][i] = ds[i];
            } else {
                ret[p][i] = fn(ret[p - 1][i], i + step / 2 < ds.length ? ret[p - 1][i + step / 2] : -Infinity);
            }
        }

        p++;
        step <<= 1;
    }

    return ret;
}
function find(m, l, r, fn) {
    var p = 0;
    var step = 1;
    while (step * 2 <= r - l) {
        p++;
        step <<= 1;
    }
    return fn(m[p][l], m[p][r - step + 1]);
}
