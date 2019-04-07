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
