## 2022 - KickStart

### Practice Session #1

#### Problem A. Sample Problem

Return the reminder.

#### Problem B. Centauri Prime

Check the last character. Used in EuroPython 2011.

#### Problem C. H-index

See Problem A of 2019 Kickstart Round H.

#### Problem D. Hex

See Problem C of 2013 Kickstart Round B.

#### Problem E. Mike Tea

See Problem B of 2018 Kickstart Round E.

### Round A

#### Problem A. Speed Typing

Two points to check.

#### Problem B. Challenge Nine

Find the reminder of 9 for the digits sum and insert at the first place that smaller than the original digit. Note that zero will always be inserted at the second place.

#### Problem C. Palindrome Free Strings

Brute-force to pass set 1. Loop over all 2^N possible cases and use DP to find the longest palindrome length.

#### Problem D. Interesting Integers

Brute-force to pass set 1.

### Round B

#### Problem A. Infinity Area

Simulate.

#### Problem B. Palindromic Factor

A number X has X^(1/2) factors. Be careful with the square number.

#### Problem C. Unlock the Padlock

Count continous 1s to pass set 1.

### Round C

#### Problem A. New Password

Check each condition and try to meet. Remember to fill to length 7.

#### Problem B. Range Partition

Calculate the sum by the ratio, then find partitions by 0-1 knapsack to pass set 1. But notice that integers are 1 to N, we can pick as many as posible numbers from 1 util exceed the sum. For the rest gap R, increase last R numbers by 1. 

#### Problem C. Ants on a Stick

Every ant will exchange with ants that it is facing to and have opposite directions. For ants at leftmost or rightmost positions without exchange, they will fall off.

#### Problem D. Palindromic Detections

BFS or recursion to pass set 1.
For set 2, loop palindromics by length, which can by calculated by O(N^3) DP. Each palindromic, say length K, will contribute to the answer by (N-K)! * K!.
