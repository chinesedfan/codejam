var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var i = 1;
var l = 1;
while (i <= t && l < lines.length) {
    var token = lines[l++].split(' ');
    var row = parseInt(token[0]);
    var grid = [];
    while (row--) {
        grid.push(lines[l++].split(''));
    }
    console.log('Case #%d:\n%s', i++, solve(grid));
}

function solve(grid) {
    var emptyFirstRow = false;

    _.each(grid, (r, i) => {
        var first = _.findIndex(r, (c) => c !== '?');
        if (first < 0) {
            // the same with previous
            if (!i) {
                emptyFirstRow = true;
            } else {
                grid[i] = grid[i - 1];
            }
        } else {
            var cur = grid[i][first];
            _.each(r, (c, j) => {
                if (c === '?') {
                    grid[i][j] = cur;
                } else {
                    cur = grid[i][j];
                }
            });
        }
    });

    if (emptyFirstRow) {
        grid[0] = grid[1]; // make sure by the input
    }

    return _.map(grid, (r) => r.join('')).join('\n');
}
