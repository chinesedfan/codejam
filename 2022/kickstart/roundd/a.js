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
        const [n, m] = lines[l++].trim().split(' ').map(Number)
        const arr = lines[l++].trim().split(' ').map(Number)
        console.log('Case #%d: %s', i + 1, solve(n, m, arr));
    }
// })()
})

function solve(n, m, arr) {
    arr.sort((a, b) => a - b)
    let sum = 0
    for (let i = n - (m - 1); i < n; i++) {
        sum += arr[i]
    }
    if ((n - m + 1) & 1) {
        const j = Math.floor((n - m) / 2)
        sum += arr[j]
    } else {
        const i = (n - m + 1) / 2 - 1
        const j = (n - m + 1) / 2
        sum += (arr[i] + arr[j]) / 2
    }
    return sum
}
