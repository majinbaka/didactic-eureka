#!/usr/bin/env python3
"""Generate matching 20x20 body/outfit animation atlases at 128px per cell."""
import json, math
from pathlib import Path
from PIL import Image, ImageDraw

ROOT=Path(__file__).resolve().parent; UNIT=32; CELL=128; COLS=ROWS=20
BO="#4b2d24"; SKIN="#e2aa81"; LIGHT="#f2c79b"; RO="#24352f"
ROBE="#6f9278"; RLIGHT="#9eb09a"; TROUSER="#263a31"; SASH="#e3d5ad"; SHOE="#493a2c"
ANIMATIONS=[("idle",4,6),("walk",6,10),("run",6,14),("jump",4,12),
 ("fly",4,10),("hello",6,7),("scratch",6,7),("doze",6,4),
 ("sit",4,4),("crawl",6,8),("hurt",4,10),("collapse",6,8)]

def pt(cx,cy,n,a): return cx+math.cos(a)*n,cy+math.sin(a)*n

def pose(action,f,n):
 q={"head":(17,8),"neck":(16,11),"hip":(16,20),"la":(-.2,1.5),"ra":(.15,1.45),"ll":(1.55,1.5),"rl":(1.5,1.45)}
 phase=f/n*math.tau
 if action=="idle": q["head"]=(17,8+(f==2));q["hip"]=(16,20+(f==2))
 elif action=="walk":
  s=math.sin(phase)*.75;q.update(la=(-.1+s,1.35),ra=(.1-s,1.35),ll=(1.55-s,1.45),rl=(1.55+s,1.45))
 elif action=="run":
  s=math.sin(phase)*1.05;q.update(head=(18,9),neck=(17,12),hip=(15,20),la=(-.65+s,1.25),ra=(-.25-s,1.25),ll=(1.45-s,1.55),rl=(1.55+s,1.55))
 elif action=="jump":
  z=[0,-2,-1,1][f];q.update(head=(18,7+z),neck=(17,10+z),hip=(16,19+z),la=(-.65,1.35),ra=(-.15,1.35),ll=(.9,1.35),rl=(2.2,1.35))
 elif action=="fly":
  w=math.sin(phase)*.15;q.update(head=(23,12),neck=(20,14),hip=(13,17),la=(-2.8+w,1.25),ra=(-2.55-w,1.25),ll=(2.9+w,1.15),rl=(2.65-w,1.15),horizontal=True)
 elif action=="hello": q.update(la=(-.15,1.35),ra=(-1.55+(-1 if f%2 else 1)*.3,1.05))
 elif action=="scratch": q.update(la=(-.2,1.4),ra=(-1.75+(-1 if f%2 else 1)*.18,.8))
 elif action=="doze":
  z=[0,1,2,2,1,0][f];q.update(head=(17+z*.4,8+z),neck=(16,11+z*.4),la=(.45,1.35),ra=(.15,1.35),eyes=True)
 elif action=="sit": q.update(head=(17,13+f%2),neck=(16,16+f%2),hip=(14,24),la=(.5,1.2),ra=(.2,1.2),ll=(.2,1.3),rl=(.05,1.25))
 elif action=="crawl":
  s=math.sin(phase)*.45;q.update(head=(23,19),neck=(20,20),hip=(12,22),la=(2.2+s,1.1),ra=(2.7-s,1.1),ll=(2.6-s,1.1),rl=(2.15+s,1.1),flat=True)
 elif action=="hurt": q.update(head=(14,9),neck=(14,12),hip=(17,21),la=(-.65,1.25),ra=(-.95,1.2),ll=(1.85,1.4),rl=(1.25,1.4),hurt=True)
 elif action=="collapse":
  t=[0,.25,.5,.75,1,1][f];q.update(head=(17+7*t,8+18*t),neck=(16+5*t,11+14*t),hip=(16-4*t,20+7*t),la=(-.2+2.3*t,1.35),ra=(.15+2.45*t,1.35),ll=(1.55+1.2*t,1.45),rl=(1.5+1.35*t,1.45),flat=t>.85)
 return q

