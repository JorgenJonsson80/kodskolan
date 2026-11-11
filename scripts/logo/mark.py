# Den lilla loggan (sidhuvudet, fliken och hemskärmen) ur docs/logga.png:
# bara K:et, utan klamrarna, </>, AI och bågen som blir grus i 32 pixlar.
# Kör: python3 scripts/logo/mark.py
import sys
from PIL import Image, ImageDraw, ImageFilter
im=Image.open('docs/logga.png').convert('RGB')
k=im.crop((540,175,1000,635))
W=460
binary=k.convert('L').point(lambda v:255 if v>70 else 0)
d=ImageDraw.Draw(binary)
d.rectangle((312,158,W,250),fill=0)
off=6
edge=lambda y: 260+(y-250)*0.82+off
d.polygon([(W,255),(edge(255),255),(edge(W),W),(W,W)],fill=0)
# Bågen under AI är blå och nuddar benet: ta bort blått nere till höger.
px=k.load(); bp=binary.load()
for y in range(330,W):
    for x in range(340,W):
        r,g,b=px[x,y]
        if b>r+25: bp[x,y]=0
for seed in [(100,150),(300,100),(250,380)]:
    ImageDraw.floodfill(binary,seed,128)
kmask=binary.point(lambda v:255 if v==128 else 0)
kmask=kmask.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(1.2))
S=560
out=Image.new('RGB',(S,S),(8,6,40))
glow=Image.new('RGB',(S,S),(70,25,160))
gm=Image.new('L',(S,S),0); ImageDraw.Draw(gm).ellipse((40,40,S-40,S-40),fill=110)
out=Image.composite(glow,out,gm.filter(ImageFilter.GaussianBlur(90)))
out.paste(k,((S-W)//2+12,(S-W)//2+4),kmask)
for name, size in [('logo-mark', 128), ('favicon', 64), ('apple-touch-icon', 180)]:
    out.resize((size, size), Image.LANCZOS).save(f'public/{name}.png', optimize=True)
