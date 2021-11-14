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
        const str = lines[l++]
        const chs = lines[l++]
        output[i] = 'Case #' + (i + 1) + ': ' + solve(str, chs)
    }
    console.log(output.join('\n'))
// })()
})

function solve(str, chs) {
    let ans = 0
    for (let i = 0; i < str.length; i++) {
        const x = str.charCodeAt(i)
        let cur = Infinity
        for (let j = 0; j < chs.length; j++) {
            const y = chs.charCodeAt(j)
            let d = Math.abs(x - y)
            if (26 - d < d) d = 26 - d
            cur = Math.min(cur, d)
        }
        ans += cur
    }
    return ans
}
