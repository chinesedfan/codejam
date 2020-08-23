var t = 10;

console.log(t);
while (t--) {
    var n = rn(100);
    var a = rn(n);
    var b = rn(n);
    console.log(n, a, b);

    var ps = [];
    while (n--) {
        ps.push(rn(n) + 1);
    }
    ps.pop();
    console.log(ps.join(' '));
}

function rn(n) {
    return Math.ceil(Math.random() * n);
}
