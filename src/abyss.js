import './species.css';
import {species,makeFrame} from './species-motion.js';
const base=import.meta.env.BASE_URL;
export const abyssLife=`<div class="abyss-life species-life" role="img" aria-label="Three faint modern reconstructions: a hovering deep-sea anglerfish with one lure, a pulsing medusa jellyfish, and a stoplight loosejaw with red facial and blue underside light organs">${species.map(s=>`<canvas class="abyss-organism species-animal organism-${s.id}" data-species="${s.id}" data-source="${base}assets/moby-dick-${s.file}.png" width="344" height="${Math.ceil(320*s.h/s.w+24)}" aria-hidden="true"></canvas>`).join('')}</div>`;
export function initSpeciesLife(){
 const nodes=[...document.querySelectorAll('.species-animal')];
 const records=nodes.map(node=>({node, entry:species.find(s=>s.id===node.dataset.species), opening:!!node.closest('.candle-scene')}));
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const frames=new Map();let progress=0,raf=0,last=0,elapsed=0,ready=false;
 const draw=(time)=>{
  raf=0;const active=(progress<.065||progress>.71)&&!document.hidden;
  if(!active)return;
  if(last&&time-last<32){raf=requestAnimationFrame(draw);return;}
  const dt=last?Math.min(time-last,70):0;last=time;if(!reduced.matches)elapsed+=dt;
  records.forEach(({node,entry,opening},i)=>{
   if(opening ? progress>=.065 : progress<=.71)return;
   const list=frames.get(entry.id);if(!list)return;
   const phase=reduced.matches?0:((elapsed/1000/entry.duration)+(i%3)*.27)%1,index=Math.floor(phase*list.length)%list.length,mix=phase*list.length-index;
   if(!reduced.matches||node.dataset.frame!==String(index)) {
    const ctx=node.getContext('2d');ctx.clearRect(0,0,node.width,node.height);ctx.save();ctx.globalAlpha=1-mix;ctx.drawImage(list[index],0,0);
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=mix;ctx.drawImage(list[(index+1)%list.length],0,0);ctx.restore();node.dataset.frame=String(index);
   }
   node.dataset.phase=phase.toFixed(4);
  });
  if(!reduced.matches)raf=requestAnimationFrame(draw);
 };
 const schedule=()=>{if(ready&&!raf){last=0;raf=requestAnimationFrame(draw)}};
 Promise.all(species.map(async(entry)=>{
  const img=new Image();img.src=`${base}assets/moby-dick-${entry.file}.webp`;await img.decode();
  const list=[];
  for(let i=0;i<36;i++){
    list.push(makeFrame(img,entry,i/36));
    if(i===0) {
      nodes.filter(node=>node.dataset.species===entry.id).forEach(node=>node.getContext('2d').drawImage(list[0],0,0));
    }
    // Give scrolling/input and the first light-organ paint time between bake chunks.
    if(i%3===2) await new Promise(resolve=>requestAnimationFrame(resolve));
  }
  frames.set(entry.id,list);
 })).then(()=>{ready=true;document.documentElement.dataset.speciesReady='true';schedule()}).catch(()=>{document.documentElement.dataset.speciesReady='error'});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;last=0}else schedule()});
 reduced.addEventListener('change',()=>{cancelAnimationFrame(raf);raf=0;schedule()});
 return (p,isReduced=reduced.matches)=>{
  progress=p;
  nodes.forEach((node,i)=>{
   const opening=!!node.closest('.candle-scene'),q=opening?Math.max(0,Math.min(1,p/.065)):Math.max(0,Math.min(1,(p-.71)/.29));
   const index=i%3,x=(index===0?-1:index===1?1:-.5)*q*(24+index*18),y=-q*(20+index*12)+Math.sin(q*2.4+index)*q*7;
   const value=isReduced?'none':`translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) rotate(${(Math.sin(q*2+index)*q*3).toFixed(2)}deg)`;
   if(node.style.transform!==value)node.style.transform=value;
   node.dataset.macro=q.toFixed(5);
  });
  if((p>=.065&&p<=.71)||document.hidden){cancelAnimationFrame(raf);raf=0;last=0}else schedule();
 };
}
