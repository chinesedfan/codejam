// print primes less than 10000

var arr = Array(10000).fill(1);
arr[0] = 0;
arr[1] = 0;

for (var i = 2; i <= 100; i++) {
    for (var j = 2 * i; j < arr.length; j += i) {
        arr[j] = 0;
    }
}

var ps = [];
for (var i = 0; i < arr.length; i++) {
    if (arr[i]) ps.push(i);
}
console.log('total=' + ps.length);
console.log(ps.join(','));
