// TLE due to gcd is not effective
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
        var tokens = lines[l++].split(' ');
        var n = +tokens[0];
        var len = +tokens[1];
        console.log('Case #%d: %s', i + 1, solve(n, len, lines[l++].split(' ')));
    }
});

function solve(n, len, s) {
    var map = {}; // p -> 1
    var ps = []; // len + 1
    s.forEach((m, i) => {
        if (i == 0) return;

        var x = gcd(s[i - 1], s[i]);
        if (x != s[i]) {
            ps[i] = x;
            map[x] = 1;
        }
    });
    for (var i = 0; i < s.length; i++) {
        if (ps[i]) {
            var j = i - 1;
            while (j >= 0 && !ps[j]) {
                ps[j] = divide(s[j], ps[j + 1]);
                map[ps[j]] = 1;
                j--;
            }

            j = i + 1;
            while (j <= s.length && !ps[j]) {
                ps[j] = divide(s[j - 1], ps[j - 1]);
                map[ps[j]] = 1;
                j++;
            }
        }
    }

    var chs = Object.keys(map).sort(cmp).reduce((o, k, i) => {
        o[k] = String.fromCharCode('A'.charCodeAt(0) + i);
        return o;
    }, {}); // p -> ch

    return ps.map((p) => chs[p]).join('');
}

function gcd(a, b) {
    while (1) {
        var r = cmp(a, b);
        if (r > 0) {
            a = minus(a, b);
        } else if (r < 0) {
            b = minus(b, a);
        } else {
            return a;
        }
    }
}
function minus(a, b) {
    // make sure a >= b
    a = a.split('').map((x) => +x);
    b = b.split('').map((x) => +x);

    var i = a.length - 1;
    var j = b.length - 1;
    var result = [];
    var carry = 0;
    while (i >= 0) {
        if (carry) {
            if (a[i]) {
                a[i]--;
                carry = 0;
            } else {
                a[i] = 9;
                carry = 1;
            }
        }

        var bj = j >= 0 ? b[j] : 0;
        if (a[i] >= bj) {
            result.unshift(a[i] - bj);
        } else {
            result.unshift(10 + a[i] - bj);
            carry = 1;
        }

        i--;
        j--;
    }

    while (result[0] == '0') result.shift();
    return result.join('');
}
function divide(a, b) {
    // make sure a is divided by b
    var result = [];
    var pos = b.length - 1;
    var rest = a.slice(0, b.length);
    while (pos < a.length) {
        if (cmp(rest, b) < 0) {
            result.push(0);
        } else {
            var x = 0;
            while (cmp(rest, b) >= 0) {
                rest = minus(rest, b);
                x++;
            }
            result.push(x);
        }
        pos++;
        rest += a[pos];
    }
    while (result[0] == '0') result.shift();
    return result.join('');
}
function cmp(a, b) {
    if (a.length != b.length) {
        return a.length - b.length;
    } else {
        for (var i = 0; i < a.length; i++) {
            if (a[i] != b[i]) return (+a[i]) - (+b[i]);
        }
        return 0;
    }
}
