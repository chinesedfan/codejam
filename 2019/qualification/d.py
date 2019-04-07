# Wrong Answer
import sys
import math

def createMsg(parts):
    m = []
    ch = '1'
    for i, p in enumerate(parts):
        for j in xrange(p['len']):
            m.append(ch)
        ch = '0' if ch == '1' else '1'
    return ''.join(m)

def count(s, ch, beg, end): # [i, j)
    rc = 0
    for i in xrange(beg, end):
        if i < len(s) and s[i] == ch:
            rc = rc + 1
        else:
            break

    return rc

t = int(raw_input())
c = 0
while c < t:
    c = c + 1
    n, b, f = map(int, raw_input().split(' '))

    parts = [
        {'len': int(math.ceil(float(n) / 2))},
        {'len': int(math.floor(float(n) / 2))},
    ]
    print createMsg(parts)
    sys.stdout.flush()

    while True:
        ok = all(map(lambda p: p['len'] == 1, parts))
        beg = 0
        ch = '1'
        nparts = []
        # check results
        ipt = raw_input()
        for p in parts:
            left = 0 if p.get('miss') else count(ipt, ch, beg, beg + p['len'])
            beg = beg + left

            # only records all-missing part, other part can be counted
            if p['len'] > 1:
                nparts.append(
                    {'len': int(math.ceil(float(p['len']) / 2)), 'miss': not left},
                )
                nparts.append(
                    {'len': int(math.floor(float(p['len']) / 2)), 'miss': not left}
                )
            else:
                nparts.append({'len': p['len'], 'miss': not left})
            ch = '0' if ch == '1' else '1'
        parts = nparts

        f = f - 1
        if f == 0 or ok:
            ret = []
            for i, p in enumerate(parts):
                if p.get('miss'):
                    ret.append(str(i))
            print ' '.join(ret)
            sys.stdout.flush()

            raw_input() # skip the code
            break
        else:
            print createMsg(parts)
            sys.stdout.flush()
