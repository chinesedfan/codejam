var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var t, n, q;
var c;
var g;
var skip = false;

rl.on('line', (input) => {
    if (skip) {
        skip = false
    } else if (typeof t === 'undefined') {
        [t, n, q] = input.split(' ').map(Number);
        c = 0;

        g = solve(n);
        console.log(g.next().value);
    } else {
        input = +input
        if (input === -1) process.exit()

        var obj = g.next(input);
        if (Array.isArray(obj.value)) {
            // answer
            console.log(obj.value.join(' '));
            skip = true
            c++
            if (c == t) process.exit();

            // next
            g = solve(n);
            console.log(g.next().value);
        } else {
            // ask
            console.log(obj.value);
        }
    }
});

function* solve(N) {
    const sorted = []

    let next
    while (sorted.length < N) {
        if (sorted.length) {
            yield* insert(sorted, next)
            next++
        } else {
            const mid = yield ask(1, 2, 3)
            if (mid === 1) {
                sorted.push(2, 1, 3)
            } else if (mid === 2) {
                sorted.push(1, 2, 3)
            } else {
                sorted.push(1, 3, 2)
            }
            next = 4
        }
    }
    return sorted
}
function* insert(sorted, value) {
    let left = 0
    let right = sorted.length - 1
    if (right - left < 3) {
        yield* insertBinarySearch(sorted, left, right, value)
        return
    }

    while (right - left >= 3) {
        const i1 = Math.floor(left + (right - left) / 3)
        const i2 = Math.floor(left + (right - left) * 2 / 3)
        const v1 = sorted[i1]
        const v2 = sorted[i2]

        const m = yield ask(v1, v2, value)
        if (m === v2) {
            left = i2 + 1
            if (right - left < 3) {
                yield* insertBinarySearch(sorted, left - 1, right, value)
                return
            }
        } else if (m === value) {
            left = i1 + 1
            right = i2 - 1
            if (right - left < 3) {
                yield* insertBinarySearch(sorted, left - 1, right + 1, value)
                return
            }
        } else if (m === v1) {
            right = i1 - 1
            if (right - left < 3) {
                yield* insertBinarySearch(sorted, left, right + 1, value)
                return
            }
        }
    }
}
function* insertBinarySearch(sorted, left, right, value) {
    while (left < right) {
        if (left === right - 1) {
            const m = yield ask(sorted[left], sorted[right], value)
            if (m === value) {
                // right
            } else if (m === sorted[left]) {
                right = left
            } else if (m === sorted[right]) {
                right = right + 1
            }
            break
        }

        let middle = Math.floor((left + right) / 2)
        let m = yield ask(sorted[left], sorted[middle], value)
        if (m === sorted[middle]) {
            left = middle + 1
            if (left === right) left--
        } else if (m === value) {
            right = middle - 1
            if (left === right) right++
        } else if (m === sorted[left]) {
            right = left
            break
        }
    }
    sorted.splice(right, 0, value)
}
function ask(...args) {
    return args.join(' ')
}
