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
        var tokens = lines[l++].split(' ').map((x) => +x);
        var ss = lines.slice(l, l + tokens[0]);
        l += tokens[0];
        console.log('Case #%d: %s', i + 1, solve(tokens[0], tokens[1], tokens[2], tokens[3], ss));
    }
});

function solve(r, c, h, v, ss) {
    var count = 0;
    for (var i = 0; i < r; i++) {
        count += countRow(ss, i);
    }

    if ((count % (h + 1)) || (count % (v + 1))) return 'IMPOSSIBLE';
    var eh = count / (h + 1);
    var ev = count / (v + 1);
    var sum = 0;
    var i = 0;
    var x = 0;
    while (x < h) {
        while (i < r && sum < eh) sum += countRow(ss, i++);
        if (sum == eh) {
            sum = 0;
        } else {
            return 'IMPOSSIBLE';
        }
        x++;
    }
    i = 0;
    x = 0;
    while (x < h) {
        while (i < c && sum < ev) sum += countCol(ss, i++);
        if (sum == ev) {
            sum = 0;
        } else {
            return 'IMPOSSIBLE';
        }
        x++;
    }
    return 'POSSIBLE';
}

function countRow(ss, i) {
    var count = 0;
    for (var j = 0; j < ss[i].length; j++) {
        if (ss[i][j] === '@') count++;
    }
    return count;
}
function countCol(ss, i) {
    var count = 0;
    for (var j = 0; j < ss.length; j++) {
        if (ss[j][i] === '@') count++;
    }
    return count;
}
