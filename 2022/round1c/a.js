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
        const n = +lines[l++]
        const arr = lines[l++].trim().split(' ')
        console.log('Case #%d: %s', i + 1, solve(n, arr));
    }
// })()
})

function help(arr, use, r) {
    const ans = []
    ans.push(arr[r])
    use[r] = 1
    let first = arr[r][0]
    let last = arr[r].slice(-1)
    while (1) {
        let ok = false
        for (let i = 0; i < arr.length; i++) {
            if (use[i]) continue
            const s = arr[i]
            if (s[0] === last) {
                ans.push(s)
                last = s.slice(-1)
                ok = true
                use[i] = 1
                break
            } else if (s.slice(-1) === first) {
                ans.unshift(s)
                first = s[0]
                ok = true
                use[i] = 1
                break
            }
        }
        if (!ok) break
    }
    return ans
}
function solve(n, arr) {
    let ans = []
    const use = {}
    for (let i = 0; i < arr.length; i++) {
        if (!use[i]) {
            const temp = help(arr, use, i)
            ans = ans.concat(temp)
        }
    }
    if (ans.length !== n) return 'IMPOSSIBLE'

    const output = ans.join('')
    const chs = {}
    let p
    for (let i = 0; i < output.length; i++) {
        const x = output[i]
        if (x !== p) {
            if (chs[x]) return 'IMPOSSIBLE'
            chs[x] = 1
        }
        p = x
    }
    return output
}
