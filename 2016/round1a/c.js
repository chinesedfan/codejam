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
    var root = {
        ancestors: {}, // index -> node
        prev: null,
        index: 0,
        level: 0
    };
    var q = [root], node, index;
    var max = 0;
    while (q.length) {
        node = q.shift();
        // whether the current node is satisfied
        if (node.prev && node.prev.index == arr[node.index]) {
            _.each(arr, function(j, i) {
                if (i == node.index || node.ancestors[i]) return;
                q.push(createChildNode(node, i));
            });
        } else {
            index = arr[node.index];
            if (node.ancestors[index]) {
                max = Math.max(max, node.level - node.ancestors[index].level + 1);
            } else {
                q.push(createChildNode(node, index));
            }
        }
    }
    return max;
}

function createChildNode(node, index) {
     var child = {
         ancestors: _.clone(node.ancestors),
         prev: node,
         index: index,
         level: node.level + 1
     };
     child.ancestors[node.index] = node;
     return child;
}
