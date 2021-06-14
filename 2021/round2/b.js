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
    for (var i = 0; i < t; i++) {
        var n = +lines[l++]
        console.log('Case #%d: %s', i + 1, solve(n));
    }
});

// const PRIMES = primes(1e6)
const FACTORS = {}
function solve(n) {
    // f(i, n) = 1 + max(f(d, n - d))
    // `i` is the largest one's sides, and `d` is divider of `i`
    const dp = []
    for (let i = 3; i <= n; i++) {
        dp[i] = {}
        dp[i][i] = 1
    }
    for (let i = 3; i <= n; i++) {
        for (let j = i + i; j <= n; j += i) {
            Object.keys(dp[i]).forEach(k1 => {
                k1 = +k1
                const k2 = j
                if (k1 + k2 > n) return
                dp[j][k1 + k2] = Math.max(dp[j][k1 + k2] || 1, 1 + dp[i][k1])
            })
        }
    }
    
    let max = 1
    for (let i = 3; i <= n; i++) {
        max = Math.max(max, dp[i][n] || 1)
    }
    return max
}

function getUniqFactors(num) {
    const factors = []

    let n = num
    PRIMES.some(p => {
        let flag = true
        while (!(n % p)) {
            n /= p
            if (flag) {
                flag = false
                factors.push(p)
            }
            if (n === 1) return true
        }
        return false
    })
    return factors
}
function getDiffSubs(num) {
    const result = []
    const factors = FACTORS[num] = FACTORS[num] || getUniqFactors(num)
    if (factors.length === 1 && factors[0] === num) return [[num]]

    factors.forEach(f => {
        const after = num / f
        if (after < 3) return

        getDiffSubs(after).forEach(subs => {
            result.push([num, ...subs])
        })
    })
    if (!result.length) return [[num]]
    return result
}
function countValid(subsList, n) {
    return subsList.reduce((c, subs) => {
        return Math.max(c, isValid(subs, n))
    }, 0)
}
function isValid(subs, n) {
    let max = 0
    const limit = Math.pow(2, subs.length)
    for (let i = 0; i < limit; i++) {
        let sum = 0
        let count = 0
        for (let j = 0; j < subs.length; j++) {
            if (i & (1 << j)) {
                sum += subs[j]
                count++
            }
        }
        if (sum === n) max = Math.max(max, count)
    }
    return max
}
function getArranges(arr) {
    if (arr.length === 1) return [arr]
    return getArranges(arr.slice(1))
        .reduce((all, other) => {
            all.push([arr[0], ...other])
            return all
        }, [])
}
function primes(n) {
    const flag = Array(n + 1).fill(true)
    flag[0] = false
    flag[1] = false

    const limit = Math.floor(Math.sqrt(n))
    for (let i = 2; i <= limit; i++) {
        for (let j = i * i; j <= n; j += i) {
            flag[j] = false
        }
    }

    const ps = []
    for (let i = 2; i <= n; i++) {
        if (flag[i]) ps.push(i)
    }
    return ps
}
