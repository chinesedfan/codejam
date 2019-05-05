import sys
import math

# def debug(*msg):
#     df.write(' '.join(map(str, msg)) + '\n')
#     df.flush()

# df = open('b.debug.log', 'w')

t, f = map(int, raw_input().split(' '))
c = 0
while c < t:
    c = c + 1

    answer = []
    allIndexes = xrange(120 - 1)
    expected = 24 # (unknown - 1)!
    askedIndexes = xrange(119)
    for pos in xrange(1, 5):
        chs = {'A': [], 'B': [], 'C': [], 'D': [], 'E': []}
        for i in askedIndexes:
            if i >= len(allIndexes):
                continue

            print allIndexes[i] * 5 + pos
            sys.stdout.flush()

            ch = raw_input()
            chs[ch].append(i)

        lost = ''
        for ch in 'ABCDE':
            if not ch in answer and not len(chs[ch]) == expected:
                lost = ch
                break

        others = []
        for ch in 'ABCDE':
            if not ch in answer and not ch == lost:
                others = others + chs[ch]
        others = [allIndexes[i] for i in others]

        oldAllIndexes = allIndexes
        allIndexes = []
        for i in oldAllIndexes:
            if not i in others:
                allIndexes.append(i)

        unknown = 5 - pos
        expected = 1 
        for i in xrange(1, unknown):
            expected = expected * i

        askedIndexes = xrange(expected * unknown - 1)
        answer.append(lost)

    for ch in 'ABCDE':
        if not ch in answer:
            answer.append(ch)
            break

    print ''.join(answer)
    sys.stdout.flush()

    raw_input()
