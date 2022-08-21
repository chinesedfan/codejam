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
        const str = lines[l++]
        console.log('Case #%d: %s', i + 1, solve(n, str));
    }
// })()
})

function solve(n, str) {
    const y = binarySearch(1, n, x => {
        // n + x
        const r = helper(n, str, x)
        for (let i = 0; i < n; i++) {
            if (str[i] !== r[i]) return true // bad
        }
        for (let i = 0; i < x; i++) {
            if (r[n + i] !== r[n + x - 1 - i]) return true
        }
        return false
    })
    return helper(n, str, y + 1).slice(n).join('')
}
function helper(n, str, x) {
    const r = []
    const t = n + x
    for (let i = 0; i < t; i++) {
        if (t - 1 - i < i) break
        r[i] = r[t - 1 - i] = str[i]
    }
    // console.log(str, x, r)
    return r
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
