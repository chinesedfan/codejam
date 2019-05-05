var t = 100;
var limit = 1000000000;

console.log(t);
while (t--) {
    var b = rn(limit);
    var c = rn(1000);
    var r = rn(c);
    console.log(r, b, c);

    while (c--) {
        var m = rn(limit);
        var s = rn(limit);
        var p = rn(limit);
        console.log(m, s, p);
    }
}

function rn(n) {
    return Math.ceil(Math.random() * n);
}
