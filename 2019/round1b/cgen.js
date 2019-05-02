var t = 10;

console.log(t);
while (t--) {
    var n = rn(10);
    var k = rn(10);
    console.log(n, k);

    var cs = [];
    var ds = [];
    while (n--) {
        cs.push(rn(100));
        ds.push(rn(100));
    }
    console.log(cs.join(' '));
    console.log(ds.join(' '));
}

function rn(n) {
    return Math.ceil(Math.random() * n);
}
