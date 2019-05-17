var fs = require('fs');

var args = process.argv.slice(2);
var goods = [
    '1111110', // 0
    '0110000',
    '1101101',
    '1111001',
    '0110011',
    '1011011', // 5
    '1011111',
    '1110000',
    '1111111',
    '1111011'
];

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    console.log('Case #%d: %s', i + 1, solve(
        lines[l++].split(' ').slice(1)
    ));
}

function solve(ss) {
    var cs = [];
    for (var i = 0; i < 128; i++) {
        for (var j = 0; j < 10; j++) {
            cs.push({
                n: j,
                c: i
            });
        }
    }

    for (var i = 0; i < ss.length; i++) {
        var nc = [];
        for (var j = 0; j < cs.length; j++) {
            var n = cs[j].n;
            var c = cs[j].c;
            if (merge(goods[n], c) === ss[i]) {
                cs[j].n = n ? n - 1 : 9;
                nc.push(cs[j]);
            }
        }
        if (nc.length) {
            cs = nc;
        } else {
            return 'ERROR!';
        }
    }

    if (cs.length === 1) {
        return merge(goods[cs[0].n], cs[0].c);
    } else {
        return 'ERROR!';
    }
}

function merge(s, c) {
    var mask = c.toString(2).split('').reverse(); // not broken ones

    var o = [];
    for (var i = 0; i < s.length; i++) {
        var a = s[i] === '1';
        var b = i < mask.length ? +mask[i] : 0;
        o[i] = a && b ? 1 : 0;
    }
    return o.join('');
}
