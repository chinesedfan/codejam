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

    // count of last x% failed questions for each player
    const parts = 35
    const cp = lines.map((line, idx) => {
        const failed = Array(parts).fill(0)
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '0') {
                failed[Math.ceil(map[i] / (1e4 / parts)) - 1]++
            }
        }
        failed.sort((a, b) => a - b)
        return {
            idx: idx + 1,
            k: findK(failed.map((x, i) => ({x: i, y: x})))
        }
    }).sort((a, b) => a.k - b.k)
    return cp[0].idx
}

function findK(points) {
    let sx, sy, sx2, sxy
    sx = sy = sx2 = sxy = 0
    points.forEach(({ x, y }) => {
        sx += x
        sy += y
        sx2 += x * x
        sxy += x * y
    })
    const avgx = sx / points.length
    const avgy = sy / points.length
    return (sxy - avgx * avgy * points.length) / (sx2 - avgx * avgx * points.length)
}

function expected(diff) {
    return 1 / (1 + Math.pow(Math.E, -diff))
}
