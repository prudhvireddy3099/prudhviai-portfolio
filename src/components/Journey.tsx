'use client';
import {useRef,useState} from 'react';
import {experience,logos} from '../lib/data';

const roles=experience.filter(e=>e.highlights);
const schools=experience.filter(e=>!e.highlights);
const initials=(t:string)=>t.split(/[\s/]+/).filter(w=>/^[A-Z]/.test(w)).slice(0,2).map(w=>w[0]).join('');

export function Chip({name}:{name:string}){
 const logo=logos[name];
 return <span className="chip">{logo?<img src={`/skills/${logo}.svg`} alt="" width={14} height={14}/>:<i className="chip-dot"/>}{name}</span>;
}

/* Experience: role tabs on the left, a detailed card on the right. Arrow keys move between roles. */
export function Journey(){
 const [active,setActive]=useState(0);const tabs=useRef<(HTMLButtonElement|null)[]>([]);
 const r=roles[active];const current=/present/i.test(r.period);
 const key=(e:React.KeyboardEvent)=>{const d=e.key==='ArrowDown'||e.key==='ArrowRight'?1:e.key==='ArrowUp'||e.key==='ArrowLeft'?-1:0;if(!d)return;e.preventDefault();const n=(active+d+roles.length)%roles.length;setActive(n);tabs.current[n]?.focus()};
 return <div className="journey reveal">
  <div className="journey-rail" role="tablist" aria-label="Roles" aria-orientation="vertical" onKeyDown={key}>
   {roles.map((e,i)=><button key={e.company} ref={el=>{tabs.current[i]=el}} role="tab" id={'role-'+i} aria-selected={active===i} aria-controls="role-panel" tabIndex={active===i?0:-1} className={'jr '+(active===i?'jr-active':'')} onClick={()=>setActive(i)}>
    <span className="jr-period">{e.period}</span><strong>{e.company}</strong><small>{e.role}</small>
   </button>)}
  </div>
  <article className="journey-card" id="role-panel" role="tabpanel" aria-labelledby={'role-'+active} key={active}>
   <header>
    <span className="jc-badge" aria-hidden="true">{initials(r.company)}</span>
    <div><h3>{r.role}</h3><p className="jc-meta"><strong>{r.place}</strong><span>{r.location}</span><span>{r.period}</span>{current&&<em className="jc-now">Now</em>}</p></div>
   </header>
   <p className="jc-summary">{r.detail}</p>
   <ul className="jc-points">{r.highlights!.map(h=><li key={h}>{h}</li>)}</ul>
   <div className="jc-stack"><span className="label">Stack</span>{r.stack!.map(t=><Chip key={t} name={t}/>)}</div>
  </article>
  <div className="journey-edu">{schools.map(s=><div className="edu" key={s.role}><span className="label">Education · {s.period}</span><strong>{s.role}</strong><span>{s.place}</span></div>)}</div>
 </div>;
}
