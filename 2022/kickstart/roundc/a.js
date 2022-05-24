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

function solve(str) {
    let upper = 0
    let lower = 0
    let digit = 0
    let special = 0
    for (let i = 0; i < str.length; i++) {
        const x = str[i]
        if (/[A-Z]/.test(x)) upper = 1
        if (/[a-z]/.test(x)) lower = 1
        if (/[0-9]/.test(x)) digit = 1
        if (/[#@*&]/.test(x)) special = 1
    }
    if (!upper) str += 'A'
    if (!lower) str += 'a'
    if (!digit) str += '0'
    if (!special) str += '#'
    if (str.length < 7) str += Array(7 - str.length).fill('a').join('')
    return str
}
