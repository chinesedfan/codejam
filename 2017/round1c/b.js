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
            type: 'a',
            start: parseInt(token[0]),
            end: parseInt(token[1])
        });
    }
    var arr2 = [];
    while (arr2.length < b) {
        token = lines[l++].split(' ');
        arr2.push({
            type: 'b',
            start: parseInt(token[0]),
            end: parseInt(token[1])
        });
    }
    console.log('Case #%d: %s', i++, solve(arr1, arr2));
}

function solve(arr1, arr2) {
    if (arr1.length + arr2.length <= 1) return 2;

    var total1 = 0, total2 = 0;
    var gaps = [], gap1 = [], gap2 = [];
    var sorted = _(arr1).concat(arr2).sortBy(byStart).value();
    _.each(sorted, (item, i) => {
        var prev = sorted[i ? i - 1 : sorted.length - 1];
        var delta = item.start - prev.end;
        if (delta < 0) delta += 1440;

        var duration = item.end - item.start;
        if (prev.type == item.type) {
            duration += delta;
        } else {
            gaps.push(delta);
        }

        if (item.type == 'a') {
            total1 += duration;
            gap1.push(delta);
        } else {
            total2 += duration;
            gap2.push(delta);
        }
    });

    var common = _.sum(gaps);
    var exchange = gaps.length;
    if (total1 < total2) {
        total1 += common;
        exchange += 2 * moveGaps(total1, gap2);
    } else {
        total2 += common;
        exchange += 2 * moveGaps(total2, gap1);
    }
    return exchange;
}
function moveGaps(total, gaps) {
    gaps = _.sortBy(gaps);

    var move = 0;
    while (gaps.length && total < 720) {
        total += gaps.pop();
        move++;
    }
    return move;
}

function byStart(item) {
    return item.start;
}
