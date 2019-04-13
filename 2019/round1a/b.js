var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var t, c;
var n, m;
var ipts = [];
var skip = false;

var ps = [2,3,5,7,11,13,17];
var pi = 0;
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
        pi = 0;
        console.log(printSame(ps[pi++]));
    } else {
        ipts.push(input.split(' ').map((x) => +x));
        if (ipts.length < ps.length) {
            console.log(printSame(ipts.length + 2));
        } else {
            var key = ipts.map(countRet).map((bc, bi) => bc % ps[bi]).join('#');
            console.log(cache[key]);

            ipts = [];
            pi = 0;
            skip = true; // skip result code
            if (++c == t) process.exit();

            console.log(printSame(ps[pi++]));
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
    for (var i = 1; i <= 100000; i++) {
        var rs = [];
        for (var j = 0; j < ps.length; j++) {
            rs.push(i % ps[j]);
        }

        var k = rs.join('#');
        // if (m[k]) throw Error(i);
        m[k] = i;
    }
    return m;
}
