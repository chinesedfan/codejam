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
        const str = lines[l++]
        console.log('Case #%d: %s', i + 1, solve(str));
    }
// })()
})

function solve(str) {
    let sum = 0
    for (let i = 0; i < str.length; i++) {
        sum += +str[i]
    }
    const r = sum % 9
    if (!r) return str[0] + '0' + str.slice(1)

    const x = 9 - r
// console.log(x)
    const ans = []
    let ok = false
    for (let i = 0; i < str.length; i++) {
        const n = +str[i]
        if (x < n && !ok) {
            ok = true
            ans.push(x)
        }
        ans.push(n)
    }
    if (!ok) ans.push(x)
    return ans.join('')
}
