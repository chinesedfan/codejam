## 2013

### Qualification

#### Problem A. Tic-Tac-Toe-Tomek

Trivial.

#### Problem B. Lawnmower

Check each cell whether it is the highest in its row or column.

#### Problem C. Fair and Square

Prepare results in advance. Increase the half of the square root gradually.

#### Problem D. Treasure

(TODO)

### Round 1a

#### Problem A. Bullseye

Loop and check. A better way should be binary search.

#### Problem B. Manage your Energy

Easy to solve small test in DP with O(N * E^2).
Clever solution for large test, O(N), is that assigning energy without affecting the next more valuable activity reaches E.

#### Problem C. Good Luck

### Round 1b

#### Problem A. Osmos

Try to absorb every mote. If impossible, add a new one with n - 1 size (be careful if n = 1). Then check again whether it will be better if removing the mote directly.

#### Problem B. Falling Diamonds

Notice that diamonds will form triangles layer by layer. So determine the size of inner triangle first, then consider the probability of at least x diamonds will drop to the left/right side. It can be calculated by simulating droping of each diamond.

#### Problem C. Garbled Email

### Round 1c

#### Problem A. Consonants

Brute force to pass the small set.
Find the first enough end index for each start index.

#### Problem B. Pogo

#### Problem C. The Great Wall
