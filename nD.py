# -*- coding: utf-8 -*-
# NGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

import os

template = os.path.join('.', 'templates', '{}')
main = os.path.join('.', 'main', '{}')
minN = 3
maxN = 10

def fffff(__N__):
    from itertools import combinations
    return (lambda n:[[int(w,2) for w in z.split(' ')] for z in sorted(' '.join([sorted([''.join(['0' if m in l+j else '1' for m in range(n-1,-1,-1)]) for l in (lambda x:[(),(x[0],),(x[1],),(x[0],x[1])])(k)])[5-y if y in [2,3] else y] for y in range(4)]) for i in range(n-1) for j in combinations(range(n), i) for k in combinations([l for l in range(n) if l not in j],2)  )])(__N__)

def oooOoO00oO0OOOo000O0000o0o0oOoo0Ooo0O0oo0oooO0o00O0OO00OoOooO0oOoooOOooOOOOOo00oO00o0O0oOo000O0O0O0O00O00(__N__, __COLORF__, __INDEX__ = None):
    if __INDEX__ == None: __INDEX__ = 0
    fa = fffff(__N__-1)
    N = len(fa)
    return (lambda n,colorf,idx: (lambda t1,t2: '\n\n'.join(['\n'.join(['    v{0}[{1}] = new Vertex({2});'.format(i+1,j,', '.join(k)) for j,k in enumerate(s)]+[f'    faces.push(new Face({__COLORF__(i)}, {", ".join([f"v{i+1}[{m}]" for m in l])}));' for l in fa]+[f'    for (let i = 0; i < v{i+1}.length; i++) {"{"}\n        v{i+1}[i].rotate(r);\n        v{i+1}[i].project();\n    {"}"}']) for i,s in enumerate(t1+t2)]))([[(lambda l: [l[(k+1)%(i+1) if i>0 and k<=i else k] if i<n-1 else (l[(k+1)%(i+2-n) if k<=i+1-n else k] if k!=i+1-n else l[0][1:].replace('-','+')) for k in range(n-1)]+[l[-1]+('' if j%2==0 else '+Math.cos(theta)*w')])([f'-w/2{"-Math.sin(theta)*w" if j%2==1 else ""}']+['w/2' if 2**(n-2-k)&j!=0 else '-w/2' for k in range(n-2)]+['-w/2']) for j in range(2**(n-1))] for i in range(2*n-2)], [[[('w/2' if 2**(n-2-k)&j!=0 else '-w/2') if i=='-w/2' else (('w/2+Math.sin(theta)*w-Math.cos(theta*2)*w' if (j>>(n-2-idx))%2==0 else 'w/2+Math.sin(theta)*w') if k==idx else ('w/2' if 2**(n-2-k)&j!=0 else '-w/2')) for k in range(n-1)]+['-w/2'+(('+Math.cos(theta)*w+Math.sin(theta*2)*w' if (j>>(n-2-idx))%2==0 else '+Math.cos(theta)*w') if i=='w/2' else '')] for j in range(2**(n-1))] for i in ['-w/2', 'w/2']]))(__N__, __COLORF__, __INDEX__)

def gen():
    for n in range(minN, maxN + 1):
        with open(template.format('nD.html'), 'r') as f, open(main.format(f'{n}D.html'), 'w') as g, open(template.format('nD.js'), 'r') as p, open(main.format(f'{n}D.js'), 'w') as q:
            g.write(f.read().replace('__UIIAIUIIIAI__', str(n)))
            q.write(p.read().replace('__NGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA__', oooOoO00oO0OOOo000O0000o0o0oOoo0Ooo0O0oo0oooO0o00O0OO00OoOooO0oOoooOOooOOOOOo00oO00o0O0oOo000O0O0O0O00O00(n, lambda x:'color%s'%(x+1), 0)))
            print('[+] The %sD part is DONE!'%n)

if '__main__' == __name__:
    gen()