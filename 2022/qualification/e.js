const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let debugFlag = 0
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
        const [n, k] = yield* read()
        yield* solve(n, k)
    }
    process.exit(0)
}

// inspired by https://codeforces.com/blog/entry/101509?#comment-901387
function* solve(n, k) {
    const half = Math.floor((k - 1) / 2)
    const visited = {}
    let u, d
    let sumT = 0
    let sumW = 0
    ;[u, d] = yield* read()
    // waste the first
    // sumT += d
    // visited[u] = 1
    for (let i = 0; i < half; i++) {
        walk()
        ;[u, d] = yield* read()
        if (!visited[u]) {
            sumW += d
        }
        visited[u] = 1
        //
        teleport(rn(n))
        ;[u, d] = yield* read()
        sumT += d
        visited[u] = 1
    }
    const degree = sumT / half * n + sumW
    estimate(Math.floor(degree / 2))
}
function rn(n) {
    return Math.ceil(Math.random() * n);
}
function walk() {
    console.log('W')
}
function teleport(s) {
    console.log('T ' + s)
}
function estimate(e) {
    console.log('E ' + e)
}
function* read() {
    const input = yield 1
debug('read:', input)
    return input.trim().split(' ').map(Number)
}
function debug(...args) {
    if (debugFlag) console.log(...args)
}
