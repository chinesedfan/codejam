import sys
import math

t, w = map(int, raw_input().split(' '))
c = 0
while c < t:
    c = c + 1

    s = []
    for x in [56, 200]: # as well as their gaps are larger than 7, because 2^7 > 100
        print x
        sys.stdout.flush()

        s.append(int(raw_input()))

    r = [0] * 6
    r[0] = s[0] / (2 ** 56)
    r[1] = s[0] / (2 ** 28) - r[0] * 2 ** 28
    r[2] = s[0] / (2 ** 18) - r[0] * 2 ** 38 - r[1] * 2 ** 10
    r[3] = s[1] / (2 ** 50)
    r[4] = s[1] / (2 ** 40) - r[3] * 2 ** 10
    r[5] = s[1] / (2 ** 33) - r[3] * 2 ** 17 - r[4] * 2 ** 7

    print ' '.join(map(str, r))
    sys.stdout.flush()

    raw_input()
