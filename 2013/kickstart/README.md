## 2013 - KickStart

### Practice Round

#### Problem A. Bad Horse

Treat each member as a node, and pairs are connections. Set colors for each node. Once there has conflicts, it fails. Otherwise, it is valid.

#### Problem B. Captain Hammer

A simple physical and triangle function problem.

#### Problem C. Moist

Insertion sorting.

### Round A

#### Problem A. Read Phone Number

Separate and count continuous numbers.

#### Problem B. Rational Number Tree 

For n -> p/q, convert n to binary format, then we know choose left or right at each level.
For p/q -> n, determine the level and xth nodes at the current level.

#### Problem C. Sorting

Filter and sort. Merge back at last.

#### Problem D. Cross the maze

DFS.

#### Problem E. Spaceship Defence

Shortest path. Floyd is nearly not able to solve the small set. But notice that only 26 * 10 kinds of rooms, we can convert N rooms to a limited scale.

### Round B

#### Problem A. Sudoku Checker

Simple.

#### Problem B. Meet and party
#### Problem C. Hex

BFS to check. Too much difference between stone counts is impossible. More important, make sure the winner has at least 1 stone that can't be moved, and not less total stones. Don't worry. It is fast enough to remove each stone and check.

#### Problem D. Dragon Maze

Similar with max version of Dijkstra. But instead of adding one node each round, add one layer that shares with the same distance.

#### Problem E. Ignore all my comments

Use a stack to maintain matches. Ignore close mark if there has no begin mark.
