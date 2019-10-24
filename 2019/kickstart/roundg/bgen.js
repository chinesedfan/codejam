var t = 1;

console.log(t);
while (t--) {
    var n = rn(1000);
    var m = rn(1e15);
    console.log(n, m);

    var arr = [];
    while (n--) {
        arr.push(rn(1e15));
    }
    console.log(arr.join(' '));
}

function rn(n) {
    return Math.ceil(Math.random() * n);
}
