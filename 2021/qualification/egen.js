var t = 50;
var p = 100;

var q = 1e4;
var qp = [];
for (var i = 0; i < q; i++) {
    qp[i] = Math.random() * 3 - 6
}

console.log(t);
console.log(86);

var ans = []
while (t--) {
    var cheater = rn(p)
    ans.push(`Case #${50 - t}: ${cheater}`)
    for (var i = 0; i < p; i++) {
        var isCheater = i + 1 === cheater
        var pp = Math.random() * 3 - 6
        var chs = []
        for (var j = 0; j < q; j++) {
            chs[j] = Math.random() <= expected(pp - qp[j]) ? '1' : '0'
            if (isCheater && Math.random() > 0.5) {
                chs[j] = '1'
            }
        }
        console.log(chs.join(''))
    }
}
require('fs').writeFileSync('e.ans.out', ans.join('\n') + '\n')

function expected(diff) {
    return 1 / (1 + Math.pow(Math.E, -diff))
}
function rn(n) {
    return Math.ceil(Math.random() * n);
}
