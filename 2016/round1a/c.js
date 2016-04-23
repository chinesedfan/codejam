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
    var max = 0;
    var visited = {};
    _.each(arr, function(bff, i) {
        if (visited[i]) return;

        max = Math.max(max, bfs(arr, i, visited));
    });
    return max;
}

function bfs(arr, index, visited) {
    var root = {
        ancestors: {}, // index -> node
        prev: null,
        index: index,
        level: 0
    };
    visited[index] = true;

    var q = [root], node, children;
    var max = 0;
    while (q.length) {
        node = q.shift();
        // whether the current node is satisfied
        if (node.prev && node.prev.index == arr[node.index]) {
            children = _.range(arr.length);
        } else {
            children = [arr[node.index]];
        }

        _.each(children, function(i) {
            if (node.ancestors[i]) {
                max = Math.max(max, node.level - node.ancestors[i].level + 1);
            } else {
                q.push(createChildNode(node, i));
                visited[i] = true;
            }
        });
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
