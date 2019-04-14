var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var t, c;
var n, m;
var ipts = [];
var skip = false;

var ps = [5,7,9,11,13,16,17];
var pi = 0;

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
            console.log(printSame(ps[pi++]));
        } else {
            var key = ipts.map(countRet).map((bc, bi) => bc % ps[bi]);
            console.log(find(key));

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
function find(key) {
    for (var i = 1; i <= 1000000; i++) {
        var ok = true;
        for (var j = 0; j < ps.length; j++) {
            if ((i % ps[j]) != key[j]) {
                ok = false;
                break;
            }
        }

        if (ok) return i;
    }
    return -1;
}
