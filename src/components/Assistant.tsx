'use client';
import {useEffect,useMemo,useRef,useState} from 'react';
import {profile} from '../lib/data';
import {answer,RESUME} from '../lib/agent';

const suggestions=['Who is Prudhvi?','What did he do in 2023?','What does he build with agents?','Backend skills?','Tell me about Mayo Clinic','What do colleagues say?','How can I reach him?'];

type Msg={role:'user'|'agent',text:string,trace?:string[],done?:boolean};

export function AgentConsole(){
 const [open,setOpen]=useState(false);const [input,setInput]=useState('');const [busy,setBusy]=useState(false);
 const [msgs,setMsgs]=useState<Msg[]>([{role:'agent',text:`Hi! I’m Prudhvi’s portfolio agent. Ask me anything about his experience (by year or company), skills, projects, education or how to reach him.`,done:true}]);
 const log=useRef<HTMLDivElement>(null);const field=useRef<HTMLInputElement>(null);
 useEffect(()=>{const o=()=>setOpen(true);addEventListener('open-agent',o);return()=>removeEventListener('open-agent',o)},[]);
 useEffect(()=>{if(open)setTimeout(()=>field.current?.focus(),250)},[open]);
 useEffect(()=>{log.current?.scrollTo({top:log.current.scrollHeight})},[msgs]);
 const ask=async(q:string)=>{
  if(!q.trim()||busy)return;setInput('');setBusy(true);
  const r=answer(q);const text=r.text;
  const trace=r.intent==='unknown'?[`plan → intent: unknown`,`guardrail → no matching source, decline`]:[`plan → intent: ${r.intent}`,...(r.tool!=='none'?[`call → ${r.tool}`]:[]),...(r.sources.length?[`ground → ${r.sources.slice(0,3).join(', ')}`]:[])];
  const fast=matchMedia('(prefers-reduced-motion: reduce)').matches;
  setMsgs(m=>[...m,{role:'user',text:q},{role:'agent',text:'',trace:[]}]);
  const update=(f:(m:Msg)=>Msg)=>setMsgs(m=>[...m.slice(0,-1),f(m[m.length-1])]);
  const wait=(ms:number)=>new Promise(r=>setTimeout(r,fast?0:ms));
  for(const t of trace){await wait(380);update(m=>({...m,trace:[...(m.trace||[]),t]}))}
  await wait(250);
  for(let i=0;i<=text.length;i+=fast?text.length:4){update(m=>({...m,text:text.slice(0,i)}));await wait(10)}
  update(m=>({...m,text,done:true}));setBusy(false);
 };
 const linkify=(t:string)=>t.split(new RegExp(`(${RESUME}|${profile.email.replace('.','\\.')})`)).map((p,i)=>p===RESUME?<a key={i} href={RESUME} download>résumé PDF ↗</a>:p===profile.email?<a key={i} href={'mailto:'+p}>{p}</a>:p);
 return <>
  <button className={'agent-fab '+(open?'agent-fab-hidden':'')} onClick={()=>setOpen(true)} data-magnetic aria-label="Ask my agent"><span className="agent-pulse"/>ASK MY AGENT</button>
  <section className={'agent '+(open?'agent-open':'')} aria-label="Portfolio agent" inert={!open}>
   <header className="agent-head"><div><span className="agent-dot"/><strong>prudhvi.agent</strong><small>grounded in résumé · no LLM calls</small></div><button onClick={()=>setOpen(false)} aria-label="Close agent">×</button></header>
   <div className="agent-log" ref={log} aria-live="polite">{msgs.map((m,i)=><div key={i} className={'agent-msg agent-'+m.role}>{m.trace&&m.trace.length>0&&<ol className="agent-trace">{m.trace.map(t=><li key={t}>{t}</li>)}</ol>}{(m.text||m.role==='user')&&<p>{linkify(m.text)}{m.role==='agent'&&!m.done&&<i className="caret"/>}</p>}</div>)}</div>
   <div className="agent-chips">{suggestions.map(s=><button key={s} onClick={()=>ask(s)} disabled={busy}>{s}</button>)}</div>
   <form className="agent-input" onSubmit={e=>{e.preventDefault();ask(input)}}><input ref={field} value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask e.g. “What did he do in 2023?”" aria-label="Your question" tabIndex={open?0:-1}/><button disabled={busy||!input.trim()} tabIndex={open?0:-1}>↵</button></form>
  </section>
 </>;
}

/* ⌘K / Ctrl+K command palette for navigation and quick actions. */
export function CommandPalette(){
 const [open,setOpen]=useState(false);const [q,setQ]=useState('');const [i,setI]=useState(0);const field=useRef<HTMLInputElement>(null);
 const actions=useMemo(()=>[
  ...['About','Skills','Experience','Work','Certifications','Achievements','Recommendations','Contact'].map(s=>({label:`Go to ${s}`,hint:'Section',run:()=>document.getElementById(s.toLowerCase())?.scrollIntoView({behavior:'smooth'})})),
  {label:'Ask my agent',hint:'AI',run:()=>dispatchEvent(new Event('open-agent'))},
  {label:'Download résumé',hint:'File',run:()=>{const a=document.createElement('a');a.href=RESUME;a.download='';a.click()}},
  {label:'Copy email address',hint:profile.email,run:()=>navigator.clipboard?.writeText(profile.email)},
  {label:'Open GitHub',hint:'Link',run:()=>open_(profile.github)},
  {label:'Open LinkedIn',hint:'Link',run:()=>open_(profile.linkedin)},
 ],[]);
 const norm=(t:string)=>t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const list=actions.filter(a=>norm(a.label).includes(norm(q)));
 useEffect(()=>{const k=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setOpen(o=>!o)}else if(e.key==='Escape')setOpen(false)};const o=()=>setOpen(true);addEventListener('keydown',k);addEventListener('open-palette',o);return()=>{removeEventListener('keydown',k);removeEventListener('open-palette',o)}},[]);
 useEffect(()=>{if(open){setQ('');setI(0);setTimeout(()=>field.current?.focus(),30)}},[open]);
 if(!open)return null;
 const run=(n:number)=>{const a=list[n];if(a){setOpen(false);a.run()}};
 return <div className="kbar" onClick={()=>setOpen(false)}><div className="kbar-box" role="dialog" aria-label="Command palette" onClick={e=>e.stopPropagation()}>
  <input ref={field} value={q} onChange={e=>{setQ(e.target.value);setI(0)}} placeholder="Type a command or search…" aria-label="Search commands" onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();setI(x=>Math.min(x+1,list.length-1))}else if(e.key==='ArrowUp'){e.preventDefault();setI(x=>Math.max(x-1,0))}else if(e.key==='Enter')run(i)}}/>
  <ul>{list.map((a,n)=><li key={a.label}><button className={n===i?'kbar-active':''} onMouseEnter={()=>setI(n)} onClick={()=>run(n)}><span>{a.label}</span><small>{a.hint}</small></button></li>)}{list.length===0&&<li className="kbar-empty">No matching commands</li>}</ul>
  <footer><span>↑↓ navigate</span><span>↵ select</span><span>esc close</span></footer>
 </div></div>;
}
const open_=(url:string)=>window.open(url,'_blank','noopener');
