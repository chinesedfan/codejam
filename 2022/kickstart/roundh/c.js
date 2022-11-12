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
        const edges = lines.slice(l, l + n - 1).map(str => str.trim().split(' ').map(Number))
        l += n - 1
        output[i] = `Case #${i + 1}: ` + solve(n, arr, edges)
    }
    console.log(output.join('\n'))
// })()
})

function solve(n, arr, edges) {
    arr.unshift(0)
    //
    const adj = {}
    edges.forEach(([a, b]) => {
        adj[a] = adj[a] || []
        adj[b] = adj[b] || []
        adj[a].push(b)
        adj[b].push(a)
    })
    let r = 1
    const dp = Array(n + 1)
    for (let u = 1; u <= n; u++) {
        r = Math.max(r, dfs(adj, u, arr, dp))
    }
    return r
}
function dfs(adj, r, arr, dp) {
    const stack = [[r, 0, -1]]
    let c = 0
    while (stack.length) {
        const [u, i, p] = stack[stack.length - 1]
        // visited[u] = 1

        const nb = adj[u] || []
        if (!i) {
            // first visited
            c++
        }
        if (i < nb.length) {
            stack[stack.length - 1][1]++
            const v = nb[i]
            // if (!visited[v]) { // has circle
            if (v !== p && arr[u] > arr[v]) {
                if (dp[v]) {
                    c += dp[v]
                } else {
                    stack.push([v, 0, u])
                }
            }
        } else {
            // last visited
            stack.pop()
        }
    }
    dp[r] = c
    return c
}
