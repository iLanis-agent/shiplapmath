import json, random
def dec2(n):
    w, f = divmod(n, 100)
    fs = str(f).zfill(2).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def hu(n, d): return (2*n + d) // (2*d)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def boards(l, h, e, b):
    rows = (h*12 + e - 1)//e; per = (l + b - 1)//b
    return f"The wall of {l} ft at {h} ft tall takes {pl(rows,' course',' courses')} of {pl(per,' board',' boards')} each, {pl(rows*per,' board',' boards')} in all."
def cover(e, b):
    return f"The board of {b} ft at {e} inches exposed covers {dec2(hu(e*b*100,12))} sq ft."
def nails(b, n, x):
    t = b*n; bx = (t + x - 1)//x
    return f"The {pl(b,' board',' boards')} at {n} nails each take {t} nails, or {pl(bx,' box',' boxes')} of {x}."
def cost(b, bp, x, xp, l, h):
    c = b*bp + x*xp; a = l*h
    return f"The {pl(b,' board',' boards')} at ${dec2(bp)} and the {pl(x,' box',' boxes')} at ${dec2(xp)} cost ${money(c)}, or ${money(hu(c,a))} a square foot over the {a}."
random.seed(752)
cases = [
 dict(fn="boards", args=["20","8","6","12"], expect=boards(20,8,6,12)),
 dict(fn="cover", args=["6","12"], expect=cover(6,12)),
 dict(fn="nails", args=["32","8","1000"], expect=nails(32,8,1000)),
 dict(fn="cost", args=["32","18","1","25","20","8"], expect=cost(32,1800,1,2500,20,8)),
]
R=random.randint
for _ in range(25):
    l,h,e,b=R(1,1000),R(1,100),R(1,24),R(1,24); cases.append(dict(fn="boards", args=[str(l),str(h),str(e),str(b)], expect=boards(l,h,e,b)))
for _ in range(25):
    e,b=R(1,24),R(1,24); cases.append(dict(fn="cover", args=[str(e),str(b)], expect=cover(e,b)))
for _ in range(20):
    bd,n,x=R(1,1000000),R(1,100),R(1,100000); cases.append(dict(fn="nails", args=[str(bd),str(n),str(x)], expect=nails(bd,n,x)))
for _ in range(20):
    bd,bp,x,xp,l,h=R(1,1000000),R(1,1000000),R(1,1000000),R(1,1000000),R(1,1000),R(1,100)
    cases.append(dict(fn="cost", args=[str(bd),dec2(bp),str(x),dec2(xp),str(l),str(h)], expect=cost(bd,bp,x,xp,l,h)))
errs=[["boards",["0","8","6","12"]],["boards",["20","0","6","12"]],["boards",["20","8","0","12"]],["boards",["20","8","6","0"]],
 ["cover",["0","12"]],["cover",["6","0"]],["nails",["0","8","1000"]],["nails",["32","0","1000"]],["nails",["32","8","0"]],
 ["cost",["0","18","1","25","20","8"]],["cost",["32","0","1","25","20","8"]],["cost",["32","18","1","25","20","0"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
