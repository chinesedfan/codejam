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
        let changed = false
        for (let j = 0; j <= 9; j++) {
            const j2 = (j + 1) % 10
            const jn = (j + 2) % 10
            const next = [cur[0]]
            for (let i = 1; i < cur.length; i++) {
                if (cur[i - 1] === j && cur[i] === j2) {
                    next[next.length - 1] = jn
                    changed = true
                } else {
                    next.push(cur[i])
                }
            }
            cur = next
            // console.log(cur)
        }
        if (!changed) break
        // console.log(next)
    }
    return cur.join('')
}
