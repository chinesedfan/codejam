var t = 100;

console.log(t);
while (t--) {
    var n = rn(1000);
    var r = 10;
    var c = 10;
    var sr = rn(r);
    var sc = rn(c);
    console.log(n, r, c, sr, sc);

    var row = [];
    while (n--) {
        row.push(' NEWS'[rn(4)]);
    }
    console.log(row.join(''));
}

function rn(n) {
    return Math.ceil(Math.random() * n);
}
