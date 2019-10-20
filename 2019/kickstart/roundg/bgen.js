var t = 100;

console.log(t);
while (t--) {
    var n = rn(10);
    var m = rn(100);
    console.log(n, m);

    var arr = [];
    while (n--) {
        arr.push(rn(100));
    }
    console.log(arr.join(' '));
}

function rn(n) {
    return Math.ceil(Math.random() * n);
}
