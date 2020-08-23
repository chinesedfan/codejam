let n = 5;

for (let i = 1; i <= n; i++) {
    for (let a = 1; a <= i; a++) {
        for (let b = 1; b <= i; b++) {
            for (let c = 1; c <= Math.min(a, b); c++) {
                console.log(i, a, b, c);
            }
        }
    }
}
