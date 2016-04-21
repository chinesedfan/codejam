var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var n = parseInt(lines[l++]);
    var arr = _.map(lines[l++].split(' '), function(x) { return parseInt(x) - 1; });
    console.log('Case #%d: %s', i + 1, solve(arr));
}

function solve(arr) {
    var bffs = {};
    _.each(arr, function(j, i) {
        if (!bffs[i]) bffs[i] = {ins: [], outs: []};
        if (!bffs[j]) bffs[j] = {ins: [], outs: []};
        bffs[i].outs.push(j);
        bffs[j].ins.push(i);
    });

    var root = {
        prev: null,
        index: 0,
        level: 0
    };
    var q = [root], node, other;
    var max = 0;
    while (q.length) {
        node = q.shift();
        _.each(bffs[node.index].ins.concat(bffs[node.index].outs), function(i) {
            other = node;
            while (other.prev && other.index != i) other = other.prev;
            if (other.index == i) {
                max = Math.max(max, node.level - other.level + 1);
            } else {
                other = {
                    prev: node,
                    index: i,
                    level: node.level + 1
                };
                q.push(other);
            }
        });
    }
    return max;
}

