## 2022

### Qualification

#### Problem A. Punched Cards

Loop and print.

#### Problem B. 3D Printing

Find the minimum value for each colors. Then check the sum.

#### Problem C. d1000000

Sort and DP. Maintain the smallest last value and the size.

#### Problem D. Chain Reactions

DP on tree. For each node, select the smallest child as the trigger source.

#### Problem E. Twisty Little Passages

Teleport and walk. k / 2 times. It makes sense that the average is enough and nodes with large degree are visited.

### Round 1a

#### Problem A. Double or One Thing

Divide into groups and only double when the next group is greater than the current.

#### Problem B. Equal Sum

It requires O(N * a_max) to divide an array into same sum if possible. But will result in MLE.

Notice the difference of the second array is less than 1e9 by sorting and assigning greedily. We can use binary numbers to express the gap. Just reverse 2's powers and assign greedily the same.
