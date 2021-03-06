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
        const [n, q] = lines[l++].split(' ').map(Number)
        const ps = lines.slice(l, l + n - 1).map(str => str.split(' ').map(BigInt))
        l += n - 1
        const qs = lines.slice(l, l + q).map(str => str.split(' ').map(Number))
        l += q
        console.log('Case #%d: %s', i + 1, solve(ps, qs));
    }
});

function solve(ps, qs) {
    const nodes = buildTree(ps)

    qs = groupBy(qs)

    const result = []
    dfs(nodes[1], qs, result) // id -> [other node]
    return result.join(' ')
}
function updateResult(result, qs, id, ps) {
    const st = buildST(ps)
    let p = 0
    qs[id].sort((a, b) => a.l - b.l)
        .forEach(({i, l}) => {
            while (p < ps.length && l >= ps[p][1]) {
                updateST(st, p, ps[p][2])
                p++
            }
            result[i] = p ? st.v : 0
        })
}

function buildTree(ps) {
    const nodes = []
    ps.forEach(([a, b, l, t]) => {
        nodes[a] = nodes[a] || { id: a, ns: [] }
        nodes[b] = nodes[b] || { id: b, ns: [] }
        nodes[a].ns.push([nodes[b], l, t])
        nodes[b].ns.push([nodes[a], l, t])
    })
    return nodes
}
function dfs(r, qs, result) {
    const q = [[r, []]]
    while (q.length) {
        const cur = q.pop()
        let [node, ps, p] = cur
        if (node.idx === undefined) {
            if (qs[node.id]) {
                updateResult(result, qs, node.id, ps)
            }
            node.idx = 0
            if (node.idx < node.ns.length) {
                q.push(cur)
            }
        } else if (node.idx < node.ns.length) {
            let item = node.ns[node.idx++] // [node, l, t]
            if (p === item[0].id) {
                if (node.idx >= node.ns.length) continue
                item = node.ns[node.idx++]
            }
            if (node.idx < node.ns.length) {
                q.push(cur)
            }

            q.push([item[0], [...ps, item], node.id])
        }
    }
}

function groupBy(qs) {
    return qs.reduce((o, [id, l], i) => {
        o[id] = o[id] || []
        o[id].push({i, l})
        return o
    }, {})
}

function buildST(ns) { // [[node, l, t]]
    const arr = ns.sort((a, b) => Number(a[1] - b[1]))
        // FIXME: merge same l

    return createNode(arr, 0, arr.length - 1)
}
function createNode(arr, l, r) {
    const n = { l, r, v: 0 } // [node, l, t]
    if (l !== r) {
        const m = Math.floor((l + r) / 2)
        n.ln = createNode(arr, l, m)
        n.rn = createNode(arr, m + 1, r)
        n.v = gcd(n.ln.v, n.rn.v)
    }
    return n
}
function updateST(n, p, v) {
    const { l, r } = n
    if (l === r) {
        n.v = v
    } else {
        const m = Math.floor((l + r) / 2)
        if (p <= m) {
            updateST(n.ln, p, v)
        } else {
            updateST(n.rn, p, v)
        }
        n.v = gcd(n.ln.v, n.rn.v)
    }
}
function gcd(a, b) {
    if (a === 0) return b
    if (b === 0) return a
    if (!(isBig(a) && isBig(b))
        && (a > 1e15 || b > 1e15)) return parseInt(gcd(BigInt(a), BigInt(b)))

    while (a) {
        const r = b % a
        b = a
        a = r
    }
    return b
}
function isBig(n) {
    return Object.getPrototypeOf(n) === BigInt.prototype
}
