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
        var n = +lines[l++]
        var nums = lines[l++].split(' ')
        console.log('Case #%d: %s', i + 1, solve(n, nums));
    }
});

function solve(n, nums) {
    let cur = nums[0]
    let append = 0
    for (let i = 1; i < nums.length; i++) {
        if (compare(cur, nums[i]) < 0) {
            cur = nums[i]
        } else {
            const s1 = cur.slice(0, nums[i].length)
            const cmp = compare(s1, nums[i])
            const diff = cur.length - nums[i].length
            if (cmp < 0) {
                cur = nums[i] + Array(diff).fill('0').join('')
                append += diff
            } else if (cmp > 0) {
                cur = nums[i] + Array(diff + 1).fill('0').join('')
                append += diff + 1
            } else {
                let all9 = true
                for (let j = nums[i].length; j < cur.length; j++) {
                    if (cur[j] !== '9') {
                        all9 = false
                        break
                    }
                }

                if (all9) {
                    cur = nums[i] + Array(diff + 1).fill('0').join('')
                    append += diff + 1
                } else {
                    const add = []
                    let carry = true
                    for (let j = cur.length - 1; j >= nums[i].length; j--) {
                        let x = +cur[j]
                        if (carry) {
                            x++
                        }
                        carry = x >= 10
                        add.unshift(x % 10)
                    }
                    cur = nums[i] + add.join('')
                    append += diff
                }
            }
        }
    }
    return append
}

function compare(s1, s2) {
    if (s1.length === s2.length) {
        for (let i = 0; i < s1.length; i++) {
            const a = +s1[i]
            const b = +s2[i]
            if (a !== b) return a - b
        }
        return 0
    } else {
        return s1.length - s2.length
    }
}
