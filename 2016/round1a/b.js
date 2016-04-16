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
    var rows = [], cols = [];
    // find the min
    var min = _.min(lists, function(list) {
        return list[0];
    })[0];
    var minLists = findLists(min, lists);
    rows[0] = minLists[0];

    // fill
    var missing = -1;
    _.each(rows[0], function(height, i) {
        minLists = findLists(rows[0][height], lists);
        if (minLists.length == 1) {
            cols[i] = minLists[0];
        } else if (minLists.length > 1) {
            var p = findCross(minLists[0], minLists[1]);
            if (p.row != p.col) {
                if (p.row == i) {
                    cols[i] = minLists[1];
                    rows[p.col] = minLists[0];
                } else if (p.col == i) {
                    cols[i] = minLists[0];
                    rows[p.row] = minLists[1];
                } else {
                    throw new Error('invalid cross', p);
                }
            } else if (p.row == i) {
                if (i == 0) {
                    cols[i] = minLists[1];
                } else {
                    var isOK = _.all(cols[i - 1], function(x, j) {
                        return minLists[0][j] > x;
                    });
                    cols[i] = minLists[isOK ? 0 : 1];
                    rows[i] = minLists[isOK ? 1 : 0];
                }
            } else {
                throw new Error('invalid cross', p);
            }
        } else {
            if (missing >= 0) throw new Error('duplicate missing column', missing);
            missing = i;
        }
    });

    if (missing < 0) {
        _.some(_.range(n), function(i) {
            if (!rows[i]) {
                missing = i;
                return true;
            }
            return false;
        });
        if (missing < 0) throw new Error('not found missing row');
        return _.map(cols, function(c) {
            return c[missing];
        }).join(' ');
    } else {
        return _.map(rows, function(r) {
            return r[missing];
        }).join(' ');
    }
}

/**
 * @return {Array} 1 or 2 list(s) whose min is the target
 */
function findLists(target, lists) {
    var minLists = [];
    _.each(lists, function(list) {
        if (list[0] == target) {
            minLists.push(list);
        }
    });
    return minLists;
}

/**
 * @return {Object} the cross point of the 2 lists that share the same min
 */
function findCross(list1, list2) {
    var i = 0, j = 0;
    while (i < list1.length && j < list2.length) {
        if (list1[i] < list2[j]) {
            i++;
        } else if (list1[i] > list2[j]) {
            j++;
        } else {
            return {
                row: i,
                col: j
            };
        }
    }
    throw new Error('not found: ', list1, list2);
}
