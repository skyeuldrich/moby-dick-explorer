from pathlib import Path
import numpy as np
from PIL import Image,ImageFilter,ImageDraw
root=Path.cwd()
def transfer(base, scan, region, corners, strength):
    # Solve the inverse homography so the original ink follows the photographed page.
    interior=scan.crop(region).convert('L')
    ink=np.asarray(interior,dtype=float)
    local=np.asarray(interior.filter(ImageFilter.GaussianBlur(18)),dtype=float)
    density=np.clip((local-ink+2)/np.maximum(local,10)*1.45,0,0.93)*strength
    alpha=Image.fromarray((density*255).astype('uint8'))
    w,h=alpha.size
    rows=[];v=[]
    for (x,y),(u,t) in zip(corners,[(0,0),(w,0),(w,h),(0,h)]):
        rows.extend([[x,y,1,0,0,0,-x*u,-y*u],[0,0,0,x,y,1,-x*t,-y*t]]);v.extend([u,t])
    coeff=np.linalg.solve(rows,v)
    mask=alpha.transform(base.size,Image.Transform.PERSPECTIVE,coeff,Image.Resampling.BICUBIC)
    return Image.composite(Image.new('RGB',base.size,(27,23,19)),base,mask)
def paint(orientation, quad, whales):
    base=Image.open(root/f'art/immersive-desk/{orientation}-plate.webp').convert('RGB')
    archive=root/'public/assets/archive'
    scan=Image.open(archive/'whalemens-shipping-paper.webp')
    w,h=scan.size
    base=transfer(base,scan,(int(.045*w),int(.009*h),int(.979*w),int(.967*h)),quad,1)
    log=Image.open(archive/'bloomfield-indian-chief-1842-44.webp')
    w,h=log.size
    base=transfer(base,log,(int(.05*w),int(.04*h),int(.35*w),int(.54*h)),whales,.85)
    base.save(root/f'public/assets/desk-{orientation}.webp',quality=88,method=6)
if __name__=='__main__':
    paint('landscape',[(342,91),(994,28),(1229,857),(443,975)],[(8,604),(330,502),(373,791),(58,899)])
    paint('portrait',[(195,611),(711,551),(846,1201),(284,1280)],[(21,804),(186,750),(218,980),(66,1020)])
