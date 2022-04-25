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
        const [n, p] = lines[l++].trim().split(' ').map(Number)
        const arr = lines.slice(l, l + n).map(str => str.trim().split(' ').map(Number))
        l += n
        console.log('Case #%d: %s', i + 1, solve(n, arr));
    }
// })()
})

function solve(n, arr) {
    const dmin = []
    const dmax = []
    let pmin = 0
    let pmax = 0
    for (let i = 0; i < arr.length; i++) {
        arr[i].sort((a, b) => a - b)
        const min = arr[i][0]
        const max = arr[i][arr[i].length - 1]
        //
        if (i) {
            let s1, s2
            s1 = dmin[i - 1] + Math.abs(pmin - max) + max - min
            s2 = dmax[i - 1] + Math.abs(pmax - max) + max - min
            dmin[i] = Math.min(s1, s2)
            //
            s1 = dmin[i - 1] + Math.abs(pmin - min) + max - min
            s2 = dmax[i - 1] + Math.abs(pmax - min) + max - min
            dmax[i] = Math.min(s1, s2)
        } else {
            dmin[i] = max + max - min
            dmax[i] = max
        }
        pmin = min
        pmax = max
    }
    return Math.min(dmin[n - 1], dmax[n - 1])
}
