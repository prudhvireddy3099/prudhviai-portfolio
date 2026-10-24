'use client';
import {useEffect,useRef,useState} from 'react';

const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer=()=>matchMedia('(hover: hover) and (pointer: fine)').matches;

/* Global pointer-driven effects, wired by data attributes so page markup stays declarative:
   [data-tilt="deg"]  3D tilt toward the cursor + glare position (--rx --ry --gx --gy)
   [data-magnetic]    element drifts toward the cursor
   .reveal            3D fold-in when scrolled into view
   .hero              --mx/--my (-1..1) for layered parallax
   .achievement-track coverflow rotation (--cf) from horizontal scroll */
export function Effects(){
 const ring=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const root=document.documentElement;root.classList.add('fx');
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:0,rootMargin:'0px 0px -10% 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  const track=document.querySelector<HTMLElement>('.achievement-track');
  const coverflow=()=>{if(!track)return;const mid=track.getBoundingClientRect().left+track.clientWidth/2;
   track.querySelectorAll<HTMLElement>('.achievement').forEach(c=>{const r=c.getBoundingClientRect();const d=Math.max(-1,Math.min(1,(r.left+r.width/2-mid)/(track.clientWidth*.75)));c.style.setProperty('--cf',`${d*-18}deg`);c.style.setProperty('--cz',`${Math.abs(d)*-60}px`)})};
  track?.addEventListener('scroll',coverflow,{passive:true});addEventListener('resize',coverflow);coverflow();

  if(reduced()||!finePointer())return()=>{io.disconnect();track?.removeEventListener('scroll',coverflow);removeEventListener('resize',coverflow)};
  root.classList.add('fx-pointer');

  let tilted:HTMLElement|null=null,magnet:HTMLElement|null=null,x=innerWidth/2,y=innerHeight/2,rx=x,ry=y,raf=0;
  const hero=document.querySelector<HTMLElement>('.hero');
  const reset=(el:HTMLElement|null,...props:string[])=>{if(el){props.forEach(p=>el.style.removeProperty(p));el.classList.remove('tilting')}};
  const move=(e:PointerEvent)=>{
   x=e.clientX;y=e.clientY;const t=e.target as Element;
   const tilt=t.closest<HTMLElement>('[data-tilt]');
   if(tilt!==tilted){reset(tilted,'--rx','--ry','--gx','--gy');tilted=tilt}
   if(tilt){const r=tilt.getBoundingClientRect(),max=+(tilt.dataset.tilt||8),px=(x-r.left)/r.width,py=(y-r.top)/r.height;
    tilt.classList.add('tilting');tilt.style.setProperty('--rx',`${(.5-py)*max}deg`);tilt.style.setProperty('--ry',`${(px-.5)*max}deg`);tilt.style.setProperty('--gx',`${px*100}%`);tilt.style.setProperty('--gy',`${py*100}%`)}
   const mag=t.closest<HTMLElement>('[data-magnetic]');
   if(mag!==magnet){if(magnet)magnet.style.translate='';magnet=mag}
   if(mag){const r=mag.getBoundingClientRect();mag.style.translate=`${(x-r.left-r.width/2)*.25}px ${(y-r.top-r.height/2)*.35}px`}
   if(hero){const r=hero.getBoundingClientRect();if(y<r.bottom){hero.style.setProperty('--mx',((x/innerWidth)*2-1).toFixed(3));hero.style.setProperty('--my',(((y-r.top)/r.height)*2-1).toFixed(3))}}
   ring.current?.classList.toggle('ring-hover',!!t.closest('a,button,[data-tilt]'));
  };
  const leave=()=>{reset(tilted,'--rx','--ry','--gx','--gy');tilted=null;if(magnet)magnet.style.translate='';magnet=null};
  const loop=()=>{rx+=(x-rx)*.18;ry+=(y-ry)*.18;if(ring.current)ring.current.style.transform=`translate3d(${rx}px,${ry}px,0)`;raf=requestAnimationFrame(loop)};
  addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerleave',leave);raf=requestAnimationFrame(loop);
  return()=>{io.disconnect();track?.removeEventListener('scroll',coverflow);removeEventListener('resize',coverflow);removeEventListener('pointermove',move);document.removeEventListener('pointerleave',leave);cancelAnimationFrame(raf)};
 },[]);
 return <div ref={ring} className="cursor-ring" aria-hidden="true"/>;
}

