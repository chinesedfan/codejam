(function() {
    var n = 5;
    var grid = Array(n).fill(0).map(() => Array(n).fill('.'));

    flipLine(grid, 1, false, false);
    printGrid(grid);
})();

function printGrid(grid) {
    const str = grid.map((row) => row.join('')).join('\n');
    console.log(str);
}

function flipLine(grid, start, isRow, isInc) {
    var n = grid.length;
    if (isRow) {
        if (isInc) {
            // row, inc, r - c = start
            for (var i = start; i < n; i++) {
                flip(grid, i, i - start);
            }
        } else {
            // row, dec, r + c = start
            for (var i = start; i >= 0; i--) {
                flip(grid, i, start - i);
            }
        }
    } else {
        if (isInc) {
            // col, inc, c - r = start
            for (var i = start; i < n; i++) {
                flip(grid, i - start, i);
            }
        } else {
            // col, dec, c + r = start
            for (var i = start; i >= 0; i--) {
                flip(grid, start - i, i);
            }
        }
    }
}
function flip(grid, i, j) {
    grid[i][j] = grid[i][j] === '.' ? '#' : '.';
}
