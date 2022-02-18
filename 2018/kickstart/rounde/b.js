const readline = require('readline')

/* Paste https://github.com/chinesedfan/heap.js/blob/atcoder/lib/heap.js here */

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
        const [n, m, p] = lines[l++].trim().split(' ').map(Number)
        const arr = lines.slice(l, l + n).map(str => str.trim())
        l += n
        const ban = lines.slice(l, l + m).map(str => str.trim())
        l += m
        output[i] = `Case #${i + 1}: ` + solve(p, arr, ban)
    }
    console.log(output.join('\n'))
// })()
})

function solve(p, arr, ban) {
    const count = Array(p).fill(0)
    for (let i = 0; i < p; i++) {
        arr.forEach(x => {
            if (x[i] === '1') count[i]++
        })
    }
    const map = ban.reduce((o, x) => {
        o[x] = 1
        return o
    }, {})
    const sorted = count.map((x, i) => {
        if (x < arr.length / 2) {
            return [i, x, 0]
        } else {
            return [i, arr.length - x, 1]
        }
    })
        .filter(([i, x]) => x !== arr.length / 2)
        .sort((a, b) => a[1] - b[1])
// console.log(sorted)
    let min = 0
    let now = Array(p).fill(0)
    sorted.forEach(([i, x, ch]) => {
        min += x
        now[i] = ch
    })
    const h = new Heap((a, b) => a[1] - b[1])
    h.push([now, min])
    while (1) {
        const [u, d] = h.pop()
        const k = u.join('')
// console.log(k, d)
        if (!map[k]) return d

        for (let i = 0; i < sorted.length; i++) {
            const [idx, x, ch] = sorted[i]
            if (ch === u[idx]) {
                const next = u.slice()
                next[idx] ^= 1 // fixme:
                h.push([next, d - x + (arr.length - x)])
            }
        }
    }
    throw 'sb'
}
