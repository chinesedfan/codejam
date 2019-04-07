var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var t, c;
var n, b, f;
var msgs, m;
var ipts = [];
var skip = false;

rl.on('line', function(input) {
    if (skip) {
        skip = false;
    } else if (typeof t === 'undefined') {
        t = +input;
        c = 0;
    } else if (typeof n === 'undefined') {
        c++;
        var tokens = input.split(' ');
        n = +tokens[0];
        b = +tokens[1];
        f = +tokens[2];

        msgs = createMsg(n);
        m = 0;
        ipts = [];
        console.log(msgs[m]);
    } else {
        ipts.push(input);

        f--;
        if (!f) {
            var ret = [];
            var pos = 0;
            for (var i = 0; i < n; i++) {
                var check = i % 16;
                if (pos < ipts[0].length) {
                    var str = ipts.map((s, j) => j < msgs.length ? s[pos] : '0');
                    if (parseInt(str.reverse().join(''), 2) == check) {
                        pos++;
                    } else {
                        ret.push(i);
                    }
                } else {
                    ret.push(i);
                }
            }
            console.log(ret.join(' '));

            n = undefined; // next case;
            skip = true; // skip result code
            if (c == t) process.exit();
        } else {
            m++;
            console.log(msgs[m] || msgs[0]);
        }
    }
});

function createMsg(num) {
    var grid = [];
    for (let i = 0; i < num; i++) {
        var bits = [];
        var x = i;
        while (x) {
            bits.push(x & 1);
            x >>= 1;
        }
        while (bits.length < 10) bits.push(0);
        grid.push(bits);
    }

    var ret = [];
    for (var i = 0; i < 4; i++) { // even F = 4!
        var msg = [];
        for (var j = 0; j < grid.length; j++) {
            msg.push(grid[j][i]);
        }
        ret.push(msg.join(''));
    }

    return ret;
}
