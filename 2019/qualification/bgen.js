var t = 100;

console.log(t);
while (t--) {
    var n = 2 + rn(5);
    console.log(n + 1);
    var chs = Array(n).fill('E');
    while (n--) {
        chs.splice(rn(chs.length), 0, 'S');
    }
    console.log(chs.join(''));
}

function rn(n) {
    return Math.ceil(Math.random() * n);
}
