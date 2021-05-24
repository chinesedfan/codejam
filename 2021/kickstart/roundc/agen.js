var t = 10;

console.log(t);
while (t--) {
    var n = 5;
    var k = 5;
    console.log(n, k);

    var chs = []
    while (n--) {
        chs.push(getChar(rn(k)))
    }
    console.log(chs.join(''))
}

function rn(n) {
    return Math.ceil(Math.random() * n);
}
function getChar(i) {
    return String.fromCharCode('a'.charCodeAt(0) + rn(k) - 1)
}
