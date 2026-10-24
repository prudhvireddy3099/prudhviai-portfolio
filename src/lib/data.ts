export const profile = {
 name:'Prudhvi Reddy', role:'Senior AI Software Engineer', email:'gunduprudhvireddy2@gmail.com', phone:'251-414-6305', location:'Los Angeles, California', linkedin:'https://linkedin.com/in/prudhviai', github:'https://github.com/prudhvireddy3099',
 summary:'AI engineer with 6 years of experience in machine learning and building LLM applications that do real work, agents that plan multistep tasks, call the right tools, and hand decisions back to people when the stakes are high.'
};
export const groups = [
 {name:'Agentic AI',color:'#6c47ff',blurb:'Agents that plan multistep work, call governed tools over MCP, and hand high-stakes decisions back to people.',skills:['LangGraph','LangChain','AutoGen','CrewAI','MCP','Copilot Studio','Semantic Kernel','Multi-agent orchestration']},
 {name:'Generative AI',color:'#d63ea8',blurb:'LLM applications grounded in company knowledge, benchmarked on accuracy, latency and cost before they ship.',skills:['Azure OpenAI','Claude','GPT-4o','Llama 3','RAG','Hugging Face','vLLM','Prompt engineering']},
 {name:'Machine Learning',color:'#e8601c',blurb:'Fine-tuning (LoRA, DPO), classical ML and NLP models, tracked and versioned from experiment to production.',skills:['PyTorch','TensorFlow','scikit-learn','LoRA','DPO','MLflow','NLP','Embeddings']},
 {name:'Data & Retrieval',color:'#0f9f8f',blurb:'Governed data on Databricks and Spark, plus vector and hybrid search that returns cited answers.',skills:['Databricks','PySpark','Apache Spark','Unity Catalog','Databricks Genie','Pinecone','Milvus','FAISS','Azure AI Search']},
 {name:'Backend',color:'#1f7ae0',blurb:'Python services and REST APIs (FastAPI, Flask) with streaming, caching, auth and model routing.',skills:['Python','FastAPI','Flask','REST APIs','C#','Java','SQL','Redis','Webhooks']},
 {name:'Frontend',color:'#c98a00',blurb:'React and TypeScript interfaces, plus Power Apps for business teams.',skills:['React','TypeScript','JavaScript','Power Apps']},
 {name:'Cloud & Tools',color:'#4f6478',blurb:'Containerized deployments on Azure and AWS with CI/CD, infrastructure as code and full tracing.',skills:['Azure','AWS','Docker','Kubernetes','GitHub Actions','Terraform','Bicep','Power Automate','ServiceNow','OpenTelemetry','LangSmith']}
];
export const projects=[
 {name:'MCP Agent Toolkit',type:'AGENT INFRASTRUCTURE',description:'A reference MCP server exposing a ChromaDB knowledge store and ticketing API as tools, with a LangGraph client demonstrating multi-agent planning and shared context.',tags:['Python','MCP','LangGraph','ChromaDB'],features:['Typed tool interfaces','Agent planning','Shared context']},
 {name:'Multi-Agent Support Triage',type:'FULL-STACK / AGENTIC AI',description:'A full-stack support triage application with a React interface, FastAPI backend, Redis caching, LangSmith tracing, and containerized deployment.',tags:['LangGraph','FastAPI','React','Redis','Kubernetes'],features:['Multi-agent workflows','Retrieval-augmented responses','Observability']},
 {name:'Databricks MCP Server',type:'DATA AGENTS',description:'An MCP server that exposes Databricks SQL warehouses and Unity Catalog metadata as tools, with a sample Claude agent answering questions over governed tables.',tags:['Python','MCP','Databricks SQL','Claude'],features:['Governed data access','SQL warehouse tools','Catalog metadata']}
];
export const experience=[
 {date:'2025 — PRESENT',from:2025,to:2026,period:'Sep 2025 — Present',role:'Senior AI Engineer',place:'Walmart / Sam’s Club (Client)',company:'Walmart',location:'Client engagement',detail:'Enterprise agent platforms, multi-agent orchestration, MCP integrations, RAG and production AI services.',
  highlights:['Leads the team building the Sam’s Club operations agent platform, where LLM agents resolve supplier delivery and club inventory exceptions by reasoning over orders, stock and supplier data.','Designed multi-agent workflows in LangGraph: a planner agent breaks each request into steps, and specialist agents handle inventory, orders and supplier messages.','Built Python MCP servers that expose inventory, purchase-order and ticketing systems as typed tools, with persistent session context and full audit logs.','Added hybrid-search RAG, LangSmith and OpenTelemetry tracing, and responsible-AI controls, including human approval before any order change.'],
  stack:['LangGraph','MCP','Pinecone','Azure OpenAI','Claude','FastAPI','AKS']},
 {date:'2024 — 2025',from:2024,to:2025,period:'Mar 2024 — Sep 2025',role:'AI Engineer',place:'Los Angeles County (Client)',company:'Los Angeles County',location:'Los Angeles, CA',detail:'AI assistants, retrieval pipelines, enterprise integrations and secure workflow automation.',
  highlights:['Delivered an LLM assistant for Department of Health Services biomedical engineering teams, answering questions on device manuals, service procedures and FDA recall notices.','Engineered a LangChain RAG pipeline with layout-aware PDF parsing and Milvus, returning cited answers linked to the source page.','Created an AutoGen agent pair that matches new FDA recall notices against the county device inventory through an MCP server and drafts work orders.','Benchmarked GPT-4o, Claude and open models on accuracy, latency and cost, and shipped on Amazon EKS under HIPAA controls.'],
  stack:['LangChain','AutoGen','Milvus','MCP','FastAPI','EKS']},
 {date:'2023',from:2023,to:2023,period:'May 2023 — Dec 2023',role:'AI Engineer / Software Engineer',place:'Mayo Clinic (Client)',company:'Mayo Clinic',location:'Remote',detail:'Clinical summarization, grounded retrieval, model validation and privacy-conscious AI services.',
  highlights:['Prototyped LLM clinical-note summarization with Azure OpenAI and LangChain, cutting chart review from about 25 to 8 minutes per patient in a pilot with 40 care managers.','Grounded every summary in care guidelines with FAISS and sentence-transformer embeddings, so each summary cited the protocol it relied on.','Validated outputs with nurse reviewers on 200 charts, and protected patient data with de-identification and audit logging to pass a HIPAA security review.'],
  stack:['Azure OpenAI','LangChain','FAISS','PyTorch','Flask']},
 {date:'2019 — 2021',from:2019,to:2021,period:'Jan 2019 — Dec 2021',role:'Machine Learning Engineer / Software Engineer',place:'Dell Technologies (Client)',company:'Dell Technologies',location:'India',detail:'Predictive maintenance, NLP-based support routing, telemetry pipelines and backend APIs.',
  highlights:['Forecast hardware component failures with TensorFlow models trained on device telemetry, so support teams could open proactive cases.','Built Python and Spark feature pipelines over telemetry from customer laptops and servers.','Classified support-case notes with an NLP model that routes each case to the right product team; packaged models as Flask services in Docker.'],
  stack:['TensorFlow','Spark','NLP','Flask','MLflow']},
 {date:'2022 — 2023',from:2022,to:2023,period:'Jan 2022 — Dec 2023',role:'M.S. Computer Science',place:'University of Central Missouri',company:'University of Central Missouri',location:'Missouri, USA',detail:'Graduate education in computer science.'},
 {date:'2017 — 2021',from:2017,to:2021,period:'Jun 2017 — Aug 2021',role:'B.S. Computer Science',place:'Jawaharlal Nehru Technological University',company:'JNTU',location:'India',detail:'Undergraduate education in computer science.'}
];
export const certifications=[
 {name:'Azure AI Engineer Associate (AI-102)',issuer:'Microsoft'},
 {name:'Power Platform Developer Associate (PL-400)',issuer:'Microsoft'},
 {name:'Generative AI Engineer Associate',issuer:'Databricks'},
 {name:'Machine Learning Engineer – Associate',issuer:'AWS'}
];
export const achievements=[
 {label:'6 years',title:'Software & AI engineering',detail:'Experience spanning production ML, AI agents and cloud software.'},
 {label:'4 organizations',title:'Enterprise delivery',detail:'Walmart / Sam’s Club, Los Angeles County, Mayo Clinic and Dell.'},
 {label:'8 projects',title:'Selected engineering work',detail:'Two flagship AI case studies, three agent tools and three bachelor’s projects.'},
 {label:'4 credentials',title:'Cloud & AI certifications',detail:'Certifications listed across both resumes.'}
];
export const focus=['agentic systems','multi-agent workflows','MCP servers','RAG pipelines','production ML'];
// Local SVGs in /public/skills; skills without an entry render as a monogram tile.
export const logos:Record<string,string>={LangGraph:'langgraph',LangChain:'langchain',CrewAI:'crewai',MCP:'mcp','Azure OpenAI':'azure',Claude:'claude','Llama 3':'meta','Hugging Face':'huggingface',vLLM:'vllm',PyTorch:'pytorch',TensorFlow:'tensorflow','scikit-learn':'scikitlearn',MLflow:'mlflow',Databricks:'databricks',PySpark:'spark','Apache Spark':'spark','Unity Catalog':'databricks','Databricks Genie':'databricks',Milvus:'milvus',FAISS:'meta','Azure AI Search':'azure',Python:'python',FastAPI:'fastapi',Flask:'flask','REST APIs':'openapi','C#':'csharp',Java:'java',Redis:'redis',React:'react',TypeScript:'typescript',JavaScript:'javascript',Azure:'azure',AWS:'aws',Docker:'docker',Kubernetes:'kubernetes','GitHub Actions':'githubactions',Terraform:'terraform',OpenTelemetry:'opentelemetry',LangSmith:'langchain','GitHub API':'github',Temporal:'temporal',pandas:'pandas'};
// Recommendations, quoted verbatim. `highlight` must be an exact sentence from `quote`.
export const testimonials=[
 {name:'Satwick',title:'Senior Manager',highlight:'Prudhvi is the kind of engineer you can trust with complex, high-impact initiatives.',quote:[
  'Prudhvi is the kind of engineer you can trust with complex, high-impact initiatives. He has a strong ability to take ambiguous business requirements, translate them into technical solutions, and drive implementation from design through production.',
  'What stands out most is his ownership mindset. Whether working on enterprise AI agents, workflow automation, or integrating systems across multiple platforms, he consistently approaches challenges with a balance of technical depth and business understanding.',
  'He is collaborative, dependable, and proactive in identifying opportunities to improve engineering efficiency. Prudhvi would be a valuable addition to any team building scalable AI-powered products.']},
 {name:'Pojitha',title:'Senior AI Engineer',highlight:'One of his strongest qualities is his ability to connect emerging AI technologies with practical engineering requirements.',quote:[
  'I had the opportunity to collaborate with Prudhvi on complex software engineering and AI initiatives. His understanding of backend development, cloud architecture, and AI integration is impressive.',
  'He approaches technical challenges methodically, asks the right questions, and focuses on building solutions that are maintainable, secure, and scalable.',
  'One of his strongest qualities is his ability to connect emerging AI technologies with practical engineering requirements. He is equally comfortable discussing architecture, troubleshooting integrations, and contributing to implementation.',
  'He is a thoughtful engineer and an excellent teammate.']},
];
// Case studies for the Work section. Flagship entries describe the system design;
// `metrics` are what will be measured, not results. Add real numbers only once measured.
export const caseStudies=[
 {id:'swe-agent',kind:'Flagship AI',label:'Flagship · AI engineering',status:'Architecture & design',title:'Self-Improving Autonomous Software Engineering Agent',
  summary:'An agentic platform designed to turn software tickets into tested, reviewable pull requests, with evaluation and learning loops.',
  challenge:'Traditional coding assistants can generate code but struggle with multi-file changes, reliable verification, and learning from unsuccessful attempts.',
  solution:'A multi-agent software engineering platform where specialized agents interpret GitHub issues, locate relevant code, generate patches, execute tests in isolated environments, and verify solutions before proposing pull requests.',
  flow:['GitHub issue','Interpret issue','Locate code','Generate patch','Sandboxed tests','Verify','Pull request'],
  architecture:'LangGraph orchestration, MCP tool integrations, Docker-based execution, GitHub APIs, PyTorch-based verifier training, and a proposed GRPO fine-tuning pipeline.',
  stack:['LangGraph','MCP','Docker','GitHub API','PyTorch','GRPO'],
  decisions:['Isolate untrusted code execution','Preserve complete execution traces','Require approval before merging','Benchmark against real software issues'],
  metrics:['SWE-bench resolve rate','Verifier accuracy','Retrieval recall','Latency','Cost per resolved issue'],
  demonstrates:['Agent orchestration','ML evaluation','Reinforcement learning','Secure backend systems','Production-oriented AI engineering']},
 {id:'claims',kind:'Flagship AI',label:'Flagship · Healthcare AI',status:'Architecture & design',title:'Autonomous Healthcare Claims & Denial Management Platform',
  summary:'A multi-agent architecture for medical coding, insurance eligibility, denial prediction, and appeal preparation.',
  challenge:'Healthcare revenue-cycle teams face costly claim denials, fragmented payer requirements, manual documentation reviews, and time-consuming appeals.',
  solution:'A multi-agent workflow that assists with medical coding, coverage verification, denial-risk prediction, documentation checks, and evidence-based appeal drafting.',
  flow:['Claim & records','Medical coding','Coverage check','Denial risk','Documentation check','Appeal draft','Human approval'],
  architecture:'FHIR-compatible patient records, mock X12 claim transactions, LangGraph or Temporal workflows, MCP tools, XGBoost, SHAP explanations, and a human approval dashboard.',
  stack:['FHIR','X12','LangGraph','Temporal','MCP','XGBoost','SHAP'],
  decisions:['Use synthetic healthcare data during development','Keep humans responsible for consequential decisions','Record every agent action','Monitor prediction quality'],
  metrics:['Denial-prediction AUC','Calibration','Coding precision and recall','Simulated appeal outcomes','Processing throughput'],
  demonstrates:['Healthcare AI','Explainable machine learning','Workflow automation','Integrations','Responsible AI system design']},
 {id:'movie',kind:'Bachelor’s',label:'Bachelor’s project',status:'Completed',title:'Movie Ticket Booking System',
  summary:'A movie ticketing application showcasing application development, booking workflows, and user interaction.',
  challenge:'Moviegoers need a straightforward way to discover movies, select showtimes, and reserve tickets.',
  solution:'During my bachelor’s degree, I developed a movie ticketing application to explore how user-facing software handles the booking process.',
  flow:['Discover movies','Select showtime','Reserve tickets'],stack:[] as string[],
  demonstrates:['Application development','Software design','User experience','Foundational backend engineering']},
 {id:'house',kind:'Bachelor’s',label:'Bachelor’s project',status:'Completed',title:'House Price Prediction Using Machine Learning',
  summary:'A Python-based machine learning project for estimating residential property prices from housing features.',
  challenge:'Residential property prices depend on multiple factors, making accurate estimates a useful machine learning problem.',
  solution:'During my bachelor’s degree, I developed a Python-based machine learning project to predict house prices using property-related features.',
  flow:['Dataset preparation','Exploratory analysis','Feature selection','Model training','Evaluation'],stack:['Python','pandas','scikit-learn','XGBoost'],repo:'https://github.com/prudhvireddy3099/HOUSE-PRICING',
  demonstrates:['Python programming','Supervised learning','Feature engineering','Quantitative model evaluation']},
 {id:'crime',kind:'Bachelor’s',label:'Bachelor’s project',status:'Completed',title:'Crime Data Analysis',
  summary:'An exploratory data analysis project examining crime patterns, trends, and geographic distributions.',
  challenge:'Crime datasets contain patterns that can be difficult to recognize without structured analysis and visualization.',
  solution:'During my bachelor’s degree, I developed a crime data analysis project to examine crime records and identify meaningful trends.',
  flow:['Crime records','Data cleaning','Exploratory analysis','Visualization','Findings'],stack:['Python','PySpark','Matplotlib','Seaborn'],repo:'https://github.com/prudhvireddy3099/project1',
  demonstrates:['Data analysis','Statistical reasoning','Data preparation','Communicating findings through visualization']},
];
