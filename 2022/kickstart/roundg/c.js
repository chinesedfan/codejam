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
        const arr = lines[l++].trim().split(' ').map(Number)
        output[i] = `Case #${i + 1}: ` + solve(n, arr)
    }
    console.log(output.join('\n'))
// })()
})

function ceilPow2(n) {
    let x = 0
    while ((1 << x) < n) x++
    return x
}
class SegTree {
    constructor(nOrArray, options) {
        const { op, e } = options
        this.op = op
        this.e = e
        const v = Array.isArray(nOrArray) ? nOrArray : Array(nOrArray).fill(0).map(() => e())

        const n = v.length
        const log = ceilPow2(n)
        const size = 1 << log
        const d = Array(2 * size)
        this.n = n
        this.log = log
        this.size = size
        this.d = d

        for (let i = 0; i < d.length; i++) {
            d[i] = e()
        }
        for (let i = 0; i < n; i++) {
            d[size + i] = v[i]
        }
        for (let i = size - 1; i >= 1; i--) {
            this.update(i)
        }
    }
    set(p, x) {
        p += this.size
        this.d[p] = x
        for (let i = 1; i <= this.log; i++) this.update(p >> i)
    }
    get(p) {
        return this.d[p + this.size]
    }
    prod(l, r) {
        const { size, d, op, e } = this
        let sml = e(), smr = e()
        l += size
        r += size

        while (l < r) {
            if (l & 1) sml = op(sml, d[l++])
            if (r & 1) smr = op(d[--r], smr)
            l >>= 1
            r >>= 1
        }
        return op(sml, smr)
    }
    allProd() {
        return this.d[1]
    }
    maxRight(l, f) {
        const { n, size, d, op, e} = this
        if (l == n) return n
        l += size
        let sm = e()
        do {
            while (l % 2 == 0) l >>= 1
            if (!f(op(sm, d[l]))) {
                while (l < size) {
                    l = (2 * l)
                    if (f(op(sm, d[l]))) {
                        sm = op(sm, d[l])
                        l++
                    }
                }
                return l - size
            }
            sm = op(sm, d[l])
            l++
        } while ((l & -l) != l)
        return n
    }
    minLeft(r, f) {
        if (r == 0) return 0
        const { size, d, op, e} = this
        r += size
        let sm = e()
        do {
            r--
            while (r > 1 && (r % 2)) r >>= 1
            if (!f(op(d[r], sm))) {
                while (r < size) {
                    r = (2 * r + 1)
                    if (f(op(d[r], sm))) {
                        sm = op(d[r], sm)
                        r--
                    }
                }
                return r + 1 - size
            }
            sm = op(d[r], sm)
        } while ((r & -r) != r)
        return 0
    }

    update(k) {
        const { d, op } = this
        d[k] = op(d[2 * k], d[2 * k + 1])
    }
}

function solve(n, arr) {
    const sum = Array(n)
    sum[0] = arr[0]
    for (let i = 1; i < arr.length; i++) {
        sum[i] = sum[i - 1] + arr[i]
    }
    const s2 = Array(n)
    s2[0] = sum[0]
    for (let i = 1; i < arr.length; i++) {
        s2[i] = s2[i - 1] + sum[i]
    }
    //
    const seg = new SegTree(sum, {
        op: Math.min,
        e: () => Infinity,
    })
    //
    let ans = 0n
    for (let i = 0; i < arr.length; i++) {
        const prev = (sum[i - 1] || 0)
        const j = seg.maxRight(i, x => x >= prev)
        if (j - 1 < i) continue
        const len = BigInt(j - 1 - i + 1)
        ans += BigInt(range(i, j - 1)) - len * BigInt(sum[i - 1] || 0)
    }
    return ans

    function range(l, r) {
        return s2[r] - (s2[l - 1] || 0)
    }
}
