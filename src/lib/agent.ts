import {profile,groups,projects,experience,certifications,testimonials,caseStudies} from './data';

/* A small, deterministic résumé agent: rules for common question shapes, then
   keyword retrieval over résumé "documents". It never invents facts: every
   answer is assembled from data.ts, and unmatched questions are declined. */

export const RESUME='/resume/prudhvi-senior-ai-engineer.pdf';
export type Reply={intent:string,tool:string,sources:string[],text:string};

const roles=experience.filter(e=>e.highlights);
const schools=experience.filter(e=>!e.highlights);
const skillsOf=(name:string)=>groups.find(g=>g.name===name)?.skills.join(', ')||'';
const roleText=(e:typeof experience[number],n=2)=>`${e.role} at ${e.place.replace(' (Client)','')} (${e.period}).`+(e.highlights?'\n'+e.highlights.slice(0,n).map(h=>`• ${h}`).join('\n'):'');
const companyAliases:[RegExp,string][]=[[/walmart|sam.?s club/,'Walmart'],[/los angeles county|la county|county/,'Los Angeles County'],[/mayo/,'Mayo Clinic'],[/dell/,'Dell Technologies'],[/central missouri|ucm/,'University of Central Missouri'],[/jntu|jawaharlal|nehru/,'JNTU']];

