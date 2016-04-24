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
    var i, j, count = 0;

    i = index;
    while (!visited[i]) {
        visited[i] = {};
        count++;

        j = i;
        i = arr[i];
    }

    var circle;
    if (visited[i].circle) {
        // end in a existed circle
        circle = visited[i].circle;
        updateInfo(arr, index, i, visited, {
            endpoint: visited[i].chains ? i : visited[i].endpoint,
            circle: circle
        });

        if (circle.realSize == 2) {
            i = visited[index].endpoint;

            j = index;
            count = 0;
            while (1) {
                count++;

                if (arr[j] == i) break;
                j = arr[j];
            }
            visited[i].chains[j] = Math.max(visited[i].chains[j] || 0, count);

            circle.size = circle.realSize
                    + (_.max(_.values(visited[i].chains)) || 0) + (_.max(_.values(visited[arr[i]].chains)) || 0);
            return circle.size;
        }
        return 0;
    } else {
        // find a new circle
        circle = {
            realSize: count,
            size: count // if `realSize` is 2, it contains the 2 chains; otherwise, ignore this field
        };

        if (i != index) {
            // find the real `j`
            j = index;
            count = 0;
            while (1) {
                visited[j] = {
                    endpoint: i,
                    circle: circle
                };
                count++;

                if (arr[j] == i) break;
                j = arr[j];
            }

            visited[i].chains = {};
            visited[i].chains[j] = count; // prev -> length
            circle.realSize = circle.size - count;
        } else {
            visited[i].chains = {};
        }

        updateInfo(arr, arr[i], i, visited, {
            chains: {},
            circle: circle
        });
        visited[i].circle = circle;

        return circle.realSize == 2 ? circle.size : circle.realSize;
    }
}

function updateInfo(arr, start, end, visited, value) {
    while (start != end) {
        visited[start] = value;
        start = arr[start];
    }
}
