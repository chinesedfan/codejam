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
    const dp = Array(n + 1)
    for (let i = 0; i <= n; i++) {
        const limit = Math.floor(Math.sqrt(i))
        dp[i] = i === 1 ? 1 : dp[i - 1] + 1
        for (let j = 2; j <= limit; j++) {
            if (i % j) continue
            const x = i / j
            const y = j - 1
            const t = dp[x] + (y ? 4 + 2 * y : 0)
            dp[i] = Math.min(dp[i], t)
        }
    }
    return dp[n]
}
