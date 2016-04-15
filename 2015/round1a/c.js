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
        var others = _(points).filter(function(p2) {
            return !(p1.x == p2.x && p1.y == p2.y);
        }).sortBy(function(p2) {
            p2.deltaX = p2.x - p1.x;
            p2.deltaY = p2.y - p1.y;
            p2.angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
            return p2.angle;
        }).value();

        var group1 = [], group2 = [];
        _.each(others, function(p2) {
            if (p2.angle > 0 && p2.angle <= Math.PI) {
                group1.push(p2);
            } else {
                group2.push(p2);
            }
        });

        var min = Math.min(group1.length, group2.length);
        if (min == 0) { result.push(min); return; }

        var i = 0, j = 0, n1, n2, compareResult;
        while (i < group1.length) {
            // suppose 0 to i - 1 of group1 are in the same side with j to the end of group2
            // suppose 0 to j - 1 of group2 are in the same side with i + 1 to the end of group2
            n1 = i + (group2.length - j);
            n2 = j + (group1.length - i - 1);

            // adjust the separator line in group1
            while (i + 1 < group1.length && group1[i + 1].angle == group1[i].angle) {
                i++;
                n2--;
            }

            // adjust the separator line in group2
            while (j < group2.length) {
                compareResult = compare(group2[j], {
                    deltaX: -group1[i].deltaX,
                    deltaY: -group1[i].deltaY
                });
                if (compareResult > 0) break;

                n1--;
                if (compareResult < 0) {
                    n2++;
                }

                j++;
            }

            // done
            min = Math.min(min, n1, n2);

            i++;
        }
        result.push(min);
    });
    return result.join('\n');
}

/**
 * Compare based their angles (less than 0)
 *
 * @return {Number} the compare result
 */
function compare(p1, p2) {
    if (p1.deltaX > 0) {
        if (p2.deltaX <= 0) {
            return 1;
        } else {
            return p2.deltaX * p1.deltaY - p1.deltaX * p2.deltaY;
        }
    } else if (p1.deltaX < 0) {
        if (p2.deltaX >= 0) {
            return -1;
        } else {
            return p2.deltaX * p1.deltaY - p1.deltaX * p2.deltaY;
        }
    } else {
        return -p2.deltaX;
    } 
}
