var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var t, c;
var n, m;
var ipts = [];
var skip = false;
var cache = mcache();

rl.on('line', function(input) {
    if (skip) {
        skip = false;
    } else if (typeof t === 'undefined') {
        var tokens = input.split(' ');
        t = +tokens[0];
        n = +tokens[1];
        m = +tokens[2];

        c = 0;
        console.log(printSame(2));
    } else {
        ipts.push(input.split(' ').map((x) => +x));
        if (ipts.length < 18 - 1) {
            console.log(printSame(ipts.length + 2));
        } else {
            var key = ipts.map(countRet).map((bc, bi) => bc % (bi + 2)).join('#');
            console.log(cache[key]);

            ipts = [];
            skip = true; // skip result code
            if (++c == t) process.exit();

            console.log(printSame(2));
        }
    }
});

function printSame(b) {
    return Array(18).fill(b).join(' ');
}
function countRet(bs) {
    return bs.reduce((sum, b) => sum + b, 0);
}
function mcache() {
    var m = {};
    for (var i = 1; i <= 365; i++) {
        var rs = [];
        for (var j = 2; j <= 18; j++) {
            rs.push(i % j);
        }

        var k = rs.join('#');
        // if (m[k]) throw Error(i);
        m[k] = i;
    }
    return m;
}
