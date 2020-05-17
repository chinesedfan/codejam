## 2020 - KickStart

### Round A

#### Problem A. Allocation

0-1 pack problem. But binary seach is a better solution for large set.

#### Problem B. Plates

DP. Divide "n stacks with p plates" into "n - 1 stacks with p - x plates, where x is the token count of stack n.

#### Problem C. Workout

When k = 1, always insert to the largest diff, and compare with the second largest one.
When k != 1, binary search.

#### Problem D. Bundling

(TODO)

### Round B

#### Problem A. Bike Tour

Filter the peak and count.

#### Problem B. Bus Routes

Find all days of first bus. Then binary search, which is O(Nlog(D/X)).

#### Problem C. Robot Path Decoding

Use a stack to do parentheses matching. Easy.

#### Problem D. Wandering Robot

O(W * H). Simulate row by row, and calculate the sum probability of hole's previous low/column.
For set 2, hard to calculate n!, but we can calculate n!/2^n. Then we can choose a set of squares diagonally from the bottom-left/top-right corner of the hole as the **safe** target. And be careful with squares in the last row/column.
