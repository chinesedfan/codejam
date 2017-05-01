var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var i = 1;
var l = 1;
while (i <= t && l < lines.length) {
    var token = lines[l++].split(' ');
    var n = parseInt(token[0]);
    var k = parseInt(token[1]);
    var arr = [];
    while (arr.length < n) {
        token = lines[l++].split(' ');
        arr.push({
            radius: parseInt(token[0]),
            height: parseInt(token[1])
        });
    }
    console.log('Case #%d: %s', i++, solve(n, k, arr));
}

function solve(n, k, arr) {
    var sortedByBorder = _(arr).sortBy(byBorder);
    var sortedByRadius = _(arr).sortBy(byRadius);

    var candidatesByBorder = sortedByBorder.slice(0, k);
    sortedByRadius.some((item) => {
        var candidatesByRadius = candidatesByBorder.sortBy(byRadius);
        var maxRadius = candidatesByRadius.first().radius;
        if (item.radius <= maxRadius) return true;

        var minBorder = getBorder(candidatesByBorder.last());
        var delta = Math.PI * (item.radius * item.radius - maxRadius * maxRadius) + getBorder(item) - minBorder;
        if (delta > 0) {
            candidatesByBorder = candidatesByBorder.dropRight().concat([item]);
        }
    });

    var largest = candidatesByBorder.sortBy(byRadius).first();
    return Math.PI * largest.radius * largest.radius + candidatesByBorder.sumBy(getBorder);
}

function byRadius(item) {
    return -item.radius;
}
function byBorder(item) {
    return -getBorder(item);
}
function getBorder(item) {
    return 2 * Math.PI * item.radius * item.height;
}
