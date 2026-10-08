"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Self-contained React + TypeScript portfolio article.
 * No Tailwind, charting library, image asset or icon package required.
 * Route suggestion: /writing-portfolio/ai-employee-lifecycle-2026
 * Set showNavigation={false} if your app already renders a global header.
 */

type Props = {
  portfolioHref?: string;
  contactHref?: string;
  showNavigation?: boolean;
};

type IconName =
  | "arrow"
  | "back"
  | "spark"
  | "person"
  | "search"
  | "chat"
  | "calendar"
  | "check"
  | "book"
  | "chart"
  | "shield"
  | "brain"
  | "door"
  | "link"
  | "chevron"
  | "briefcase"
  | "nodes"
  | "clock"
  | "flag";

const contents = [
  ["meet-maya", "Job Discovery & Matching"],
  ["candidate", "Application & Screening"],
  ["interview", "Interview & Evaluation"],
  ["onboarding", "Role-Based Onboarding"],
  ["performance", "Performance & Development"],
  ["retention", "Retention & Attrition Signals"],
  ["exit", "Offboarding & Knowledge Transfer"],
  ["chro", "AI in HR Framework"],
] as const;


function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    back: <><path d="M19 12H5m6-6-6 6 6 6" /></>,
    spark: <><path d="m12 3 1.2 4.2L17 9l-3.8 1.8L12 15l-1.2-4.2L7 9l3.8-1.8L12 3Z" /><path d="m5 15 .7 2.3L8 18l-2.3.7L5 21l-.7-2.3L2 18l2.3-.7L5 15Zm14-9 .7 2.3L22 9l-2.3.7L19 12l-.7-2.3L16 9l2.3-.7L19 6Z" /></>,
    person: <><circle cx="12" cy="8" r="3.5" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    chat: <><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 9h8M8 12h5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    book: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H12v18H7.5A3.5 3.5 0 0 0 4 23V5.5Z" /><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H12v18h4.5A3.5 3.5 0 0 1 20 23V5.5Z" /></>,
    chart: <><path d="M4 20V9m6 11V4m6 16v-7m4 7H2" /></>,
    shield: <><path d="M12 3 20 6v6c0 5-3.3 8.1-8 10-4.7-1.9-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
    brain: <><path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-2 2.8A3.2 3.2 0 0 0 6 14v1a3 3 0 0 0 3 3" /><path d="M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 2 2.8A3.2 3.2 0 0 1 18 14v1a3 3 0 0 1-3 3M12 3v18M8 9h4m0 6h4" /></>,
    door: <><path d="M5 21V4a1 1 0 0 1 1-1h10v18" /><path d="M3 21h18M12 12h.01" /></>,
    link: <><path d="m10 14 4-4m-5 6-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m0 10a4 4 0 0 0 6 0l4-4a4 4 0 0 0-6-6l-1 1" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-12 5h18M10 12v2h4v-2" /></>,
    nodes: <><circle cx="5" cy="12" r="2" /><circle cx="12" cy="5" r="2" /><circle cx="19" cy="12" r="2" /><circle cx="12" cy="19" r="2" /><path d="m6.5 10.5 4-4m3 0 4 4m0 3-4 4m-3 0-4-4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    flag: <><path d="M5 21V4m0 1h11l-2 4 2 4H5" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Section({ id, number, heading, children }: { id: string; number: string; heading: string; children: ReactNode }) {
  return <section className="lc-section" id={id} aria-labelledby={`${id}-heading`}>
    {number && <div className="lc-section-kicker"><span>{number}</span><span /></div>}
    <h2 id={`${id}-heading`}>{heading}</h2>
    {children}
  </section>;
}

function P({ children, lead = false }: { children: ReactNode; lead?: boolean }) {
  return <p className={lead ? "lc-lead" : undefined}>{children}</p>;
}

function Cite({ n }: { n: number }) {
  return <sup><a className="lc-cite" href={`#lc-source-${n}`} aria-label={`Source ${n}`}>{n}</a></sup>;
}

function Quote({ label = "The CHRO takeaway", children }: { label?: string; children: ReactNode }) {
  return <blockquote className="lc-quote"><span className="lc-label">{label}</span><p>{children}</p></blockquote>;
}

function Note({ title, children }: { title: string; children: ReactNode }) {
  return <aside className="lc-note"><Icon name="shield" /><div><span className="lc-label">{title}</span><p>{children}</p></div></aside>;
}



function SkillsFigure() {
  const skills = [
    ["Cross-functional operations", 92, "strong"],
    ["Launch management", 86, "strong"],
    ["Product analytics", 61, "build"],
    ["SQL", 42, "build"],
  ] as const;
  return <figure className="lc-figure lc-skills">
    <div className="lc-figure-head"><span className="lc-label">Skills passport</span><span className="lc-small-tag">What can Maya do next?</span></div>
    <div className="lc-skills-grid">
      <div className="lc-skill-panel"><div className="lc-skill-title"><div className="lc-avatar sm">MC</div><div><small>Current role</small><strong>Product Operations Manager</strong></div></div>{skills.map(([name, value, cls]) => <div className="lc-skill" key={name}><div><span>{name}</span><strong>{value}%</strong></div><div className="lc-skill-track"><i className={`is-${cls}`} style={{ width: `${value}%` }} /></div></div>)}</div>
      <div className="lc-next-role"><span className="lc-label">Possible internal move</span><div className="lc-role-match"><span>81%</span><div><strong>Senior Product Operations</strong><small>3 strengths transfer · 2 gaps to close</small></div></div><div className="lc-gap"><span>01</span><div><strong>Product analytics</strong><small>Recommended: cohort analysis project + mentor review</small></div></div><div className="lc-gap"><span>02</span><div><strong>SQL</strong><small>Recommended: intermediate query pathway</small></div></div><button type="button">Build 90-day development plan <Icon name="arrow" size={14} /></button></div>
    </div>
    <figcaption>Illustrative skills model. Development recommendations become more useful when they connect a real next role to observable skill evidence, not a generic course catalogue.</figcaption>
  </figure>;
}


const decisionRows = [
  ["Draft a job description", "Turning a hiring brief into a first draft, pulling out recurring skills from similar roles and flagging requirements that may be unnecessarily restrictive", "Decide what the person will actually be responsible for, which skills are genuinely required and whether the brief reflects the role as it exists today"],
  ["Recommend candidates", "Surfacing adjacent experience, relevant skills and project evidence that match the work", "Open the evidence, challenge weak matches and decide who deserves a conversation rather than treating the ranking as the shortlist"],
  ["Reject a candidate", "Flagging missing must-have requirements, incomplete applications or obvious mismatches for review", "Define which requirements are truly non-negotiable and make sure a model score alone is not deciding who never gets seen"],
  ["Summarise an interview", "Transcribing the conversation, grouping answers by competency and pulling out the examples each candidate actually gave", "Check the transcript, correct missing context and score the candidate on the evidence rather than accepting the AI summary as fact"],
  ["Draft a performance review", "Bringing together goals, project updates, peer feedback, recognition and previous check-ins so older work does not disappear from view", "Decide what the evidence means, add context AI cannot see and own every judgement that goes into the employee’s final review"],
  ["Recommend development", "Spotting repeated strengths or gaps and suggesting relevant courses, mentors, projects or internal opportunities", "Agree with the employee which development actually matters and avoid turning one weak signal into a permanent label about capability"],
  ["Identify retention patterns", "Comparing attrition, mobility, workload, engagement and manager changes across teams to show where patterns are emerging", "Investigate what changed, speak to the people involved and avoid treating a statistical pattern as proof of why an individual might leave"],
  ["Terminate employment", "Pulling together documented performance history, prior conversations, policy records and other relevant information", "Review the full context, follow the appropriate process and make the employment decision through accountable human judgement"],
];

