var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var i = 1;
var l = 1;
while (i <= t && l < lines.length) {
    var token = lines[l++].split(' ');
    var a = parseInt(token[0]);
    var b = parseInt(token[1]);
    var arr1 = [];
    while (arr1.length < a) {
        token = lines[l++].split(' ');
        arr1.push({
            start: parseInt(token[0]),
            end: parseInt(token[1])
        });
    }
    var arr2 = [];
    while (arr2.length < b) {
        token = lines[l++].split(' ');
        arr2.push({
            start: parseInt(token[0]),
            end: parseInt(token[1])
        });
    }
    console.log('Case #%d: %s', i++, solve(arr1, arr2));
}

function solve(arr1, arr2) {
    if (arr1.length > arr2.length) return solve(arr2, arr1);

    arr1 = _.sortBy(arr1, (item) => item.start);
    arr2 = _.sortBy(arr2, (item) => item.start);
    if (arr1.length == 0) {
        if (arr2.length < 2) return 2;

        return arr2[1].end - arr2[0].start > 720 ? 4 : 2;
    } else { // arr1.length == 1
        return 2;
    }
}
