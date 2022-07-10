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
        const [L, R] = lines[l++].trim().split(' ').map(Number)
        console.log('Case #%d: %s', i + 1, solve(L, R));
    }
// })()
})

function solve(l, r) {
    const n = Math.min(l, r)
    return (n + 1) * n / 2
}
