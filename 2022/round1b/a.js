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
        const n = +lines[l++]
        const arr = lines[l++].trim().split(' ').map(Number)
        console.log('Case #%d: %s', i + 1, solve(n, arr));
    }
// })()
})

function solve(n, arr) {
    let i = 0
    let j = n - 1
    let max = -Infinity
    let ans = 0
    while (i <= j) {
        let x
        if (arr[i] < arr[j]) {
            x = arr[i++]
        } else {
            x = arr[j--]
        }
        if (x >= max) {
            max = x
            ans++
        }
    }
    return ans
}
