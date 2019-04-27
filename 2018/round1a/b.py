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
    for item in cs:
        item[3] = getCap(t, item)
    cs = sorted(cs, lambda c1, c2: int(c2[3] - c1[3]))

    s = 0
    for x in xrange(r):
        s = s + cs[x][3]
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
