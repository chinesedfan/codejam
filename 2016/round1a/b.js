var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var n = parseInt(lines[l++]);
    var x = 2 * n - 1;
    var lists = [];
    while (x--) {
        var list = _.map(lines[l++].split(' '), function(token) { return parseInt(token); });
        lists.push(list);
    }
    console.log('Case #%d: %s', i + 1, solve(n, lists));
}

function solve(n, lists) {
    var count = {};
    _.each(lists, function(lst) {
        _.each(lst, function(height) {
            count[height] = count[height] || 0;
            count[height]++;
        });
    });

    var arr = _(count).map(function(c, h) {
        return {
            height: parseInt(h),
            count: c
        };
    }).toArray().value();

    return _(arr)
            .filter(function(item) { return (item.count & 1); })
            .sortBy(function(item) { return item.height; })
            .map(function(item) { return item.height; })
            .value()
            .join(' ');
}
