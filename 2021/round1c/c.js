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
        console.log('Case #%d: %s', i + 1, solve(lines[l++].split(' ')));
    }
});

function solve([start, end]) {
    if (start === '0') {
        if (end === '0') return 0
        if (end === '1') return 1
        return 'IMPOSSIBLE'
    }
    const rstart = start.split('')
        .map(ch => ch === '0' ? '1' : '0')
        .join('')

    let i = -1
    let not = 0
    let min = Infinity
    while (i < start.length) {
        if (i === start.length - 1
            || start[i] !== start[i + 1]) {
            if (i >= 0) not++
            // the length of `start` after NOTs
            const l = start.length - i - 1
            if (l > end.length) {
                i++
                continue
            }

            const part = end.slice(0, l)
            const rest = end.slice(l)
            const isdiff = !l || l === end.length || end[l] !== end[l - 1]
            if (isdiff) {
                if (!(not & 1) && start.slice(i + 1) === part
                    || (not & 1) && rstart.slice(i + 1) === part) {
                    const gs = splitGroups(rest)
                    if (not >= gs.length) {
                        min = Math.min(
                            min,
                            not + rest.length
                        )
                    }
                }
            } else {
                const all = isAll(rest, l ? end[l - 1] : (not & 1) ? '1' : '0')
                if (all) {
                    min = Math.min(
                        min,
                        not + rest.length
                    )
                }
            }
        }
        i++
    }
    return min === Infinity ? 'IMPOSSIBLE' : min
}

function isAll(str, ch) {
    for (var i = 0; i < str.length; i++) {
        if (str[i] !== ch) return false
    }
    return true
}
function splitGroups(str) {
    var gs = []
    var item
    for (var i = 0; i < str.length; i++) {
        if (i) {
            if (str[i] === item.ch) {
                item.count++
            } else {
                item = { ch: str[i], count: 1 }
                gs.push(item)
            }
        } else {
            item = { ch: str[i], count: 1 }
            gs.push(item)
        }
    }
    return gs
}
