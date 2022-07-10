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
        l++
        const sa = lines[l++].trim().split(' ').map(Number)
        l++
        const sb = lines[l++].trim().split(' ').map(Number)
        console.log('Case #%d: %s', i + 1, solve(sa, sb));
    }
// })()
})

function solve(sa, sb) {
    const ps = {}
    sb.forEach((x, i) => {
        ps[x] = ps[x] || []
        ps[x].push(i)
    })
    //
    let prev = []
    ps[sa[0]].forEach(u => {
        prev[u] = 0
    })
    for (let i = 0; i < sa.length - 1; i++) {
        const dp = Array(sb.length).fill(Infinity)
        const p = sa[i]
        const x = sa[i + 1]
        ps[p].forEach(u => {
            const idx = binarySearch(0, ps[x].length - 1, j => ps[x][j] < u)
            if (idx >= 0) {
                const v = ps[x][idx]
                dp[v] = Math.min(dp[v], prev[u] + Math.abs(u - v))
            }
            if (idx + 1 < ps[x].length) {
                const v = ps[x][idx + 1]
                dp[v] = Math.min(dp[v], prev[u] + Math.abs(u - v))
            }
        })
        prev = dp
    }
    //
    let ans = Infinity
    ps[sa[sa.length - 1]].forEach(u => {
        ans = Math.min(ans, prev[u])
    })
    return ans
}
function binarySearch(l, r, fn) {
    while (l <= r) {
        const m = Math.floor((l + r) / 2)
        if (fn(m)) {
            l = m + 1
        } else {
            r = m - 1
        }
    }
    return r
}
