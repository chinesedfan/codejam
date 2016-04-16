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
    var minLists = findLists(0, min, lists);
    rows[0] = minLists[0];

    // fill
    var missingCol = -1, missingRow = -1;
    _.each(rows[0], function(height, i) {
        minLists = findLists(0, height, lists);
        if (minLists.length == 1) {
            cols[i] = minLists[0];
        } else if (minLists.length > 1) {
            var p = findCross(i, minLists[0], minLists[1]);
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
                    var isOK = _.every(cols[i - 1], function(x, j) {
                        return minLists[0][j] > x;
                    });
                    cols[i] = minLists[isOK ? 0 : 1];
                    rows[i] = minLists[isOK ? 1 : 0];
                }
            } else {
                throw new Error('invalid cross', p);
            }
        } else {
            if (missingCol >= 0) throw new Error('duplicate missingCol column', missingCol);
            missingCol = i;
        }
    });

    var startCol = missingCol == 0 ? 1 : 0;
    _.each(cols[startCol], function(height, i) {
        if (rows[i]) return;

        minLists = findLists(startCol, height, lists);
        if (minLists.length == 1) {
            rows[i] = minLists[0];
        } else if (minLists.length > 1) {
            var p = findCross(i, minLists[0], minLists[1]);
            if (p.row != p.col) {
                if (p.row == i) {
                    rows[i] = minLists[1];
                } else if (p.col == i) {
                    rows[i] = minLists[0];
                } else {
                    throw new Error('invalid cross', p);
                }
            } else if (p.row == i) {
                throw new Error('already handled', i);
            } else {
                throw new Error('invalid cross', p);
            }
        } else {
            if (missingCol >= 0) throw new Error('duplicate missingRow column', missingRow);
            if (missingRow >= 0) throw new Error('duplicate missingRow column', missingRow);
            missingRow = i;
        }
    });

    if (missingCol < 0) {
        return _.map(cols, function(c) {
            return c[missingRow];
        }).join(' ');
    } else {
        return _.map(rows, function(r) {
            return r[missingCol];
        }).join(' ');
    }
}

/**
 * @return {Array} 1 or 2 list(s) whose element i is the target (they will be removed from the original list)
 */
function findLists(index, target, lists) {
    var minLists = [];
    var indexes = [];
    _.each(lists, function(list, i) {
        if (list[index] == target) {
            minLists.push(list);
            indexes.push(i);
        }
    });
    _.each(indexes, function(i) {
        lists.splice(i, 1);
    });
    return minLists;
}

/**
 * @return {Object} the cross point of the 2 lists that share the same min
 */
function findCross(index, list1, list2) {
    var i = index, j = index;
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
