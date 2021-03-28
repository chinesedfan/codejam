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

    // correct count of each player
    const qcount = 1e4
    const rate = 0.05
    const cp = lines.map((line, idx) => {
        let easy = 0
        let hard = 0
        let total = 0
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '0') continue

            if (map[i] < qcount * rate) {
                easy++
            }
            if (map[i] > qcount * (1 - rate)) {
                hard++
            }
            total++
        }
        return {
            idx: idx + 1,
            easy,
            hard,
            total,
        }
    }).sort((a, b) => a.total - b.total)

    const data = cp.map(({ idx, easy, hard, total }, i) => {
        const prev = i && cp[i - 1]
        const next = (i !== cp.length - 1) && cp[i + 1]
        const deasy = diff(prev, next, 'easy', easy)
        const dhard = diff(prev, next, 'hard', hard)
        return {
            idx,
            sum: deasy + dhard
        }
    }).sort((a, b) => b.sum - a.sum)
    return data[0].idx
}

function diff(prev, next, key, val) {
    const dprev = prev ? Math.abs(prev[key] - val) : 0
    const dnext = next ? Math.abs(next[key] - val) : 0
    if (prev && next) {
        return (dprev + dnext) / 2
    } else if (prev) {
        return dprev
    } else if (next) {
        return dnext
    } // else error
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
