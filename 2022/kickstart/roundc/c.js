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
        const [n, total] = lines[l++].trim().split(' ').map(Number)
        const arr = lines.slice(l, l + n).map(str => str.trim().split(' ').map(Number))
        l += n
        console.log('Case #%d: %s', i + 1, solve(n, total, arr));
    }
// })()
})

function solve(n, total, arr) {
    const scale = 1024
    total *= scale
    //
    arr = arr.map(([x, dir], i) => [x * scale, dir, i + 1])
        .sort((a, b) => a[0] - b[0])
    //
    const ts = []
    for (let i = 0; i < n; i++) {
        const left = []
        const right = []
        let j = i - 1
        while (j >= 0 && arr[j][1]) {
            left.push(j--)
        }
        j = i + 1
        while (j < n && !arr[j][1]) {
            right.push(j++)
        }
        //
        let sum = 0
        let l = 0
        let r = 0
        let p = arr[i][0]
        let d = arr[i][1] // 0 for left, 1 for right
        while (1) {
            if (d) {
                if (r < right.length) {
                    const other = arr[right[r++]][0]
                    sum += (other - p) / 2
                    p = (p + other) / 2
                } else {
                    sum += total - p
                    break
                }
            } else {
                if (l < left.length) {
                    const other = arr[left[l++]][0]
                    sum += (p - other) / 2
                    p = (p + other) / 2
                } else {
                    sum += p
                    break
                }
            }
            d = d ^ 1
        }
        ts.push([arr[i][2], sum])
    }
    ts.sort((a, b) => {
        if (a[1] - b[1]) {
            return a[1] - b[1]
        } else {
            return a[0] - b[0]
        }
    })
    // console.log(ts)
    return ts.map(x => x[0]).join(' ')
}
