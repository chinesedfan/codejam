var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var n = parseInt(lines[l++]);
    var points = [];
    while (n--) {
        var tokens = lines[l++].split(' ');
        points.push({
            x: parseInt(tokens[0]),
            y: parseInt(tokens[1])
        });
    }
    console.log('Case #%d:\n%s', i + 1, solve(points));
}

function solve(points) {
    var result = [];
    _.each(points, function(p1) {
        var min = points.length, count;
        _.every(points, function(p2) {
            count = findCount(p1, p2, points);
            if (count < min) min = count;
            if (count == 0) return false;
            return true;
        });
        result.push(min);
    });
    return result.join('\n');
}

function findCount(p1, p2, points) {
    var fn;
    if (p1.x == p2.x) {
        fn = function(p) { return p.x - p1.x; };
    } else if (p1.y == p2.y) {
        fn = function(p) { return p.y - p1.y; };
    } else {
        fn = function(p) { return (p1.y - p2.y) * p.x + (p1.x * p2.y - p2.x * p1.y) - (p1.x - p2.x) * p.y; };
    }

    var group1 = [], group2 = [];
    _.each(points, function(p) {
        var x = fn(p);
        if (x > 0) {
            group1.push(p);
        } else if (x < 0) {
            group2.push(p);
        }
    });
    return Math.min(group1.length, group2.length);
}
