
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var t, n;
var c;
var g;
var skip = false;

rl.on('line', (input) => {
    if (skip) {
        skip = false
    } else if (typeof t === 'undefined') {
        [t, n] = input.split(' ').map(Number);
        c = 0;

        g = solve(n);
        console.log(g.next().value);
    } else {
        input = +input
        if (input === -1) process.exit()

        var obj = g.next(input);
        if (obj.value === 'done') {
            // answer
            console.log('D');
            skip = true
            c++
            if (c == t) process.exit();

            // next
            g = solve(n);
            console.log(g.next().value);
        } else {
            // ask
            console.log(obj.value);
        }
    }
});

function* solve(N) {
    for (let i = 1; i < N; i++) {
        const min = yield ask('M', i, N)
        if (min !== i) {
            yield ask('S', i, min)
        }
    }
    return 'done'
}
function ask(...args) {
    return args.join(' ')
}
