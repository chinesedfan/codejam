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

function* solve(n, k) {
    const visited = {}
    const adj = {}
    let asked = 0
    while (asked < k) {
        let u, d
        ;[u, d] = yield* read()
        while (!visited[u]) {
            visited[u] = d
            if (asked >= k) break
            //
            walk()
            asked++
            const v = u
            ;[u, d] = yield* read()
            // addEdge(u, v)
            adj[u] = adj[u] || {}
            adj[v] = adj[v] || {}
            adj[u][v] = 1
            adj[v][u] = 1
        }
        if (asked >= k) break
        //
        let found = false
        for (let v = 1; v <= n; v++) {
            if (!visited[v]) {
                found = true
                teleport(v)
                asked++
                break
            }
        }
        if (!found) break
    }
    //
    let unknown = 0 // unknown vertice
    let missing = 0 // missing edges
    let total = 0
    for (let u = 1; u <= n; u++) {
        if (visited[u]) {
            missing += visited[u] - Object.keys(adj[u] || {}).length
            total += visited[u]
        } else {
            unknown++
        }
    }
    const min = Math.ceil(total / 2) + unknown - (missing % 2)
    const max = Math.ceil(total / 2) + unknown * (unknown + 1) / 2
debug('solve:', visited)
debug('solve:', missing, unknown, '-', min, max)
    estimate(Math.floor((min + max) / 2))
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
