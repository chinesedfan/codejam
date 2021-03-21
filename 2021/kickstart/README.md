## 2021 - KickStart

### Round A

#### Problem A. K-Goodness String

Compare and calculate the count gap.

#### Problem B. L Shaped Plots

If tried to check every pair of segements, it will be O(N^3 * N^3). But if confirmed one segement, say horizontal, there are only limited counts of vertical segements need to be checked. I built a map to test whether a certain segement is valid. So achived O(N^3) to pass set 1.

#### Problem C. Rabbit House

Convert the 2D problem into 1D. Scan the array until becomes decreasing, which means we find a maximum value. Then go back to fix the previous elements. When decreasing, we can fix at the same time.

#### Problem D. Checksum
