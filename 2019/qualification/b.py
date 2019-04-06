import math

def solve(n, p):
    ce = 0
    cs = 0
    prev = ''
    length = 0
    ps = [] # parts
    for ch in p:
        if ch != prev:
            if ch == 'E':
                ce = ce + 1
            else:
                cs = cs + 1

            if prev:
                ps.append({
                    'ch': prev,
                    'length': length
                })
            length = 1
            prev = ch
        else:
            length = length + 1

    if length:
        ps.append({
            'ch': prev,
            'length': length
        })

    more = 'E' if ce > cs else 'S'
    cut = -1
    for i, p in enumerate(ps):
        if p['ch'] != more and p['length'] > 1:
            cut = i
            break

    ret = [] # parts
    i = 0
    while i < len(ps):
        if cut < 0:
            # simple reverse
            ret.append(('S' if ps[i]['ch'] == 'E' else 'E') * ps[i + 1]['length'])
            ret.append(ps[i]['ch'] * ps[i]['length'])
            i = i + 2
        else:
            if i == cut - 1:
                ret.append(('S' if ps[i]['ch'] == 'E' else 'E') * 1) # offset 1
                ret.append(ps[i]['ch'] * (ps[i]['length'] + ps[i + 2]['length']))
                ret.append(('S' if ps[i]['ch'] == 'E' else 'E') * (ps[i + 1]['length'] - 1))
                i = i + 3
            else:
                ret.append(('S' if ps[i]['ch'] == 'E' else 'E') * ps[i + 1]['length'])
                ret.append(ps[i]['ch'] * ps[i]['length'])
                i = i + 2
    return ''.join(ret)

t = int(raw_input())
for i in xrange(1, t + 1):
    n = float(raw_input())
    p = raw_input()

    print 'Case #{}: {}'.format(i, solve(n, p))
