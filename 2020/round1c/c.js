var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var lines = [];
rl.on('line', function (input) {
    lines.push(input);
});
rl.on('close', function () {
    var t = parseInt(lines[0]);
    var l = 1;
    for (var i = 0; i < t; i++) {
        var tokens = lines[l++].split(' ');
        console.log('Case #%d: %s', i + 1, solve(+tokens[0], +tokens[1], lines[l++].split(' ').map(x => +x)));
    }
});

function solve(n, d, ss) {
    ss.sort((a, b) => b - a); // dec

    if (d === 2) {
        return hasSame(ss) ? 0 : 1;
    } else if (d === 3) {
        if (hasThree(ss)) return 0;

        if (hasSame(ss)) {
            var map = {};
            var hasLarger = ss.some((s, i) => {
                if (map[s]) {
                    return i > 1;
                } else {
                    map[s] = 1;
                    return false;
                }
            });
            return hasLarger ? 1 : 2;
        } else {
            // distinct with each other
            return hasTwice(ss) ? 1 : 2;
        }
    }
}

function hasSame(ss) {
    var map = {};
    return ss.some(s => {
        if (map[s]) {
            return true;
        } else {
            map[s] = 1;
            return false;
        }
    });
}
function hasTwice(ss) {
    var map = {};
    return ss.some(s => {
        if (map[s * 2]) {
            return true;
        } else {
            map[s] = 1;
            return false;
        }
    });
}
function hasThree(ss) {
    var map = {};
    return ss.some(s => {
        map[s] = map[s] || 0;
        map[s]++;
        return map[s] === 3;
    });
}
