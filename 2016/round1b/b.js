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

function solve(s1, s2) {
    var diffPos = -1;
    _.some(s1, function(c, i) {
        if (s1[i] != s2[i] && s1[i] != '?' && s2[i] != '?') {
            diffPos = i;
            return true;
        }
    });

    var results = _.map([-1, 0, 1], function(compare) {
        var arr = tryWithCompare(s1, s2, diffPos, compare);
        //console.log(arr.toString())
        var item = {
            cstr: arr[0],
            jstr: arr[1],
            c: BigInteger(arr[0]),
            j: BigInteger(arr[1])
        };
        item.abs = item.c.subtract(item.j).abs();
        //console.log(item.abs.toString())
        return item;
    });

    var min = results[0];
    _.each(results, function(item, i) {
        if (i == 0) return;

        if (item.abs < min.abs) {
            min = item;
        } else if (item.abs == min.abs) {
            var x = item.c.compare(min.c);
            if (x < 0) {
                min = item;
            } else if (x == 0 && item.j.compare(min.j) < 0) {
                min = item;
            }
        }
    });
    return min.cstr + ' ' + min.jstr;
}

function tryWithCompare(s1, s2, diffPos, compare) {
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
    return [x1.join(''), x2.join('')];
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
