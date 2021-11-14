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
    let r = 'ROPA'.indexOf(str[0]) >= 0
    let y = 'YOGA'.indexOf(str[0]) >= 0
    let b = 'BPGA'.indexOf(str[0]) >= 0
    let ans = [r, y, b].filter(Boolean).length
    for (let i = 1; i < str.length; i++) {
        const ch = str[i]
        switch (ch) {
        case 'U':
            r = 0
            y = 0
            b = 0
            break
        case 'R':
            if (!r) ans++
            r = 1
            y = 0
            b = 0
            break
        case 'Y':
            if (!y) ans++
            r = 0
            y = 1
            b = 0
            break
        case 'B':
            if (!b) ans++
            r = 0
            y = 0
            b = 1
            break
        case 'O':
            if (!r) ans++
            if (!y) ans++
            r = 1
            y = 1
            b = 0
            break
        case 'P':
            if (!r) ans++
            if (!b) ans++
            r = 1
            y = 0
            b = 1
            break
        case 'G':
            if (!y) ans++
            if (!b) ans++
            r = 0
            y = 1
            b = 1
            break
        case 'A':
            if (!r) ans++
            if (!y) ans++
            if (!b) ans++
            r = 1
            y = 1
            b = 1
            break
        }
    }
    return ans
}
