## 2021 - KickStart

### Round A

#### Problem A. K-Goodness String

Compare and calculate the count gap.

#### Problem B. L Shaped Plots

If tried to check every pair of segements, it will be O(N^3 * N^3). But if confirmed one segement, say horizontal, there are only limited counts of vertical segements need to be checked. I built a map to test whether a certain segement is valid. So achived O(N^3) to pass set 1.

Consider from the shared cell. We need to calculate the maximum valid length to 4 different directions, which can be solved by scanning from the opposite direction.

#### Problem C. Rabbit House

Convert the 2D problem into 1D. Scan the array until becomes decreasing, which means we find a maximum value. Then go back to fix the previous elements. When decreasing, we can fix at the same time.

#### Problem D. Checksum

### Round A

#### Problem A. Increasing Substring

Basic DP.

#### Problem B. Longest Progression

Calculate the gap between each element. Every single change will affect 2 continuous gap values. It takes a while to handle those corner cases.

#### Problem D. Truck Delivery

DFS to find the way and sort by pay limit. And group by queries by cities. Build a segement tree to update and query the pay.

### Round C

#### Problem A. Smaller Strings

DP. The end case is special and hard to see at the beginning. 

#### Problem B. Alien Generator

Find all factors and filter.

#### Problem C. Rock Paper Scissors

Greedy can pass set 1. DP to solve all.

#### Problem D. Binary Operator

Parse as tree and use post-order travel to calculate the value as hash. For `a#b`, use a random but fixed return value.

### Round G

#### Problem A. Dogs and Cats

Simulate.

#### Problem B. Staying Hydrated

Find the best x and y independently. Sort and check each endpoint. Use prefix sum to calculate all distances.

#### Problem C. Banana Bunches

Divide K into 2 parts, then fix the start and find the end by binary search. Only enough to pass set 1.

### Round H

#### Problem A. Transform the String

Check each characters and select the best.

#### Problem B. Painter

Linear DP. Maintain whether the previous square contains the required Red/Yellow/Blue.

#### Problem C. Silly Substitutions

Brute-force to pass set 1. Remember the interested places and use linked list to update, instead of scanning the whole string every time.
