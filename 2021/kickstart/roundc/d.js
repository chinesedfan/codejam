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
        const n = +lines[l++]
        console.log('Case #%d: %s', i + 1, solve(n, lines.slice(l, l + n)));
        l += n
    }
});

let K
const FNS = [1].map(() => {
    const cache = {}
    return (a, b) => {
        const key = a + '#' + b
        if (!(key in cache)) cache[key] = rn()
        return cache[key]
    }
})
const FMAP = {
    '+': (a, b) => a + b,
    '*': (a, b) => a * b,
    '#': (a, b) => FNS[K](a, b),
}
function solve(n, exps) {
    const roots = exps.map(parse)

    K = FNS.length
    const hashes = []
    while (K--) {
        roots.forEach((r, i) => {
            hashes[i] = hashes[i] || []
            hashes[i].push(postTravel(r))
        })
    }

    const groups = []
    let g = 1
    const visited = {}
    hashes.forEach(h => {
        h = h.join(',')
        if (visited[h]) {
            groups.push(visited[h])
        } else {
            visited[h] = g
            groups.push(g++)
        }
    })
    return groups.join(' ')
}

function parse(str) {
    let root, cur, parent
    let pos
    const stack = []
    for (let i = 0; i < str.length; i++) {
        switch (str[i]) {
        case '(':
            if (cur) stack.push(cur)
            cur = {}
            if (!root) root = cur
            pos = i
            break
        case ')':
            if (str[i - 1] !== ')') {
                cur.right = str.slice(pos + 1, i)
            }
            if (!stack.length) break
            parent = stack.pop()
            if (parent.left) {
                parent.right = cur
            } else {
                parent.left = cur
            }
            cur = parent
            break
        case '+':
        case '*':
        case '#':
            cur.op = str[i]
            if (str[i - 1] !== ')') {
                cur.left = str.slice(pos + 1, i)
            }
            pos = i
            break
        default:
            break
        }
    }
    return root || str
}
function postTravel(root) {
    if (isString(root)) return BigInt(root)
    root.poped = false

    const stack = [root]
    while (stack.length) {
        const cur = stack.pop()
        if (cur.poped || isString(cur.left) && isString(cur.right)) {
            cur.val = cal(cur)
        } else {
            cur.poped = true
            stack.push(cur)
            if (!isString(cur.left)) {
                cur.left.poped = false
                stack.push(cur.left)
            }
            if (!isString(cur.right)) {
                cur.right.poped = false
                stack.push(cur.right)
            }
        }
    }
    return root.val
}

function isString(str) {
    return typeof str === 'string'
}
function cal({ op, left, right }) {
    return FMAP[op](
        isString(left) ? BigInt(left) : left.val,
        isString(right) ? BigInt(right) : right.val
    )
}

function rn() {
    const x = Math.ceil(Math.random() * (1e9 + 7));
    return BigInt(x)
}
