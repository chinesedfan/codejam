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

    // if confirmed [0, i], then the all possible
    const ps = []
    let base = 1
    for (let i = mid - 1; i >= 0; i--) {
        ps[i] = base
        base = mul(base, k)
    }

    let cur = 0 // with prefix str[i]
    let any = 0 // any but not str[i]
    let fix = n === 1 || (n === 2 && str[0] === str[1])
    for (let i = mid - 1; i >= 0; i--) {
        const j = str.length - 1 - i
        const a = str[i]
        const b = str[j]
        const count = ch2num(str[i])
        if (i === mid - 1) {
            cur = 1
        } else {
            cur = add(any, cur)
        }
        if (a > b) {
            fix = true
        }
        any = mul(count - 1, ps[i])
    }
    if (fix) cur--

    return add(any, cur)
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
