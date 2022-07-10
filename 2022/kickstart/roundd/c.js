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
    for (let i = 1; i < sa.length; i++) {
        const dp = []
        const p = sa[i - 1]
        const x = sa[i]
        ps[x].forEach(u => {
            let min = Infinity
            ps[p].forEach(v => {
                min = Math.min(min, prev[v] + Math.abs(u - v))
            })
            dp[u] = min
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
