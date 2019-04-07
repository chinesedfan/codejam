def gcd(a, b):
    while b > 0:
        r = a % b
        a = b
        b = r
    return a

def solve(n, length, s):
    m = {} # p -> 1
    ps = [0] * (length + 1)
    for i in xrange(length):
        if i == 0:
            continue

        x = gcd(s[i - 1], s[i])
        if not x == s[i]:
            ps[i] = x
            m[x] = 1
    for i in xrange(length):
        if ps[i]:
            j = i - 1
            while j >= 0 and ps[j] == 0:
                ps[j] = s[j] / ps[j + 1]
                m[ps[j]] = 1
                j = j - 1

            j = i + 1
            while j <= len(s) and ps[j] == 0:
                ps[j] = s[j - 1] / ps[j - 1]
                m[ps[j]] = 1
                j = j + 1

    chs = {}
    for i, p in enumerate(sorted(m.keys())):
        chs[p] = chr(ord('A') + i)
    return ''.join(map(lambda p: chs[p], ps))

t = int(raw_input())
for i in xrange(1, t + 1):
    n, length = map(int, raw_input().split(' '))
    s = map(long, raw_input().split(' '))

    print 'Case #{}: {}'.format(i, solve(n, length, s))
