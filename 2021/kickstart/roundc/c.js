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
    l++
    for (var i = 0; i < t; i++) {
        const [w, e] = lines[l++].split(' ').map(Number)
        console.log('Case #%d: %s', i + 1, solve(w, e));
    }
});

function solve(w, e) {
    const counts = [
        { k: 'R', c: 0, e: 'P', a: 'S' },
        { k: 'S', c: 0, e: 'R', a: 'P' },
        { k: 'P', c: 0, e: 'S', a: 'R' },
    ]
    const ans = []
    for (let i = 0; i < 60; i++) {
        counts.sort((a, b) => b.c - a.c)
        const [a, b] = counts
        let x
        if (a.c > b.c) {
            x = a.a
        } else {
            const ap = getPoint(w, 0, a.e, a.a) + getPoint(w, 0, b.e, a.a)
            const bp = getPoint(w, 0, a.e, b.a) + getPoint(w, 0, b.e, b.a)
            x = ap >= bp ? a.a : b.a
        }

        counts.forEach(item => {
            if (item.k === x) item.c++
        })
        ans.push(x)
    }
    const str = ans.join('')
    // console.log(getExpectedPerDay(str, 50 * 10))
    return str
}

function getPoint(w, e, expect, actual) {
    if (expect === actual) return e
    if (expect === 'R') return actual === 'P' ? w : 0
    if (expect === 'S') return actual === 'R' ? w : 0
    if (expect === 'P') return actual === 'S' ? w : 0
    throw 'error'
}

function getExpectedPerDay(str, w) {
    const counts = [
        { k: 'R', c: 0, e: 'P', a: 'S' },
        { k: 'S', c: 0, e: 'R', a: 'P' },
        { k: 'P', c: 0, e: 'S', a: 'R' },
    ]
    let sum = 0
    for (let i = 0; i < 60; i++) {
        const x = str[i]
        counts.forEach(item => {
            const p = i ? item.c / i : 1 / 3
            sum += getPoint(w, w, item.e, x) * p
            sum += getPoint(w, w / 2, item.e, x) * p
            sum += getPoint(w, w / 10, item.e, x) * p
            sum += getPoint(w, 0, item.e, x) * p
        })
        counts.forEach(item => {
            if (item.k === x) item.c++
        })
    }
    return sum / 4
}