const guardrails = [
  { title: "Start with the decision, not the demo", text: "Write down what the system will influence: who gets seen, who gets interviewed, what a manager reads, what learning gets recommended, or what action HR takes. Risk becomes much easier to govern when the decision is explicit." },
  { title: "Separate evidence from inference", text: "A transcript, completed course or missed deadline is evidence. ‘Low leadership potential’ is an inference. Make the interface show which is which, and let people inspect the underlying record." },
  { title: "Give employees a way to challenge the machine", text: "If an AI output can affect someone’s opportunity, pay, performance or employment, the person needs a sensible path to question bad data, missing context or an incorrect conclusion." },
  { title: "Design the human handoff before you automate", text: "Who reviews the shortlist? Who handles an answer the HR agent cannot support? Who can override a recommendation? If the answer is ‘someone will notice’, the workflow is not ready." },
  { title: "Measure the people outcome, not AI usage", text: "More prompts are not an HR outcome. Better quality of hire, faster time to productivity, more internal moves, stronger manager conversations and fewer avoidable tickets are outcomes you can defend." },
  { title: "Keep a record of what changed", text: "Models, prompts, policies and integrations change. If AI touches employment decisions, keep versioning, audit trails and ownership clear enough that you can reconstruct why a recommendation appeared." },
];


function DecisionTable() {
  return <figure className="lc-decision">
    <div className="lc-figure-head"><span className="lc-label">Decision-rights map</span><span className="lc-small-tag">Write this before buying tools</span></div>
    <div className="lc-decision-scroll" role="region" aria-label="Decision-rights map; scroll horizontally on smaller screens" tabIndex={0}>
      <table className="lc-decision-table">
        <thead>
          <tr>
            <th scope="col">Moment</th>
            <th scope="col">AI can help with</th>
            <th scope="col">Human responsibility</th>
          </tr>
        </thead>
        <tbody>
          {decisionRows.map(([moment, ai, human]) => <tr key={moment}>
            <td><strong>{moment}</strong></td>
            <td>{ai}</td>
            <td>{human}</td>
          </tr>)}
        </tbody>
      </table>
    </div>

 
  </figure>;
}

export default function AIEmployeeLifecycle2026({
  portfolioHref = "/#work",
  contactHref = "https://www.seo-growup.com/get-in-touch",
  showNavigation = false,
}: Props = {}) {
  const articleRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [minutes, setMinutes] = useState(15);
  const [shareStatus, setShareStatus] = useState("");
  const shareTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;
    const text = article.querySelector(".lc-editorial")?.textContent || "";
    setMinutes(Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 230)));
    let frame: number | null = null;
    const update = () => {
      const rect = article.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.max(0, Math.min(100, (-rect.top / travel) * 100)));
     
  let current = "";

for (const [id] of contents) {
  const section = article.querySelector<HTMLElement>(`#${id}`);

  if (section && section.getBoundingClientRect().top <= 170) {
    current = id;
  }
}

setActive(current);


      frame = null;
    };
    const queue = () => { if (frame === null) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => () => { if (shareTimer.current) clearTimeout(shareTimer.current); }, []);

  async function copyLink() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus("Link copied");
      } else if (navigator.share) {
        await navigator.share({ title: "How AI Is Changing the Employee Lifecycle in 2026", url: window.location.href });
        setShareStatus("Shared");
      } else setShareStatus("Copy the URL from your address bar");
    } catch {
      setShareStatus("Copy the URL from your address bar");
    }
    if (shareTimer.current) clearTimeout(shareTimer.current);
    shareTimer.current = setTimeout(() => setShareStatus(""), 4000);
  }

  const tocLinks = contents.map(([id, label], i) => <a key={id} href={`#${id}`} className={active === id ? "is-active" : undefined} aria-current={active === id ? "location" : undefined}><span>{String(i + 1).padStart(2, "0")}</span>{label}</a>);

  return <div className="lc-page" data-article-slug="ai-employee-lifecycle-2026">
    <style>{styles}</style>
    <a className="lc-skip" href="#lc-article">Skip to article</a>
    <div className="lc-progress" aria-hidden="true"><div style={{ width: `${progress}%` }} /></div>

    <header className="lc-hero">
      {showNavigation && <nav className="lc-nav lc-container" aria-label="Main navigation">
        <a className="lc-logo" href="https://www.seo-growup.com/" aria-label="GrowUp home"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true"><path d="M5 22 18 5M10 15C2 14 4 5 4 5s10 1 6 10Zm3-5C12 1 23 2 23 2s1 10-10 8Zm1 7c1-8 10-7 10-7s-1 10-10 7Z" fill="currentColor" /></svg>GrowUp<span>®</span></a>
        <div className="lc-nav-links"><a href="https://www.seo-growup.com/">Home</a><a href={portfolioHref} className="is-current">Writing portfolio</a><a href="https://www.seo-growup.com/b2b-saas-copywriting-agency">Our services</a><a href="https://www.seo-growup.com/web-design-portfolio">Our work</a></div>
        <a className="lc-button lc-button-accent" href={contactHref}>Let’s talk <Icon name="arrow" size={17} /></a>
      </nav>}
      <div className="lc-hero-main lc-container">
        <div className="lc-hero-copy">
          <div className="lc-category"><span />HR Tech Writing Sample</div>
          <h1>How AI Is Changing the Employee Lifecycle in 2026</h1>
          <p className="lc-deck">A practical look at where AI now enters the employee lifecycle, from candidate matching and interview notes to onboarding, reviews, retention and offboarding.</p>
          <div className="lc-hero-meta"><span>GrowUp Editorial</span><span>{minutes} min read</span><time dateTime="2026-10-05">October 2026</time></div>
          <a className="lc-read-link" href="#lc-article">Read the guide <Icon name="arrow" size={18} /></a>
        </div>
        <div className="lc-hero-art">
  <img
    src="/images/aiopsheroimg.png"
    alt="Illustration of the employee lifecycle, from candidate through to exit."
    width={1200}
    height={900}
    fetchPriority="high"
  />
</div>
      </div>
    </header>

    <main className="lc-container lc-main">
      <section className="lc-overview" aria-labelledby="lc-overview-heading">
        <h2 className="lc-label" id="lc-overview-heading">Article overview</h2>
        <dl>{[
          { icon: "book" as const, label: "Content Type", value: "Scenario-Based Narrative Guide" },
          { icon: "person" as const, label: "Audience", value: "CHROs and People Leaders" },
          { icon: "nodes" as const, label: "Scope", value: "Full Employee Lifecycle" },
          { icon: "shield" as const, label: "Takeaway", value: "AI Roles and Guardrails" },
        ].map(item => <div key={item.label}><span className="lc-icon-tile"><Icon name={item.icon} size={18} /></span><div><dt>{item.label}</dt><dd>{item.value}</dd></div></div>)}</dl>
      </section>

      <div className="lc-reading-layout">
        <aside className="lc-toc"><div className="lc-label">In this article</div><nav aria-label="Article contents">{tocLinks}</nav><div className="lc-toc-footer"><span>{Math.round(progress)}% read</span><button onClick={copyLink} type="button"><Icon name="link" size={15} />Copy link</button></div><p role="status" className="lc-share-status">{shareStatus}</p></aside>
        <details className="lc-mobile-toc"><summary>In this article <Icon name="chevron" size={18} /></summary><nav aria-label="Article contents on mobile">{tocLinks}</nav></details>

        <article className="lc-article" id="lc-article" ref={articleRef} aria-label="How AI Is Changing the Employee Lifecycle in 2026">
          <div className="lc-editorial">
            <Section id="at-a-glance" number="" heading="A few years ago, if I applied for a job, I could roughly picture what happened next.  ">
              <P lead>Someone opened my CV. A recruiter decided whether to call me. A manager interviewed me. If I joined, HR handled the paperwork and my manager took it from there.</P>
              <P lead>In 2026, there can be a lot more happening in between.</P>
              <P lead>AI might help decide which vacancy I see, pull skills from my CV, summarise my interview, answer my first-week questions, prepare material for my performance review, recommend training and flag that I might be ready for another role.</P>
             
               <P lead>No single step feels revolutionary. But follow the same employee for long enough and the change becomes obvious.</P>
             
               <P lead>So rather than talking about “AI in HR” in the abstract, this guide follows one fictional employee through the entire lifecycle, from candidate and hiring through onboarding, performance and development to exit and offboarding, showing what AI looks like at each stage.</P>
             
     
         
            </Section>

            <Section id="meet-maya" number="01" heading="AI in Hiring Now Starts Before the Application">
              <P>Meet Maya.</P>
              <P>It is 8:43 on a Tuesday morning and she is doing what I suspect a lot of people do when they’re not <em>really</em> job hunting: drinking coffee, scrolling LinkedIn and occasionally clicking a role that looks interesting.</P>
              <P>One of them is a <strong>Product Operations Manager position.</strong></P>
       


  <figure className="lc-maya-search">
  <img
    src="/images/maya-linkedin-search.png"
    alt="AI recommending a role to Maya based on her transferable skills."
    width={1200}
    height={750}
    loading="lazy"
    decoding="async"
  />
  <figcaption className="lc-maya-caption">AI recommending a role to Maya based on her transferable skills.</figcaption>
