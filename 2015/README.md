## 2015

### Round 1a

#### Problem A. Mushroom Monster

For method 1, if a item is less than the previous one, it means Kaylin eats them. For method 2, we should: 1) find the largest gap to determine Kaylin's rate; 2) check each item, if it is less than the rate, than Kaylin may have eaten all and wait; otherwise, Kaylin eats the rate amount.

#### Problem B. Haircut

Binary search to determine the time that need to wait. Then find which barber is.

#### Problem C. Logging

For each point: 1) connect it with every other point, and sort those lines by slope; 2) divide lines into 2 groups, which means group1 is above the point and group2 is below; 3) rotate the separator line from horizontally to 180 degree, and calculate the count; 4) if one group is empty, that means the point is at the edge of forest; otherwise, the less count of group is the number of trees that needs to be cut down.
