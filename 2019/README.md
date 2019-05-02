## 2019

### Qualification

#### Problem A. Foregone Solution

Divide any 4 into 2 + 2, but be careful with 7/8/9 which may create new 4s.

#### Problem B. You Can Go Your Own Way

If the last direction is different with the first, just start with N - 1 last-direction steps, then N - 1 start-direction steps.
If they are the same, find a chance to start with X the other direction steps, then N - 1 first-direction and N - 1 - X the other direction steps.

#### Problem C. Cryptopangrams

For small set, print all primes no greater than 10k and extract them from the product. But be careful with ABA/BAB. We should confirm other characters first and return back to distinguish them.
For larget set, gcd means the prime.

#### Problem D. Dat Bae

Rotate 10 * N inputs, then each row can stand for a number. Missing rows mean broken bits.
What's more, divide N into blocks with size 32, then we can use only 5 inputs, which means 5 bits, to encode and find. Because it is impossible that a whole block is missing (B < 15).

### Round 1a

#### Problem A. Pylons

Greedy but hard to proof. In each step, select the one that leaves most available nodes.

#### Problem B. Golf Gophers

Distingush by reminders. Notice dividers only require to be relatively prime.

#### Problem C. Alien Rhyme

Create Tie. Then calculate unused strings under each node.

### Round 1b

#### Problem A. Manhattan Crepe Cart

Brute force for small test.
Consider each dimension separately. Use 0 and each next cell.

#### Problem B. Draupnir

When W = 6, we can solve a group of equations.
When W = 2, notice after i * 63 days, Ri became Ri * 2^63. The returned sums are values modulo by 2^63, so as long as we make sure don't overlap each other, the original Ri can be calculated.

#### Problem C. Fair Fight

For small test, count for each intervals.
For large test, divide the problem into 3 parts: select Ci, Ci is good enough and not too good. Determine [L, R] of each part by binary search. And prepare RMQ data structures.
