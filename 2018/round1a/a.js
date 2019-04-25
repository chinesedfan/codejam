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
    var rs = [];
    var cs = [];

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
        rs.push(i);
        x++;
    }
    rs.push(r);

    i = 0;
    x = 0;
    while (x < h) {
        while (i < c && sum < ev) sum += countCol(ss, i++);
        if (sum == ev) {
            sum = 0;
        } else {
            return 'IMPOSSIBLE';
        }
        cs.push(i);
        x++;
    }
    cs.push(c);

    var e = eh / (v + 1);
    var pr = 0;
    for (var i = 0; i < rs.length; i++) {
        var pc = 0;
        for (var j = 0; j < cs.length; j++) {
            if (countCell(ss, pr, pc, rs[i], cs[j]) != e) return 'IMPOSSIBLE';
            pc = cs[j];
        }
        pr = rs[i];
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
function countCell(ss, r1, c1, r2, c2) {
    var count = 0;
    for (var i = r1; i < r2; i++) {
        for (var j = c1; j < c2; j++) {
            if (ss[i][j] === '@') count++;
        }
    }
    return count;
}
