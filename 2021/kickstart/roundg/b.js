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
        const arr = lines.slice(l, l + n).map(str => str.trim().split(' ').map(Number))
        l += n
        output[i] = `Case #${i + 1}: ` + solve(n, arr)
    }
    console.log(output.join('\n'))
// })()
})

function solve(n, arr) {
    const xsorted = arr.slice().sort((a, b) => {
        if (a[0] === b[0]) {
            return a[2] - b[2]
        } else {
            return a[0] - b[0]
        }
    })
    const ysorted = arr.slice().sort((a, b) => {
        if (a[1] === b[1]) {
            return a[3] - b[3]
        } else {
            return a[1] - b[1]
        }
    })

    const sum = [[], [], [], []]
    for (let i = 0; i < arr.length; i++) {
        const x2 = xsorted[i][2]
        const y2 = ysorted[i][3]
        // const [x1, y1, x2, y2] = arr[i]
        sum[1][i] = i ? sum[1][i - 1] + x2 : x2
        sum[3][i] = i ? sum[3][i - 1] + y2 : y2
    }
    for (let i = arr.length - 1; i >= 0; i--) {
        const x1 = xsorted[i][0]
        const y1 = ysorted[i][1]
        // const [x1, y1, x2, y2] = arr[i]
        sum[0][i] = i < arr.length - 1 ? sum[0][i + 1] + x1 : x1
        sum[2][i] = i < arr.length - 1 ? sum[2][i + 1] + y1 : y1
    }
// console.log(sum)
    let minx = Infinity
    let miny = Infinity
    let x
    let y
    arr.forEach(([x1, y1, x2, y2], i) => {
        // in i
        // const left = sum[2][i - 1]
        // const right = sum[0][i + 1]
        const dx = (i < arr.length - 1 ? sum[0][i + 1] : 0) - (i ? sum[2][i - 1] : 0)
        const dy = (i < arr.length - 1 ? sum[1][i + 1] : 0) - (i ? sum[3][i - 1] : 0)
        // console.log(dx, dy)
        if (dx < minx) {
            minx = dx
            x = xsorted[i][0]
        }
        if (dy < miny) {
            miny = dy
            y = ysorted[i][1]
        }
        // better than
        // after i
        // const left = sum[2][i]
        // const right = sum[0][i + 1]
    })
    return x + ' ' + y
}
