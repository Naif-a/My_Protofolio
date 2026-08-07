"use client";

import { useEffect, useRef, useState } from "react";
import NetworkCanvas from "./NetworkCanvas";

const skills = {
  "AI & Machine Learning": [
    "Machine Learning",
    "Deep Learning",
    "PyTorch",
    "TensorFlow / Keras",
    "Computer Vision",
    "NLP",
    "Model Evaluation",
  ],
  "Generative AI": [
    "LLMs",
    "Agentic RAG",
    "Prompt Engineering",
    "FAISS",
    "Opik",
    "BERTScore & BLEU",
    "LiteLLM",
  ],
  "Software Engineering": [
    "Python",
    "Java",
    "JavaScript",
    "FastAPI",
    "REST API Development",
    "React",
    "Node.js",
    "Software Testing",
  ],
  "Data Science & Delivery": [
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "Feature Engineering",
    "Data Visualization",
    "MySQL",
    "MongoDB",
    "Git",
    "MLOps",
  ],
};

const projects = [
  {
    title: "EvidenceOps Agent",
    type: "Agentic System",
    color: "purple",
    description:
      "Governed multi-agent research system that plans, retrieves evidence, critiques findings, and produces auditable reports.",
    result: "18 tests · 96% retrieval hit rate",
    tech: ["LlamaIndex", "FastAPI", "OpenRouter", "HITL"],
  },
  {
    title: "Smart Cities RAG",
    type: "RAG System",
    color: "cyan",
    description:
      "Source-grounded assistant built from research papers and trusted Saudi smart-city resources for reliable, contextual answers.",
    result: "22 documents · 787 chunks",
    tech: ["FAISS", "Gemini", "Embeddings", "Gradio"],
  },
  {
    title: "Thaheen",
    type: "Generative AI",
    color: "orange",
    description:
      "AI learning platform that generates practice questions from lecture slides and patterns found in previous exams.",
    result: "1st place · 30+ courses · 1,000+ questions · 500+ users",
    tech: ["GenAI", "Prompt Engineering", "Web"],
    links: [
      { label: "Visit Thaheen", href: "https://thaheen.study" },
      { label: "1st Place Certificate", href: "certificates/thaheen-first-place.pdf" },
    ],
  },
  {
    title: "Saudi Sign Language Recognition",
    type: "Computer Vision",
    color: "green",
    description:
      "Deep-learning system that recognizes Saudi Sign Language gestures to support more accessible digital interaction.",
    result: "End-to-end vision pipeline",
    tech: ["CNN", "PyTorch", "OpenCV", "Python"],
    links: [
      { label: "Expo Certificate", href: "certificates/saudi-sign-language-expo.pdf" },
    ],
  },
  {
    title: "DEEPFUSE",
    type: "Senior Capstone · Sensor Fusion",
    color: "cyan",
    description:
      "AI-powered multi-sensor system for stealth-drone detection, combining radar and infrared data to improve reliability across difficult visibility and environmental conditions.",
    result: "15,000+ sensor samples · 92% detection accuracy · 6-member team",
    tech: ["Applied AI", "Sensor Fusion", "Computer Vision", "Model Evaluation"],
    links: [
      { label: "Completion Certificate", href: "certificates/deepfuse-team-design.pdf" },
    ],
  },
];

const CodeLine = ({
  n,
  children,
}: {
  n: number;
  children?: React.ReactNode;
}) => (
  <div className="code-line">
    <span className="line-no">{n}</span>
    <span>{children}</span>
  </div>
);

