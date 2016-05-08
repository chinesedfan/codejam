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
    var diffPos = -1, reverse;
    _.some(s1, function(c, i) {
        if (s1[i] != s2[i] && s1[i] != '?' && s2[i] != '?') {
            diffPos = i;
            return true;
        }
    });

    if (diffPos < 0) {
        return tryWithCompare(s1, s2, diffPos, 0, false).join(' ');
    }

    var results = _.map([-1, 1], function(compare) {
        reverse = false;
        if (compareChar(s1[diffPos], s2[diffPos]) != compare) {
            reverse = true;
        }

        var arr = tryWithCompare(s1, s2, diffPos, compare, reverse);
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

    var min = compareResult(results[0], results[1]) < 0 ? results[0] : results[1];
    //console.log(min.abs.toString())
    return min.cstr + ' ' + min.jstr;
}

function tryWithCompare(s1, s2, diffPos, compare, reverse) {
    var x1 = [], x2 = [], v1, v2;
    var onePos = -1;
    if (reverse) {
        _.some(_.range(diffPos - 1, -1, -1), function(i) {
            if (s1[i] == '?' && s2[i] != '?') {
                if (compare < 0 && s2[i] != '0') { onePos = i; return true; }
                if (compare > 0 && s2[i] != '9') { onePos = i; return true; }
            }
            if (s1[i] != '?' && s2[i] == '?') {
                if (compare < 0 && s1[i] != '9') { onePos = i; return true; }
                if (compare > 0 && s1[i] != '0') { onePos = i; return true; }
            }
            if (s1[i] == s2[i] && s1[i] == '?') { onePos = i; return true; }
        });
    }
    //console.log(onePos, diffPos)
    _.each(s1, function(c, i) {
        if (s1[i] != '?' && s2[i] != '?') {
            x1.push(s1[i]);
            x2.push(s2[i]);
        } else if (s1[i] == '?' && s2[i] == '?') {
            if (i < diffPos) {
                v1 = '0';
                v2 = '0';
                if (i == onePos) {
                    if (compare < 0) v2 = '1';
                    if (compare > 0) v1 = '1';
                } else if (onePos >= 0 && i > onePos) {
                    if (compare < 0) v1 = '9';
                    if (compare > 0) v2 = '9';
                }
                x1.push(v1);
                x2.push(v2);
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
                v1 = s2[i];
                if (i == onePos) {
                    if (compare < 0) v1 = (parseInt(s2[i]) - 1);
                    if (compare > 0) v1 = (parseInt(s2[i]) + 1);
                } else if (onePos >= 0 && i > onePos) {
                    if (compare < 0) v1 = '9';
                    if (compare > 0) v1 = '0';
                }
                x1.push(v1);
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
                v2 = s1[i];
                if (i == onePos) {
                    if (compare < 0) v2 = (parseInt(s1[i]) + 1);
                    if (compare > 0) v2 = (parseInt(s1[i]) - 1);
                } else if (onePos >= 0 && i > onePos) {
                    if (compare < 0) v2 = '0';
                    if (compare > 0) v2 = '9';
                }
                x2.push(v2);
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
    if (x1.length != x2.length) throw new Error('different length');
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

function compareResult(a, b) {
    var result = a.abs.compare(b.abs);
    if (result) return result;

    result = a.c.compare(b.c);
    if (result) return result;

    return a.j.compare(b.j);
}
