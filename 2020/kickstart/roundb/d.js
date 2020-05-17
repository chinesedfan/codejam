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

function solve(w, h, l, u, r, d) {
    var lf = [0]; // log2(i!)
    for (var i = 1; i <= w + h - 2; i++) {
        lf[i] = i === 1 ? 0 : lf[i - 1] + Math.log2(i);
    }

    var sum = 0;
    for (var col = 1; col < l; col++) {
        var row = d + l - col;
        if (row < h) {
            sum += cal(row, col, lf);
        } else if (row == h) {
            var prev = 0;
            for (var k = 1; k <= col; k++) {
                var above = cal(h - 1, k, lf);
                prev += above / 2;
            }
            sum += prev;
        }
    }
    for (var row = u - 1; row >= 1; row--) {
        var col = r + u - row;
        if (col < w) {
            sum += cal(row, col, lf);
        } else if (col === w) {
            var prev = 0;
            for (var k = 1; k <= row; k++) {
                var left = cal(k, w - 1, lf);
                prev += left / 2;
            }
            sum += prev;
        } else {
            break;
        }
    }
    return sum;
}

function cal(row, col, lf) {
    var n = row + col - 2;
    var k = row - 1;
    // C(n, k) / 2^n
    return Math.pow(2, lf[n] - lf[k] - lf[n - k] - n);
}
