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
        const [n, m, k] = lines[l++].trim().split(' ').map(Number)
        const arr = lines.slice(l, l + m).map(str => str.trim().split(' ').map(Number))
        l += m
        console.log('Case #%d: %s', i + 1, solve(n, m, arr));
    }
// })()
})

function solve(n, m, arr) {
    const ps = Array(n).fill(0)
    for (let i = 0; i < arr.length; i++) {
        let [u, v] = arr[i]
        u--; v--
        ps[v]++
    }
    let ans = 0
    for (let i = 0; i < n; i++) {
        if (ps[i] > 0) ans++
    }
    return ans
}
