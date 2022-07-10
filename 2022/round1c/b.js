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
    for (let i = 0; i < t; i++) {
        const [n, k] = lines[l++].trim().split(' ').map(Number)
        const arr = lines[l++].trim().split(' ').map(Number)
        console.log('Case #%d: %s', i + 1, solve(n, k, arr));
    }
// })()
})

function solve(n, k, arr) {
    let s = 0
    let s2 = 0
    arr.forEach(x => {
        s += x
        s2 += x * x
    })
    // s * s + 2 * s * x + x * x, s2 + x * x
    const d = s2 - s * s
    if (!d) return 0
    if (!s) return 'IMPOSSIBLE'
    if (d % (2 * s)) return 'IMPOSSIBLE'
    return d / 2 / s
}
