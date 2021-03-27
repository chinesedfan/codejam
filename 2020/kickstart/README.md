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

### Round D

#### Problem A. Record Breaker

Easy to filter.

#### Problem B. Alien Piano

Greedy but better to filter adjacent equal values first.

### Round E

#### Problem A. Longest Arithmetic

Simple in O(n).

#### Problem B. High Buildings

Determine A - C and C buildings from the left, and B - C buildings from the right. Then move the A-th building (height N) to a right-enough position.

### Round F

#### Problem A. ATM Queue

Sort by times of T and the initial index.

#### Problem B. Metal Harvest

Greedy.

#### Problem C. Painters' Duel

Search by different targets recursively.

#### Problem D. Yeetzhee

### Round G

#### Problem A. Kick_Start

Find all apperences for each word. And calculate by 2 points moving.

#### Problem B. Maximum Coins

Check each diagonal line.

#### Problem C. Combination Lock

Trying every wheel as the target is O(W^2), which is enough to pass the first 2 test sets.

#### Problem D. Merge Cards

O(N!) to simulate each possible merge.

### Round H

#### Problem A. Retype

Compare and return the smaller one.

#### Problem B. Boring Numbers

Calculate for 1 to N. Then subtract for the range.

#### Problem C. Rugby

Note that the medium of an array is the best target to move together. And the range problem can also be converted to this kind of problem by finding the start point.
