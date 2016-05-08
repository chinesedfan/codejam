var fs = require('fs');
var _ = require('lodash');
var BigInteger = require('biginteger').BigInteger;

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    console.log('Case #%d: %s', i + 1, solve.apply(this, lines[l++].split(' ')));
}

function solve(b, m) {
    b = parseInt(b);
    m = BigInteger(m);
    if (m.compare(BigInteger(2).pow(b - 2)) > 0) return 'IMPOSSIBLE';

    var grid = [];
    for (var i = 0; i < b; i++) {
        grid[i] = [];
        for (var j = 0; j < b; j++) {
            grid[i].push('0');
        }
    }

    var pow = 0;
    while (m.isPositive()) {
        if (m.isOdd()) {
            grid[pow + 1][b - 1] = '1';
        }
        m = m.divide(2);
        pow++;
    }

    for (var i = 0; i <= pow; i++) {
        for (var j = 0; j <= pow; j++) {
            if (i >= j) continue;
            grid[i][j] = '1';
        }
    }
    grid[b - 1][b - 1] = '0';
    return 'POSSIBLE' + '\n' + _.map(grid, function(row) { return row.join(''); }).join('\n');
}
