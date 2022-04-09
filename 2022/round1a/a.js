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
        const str = lines[l++]
        console.log('Case #%d: %s', i + 1, solve(str));
    }
// })()
})

function solve(str) {
    let now
    const ps = []
    for (let i = 0; i < str.length; i++) {
        const x = str[i]
        if (now && x === now.x) {
            now.c++
        } else {
            now = { x, c: 1}
            ps.push(now)
        }
    }
    //
    const ans = []
    for (let i = 0; i < ps.length; i++) {
        const item = ps[i]
        if (i < ps.length - 1 && ps[i].x < ps[i + 1].x) {
            ans.push(Array(item.c * 2).fill(item.x).join(''))
        } else {
            ans.push(Array(item.c).fill(item.x).join(''))
        }
    }
    return ans.join('')
}
