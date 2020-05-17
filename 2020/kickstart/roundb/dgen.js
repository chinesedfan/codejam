var t = 10;
var limit = 300;

console.log(t);
while (t--) {
    var w = rn(limit);
    var h = rn(limit);
    var r = rn(w);
    var l = rn(r);
    var d = rn(h);
    var u = rn(d);
    console.log(w, h, l, u, r, d);
}

function rn(n) {
    return Math.ceil(Math.random() * n);
}
