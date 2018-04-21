var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var t;
var c;
var a;

var candidates;
var index;
var grid;

rl.on('line', function(input) {
    if (typeof t === 'undefined') {
        t = parseInt(input);
        c = 0;
        return;
    } else if (typeof a === 'undefined') {
        c++;
        a = parseInt(input);
        // always try to make 3 * 3 * x
        var x = Math.ceil(a / 3 / 3);
        grid = Array(3 + 1).fill(0).map(function() { return Array(3 * x + 1); });
        index = 0;
        // centers are [2, 2 + 3 * i], where i = 0 ~ x - 1
        candidates = [];
        for (var i = 0; i < x; i++) {
            candidates.push([2, 2 + 3 * i]);
        }
        var center = candidates[index];
        console.log(center[0], center[1]);
        return;
    } else {
        // update
        var real = input.split(' ').map(function(x) { return parseInt(x); });
        if (real[0] == 0 && real[1] == 0) {
            // done
            a = undefined;
            if (c == t) process.exit();
            return;
        }
        grid[real[0]][real[1]] = 1;
        // console.log('set', real);

        // find next
        for (var i = index; i < candidates.length; i++) {
            var center = candidates[index];
            if (!isFull(center[0] - 1, center[1] - 1)) {
                // console.log('check', grid);
                console.log(center[0], center[1]);
                break;
            } else {
                index++;
            }
        }
    }
});

function isFull(x, y) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (!grid[x + i][y + j]) {
                // console.log('fail', x + i, y + j);
                return false;
            }
        }
    }
    return true;
}
