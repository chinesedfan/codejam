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
        var tokens = lines[l++].split(' ');
        var r = +tokens[0];
        var c = +tokens[1];
        var grid = lines.slice(l, l + r).map(str => str.split(' ').map(Number))
        console.log('Case #%d: %s', i + 1, solve(r, c, grid));
        l += r;
    }
});

function solve(r, c, grid) {
    let total = 0
    for (let i = 0; i < r; i++) {
        const arr = []
        for (let j = 0; j < c; j++) {
            arr[j] = grid[i][j]
        }
        const cost = update(arr);
        for (let j = 0; j < c; j++) {
            grid[i][j] = arr[j]
        }
        total += cost
    }
    for (let j = 0; j < c; j++) {
        const arr = []
        for (let i = 0; i < r; i++) {
            arr[i] = grid[i][j]
        }
        const cost = update(arr);
        for (let i = 0; i < r; i++) {
            grid[i][j] = arr[i]
        }
        total += cost
    }
    return total
}
function update(arr) { // mutate `arr`
    let cost = 0
    let trend = 0
    function fixPrevious(idx) {
        while (idx && arr[idx] > arr[idx - 1]) {
            const d = arr[idx] - 1 - arr[idx - 1]
            arr[idx - 1] += d
            cost += d
            idx--
        }
    }
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > arr[i - 1]) {
            trend = 1 // inc
        } else if (arr[i] < arr[i - 1]) {
            if (trend > 0) fixPrevious(i - 1)
            trend = -1

            const d = arr[i - 1] - 1 - arr[i]
            arr[i] += d
            cost += d
        }
    }
    if (trend > 0) fixPrevious(arr.length - 1);

    return cost
}
