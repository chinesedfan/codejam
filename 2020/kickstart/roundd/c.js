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
        var tokens = lines[l++].split(' ');
        console.log('Case #%d: %s', i + 1, solve(
            +tokens[0], +tokens[1], +tokens[2],
            lines[l++].split(' ').map((x) => +x))
        );
    }
});

function solve(n, A, B, ps) {
    if (n === 1) ps = []; // split always creates an array with at least 1 element

    const ns = buildTree(ps);

    mark(ns, A, B)

    return cal(ns);
}

function buildTree(ps) {
    const ns = Array(ps.length + 1).fill(0).map((x, i) => ({
        children: [],
    }));
    ps.forEach((p, i) => {
        const nc = ns[i + 1];
        const np = ns[p - 1];
        nc.parent = np;
        np.children.push(nc);
    });

    return ns;
}
function mark(ns, A, B) {
    const q = [ns[0]];
    ns[0].ps = [];

    while (q.length) {
        const node = q.pop();
        if (node.visited) {
            node.c1++;
            node.c2++;

            if (A - 1 < node.ps.length) node.ps[A - 1].c1 += node.c1;
            if (B - 1 < node.ps.length) node.ps[B - 1].c2 += node.c2;
            delete node.ps;
        } else {
            node.visited = 1;
            node.c1 = 0;
            node.c2 = 0;

            const ps = [node].concat(node.ps || []); // parents, from near to far
            q.push(node);
            node.children.forEach(c => {
                c.ps = ps;
                q.push(c);
            });
        }
    }
}
function cal(ns) {
    let sum = 0;

    const q = [ns[0]];
    while (q.length) {
        const { c1, c2, children } = q.shift();
        // sum += 1 - (1 - c1 / ns.length) * (1 - c2 / ns.length);
        sum += (c1 + c2) * ns.length - c1 * c2;

        q.push(...children);
    }

    return sum / (ns.length * ns.length);
}