</figure>

         <p style={{ paddingTop: 10 }}>The odd thing is, Maya has never been a Product Operations Manager. Her current title is Customer Operations Lead. Before that, she worked on product launches, fixed messy internal processes and somehow became the person everyone called when a new tool needed rolling out.</p>

             <P>On paper, she is not the obvious match.</P>
             <P>But look at the work underneath the titles and it starts to make more sense: stakeholder management, process design, product analytics, launches, systems implementation.</P>
             
         

             <P>Maya does not need to know that “Product Operations Manager” is a job she should be searching for. The AI can make that connection first and put the role in front of her. </P>

<P>That matters for employers too.</P>

<P>A Product Operations vacancy no longer has to compete only for people who already call themselves Product Operations Managers. It can also reach candidates in customer operations, implementation, programme management or other adjacent roles whose experience overlaps with the work. </P>
    
            </Section>

            <Section id="candidate" number="02" heading="AI Candidate Screening From Application to Shortlist">
              <P>Maya clicks the role, decides it’s worth a shot and starts the application. Before submitting, she gives AI the job description and her CV and asks it to rewrite a few bullets so the relevant experience is clearer: product launches, process improvement, analytics and systems implementation.</P>
             
               <figure className="lc-maya-search">
  <img
    src="/images/ai-cv-rewrite.png"
    alt="AI rewriting Maya's CV bullets against the job description."
    width={1200}
    height={750}
    loading="lazy"
    decoding="async"
  />
  <figcaption className="lc-maya-caption">AI rewriting Maya's CV bullets against the job description.</figcaption>
</figure>


            <p style={{ paddingTop: 10 }}>Then she hits submit.</p>
              
              <P>Now the same application moves to the other side of the system. An ATS can parse Maya’s CV, identify those skills, compare them with the role and help the recruiter decide whether she belongs in the shortlist for closer review.</P>
           
                <figure className="lc-maya-search">
  <img
    src="/images/rivermereats.png"
    alt="AI scoring Maya against the role for the recruiter."
    width={1200}
    height={750}
    loading="lazy"
    decoding="async"
  />
  <figcaption className="lc-maya-caption">AI scoring Maya against the role for the recruiter.</figcaption>
</figure>
           
  <p style={{ paddingTop: 10 }}>For Maya, the value is simple: the parts of her background that matter are easier to spot. For the recruiter, the same information is easier to compare against the role at scale. </p>
             
       <P>That does not remove the need for judgement, but it improves the first pass. Instead of asking whether Maya has held the exact title before, the recruiter can focus on whether she has done enough of the work to merit a closer look.</P>

            </Section>

<Section id="interview" number="03" heading="Using AI to Capture and Review Job Interviews">
  <P>If you have ever left an interview wondering whether you actually answered the question or spent three minutes circling it, Maya’s next step will feel familiar.</P>
  <P>She gets shortlisted.</P>
  <P>The email lands the following afternoon with an invitation to a first-round interview. Before the call, Maya gives AI the job description again, asks it to predict the questions she is likely to get and practises explaining the product launches, process improvements and systems work that got her this far.</P>
  <P>Then the interview starts, and AI is on the other side too.</P>
  
     <figure className="lc-maya-search">
  <img
    src="/images/ai-powered-interview.png"
    alt="AI conducting Maya's first-round interview."
    width={1200}
    height={750}
    loading="lazy"
    decoding="async"
  />
  <figcaption className="lc-maya-caption">AI conducting Maya's first-round interview.</figcaption>
</figure>
  
  <p style={{ paddingTop: 10 }}>Anyone who has interviewed people knows how quickly the notes get messy: you are listening to Maya, thinking about the next question and trying to write down the useful parts at the same time.</p>


  <P>With AI capturing the transcript, the recruiter can stay in the conversation and come back afterwards to Maya’s actual examples: the launch she managed, the process she changed, the system she rolled out. Maya gets more attention during the interview, and the recruiter gets a cleaner record when it is time to compare her with the other candidates.</P>
 
  <P>Where I would be much more cautious is when the system starts going beyond what Maya actually said. Summarising her example of handling a difficult launch is useful. Scoring her confidence, facial expressions or speaking style and turning that into a prediction about job performance is where the risks start to outweigh benefits.</P>



</Section>

          <Section id="onboarding" number="04" heading="Building Role-Based Employee Onboarding With AI">
  <P>The worst onboarding I ever had started with a folder called <strong>START HERE</strong>.</P>
  <P>Inside were 47 links, three outdated org charts, two videos recorded by people who had already left the company and a benefits document that somehow opened as a 62-page PDF.</P>
  <P>By day three, I had learned a lot about the company. Just not much about how to do my job.</P>
  <P>Maya’s first week can look very different.</P>
  <P>She gets the offer, accepts and arrives on Monday to an onboarding sequence built around the role she was actually hired to do. Instead of sending her the entire company knowledge base, an AI onboarding agent can surface the processes, teams and systems most relevant to Product Operations.</P>
  
  

   <figure className="lc-maya-search">
  <img
    src="/images/ai_onboarding.png"
    alt="AI walking Maya through onboarding step by step."
    width={1200}
    height={750}
    loading="lazy"
    decoding="async"
  />
  <figcaption className="lc-maya-caption">AI walking Maya through onboarding step by step.</figcaption>
</figure>
  
  <p style={{ paddingTop: 10 }}>It can also adjust the sequence as she goes. Finish the analytics setup early and the next walkthrough can move forward. Get stuck waiting for access to a tool and the system can flag it rather than happily sending lesson six.</p>
 


</Section>


         <Section id="performance" number="05" heading="Using AI to Improve Performance Reviews and Development">
  <P>I have seen performance reviews where 11 months of good work somehow disappear because you made one very visible mistake three weeks before the meeting.</P>
  <P>Managers do not usually mean to do this. They’re just trying to reconstruct a year from memory, scattered notes, Slack messages and whatever happened recently enough to still be sitting in their head.</P>
  <P>By Maya’s first review, AI can give her manager a much better starting point.</P>
  <P>It can pull together her goals, project updates, feedback, recognition and previous check-ins, then draft a review around what actually happened. So when Maya’s manager sits down to write it, the launch process she rebuilt six months ago does not vanish simply because the latest project is fresher in everyone’s memory.</P>

   <figure className="lc-maya-search">
  <img
    src="/images/ai-performance-review.png"
    alt="AI drafting Maya's performance review from the year's evidence."
    width={1200}
    height={750}
    loading="lazy"
    decoding="async"
  />
  <figcaption className="lc-maya-caption">AI drafting Maya's performance review from the year's evidence.</figcaption>
</figure>
  <p style={{ paddingTop: 10 }}>The same information can also shape what comes next.</p>
  <P>If Maya consistently delivers projects well but struggles when several teams need aligning, AI can flag stakeholder management as an area to develop and recommend relevant training, mentoring or stretch projects. If her analytics work keeps showing up as a strength, that can feed into the next set of responsibilities too.</P>
  
    <figure className="lc-maya-search">
  <img
    src="/images/ai-development.png"
    alt="AI turning Maya's review into a development plan."
    width={1200}
    height={750}
    loading="lazy"
    decoding="async"
  />
  <figcaption className="lc-maya-caption">AI turning Maya's review into a development plan.</figcaption>
</figure>
  

