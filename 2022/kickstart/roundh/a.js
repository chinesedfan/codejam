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
        const [m, n] = lines[l++].trim().split(' ').map(Number)
        const arr = lines.slice(l, l + n).map(str => str.trim().split(' '))
        l += n
        console.log('Case #%d: %s', i + 1, solve(m, n, arr));
    }
// })()
})

function solve(l, n, arr) {
    let r = 0
    let p = 0
    let prev = arr[0][1]
    for (let [d, c] of arr) {
        d = +d
        if (c === prev) {
            const need = c === 'C' ? l - p : p
            if (d >= need) {
                r += (need ? 1 : 0) + Math.floor((d - need) / l)
            }
        } else {
            let need = c === 'C' ? l - p : p
            if (!p) need = 0
            if (d >= need) {
                r += Math.floor((d - need) / l)
                prev = c
            }
        }
        p += d * (c === 'C' ? 1 : -1)
        p %= l
        if (p < 0) p += l
    }
    return r
}
