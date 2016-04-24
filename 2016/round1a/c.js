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

        max = Math.max(max, dfs(arr, i, visited));
    });
    return max;
}

function dfs(arr, index, visited) {
    var i, count = 0;

    i = index;
    while (!visited[i]) {
        visited[i] = {};
        count++;

        i = arr[i];
    }

    var circle;
    if (visited[i].circle) {
        // end in a existed circle
        circle = visited[i].circle;
        updateInfo(arr, index, i, visited, {
            circle: circle
        });
        
        if (circle.realSize == 2) {
            circle.size += count;
            return circle.size;
        }
        return 0;
    } else {
        // find a new circle
        circle = {
            size: count // if `realSize` is 2, it contains the 2 chains; otherwise, ignore this field
        };

        var j = arr[i];
        count = 0;
        while (j != i) {
            visited[j].circle = circle;
            count++;

            j = arr[j];
        } 
        circle.realSize = count + 1; // include i
        visited[i].circle = circle;

        updateInfo(arr, index, i, visited, {
            circle: circle
        });
        return circle.realSize == 2 ? circle.size : circle.realSize;
    }
}

function updateInfo(arr, start, end, visited, value) {
    while (start != end) {
        visited[start] = value;
        start = arr[start];
    }
}
