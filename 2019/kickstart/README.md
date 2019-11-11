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

Find the max rectangle first. Try to extend to left/right as far as possible for each point. Then compare points in the same column to determine the height. The total time cost is O(RC).
For large test set, only extend to one direction, like right, with RMQs. And determine the height with a stack. In fact, it looks like calculating the max rectangle in histogram, which is O(C). So the total is O(RClogC).

#### Problem C. Catch Some

DP. Observe K dogs by the first C colors. And maintain both minimum distances of returning/not-returning home.

### Round E

#### Problem A. Cherries Mesh

MST is not efficient enough. Just create a spanning forest using only edges of weight 1.

#### Problem B. Code-Eat Switcher

Pick Coding/Eat greedily. And check the other condition can be satisfied. It will be O(D*S).
If calculated the cumulative sum in advance, and find the slot index by binary search. It can be O(SlogS).