</Section>
          

         <Section id="retention" number="06" heading="Spotting Employee Retention Patterns Before People Leave">
  <P>Most companies have had the meeting where somebody asks, “Did we see this coming?” after a strong employee resigns.</P>
  <P>Quite often, the answer is that the signals were there. They were just scattered across too many places.</P>
  <P>A manager changed. Workload rose. Internal moves slowed down. Engagement dipped. A few experienced people left the same team within a short period.</P>
  <P>AI can help connect those dots earlier.</P>
  <P>At team level, that is useful because HR can look for repeatable patterns rather than one-off anecdotes. If regrettable attrition keeps rising after manager changes, one function has unusually low internal mobility or a certain cohort is carrying more work while engagement falls, there is a concrete area to investigate.</P>
     <figure className="lc-maya-search">
  <img
    src="/images/ai-retention.png"
    alt="AI spotting team-level patterns in attrition and engagement."
    width={1200}
    height={750}
    loading="lazy"
    decoding="async"
  />
  <figcaption className="lc-maya-caption">AI spotting team-level patterns in attrition and engagement.</figcaption>
</figure>
 <p style={{ paddingTop: 10 }}>Where I would become much more careful is at the individual level.</p>
  <P>Take Maya, for example.</P>
  <P>If she sends fewer messages, misses a company event and stops applying for internal roles, an algorithm might decide she is disengaging.</P>
  <P>Maybe she is.</P>
  <P>Or maybe the quarter has finally calmed down, she is focused on a major project and there simply has not been an internal role she wants.</P>
  

</Section>

      <Section id="exit" number="07" heading="Improving Employee Offboarding and Knowledge Transfer">
  <P>One of the strangest exits I ever had ended with someone asking me, on my final afternoon, whether I could “just quickly write down everything I was working on”.</P>
  <P>There were open projects, recurring meetings, half-finished docs and a few processes that mostly lived in my head. None of it had been pulled together until the clock was already running out.</P>
  <P>AI can make that handover much less chaotic.</P>
  <P>It can show open projects, identify recurring meetings, suggest likely new owners and flag where documentation is thin or missing. It can also help coordinate the less glamorous bits: access reviews, account closure, equipment returns and the long list of permissions nobody remembers until after someone has left.</P>


   <figure className="lc-maya-search">
  <img
    src="/images/ai-offboarding.png"
    alt="AI spotting team-level patterns in attrition and engagement."
    width={1200}
    height={750}
    loading="lazy"
    decoding="async"
  />
  <figcaption className="lc-maya-caption">AI spotting team-level patterns in attrition and engagement.</figcaption>
</figure>

 <p style={{ paddingTop: 10 }}>What it should not do is flatten an exit conversation into a neat reason code and call the job done.</p>

  
 
  <P>There is still a person leaving at the end of all that data, and the way the company handles those final few weeks matters.</P>

 <P>A good offboarding process should preserve enough context for the relationship to continue. Former employees can become referrers, customers, future hires or the person you call two years later when a role opens up again.</P>
  

</Section>


            <Section id="chro" number="8" heading="How to Implement AI in HR: A Practical Framework">
              <P lead>Now that we have seen what AI can do across hiring, onboarding, performance, retention and offboarding, the next question is the practical one: <strong>how do you actually introduce it without creating a mess?</strong></P>
              <P>I would not start by buying tools or writing a giant AI policy. I would start by writing down exactly where AI is allowed to help, where a human needs to check the output and who owns the final decision.</P>
              <P>That becomes the operating system for everything that follows.</P>

              <DecisionTable />

        <P>If I think back to the bad onboarding, rushed reviews and awkward exits I have experienced myself, none of them needed some revolutionary HR system to fix them. They mostly needed better context at the right moment. That is where I think AI earns its place: helping people notice what matters before it gets buried, forgotten or dealt with too late.</P>

            </Section>
          </div>

      

          <div className="lc-article-end"><a href={portfolioHref}><Icon name="back" size={17} />Back to writing portfolio</a><a href="#lc-article">Back to the article ↑</a></div>
        </article>
      </div>
    </main>
  </div>;
}

