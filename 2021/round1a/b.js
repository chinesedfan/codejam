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
        var n = +lines[l++];
        var ps = lines.slice(l, l + n).map(str => str.split(' ').map(Number))
        console.log('Case #%d: %s', i + 1, solve(n, ps));
        l += n
    }
});

function solve(n, ps) {
    const sum = ps.reduce((s, [p, c]) => s + BigInt(p * c), 0n)
    const lower = sum - 60n * 499n
    for (let i = sum; i >= lower; i--) {
        if (able(ps, sum, i)) return i.toString()
    }
    return 0
}

function getPrimes() {
    const str = '2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97 101 103 107 109 113 127 131 137 139 149 151 157 163 167 173 179 181 191 193 197 199 211 223 227 229 233 239 241 251 257 263 269 271 277 281 283 293 307 311 313 317 331 337 347 349 353 359 367 373 379 383 389 397 401 409 419 421 431 433 439 443 449 457 461 463 467 479 487 491 499'
    return str.split(' ').map(x => BigInt(+x))
}
function able(ps, sum, target) {
    const primes = getPrimes()
    const ds = {}
    let x = target
    for (let i = 0; i < primes.length; i++) {
        const p = primes[i]
        if (p > x) break

        while ((x % p) === 0n) {
            x /= p
            ds[p] = (ds[p] || 0) + 1
        }
    }
    if (x !== 1n) return false

    let rest = 0n
    for (let i = 0; i < ps.length; i++) {
        const [p, c] = ps[i]
        if (ds[p]) {
            if (ds[p] > c) return false
            rest += BigInt(p) * BigInt(c - ds[p])
            delete ds[p]
        } else {
            rest += BigInt(p) * BigInt(c)
        }
    }
    if (Object.keys(ds).length !== 0) return false
    return rest === target
}