def joints(q):
 hx,hy=q["head"];nx,ny=q["neck"];px,py=q["hip"];sh=(nx,ny+2)
 arms=[]
 for k,side in (("la",-1),("ra",1)):
  a,b=q[k];root=(sh[0]+side*2,sh[1]+1);elbow=pt(*root,5,a);hand=pt(*elbow,5,a+(b-1.35)*side);arms.append((root,elbow,hand))
 legs=[]
 for k,side in (("ll",-1),("rl",1)):
  a,b=q[k];root=(px+side*2,py);knee=pt(*root,5,a);foot=pt(*knee,6,a+(b-1.45)*side);legs.append((root,knee,foot))
 return (hx,hy),sh,(px,py),arms,legs

def line(d,xy,color,w): d.line([(round(x),round(y)) for x,y in xy],fill=color,width=w,joint="curve")

def body(q):
 im=Image.new("RGBA",(UNIT,UNIT));d=ImageDraw.Draw(im);head,sh,hip,arms,legs=joints(q)
 for chain in legs+arms: line(d,chain,BO,5);line(d,chain,SKIN,3)
 for _,_,hand in arms:
  x,y=hand;d.ellipse((x-2,y-2,x+2,y+2),fill=BO);d.rectangle((x-1,y-1,x+1,y+1),fill=LIGHT)
 line(d,[sh,hip],BO,8);line(d,[sh,hip],SKIN,6)
 x,y=head;d.ellipse((x-5,y-6,x+5,y+5),fill=BO);d.ellipse((x-4,y-5,x+4,y+4),fill=SKIN);d.polygon([(x-3,y-3),(x+1,y-4),(x+4,y-1),(x+1,y+2)],fill=LIGHT);d.point((x+3,y+(1 if q.get("eyes") else 0)),fill=BO)
 return im

def outfit(q):
 im=Image.new("RGBA",(UNIT,UNIT));d=ImageDraw.Draw(im);_,sh,hip,arms,legs=joints(q)
 for chain in legs: line(d,chain[:2],RO,7);line(d,chain[:2],TROUSER,5);line(d,chain[1:],SHOE,5)
 for root,elbow,hand in arms: line(d,[root,elbow,hand],RO,7);line(d,[root,elbow,hand],ROBE,5);line(d,[pt(*hand,2.4,math.pi),hand],SASH,3)
 sx,sy=sh;hx,hy=hip;d.polygon([(sx-5,sy-1),(sx+5,sy-1),(hx+6,hy+2),(hx-6,hy+2)],fill=RO);d.polygon([(sx-4,sy),(sx+4,sy),(hx+5,hy+1),(hx-5,hy+1)],fill=ROBE);line(d,[(sx-3,sy+1),(hx+3,hy-1)],RLIGHT,2);line(d,[(hx-5,hy-1),(hx+5,hy-1)],SASH,2)
 return im

sheet_size=(COLS*CELL,ROWS*CELL);bs=Image.new("RGBA",sheet_size);os=Image.new("RGBA",sheet_size);animations={};index=0
for action,count,fps in ANIMATIONS:
 entries=[]
 for f in range(count):
  q=pose(action,f,count);xy=((index%COLS)*CELL,(index//COLS)*CELL)
  bs.alpha_composite(body(q).resize((CELL,CELL),Image.NEAREST),xy);os.alpha_composite(outfit(q).resize((CELL,CELL),Image.NEAREST),xy);entries.append(index);index+=1
 animations[action]={"frames":entries,"fps":fps,"loop":action not in ("hurt","collapse")}
bs.save(ROOT/"base-body-sheet-20x20.png",optimize=True);os.save(ROOT/"outfit-jade-sheet-20x20.png",optimize=True)
Image.alpha_composite(bs.crop((0,0,CELL,CELL)),os.crop((0,0,CELL,CELL))).save(ROOT/"preview-idle-right-00.png",optimize=True)
manifest={"version":2,"cellWidth":CELL,"cellHeight":CELL,"columns":COLS,"rows":ROWS,"sheetWidth":COLS*CELL,"sheetHeight":ROWS*CELL,"frameCount":index,"animations":animations,"reservedCells":COLS*ROWS-index}
(ROOT/"atlas.json").write_text(json.dumps(manifest,indent=2)+"\n",encoding="utf-8")
print(f"Generated {index} frames; {COLS*ROWS-index} cells reserved")
