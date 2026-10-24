'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import {caseStudies,projects} from '../lib/data';
import {Chip} from './Journey';

type Study=typeof caseStudies[number];
const kinds=['All','Flagship AI','Bachelor’s'];

function Flow({steps,compact}:{steps:string[],compact?:boolean}){
 const shown=compact?steps.slice(0,4):steps;
 return <ol className={'flow'+(compact?' flow-compact':'')} aria-label="Pipeline">{shown.map((s,i)=><li key={s} style={{'--i':i} as React.CSSProperties}><span>{s}</span></li>)}{compact&&steps.length>4&&<li className="flow-more"><span>+{steps.length-4}</span></li>}</ol>;
}

/* Case-study detail as a side sheet: Esc or backdrop closes it; Work returns focus to the opening card. */
function CaseStudy({study,onClose}:{study:Study,onClose:()=>void}){
 const close=useRef<HTMLButtonElement>(null);
 useEffect(()=>{close.current?.focus();document.body.style.overflow='hidden';
  const k=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose()};addEventListener('keydown',k);
  return()=>{removeEventListener('keydown',k);document.body.style.overflow=''}},[onClose]);
 const flagship=study.kind==='Flagship AI';
 return <div className="cs-backdrop" onClick={onClose}><article className="cs" role="dialog" aria-modal="true" aria-labelledby="cs-title" onClick={e=>e.stopPropagation()}>
  <header className="cs-head"><div><span className="eyebrow">{study.label}</span><span className={'cs-status'+(flagship?' cs-status-design':'')}>{study.status}</span></div><button ref={close} onClick={onClose} aria-label="Close case study">×</button></header>
  <h3 id="cs-title">{study.title}</h3>
  <p className="cs-summary">{study.summary}</p>
  <section><span className="label">01 · The challenge</span><p>{study.challenge}</p></section>
  <section><span className="label">02 · {flagship?'The proposed solution':'The solution'}</span><p>{study.solution}</p></section>
  <section><span className="label">03 · {flagship?'Technical architecture':'How it works'}</span><Flow steps={study.flow}/>{'architecture' in study&&<p>{study.architecture}</p>}{study.stack.length>0&&<div className="cs-chips">{study.stack.map(t=><Chip key={t} name={t}/>)}</div>}</section>
  {'decisions' in study&&<section><span className="label">04 · Key engineering decisions</span><ul className="cs-list">{study.decisions!.map(d=><li key={d}>{d}</li>)}</ul></section>}
  {'metrics' in study&&<section className="cs-eval"><span className="label">05 · Evaluation plan</span><p>Results will be published here once measured. The metrics this system is designed to be judged on:</p><ul className="cs-metrics">{study.metrics!.map(m=><li key={m}>{m}</li>)}</ul></section>}
  <section><span className="label">{flagship?'06':'04'} · What this demonstrates</span><div className="cs-chips">{study.demonstrates.map(d=><span key={d} className="cs-tag">{d}</span>)}</div></section>
  {'repo' in study&&<a className="cs-repo" href={study.repo} target="_blank" rel="noreferrer">View the code on GitHub <b>↗</b></a>}
 </article></div>;
}

export function Work(){
 const [kind,setKind]=useState('All');const [open,setOpen]=useState<Study|null>(null);const opener=useRef<HTMLButtonElement|null>(null);const closeStudy=useCallback(()=>{setOpen(null);opener.current?.focus()},[]);
 const list=caseStudies.filter(c=>kind==='All'||c.kind===kind);
 return <>
  <div className="work-filters" role="group" aria-label="Filter projects">{kinds.map(k=><button key={k} className={kind===k?'chosen':''} aria-pressed={kind===k} onClick={()=>setKind(k)}>{k}<small>{k==='All'?caseStudies.length:caseStudies.filter(c=>c.kind===k).length}</small></button>)}</div>
  <div className="cases reveal">{list.map(c=>{const i=caseStudies.indexOf(c);const flagship=c.kind==='Flagship AI';return <button key={c.id} className={'case'+(flagship?' case-flagship':'')} data-tilt={flagship?'5':'7'} onClick={e=>{opener.current=e.currentTarget;setOpen(c)}} aria-haspopup="dialog">
   <div className="case-top"><span className="case-num">{String(i+1).padStart(2,'0')}</span><span className="eyebrow">{c.label}</span><span className={'cs-status'+(flagship?' cs-status-design':'')}>{c.status}</span></div>
   <h3>{c.title}</h3><p>{c.summary}</p>
   <Flow steps={c.flow} compact={!flagship}/>
   <span className="case-cta">Read case study <b>→</b></span>
  </button>})}</div>
  <div className="oss"><span className="label">Agent tools</span><div className="oss-grid">{projects.map(p=><div key={p.name} className="oss-card"><strong>{p.name}</strong><span>{p.description}</span><div>{p.tags.slice(0,4).map(t=><Chip key={t} name={t}/>)}</div></div>)}</div></div>
  {open&&<CaseStudy study={open} onClose={closeStudy}/>}
 </>;
}
