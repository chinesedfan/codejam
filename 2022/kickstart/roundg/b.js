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
    const a = sa.filter(([x, y]) => ok(x, y)).length
    const b = sb.filter(([x, y]) => ok(x, y)).length
    return a >= b ? [a - b, 0] : [0, b - a]
    function ok(x, y) {
        return x * x + y * y <= (rs + rh) ** 2
    }
}
