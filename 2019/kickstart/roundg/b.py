import math

def solve(n, m, arr):
    mx = max(arr)
    mx = max(mx, math.floor(m / n))

    r = 1
    while mx:
        mx = math.floor(mx / 2)
        r *= 2
    r /= 2
    r = max(r, 1)

    ones = {} # r -> c
    i = r
    while i >= 1:
        ones[i] = reduce(lambda s, a: s + (1 if (a & i) else 0), arr, 0)
        i = i / 2

    # precompute the min
    agg = 0
    mn = {} # r -> min
    i = 1
    while i <= r:
        agg = agg + i * min(ones[i], len(arr) - ones[i])
        mn[i] = agg
        i = i * 2

    # search bit by bit, left to right
    state = {"r": r, "k": 0, "s": 0}
    i = r
    res = -1
    while i >= 1:
        oneBits = ones[state["r"]]
        s = state["s"] + state["r"] * (len(arr) - oneBits)
        if s <= m and (state["r"] == 1 or s + mn[state["r"] / 2] <= m):
            if state["r"] == 1:
                res = max(res, state["k"] + state["r"])
            state = {"r": state["r"] / 2, "k": state["k"] + state["r"], "s": s}
        else:
            s = state["s"] + state["r"] * oneBits
            if s <= m:
                if state["r"] == 1:
                    res = max(res, state["k"])
                state = {"r": state["r"] / 2, "k": state["k"], "s": s}
            else:
                break
        i = i / 2

    return res

t = int(raw_input())
for i in xrange(1, t + 1):
    n, m = map(int, raw_input().split(' '))
    arr = map(int, raw_input().split(' '))

    print 'Case #{}: {}'.format(i, solve(n, m, arr))
