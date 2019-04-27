import math

def getCap(t, item):
    [m, s, p, _] = item
    ret = (t - p) / s
    if ret > m:
        ret = m
    if ret < 0:
        ret = 0
    return ret

def check(t, cs, r, b):
    caps = [0] * len(cs)
    for i in xrange(len(cs)):
        caps[i] = getCap(t, cs[i])
    caps.sort(reverse=True) # much faster than `sorted(iterable, cmp)`
                            # learned from https://github.com/kamyu104/GoogleCodeJam-2018/blob/master/Round%201A/bit-party.py

    s = 0
    for x in xrange(r):
        s = s + caps[x]
    return b <= s

def solve(r, b, c, cs, ms, mp):
    tmin = 0
    tmax = b * ms + mp
    while tmin < tmax:
        middle = (tmin + tmax) / 2  # keep as int, instead of float
        if check(middle, cs, r, b):
            tmax = middle
        else:
            if tmin + 1 == tmax:
                break
            tmin = middle
    return tmax

t = int(raw_input())
for i in xrange(1, t + 1):
    r, b, c = map(int, raw_input().split(' '))

    cs = []
    ms = float('-inf')
    mp = float('-inf')
    for j in xrange(c):
        m, s, p = map(int, raw_input().split(' '))
        if s > ms:
            ms = s
        if p > mp:
            mp = p
        cs.append([m, s, p, 0])

    print 'Case #{}: {}'.format(i, solve(r, b, c, cs, ms, mp))
