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
        const str = lines[l++]
        console.log('Case #%d: %s', i + 1, solve(str));
    }
// })()
})

/* Paste class Queue here, refer to https://codeforces.com/contest/1676/submission/156674022 */
/* Paste https://github.com/chinesedfan/road-to-red/blob/master/docs/algorithm/mod.md here */

function solve(str) {
    // let q = [[str, 0]]
    let q = new Queue()
    q.push([str, 0])
    let sum = 0
    let count = 0
    while (q.length) {
        // const nxt = []
        const nxt = new Queue()
        while (q.length) {
            const [s, w] = q.shift()
            const c = 1

            if (s.length === 1) {
                sum += (w + 1) * c
                count += c
                continue
            }
            for (let i = 0; i < s.length; i++) {
                const t = s.slice(0, i) + s.slice(i + 1)
                const nw = w + (isp(t) ? 1 : 0)
                nxt.push([t, nw])
            }
        }
        q = nxt
    }
    // console.log(sum, count)
    return mul(sum, pow(count, MOD - 2))
}
function isp(s) {
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== s[s.length - 1 - i]) return false
    }
    return true
}
