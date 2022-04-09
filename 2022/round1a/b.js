const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const g = main();
g.next()
rl.on('line', (input) => {
    // console.log('read', input)
    input.split('\n').forEach(s => s.trim() && g.next(s))
});

function* main() {
    let input

    input = yield 1
    const t = +input
    for (let i = 0; i < t; i++) {
        input = yield 1
        yield* solve(+input)
    }
    process.exit(0)
}

function* solve(n) {
    const power = []
    let p = 1
    for (let i = 0; i < 30; i++) {
        power[i] = p
        p *= 2
    }
    const fa = []
    const fb = []
    const fc = []
    for (let i = 0; i < 70; i++) {
        fc.push(514 + i * 2)
    }
    let f = 0
    for (let i = 0; i < 70; i += 2) {
        if (f & 1) {
            fa.push(fc[i])
            fb.push(fc[i + 1])
        } else {
            fa.push(fc[i + 1])
            fb.push(fc[i])
        }
        f++
    }
    fa[0]--
    fa[1]--
    const first = power.concat(fa).concat(fb)
    console.log(first.join(' '))
    //
    const other = yield* read()
    let sa = 0
    let sb = 0
    const pa = []
    const pb = []
    other.sort((a, b) => a - b)
        .forEach(x => {
            if (sa < sb) {
                sa += x
                pa.push(x)
            } else {
                sb += x
                pb.push(x)
            }
        })
    for (let i = power.length - 1; i >= 0; i--) {
        const x = power[i]
        if (sa < sb) {
            sa += x
            pa.push(x)
        } else {
            sb += x
            pb.push(x)
        }
    }
// check(pa.concat(fa), pb.concat(fb))
    console.log(pa.concat(fa).join(' '))
}
function check(a, b) {
    console.log('check', cal(a), cal(b))
}
function cal(arr) {
    return arr.reduce((s, x) => s + x, 0)
}

function* read() {
    const r = yield 1
    return r.split(' ').map(Number)
}