type Rule={id:string,test:RegExp,tool:string,run:(q:string)=>{text:string,sources:string[]}};
const rules:Rule[]=[
 {id:'greeting',test:/^(hi|hello|hey|yo|good (morning|afternoon|evening))\b/,tool:'none',run:()=>({text:`Hello! I can tell you about Prudhvi’s experience, skills, projects, education or how to reach him. Try “Who is Prudhvi?” or “What did he do in 2023?”`,sources:[]})},
 {id:'testimonials',test:/testimonial|recommend|referen|colleague|teammate|manager|coworker|co-worker|people say|others say|say about|work(ing)? with him|feedback|review/,tool:'testimonials.list()',run:()=>({text:testimonials.map(t=>`“${t.highlight}”\n— ${t.name}, ${t.title}`).join('\n\n')+`\n\nThe full recommendations are in the Recommendations section.`,sources:testimonials.map(t=>t.name)})},
 {id:'who',test:/who (is|’s|'s)|about (him|prudhvi)|tell me about|introduce|summary|overview|background|what does (he|prudhvi) do/,tool:'profile.get()',run:()=>({text:`Prudhvi Reddy is a ${profile.role} based in ${profile.location}. ${profile.summary.replace(/^AI engineer/,'He is an AI engineer')}\n\nRight now he is ${roles[0].role} at ${roles[0].place.replace(' (Client)','')}, leading work on an operations agent platform. He holds an M.S. in Computer Science from the University of Central Missouri.`,sources:['profile','experience[0]']})},
 {id:'current',test:/current|\bnow\b|today|present|these days|latest/,tool:'experience.get(current)',run:()=>({text:`Currently: ${roleText(roles[0],3)}`,sources:[roles[0].company]})},
 {id:'first-job',test:/first (job|role)|start(ed)? (his )?career|earliest/,tool:'experience.get(first)',run:()=>{const e=roles[roles.length-1];return{text:`His career started with this role: ${roleText(e)}`,sources:[e.company]}}},
 {id:'years',test:/how (many|much) (years|experience)|how long/,tool:'profile.get("experience")',run:()=>({text:`About 6 years. He has worked in machine learning since 2019 at Dell, and has built LLM and agent systems at Mayo Clinic, Los Angeles County and Walmart / Sam’s Club.`,sources:['profile']})},
 {id:'education',test:/educat|degree|universit|college|master|bachelor|stud(y|ied)|school|graduat/,tool:'education.list()',run:()=>({text:schools.map(e=>`• ${e.role}, ${e.place} (${e.period})`).join('\n'),sources:schools.map(s=>s.company)})},
 {id:'backend',test:/back.?end|\bapis?\b|fastapi|flask|server.side/,tool:'skills.lookup("Backend")',run:()=>({text:`Backend: ${skillsOf('Backend')}. Most of his production services are Python behind FastAPI or Flask, with streaming responses, caching and model routing.`,sources:['skills.Backend']})},
 {id:'frontend',test:/front.?end|react|\bui\b|interface|typescript|javascript/,tool:'skills.lookup("Frontend")',run:()=>({text:`Frontend: ${skillsOf('Frontend')}. For example, his Multi-Agent Support Triage project pairs a React front end with a FastAPI back end.`,sources:['skills.Frontend']})},
 {id:'agentic',test:/agent|langgraph|autogen|crewai|orchestrat|\bmcp\b|tool.call/,tool:'skills.lookup("Agentic AI")',run:()=>({text:`Agentic AI is his core focus: ${skillsOf('Agentic AI')}.\nAt Sam’s Club he designed multi-agent workflows in LangGraph (a planner agent plus specialist agents) that share context through MCP servers, with human approval before any order change.`,sources:['skills.Agentic AI',roles[0].company]})},
 {id:'rag',test:/\brag\b|retriev|vector|embedding|pinecone|milvus|faiss|search/,tool:'skills.lookup("Data & Retrieval")',run:()=>({text:`Retrieval stack: ${skillsOf('Data & Retrieval')}.\nHe has built RAG over supplier contracts (Pinecone, hybrid search and reranking), medical device manuals (Milvus, cited answers) and care guidelines (FAISS).`,sources:['skills.Data & Retrieval']})},
 {id:'ml',test:/machine learning|\bml\b|pytorch|tensorflow|fine.?tun|lora|dpo|train/,tool:'skills.lookup("Machine Learning")',run:()=>({text:`Machine learning: ${skillsOf('Machine Learning')}.\nHe fine-tuned Llama 3 with LoRA and aligned it with DPO, and earlier built TensorFlow failure-forecasting and NLP routing models at Dell.`,sources:['skills.Machine Learning']})},
 {id:'genai',test:/gen.?ai|generative|\bllms?\b|gpt|claude|openai|llama|prompt/,tool:'skills.lookup("Generative AI")',run:()=>({text:`Generative AI: ${skillsOf('Generative AI')}. He benchmarks models on accuracy, latency and cost before choosing one for production.`,sources:['skills.Generative AI']})},
 {id:'cloud',test:/cloud|azure|aws|docker|kubernetes|devops|deploy|ci.?cd/,tool:'skills.lookup("Cloud & Tools")',run:()=>({text:`Cloud & tooling: ${skillsOf('Cloud & Tools')}.`,sources:['skills.Cloud & Tools']})},
 {id:'skills',test:/skill|stack|tech|tools|languages?|good at|strength/,tool:'skills.list()',run:()=>({text:groups.map(g=>`• ${g.name}: ${g.skills.slice(0,5).join(', ')}`).join('\n'),sources:groups.map(g=>'skills.'+g.name)})},
 {id:'experience',test:/experience|worked|compan|career|history|\bjobs?\b|\broles?\b|employ/,tool:'experience.list()',run:()=>({text:roles.map(e=>`• ${e.period}: ${e.role}, ${e.place.replace(' (Client)','')}`).join('\n')+`\n\nAsk about any year or company for details, for example “What did he do at Mayo Clinic?”`,sources:roles.map(r=>r.company)})},
 {id:'projects',test:/project|built|build|github|open source|portfolio|case stud/,tool:'projects.list()',run:()=>({text:`Flagship AI case studies:\n`+caseStudies.filter(c=>c.kind==='Flagship AI').map(c=>`• ${c.title}: ${c.summary}`).join('\n')+`\n\nAgent tools:\n`+projects.map(p=>`• ${p.name}`).join('\n')+`\n\nBachelor’s projects:\n`+caseStudies.filter(c=>c.kind!=='Flagship AI').map(c=>`• ${c.title}`).join('\n')+`\n\nAsk about any one by name for details.`,sources:[...caseStudies.map(c=>c.id),...projects.map(p=>p.name)]})},
 {id:'certs',test:/cert|credential|ai-?102|pl-?400/,tool:'certifications.list()',run:()=>({text:certifications.map(c=>`• ${c.name} (${c.issuer})`).join('\n'),sources:['certifications']})},
 {id:'contact',test:/contact|email|hire|reach|call|phone|talk|available|open to|linkedin/,tool:'contact.get()',run:()=>({text:`Yes, he’s open to the next chapter. Email ${profile.email} or connect on LinkedIn; the contact section at the bottom of the page has everything.`,sources:['contact']})},
 {id:'location',test:/where.*(based|live|located)|location|relocat|remote/,tool:'profile.get("location")',run:()=>({text:`He is based in ${profile.location}.`,sources:['profile']})},
 {id:'resume',test:/resume|cv|pdf/,tool:'files.get("resume.pdf")',run:()=>({text:`Here’s his résumé: ${RESUME}`,sources:['resume']})},
];

// Fallback retrieval documents: every role, project and skill group as plain text.
const docs=[
 ...experience.map(e=>({id:e.company,text:[e.role,e.place,e.detail,...(e.highlights||[]),...(e.stack||[])].join(' '),render:()=>roleText(e,3)})),
 ...projects.map(p=>({id:p.name,text:[p.name,p.type,p.description,...p.tags,...p.features].join(' '),render:()=>`${p.name}: ${p.description}`})),
 ...groups.map(g=>({id:'skills.'+g.name,text:[g.name,g.blurb,...g.skills].join(' '),render:()=>`${g.name}: ${g.skills.join(', ')}. ${g.blurb}`})),
];
const stop=new Set('a an the is are was were do did does what which who how he his him prudhvi reddy of in on at to for and or with about tell me you your can any has have been'.split(' '));
const tokens=(t:string)=>t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').match(/[a-z0-9#+.]+/g)?.filter(w=>w.length>1&&!stop.has(w))||[];

export function answer(question:string):Reply{
 const q=question.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[’]/g,"'");
 // 1. Years: "what did he do in 2023", "2020?"
 const years=[...q.matchAll(/\b(20\d\d|19\d\d)\b/g)].map(m=>+m[1]);
 if(years.length){
  const y=years[0];const hits=experience.filter(e=>e.from<=y&&y<=e.to);
  if(!hits.length)return{intent:'timeline',tool:`experience.filter(year=${y})`,sources:[],text:y<2017?`His résumé starts in 2017, when he began his B.S. in Computer Science.`:`There’s nothing on his résumé for ${y} beyond what’s listed. Try asking about 2017 through ${new Date().getFullYear()}.`};
  return{intent:'timeline',tool:`experience.filter(year=${y})`,sources:hits.map(h=>h.company),text:`In ${y}, Prudhvi was:\n\n`+hits.map(e=>roleText(e,2)).join('\n\n')};
 }
 // 2. Named company or school
 const co=companyAliases.find(([re])=>re.test(q));
 if(co&&!/who is/.test(q)){const e=experience.find(x=>x.company===co[1])!;return{intent:'company',tool:`experience.get("${e.company}")`,sources:[e.company],text:roleText(e,4)}}
 // 2a. A named case study: "tell me about the claims platform"
 const studyAliases:[RegExp,string][]=[[/swe.?bench|software engineering agent|coding agent|pull request|self.improving|ticket.*(pr|pull)/,'swe-agent'],[/claim|denial|revenue.cycle|medical coding|appeal/,'claims'],[/movie|booking/,'movie'],[/house|price predict|real estate|property/,'house'],[/crime/,'crime']];
 const st=studyAliases.find(([re])=>re.test(q));
 if(st){const c=caseStudies.find(x=>x.id===st[1])!;const flagship=c.kind==='Flagship AI';
  return{intent:'case-study',tool:`projects.get("${c.id}")`,sources:[c.title],text:`${c.title} (${flagship?'flagship AI case study, architecture & design':'bachelor’s project'}).\n\nChallenge: ${c.challenge}\n\n${flagship?'Proposed solution':'Solution'}: ${c.solution.replace('During my bachelor’s degree, I developed','During his bachelor’s degree, he developed')}`+('architecture' in c?`\n\nArchitecture: ${c.architecture}`:'')+('metrics' in c?`\n\nIt will be evaluated on ${c.metrics!.join(', ')}. Results will be published once measured.`:'')};
 }
 // 2b. A specific skill: "does he know Kubernetes?", "has he used FastAPI"
 const esc=(t:string)=>t.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const skill=groups.flatMap(g=>g.skills.map(n=>({n,g}))).sort((a,b)=>b.n.length-a.n.length).find(({n})=>new RegExp(`(^|[^a-z])${esc(n)}([^a-z]|$)`).test(q));
 if(skill&&/(know|use|used|using|work(ed)? with|experience (with|in)|familiar|can he|does he|has he|skilled)/.test(q)){
  const where=[...experience.filter(e=>e.stack?.includes(skill.n)).map(e=>e.company),...projects.filter(p=>p.tags.includes(skill.n)).map(p=>p.name)];
  return{intent:'skill',tool:`skills.find("${skill.n}")`,sources:['skills.'+skill.g.name,...where],text:`Yes. ${skill.n} is part of his ${skill.g.name} toolkit. ${skill.g.blurb}`+(where.length?`
He has used it at: ${where.join(', ')}.`:'')};
 }
 // 3. Question-shape rules
 const rule=rules.find(r=>r.test.test(q));
 if(rule){const r=rule.run(q);return{intent:rule.id,tool:rule.tool,...r}}
 // 4. Keyword retrieval
 const words=tokens(q);
 const ranked=docs.map(d=>{const t=d.text.toLowerCase();return{d,score:words.filter(w=>t.includes(w)).length}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
 if(ranked.length)return{intent:'search',tool:`resume.search(${JSON.stringify(words.join(' '))})`,sources:ranked.slice(0,2).map(x=>x.d.id),text:ranked.slice(0,2).map(x=>x.d.render()).join('\n\n')};
 return{intent:'unknown',tool:'none',sources:[],text:`I only answer from Prudhvi’s résumé and couldn’t find that there. Try “Who is Prudhvi?”, “What did he do in 2023?”, “Backend skills?” or “How can I reach him?”`};
}
