## 2021

### Qualification

#### Problem A. Reversort

Simulate.

#### Problem B. Moons and Umbrellas

DP.

#### Problem C. Reversort Engineering

Greedy. Remember to reserve at least 1 cost for each iteration.

#### Problem D. Median Sort

For each new element, binary search to insert. But it is not efficient enough for set 3. We can upgrade to divide the range into 3 parts.

#### Problem E. Cheating Detection

Always selecting the highest correctness player can pass set 1.
The cheater will be exposed when compared with "same" skilled players, especially for the extreme questions (very easy or hard).

### Round 1a

#### Problem A. Append Sort

Greedy. Just be careful to append to the same length or increase by 1.

#### Problem B. Prime Time

Check each sum. For set 3, important to find the lower limit and handle those big integers.

#### Problem C. Hacked Exam

For set 1, loop over all answers to find possible correct answers. Then try all answers again to calculate the maximum expected score.

### Round 1c

#### Problem A. Closest Pick

If pick both the start and the end of the same slot, then the slot is covered. If only pick the start or the end of different slots, then half of each slot is coverd. But for open slots, whose end is 1 or k, it can be covered with one pick.

### Round 2

#### Problem A. Minimum Sort

Selection sort.

#### Problem B. Matrygons

For set 1, loop all possible numbers as the largest size, and find prime factors of it. Then use recursive method to calculate rest sizes. Notice that not every sub-sizes should be selected. 
