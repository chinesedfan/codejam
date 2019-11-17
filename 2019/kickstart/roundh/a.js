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
        var n = tokens[0];
        var cs = lines[l++].split(' ').map((x) => +x);
        console.log('Case #%d: %s', i + 1, solve(cs));
    }
});

function solve(cs) {
    var h = 0;
    return cs.map((n, i) => {
        var c = 0;
        for (var j = 0; j <= i; j++) {
            if (cs[j] >= h + 1) c++;
        }
        if (c >= h + 1) {
            h = h + 1;
        }
        return h;
    }).join(' ');
}
