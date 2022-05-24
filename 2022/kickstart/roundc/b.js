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
        const [n, x, y] = lines[l++].trim().split(' ').map(Number)
        console.log('Case #%d: %s', i + 1, solve(n, x, y));
    }
// })()
})

function solve(n, x, y) {
    const sum = n * (n + 1) / 2
    if (sum % (x + y)) return 'IMPOSSIBLE'

    const vx = sum / (x + y) * x
    const vy = sum / (x + y) * y
// console.log(vx, vy)
    const dp = []
    for (let i = 1; i <= n; i++) {
        const x = i
        dp[i] = []
        for (let j = 0; j <= vx; j++) {
            if (i === 1) {
                dp[i][j] = j - x >= 0 ? x : 0
            } else if (j - x >= 0) {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - x] + x)
            } else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }
    if (dp[n][vx] !== vx) return 'IMPOSSIBLE'
    //
    const ans = Array(n + 1).fill(0)
    let now = vx
    for (let i = n; i >= 1; i--) {
        const prev = i > 1 ? dp[i - 1][now] : 0
        if (dp[i][now] !== prev) {
            ans[i] = 1
            now -= i
        }
    }

// console.log(ans)
    const sa = []
    const sb = []
    for (let i = 1; i <= n; i++) {
        if (ans[i]) {
            sa.push(i)
        } else {
            sb.push(i)
        }
    }
    return 'POSSIBLE\n' + sa.length + '\n' + sa.join(' ')
}
