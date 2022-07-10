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
        l++
        const sa = lines[l++].trim().split(' ').map(Number)
        l++
        const sb = lines[l++].trim().split(' ').map(Number)
        const k = +lines[l++]
        console.log('Case #%d: %s', i + 1, solve(sa, sb, k));
    }
// })()
})

function solve(sa, sb, k) {
    const s1 = cal(sa)
    const s2 = cal(sb)
    //
    let max = -Infinity
    for (let i = 0; i <= k; i++) {
        const j = k - i
        if (i > s1.length || j > s2.length) continue
        max = Math.max(max, helper(s1, i) + helper(s2, j))
    }
    return max
}
function cal(arr) {
    const sum = []
    for (let i = 0; i < arr.length; i++) {
        sum[i] = arr[i]
        if (i) sum[i] += sum[i - 1]
    }
    return sum
}
function helper(sum, k) {
    let max = -Infinity
    for (let i = 0; i <= k; i++) {
        const j = k - i
        const a = sum[i - 1] || 0
        const b = sum[sum.length - 1] - (sum[sum.length - j - 1] || 0)
        max = Math.max(max, a + b)
    }
    return max
}
