var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var lines = [];
rl.on('line', function(input) {
    lines.push(input);
});
rl.on('close', function() {
    var t = parseInt(lines[0]);
    var l = 1;
    l++
    for (var i = 0; i < t; i++) {
        const [w, e] = lines[l++].split(' ').map(Number)
        console.log('Case #%d: %s', i + 1, solve(w, e));
    }
});

const DAYS = 60
function solve(w, e) {
    let max
    // count of r, s, p
    const dp = []
    for (let i = 0; i <= DAYS; i++) {
        dp[i] = []
        for (let j = 0; j <= DAYS; j++) {
            dp[i][j] = []
            for (let k = 0; k <= DAYS; k++) {
                const total = i + j + k
                if (total > DAYS) continue

                const counts = [
                    [i - 1, j, k],
                    [i, j - 1, k],
                    [i, j, k - 1],
                ]
                const options = ['R', 'S', 'P'].map((actual, ai) => {
                    const count = counts[ai]
                    const noPrev = count.some(x => x < 0)
                    const p = total === 0 ? 0 : noPrev ? -Infinity : ['R', 'S', 'P'].reduce((sum, expect, ei) => {
                        const c = count[(ei + 1) % 3]
                        const percent = total > 1 ? c / (total - 1) : 1 / 3
                        return sum + getTotalPoint(w, expect, actual, percent)
                    }, dp[count[0]][count[1]][count[2]].p)
                    return { actual, p, i, j, k }
                })
                options.sort((a, b) => b.p - a.p)
                dp[i][j][k] = options[0]

                if (total === DAYS && (!max || dp[i][j][k].p > max.p)) {
                    max = dp[i][j][k]
                }
            }
        }
    }

    let { i, j, k } = max
    const ans = []
    while (ans.length < DAYS) {
        const { actual } = dp[i][j][k]
        switch (actual) {
        case 'R': i--; break
        case 'S': j--; break
        case 'P': k--; break
        }
        ans.unshift(actual)
    }
    const str = ans.join('')
    // console.log(getExpectedPerDay(str, 50 * 10))
    return str
}

function getPoint(w, e, expect, actual) {
    if (expect === actual) return e
    if (expect === 'R') return actual === 'P' ? w : 0
    if (expect === 'S') return actual === 'R' ? w : 0
    if (expect === 'P') return actual === 'S' ? w : 0
    throw 'error'
}
function getTotalPoint(w, expect, actual, p) {
    let sum = 0
    sum += getPoint(w, w, expect, actual) * p
    sum += getPoint(w, w / 2, expect, actual) * p
    sum += getPoint(w, w / 10, expect, actual) * p
    sum += getPoint(w, 0, expect, actual) * p
    return sum
}

function getExpectedPerDay(str, w) {
    const counts = [
        { k: 'R', c: 0, e: 'P', a: 'S' },
        { k: 'S', c: 0, e: 'R', a: 'P' },
        { k: 'P', c: 0, e: 'S', a: 'R' },
    ]
    let sum = 0
    for (let i = 0; i < DAYS; i++) {
        const x = str[i]
        counts.forEach(item => {
            const p = i ? item.c / i : 1 / 3
            sum += getTotalPoint(w, item.e, x, p)
        })
        counts.forEach(item => {
            if (item.k === x) item.c++
        })
    }
    return sum / 4
}
