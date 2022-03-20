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
        const [a, b] = lines[l++].trim().split(' ').map(Number)
        console.log('Case #%d: %s', i + 1, solve(a, b));
    }
// })()
})

function solve(a, b) {
    let ans = 0
    for (let i = a; i <= b; i++) {
        const str = String(i)
        const p = product(str)
        const s = sum(str)
        if (!(p % s)) {
            ans++
            // console.log(i, p, s)
        }
    }
    return ans
}
function product(str) {
    let p = 1
    for (let i = 0; i < str.length; i++) {
        p *= +str[i]
    }
    return p
}
function sum(str) {
    let s = 0
    for (let i = 0; i < str.length; i++) {
        s += +str[i]
    }
    return s
}
