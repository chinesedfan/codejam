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

    let ans = []
    let i = 1
    let now = 0
    while (i <= n && now + i <= vx) {
        now += i
        ans.push(i++)
    }
    const r = vx - now
    if (r) {
        for (let i = 0; i < r; i++) {
            ans[ans.length - 1 - i]++
        }
    }
    return 'POSSIBLE\n' + ans.length + '\n' + ans.join(' ')
}
