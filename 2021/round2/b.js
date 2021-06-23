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

// inspired by @tourist, with explaination by @Thallium54,
// https://blog.tgc-thallium.com/gcj2021_r2_matrygons/
const N_MAX = 1e6 + 10
const DP = precompute(N_MAX)
function precompute(n) {
    // n = k1 + k2 + ...
    // n = k * (1 + k1 + k2 + ...) = k * i
    // dp[i] means the sum is n / k
    // i = 1 + k1 + k2 + ...
    // i = 1 + k' * (k11 + k12 + ...)
    // dp[1 + k' * i] = max(1 + dp[i]), k' changes
    const dp = Array(n).fill(1)
    for (let i = 1; i < n; i++) {
        for (let j = 2 * i + 1; j < n; j += i) {
            dp[j] = Math.max(dp[j], dp[i] + 1)
        }
    }
    return dp
}
function solve(n) {
    let ans = 1
    for (let i = 3; i <= n; i++) {
        if (!(n % i)) {
            ans = Math.max(ans, DP[n / i])
        }
    }
    return ans
}

// useless but as future templates
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
