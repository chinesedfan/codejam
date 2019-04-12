var t = 100;

console.log(t);
while (t--) {
    var r = rn(10);
    var c = rn(10);
    console.log(r, c);
    for (var i = 0; i < r; i++) {
        var chs = [];
        for (var j = 0; j < c; j++) {
            chs.push(Math.random() < 0.8 ? '0' : '1');
        }
        console.log(chs.join(''));
    }
}

function rn(n) {
    return Math.ceil(Math.random() * n);
}
