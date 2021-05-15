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

const PRIMES = primes(1e6)
function solve(n) {
    let max = 1
    for (let i = 3; i <= n; i++) {
        const subs = getSubs(i)
        const count = isValid(subs, n)
        if (count) {
            max = Math.max(max, count)
        }
    }
    return max
}

function getSubs(num) {
    const subs = [num]

    let n = num
    PRIMES.some(p => {
        while (!(n % p)) {
            n /= p
            if (n < 3) return true

            subs.push(n)
        }
        return false
    })
    return subs
}
function isValid(subs, n) {
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
        if (sum === n) return count
    }
    return 0
}
function primes(n) {
    const flag = Array(n + 1).fill(true)
    flag[0] = false
    flag[1] = false

    const limit = Math.floor(Math.sqrt(n))
    for (let i = 2; i <= limit; i++) {
        for (let j = i * 2; j <= n; j += i) {
            flag[j] = false
        }
    }

    const ps = []
    for (let i = 2; i <= n; i++) {
        if (flag[i]) ps.push(i)
    }
    return ps
}
