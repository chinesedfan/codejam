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
        const n = +lines[l++]
        console.log('Case #%d: %s', i + 1, solve(n));
    }
// })()
})

function solve(n) {
    let r = Infinity
    for (let i = 0; i <= n; i++) {
        const p = n - i
        const limit = Math.floor(Math.sqrt(p))
        for (let j = 1; j <= limit; j++) {
            if (p % j) continue
            const x = p / j
            const y = j - 1
            const t = x + (y ? 4 + 2 * y : 0) + i
            r = Math.min(r, t)
        }
    }
    return r
}
