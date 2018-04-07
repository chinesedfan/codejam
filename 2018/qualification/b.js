var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var lines = [];
rl.on('line', function(input) {
    lines.push(input);
});
rl.on('close', function() {
    var t = parseInt(lines[0]);
    var l = 1;
    for (var i = 0; i < t; i++) {
        l++;
        var tokens = lines[l++].split(' ').map(function(x) { return parseInt(x); });
        console.log('Case #%d: %s', i + 1, solve(tokens));
    }
});

function solve(arr) {
    while (1) {
        var swap = false;
        for (var j = 0; j < arr.length - 2; j++) {
            if (arr[j] > arr[j + 2]) {
                var temp = arr[j];
                arr[j] = arr[j + 2];
                arr[j + 2] = temp;
                swap = true;
            }
        }
        if (!swap) break;
    }

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) return i - 1;
    }
    return 'OK';
}
