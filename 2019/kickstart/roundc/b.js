// var fs = require('fs');
// var args = process.argv.slice(2);
// var lines = fs.readFileSync(args[0]).toString().split('\n');

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
    var size = -Infinity;
    for (var bc = 0; bc < grid[0].length; bc++) {
        var m = Array(grid.length);
        for (var ec = bc; ec < grid[0].length; ec++) {
            var noBetter = false;
            for (var i = 0; i < grid.length; i++) {
                m[i] = m[i] || {min: Infinity, max: -Infinity};
                var old = m[i].invalid;
                m[i].min = Math.min(grid[i][ec], m[i].min);
                m[i].max = Math.max(grid[i][ec], m[i].max);
                m[i].invalid = m[i].max - m[i].min > k;
                if (!old && m[i].invalid) {
                    noBetter = true;
                    break;
                }
            }
            if (noBetter) break;

            var mc = 0;
            var c = 0; // how many continues rows
            for (var i = 0; i < grid.length; i++) {
                if (m[i].invalid) {
                    c = 0;
                } else {
                    c++;
                    mc = Math.max(mc, c);
                }
            }
            var nsize = mc * (ec - bc + 1);
            if (nsize > size) size = nsize;
        }
    }
    return size;
}
