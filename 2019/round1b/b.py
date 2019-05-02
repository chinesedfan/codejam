import sys
import math

t, w = map(int, raw_input().split(' '))
c = 0
while c < t:
    c = c + 1

    s = []
    for x in [56, 200]: # as long as their gaps are larger than 7, because 2^7 > 100
        print x
        sys.stdout.flush()

        s.append(int(raw_input()))

    r = [0] * 6
    r[3] = s[1] / (2 ** 50)
    r[4] = s[1] / (2 ** 40) - r[3] * 2 ** 10
    r[5] = s[1] / (2 ** 33) - r[3] * 2 ** 17 - r[4] * 2 ** 7
    r[0] = s[0] / (2 ** 56)
    r[1] = s[0] / (2 ** 28) - r[0] * 2 ** 28
    r[2] = (s[0] / (2 ** 9) - r[0] * 2 ** 47 - r[1] * 2 ** 19 - r[3] * 2 ** 5 - r[4] * 2 ** 2 - r[5]) / (2 ** 9)

    print ' '.join(map(str, r))
    sys.stdout.flush()

    raw_input()
