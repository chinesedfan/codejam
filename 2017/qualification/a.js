var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var tokens = lines[l++].split(' ');
    console.log('Case #%d: %s', i + 1, solve(tokens[0], parseInt(tokens[1])));
}

function solve(str, k) {
    var i = 0;
    var count = 0;
    var flipped;
    while (i + k <= str.length) {
        if (str[i] === '-') {
            count++;
            flipped = _.map(str.substr(i, k), (c) => {
                return c === '+' ? '-' : '+';
            }).join('');
            str = str.substr(0, i) + flipped + str.substr(i + k);
        }
        i++;
    }

    var ok = _.every(str.substr(i), (c) => {
        return c === '+';
    });

    return ok ? count : 'IMPOSSIBLE';
}
