## 2020

### Qualification

#### Problem A. Vestigium

Simple. Loop and add or count.

#### Problem B. Nesting Depth

For each number, determine the left and right most position that equals or larger than it. And add parenthesis at there. We also need a depth array to keep track how many parentheses have been added.

#### Problem C. Parenting Partnering Returns

Sort intervals and assign.

#### Problem D. ESAb ATAd

For B = 10, collect each bits because the array will never change during 10 requests.

#### Problem E. Indicium

For small tests, loop all possible diagonal cases and search by backtracing.
(TODO)

### Round 1a

#### Problem A. Pattern Matching

Set 1, check from the end.
Set 2, divide by the asterisk, and reverse the left part. It converts to 2 problems of Set 1.
(TODO)

#### Problem B. Pascal Walk

Backtracing is enough to pass Set 1 & 2.
(TODO)

#### Problem C. Square Dance

Simulate to pass Set 1.

### Round 1c

#### Problem A. Overexcited Fan

Simulate and check at each point.

#### Problem B. Overrandomized

For test 1 & 2, if the first letter of R is X, it means the position of X (which starts from 0) is less than the first digit of M.

#### Problem C. Oversized Pancake Choppers

For D = 2, find 2 same parts, or divide one into 2 parts.
For D = 3, find 3 same parts, or find a [X, 2X] pair, or find 2 same parts with another larger one. Otherwise, slice 3 different parts into same parts.
