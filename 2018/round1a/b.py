import math

def getCap(t, item):
    [m, s, p] = item
    return max(0, min(m, math.floor((float(t) - p) / s)))

def check(t, cs, r, b):
    cs = sorted(cs, lambda c1, c2: int(getCap(t, c2) - getCap(t, c1)))
    return b <= sum(map(lambda item: getCap(t, item), cs[0:r]))

def solve(r, b, c, cs):
    ms = max(cs, key=lambda item: item[1])[1]
    mp = max(cs, key=lambda item: item[2])[2]

    tmin = 0
    tmax = b * ms + mp
    while tmin < tmax:
        middle = long(math.floor((tmin + tmax) / 2))
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
        cs.append([m, s, p])

    print 'Case #{}: {}'.format(i, solve(r, b, c, cs))
