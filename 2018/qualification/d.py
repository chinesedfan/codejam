# Wrong Answer
import math

t = int(raw_input())
for i in xrange(1, t + 1):
    area = float(raw_input())
    a2 = area * area
    sin = math.sqrt((a2 - 1) / a2)
    cos = 1 / area

    print 'Case #{}:'.format(i)
    print sin / 2, cos / 2, 0
    print -cos / 2, sin / 2, 0
    print 0, 0, 0.5
