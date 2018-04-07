var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var tokens = lines[l++].split(' ');
    console.log('Case #%d: %s', i + 1, solve(parseInt(tokens[0]), tokens[1]));
}

function solve(limit, str) {
    var {d, countC} = getDamage(str);

    var swap = 0;
    var chs = str.split('');
    while (1) {
        if (d <= limit) return swap;

        var c = 0;
        var found = false;
        for (var i = chs.length - 1; i >= 0; i--) {
            if (chs[i] == 'C') c++;
            if (i == chs.length - 1) continue;

            if (chs[i] == 'C' && chs[i + 1] == 'S') {
                d -= Math.pow(2, countC - c);

                chs[i] = 'S';
                chs[i + 1] = 'C';
                swap++;

                found = true;
            }
        }

        if (!found) break;
    }

    return 'IMPOSSIBLE';
}

function getDamage(str) {
    var s = 1;
    var d = 0;
    var countC = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] == 'C') {
            s *= 2;
            countC++;
        } else {
            d += s;
        }
    }
    return {d, countC};
}
