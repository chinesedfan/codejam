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
    lines[l++];
    for (var i = 0; i < t; i++) {
        console.log('Case #%d: %s', i + 1, solve(lines.slice(l, l + 100)));
        l += 100;
    }
});

// var fs = require('fs');
// var _ = require('lodash');

// var args = process.argv.slice(2);
// (function() {
//     var lines = fs.readFileSync(args[0]).toString().split('\n');
//     var t = parseInt(lines[0]);
//     var l = 1;
//     lines[l++];
//     for (var i = 0; i < t; i++) {
//         console.log('Case #%d: %s', i + 1, solve(lines.slice(l, l + 100)));
//         l += 100;
//     }
// })();

function solve(lines) {
    // correct rate for each player
    const cp = lines.map((line, idx) => {
        let correct = 0
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '1') correct++
        }
        return {
            idx: idx + 1,
            p: correct / line.length
        }
    })
    return cp.sort((a, b) => b.p - a.p)[0].idx
}

function expected(diff) {
    return 1 / (1 + Math.pow(Math.E, -diff))
}
