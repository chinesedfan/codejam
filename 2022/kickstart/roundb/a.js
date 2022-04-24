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
        const [r, a, b] = lines[l++].trim().split(' ').map(Number)
        console.log('Case #%d: %s', i + 1, solve(r, a, b));
    }
// })()
})

function solve(r, a, b) {
    let sum = 0
    while (r > 0) {
        sum += Math.PI * r * r
        r *= a
        sum += Math.PI * r * r
        r = Math.floor(r / b)
    }
    return sum
}
