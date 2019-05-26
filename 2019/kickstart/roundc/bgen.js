var t = 10;

console.log(t);
while (t--) {
    var r = 3;
    var c = 3;
    var k = rn(1000);
    console.log(r, c, k);
    while (r--) {
        var row = [];
        for (var i = 0; i < c; i++) {
            row.push(rn(1000));
        }
        console.log(row.join(' '));
    }
}

function rn(n) {
    return Math.ceil(Math.random() * n);
}
