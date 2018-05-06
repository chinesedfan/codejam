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
        var n = parseInt(tokens[0]);
        var len = parseInt(tokens[1]);
        var words = lines.slice(l, l + n);
        l += n;
        console.log('Case #%d: %s', i + 1, solve(n, len, words));
    }
});

function solve(n, len, words) {
    var map = {};
    var letters = Array(len).fill(0).map(() => ({}));
    words.forEach((w) => {
        map[w] = 1;
        for (var i = 0; i < w.length; i++) {
            letters[i][w[i]] = 1;
        }
    });
    letters = letters.map((m) => Object.keys(m));

    var indexes = Array(len).fill(0);
    while (1) {
        var str = indexes.map((x, i) => letters[i][x]).join('');
        if (!map[str]) return str;

        var j = 0;
        while (j < len) {
            indexes[j]++;
            if (indexes[j] >= letters[j].length) {
                indexes[j] = 0;
                j++;
            } else {
                break;
            }
        }
        if (j >= len) break;
    }

    return '-';
}
