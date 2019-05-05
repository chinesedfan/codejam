## 2018

### Qualification

#### Problem A. Saving The Universe Again

Find the first `CS` and swap them, until less than or equal to the limit, or no more `CS`.

#### Problem B. Trouble Sort

Sort odd and even elements separately, and compare adjacent elements.

#### Problem C. Go, Gopher!

For visible tests, always try to make a 4x5 rectangle. Keep outputing each inner point until all its neighbours are prepared.
For hidden tests, always try to make a 3x(3xN) rectangle.

#### Problem D. Cubic UFO

For visible tests, keep one center at `(0, 0, 0.5)` and rotate the xy plane.

### Round 1a

#### Problem A. Waffle Choppers

Scan by rows and columns, with a final check for each cells.

#### Problem B. Bit Party

Sort by capacity and binary search to determine the time.

#### Problem C. Edgy Baking

DP for cut additions: not cut or cut. But MLE. Change to do intervals merge.

### Round 1b

#### Problem A. Rounding Error

Greedy. Try to create round-up as much as possible.

#### Problem B. Mysterious Road Signs

Construct two chains: M-fixed and N-fixed. Try to connect directly if M/N equals the chain, or switch to the other chain. If connected by coincidence, inherit the chain length.

### Round 1c

#### Problem A. A Whole New Word

Trivial. Collect all possiable characters for each position and loop them.

#### Problem B. Lollipop Shop

Always try to output the less frequent and valid one.

#### Problem C. Ant Stack

Dynamic programming. g(x, y) means the minimal weight sum when only consider the first x ants and form a y-height stack. The maximum possible stack height should be determined in advance.