/* A rotating 3D point-cloud "neural sphere" drawn on canvas with perspective projection. */
export function NeuralOrb({className}:{className?:string}){
 const canvas=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const c=canvas.current,ctx=c?.getContext('2d');if(!c||!ctx)return;
  const N=innerWidth<760?100:170,pts:[number,number,number][]=[];
  for(let i=0;i<N;i++){const yy=1-(i/(N-1))*2,r=Math.sqrt(1-yy*yy),th=i*2.399963;pts.push([Math.cos(th)*r,yy,Math.sin(th)*r])}
  // violet → cyan → pink across the sphere's height
  const hues=pts.map(([,py])=>py>0?255-py*65:255+(-py)*75);
  const links:[number,number][]=[];
  for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){const[a,b,d]=pts[i],[e,f,g]=pts[j];if((a-e)**2+(b-f)**2+(d-g)**2<.07)links.push([i,j])}
  let w=0,h=0,raf=0,visible=true,ax=0,ay=0,tx=0,ty=0;
  const size=()=>{const dpr=Math.min(devicePixelRatio||1,2);w=c.clientWidth;h=c.clientHeight;c.width=w*dpr;c.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};
  const ink=getComputedStyle(document.documentElement).getPropertyValue('--ink').trim()||'#171717';
  const draw=(t:number)=>{
   ctx.clearRect(0,0,w,h);ax+=(tx-ax)*.05;ay+=(ty-ay)*.05;
   const rotY=t*.00012+ay,rotX=-.35+ax,R=Math.min(w,h)*.4,cx=w/2,cy=h/2,cosY=Math.cos(rotY),sinY=Math.sin(rotY),cosX=Math.cos(rotX),sinX=Math.sin(rotX);
   const proj=pts.map(([px,py,pz])=>{const x1=px*cosY-pz*sinY,z1=px*sinY+pz*cosY,y1=py*cosX-z1*sinX,z2=py*sinX+z1*cosX,s=2.6/(2.6+z2);return[cx+x1*R*s,cy+y1*R*s,z2,s]});
   ctx.strokeStyle=ink;ctx.lineWidth=.6;
   for(const[i,j]of links){const a=proj[i],b=proj[j];ctx.globalAlpha=Math.max(0,.22-(a[2]+b[2])*.09);ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke()}
   proj.forEach(([x,y,z,s],i)=>{ctx.fillStyle=`hsl(${hues[i]} 85% 55%)`;ctx.globalAlpha=Math.max(.15,.85-z*.45);ctx.beginPath();ctx.arc(x,y,1.9*s,0,Math.PI*2);ctx.fill()});
   ctx.globalAlpha=1;
  };
  // ~30fps is plenty for a slow rotation and halves the per-frame cost on phones
  let last=0;const loop=(t:number)=>{if(visible&&t-last>=32){last=t;draw(t)}raf=requestAnimationFrame(loop)};
  const onMove=(e:PointerEvent)=>{ty=(e.clientX/innerWidth-.5)*.9;tx=(e.clientY/innerHeight-.5)*.5};
  const ro=new ResizeObserver(()=>{size();if(reduced())draw(0)});ro.observe(c);size();
  const vis=new IntersectionObserver(([e])=>{visible=e.isIntersecting});vis.observe(c);
  if(reduced())draw(0);else{raf=requestAnimationFrame(loop);addEventListener('pointermove',onMove,{passive:true})}
  return()=>{cancelAnimationFrame(raf);ro.disconnect();vis.disconnect();removeEventListener('pointermove',onMove)};
 },[]);
 return <canvas ref={canvas} className={className} aria-hidden="true"/>;
}

/* Types, holds, and deletes each word in turn. */
export function Typewriter({words}:{words:string[]}){
 const [text,setText]=useState(words[0]);
 useEffect(()=>{
  if(reduced())return;
  let w=0,i=words[0].length,del=true,t:ReturnType<typeof setTimeout>;
  const tick=()=>{const word=words[w];
   if(del){i--;if(i<=0){del=false;w=(w+1)%words.length}}else{i++;if(i>=words[w].length){del=true;setText(words[w]);t=setTimeout(tick,1800);return}}
   setText((del?word:words[w]).slice(0,Math.max(0,i)));t=setTimeout(tick,del?35:70)};
  t=setTimeout(tick,2200);return()=>clearTimeout(t);
 },[words]);
 return <b className="typer-word">{text}<i className="caret" aria-hidden="true"/></b>;
}
