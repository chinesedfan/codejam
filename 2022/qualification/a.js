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
        const [r, c] = lines[l++].trim().split(' ').map(Number)
        console.log('Case #%d:\n%s', i + 1, solve(r, c));
    }
// })()
})

function solve(r, c) {
    const topRow = Array(c + 1).fill('+-')
    topRow[c] = '+'
    const topRowStr = topRow.join('')
    topRow[0] = '..'
    const firstTopRowStr = topRow.join('')
    //
    const middleRow = Array(c + 1).fill('|.')
    middleRow[c] = '|'
    const middleRowStr = middleRow.join('')
    middleRow[0] = '..'
    const firstMiddleRowStr = middleRow.join('')
// console.log(topRowStr, firstTopRowStr)
// console.log(middleRowStr, firstMiddleRowStr)
    //
    const grid = []
    for (let i = 0; i < r; i++) {
        grid[i * 2] = i ? topRowStr : firstTopRowStr
        grid[i * 2 + 1] = i ? middleRowStr : firstMiddleRowStr
    }
    grid[r * 2] = topRowStr
    return grid.join('\n')
}
