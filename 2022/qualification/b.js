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
        const arr = lines.slice(l, l + 3).map(str => str.trim().split(' ').map(Number))
        l += 3
        console.log('Case #%d: %s', i + 1, solve(arr));
    }
// })()
})

function solve(arr) {
    const ans = []
    let now = 0
    for (let i = 0; i < 4; i++) {
        const inks = arr.map(x => x[i])
        const use = Math.min(Math.min(...inks), 1e6 - now)
        ans.push(use)
        now += use
    }
    if (now < 1e6) return 'IMPOSSIBLE'
    return ans.join(' ')
}
