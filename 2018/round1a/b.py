import math

def getCap(t, item):
    [m, s, p, _] = item
    return max(0, min(m, math.floor((float(t) - p) / s)))

def check(t, cs, r, b):
    for item in cs:
        item[3] = getCap(t, item)
    cs = sorted(cs, lambda c1, c2: int(c2[3] - c1[3]))
    return b <= sum(map(lambda item: item[3], cs[0:r]))

def solve(r, b, c, cs):
    ms = cs[0][1]
    mp = cs[0][2]
    for item in cs:
        if item[1] > ms:
            ms = item[1]
        if item[2] > mp:
            mp = item[2]

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
    for j in xrange(c):
        m, s, p = map(int, raw_input().split(' '))
        cs.append([m, s, p, 0])

    print 'Case #{}: {}'.format(i, solve(r, b, c, cs))
