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

    var min;
    if (diffPos < 0) {
        min = tryWithCompare(s1, s2, diffPos, 0, false);
        return min.cstr + ' ' + min.jstr;
    }

    var results = _([-1, 1]).map(function(compare) {
        reverse = false;
        if (compareChar(s1[diffPos], s2[diffPos]) != compare) {
            reverse = true;
        }

        return tryWithCompare(s1, s2, diffPos, compare, reverse);
    }).filter().value();
    if (results.length > 1) {
        min = compareResult(results[0], results[1]) < 0 ? results[0] : results[1];
    } else {
        min = results[0];
    }
    //console.log(min.abs.toString())
    return min.cstr + ' ' + min.jstr;
}

function tryWithCompare(s1, s2, diffPos, compare, reverse) {
    if (reverse && diffPos > 0) {
        return _(_.range(diffPos)).map(function(i) {
            return tryWithOnePos(s1, s2, diffPos, i, compare);
        }).filter().value().sort(compareResult)[0];
    } else {
        return tryWithOnePos(s1, s2, diffPos, -1, compare);
    }
}

function tryWithOnePos(s1, s2, diffPos, onePos, compare) {
    var x1 = [], x2 = [], v1, v2;
    //console.log(onePos, diffPos)
    var flag = _.some(s1, function(c, i) {
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
                    if (compare < 0) {
                        if (s2[i] == '0') return true;
                        v1 = (parseInt(s2[i]) - 1);
                    }
                    if (compare > 0) {
                        if (s2[i] == '9') return true;
                        v1 = (parseInt(s2[i]) + 1);
                    }
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
                    if (compare < 0) {
                        if (s1[i] == '9') return true;
                        v2 = (parseInt(s1[i]) + 1);
                    }
                    if (compare > 0) {
                        if (s1[i] == '0') return true;
                        v2 = (parseInt(s1[i]) - 1);
                    }
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
    if (flag) return null;
    if (x1.length != x2.length) throw new Error('different length');

    var item = {
        cstr: x1.join(''),
        jstr: x2.join('')
    };
    item.c = BigInteger(item.cstr);
    item.j = BigInteger(item.jstr);
    item.abs = item.c.subtract(item.j).abs();
    //console.log(item.cstr, item.jstr)
    return item;
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
