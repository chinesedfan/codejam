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
        const args = lines[l++].trim().split(' ').map(Number)
        const fns = lines.slice(l, l + 4).map(str => str.trim().split(' '))
        l += 4
        console.log('Case #%d: %s', i + 1, solve(args, fns));
    }
// })()
})

function solve(args, fns) {
    const [n, p, m, ar, ac] = args
    if (p) return 0 // remove for set 2
    let ans = 0
    let q = [[ar - 1, ac - 1, 0]]
    let k = 0
    const best = Array(n).fill(0)
        .map(() => Array(n).fill(0))
    while (k <= m) {
        const nq = []
        // console.log(q)
        for (let [r, c, coin] of q) {
            if (coin > ans) ans = coin
            if (r - 1 >= 0) { // n
                const v = cal(coin, fns[0])
                push(nq, [r - 1, c, v])
            }
            if (c + 1 < n) { // e
                const v = cal(coin, fns[1])
                push(nq, [r, c + 1, v])
            }
            if (c - 1 >= 0) { // w
                const v = cal(coin, fns[2])
                push(nq, [r, c - 1, v])
            }
            if (r + 1 < n) { // s
                const v = cal(coin, fns[3])
                push(nq, [r + 1, c, v])
            }
        }
        k++
        q = nq
    }
    function push(nq, [r, c, v]) {
        if (v > best[r][c]) {
            best[r][c] = v
            nq.push([r, c, v])
        }
    }
    return ans
}
function cal(v, [sign, x]) {
    x = +x
    switch (sign) {
    case '+': return v + x
    case '-': return v - x
    case '*': return v * x
    case '/': return Math.floor(v / x)
    }
}
