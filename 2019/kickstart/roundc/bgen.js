var t = 5;

console.log(t);
while (t--) {
    var r = 10;
    var c = 10;
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
