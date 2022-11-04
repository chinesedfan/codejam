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
        const [m, n, p] = lines[l++].trim().split(' ').map(Number)
        const arr = lines.slice(l, l + m).map(str => str.trim().split(' ').map(Number))
        l += m
        console.log('Case #%d: %s', i + 1, solve(m, n, p, arr));
    }
// })()
})

function solve(m, n, p, arr) {
    p--
    let ans = 0
    for (let d = 0; d < n; d++) {
        let x = -Infinity
        for (let i = 0; i < m; i++) {
            x = Math.max(x, arr[i][d])
        }
        ans += x - arr[p][d]
    }
    return ans
}
