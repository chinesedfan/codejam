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
        const [n, k] = lines[l++].trim().split(' ').map(Number)
        const arr = lines[l++].trim().split(' ').map(Number)
        output[i] = `Case #${i + 1}: ` + solve(n, k, arr)
    }
    console.log(output.join('\n'))
// })()
})

function solve(n, k, arr) {
    const sum = []
    for (let i = 0; i < arr.length; i++) {
        sum[i] = i ? arr[i] + sum[i - 1] : arr[i]
    }
    // console.log(sum)
    const f = (i, x) => sum[x] - (i ? sum[i - 1] : 0)

    let min = Infinity
    for (let i = 0; i <= k; i++) {
        const ra = getRange(arr, 0, arr.length, i, f)
        if (!ra) continue

        const [l, r] = ra
        if (i === k && r - l + 1 < min) {
            min = r - l + 1
        }
        const rb = getRange(arr, r + 1, arr.length, k - i, f)
        if (!rb) continue

        const [l2, r2] = rb
        const c = r - l + 1 + r2 - l2 + 1
        if (c < min) min = c
    }
    return min === Infinity ? -1 : min
}
function getRange(arr, begin, end, k, f) {
    let ans
    let min = Infinity
    for (let i = begin; i < end; i++) {
        const idx = binarySearch(i, end - 1, x => {
            return f(i, x) < k
        }) + 1
        // console.log(`found ${k}, [${i}, ${idx}]`)
        const len = idx - i + 1
        if (f(i, idx) === k && (!ans || len < min)) {
            ans = [i, idx]
            min = len
        }
    }
    return ans
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
