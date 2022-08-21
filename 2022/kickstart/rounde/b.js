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
        const n = +lines[l++]
        const arr = lines[l++].trim().split(' ').map(Number)
        console.log('Case #%d: %s', i + 1, solve(n, arr));
    }
// })()
})

function solve(n, arr) {
    const sorted = arr.map((x, i) => [x, i])
        .sort((a, b) => a[0] - b[0])
    return arr.map((x, idx) => {
        const j = binarySearch(0, n - 1, i => sorted[i][0] <= 2 * x)
        if (sorted[j][1] === idx) {
            if (j) {
                return sorted[j - 1][0]
            } else {
                return -1
            }
        } else {
            return sorted[j][0]
        }
    }).join(' ')
}
function binarySearch(l, r, fn) {
    while (l <= r) {
        const m = Math.floor((l + r) / 2)
        if (fn(m)) {
            l = m + 1
        } else {
            r = m - 1
        }
    }
    return r
}
