var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var t, c;
var n, b, f;
var parts;

rl.on('line', function(input) {
    if (typeof t === 'undefined') {
        t = +input;
        c = 0;
    } else if (typeof n === 'undefined') {
        c++;
        var tokens = input.split(' ');
        n = +tokens[0];
        b = +tokens[1];
        f = +tokens[2];

        parts = [{len: Math.ceil(n / 2)}, {len: Math.floor(n / 2)}];
        console.log(createMsg(parts));
    } else {
        var all = parts.every((p) => p.len == 1); // divided into units
        var beg = 0;
        var ch = '1';
        var nparts = [];
        // check results
        parts.forEach((p) => {
            var left = p.miss ? 0 : count(input, ch, beg, beg + p.len);
            beg += left;

            // only records all-missing part, other part can be counted
            if (p.len > 1) {
                nparts.push(
                    {len: Math.ceil(p.len / 2), miss: !left},
                    {len: Math.floor(p.len / 2), miss: !left}
                );
            } else {
                nparts.push({len: p.len, miss: !left});
            }
            ch = ch == '1' ? '0' : '1';
        });
        parts = nparts;

        f--;
        if (!f || all) {
            var ret = parts.reduce((arr, x, i) => {
                if (x.miss) arr.push(i);
                return arr;
            }, []).join(' ');
            console.log(ret);

            n = undefined; // next case;
        } else {
            console.log(createMsg(parts));
        }
    }
});

function createMsg(parts) {
    var m = [];
    var ch = '1';
    for (var i = 0; i < parts.length; i++) {
        for (var j = 0; j < parts[i].len; j++) {
            m.push(ch);
        }
        ch = ch == '1' ? '0' : '1';
    }
    return m.join('');
}
function count(str, ch, beg, end) { // [i, j)
    var rc = 0;
    for (var i = beg; i < end; i++) {
        if (str[i] === ch) rc++; else break;
    }
    return rc;
}
