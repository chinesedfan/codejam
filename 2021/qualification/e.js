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
    // correct rate for each question
    const qp = []
    for (let i = 0; i < lines[0].length; i++) {
        let correct = 0
        lines.forEach(line => {
            if (line[i] === '1') correct++
        })
        qp[i] = {
            q: i,
            p: correct / lines[0].length
        }
    }
    // the easiest question has the highest p
    qp.sort((a, b) => b.p - a.p)

    const map = {}
    qp.forEach(({ q }, i) => {
        map[q] = i
    })

    // index sum of right questions for each player
    const cp = lines.map((line, idx) => {
        let sum = 0
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '1') {
                sum += map[i]
            }
        }
        return {
            idx: idx + 1,
            sum
        }
    })
    return cp.sort((a, b) => b.sum - a.sum)[0].idx
        // .slice(0, 10)
        // .map(o => JSON.stringify(o))
}

function expected(diff) {
    return 1 / (1 + Math.pow(Math.E, -diff))
}
