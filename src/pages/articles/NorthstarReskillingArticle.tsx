"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Northstar Learning — fictional enterprise learning platform, editorial portfolio sample.
 * Drop this file into a React / Next.js project. No external UI/chart/icon dependencies.
 * All people, organisation names, analytics and financial figures are illustrative.
 */
type Props = { portfolioHref?: string; contactHref?: string; showNavigation?: boolean };
type View = "overview" | "skills" | "paths" | "progress" | "impact";
const toc = [
  ["baseline", "Assess Workforce Skills and Establish a Baseline"],
  ["gaps", "Identify Skills Gaps Across Roles and Teams"],
  ["paths", "Build Personalised Learning Paths in Northstar"],
  ["launch", "Launch the Programme Across 5,000 Employees"],
  ["progress", "Track Learning Progress and Address Bottlenecks"],
  ["measure", "Measure Skills Improvement Beyond Course Completion"],
  ["impact", "Report Programme Impact and ROI to Leadership"],
  ["playbook", "A Better Way to Manage Enterprise Reskilling"],
] as const;
const departments = [
  { name: "Customer operations", staff: 1800, ready: 32, target: 75, completion: 71, color: "#328a79" },
  { name: "Sales & account teams", staff: 1200, ready: 44, target: 80, completion: 82, color: "#6b72bc" },
  { name: "Finance & risk", staff: 850, ready: 28, target: 70, completion: 65, color: "#bc8653" },
  { name: "Technology & product", staff: 1150, ready: 56, target: 85, completion: 88, color: "#5288b4" },
] as const;
const paths = [
  { id: "support", title: "AI-assisted customer operations", team: "Customer operations", enrolled: 1800, duration: "6 weeks", lessons: ["AI workflow fundamentals", "Customer-data handling", "Human escalation decisions", "Live case simulation"], icon: "01" },
  { id: "commercial", title: "AI for revenue teams", team: "Sales & account teams", enrolled: 1200, duration: "4 weeks", lessons: ["Research with AI", "CRM data quality", "Proposal assistance", "Account scenario assessment"], icon: "02" },
  { id: "risk", title: "Responsible AI in finance", team: "Finance & risk", enrolled: 850, duration: "5 weeks", lessons: ["AI-assisted analysis", "Sensitive data controls", "Approval & review", "Audit-ready scenario"], icon: "03" },
  { id: "builder", title: "Building AI-enabled workflows", team: "Technology & product", enrolled: 1150, duration: "8 weeks", lessons: ["Workflow mapping", "Model evaluation", "Security & governance", "Production-readiness project"], icon: "04" },
] as const;
const periods = [
  { label: "Day 30", active: 4800, complete: 9, verified: 34, spend: 82 },
  { label: "Day 60", active: 4870, complete: 31, verified: 42, spend: 164 },
  { label: "Day 90", active: 4920, complete: 57, verified: 53, spend: 246 },
  { label: "Day 120", active: 4950, complete: 72, verified: 64, spend: 328 },
  { label: "Day 180", active: 5000, complete: 86, verified: 76, spend: 492 },
] as const;
const currency = (n: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);
const compact = (n: number) => new Intl.NumberFormat("en-GB").format(n);
function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const p: Record<string, ReactNode> = {
    arrow: <><path d="M4 12h16m-6-6 6 6-6 6" /></>, back: <><path d="M20 12H4m6-6-6 6 6 6" /></>, check: <path d="m4 12 5 5L20 6" />,
    link: <><path d="m10 14 4-4"/><path d="M8 16H6a4 4 0 0 1 0-8h3m7 0h2a4 4 0 0 1 0 8h-3"/></>,
    chart: <><path d="M4 20V9m6 11V5m6 15v-9m4 9H2" /></>, users: <><circle cx="9" cy="7" r="3"/><path d="M2 21v-2a7 7 0 0 1 14 0v2m2-14a3 3 0 0 1 0 6m1 2a6 6 0 0 1 3 6"/></>,
    book: <><path d="M3 4h7a3 3 0 0 1 3 3v14a3 3 0 0 0-3-3H3V4Zm18 0h-5a3 3 0 0 0-3 3v14a3 3 0 0 1 3-3h5V4Z"/></>,
    shield: <><path d="M12 2 21 6v6c0 5-3 8-9 10-6-2-9-5-9-10V6l9-4Z"/><path d="m8 12 3 3 5-6"/></>,
    layers: <><path d="m12 3 10 5-10 5L2 8l10-5Zm-10 10 10 5 10-5M2 18l10 5 10-5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
    filter: <path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    spark: <><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p[name] || p.chart}</svg>;
}
function Section({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  return <section className="ns-section" id={id}><div className="ns-section-index"><span>{number}</span><i /></div><h2>{title}</h2>{children}</section>;
}
function Figure({
  caption,
  children,
  dark = false,
}: {
  caption: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <figure className="ns-figure">
      <div className={`ns-demo ${dark ? "is-dark" : ""}`}>
        {children}
      </div>
      <figcaption>
        {caption}
      </figcaption>
    </figure>
  );
}
function Bar({ value, color }: { value: number; color?: string }) { return <span className="ns-track"><i style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color || "#2e8f83" }} /></span>; }
function Metric({ label, value, detail }: { label: string; value: string; detail: string }) { return <div className="ns-metric"><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>; }
function ProductNav({ active }: { active: View }) { const labels: { id: View; label: string }[] = [{id:"overview",label:"Overview"},{id:"skills",label:"Skills intelligence"},{id:"paths",label:"Learning paths"},{id:"progress",label:"Programme analytics"},{id:"impact",label:"Business impact"}]; return <div className="ns-productnav">{labels.map(item=><span className={active === item.id ? "selected" : ""} key={item.id}>{item.label}</span>)}</div>; }



 
export default function NorthstarReskillingArticle({portfolioHref="/#work",contactHref="https://www.seo-growup.com/get-in-touch",showNavigation=false}:Props={}){
  const articleRef=useRef<HTMLElement>(null);const [active,setActive]=useState("");const [progress,setProgress]=useState(0);const [minutes,setMinutes]=useState(12);const [copied,setCopied]=useState(false);
  useEffect(()=>{const el=articleRef.current;if(!el)return;setMinutes(Math.max(1,Math.ceil((el.textContent||"").trim().split(/\s+/).length/230)));let frame=0;const update=()=>{const r=el.getBoundingClientRect();setProgress(Math.min(100,Math.max(0,-r.top/Math.max(1,r.height-window.innerHeight)*100)));let current="";for(const [id] of toc){if(el.querySelector(`#${id}`)?.getBoundingClientRect().top! <=170)current=id;}setActive(current)};const queue=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update)};update();window.addEventListener("scroll",queue,{passive:true});window.addEventListener("resize",queue);return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",queue);window.removeEventListener("resize",queue)}},[]);
  async function copyLink(){try{await navigator.clipboard.writeText(window.location.href);setCopied(true);setTimeout(()=>setCopied(false),2500)}catch{setCopied(false)}}
  const links=toc.map(([id,label],i)=><a href={`#${id}`} key={id} className={active===id?"active":""}><span>{String(i+1).padStart(2,"0")}</span>{label}</a>);
  return <div className="ns-page"><style>{styles}</style><div className="ns-readprogress"><i style={{width:`${progress}%`}}/></div><header className="ns-hero">{showNavigation&&<nav className="ns-nav ns-container"><a href="https://www.seo-growup.com/" className="ns-growup">GrowUp<span>®</span></a><div><a href={portfolioHref}>Writing portfolio</a><a href="https://www.seo-growup.com/b2b-saas-copywriting-agency">Services</a></div><a className="ns-contact" href={contactHref}>Let's talk <Icon name="arrow" size={16}/></a></nav>}<div className="ns-container ns-hero-main"><div><div className="ns-kicker">EDTECH WRITING SAMPLE  </div><h1>How to Build a Skills-Based Learning Programme for 5,000 Employees</h1><p>Learn how to build and manage a skills-based learning programme for 5,000 employees using Northstar, from identifying skills gaps to tracking progress and reporting business impact.</p><div className="ns-hero-meta"><span>GrowUp Editorial</span><span>{minutes} min read</span><time dateTime="2026-10-08">October 2026</time></div><a className="ns-read-cta" href="#ns-start">Read the guide <Icon name="arrow" size={17}/></a></div>
  
  
<div className="ns-hero-visual">
  <img
    src="/images/northstar-hero.png"
    alt="Northstar programme overview showing 5,000 employees in the AI transformation programme, 53% ready to apply at day 90, and four role-based learning paths, with capability validated across customer operations, sales and account teams, finance and risk, and technology and product."
  />
</div>
  
  </div></header>
  <main className="ns-container"><div className="ns-overview"><div><Icon name="book"/><span><small>GUIDE TYPE</small>Step-by-step walkthrough</span></div><div><Icon name="users"/><span><small>BUILT FOR</small>Enterprise L&D teams</span></div><div><Icon name="target"/><span><small>WORKFORCE</small>5,000 employees</span></div><div><Icon name="layers"/><span><small>PLATFORM</small>Northstar Learning</span></div></div><div className="ns-layout"><aside className="ns-toc"><div className="ns-label">IN THIS ARTICLE <span className="ns-label-steps">8 steps</span></div><nav>{links}</nav><div className="ns-toc-footer"><span>{Math.round(progress)}% read</span><button type="button" onClick={copyLink}><Icon name="link" size={14}/>{copied?"Copied":"Copy link"}</button></div></aside><article ref={articleRef} className="ns-article" id="ns-start"><details className="ns-mobile-toc"><summary>In this article <Icon name="chevron" size={16}/></summary><nav>{links}</nav></details><div className="ns-editorial">
  <div className="ns-intro">
<p>
  I’ve seen how quickly a company-wide training programme can turn into an exercise in chasing course completions.
</p>
<p>
  You start with a sensible goal. Maybe the company wants everyone to get better at using AI. Leadership approves the budget, L&amp;D puts together a course catalogue, managers nominate their teams and thousands of employees start receiving invitations to training they may or may not need. Three months later, the dashboard looks encouraging. Most people have started their courses, plenty have finished, and the completion rate is climbing. But ask how many employees can now use AI to do their jobs better, and the numbers become much harder to explain.
</p>
<p>
  That’s the problem Northstar was designed to solve.
</p>
<p>
In this walkthrough, I’ll show how I’d use Northstar to assess the skills of 5,000 employees, identify the gaps that matter, build role-specific learning paths, track progress and show leadership what the investment has actually achieved.
</p>
</div>
    

<Section
  id="baseline"
  number="01"
  title="Assess Workforce Skills and Establish a Baseline"
>
  <p>
I’ve seen training programmes get surprisingly far before anyone establishes what employees know.
  </p>

  <p>
    There’s usually a list of courses ready to go, a budget to spend and a deadline
    everyone is working towards. But when you ask how many people already have the
    skills being taught, or which teams need the most support, the answers tend to
    be less convincing.
  </p>

  <p>
    <strong>So the first thing I’d do in Northstar is build a workforce baseline.</strong>
  </p>

  <p>
    I’d start by bringing the 5,000 employees into one workforce view, organised by
    department, role and market. From there, I’d assign an initial skills assessment
    based on what each group actually needs to do with AI. Customer support might
    be assessed on reviewing AI-generated responses, while finance employees might
    be tested on analysing outputs and checking their accuracy. 
  </p>

    <p>
As assessments come in, Northstar would show who’s been assessed, where proficiency currently sits
    and which parts of the business still have missing data.
  </p>
<Figure
  title="Programme overview"
  caption="The programme dashboard gives me one operating view across functions, markets and delivery risks."
>
  <img
    src="/images/northstar-workforce-baseline.png"
    alt="Northstar workforce baseline dashboard showing 5,000 employees organised by department, role and market, with assessment completion and current proficiency levels."
  />
</Figure>

  <p>
    That gives me something much more useful than a list of people waiting to be
    enrolled. I can see the workforce I’m working with, how much I know about their
    existing capabilities and where I need to investigate further before assigning
    a single course.
  </p>
</Section>
 <Section
  id="gaps"
  number="02"
  title="Identify Skills Gaps Across Roles and Teams"
>
  <p>
    With the baseline established, the next thing I’d want to know is where the
    biggest skills gaps are, and whether they’re affecting the people who actually
    need those capabilities in their jobs.
  </p>

  <p>
    I’d move into Northstar’s Skills Intelligence dashboard, where I can compare
    current proficiency against what each role requires. The results might show that
    customer support employees are comfortable generating AI-assisted responses but
    struggle to check them for accuracy. Finance analysts might be more proficient
    overall, but still fall short when it comes to validating AI-generated financial
    analysis.
  </p>

  <p>
    Northstar would let me break those gaps down by department, role and market,
    showing how far employees are from the required proficiency level and how many
    people are affected.
  </p>

 <Figure
  caption="Comparing current proficiency against the requirements for each role."
>
  <img
    src="/images/northstar-skills-gap.png"
    alt="Northstar Skills Intelligence dashboard showing customer support skills versus role requirements. Five competencies are compared: generating AI-assisted responses (82% against 80% required), checking accuracy of AI responses (54% against 85%), applying brand guidelines (68% against 80%), handling complex queries (46% against 75%) and escalating to human support (72% against 80%). The largest gap is checking AI responses for accuracy, affecting 780 employees."
  />
</Figure>


  <p>
    I’d use those results to decide which capabilities need the most attention before
    building any learning paths. That way, the programme starts with the skills the
    business actually needs, rather than whatever courses happen to be available.
  </p>
</Section>
   

<Section
  id="paths"
  number="03"
  title="Build Personalised Learning Paths in Northstar"
>
  <p>
    Now comes the part where I have to decide what these 5,000 employees should
    actually be learning.
  </p>

  <p>
   Northstar has shown me that checking AI-generated responses for accuracy is the biggest skills gap in customer support, followed by handling complex queries and applying brand guidelines. My first instinct might be to build courses around those three areas and start assigning them. But that would ignore the differences we just spent two weeks assessing.
      </p>
    
  
  <p>
   <strong> So I’d open Northstar’s Learning Path Builder and tackle the biggest gap first.</strong>
   </p>
   
     <p>
    I’d start with customer support, giving them a short module on checking AI-generated responses against source information, followed by exercises where they have to find and correct mistakes in realistic customer conversations.
  </p>



 <Figure caption="A role-specific path with modules, practice and assessment.">
  <img
    src="/images/learning-path-northstar.png"
    alt="Northstar Learning Path Builder showing the AI response checking path for Customer Support. Four steps are listed: checking AI-generated responses, finding and correcting mistakes, using trusted source information, and applying skills in real scenarios. A learner table below shows 420 employees enrolled, 70 in progress and 290 completed, with individual progress and last activity dates."
  />
</Figure>

  <p>
I’d do something similar for finance, but the exercises would look quite different. Employees might get an AI-generated financial report with three incorrect figures and an unsupported conclusion, then have to work out what's wrong using the original data.
  </p>

  <p>
I’d also want managers involved before publishing anything. The last thing I need is 500 employees spending an afternoon on exercises that look nothing like their actual work. Northstar would let me organise the lessons, assessments and milestones into separate paths, ready for each department to review before the programme goes live.
  </p>


<Figure caption="Northstar learning path builder showing the Customer Support path in review.">
  <img
    src="/images/customer-support-northstar.png"
    alt="Northstar learning path builder showing the Customer Support path in review. The manager review panel lists Alex Chen, Marcus Brown and Elena Garcia, with approval statuses and feedback from each reviewer. The path contains four steps: checking AI-generated responses, finding and correcting mistakes, using trusted source information, and applying skills in real scenarios."
  />
</Figure>

</Section>


   
 <Section
  id="launch"
  number="04"
  title="Launch the Programme Across 5,000 Employees"
>
  <p>
    With the learning paths reviewed, I’d be ready to start assigning them. Although
    I wouldn’t send 5,000 employees a training invitation on the same Monday morning
    and hope everything works.
  </p>

  <p>
    I’d start with a smaller group across customer support, finance and operations.
    In Northstar’s Programme Deployment dashboard, I’d select the relevant
    departments, assign their approved learning paths and set the start dates. I’d
    also check that employees are being assigned the right material, particularly
    where people have similar job titles but very different responsibilities.
  </p>


<Figure caption="Northstar programme deployment dashboard showing a phased rollout setup.">
  <img
    src="/images/launch-northstar.png"
    alt="Northstar programme deployment dashboard showing a phased rollout setup. 1,450 employees are selected across customer support, finance and operations, with approved learning paths assigned to each department and a start date of 9 June 2026."
  />
</Figure>


  <p>
    Once that first group is running smoothly, I’d expand the rollout across the 18
    markets. Northstar would let me see how many employees have received their
    assignments, which departments are live and where invitations or access issues
    are holding things up.
    </p>
    

<Figure caption="Northstar showing rollout by market, with access issues flagged.">
  <img
    src="/images/market-rollout-northstar.png"
    alt="Northstar rollout dashboard showing 5,000 total employees across 18 markets, 4,320 assigned to programmes, 3,780 invitations accepted and 200 access issues flagged. A rollout by market table shows assignment and acceptance rates for the UK, US, Germany, France, Singapore, Australia, Canada and Netherlands, with 85% of markets over 80% assigned."
  />
</Figure>



     <p>
    I’d give managers access to their teams’ progress too, so
    I’m not personally chasing thousands of employees when somebody falls behind.
  </p>




</Section>


<Section
  id="progress"
  number="05"
  title="Track Learning Progress and Address Bottlenecks"
>
  <p>
    Once the programme is live, I’d want to know whether employees are actually
    getting through the training, and where things are starting to go wrong.
  </p>

  <p>
    I'’ open Northstar’s Programme Analytics dashboard and look beyond the overall
    completion rate. A department might have 80% of employees actively learning,
    which sounds encouraging until you notice that half of them haven’t passed their
    first assessment. Or one market might be three weeks behind schedule because
    employees keep getting stuck on the same module.
  </p>

  <p>
    That’s the sort of thing I’d want Northstar to flag before it becomes a bigger
    problem.
  </p>


<Figure caption="Northstar showing programme health by market, department and module.">
  <img
    src="/images/programmeanalyticsnorthstar.png"
    alt="Northstar Programme Analytics dashboard showing 4,320 active learners, 78% module completion, a 42% assessment pass rate and 71% of cohorts on track. Key insights flag a low assessment pass rate in Customer Support, France running three weeks behind schedule, and a common module issue across departments."
  />
</Figure>


  <p>
I’d dig into the affected groups to see what’s happening. Are employees repeatedly failing the same assessment? Have they stopped opening their lessons? Or are they simply not getting enough time away from their usual work to complete them? Those are three different problems, and I’d want to know which one I’m dealing with before doing anything.
  </p>

  <p>
If it’s the material, I’d fix the module. If employees understand the lessons but struggle to apply them, I’d arrange additional practice with their managers. And if they’re short on time, I’d look at adjusting the schedule. Northstar would help me identify who needs attention and track whether those changes are getting people moving again.
  </p>

  <p>
I’d much rather give 200 employees the support they need than report another 200 course completions from people who still can’t apply what they’ve learned.
  </p>

</Section>
    
<Section
  id="measure"
  number="06"
  title="Measure Skills Improvement Beyond Course Completion"
>
  <p>
    By this point, I’d have a fairly good idea of who’s completed their training,
    who’s needed extra support and which parts of the programme have caused problems.
    But I’m still missing the answer to the question that started all this: can these
    employees actually do things they couldn’t do before?
  </p>

  <p>
    That’s where I’d go back to the skills assessments we ran at the beginning.
  </p>

  <p>
    In Northstar, I’d open the Skills Progress dashboard and compare each group’s
    original proficiency scores with their results from the practical assessments
    they’ve completed since. For customer support, I’d want to see whether employees
    who struggled to check AI-generated responses can now spot incorrect information,
    correct it and explain why the original answer was wrong.
  </p>

<Figure caption="Northstar showing before and after proficiency across five skills.">
  <img
    src="/images/skillsprogressnorthstar.png"
    alt="Northstar Skills Progress dashboard for Customer Support showing 650 employees assessed, average proficiency rising from 54% to 82%, and 578 employees improved. A bar chart compares before and after scores across five skills: generating AI-assisted responses, checking responses for accuracy, using trusted source information, identifying hallucinations, and explaining and correcting mistakes."
  />
</Figure>

  <p>
    I’d also get managers to review a sample of work from employees who’ve completed
    their paths. If someone passes Northstar’s verification assessment but still
    needs a colleague to catch mistakes in their day-to-day work, I’m not going to
    count that as the job done.
  </p>
</Section>
  
 <Section
  id="impact"
  number="07"
  title="Report Programme Impact and ROI to Leadership"
>
  <p>
    By the end of the 180 days, I’d have plenty to show for the programme. Thousands
    of employees trained, stronger assessment results and a much clearer picture of
    where the workforce stands. But I can already imagine the question I’d get from
    the CFO: what has all of this done for the business?
  </p>

    <p>
Fair question.
  </p>

  <p>
    So I’d open Northstar’s Business Impact dashboard and start pulling the evidence
    together. I’d show how many employees have reached the required proficiency
    levels, which departments have improved and how much we’ve spent delivering the
    programme. 

  </p>

<Figure caption="Northstar showing capability gains, programme cost and estimated business impact.">
  <img
    src="/images/northstar-reports.png"
    alt="Northstar Business Impact dashboard showing 4,320 employees trained, 78% now meeting role requirements, improvement across 3 departments and a total programme cost of £280,000. Skill improvement by department shows customer support rising from 42% to 81%, finance from 56% to 84% and operations from 49% to 76%. An estimated business impact panel puts annual value between £1.2M and £1.8M, alongside operational metrics such as a 32% drop in incorrect AI responses reaching customers and 28% less time spent correcting reports."
  />
</Figure>

  <p>
Then I’d bring in the operational numbers from the business. Are
    support teams catching more incorrect AI responses before they reach customers?
    Are finance analysts spending less time correcting reports? Have managers seen
    any improvement in the quality of AI-assisted work?
  </p>


  <p>
    I’d be careful about how I present those results. If customer support is resolving
    cases faster, I wouldn’t automatically credit the training. Other things might
    have changed during those six months. I’d want managers to validate the findings
    and, where possible, compare results against the period before training.
  </p>

</Section>


<Section
  id="playbook"
  number="08"
  title="A Better Way to Manage Enterprise Reskilling"
>
  <p>
    At the end of the 180 days, I wouldn’t be rushing to launch another round of
    training. I’d want to sit down with department managers, look at where employees
    are still struggling and decide which gaps are worth addressing next.
  </p>

  <p>
    Some teams might need more practice. Others might have reached the required
    standard and need nothing further for now. And if we’ve spent six months training
    people without seeing much improvement in their actual work, I’d want to
    understand why before approving another budget.
  </p>

  <p>
    That’s where I’d leave the programme in Northstar: with a clear view of what still
    needs attention, who’s responsible for it and what we’re going to measure next.
  </p>


</Section>

  
  </div><div className="ns-bottom"><a href={portfolioHref}><Icon name="back" size={16}/>Back to writing portfolio</a><a href="#ns-start">Back to top ↑</a></div></article></div></main> </div>;
}

const styles = String.raw`
.ns-page{--forest:#041b1c;--ink:#192927;--body:#34413f;--muted:#77827e;--line:#dce2dd;--paper:#fafaf7;--green:#237f73;--font:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--serif:Georgia,"Times New Roman",serif;background:var(--paper);font-family:var(--font);color:var(--ink);font-size:15px;line-height:1.6;isolation:isolate}.ns-page *{box-sizing:border-box}.ns-page h1,.ns-page h2,.ns-page h3,.ns-page h4,.ns-page p,.ns-page figure{margin:0}.ns-page a{text-decoration:none;color:inherit}.ns-page button,.ns-page select{font:inherit;cursor:pointer}.ns-page button:focus-visible,.ns-page a:focus-visible,.ns-page select:focus-visible,.ns-page input:focus-visible{outline:2px solid #45a99b;outline-offset:3px}.ns-container{width:min(1220px,calc(100% - 88px));margin-inline:auto}.ns-readprogress{position:fixed;inset:0 0 auto;height:3px;z-index:20;pointer-events:none}.ns-readprogress i{display:block;background:#46baa4;height:100%}.ns-hero{background:var(--forest);color:#fff;padding:92px 0 77px;overflow:hidden}.ns-nav{display:flex;align-items:center;gap:36px;margin-top:-69px;margin-bottom:60px;height:65px;border-bottom:1px solid #ffffff1b}.ns-growup{font-size:23px;font-weight:700;letter-spacing:-.065em}.ns-growup span{font-size:9px;vertical-align:top;margin-left:3px}.ns-nav>div{margin-left:auto;display:flex;gap:28px;font-size:12px;color:#d0dcda}.ns-contact{background:#4fc0aa;color:#08211c!important;display:flex;align-items:center;gap:12px;padding:11px 18px;border-radius:50px;font-size:12px;font-weight:700} .ns-hero-main{display:grid;grid-template-columns:1fr 1.15fr;align-items:center;gap:52px;min-height:535px}
.ns-hero-main>div:first-child{padding-top:40px}.ns-kicker{font-size:10px;letter-spacing:.15em;color:#77cfba;font-weight:750}.ns-kicker span{padding:0 10px;color:#5f8f83}.ns-hero h1{font-family:var(--serif);font-size:clamp(38px,4.1vw,60px);font-weight:400;line-height:1.07;letter-spacing:-.047em;max-width:660px;margin-top:21px}.ns-hero-main>div:first-child>p{color:#c7d4d0;line-height:1.78;font-size:15px;margin-top:25px;max-width:520px}.ns-hero-meta{display:flex;gap:13px;flex-wrap:wrap;color:#91aaa3;font-size:11px;margin-top:24px}.ns-hero-meta>*+*::before{content:'·';padding-right:13px}.ns-read-cta{display:flex;align-items:center;gap:15px;width:fit-content;margin-top:29px;color:#7bd5c0!important;font-size:13px;font-weight:650} .ns-hero-visual{min-width:0;background:none;padding:0;border:0}
 .ns-hero-visual img{display:block;width:100%;height:auto}.ns-hero-window{background:#f9fbf9;border:1px solid #d7e4dd;border-radius:14px;overflow:hidden;color:#17302a;box-shadow:0 28px 80px #0006;transform:rotate(.8deg)}.ns-hero-window-head{display:flex;align-items:center;gap:7px;border-bottom:1px solid #e4e9e5;padding:13px 16px;font-size:10px}.ns-hero-window-head>span:nth-of-type(2){margin-left:14px;color:#87968f}.ns-hero-window-head i{margin-left:auto;font-style:normal;color:#508c7d;font-size:9px}.ns-brandmark{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px;background:#0c3b33;color:#e6fff5;font-size:12px;font-weight:850}.ns-hero-window-body{padding:22px}.ns-hero-intro small,.ns-hero-stats small{font-size:8px;letter-spacing:.1em;color:#89968e;font-weight:700}.ns-hero-intro h3{font-size:21px;letter-spacing:-.04em;font-weight:650;margin-top:3px}.ns-hero-intro>span{font-size:10px;color:#8b958e}.ns-hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin:20px 0}.ns-hero-stats>div{border:1px solid #e3e8e2;border-radius:8px;background:#fff;padding:13px}.ns-hero-stats b{display:block;font-size:25px;letter-spacing:-.05em;margin:3px 0}.ns-hero-stats span{display:block;font-size:9px;color:#8b968e}.ns-hero-panel{background:#fff;border:1px solid #e3e8e2;border-radius:10px;padding:16px}.ns-hero-panel>div:first-child{display:flex;justify-content:space-between;gap:8px;font-size:11px;margin-bottom:15px}.ns-hero-panel>div:first-child small{color:#8c9a92}.ns-hero-bar{display:grid;grid-template-columns:145px 1fr;gap:10px;align-items:center;margin-top:12px;font-size:9px;color:#64766d}.ns-hero-foot{display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:9px;color:#87948d;margin-top:15px}.ns-overview{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--line);padding:35px 0}.ns-overview>div{display:flex;align-items:center;gap:15px;padding-inline:24px;border-right:1px solid var(--line);font-size:12px;font-weight:650}.ns-overview>div:first-child{padding-left:0}.ns-overview>div:last-child{border:0}.ns-overview svg{color:#2d9481}.ns-overview small{display:block;letter-spacing:.12em;font-size:9px;color:#909b93;font-weight:700;margin-bottom:4px}.ns-layout{display:grid;grid-template-columns:230px minmax(0,790px);justify-content:space-between;gap:62px;padding-top:61px}.ns-label{font-size:10px;letter-spacing:.15em;font-weight:800;color:#56877b}.ns-toc{position:sticky;top:35px;align-self:start}.ns-toc>nav{margin-top:16px;display:flex;flex-direction:column}.ns-toc nav a,.ns-mobile-toc nav a{display:flex;gap:13px;padding:12px 0;border-bottom:1px solid var(--line);font-size:12px;line-height:1.45;color:#53605b}.ns-toc nav a span,.ns-mobile-toc nav a span{font-size:9px;color:#96a29a;min-width:20px}.ns-toc nav a.active{color:#0a4d42;font-weight:700}.ns-toc-footer{display:flex;justify-content:space-between;gap:10px;margin-top:22px;color:#85928a;font-size:10px}.ns-toc-footer button{background:none;border:0;display:flex;align-items:center;gap:5px;color:#1a8372;padding:0}.ns-article{min-width:0}.ns-editorial>p,.ns-editorial .ns-section>p,.ns-intro p{font-family:var(--serif);font-size:17.5px;line-height:1.84;color:#303b39;margin:0 0 21px}.ns-intro p{font-size:21px;line-height:1.65;color:#26322f}.ns-editorial strong{color:#152924}.ns-disclosure{display:flex;gap:14px;padding:19px 21px;border:1px solid #cfded3;background:#edf3ec;margin-top:29px}.ns-disclosure svg{color:#2a8b75;flex-shrink:0}.ns-disclosure strong{display:block;font-size:12px}.ns-disclosure p{font-size:12px;line-height:1.65;color:#53645b;margin-top:5px}.ns-section{padding-top:68px;scroll-margin-top:40px}.ns-section-index{display:flex;gap:14px;align-items:center;color:#2a8d78;font-size:10px;letter-spacing:.12em;font-weight:800;margin-bottom:17px}.ns-section-index i{flex:1;height:1px;background:var(--line)}.ns-section h2{font:400 37px/1.2 var(--serif);letter-spacing:-.04em;color:#162824;margin-bottom:23px;text-wrap:balance}.ns-figure{margin:29px 0 30px!important}.ns-demo{background:#f6f8f5;border:1px solid #d6dfd8;border-radius:13px;overflow:hidden;color:#20322c;font-family:var(--font);font-size:11px;line-height:1.45}.ns-figure-top{min-height:49px;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 19px;background:#fff;border-bottom:1px solid #e2e7e0;font-size:10px}.ns-figure-top>span:first-child{display:flex;gap:7px;align-items:center}.ns-figure-divider{width:1px;height:17px;background:#dfe6dc;margin-inline:9px}.ns-live{color:#628c7a;font-size:8px;letter-spacing:.08em;font-weight:750;white-space:nowrap}.ns-live i{display:inline-block;width:5px;height:5px;border-radius:50%;background:#30a685;margin-right:5px}.ns-figure figcaption{padding-top:11px;text-align:center;color:#7f8b83;font-size:10px;line-height:1.65;max-width:680px;margin-inline:auto}.ns-figure figcaption strong{color:#647b6c}.ns-productnav{display:flex;gap:21px;padding:12px 21px 0;border-bottom:1px solid #e1e7e0;overflow:auto;white-space:nowrap;background:#fff;color:#9ba79c;font-size:9px}.ns-productnav span{padding:0 0 12px}.ns-productnav .selected{border-bottom:2px solid #257e70;color:#176455;font-weight:800}.ns-dashboard,.ns-demo>.ns-dash-head{min-width:0}.ns-dash-head{padding:20px 20px 17px;display:flex;align-items:center;justify-content:space-between;gap:15px}.ns-dash-head small,.ns-learner-head small{display:block;color:#8da096;letter-spacing:.1em;font-size:8px;font-weight:700}.ns-dash-head h3,.ns-learner-head h3{font-size:20px;line-height:1.2;letter-spacing:-.035em;margin-top:5px}.ns-dash-head p,.ns-learner-head p{font-size:9px;color:#8d9b92;margin-top:5px}.ns-pill{display:inline-flex;align-items:center;background:#e4f4ea;color:#287c5f;border:1px solid #d0e8d8;font-size:8px;font-weight:700;padding:6px 10px;border-radius:30px;white-space:nowrap}.ns-metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:0 20px 17px}.ns-metrics.three{grid-template-columns:repeat(3,minmax(0,1fr))}.ns-metric{padding:15px 12px;border:1px solid #e0e7df;background:#fff;border-radius:9px;min-width:0}.ns-metric span{font-size:8px;color:#829188;display:block}.ns-metric strong{display:block;font-size:25px;letter-spacing:-.05em;margin:5px 0 2px;font-weight:700;overflow-wrap:anywhere}.ns-metric small{font-size:8px;color:#829488}.ns-dash-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:10px;padding:0 20px 22px}.ns-panel{background:#fff;border:1px solid #e0e7df;border-radius:10px;padding:16px;min-width:0}.ns-panel-heading{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:13px}.ns-panel-heading strong{font-size:11px}.ns-panel-heading small,.ns-panel-heading>span{font-size:9px;color:#89988f}.ns-panel-tint{background:#eef4ed}.ns-panel-title{display:block;font-size:14px;margin-top:20px}.ns-panel p,.ns-path-detail p{font-family:var(--font);font-size:10px;line-height:1.65;color:#64756a;margin-top:8px}.ns-panel small{font-size:9px;color:#7d8f84}.ns-warn{background:#f7ead8;color:#a06830!important;border-radius:20px;padding:5px 8px}.ns-microdivider{height:1px;background:#d8e0d6;margin:18px 0 11px}.ns-dept{margin-top:14px}.ns-dept>div:first-child{display:flex;justify-content:space-between;gap:5px;margin-bottom:6px;color:#5b6b60;font-size:9px}.ns-dept strong{font-weight:500;color:#97a399}.ns-track{display:block;width:100%;height:7px;border-radius:30px;background:#e6ece6;overflow:hidden}.ns-track>i{display:block;height:100%;border-radius:30px;transition:width .25s}.ns-skillrow{display:grid;grid-template-columns:1.3fr 1.3fr 37px 60px;align-items:center;gap:11px;margin:17px 0;font-size:10px}.ns-skillrow strong{font-size:11px}.ns-skillrow small{font-size:9px;color:#8c998d}.ns-demo>.ns-panel{margin:0 20px 19px}.ns-insight{display:flex;gap:10px;align-items:flex-start;padding:14px 20px;background:#eaf3ed;border-top:1px solid #dbe8dd;font-size:10px;color:#617269;line-height:1.6}.ns-insight svg{color:#1f8b74;flex-shrink:0}.ns-path-layout{display:grid;grid-template-columns:.88fr 1.12fr;gap:10px;padding:0 20px 21px}.ns-path-list{display:flex;flex-direction:column;gap:8px}.ns-path-list button{text-align:left;background:#fff;border:1px solid #dce5dc;border-radius:8px;padding:11px 12px}.ns-path-list button.chosen{border-color:#338f77;background:#ecf5ed;box-shadow:inset 3px 0 #338f77}.ns-path-list small,.ns-path-list span{display:block;color:#8b998e;font-size:8px}.ns-path-list strong{display:block;font-size:11px;margin:4px 0}.ns-path-detail{background:#fff;border:1px solid #e0e7df;border-radius:9px;padding:19px}.ns-path-detail h4{font-size:17px;line-height:1.2;margin-top:9px}.ns-learning-steps{margin-top:17px}.ns-learning-steps>div{display:grid;grid-template-columns:25px 1fr;gap:4px 11px;border-top:1px solid #e8eee8;padding:11px 0}.ns-learning-steps b{grid-row:span 2;color:#36a28a}.ns-learning-steps span{font-weight:650}.ns-learning-steps small{grid-column:2;color:#90a096;font-size:8px}.ns-path-bottom{display:flex;gap:8px;color:#44826f;background:#eff8f1;padding:11px;font-size:9px;margin-top:13px}.ns-learner-head{display:flex;align-items:center;gap:13px;padding:22px}.ns-learner-head .ns-pill{margin-left:auto}.ns-avatar{height:45px;width:45px;border-radius:50%;display:grid;place-items:center;background:#c7e5d5;color:#276a57;font-weight:800}.ns-learner-grid{display:grid;grid-template-columns:1.12fr .88fr;gap:10px;padding:0 20px 21px}.ns-lessons{margin-top:12px}.ns-lessons label{display:flex;align-items:center;gap:10px;border-top:1px solid #e7ece6;padding:12px 0;cursor:pointer}.ns-lessons input{accent-color:#208774}.ns-lessons label>span{flex:1;min-width:0}.ns-lessons strong,.ns-lessons small{display:block}.ns-lessons strong{font-size:10px}.ns-lessons small{color:#93a096;font-size:8px}.ns-lessons em{font-style:normal;color:#749586;font-size:8px}.ns-learner-grid .ns-panel-tint h4{font-size:17px;line-height:1.25;margin-top:17px}.ns-dash-head select{background:white;border:1px solid #dce5dc;border-radius:7px;padding:9px;color:#42665a;font-size:10px;max-width:180px}.ns-table-panel{margin:0 20px 20px!important}.ns-table-scroll{overflow-x:auto}.ns-demo table{border-collapse:collapse;width:100%;min-width:490px}.ns-demo th{text-align:left;color:#84958a;font-size:8px;letter-spacing:.06em;text-transform:uppercase;padding:11px 10px;border-bottom:1px solid #e1e8df}.ns-demo td{font-size:10px;padding:14px 10px;border-bottom:1px solid #ecf0ea}.ns-demo tr:last-child td{border-bottom:0}.ns-cell-bar{display:flex;align-items:center;gap:8px;white-space:nowrap}.ns-cell-bar .ns-track{width:65px}.ns-status{display:inline-flex;border-radius:20px;padding:5px 8px;font-size:8px;font-weight:700;white-space:nowrap}.ns-status.amber{background:#f8eddb;color:#976c35}.ns-status.green{background:#e4f3e8;color:#377d5a}.ns-toggle,.ns-periods{display:flex;background:#e9efea;padding:3px;border-radius:8px;gap:3px}.ns-toggle button,.ns-periods button{background:transparent;border:0;padding:7px 10px;color:#698074;font-size:9px;border-radius:5px}.ns-toggle button.active,.ns-periods button.active{background:#fff;color:#245f52;box-shadow:0 1px 4px #0001;font-weight:750}.ns-evidence-line{display:grid;grid-template-columns:1.3fr 1fr 40px;gap:12px;align-items:center;margin-top:16px;font-size:9px}.ns-evidence-line strong{text-align:right}.ns-periods{margin:0 20px 18px;justify-content:space-between}.ns-periods button{flex:1}.ns-finance-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:10px;padding:0 20px 21px}.ns-finance-row,.ns-assumption{display:flex;justify-content:space-between;gap:10px;padding:11px 0;border-bottom:1px solid #e2e9e0;font-size:10px}.ns-finance-row.total{font-weight:800;border-top:1px solid #9fb8a9;font-size:11px}.ns-finance-caveat{color:#9b7255!important;font-size:9px!important}.ns-assumption b{font-size:9px;text-align:right}.ns-timeline{margin:27px 0;border-top:1px solid var(--line)}.ns-timeline>div{display:flex;gap:21px;border-bottom:1px solid var(--line);padding:22px 0}.ns-timeline>div>span{font-size:12px;color:#2c8c79}.ns-timeline small{display:block;color:#88948c;text-transform:uppercase;letter-spacing:.1em;font-size:10px}.ns-timeline strong{display:block;font-size:15px;margin:4px 0}.ns-editorial .ns-timeline p{font:13px/1.7 var(--font);margin:0;color:#64726b}.ns-takeaway{border-left:3px solid #318d7a;background:#ecf4ee;padding:24px 26px;margin:30px 0}.ns-editorial .ns-takeaway p{font:26px/1.45 var(--serif);letter-spacing:-.02em;color:#1b4438;margin-top:12px}.ns-bottom{display:flex;justify-content:space-between;gap:15px;font-size:11px;color:#6e8377;margin:55px 0 80px;border-top:1px solid var(--line);padding-top:20px}.ns-bottom a:first-child{display:flex;align-items:center;gap:8px}.ns-footer{background:var(--forest);color:#d5ebe2;padding:35px 0}.ns-footer .ns-container{display:flex;justify-content:space-between;align-items:center;font-size:12px}.ns-footer a{display:flex;align-items:center;gap:10px}.ns-mobile-toc{display:none}.ns-page a:hover{opacity:.82}

.ns-label-steps{display:block;margin-top:5px;color:#8b998e;font-weight:600;letter-spacing:.06em;text-transform:none;font-size:10px}
@media(max-width:1050px){.ns-container{width:calc(100% - 56px)}.ns-hero-main{gap:27px}.ns-hero h1{font-size:49px}.ns-layout{grid-template-columns:188px minmax(0,1fr);gap:32px}.ns-overview>div{padding-inline:14px}.ns-hero-bar{grid-template-columns:110px 1fr}}
@media(max-width:820px){.ns-container{width:calc(100% - 40px)}.ns-hero{padding-top:66px}.ns-hero-main{grid-template-columns:1fr;gap:34px}.ns-hero h1{font-size:clamp(39px,7vw,59px)}.ns-hero-visual{max-width:630px}.ns-overview{grid-template-columns:repeat(2,1fr);row-gap:18px}.ns-overview>div{border:0;padding-left:0}.ns-layout{display:block;padding-top:35px}.ns-toc{display:none}.ns-mobile-toc{display:block;border-block:1px solid var(--line);margin-bottom:32px;padding:12px 0}.ns-mobile-toc summary{display:flex;justify-content:space-between;align-items:center;cursor:pointer}.ns-mobile-toc nav{margin-top:8px}.ns-section h2{font-size:33px}.ns-nav{margin-bottom:30px}.ns-nav>div{display:none}}
@media(max-width:580px){.ns-container{width:calc(100% - 32px)}.ns-hero{padding-top:42px;padding-bottom:50px}.ns-hero h1{font-size:39px}.ns-hero-main>div:first-child>p{font-size:13px}.ns-hero-window-body{padding:12px}.ns-hero-stats b{font-size:20px}.ns-hero-bar{grid-template-columns:90px 1fr}.ns-overview>div{font-size:10px;gap:9px}.ns-intro p{font-size:18px}.ns-editorial .ns-section>p{font-size:17px}.ns-section h2{font-size:30px}.ns-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.ns-metrics.three{grid-template-columns:repeat(2,minmax(0,1fr))}.ns-dash-grid,.ns-path-layout,.ns-learner-grid,.ns-finance-grid{grid-template-columns:1fr}.ns-dash-head{align-items:flex-start}.ns-dash-head h3{font-size:18px}.ns-skillrow{grid-template-columns:1fr 1fr 30px;gap:7px}.ns-skillrow small{display:none}.ns-figure-top{padding-inline:10px}.ns-live{font-size:7px}.ns-figure-divider{margin-inline:4px}.ns-hero-window-head{font-size:9px}.ns-periods button{padding:6px 3px;font-size:8px}.ns-learner-head{flex-wrap:wrap}.ns-learner-head .ns-pill{margin-left:0}.ns-editorial .ns-takeaway p{font-size:23px}.ns-bottom{flex-direction:column}}
@media(prefers-reduced-motion:reduce){.ns-page *{scroll-behavior:auto!important;transition:none!important}}
@media print{.ns-page{background:#fff}.ns-hero{background:#fff;color:#172824;padding:20px 0}.ns-hero-main{min-height:0}.ns-hero-visual,.ns-nav,.ns-toc,.ns-mobile-toc,.ns-readprogress{display:none}.ns-hero h1{font-size:34px}.ns-hero-main>div:first-child>p{color:#334}.ns-layout{display:block}.ns-section{break-inside:auto}.ns-figure{break-inside:avoid}.ns-editorial .ns-section>p{font-size:12px}}
`;
