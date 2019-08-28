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
        var n = +tokens[0];
        var m = +tokens[1];
        console.log('Case #%d: %s', i + 1, solve(
            n, m,
            lines.slice(l, l + m).map(str => str.split(' ').map((x) => +x)))
        );
        l += m;
    }
});

function solve(n, m, bs) {
    if (!bs.length) return 2 * (n - 1);

    var connected = []; // adjacency list
    var blacks = {};
    // set blacks
    bs.forEach((l) => {
        var a = l[0] - 1;
        var b = l[1] - 1;
        connected[a] = connected[a] || [];
        connected[b] = connected[b] || [];
        connected[a].push(b);
        connected[b].push(a);
        blacks[a] = 1;
        blacks[b] = 1;
    });

    // bfs
    var q = Object.keys(blacks);
    var visited = {};
    while (q.length) {
        var x = q.shift();
        if (visited[x]) continue;
        visited[x] = 1;

        q = q.concat(connected[x] || []);
    }

    var c = Object.keys(visited).length;
    return c - 1 + 2 * (n - c);
}
