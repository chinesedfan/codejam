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
        const [n, d, c, m] = lines[l++].trim().split(' ').map(Number)
        const str = lines[l++]
        output[i] = `Case #${i + 1}: ` + solve(n, d, c, m, str)
    }
    console.log(output.join('\n'))
// })()
})

function solve(n, d, c, m, str) {
    let i = 0
    for (; i < str.length; i++) {
        if (str[i] === 'C') {
            if (c) {
                c--
            } else {
                break
            }
        } else {
            if (d) {
                d--
                c += m
            } else {
                return 'NO'
            }
        }
    }
    for (; i < str.length; i++) {
        if (str[i] === 'D') return 'NO'
    }
    return 'YES'
}
