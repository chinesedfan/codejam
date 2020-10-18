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
            +tokens[0],
            +tokens[1],
            lines[l++].split(' ').map((x) => +x)
        ));
    }
});

function solve(w, n, ns) {
    var min = Infinity
    // O(w^2)
    for (var i = 0; i < w; i++) {
        var sum = sumIfTarget(w, n, ns, ns[i])
        min = Math.min(min, sum)
    }
    return min
}

function sumIfTarget(w, n, ns, target) {
    var sum = 0
    for (var j = 0; j < w; j++) {
        var val = ns[j]
        if (target > val) {
            sum += Math.min(target - val, val + n - target)
        } else {
            sum += Math.min(val - target, target + n - val)
        }
    }
    return sum
}
