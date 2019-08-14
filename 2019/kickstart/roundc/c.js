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
        var tokens = lines[l++].split(' ').map((x) => +x);
        console.log('Case #%d: %s', i + 1, solve(tokens[0], tokens[1],
            lines[l++].split(' ').map((x) => +x),
            lines[l++].split(' ').map((x) => +x)
        ));
    }
});

function solve(N, K, dogs, colors) {
    var m = {}; // color -> [d]
    for (var i = 0; i < N; i++) {
        var c = colors[i];
        m[c] = m[c] || [];
        m[c].push(dogs[i]);
    }
    var cs = Object.keys(m);

    var d = [];
    for (var i = 0; i < cs.length; i++) {
        d[i] = [];
        m[cs[i]].sort((a, b) => a - b); // sort!
        for (var j = 0; j <= K; j++) {
            var a = Infinity;
            var b = Infinity;
            for (var k = 0; k <= m[cs[i]].length; k++) { // observe k dogs of color i
                var prev;
                if (k < j) {
                    prev = i == 0 ? [Infinity, Infinity] : d[i - 1][j - k];
                } else if (k == j) {
                    prev = i == 0 ? [0, 0] : d[i - 1][j - k];
                } else {
                    break;
                }

                var id = k == 0 ? 0 : m[cs[i]][k - 1];

                a = Math.min(a, prev[0] + 2 * id);
                b = Math.min(b, prev[0] + id, prev[1] + 2 * id);
            }
            d[i][j] = [a, b];
        }
    }

    return d[cs.length - 1][K][1];
}
