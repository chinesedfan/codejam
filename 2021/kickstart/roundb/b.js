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
            item = { pd: d, pc: 1 }
            ds.push(item)
        }
    }

    let max = 2
    ds.forEach(({ pd, pc }, i) => {
        max = Math.max(max, Math.min(arr.length, 1 + pc + 1))

        if (i + 2 < ds.length
                && ds[i + 1].pd + ds[i + 2].pd === 2 * pd
                && ds[i + 1].pc === 1) {
            let connected = 1 + pc + 2
            if (ds[i + 2].pc === 1
                && i + 3 < ds.length && ds[i + 3].pd === pd
            ) {
                connected += ds[i + 3].pc
            }
            max = Math.max(max, connected)
        }
    })
    // forward
    if (ds.length > 2
            && ds[0].pd + ds[1].pd === 2 * ds[2].pd
            && ds[1].pc === 1) {
        max = Math.max(max, 1 + ds[2].pc + 2)
    }
    return max
}
