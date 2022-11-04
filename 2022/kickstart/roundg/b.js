const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const lines = []
rl.on('line', (input) => {
    lines.push(input);
})
rl.on('close', () => {
// (function() {
    // const lines = require('fs').readFileSync('test.in', 'utf8').split('\n')
    let l = 0;
    let t = +lines[l++]
    const output = []
    for (let i = 0; i < t; i++) {
        const [rs, rh] = lines[l++].trim().split(' ').map(Number)
        const n = +lines[l++]
        const sa = lines.slice(l, l + n).map(str => str.trim().split(' ').map(Number))
        l += n
        const m = +lines[l++]
        const sb = lines.slice(l, l + m).map(str => str.trim().split(' ').map(Number))
        l += m
        console.log('Case #%d: %s', i + 1, solve(rs, rh, sa, sb).join(' '));
    }
// })()
})

function solve(rs, rh, sa, sb) {
    sa = sa.map(([x, y]) => x * x + y * y)
        .sort((a, b) => a - b)
    sb = sb.map(([x, y]) => x * x + y * y)
        .sort((a, b) => a - b)
    const fa = sa.length ? sa[0] : Infinity
    const fb = sb.length ? sb[0] : Infinity
    let limit = (rs + rh) ** 2
    let x = 0
    if (fa < fb) {
        if (fb < limit) limit = fb
        while (x < sa.length && sa[x] <= limit) x++
        return [x, 0]
    } else {
        if (fa < limit) limit = fa
        while (x < sb.length && sb[x] <= limit) x++
        return [0, x]
    }
}
