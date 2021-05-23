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
        var [n, k] = lines[l++].split(' ').map(Number)
        console.log('Case #%d: %s', i + 1, solve(n, k, lines[l++]));
    }
});

const limit = 1e9 + 7
function solve(n, k, str) {
    const mid = Math.ceil(n / 2)

    let cur = 0
    let base = 1
    const expected = []
    for (let i = mid - 1; i >= 0; i--) {
        const j = str.length - 1 - i
        const a = str[i]
        const b = str[j]
        expected[i] = a
        expected[j] = a
        if (a > b) {
            cur = 0
        } else {
            const count = Math.min(k, ch2num(a))
            if (i === mid - 1) {
                cur = count
            } else {
                cur = add(cur, mul(count - 1, base))
            }
        }
        base = mul(base, k)
    }
    if (expected.join('') === str) {
        return (cur + limit - 1) % limit
    }
    return cur
}

function ch2num(ch) {
    return ch.charCodeAt(0) - 'a'.charCodeAt(0) + 1
}
function add(a, b) {
    return (a + b) % limit
}
function mul(a, b) {
    const str = a.toString(2)
    let r = 0
    let t = b
    for (let i = str.length - 1; i >= 0; i--) {
        if (str[i] === '1') {
            r = add(r, t)
        }
        t = add(t, t)
    }
    return r
}
function pow(a, b) {
    if (b === 0) return 1

    const str = a.toString(2)
    let r = 1
    let t = b
    for (let i = str.length - 1; i >= 0; i--) {
        if (str[i] === '1') {
            r = mul(r, t)
        }
        t = mul(t, t)
    }
    return r
}
