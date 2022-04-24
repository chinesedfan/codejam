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
        console.log('Case #%d: %s', i + 1, solve(n));
    }
// })()
})

function solve(n) {
    const limit = Math.floor(Math.sqrt(n))
    let ans = 0
    for (let i = 1; i <= limit; i++) {
        if (!(n % i)) {
            const a = i
            const b = n / i
            if (a === b) {
                if (isp(a)) ans++
            } else {
                if (isp(a)) ans++
                if (isp(b)) ans++
            }
        }
    }
    return ans
}

function isp(n) {
    const s = String(n)
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== s[s.length - 1 - i]) return false
    }
    return true
}
