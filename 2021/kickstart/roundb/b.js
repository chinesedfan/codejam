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
        l++
        var arr = lines[l++].split(' ').map(Number)
        console.log('Case #%d: %s', i + 1, solve(arr));
    }
});

function solve(arr) {
    let item
    const ds = []
    for (let i = 1; i < arr.length; i++) {
        let d = arr[i] - arr[i - 1]
        if (item && d === item.pd) {
            item.pc++
        } else {
            item = { pd: d, pc: i === 1 ? 2 : 1 }
            ds.push(item)
        }
    }

    let max = 2
    ds.forEach(({ pd, pc }, i) => {
        max = Math.max(max, Math.min(arr.length, pc + 1))

        if (i + 2 < ds.length
                && ds[i + 1].pd + ds[i + 2].pd === 2 * pd
                && ds[i + 1].pc === 1 && ds[i + 2].pc === 1) {
            const connected = pc + 2
                + (i + 3 < ds.length && ds[i + 3].pd === pd ? ds[i + 3].pc : 0)
            max = Math.max(max, connected)
        }
    })
    return max
}