export default function Home() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const items = document.querySelectorAll<HTMLElement>(".scroll-reveal");
    if (reduce) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -55px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  useEffect(()=>{
    const root=document.documentElement;
    let pointerFrame=0,scrollFrame=0;
    const move=(event:PointerEvent)=>{
      if(pointerFrame)return;
      pointerFrame=requestAnimationFrame(()=>{
        root.style.setProperty("--pointer-x",`${event.clientX}px`);
        root.style.setProperty("--pointer-y",`${event.clientY}px`);
        root.style.setProperty("--tilt-x",`${(event.clientX/window.innerWidth-.5)*5}deg`);
        root.style.setProperty("--tilt-y",`${-(event.clientY/window.innerHeight-.5)*4}deg`);
        pointerFrame=0;
      });
    };
    const scroll=()=>{
      if(scrollFrame)return;
      scrollFrame=requestAnimationFrame(()=>{
        const max=document.documentElement.scrollHeight-innerHeight;
        root.style.setProperty("--scroll-progress",`${max?scrollY/max*100:0}%`);
        scrollFrame=0;
      });
    };
    addEventListener("pointermove",move);addEventListener("scroll",scroll,{passive:true});scroll();
    return()=>{removeEventListener("pointermove",move);removeEventListener("scroll",scroll);cancelAnimationFrame(pointerFrame);cancelAnimationFrame(scrollFrame)};
  },[]);
  useEffect(()=>{
    const terminals=document.querySelectorAll<HTMLElement>(".terminal-animate");
    const replay=(terminal:HTMLElement)=>{
      terminal.classList.remove("terminal-active");
      void terminal.offsetWidth;
      terminal.classList.add("terminal-active");
    };
    const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(reduced){terminals.forEach(t=>t.classList.add("terminal-active"));return;}
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){replay(entry.target as HTMLElement);observer.unobserve(entry.target);}
    }),{threshold:.28});
    const handlers=new Map<HTMLElement,()=>void>();
    terminals.forEach(terminal=>{
      observer.observe(terminal);
      const handler=()=>replay(terminal);
      handlers.set(terminal,handler);
      terminal.addEventListener("mouseenter",handler);
    });
    return()=>{observer.disconnect();handlers.forEach((handler,terminal)=>terminal.removeEventListener("mouseenter",handler));};
  },[]);
  return (
    <main>
      <NetworkCanvas />
      <div className="grid-bg" aria-hidden="true" />
      <div className="cursor-aura" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true"><span /></div>
      <header className="nav">
        <a className="brand" href="#hero">
          <span>naif</span>.py
        </a>
        <nav>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <a
          className="nav-link"
          href="https://www.linkedin.com/in/naif-alenazi-7807b6314/"
          target="_blank"
          rel="noreferrer"
        >
          connect ↗
        </a>
      </header>

      <section className="hero" id="hero">
        <div className="hero-inner">
          <div className="hero-kicker"><span /> RIYADH, SAUDI ARABIA</div>
          <span className="syntax-label">&lt;Hero /&gt;</span>
          <div className="terminal hero-terminal terminal-animate">
            <span className="float-chip chip-one">Agentic AI</span>
            <span className="float-chip chip-two">RAG</span>
            <span className="float-chip chip-three">MLOps</span>
            <div className="terminal-head">
              <i className="red" />
              <i className="yellow" />
              <i className="green" />
              <span>naif_engine.py</span>
              <small>Python 3.12</small>
            </div>
            <div className="terminal-body">
              <CodeLine n={1}>
                <b className="pink">import</b>{" "}
                <span className="white">torch</span>
              </CodeLine>
              <CodeLine n={2}>
                <b className="pink">from</b>{" "}
                <span className="white">future</span>{" "}
                <b className="pink">import</b>{" "}
                <span className="orange">build</span>
              </CodeLine>
              <CodeLine n={3} />
              <CodeLine n={4}>
                <span className="comment">
                  # Naif Alenazi — Software Engineer × AI
                </span>
              </CodeLine>
              <CodeLine n={5}>
                <span className="comment">
                  # KFUPM graduate · Second Honors
                </span>
              </CodeLine>
              <CodeLine n={6} />
              <CodeLine n={7}>
                <b className="pink">class</b>{" "}
                <span className="green-text">NaifNet</span>
                <span className="white">(nn.Module):</span>
              </CodeLine>
              <CodeLine n={8}>
                <span className="pink indent">def</span>{" "}
                <span className="orange">__init__</span>
                <span className="white">(self):</span>
              </CodeLine>
              <CodeLine n={9}>
                <span className="white indent2">self.stack = &#123;</span>
              </CodeLine>
              <CodeLine n={10}>
                <span className="yellow-text indent3">&quot;core&quot;</span>
                <span className="white">
                  : [&quot;AI Engineering&quot;, &quot;Agentic RAG&quot;],
                </span>
              </CodeLine>
              <CodeLine n={11}>
                <span className="yellow-text indent3">&quot;build&quot;</span>
                <span className="white">
                  : [&quot;Python&quot;, &quot;FastAPI&quot;,
                  &quot;React&quot;],
                </span>
              </CodeLine>
              <CodeLine n={12}>
                <span className="yellow-text indent3">&quot;quality&quot;</span>
                <span className="white">
                  : [&quot;Evaluation&quot;, &quot;MLOps&quot;]
                </span>
              </CodeLine>
              <CodeLine n={13}>
                <span className="white indent2">&#125;</span>
              </CodeLine>
              <CodeLine n={14} />
              <CodeLine n={15}>
                <span className="pink indent">def</span>{" "}
                <span className="orange">forward</span>
                <span className="white">(self, challenge):</span>
              </CodeLine>
              <CodeLine n={16}>
                <b className="pink indent2">return</b>{" "}
                <span className="white">self.solve(challenge)</span>
                <span className="cursor">▋</span>
              </CodeLine>
            </div>
          </div>
          <div className="hero-title">
            <h1 className="gradient-text">Naif Alenazi</h1>
            <p>
              <span className="pink">model</span>.
              <span className="orange">predict</span>(
              <span className="yellow-text">&quot;next breakthrough&quot;</span>
              )
            </p>
          </div>
          <div className="socials">
            <SocialLink
              href="https://github.com/Naif-a"
              label="GitHub"
              icon="github"
            />
            <SocialLink
              href="https://www.linkedin.com/in/naif-alenazi-7807b6314/"
              label="LinkedIn"
              icon="linkedin"
            />
            <SocialLink href="mailto:naif.alenazi797@gmail.com" label="Email" icon="email" />
            <SocialLink href="tel:+966543796987" label="Phone" icon="phone" />
          </div>
          <div className="mouse">
            <span />
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <SectionHead label="<ProfessionalProfile />">
            <>
              <span className="purple">class </span>
              <span className="orange">AI_Software_Engineer</span>
              <span>:</span>
            </>
          </SectionHead>
          <div className="doc-card scroll-reveal">
            <div>
              <span className="line-no">1</span>
              <span className="comment">&quot;&quot;&quot;</span>
            </div>
            <p>
              <Typewriter
                text="Software Engineering graduate from KFUPM focused on building intelligent, dependable products. I work across AI engineering, machine learning, agentic systems, model evaluation, APIs, and full-stack development—turning promising models into software that creates measurable value."
                speed={8}
              />
            </p>
            <div>
              <span className="line-no">2</span>
              <span className="comment">&quot;&quot;&quot;</span>
            </div>
          </div>
          <div className="proof-grid scroll-reveal">
            <Proof
              code="01"
              title="Production-minded AI evaluation"
              detail="Automated 10,000+ response evaluations at SDAIA and improved measured model performance from 67% to 93%."
              color="green"
            />
            <Proof
              code="02"
              title="Award-winning product delivery"
              detail="Built Thaheen into a live learning platform serving 500+ users across 30+ courses."
              color="orange"
            />
            <Proof
              code="03"
              title="Agentic systems with evidence"
              detail="Developed a governed multi-agent research workflow with 18 automated tests and a 96% retrieval hit rate."
              color="purple"
            />
            <Proof
              code="04"
              title="Applied AI across modalities"
              detail="Delivered RAG, computer vision, and multi-sensor detection projects grounded in measurable results."
              color="cyan"
            />
          </div>
          <div className="education card scroll-reveal">
            <span className="edu-icon">⌘</span>
            <div>
              <small>// education</small>
              <h3>King Fahd University of Petroleum & Minerals</h3>
              <p>B.Sc. Software Engineering</p>
              <div className="tag-row">
                <span className="tag green-tag">Second Honors</span>
                <span className="orange">KFUPM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="container">
          <SectionHead label="<ProfessionalExperience />" sub="// measurable impact across AI evaluation and solution delivery">
            <>
              <span className="cyan">career</span>.
              <span className="orange">history</span>()
            </>
          </SectionHead>
          <div className="timeline">
            <Experience
              branch="internship/sdaia"
              period="Jun — Aug 2025"
              company="Saudi Data & AI Authority (SDAIA)"
              role="Data & AI Analyst Intern"
              color="green"
              tags={["AI Evaluation", "Agentic RAG", "Opik", "Dashboards"]}
              items={[
                "Automated evaluation of 10,000+ AI responses with structured quality and safety metrics.",
                "Improved measured model performance from 67% to 93% through systematic testing and prompt optimization.",
                "Evaluated an Agentic RAG system using Opik and built a results dashboard for clear model comparison.",
              ]}
            />
            <Experience
              branch="training/tuwaiq"
              period="2026"
              company="Tuwaiq Academy"
              role="Applied AI Solutions Development"
              color="cyan"
              tags={["Machine Learning", "Generative AI", "REST APIs", "MLOps"]}
              items={[
                "Developed end-to-end AI solutions through intensive, project-based training.",
                "Built and tested REST APIs connecting AI models to scalable software applications.",
                "Applied testing, troubleshooting, and MLOps practices for deployment readiness.",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section" id="skills">
        <div className="container">
          <SectionHead label="<TechnicalCapabilities />" sub="// role-aligned skills for AI engineering, software engineering, and data science">
            <>
              <span className="cyan">capabilities</span>.
              <span className="orange">for_target_roles</span>()
            </>
          </SectionHead>
          <div className="terminal skills-terminal scroll-reveal terminal-animate">
            <div className="terminal-head">
              <i className="red" />
              <i className="yellow" />
              <i className="green" />
              <span>target_roles.py</span>
              <small>ATS profile</small>
            </div>
            <div className="terminal-body compact-code">
              <CodeLine n={1}>
                <span className="pink">target_roles</span>
                <span className="white"> = [</span>
              </CodeLine>
              <CodeLine n={2}>
                <span className="yellow-text indent">
                  &quot;AI Engineer&quot;, &quot;Software Engineer&quot;,
                  &quot;Data Scientist&quot;
                </span>
              </CodeLine>
              <CodeLine n={3}>
                <span className="white">]</span>
              </CodeLine>
              <CodeLine n={4} />
              <CodeLine n={5}>
                <span className="pink">def </span>
                <span className="orange">build_value</span>
                <span className="white">(problem, data, users):</span>
              </CodeLine>
              <CodeLine n={6}>
                <span className="cyan indent">solution</span>
                <span className="white"> = engineer(problem) + train(data)</span>
              </CodeLine>
              <CodeLine n={7}>
                <span className="pink indent">return </span>
                <span className="green-text">deploy</span>
                <span className="white">(solution, for_users=users)</span>
                <span className="cursor">▋</span>
              </CodeLine>
            </div>
          </div>
          <div className="skill-grid">
            {Object.entries(skills).map(([group, list], i) => (
              <div
                className="card skill-card scroll-reveal"
                style={{ transitionDelay: `${i * 70}ms` }}
                key={group}
              >
                <div className="card-head">
                  <span
                    className={["green-text", "cyan", "purple", "orange"][i]}
                  >
                    ●
                  </span>
                  <h3>{group}</h3>
                </div>
                <div className="skill-tags">
                  {list.map((skill) => (
                    <span className="skill-pill" key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="container wide">
          <SectionHead label="<SelectedProjects />" sub="// intelligent systems built around measurable, real-world outcomes">
            <>
              <span className="cyan">portfolio</span>.
              <span className="orange">deploy</span>(
              <span className="yellow-text">&quot;projects&quot;</span>)
            </>
          </SectionHead>
          <div className="project-grid">
            {projects.map((p, i) => (
              <article
                className={`card project-card scroll-reveal ${p.color}`}
                style={{ transitionDelay: `${(i % 2) * 90}ms` }}
                key={p.title}
              >
                <div className="project-meta">
                  <span>{p.type}</span>
                  <small>0{i + 1}</small>
                </div>
                <h3>{p.title}</h3>
                <p>
                  <Typewriter text={p.description} speed={9} />
                </p>
                <strong>$ {p.result}</strong>
                <div className="tag-row">
                  {p.tech.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                {"links" in p && p.links && (
                  <div className="project-links">
                    {p.links.map((link) => (
                      <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                        {link.label} <span>↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
          <div className="remote">
            <a href="https://github.com/Naif-a" target="_blank" rel="noreferrer">
              github.com/Naif-a ↗
            </a>
            <a
              href="https://www.linkedin.com/in/naif-alenazi-7807b6314/"
              target="_blank"
              rel="noreferrer"
            >
              linkedin --connect ↗
            </a>
          </div>
        </div>
      </section>
      <section className="contact-section section" id="contact">
        <div className="container">
          <SectionHead label="<Contact />" sub="// open to AI engineering, software engineering, and data science opportunities">
            <>
              <span className="cyan">let&apos;s</span>.
              <span className="orange">build</span>(
              <span className="yellow-text">&quot;something useful&quot;</span>)
            </>
          </SectionHead>
          <div className="contact-grid scroll-reveal">
            <a className="contact-card card" href="mailto:naif.alenazi797@gmail.com">
              <SocialIcon icon="email" /><small>Email</small><strong>naif.alenazi797@gmail.com</strong><span>Send a message ↗</span>
            </a>
            <a className="contact-card card" href="tel:+966543796987">
              <SocialIcon icon="phone" /><small>Phone</small><strong>+966 54 379 6987</strong><span>Call me ↗</span>
            </a>
            <div className="contact-card card">
              <SocialIcon icon="location" /><small>Location</small><strong>Riyadh, Saudi Arabia</strong><span>Available in KSA</span>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="socials">
          <SocialLink href="https://github.com/Naif-a" label="GitHub" icon="github" />
          <SocialLink href="https://www.linkedin.com/in/naif-alenazi-7807b6314/" label="LinkedIn" icon="linkedin" />
          <SocialLink href="mailto:naif.alenazi797@gmail.com" label="Email" icon="email" />
        </div>
        <p>
          <span>// </span>2026 Naif Alenazi
        </p>
      </footer>
    </main>
  );
}

function SectionHead({
  label,
  sub,
  children,
}: {
  label: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-head scroll-reveal">
      <span className="syntax-label">{label}</span>
      <h2>{children}</h2>
      {sub && (
        <p>
          <Typewriter text={sub} speed={22} />
        </p>
      )}
    </div>
  );
}

type SocialIconName="github"|"linkedin"|"email"|"phone"|"location";
function SocialIcon({icon}:{icon:SocialIconName}){
  const paths={
    github:"M12 .7a11.3 11.3 0 0 0-3.57 22c.56.1.77-.24.77-.54v-2.1c-3.15.69-3.81-1.34-3.81-1.34-.52-1.32-1.26-1.67-1.26-1.67-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.95.1-.73.4-1.24.72-1.52-2.51-.29-5.15-1.26-5.15-5.59 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.44.11-3 0 0 .95-.3 3.11 1.16A10.8 10.8 0 0 1 12 6.94c.96 0 1.93.13 2.84.38 2.16-1.46 3.1-1.16 3.1-1.16.63 1.56.24 2.71.12 3 .73.79 1.17 1.8 1.17 3.04 0 4.34-2.65 5.3-5.17 5.58.41.35.77 1.04.77 2.1v3.11c0 .3.2.65.78.54A11.3 11.3 0 0 0 12 .7Z",
    linkedin:"M5.34 7.9H1.72V19.5h3.62V7.9ZM3.53 2.14a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM19.5 12.85c0-3.5-1.87-5.13-4.37-5.13-2.01 0-2.91 1.1-3.42 1.88V7.9H8.1v11.6h3.61v-5.75c0-1.52.29-3 2.18-3 1.86 0 1.89 1.74 1.89 3.1v5.65h3.62l.1-6.65Z",
    email:"M2.5 5.5h19v13h-19v-13Zm.8 1 8.7 7 8.7-7M3.3 17.5l6.2-5m11.2 5-6.2-5",
    phone:"M6.7 2.5h3l1.3 5-2.1 1.3a16 16 0 0 0 6.3 6.3l1.3-2.1 5 1.3v3c0 2.3-2 4.1-4.3 3.8A17.2 17.2 0 0 1 2.9 6.8C2.6 4.5 4.4 2.5 6.7 2.5Z",
    location:"M12 21s7-6.2 7-12A7 7 0 1 0 5 9c0 5.8 7 12 7 12Zm0-9.5A2.5 2.5 0 1 0 12 6a2.5 2.5 0 0 0 0 5.5Z"
  };
  const stroked=icon==="email"||icon==="phone";
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill={stroked?"none":"currentColor"} stroke={stroked?"currentColor":"none"} strokeWidth={stroked?1.7:0} strokeLinecap="round" strokeLinejoin="round"><path d={paths[icon]}/></svg>
}
function SocialLink({href,label,icon}:{href:string;label:string;icon:SocialIconName}){
  const external=href.startsWith("http");
  return <a className="social-link" href={href} target={external?"_blank":undefined} rel={external?"noreferrer":undefined} aria-label={label}><SocialIcon icon={icon}/><span className="social-tooltip">{label}</span></a>
}
function Proof({code,title,detail,color}:{code:string;title:string;detail:string;color:string}) {
  return (
    <article className="card proof-card">
      <div className="proof-top"><span className={color}>{code}</span><small>verified impact</small></div>
      <h3>{title}</h3>
      <p>{detail}</p>
    </article>
  );
}
function Experience({
  branch,
  period,
  company,
  role,
  color,
  tags,
  items,
}: {
  branch: string;
  period: string;
  company: string;
  role: string;
  color: string;
  tags: string[];
  items: string[];
}) {
  return (
    <article className="commit scroll-reveal">
      <div className={`commit-dot ${color}`}>⌘</div>
      <div className={`card commit-card ${color}`}>
        <div className="commit-top">
          <span className="tag green-tag">⌘ {branch}</span>
          <small>{period}</small>
        </div>
        <h3>{company}</h3>
        <h4>{role}</h4>
        <div className="tag-row">
          {tags.map((t) => (
            <span className="tag purple-tag" key={t}>
              {t}
            </span>
          ))}
        </div>
        <ul>
          {items.map((x, i) => (
            <li key={x}>
              <span>$</span>
              <Typewriter text={x} speed={8} delay={i * 130} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function Typewriter({
  text,
  speed = 14,
  delay = 0,
}: {
  text: string;
  speed?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setShown(text.length);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [text]);
  useEffect(() => {
    if (!active) return;
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(
        () =>
          setShown((n) => {
            if (n >= text.length) {
              window.clearInterval(interval);
              return n;
            }
            return n + 1;
          }),
        speed,
      );
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [active, text, speed, delay]);
  return (
    <span
      ref={ref}
      className={`typewriter ${active && shown < text.length ? "typing" : ""}`}
    >
      {text.slice(0, shown)}
    </span>
  );
}
