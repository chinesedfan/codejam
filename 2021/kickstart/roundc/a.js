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
    const S = 'abcde'

    const total = Math.pow(k, n)
    let chs
    let count = 0
    for (let i = 0; i < total; i++) {
        chs = []
        let x = i
        for (let j = 0; j < n; j++) {
            const r = x % k
            chs.push(S[r])

            x -= r
            x /= k
        }

        const cur = chs.join('')
        if (cur < str && isValid(cur, 0, n - 1)) count++
    }
    return count
}

function isValid(str, i, j) {
    return j - i + 1 <= 1 ? true
        : (str[i] === str[j] && isValid(str, i + 1, j - 1))
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
