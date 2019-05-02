var t = 10;

console.log(t);
while (t--) {
    var p = rn(10);
    var q = 10;
    console.log(p, q);

    while (p--) {
        var x = rn(q);
        var y = rn(q);
        var d = 'NEWS'[rn(3)];
        while (invalid(q, x, y, d)) d = 'NEWS'[rn(3)];
        console.log([x, y, d].join(' '));
    }
}

function rn(n) {
    return Math.ceil(Math.random() * n);
}

function invalid(q, x, y, d) {
    switch (d) {
    case 'N': return y == q;
    case 'E': return x == q;
    case 'W': return x == 0;
    case 'S': return y == 0;
    }
    return false;
}
