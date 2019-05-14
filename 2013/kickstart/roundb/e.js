var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var content = fs.readFileSync(args[0]).toString();
console.log('Case #%d:\n%s', 1, solve(content));

function solve(content) {
    var q = [];
    var stack = [];
    var prevStar = false;
    var prevSlash = false;

    for (var i = 0; i < content.length; i++) {
        var ch = content[i];
        if (ch === '/') {
            if (prevStar) {
                if (!stack.length) {
                    prevSlash = true;
                } else {
                    var beg = stack.pop();
                    if (!stack.length) {
                        q.push({beg: beg, end: i}); // [beg, end]
                    }
                    prevSlash = false;
                }
            } else {
                prevSlash = true;
            }
            prevStar = false;
        } else if (ch === '*') {
            if (prevSlash) {
                stack.push(i - 1);
                prevStar = false;
            } else {
                prevStar = true;
            }
            prevSlash = false;
        } else {
            prevStar = false;
            prevSlash = false;
        }
    }

    var last = 0;
    var result = [];
    for (var i = 0; i < q.length; i++) {
        result.push(content.slice(last, q[i].beg));
        last = q[i].end + 1;
    }
    if (q.length) {
        result.push(content.slice(q[q.length - 1].end + 1));
    }
    return result.join('');
}
