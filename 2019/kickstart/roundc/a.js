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
        console.log('Case #%d: %s', i + 1, solve(tokens[1], tokens[2], tokens[3], tokens[4], lines[l++]));
    }
});

function solve(r, c, sr, sc, instrs) {
    var visited = {};
    var p = {
        r: sr,
        c: sc
    };
    visited[key(p)] = 1;
    for (var i = 0; i < instrs.length; i++) {
        var ch = instrs[i];
        switch (ch) {
        case 'N':
            p.r--;
            while (visited[key(p)]) p.r--;
            visited[key(p)] = 1;
            break;
        case 'E':
            p.c++;
            while (visited[key(p)]) p.c++;
            visited[key(p)] = 1;
            break;
        case 'W':
            p.c--;
            while (visited[key(p)]) p.c--;
            visited[key(p)] = 1;
            break;
        case 'S':
            p.r++;
            while (visited[key(p)]) p.r++;
            visited[key(p)] = 1;
            break;
        }
    }

    return p.r + ' ' + p.c;
}
function key(p) {
    return p.r + '#' + p.c;
}
