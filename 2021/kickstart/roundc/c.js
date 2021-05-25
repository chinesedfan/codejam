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
            const ap = getPoint(w, e, a.e, a.a) + getPoint(w, e, b.e, a.a)
            const bp = getPoint(w, e, a.e, b.a) + getPoint(w, e, b.e, b.a)
            x = ap >= bp ? a.a : b.a
        }

        counts.forEach(item => {
            if (item.k === x) item.c++
        })
        ans.push(x)
    }
    return ans.join('')
}

function getPoint(w, e, expect, actual) {
    if (expect === actual) return e
    if (expect === 'R') return actual === 'P' ? w : 0
    if (expect === 'S') return actual === 'R' ? w : 0
    if (expect === 'P') return actual === 'S' ? w : 0
    throw 'error'
}
