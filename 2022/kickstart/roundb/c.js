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
        const [n, d] = lines[l++].trim().split(' ').map(Number)
        const arr = lines[l++].trim().split(' ').map(Number)
        console.log('Case #%d: %s', i + 1, solve(n, d, arr));
    }
// })()
})

function solve(n, d, arr) {
    let ans = 0
    let p
    for (let i = 0; i < arr.length; i++) {
        const x = arr[i]
        if (x) {
            if (!p) ans++
        } else {
            //
        }
        p = x
    }
    return ans
}
