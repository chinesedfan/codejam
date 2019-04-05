var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var t, c;
var data; // n, index, count, given;

rl.on('line', function(input) {
    if (typeof t === 'undefined') {
        t = parseInt(input);
        c = 0;
    } else if (typeof data === 'undefined') {
        c++;

        data = {
            n: parseInt(input),
            index: 0,
            count: {},
            given: {}
        };
    } else {
        var tokens = input.split(' ').map((x) => parseInt(x));
        // var d = tokens[0];
        var lst = tokens.slice(1);

        // update
        var min = Infinity;
        var count = data.count;
        var given = data.given;
        lst.forEach((x) => {
            count[x] = count[x] || 0;
            count[x]++;
            if (!given[x] && (!Number.isFinite(min) || count[x] < count[min])) min = x;
        });
        // give the less valid frequent one
        if (Number.isFinite(min)) {
            given[min] = 1;
            console.log(min);
        } else {
            console.log(-1);
        }

        data.index++;
        if (data.index >= data.n) {
            data = undefined;
            if (c >= t) process.exit();
        }
    }
});
