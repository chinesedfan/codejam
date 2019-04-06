var t = 100;

console.log(t);
while (t--) {
    var n = 2 + Math.ceil(Math.random() * 1000);
    console.log(n);
    var chs = [];
    while (n--) {
        chs.push(Math.random() > 0.5 ? 'E' : 'S');
    }
    console.log(chs.join(''));
}
