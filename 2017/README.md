## 2017

### Qualification

#### Problem A. Oversized Pancake Flipper

Just flip from left to right. If it is happy side up, move the cursor.

#### Problem B. Tidy Numbers

Check every 2 digits from right to left: 1) if the first is less than the second, move the cursor; 2) otherwise, set digits from the second to the right end to 9, and decrease the first. Moreover, if the first is 0, browser from the previous position.

#### Problem C. Bathroom Stalls

Simulate stalls level by level: 1) the first person faces n continous stalls; 2) if n is odd, the second person faces 2 continous stalls which both are `(n - 1) / 2`; if n is even, they are `n / 2` and `n / 2 - 1`. For each level, there will be at most 2 different length.

#### Problem D. Fashion Show

(TODO)

### Round 1a

#### Problem A. Alphabet Cake

Extend each cell to fullfill the row. For rows that are empty: 1) copy as the pervious row if there has; 2) copy as the first next non-empty row.

### Round 1c

#### Problem A. Ample Syrup

Total surface equals to `PI * maxRadius * maxRadius + sumOfBorders`. So find K largest borders and check from the largest radius: 1) if the current radius is among those candidates, return; 2) try to replace the current one with the smallest border candidate.

#### Problem B. Parenting Partnering

Small dataset can be solved case by case. The general solution is: 1) sort all activities by the start time; 2) consider continuous activities that belong to the same person as a big activity, and gaps between different person's activities as candidates; 3) give all candidates to the less time person; 4) if the less time one reaches 720, then the exchange times are the length of gaps; otherwise, move gaps between the more time person to the less time person until it reaches 720, and each move increase 2 exchange times.

### Problem C.Core Training

For small set, sort from high to low and try to train the lowest one as high as possible.
