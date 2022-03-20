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
    const ps = []
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '?') ps.push(i)
    }
    const chs = str.split('')
    const limit = Math.pow(2, ps.length)
    for (let i = 0; i < limit; i++) {
        const after = chs.slice()
        for (let j = 0; j < ps.length; j++) {
            if (i & (1 << j)) {
                after[ps[j]] = '1'
            } else {
                after[ps[j]] = '0'
            }
        }
        if (cal(after) < 5) return 'POSSIBLE'
        // console.log(after.join(''), cal(after))
    }
    return 'IMPOSSIBLE'
}
function cal(arr) {
    let ans = 1
    const dp = []
    for (let step = 2; step <= arr.length; step++) {
        dp[step] = []
        for (let i = 0; i + step - 1 < arr.length; i++) {
            if (arr[i] === arr[i + step - 1]) {
                if (step <= 3) {
                    dp[step][i] = step
                } else {
                    dp[step][i] = dp[step - 2][i + 1] + 2
                }
            } else {
                dp[step][i] = -Infinity
            }
            ans = Math.max(ans, dp[step][i])
        }
    }
    return ans
}
