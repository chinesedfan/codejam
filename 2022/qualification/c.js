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
    arr.sort((a, b) => a - b)

    let last
    let size
    let ans = 1
    arr.forEach((x, i) => {
        if (i) {
            if (x >= last + 1) {
                last++
                size++
            // } else {
            //     last = 1
            //     size = 1
            }
        } else {
            last = 1
            size = 1
        }
        ans = Math.max(ans, size)
    })
    return ans
}
