import sys
import math

t, w = map(int, raw_input().split(' '))
c = 0
while c < t:
    c = c + 1

    s = []
    for x in [1,2,3,4,5,6]:
        print x
        sys.stdout.flush()

        s.append(int(raw_input()))

    r = [0] * 6
    r[0] = (s[5] - 2 * s[2] - 4 * (s[1] - s[0])) / 40
    r[1] = s[1] - s[0] - 2 * r[0]
    r[2] = s[2] - s[1] - 4 * r[0]
    r[3] = s[3] - s[2] - (8 * r[0] + 2 * r[1])
    r[4] = s[4] - s[3] - 16 * r[0]
    r[5] = s[5] - s[4] - (32 * r[0] + 4 * r[1] + 2 * r[2])

    print ' '.join(map(str, r))
    sys.stdout.flush()

    raw_input()
