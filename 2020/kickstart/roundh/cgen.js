var t = 10;

console.log(t);
while (t--) {
    var c = 10;
    console.log(c);

    while (c--) {
        console.log(rx(), rx());
    }
}

function rx() {
    var limit = 500
    return rn(2 * limit) - limit
}
function rn(n) { // 1 to n
    return Math.floor(Math.random() * n) + 1;
}
