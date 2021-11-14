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
        output[i] = 'Case #' + (i + 1) + ': ' + solve(str)
    }
    console.log(output.join('\n'))
// })()
})

function solve(str) {
    let cur = str.split('').map(Number)
    while (1) {
        const next = [cur[0]]
        let changed = false
        for (let i = 1; i < cur.length; i++) {
            if (next[next.length - 1] + 1 === cur[i]) {
                next[next.length - 1] = (cur[i] + 1) % 10
                changed = true
            } else if (next[next.length - 1] === 9 && cur[i] === 0) {
                next[next.length - 1] = (1)
                changed = true
            } else {
                next.push(cur[i])
            }
        }
        if (!changed) break
        cur = next
        // console.log(next)
    }
    return cur.join('')
}