const styles = String.raw`
.lc-page{--ink:#0b1020;--ink-2:#151c31;--paper:#f7f5ef;--card:#fbfaf6;--text:#262b35;--muted:#6f7480;--line:#ddd9cf;--violet:#7b68ee;--violet-2:#a89bf6;--mint:#d8f4ad;--teal:#1F9FA1;--coral:#ff9e7a;--serif:Georgia,'Times New Roman',serif;--sans:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--paper);color:var(--text);font-family:var(--sans);font-size:16px;line-height:1.5;isolation:isolate}
.lc-page *{box-sizing:border-box}.lc-page a{color:inherit;text-decoration:none}.lc-page button{font:inherit;cursor:pointer}.lc-page svg{flex-shrink:0}.lc-page figure,.lc-page blockquote,.lc-page h1,.lc-page h2,.lc-page h3,.lc-page p,.lc-page dl,.lc-page dd{margin:0}.lc-page a:focus-visible,.lc-page button:focus-visible,.lc-page summary:focus-visible{outline:2px solid var(--violet);outline-offset:5px}.lc-container{width:min(1240px,calc(100% - 96px));margin-inline:auto}.lc-label{font-size:10px;line-height:1.5;font-weight:700;letter-spacing:.17em;text-transform:uppercase}.lc-skip{position:fixed;left:20px;top:12px;z-index:80;background:#fff;padding:12px 20px;transform:translateY(-160%)}.lc-skip:focus{transform:none}.lc-progress{height:3px;position:fixed;inset:0 0 auto;z-index:70;pointer-events:none}.lc-progress>div{height:100%;background:linear-gradient(90deg,var(--violet),#b69cff,#79e5c4)}
.lc-hero{background:#041b1c;color:#f5f8f2;overflow:hidden;padding-top:96px;position:relative;width:100vw;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw}.lc-hero:before{content:'';position:absolute;width:720px;height:720px;border-radius:50%;background:radial-gradient(circle,rgba(31,159,161,.15),rgba(31,159,161,0) 68%);right:-180px;top:-180px;pointer-events:none}.lc-nav{width:min(1240px,calc(100% - 96px));margin-inline:auto;min-height:92px;display:flex;align-items:center;gap:30px;border-bottom:1px solid rgba(255,255,255,.1);position:relative;z-index:3}.lc-logo{font-weight:680;font-size:24px;letter-spacing:-.07em;display:flex;gap:6px;align-items:center}.lc-logo svg{color:var(--mint)}.lc-logo>span{font-size:9px;align-self:flex-start;margin-top:5px;letter-spacing:0}.lc-nav-links{display:flex;gap:29px;align-items:center;margin-inline:auto;font-size:12px;color:#aeb4c7}.lc-nav-links a{padding-block:8px;border-bottom:1px solid transparent}.lc-nav-links a:hover,.lc-nav-links .is-current{color:#fff;border-color:var(--violet-2)}.lc-button{display:inline-flex;align-items:center;justify-content:center;gap:16px;padding:13px 21px;border-radius:100px;font-size:12px;font-weight:700;min-height:45px;transition:transform .18s,background .18s}

.lc-button-accent{background:#1F9FA1;color:#fff!important}
.lc-button-accent:hover{transform:translateY(-1px);background:#178a8c}
.lc-hero-main{width:min(1240px,calc(100% - 96px));margin-inline:auto;display:grid;grid-template-columns:.92fr 1.08fr;gap:46px;min-height:660px;align-items:center;padding-block:54px 64px;position:relative;z-index:2}.lc-category{display:flex;align-items:center;gap:8px;color:#1F9FA1;font-size:10px;letter-spacing:.16em;text-transform:uppercase;width:fit-content;border:1px solid rgba(31,159,161,.4);padding:6px 12px;border-radius:30px;margin-bottom:23px}.lc-category>span{width:4px;height:4px;background:currentColor;border-radius:50%}.lc-hero h1{font-family:var(--serif);font-size:clamp(43px,4.6vw,68px);font-weight:400;letter-spacing:-.052em;line-height:1.035;max-width:660px;text-wrap:balance;color:#f5f8f2}.lc-deck{max-width:500px;font-size:16px;line-height:1.75;color:#fafafa;margin-top:26px!important}.lc-hero-meta{display:flex;flex-wrap:wrap;font-size:12px;color:#8f96aa;margin-top:25px}.lc-hero-meta>*+*::before{content:'·';padding-inline:12px;color:#5e6579}.lc-read-link{display:flex;align-items:center;gap:14px;width:fit-content;font-size:13px;color:#1F9FA1!important;margin-top:28px}.lc-hero-art{min-width:0;position:relative;display:flex;align-items:center;justify-content:center}
.lc-hero-art img{display:block;width:100%;height:auto;max-width:100%;object-fit:contain;filter:drop-shadow(0 30px 60px rgba(0,0,0,.3))}
.lc-hero-ui{position:relative;padding:42px 12px 34px}.lc-hero-window{background:#f9fafc;color:#1c2332;border:1px solid rgba(255,255,255,.22);border-radius:18px;box-shadow:0 32px 80px rgba(0,0,0,.36);overflow:hidden;transform:rotate(.4deg)}.lc-window-bar{height:44px;border-bottom:1px solid #e7e8ee;display:flex;align-items:center;gap:6px;padding:0 15px;background:#f1f2f6;font-size:9px;color:#7b8190}.lc-window-bar i{width:7px;height:7px;border-radius:50%;background:#cfd2db}.lc-window-bar i:first-child{background:#ffac93}.lc-window-bar i:nth-child(2){background:#f3d77b}.lc-window-bar i:nth-child(3){background:#a7dfc6}.lc-window-bar span{margin-left:7px}.lc-window-bar b{margin-left:auto;font-size:8px;background:#d9ede2;color:#167273;border-radius:20px;padding:4px 8px;font-weight:700}.lc-hero-profile{display:flex;align-items:center;gap:13px;padding:21px 22px 17px;border-bottom:1px solid #ececf0}.lc-avatar{width:47px;height:47px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#d5d0ff,#a7e5d2);font-size:13px;font-weight:800;color:#2b3150;flex-shrink:0}.lc-avatar.sm{width:34px;height:34px;font-size:10px}.lc-hero-profile>div:nth-child(2){min-width:0}.lc-hero-profile small{display:block;font-size:8px;color:#999eaa;text-transform:uppercase;letter-spacing:.13em}.lc-hero-profile strong{display:block;font-size:15px;margin-top:3px}.lc-hero-profile div>span{font-size:9px;color:#7c8290}.lc-profile-status{margin-left:auto!important;font-size:8px!important;color:#3e7a68!important;display:flex;gap:6px;align-items:center;white-space:nowrap}.lc-profile-status i{width:6px;height:6px;background:#64c49f;border-radius:50%}.lc-journey-line{display:grid;grid-template-columns:repeat(6,1fr);padding:26px 18px 23px;gap:4px}.lc-journey-step{position:relative;text-align:center;min-width:0}.lc-journey-node{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#eeebff;color:#6253c7;margin:0 auto 9px;position:relative;z-index:2;border:4px solid #fafaff}.lc-journey-step small{display:block;font-size:7px;color:#b0b4bf;letter-spacing:.1em}.lc-journey-step strong{display:block;font-size:9px;margin-top:2px}.lc-journey-step>span{display:block;font-size:7px;color:#8f94a0;line-height:1.35;margin-top:3px;padding-inline:2px}.lc-journey-step em{position:absolute;top:16px;left:64%;width:78%;height:1px;background:#d9d7e4;z-index:1}.lc-hero-insight{margin:0 20px 21px;padding:15px;border:1px solid #ded9fb;border-radius:11px;background:#f5f3ff;display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center}.lc-ai-badge{font-size:8px;font-weight:750;color:#167273;display:flex;align-items:center;gap:5px;white-space:nowrap}.lc-hero-insight p{font-size:9px;line-height:1.55;color:#515868}.lc-hero-insight p strong{color:#262d3c}.lc-hero-insight button{background:transparent;border:0;color:#167273;font-size:8px;font-weight:700;display:flex;align-items:center;gap:5px;padding:0}.lc-float-card{position:absolute;background:#11182b;border:1px solid rgba(255,255,255,.12);box-shadow:0 17px 34px rgba(0,0,0,.26);border-radius:10px;padding:11px 13px;color:#fff;z-index:4}.lc-float-card span{display:block;color:#939bb2;font-size:7px;text-transform:uppercase;letter-spacing:.12em}.lc-float-card strong{font-size:9px;display:block;margin-top:3px;font-weight:650}.lc-float-card.is-a{left:-19px;top:18px;transform:rotate(-3deg)}.lc-float-card.is-b{right:-5px;bottom:3px;transform:rotate(2.5deg)}
.lc-main{padding-bottom:48px}.lc-overview{padding:42px 0 46px;border-bottom:1px solid var(--line)}.lc-overview>h2{color:#232838;font-size:11px;letter-spacing:.22em;font-weight:700;margin-bottom:30px}.lc-overview dl{display:grid;grid-template-columns:repeat(4,1fr);gap:30px}.lc-overview dl>div{display:flex;align-items:center;gap:16px;min-width:0}.lc-overview dl>div+div{border-left:1px solid #e4e0d7;padding-left:30px}.lc-icon-tile{width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px solid #d8d3ca;color:#167273;background:transparent;flex-shrink:0}.lc-overview dt{font-size:9px;color:#9b978f;letter-spacing:.14em;text-transform:uppercase;font-weight:700;margin-bottom:7px}.lc-overview dd{font-size:13px;font-weight:600;line-height:1.45;color:#272c38}.lc-reading-layout{display:grid;grid-template-columns:240px minmax(0,790px);gap:72px;padding-top:58px;justify-content:space-between;align-items:start}.lc-toc{position:sticky;top:40px}.lc-toc>.lc-label{color:#011522;font-size:11px;padding-bottom:18px}.lc-toc nav{display:flex;flex-direction:column}.lc-toc nav a,.lc-mobile-toc nav a{display:flex;gap:13px;font-size:13px;padding:11px 0;color:#011522;line-height:1.45;border-bottom:1px solid #e8e4dc}.lc-toc nav a>span,.lc-mobile-toc nav a>span{font-size:10px;font-variant-numeric:tabular-nums;color:#011522;opacity:.55;min-width:20px;padding-top:2px}

.lc-toc nav a.is-active,.lc-mobile-toc nav a.is-active{color:#011522;font-weight:700}
.lc-toc nav a.is-active>span{color:#011522;opacity:1}
.lc-toc-footer{display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#969087;margin-top:26px}.lc-toc-footer button{background:transparent;border:0;padding:4px 0;color:#167273;display:flex;gap:7px;align-items:center;font-size:11px;font-weight:650}.lc-share-status{font-size:10px;color:#858078;min-height:2em;margin-top:8px!important}.lc-mobile-toc{display:none}.lc-article{min-width:0;scroll-margin-top:35px}
.lc-editorial p{font-family:var(--serif);font-size:17px;line-height:1.86;letter-spacing:.001em;margin-bottom:21px}.lc-editorial p.lc-lead{font-size:22px;line-height:1.62;letter-spacing:-.016em;color:#252939}.lc-editorial p strong{font-weight:700;color:#171c29}.lc-editorial a.lc-cite{font-family:var(--sans);font-size:9px;color:#167273;padding:0 3px;font-weight:750}.lc-editorial sup{line-height:0}.lc-section{padding-top:58px;scroll-margin-top:35px}.lc-section:first-child{padding-top:0}.lc-section-kicker{display:flex;gap:16px;align-items:center;margin-bottom:17px}.lc-section-kicker>span:first-child{font-size:9px;font-variant-numeric:tabular-nums;color:#167273;letter-spacing:.12em;font-weight:700}.lc-section-kicker>span:last-child{height:1px;flex:1;background:var(--line)}.lc-section h2{font-family:var(--serif);font-weight:400;font-size:36px;line-height:1.18;letter-spacing:-.038em;color:#202533;margin-bottom:24px;max-width:700px;text-wrap:balance}.lc-section h3{font-family:var(--sans);font-size:16px;font-weight:700;color:#272c39;line-height:1.45;margin:30px 0 10px;letter-spacing:-.01em}

.lc-quote{border-left:2px solid #1F9FA1;padding:5px 0 5px 28px;margin:34px 0!important}
.lc-quote>.lc-label{font-size:9px;color:#167273}
.lc-editorial .lc-quote p{font-size:27px;line-height:1.43;letter-spacing:-.028em;color:#0f3d3a;margin:11px 0 0}

.lc-note{display:flex;gap:15px;background:#e6f1ea;border-top:1px solid #cfe2d6;padding:23px 24px;margin:30px 0}
.lc-note>svg{color:#1f6b4f;margin-top:2px}
.lc-note .lc-label{color:#167273;font-size:9px}
.lc-editorial .lc-note p{font-family:var(--sans);font-size:12px;line-height:1.75;margin:8px 0 0;color:#545264}.lc-figure{border:1px solid var(--line);background:#f3f1ea;border-radius:15px;padding:24px;margin:30px 0!important;overflow:hidden}.lc-figure-head{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:25px}.lc-figure-head>.lc-label{color:#77726a;font-size:9px}.lc-small-tag{font-size:8px;color:#857f77;border:1px solid #d8d3ca;border-radius:20px;padding:4px 9px;white-space:nowrap}.lc-figure figcaption{font-family:var(--sans);font-size:9px;line-height:1.75;color:#8c877f;padding-top:18px;margin-top:20px;border-top:1px solid #ddd8cf}.lc-window{background:#fff;border:1px solid #dfdfe4;border-radius:12px;overflow:hidden}

.lc-maya-search{margin:30px 0}
.lc-maya-search img{display:block;width:100%;height:auto}
.lc-maya-caption{text-align:center;font-size:10px;line-height:1.7;color:#011522;padding-top:12px;max-width:640px;margin-inline:auto}

.lc-decision{margin:34px 0!important;padding:0}
.lc-decision .lc-figure-head{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:22px}
.lc-decision .lc-figure-head>.lc-label{color:#011522;font-size:9px}
.lc-decision .lc-small-tag{font-size:8px;color:#011522;border:1px solid #d8d3ca;border-radius:20px;padding:4px 9px;white-space:nowrap}
.lc-decision-scroll{overflow-x:auto}
.lc-decision-scroll:focus{outline-offset:-3px}
.lc-decision-table{width:100%;border-collapse:collapse;min-width:680px}
.lc-decision-table th{text-align:left;padding:0 22px 13px 0;background:transparent;color:#011522;font-family:var(--sans);font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid #011522;vertical-align:bottom}
.lc-decision-table th:first-child{width:26%}
.lc-decision-table td{padding:20px 22px 20px 0;border-bottom:1px solid #dbe5dd;vertical-align:top;font-family:var(--sans);font-size:13px;line-height:1.55;color:#011522}
.lc-decision-table td:last-child{padding-right:0}
.lc-decision-table td strong{display:block;font-family:var(--serif);font-size:15px;font-weight:700;letter-spacing:-.015em;color:#011522;line-height:1.35;margin:0}
.lc-decision-table tr:last-child td{border-bottom:1px solid #dbe5dd}
.lc-decision figcaption{font-family:var(--sans);font-size:9px;line-height:1.75;color:#011522;padding-top:16px;margin-top:0}


.lc-window-body{padding:18px}.lc-window-foot{padding:12px 16px;background:#20263a;color:#edf0f7;display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:9px}.lc-window-foot span{display:flex;gap:6px;align-items:center;color:#b9bfd0}.lc-window-foot strong{font-size:9px;font-weight:650}
.lc-map{background:#12182a;border-color:#262e45;color:#fff}.lc-map .lc-label{color:#a9a1da}.lc-map .lc-small-tag{border-color:#343c55;color:#9ea6ba}.lc-map-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#2b3349;border:1px solid #2b3349;border-radius:12px;overflow:hidden}.lc-map-card{background:#171e32;padding:20px}.lc-map-top{display:flex;align-items:center;justify-content:space-between}.lc-map-top>span{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#2b2750;color:#b7acf9}.lc-map-top>b{font-size:9px;color:#636c82;letter-spacing:.1em}.lc-section .lc-map-card h3{color:#fff;font-size:15px;margin:17px 0 16px}.lc-map-card>div:not(.lc-map-top){border-top:1px solid #293148;padding-top:12px;margin-top:11px}.lc-map-card small{font-size:8px;color:#7f879b;text-transform:uppercase;letter-spacing:.1em}.lc-editorial .lc-map-card p{font-family:var(--sans);font-size:10px;line-height:1.55;color:#c0c5d2;margin:4px 0 0}.lc-map figcaption{border-color:#2a3246;color:#7e879a}
.lc-glance-figure{margin:30px 0!important}.lc-glance{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#ded9d0;border:1px solid #ded9d0;border-radius:14px;overflow:hidden}.lc-glance>div{background:#f5f3ed;padding:23px 20px;display:flex;flex-direction:column;gap:9px}.lc-glance strong{font-family:var(--serif);font-size:34px;font-weight:400;letter-spacing:-.045em;color:#4b3fac}.lc-glance span{font-family:var(--sans);font-size:10px;line-height:1.7;color:#4f515b}.lc-glance-figure figcaption{font-family:var(--sans);font-size:9px;line-height:1.8;color:#8b867e;margin-top:11px}
.lc-query-row{display:flex;align-items:center;gap:10px;background:#eef6f1;border:1px solid #cfe2d6;border-radius:9px;padding:12px;color:#167273;font-size:10px;line-height:1.5}.lc-candidate-head{display:grid;grid-template-columns:1fr 72px 160px;color:#a1a4ad;font-size:8px;text-transform:uppercase;letter-spacing:.1em;padding:16px 8px 8px;border-bottom:1px solid #ececf0}.lc-candidate-row{display:grid;grid-template-columns:1fr 72px 160px;align-items:center;padding:13px 8px;border-bottom:1px solid #eeeef1}.lc-candidate-row.is-active{background:#faf9ff}.lc-mini-person{display:flex;align-items:center;gap:10px}.lc-mini-person>span{width:31px;height:31px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#e6f1ea;color:#167273;font-size:8px;font-weight:750}.lc-mini-person strong{display:block;font-size:11px}.lc-mini-person small{display:block;font-size:8px;color:#9195a0;margin-top:2px}.lc-match strong{font-family:var(--serif);font-size:24px;font-weight:400;color:#167273}.lc-match span{font-size:8px;color:#a1a4ad}.lc-evidence span{display:block;font-size:9px;color:#525864}.lc-evidence small{display:block;font-size:8px;color:#7162ce;margin-top:3px}
.lc-interview-grid{display:grid;grid-template-columns:1.35fr .65fr;gap:14px}.lc-call-head{display:flex;align-items:center;gap:9px;padding-bottom:15px;border-bottom:1px solid #eeeef1}.lc-call-head strong{display:block;font-size:11px}.lc-call-head small{font-size:8px;color:#9297a3}.lc-live{margin-left:auto;font-size:8px;color:#3f806b;display:flex;align-items:center;gap:5px}.lc-live i{width:6px;height:6px;border-radius:50%;background:#61c59f}.lc-transcript>div{display:grid;grid-template-columns:38px 1fr;gap:8px;padding:11px 0;border-bottom:1px solid #eeeef1}.lc-transcript>div>span{font-size:8px;color:#a0a4ae}.lc-editorial .lc-transcript p{font-family:var(--sans);font-size:9px;line-height:1.55;color:#5e6370;margin:0}.lc-transcript p strong{display:block;font-size:8px;color:#303642;margin-bottom:3px}.lc-transcript>div:last-child p{color:#167273}.lc-score-card{background:#20263a;border-radius:12px;padding:20px;color:#fff}.lc-score-card>.lc-label{color:#9ea6ba;font-size:8px}.lc-section .lc-score-card h3{color:#fff;font-family:var(--serif);font-weight:400;font-size:25px;margin:9px 0 18px}.lc-signal{padding:10px 0;border-top:1px solid #353c50;display:flex;justify-content:space-between;gap:12px;font-size:9px}.lc-signal span{color:#aab0c0}.lc-signal strong{font-weight:650;color:#f4f5f9}.lc-do-not{display:flex;gap:9px;background:#302a43;border:1px solid #493d64;padding:12px;border-radius:9px;margin-top:14px;color:#e2c9ff}.lc-do-not strong{display:block;font-size:9px}.lc-do-not span{display:block;font-size:8px;line-height:1.45;color:#c3b7d3;margin-top:3px}
.lc-onboard-grid{display:grid;grid-template-columns:1.08fr .92fr;gap:14px}.lc-onboard-plan{background:#fff;border:1px solid #dfdfe3;border-radius:12px;padding:5px 16px}.lc-onboard-plan>div{display:grid;grid-template-columns:46px 27px 1fr 32px;gap:9px;align-items:center;padding:15px 0;border-bottom:1px solid #eeeef1}.lc-onboard-plan>div:last-child{border-bottom:0}.lc-day{font-size:8px;color:#9599a4}.lc-check{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#f0eff4;color:#9b9daa}.lc-onboard-plan .is-done .lc-check{background:#dff5eb;color:#3b846d}.lc-onboard-plan strong{display:block;font-size:10px}.lc-editorial .lc-onboard-plan p{font-family:var(--sans);font-size:8px;line-height:1.45;color:#8c9099;margin:3px 0 0}.lc-onboard-plan b{font-size:8px;color:#8e929e}.lc-assistant-card{background:#191f32;border-radius:12px;padding:17px;color:#fff}.lc-assistant-head{display:flex;align-items:center;gap:9px;margin-bottom:15px}.lc-assistant-head>span{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#342c64;color:#b6aaff}.lc-assistant-head strong{display:block;font-size:10px}.lc-assistant-head small{display:block;color:#868ea4;font-size:7px;margin-top:2px}.lc-bubble{max-width:90%;padding:10px 11px;border-radius:10px;font-size:9px;line-height:1.55;margin-top:8px}.lc-bubble.is-user{background:#2a3147;margin-left:auto;color:#e8eaf0}


.lc-bubble.is-ai strong{color:#493fa2}.lc-source-chip{display:flex;align-items:center;gap:6px;font-size:7px;color:#98a0b3;margin-top:9px}
.lc-review-head{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding-bottom:14px;border-bottom:1px solid #eeeef1}.lc-review-head small{display:block;font-size:7px;text-transform:uppercase;letter-spacing:.08em;color:#9da1aa}.lc-review-head strong{display:block;font-size:10px;margin-top:4px}.lc-evidence-list>div{display:flex;gap:10px;padding:13px 0;border-bottom:1px solid #eeeef1}.lc-evidence-mark{width:27px;height:27px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#e6f7ef;color:#42856f}.lc-evidence-mark.is-gap{background:#fff0e9;color:#b76547}.lc-evidence-list strong{display:block;font-size:10px}.lc-editorial .lc-evidence-list p{font-family:var(--sans);font-size:9px;line-height:1.5;color:#7e838e;margin:3px 0 0}.lc-ai-draft{margin-top:15px;border:1px solid #dfd9fb;background:#f6f4ff;border-radius:10px;padding:13px}



.lc-editorial .lc-ai-draft p{font-family:var(--sans);font-size:9px;line-height:1.6;color:#535663;margin:8px 0}.lc-ai-draft button{background:#fff;border:1px solid #d8d1fb;color:#5f50be;font-size:8px;font-weight:700;border-radius:20px;padding:6px 10px}
.lc-skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#ddd9d1;border:1px solid #ddd9d1;border-radius:12px;overflow:hidden}.lc-skill-panel,.lc-next-role{background:#fff;padding:20px}.lc-skill-title{display:flex;gap:9px;align-items:center;padding-bottom:16px;border-bottom:1px solid #eeeef1}.lc-skill-title small{display:block;font-size:7px;color:#999da8}.lc-skill-title strong{font-size:10px}.lc-skill{padding-top:14px}.lc-skill>div:first-child{display:flex;justify-content:space-between;font-size:9px;color:#555a66}.lc-skill>div strong{font-size:8px}.lc-skill-track{height:5px;background:#efeff2;border-radius:10px;overflow:hidden;margin-top:6px}.lc-skill-track i{display:block;height:100%;background:#7d6bea;border-radius:10px}.lc-skill-track i.is-build{background:#d5aa59}.lc-next-role>.lc-label{font-size:8px;color:#8e899f}.lc-role-match{display:flex;gap:12px;align-items:center;padding:15px 0;border-bottom:1px solid #eeeef1}.lc-role-match>span{width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#e6f1ea;color:#167273;font-family:var(--serif);font-size:17px}.lc-role-match strong{display:block;font-size:11px}.lc-role-match small{font-size:8px;color:#8d919c}.lc-gap{display:flex;gap:9px;padding:12px 0;border-bottom:1px solid #eeeef1}.lc-gap>span{font-size:8px;color:#9d99a8}.lc-gap strong{display:block;font-size:9px}.lc-gap small{font-size:8px;color:#92969f;line-height:1.4}.lc-next-role button{margin-top:14px;background:#201c3e;color:#fff;border:0;border-radius:20px;padding:8px 11px;font-size:8px;font-weight:700;display:flex;gap:6px;align-items:center}
.lc-retention-wrap{display:grid;grid-template-columns:.8fr 1.2fr;gap:14px}.lc-pulse{background:#201f37;color:#fff;border-radius:12px;padding:22px;grid-row:span 2}.lc-pulse small{font-size:8px;color:#9a98ad;text-transform:uppercase;letter-spacing:.1em}.lc-pulse strong{display:block;font-family:var(--serif);font-size:28px;font-weight:400;line-height:1.15;margin-top:9px;color:#ded8ff}.lc-editorial .lc-pulse p{font-family:var(--sans);font-size:10px;line-height:1.65;color:#aeb0c0;margin:13px 0 0}.lc-signal-list{background:#fff;border:1px solid #dfdfe3;border-radius:12px;padding:6px 15px}.lc-signal-list>div{display:grid;grid-template-columns:58px 1fr;gap:10px;align-items:center;padding:11px 0;border-bottom:1px solid #eeeef1}.lc-signal-list>div:last-child{border:0}.lc-status{font-size:7px;font-weight:750;border-radius:20px;text-align:center;padding:4px 6px;background:#efeff2;color:#777b86}.lc-status.is-down,.lc-status.is-watch{background:#fff0e9;color:#aa5d43}.lc-status.is-healthy{background:#e4f6ee;color:#43836e}.lc-status.is-open{background:#eeebff;color:#6152bd}.lc-signal-list strong{display:block;font-size:9px}.lc-signal-list small{display:block;font-size:8px;color:#8f939d;margin-top:2px}.lc-next-conversation{background:#e9e5ff;border:1px solid #dad3ff;border-radius:12px;padding:14px;display:flex;gap:10px;color:#5548ad}.lc-next-conversation small{display:block;font-size:7px;text-transform:uppercase;letter-spacing:.08em}.lc-next-conversation strong{display:block;font-size:10px;line-height:1.45;margin-top:3px;color:#3e3769}.lc-next-conversation span{display:block;font-size:8px;margin-top:5px;color:#766d98}
.lc-exit-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#ddd9d1;border:1px solid #ddd9d1;border-radius:12px;overflow:hidden}.lc-exit-grid>div{background:#fff;padding:17px}.lc-exit-grid>div>span:first-child{font-size:8px;color:#aaa59e}.lc-exit-icon{width:31px;height:31px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#efecff;color:#6152c2;margin:17px 0 12px}.lc-exit-grid strong{display:block;font-size:10px}.lc-editorial .lc-exit-grid p{font-family:var(--sans);font-size:8px;line-height:1.5;color:#858992;margin:6px 0 0}.lc-handover{display:grid;grid-template-columns:1fr auto auto auto auto;align-items:center;gap:12px;background:#20263a;color:#fff;padding:14px 16px;border-radius:10px;margin-top:13px}.lc-handover small{display:block;font-size:7px;color:#929aae;text-transform:uppercase;letter-spacing:.08em}.lc-handover strong{display:block;font-size:9px;margin-top:2px}.lc-handover>span{font-size:8px;color:#b8becd}.lc-handover button{background:#b7efdd;border:0;color:#18221f;border-radius:20px;font-size:8px;font-weight:750;padding:7px 10px}
.lc-rights-table{background:#fff;border:1px solid #dedee3;border-radius:12px;overflow:hidden}.lc-rights-head,.lc-rights-row{display:grid;grid-template-columns:1.05fr .55fr 1.2fr;gap:16px;padding:12px 15px}.lc-rights-head{background:#20263a;color:#9fa7b8;font-size:8px;text-transform:uppercase;letter-spacing:.08em}.lc-rights-row{border-bottom:1px solid #eeeef1;align-items:center}.lc-rights-row:last-child{border-bottom:0}.lc-rights-row strong{font-size:9px}.lc-rights-row>span{font-size:8px;color:#5e50bc;background:#f0edff;border-radius:20px;padding:5px 8px;width:fit-content}.lc-editorial .lc-rights-row p{font-family:var(--sans);font-size:8px;line-height:1.45;color:#757a86;margin:0}.lc-build-list{margin:8px 0 28px}.lc-build-list>div{display:flex;gap:19px;align-items:flex-start;padding:24px 0;border-bottom:1px solid var(--line)}.lc-build-list>div>span{font-size:11px;color:#99938a;padding-top:4px}.lc-build-list>div>svg{color:#8474dd;margin-left:auto;margin-top:5px}.lc-build-list>div>div{flex:1}.lc-section .lc-build-list h3{margin:0 0 8px;font-size:15px}.lc-editorial .lc-build-list p{font-family:var(--sans);font-size:13px;line-height:1.7;color:#5d6069;margin:0}
.lc-sources{margin-top:56px;padding-top:31px;border-top:1px solid var(--line)}.lc-sources>.lc-label{color:#827d75;font-size:11px}.lc-sources h2{font-family:var(--serif);font-size:34px;line-height:1.2;letter-spacing:-.03em;font-weight:400;color:#272b36;margin-top:13px}.lc-sources>p{font-size:12px;color:#676a72;line-height:1.75;margin-top:12px;max-width:760px}.lc-sources ol{list-style:none;padding:0;margin:22px 0 0}.lc-sources li{display:flex;gap:17px;align-items:center;border-bottom:1px solid var(--line);padding:19px 0;scroll-margin-top:40px}.lc-sources li>span{font-size:10px;color:#99938a}.lc-sources li>a{flex:1}.lc-sources small{font-size:10px;color:#8b867e;display:block;margin-bottom:4px}.lc-sources strong{font-size:13px;font-weight:650;color:#343844;line-height:1.4}.lc-sources li svg{color:#8272da}.lc-sources li:hover strong{color:#594bb8}.lc-cta{margin-top:50px;background:radial-gradient(circle at 90% 10%,rgba(123,104,238,.35),transparent 36%),var(--ink);padding:42px;border-radius:16px;color:#f4f3f9}.lc-cta .lc-label{color:#a99ef0;font-size:9px}.lc-cta h2{font-family:var(--serif);font-size:41px;font-weight:400;line-height:1.12;letter-spacing:-.037em;margin-top:19px;max-width:670px}.lc-cta h2 em{color:#b7efdd;font-style:italic}.lc-cta p{font-size:12px;line-height:1.8;color:#adb2c1;max-width:520px;margin-top:18px}.lc-cta .lc-button{margin-top:23px}.lc-article-end{display:flex;justify-content:space-between;gap:20px;padding-block:25px;font-size:10px;color:#8c877f}.lc-article-end>a:first-child{display:flex;gap:8px;align-items:center}
@media(min-width:1500px){.lc-hero-main{min-height:700px}.lc-hero h1{font-size:69px}}
@media(max-width:1100px){.lc-container{width:calc(100% - 64px)}.lc-nav-links{gap:20px;font-size:10px}.lc-hero-main{gap:24px}.lc-hero h1{font-size:50px}.lc-reading-layout{gap:44px;grid-template-columns:185px minmax(0,1fr)}.lc-overview dl{gap:18px}.lc-overview dl>div+div{padding-left:18px}.lc-map-grid{grid-template-columns:repeat(2,1fr)}.lc-handover{grid-template-columns:1fr auto auto}.lc-handover button{grid-column:3}.lc-handover>span:nth-of-type(3){display:none}}
@media(max-width:820px){.lc-container{width:calc(100% - 44px)}.lc-nav{min-height:78px}.lc-nav-links{display:none}.lc-nav>.lc-button{margin-left:auto;padding:10px 17px;min-height:39px;font-size:10px}.lc-hero-main{grid-template-columns:1fr;padding-top:38px;padding-bottom:42px}.lc-hero-copy{max-width:680px}.lc-hero h1{font-size:clamp(42px,8vw,62px);max-width:700px}.lc-deck{max-width:600px}.lc-hero-art{max-width:680px;width:100%;margin-inline:auto;padding:20px 0}.lc-overview dl{grid-template-columns:1fr 1fr;gap:25px}.lc-overview dl>div+div{border:0;padding-left:0}.lc-reading-layout{display:block;padding-top:28px}.lc-toc{display:none}.lc-mobile-toc{display:block;border-block:1px solid var(--line);margin-bottom:30px;padding:14px 0}.lc-mobile-toc summary{list-style:none;display:flex;justify-content:space-between;align-items:center;font-size:13px;color:#5c50af;font-weight:650;cursor:pointer}.lc-mobile-toc summary::-webkit-details-marker{display:none}.lc-mobile-toc nav{padding-top:10px}.lc-editorial p{font-size:17px}.lc-editorial p.lc-lead{font-size:21px}.lc-section h2{font-size:33px}.lc-section{padding-top:43px}.lc-map-grid{grid-template-columns:repeat(2,1fr)}.lc-glance{grid-template-columns:repeat(2,1fr)}.lc-interview-grid,.lc-onboard-grid,.lc-skills-grid,.lc-retention-wrap{grid-template-columns:1fr}.lc-pulse{grid-row:auto}.lc-exit-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.lc-container{width:calc(100% - 34px)}.lc-hero{padding-top:68px}.lc-logo{font-size:21px}.lc-category{font-size:9px}.lc-hero h1{font-size:40px;line-height:1.08}.lc-deck{font-size:13px;line-height:1.8}.lc-hero-meta{font-size:9px}.lc-hero-meta>*+*::before{padding-inline:8px}.lc-hero-ui{padding:24px 0 28px}.lc-float-card{display:none}.lc-journey-line{grid-template-columns:repeat(3,1fr);row-gap:17px}.lc-journey-step em{display:none}.lc-hero-insight{grid-template-columns:1fr;gap:8px}.lc-hero-insight button{width:fit-content}.lc-overview{padding:28px 0}.lc-overview dl{gap:22px 12px}.lc-overview dd{font-size:11px}.lc-overview dl>div{gap:11px}.lc-icon-tile{width:36px;height:36px}.lc-editorial p.lc-lead{font-size:20px}.lc-section h2{font-size:29px}.lc-editorial .lc-quote p{font-size:24px}.lc-figure{padding:17px}.lc-figure-head{align-items:flex-start;flex-wrap:wrap;margin-bottom:19px}.lc-map-grid{grid-template-columns:1fr}.lc-glance{grid-template-columns:1fr 1fr}.lc-glance>div{padding:17px 14px}.lc-glance strong{font-size:27px}.lc-glance span{font-size:9px}.lc-candidate-head,.lc-candidate-row{grid-template-columns:1fr 55px}.lc-candidate-head span:last-child,.lc-candidate-row>.lc-evidence{display:none}.lc-review-head{grid-template-columns:1fr}.lc-exit-grid{grid-template-columns:1fr 1fr}.lc-handover{grid-template-columns:1fr 1fr}.lc-handover>div{grid-column:1/-1}.lc-handover button{grid-column:2}.lc-rights-head{display:none}.lc-rights-row{grid-template-columns:1fr auto;padding:14px}.lc-rights-row>p{grid-column:1/-1}.lc-cta{padding:31px 24px}.lc-cta h2{font-size:35px}.lc-article-end{flex-direction:column;gap:15px}.lc-build-list>div{gap:13px}}
@media(prefers-reduced-motion:no-preference){.lc-page{scroll-behavior:smooth}.lc-page a,.lc-page button{transition:color .18s,background .18s,transform .18s}}
@media print{.lc-page{background:#fff;color:#000}.lc-progress,.lc-nav,.lc-toc,.lc-mobile-toc,.lc-cta,.lc-article-end,.lc-read-link{display:none!important}.lc-hero{background:#fff;color:#000;padding-top:0}.lc-hero-main{min-height:0;padding-block:20px;grid-template-columns:1fr}.lc-hero-art{display:none}.lc-deck,.lc-hero-meta{color:#333}.lc-container{width:100%}.lc-reading-layout{display:block;padding-top:20px}.lc-section{break-inside:auto}.lc-figure,.lc-quote,.lc-note{break-inside:avoid}.lc-hero h1{font-size:36px}.lc-section h2{font-size:26px}.lc-editorial p{font-size:12px;line-height:1.6}.lc-sources a::after{content:' (' attr(href) ')';font-size:8px;overflow-wrap:anywhere}}
`;
