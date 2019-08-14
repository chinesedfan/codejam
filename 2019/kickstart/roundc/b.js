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
    // var cminRMQs = cols.map((col) => prepareRMQ(col, Math.min));
    // var cmaxRMQs = cols.map((col) => prepareRMQ(col, Math.max));

    // var h = [];
    // for (var i = 0; i < grid.length; i++) {
    //     h[i] = [];
    //     for (var j = 0; j < grid[0].length; j++) {
    //         h[i][j] = binarySearch(0, i, (x) => valid(cmaxRMQs[j], cminRMQs[j], i - x, i, k)) + 1;
    //     }
    // }

    var d = [];
    for (var i = 0; i < grid.length; i++) {
        d[i] = [];
        for (var j = 0; j < grid[0].length; j++) {
            d[i][j] = binarySearch(0, grid[0].length - 1 - j, (x) => valid(rmaxRMQs[i], rminRMQs[i], j, j + x, k));
            // var nsize = h[i][j] * (dl + dr);
            // if (nsize > size) size = nsize;
        }
    }

    var size = -Infinity;
    for (var j = 0; j <= grid[0].length; j++) {
        var stack = [];
        for (var i = 0; i <= grid.length; i++) {
            var cur = i < grid.length ? d[i][j] : -1; // append for all asc

            while (stack.length) {
                var top = stack[stack.length - 1];
                if (cur < d[top][j]) {
                    stack.pop();

                    var nsize = (d[top][j] + 1) * (stack.length ? i - stack[stack.length - 1] - 1 : i);
                    if (nsize > size) {
                        // console.log(top, j, nsize)
                        size = nsize;
                    }
                } else {
                    break;
                }
            }
            stack.push(i);
        }
    }

    return size;
}

function prepareRMQ(ds, fn) {
    var def = fn === Math.max ? -Infinity : Infinity;
    var ret = [];

    var p = 0;
    var step = 1;
    while (step <= ds.length) {
        ret.push([]);

        for (var i = 0; i < ds.length; i++) {
            if (p == 0) {
                ret[p][i] = ds[i];
            } else {
                ret[p][i] = fn(ret[p - 1][i], i + step / 2 < ds.length ? ret[p - 1][i + step / 2] : def);
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

function valid(maxSt, minSt, l, r, k) {
    return find(maxSt, l, r, Math.max) - find(minSt, l, r, Math.min) <= k;
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
