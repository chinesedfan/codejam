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
        const a = lines[l++]
        const b = lines[l++]
        console.log('Case #%d: %s', i + 1, solve(a, b));
    }
// })()
})

function solve(a, b) {
    let i = 0
    let j = 0
    let ans = 0
    while (i < a.length && j < b.length) {
        if (a[i] === b[j]) {
            i++
            j++
        } else {
            j++
            ans++
        }
    }
    ans += b.length - j
    return i === a.length ? ans : 'IMPOSSIBLE'
}
