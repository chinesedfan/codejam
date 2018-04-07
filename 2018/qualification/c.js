var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var t;
var c;
var a;

var candidates = [
    [2, 2], [2, 3], [2, 4],
    [3, 2], [3, 3], [3, 4]
];
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
        // FIXME: ingore `a`, always try to make 4 * 5
        grid = Array(4 + 1).fill(0).map(function() { return Array(5 + 1); });
        index = 0;

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
