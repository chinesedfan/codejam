import sys
import math

t, b = map(int, raw_input().split(' '))
c = 0
while c < t:
    c = c + 1

    s = []
    for x in xrange(1, b + 1):
        print x
        sys.stdout.flush()

        s.append(int(raw_input()))

    print ''.join(map(str, s))
    sys.stdout.flush()

    raw_input()
