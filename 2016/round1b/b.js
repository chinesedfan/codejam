var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    console.log('Case #%d: %s', i + 1, solve.apply(this, lines[l++].split(' ')));
}

function solve(s1, s2) {
    var compare = 0, diffPos = -1;
    _.some(s1, function(c, i) {
        if (s1[i] != s2[i] && s1[i] != '?' && s2[i] != '?') {
            compare = compareChar(s1[i], s2[i]);
            diffPos = i;
            return true;
        }
    });

    var x1 = [], x2= [];
    _.each(s1, function(c, i) {
        if (s1[i] != '?' && s2[i] != '?') {
            x1.push(s1[i]);
            x2.push(s2[i]);
        } else if (s1[i] == '?' && s2[i] == '?') {
            if (i < diffPos) {
                x1.push('0');
                x2.push('0');
            } else if (compare < 0) {
                x1.push('9');
                x2.push('0');
            } else if (compare > 0) {
                x1.push('0');
                x2.push('9');
            } else {
                x1.push('0');
                x2.push('0');
            }
        } else if (s1[i] == '?') {
            if (i < diffPos) {
                x1.push(s2[i]);
            } else if (compare < 0) {
                x1.push('9');
            } else if (compare > 0) {
                x1.push('0');
            } else {
                x1.push(s2[i]);
            }
            x2.push(s2[i]);
        } else {
            if (i < diffPos) {
                x2.push(s1[i]);
            } else if (compare < 0) {
                x2.push('0');
            } else if (compare > 0) {
                x2.push('9');
            } else {
                x2.push(s1[i]);
            }
            x1.push(s1[i]);
        }
    });
    return x1.join('') + ' ' + x2.join('');
}

function compareChar(a, b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
}
