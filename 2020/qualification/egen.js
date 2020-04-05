var t = 44;

console.log(t);
while (t--) {
    for (var n = 2; n <= 5; n++) {
        for (var k = n; k <= n * n; k++) {
            console.log(n, k);
        }
    }
}
