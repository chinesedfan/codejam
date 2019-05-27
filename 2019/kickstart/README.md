## 2019 - KickStart

### Round A

#### Problem A. Training

Sort and select students from [1, p] to [n - p + 1, n]. The time complexity is O(n).

#### Problem B. Parcels

For visible test, try each empty square.
For hidden test, do binary search. Find squares that have distance larger than K and try to put the new office in the center.

#### Problem C. Contention

(TODO)

### Round B

#### Problem A. Building Palindromes

Count effectively: use O(n) to calculate characters counts of intervals like [0, i].

#### Problem B. Energy Stones

Sort first, then reduce as 0/1 knapsack problem.

#### Problem C. Diverse Subarray

Small test set can be solved by a way much similar like Problem A.
Large test can leverage segment tree.

### Round C

#### Problem A. Wiggle Walk

Seems simple simulating, which is O(n^2) in fact. Need use intervals merging to achieve O(nlogn).

#### Problem B. Circuit Board

#### Problem C. Catch Some
