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
    const x1sorted = arr.slice().sort((a, b) => a[0] - b[0])
    const y1sorted = arr.slice().sort((a, b) => a[1] - b[1])
    const x2sorted = arr.slice().sort((a, b) => a[2] - b[2])
    const y2sorted = arr.slice().sort((a, b) => a[3] - b[3])

    const sum = [[], [], [], []]
    for (let i = 0; i < arr.length; i++) {
        const x2 = x2sorted[i][2]
        const y2 = y2sorted[i][3]
        // const [x1, y1, x2, y2] = arr[i]
        sum[2][i] = i ? sum[2][i - 1] + x2 : x2
        sum[3][i] = i ? sum[3][i - 1] + y2 : y2
    }
    for (let i = arr.length - 1; i >= 0; i--) {
        const x1 = x1sorted[i][0]
        const y1 = y1sorted[i][1]
        // const [x1, y1, x2, y2] = arr[i]
        sum[0][i] = i < arr.length - 1 ? sum[0][i + 1] + x1 : x1
        sum[1][i] = i < arr.length - 1 ? sum[1][i + 1] + y1 : y1
    }
// console.log(sum)
    let minx = Infinity
    let miny = Infinity
    let x = Infinity
    let y = Infinity
    arr.forEach(([x1, y1, x2, y2], i) => {
        const ldx = cal(sum, x1sorted, x2sorted, 0, 2, x1, i)
        const rdx = cal(sum, x1sorted, x2sorted, 0, 2, x2, i)
        const dx = ldx <= rdx ? ldx : rdx
        const nx = ldx <= rdx ? x1 : x2
        // const lxi = binarySearch(0, i - 1, x => x2sorted[x][2] < x1)
        // const rxi = binarySearch(i + 1, arr.length - 1, x => x1sorted[x][0] <= x2)
        // const lx = (lxi + 1) * x1 - (lxi >= 0 ? sum[2][lxi] : 0)
        // const rx = sum[0][rxi] - (arr.length - 1 - rxi) * x2
        // // console.log(sum[0][arr.length - 1], (rxi ? sum[0][rxi - 1] : 0))
        // const betterlx = lx <= rx
        // const dx = lx + rx
        // const nx = betterlx ? x1 : x2
        // console.log('nx - left', x1, lx, lxi, 'nx - right', x2, rx, rxi, '->', dx, nx)
        if (dx < minx) {
            minx = dx
            x = nx
        } else if (dx === minx) {
            x = Math.min(x, nx)
        }
        // const lyi = binarySearch(0, i - 1, x => y2sorted[x][3] < y1)
        // const ryi = binarySearch(i + 1, arr.length - 1, x => y1sorted[x][1] <= y2)
        // const ly = (lyi + 1) * y1 - (lyi >= 0 ? sum[3][lyi] : 0)
        // const ry = sum[1][ryi] - (arr.length - 1 - ryi) * x2
        // const betterly = ly <= ry
        // const dy = ly + ry
        // const ny = betterly ? y1 : y2
        const ldy = cal(sum, y1sorted, y2sorted, 1, 3, y1, i)
        const rdy = cal(sum, y1sorted, y2sorted, 1, 3, y2, i)
        const dy = ldy <= rdy ? ldy : rdy
        const ny = ldy <= rdy ? y1 : y2
        // // console.log('ny - left', y1, ly, lyi, 'ny - right', y2, ry, ryi, '->', dy, ny)
        if (dy < miny) {
            miny = dy
            y = ny
        } else if (dy === miny) {
            y = Math.min(y, ny)
        }
    })
    return x + ' ' + y
}
function cal(sum, x1sorted, x2sorted, ix1, ix2, x, cur) {
    const n = x1sorted.length
    const il = binarySearch(0, n - 1, i => x2sorted[i][ix2] < x)
    const left = x * (il + 1) - (sum[ix2][il] || 0)
    const ir = binarySearch(0, n - 1, i => x1sorted[i][ix1] <= x) + 1
    const right = (sum[ix1][ir] || 0) - x * (n - ir)
    // console.log('cal', x, [left, il], [right, ir])
    // console.log('sb', cur + 1, n - 1)
    return left + right
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
