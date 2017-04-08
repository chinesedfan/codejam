var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    console.log('Case #%d: %s', i + 1, solve(lines[l++]));
}

function solve(line) {
    if (line.length == 1) return line;

    var flag = false;
    var result = [];
    for (var i = line.length - 1; i >= 0; i--) {
        var c1 = line[i];
        if (!result.length) {
            result.unshift(c1);
            continue;
        }
        if (flag) {
            flag = false;
            if (c1 == '0') {
                c1 = '9';
                flag = true;
            } else {
                c1 = parseInt(c1) - 1 + '';
            }
        }

        var c2 = result[0];
        if (c1 > c2) {
            c2 = '9';
            if (c1 == '0') {
                c1 = '9';
                flag = true;
            } else {
                c1 = parseInt(c1) - 1 + '';
            }

            for (var j = 0; j < result.length; j++) {
                result[j] = '9';
            }
        }
        result[0] = c2;
        result.unshift(c1);
    }

    if (result[0] === '0') result.shift();
    return result.join('');
}
