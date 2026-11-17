// Local anatomical deformation of the owner's images, not new illustrations.
const TAU = Math.PI * 2;
const clamp = v => Math.max(0, Math.min(1, v));
export const species = [
  {id:'angler', file:'anglerfish', w:1702,h:848, alpha:.12, duration:19, lights:[[.944,.313,'#9fcac3',1.2]]},
  {id:'jelly', file:'jellyfish',w:948,h:586,alpha:.055,duration:4.9, lights:[[.749,.292,'#7faeb4',4.5]]},
  {id:'loosejaw',file:'stoplight-loosejaw',w:1616,h:349,alpha:.10,duration:23, lights:[[.161,.335,'#a93635',1.0],...[ [415,149],[499,179],[700,205],[813,205],[934,187],[1073,190],[1279,215],[1318,216] ].map(([x,y])=>[x/1616,y/349,'#679caa',.48])]},
];
export function deform(id,x,y,phase){
 const t=phase*TAU;
 if(id==='angler'){
  const lure=clamp((x-.69)/.2)*clamp((.52-y)/.22);
  const fin=clamp((.60-x)/.25)*clamp((y-.43)/.32);
  const correction=Math.pow(Math.max(0,Math.cos(t)),12);
  return [x+lure*Math.sin(t*2)*.009+fin*Math.sin(t*3)*.003,y+lure*Math.cos(t*2)*.006+fin*Math.sin(t*4)*.009*correction];
 }
 if(id==='jelly'){
  const pulse=phase<.22?Math.sin(phase/.22*Math.PI/2):.5+.5*Math.cos((phase-.22)/.78*Math.PI);
  const bell=clamp((x-.40)/.23)*clamp((.58-y)/.19);
  const tentacle=1-clamp((x-.34)/.36)*clamp((.56-y)/.17);
  return [x+(x-.75)*pulse*.10*bell+tentacle*Math.sin(t-.9+y*3)*.012,y+(y-.18)*pulse*.12*bell+tentacle*Math.sin(t-1.3+x*3)*.012-pulse*.007];
 }
 const tail=clamp((x-.27)/.73), active=Math.pow(Math.max(0,Math.cos(t)),4);
 return [x,y+Math.sin(t*3-x*9)*tail*tail*.025*active];
}
function triangle(ctx,img,s,d){
 const [a,b,c]=s,[u,v,w]=d;
 const det=a[0]*(b[1]-c[1])+b[0]*(c[1]-a[1])+c[0]*(a[1]-b[1]);
 const coef=(z)=>[(z[0]*(b[1]-c[1])+z[1]*(c[1]-a[1])+z[2]*(a[1]-b[1]))/det,(z[0]*(c[0]-b[0])+z[1]*(a[0]-c[0])+z[2]*(b[0]-a[0]))/det,(z[0]*(b[0]*c[1]-c[0]*b[1])+z[1]*(c[0]*a[1]-a[0]*c[1])+z[2]*(a[0]*b[1]-b[0]*a[1]))/det];
 const [aa,cc,ee]=coef([u[0],v[0],w[0]]),[bb,dd,ff]=coef([u[1],v[1],w[1]]);
 ctx.save();ctx.beginPath();ctx.moveTo(...u);ctx.lineTo(...v);ctx.lineTo(...w);ctx.closePath();ctx.clip();ctx.transform(aa,bb,cc,dd,ee,ff);ctx.drawImage(img,0,0);ctx.restore();
}
export function makeFrame(img,entry,phase){
 const W=320,H=W*entry.h/entry.w,P=12,c=document.createElement('canvas');c.width=W+2*P;c.height=Math.ceil(H+2*P);
 const ctx=c.getContext('2d');ctx.globalAlpha=entry.alpha;
 const nx=12,ny=8,points=[];
 for(let j=0;j<=ny;j++){points[j]=[];for(let i=0;i<=nx;i++){const [x,y]=deform(entry.id,i/nx,j/ny,phase);points[j][i]=[P+x*W,P+y*H]}}
 for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){
  const a=[i/nx*img.width,j/ny*img.height],b=[(i+1)/nx*img.width,j/ny*img.height],d=[i/nx*img.width,(j+1)/ny*img.height],e=[(i+1)/nx*img.width,(j+1)/ny*img.height];
  triangle(ctx,img,[a,b,d],[points[j][i],points[j][i+1],points[j+1][i]]);triangle(ctx,img,[b,e,d],[points[j][i+1],points[j+1][i+1],points[j+1][i]]);
 }
 // Separate, much smaller light organs. Each uses the same anatomical deformation.
 for(const [lx,ly,color,r] of entry.lights){const [x,y]=deform(entry.id,lx,ly,phase);const px=P+x*W,py=P+y*H;const pulse=entry.id==='jelly'?.72+.15*Math.cos(phase*TAU):.88+.04*Math.sin(phase*TAU);
  const g=ctx.createRadialGradient(px,py,0,px,py,r*2.4);g.addColorStop(0,color);g.addColorStop(.3,color+'80');g.addColorStop(1,color+'00');ctx.globalAlpha=.24*pulse;ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,r*2.4,0,TAU);ctx.fill();
 }
 return c;
}
