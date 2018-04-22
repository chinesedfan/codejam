var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var lines = [];
rl.on('line', function(input) {
    lines.push(input);
});
rl.on('close', function() {
    var t = parseInt(lines[0]);
    var l = 1;
    for (var i = 0; i < t; i++) {
        console.log('Case #%d:', i + 1);
        solve(parseFloat(lines[l++]));
    }
});

function solve(area) {
    // suppose the bottom clockwise are ABCD, and the top are EFGH
    // rotate about y-axis from +x towards +z 45 degree first
    // and notice the height difference is equal to the shadow area
    // refer to https://www.youtube.com/watch?v=rAHcZGjKVvg

    // the angle between BH and y-axis
    var bhAngle = Math.acos(1 / Math.sqrt(3));
    // the angle between FD and z-axis
    var fdAngle = Math.PI / 2 - bhAngle;

    // focus on HFBD now, try to rotate about x-axis from +z towards +y
    // area = Math.sqrt(3) * cos(bhAngle - t)
    var t = bhAngle - Math.acos(area / Math.sqrt(3));
    // for the new bhAngle
    var cos = area / Math.sqrt(3);
    var sin = Math.sqrt((3 - area * area) / 3);
    // for the new fdAngle
    fdAngle = fdAngle - t;

    var h = [0, Math.sqrt(3) / 2 * cos, Math.sqrt(3) / 2 * sin];
    var f = [0, Math.sqrt(3) / 2 * Math.sin(fdAngle), -Math.sqrt(3) / 2 * Math.cos(fdAngle)];
    var c = [Math.sqrt(2) / 2, -1 / 2 * Math.cos(t), 1 / 2 * Math.sin(t)];

    printCenter(h, f);
    printCenter(h, c);
    printCenter(f, c);
}
function printCenter(a, b) {
    console.log((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
}
