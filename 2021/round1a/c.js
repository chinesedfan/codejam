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
        var q = +tokens[1];
        console.log('Case #%d: %s', i + 1, solve(n, q,
            lines.slice(l, l + n).map(str => str.split(' '))
        ));
        l += n
    }
});

function solve(n, q, ans) {
    const all = getAll(q)
    const right = all.filter(s1 => {
        return ans.every(([s2, score]) => {
            return getScore(s1, s2) === +score
        })
    })

    let max = -Infinity
    let best
    all.forEach(s1 => {
        let sum = 0
        right.forEach(s2 => {
            sum += getScore(s1, s2)
        })
        if (sum > max) {
            max = sum
            best = s1
        }
    })

    const d = gcd(max, right.length)
    return [best, `${max/d}/${right.length/d}`].join(' ')
}

function getAll(n) {
    if (n === 1) return ['T', 'F']

    const ret = []
    getAll(n - 1).forEach(str => {
        ret.push(str + 'T', str + 'F')
    })
    return ret
}
function getScore(s1, s2) {
    let c = 0
    for (let i = 0; i < s1.length; i++) {
        if (s1[i] === s2[i]) c++
    }
    return c
}
function gcd(a, b) {
    while (1) {
        const r = a - b
        if (r > 0) {
            a = a - b
        } else if (r < 0) {
            b = b - a
        } else {
            return a
        }
    }
}
