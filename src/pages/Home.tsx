import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SITE } from "../data/site";

const ANIM_CSS = `
@keyframes hero-rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
@keyframes hero-img { from { opacity: 0; transform: translateX(40px) scale(.97); } to { opacity: 1; transform: none; } }
@keyframes rise { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: none; } }
.hero-anim { animation: hero-rise .9s cubic-bezier(.22,1,.36,1) backwards; }
.hero-anim-img { animation: hero-img 1.1s cubic-bezier(.22,1,.36,1) .35s backwards; }
.reveal { opacity: 0; }
.reveal.is-in { opacity: 1; animation: rise .9s cubic-bezier(.22,1,.36,1) backwards; }
@media (prefers-reduced-motion: reduce) {
  .hero-anim, .hero-anim-img, .reveal.is-in { animation: none; }
  .reveal { opacity: 1; }
}
`;

const ROUTES = {
  caseStudy: "/articles/adfin-stubbs-parkin-case-study",
  makiCase: "/articles/maki-business-case",
  benefits: "/articles/best-global-employee-benefits-platform",
  aiLifecycle: "/articles/ai-employee-lifecycle",
  jenzabar: "/articles/jenzabar-implementation-reality-map",
};


const steps = [
  {
    n: "01",
    icon: "search",
    t: "Map the buying and approval process",
    d: "We look at how educators, academic leaders, IT, finance and procurement evaluate technology, then identify the questions, objections and approval requirements that content needs to address throughout the buying process.",
  },
  {
    n: "02",
    icon: "doc",
    t: "Build the evidence with your experts",
    d: "We work with product, curriculum, customer success and implementation teams to capture the technical detail, learning outcomes, customer evidence and practical experience needed to make complex EdTech content credible.",
  },
  {
    n: "03",
    icon: "pencil",
    t: "Create content for complex decisions",
    d: "We turn that evidence into buyer guides, platform comparisons, implementation planners and sales-support materials that help buyers assess the technology, understand what's involved and make the case for investment.",
  },
  {
    n: "04",
    icon: "chart",
    t: "Connect content back to pipeline",
    d: "We track how content contributes across the buying journey, from organic discovery and product evaluation to demo requests, pilots and sales opportunities, then use those insights to prioritise what we create next.",
  },
];


const caseStats = [
  { icon: "people", n: "~200", l: "clients added across two major intake periods" },
  { icon: "doc", n: "231", l: "mandates moved in three days" },
  { icon: "tick", n: "95%", l: "of payments collected on or before due date" },
];

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-4 w-4 fill-none stroke-current stroke-[1.7] ${className}`}
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Tick() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 fill-none stroke-current stroke-[1.9]"
    >
      <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ApproachIcon({ kind, small = false }: { kind: string; small?: boolean }) {
  const size = small ? "h-4 w-4" : "h-5 w-5";

  if (kind === "search") {
    return (
      <svg viewBox="0 0 24 24" className={`${size} fill-none stroke-current stroke-[1.6]`} aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="5.5" />
        <path d="m15 15 4.5 4.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "doc") {
    return (
      <svg viewBox="0 0 24 24" className={`${size} fill-none stroke-current stroke-[1.6]`} aria-hidden="true">
        <path d="M6 3.5h9l3 3V20.5H6z" strokeLinejoin="round" />
        <path d="M9 10h6M9 14h6" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "tick") {
    return (
      <svg viewBox="0 0 24 24" className={`${size} fill-none stroke-current stroke-[1.8]`} aria-hidden="true">
        <path d="m5 12 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={`${size} fill-none stroke-current stroke-[1.6]`} aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <circle cx="16.5" cy="9.5" r="2.5" />
      <path d="M3.5 19c.5-4 2.6-6 5.5-6s5 2 5.5 6M14.5 14c2.8.2 4.8 1.8 5.3 5" strokeLinecap="round" />
    </svg>
  );
}

function StepIcon({ kind }: { kind: string }) {
  const cls = "h-5 w-5 fill-none stroke-current stroke-[1.6]";
  if (kind === "search")
    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="5.5" />
        <path d="m15 15 4.5 4.5" strokeLinecap="round" />
      </svg>
    );
  if (kind === "doc")
    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
        <path d="M6 3.5h9l3 3V20.5H6z" strokeLinejoin="round" />
        <path d="M9 10h6M9 14h6" strokeLinecap="round" />
      </svg>
    );
  if (kind === "pencil")
    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
        <path d="m4 20 1-4L16.5 4.5a2 2 0 0 1 3 3L8 19z" strokeLinejoin="round" />
        <path d="m14.5 6.5 3 3" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
      <path d="M6 20v-7M12 20V5M18 20v-10" strokeLinecap="round" />
    </svg>
  );
}

const mockShell =
  "rounded-[14px] border border-[#3fcfc0]/15 bg-[#041716] p-4";

function MockOpportunities() {
  const rows = [
    ["Learning outcomes", 92, "Priority"],
    ["Product evaluation", 86, "Priority"],
    ["Security & IT", 72, "High"],
    ["Implementation & adoption", 64, "High"],
    ["Budget & procurement", 58, "High"],
  ] as const;

  return (
    <div className={mockShell}>
      <p className="mb-3 text-[8px] font-semibold uppercase tracking-[.18em] text-[#8eaaa3]">
        Buying journey priorities
      </p>

      <div className="space-y-2.5">
        {rows.map(([l, w, lvl]) => (
          <div key={l} className="flex items-center gap-2 text-[10px] text-[#d5e2de]">
            <span className="w-[112px] shrink-0 leading-3">{l}</span>

            <span className="h-[5px] flex-1 rounded-full bg-white/10">
              <span
                className="block h-full rounded-full bg-[#4de3d2]"
                style={{
                  width: `${w}%`,
                  opacity: lvl === "Priority" ? 1 : 0.72,
                }}
              />
            </span>

            <span className="w-[42px] text-right text-[9px] text-[#8eaaa3]">
              {lvl}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockSources() {
  const items = [
    ["Product & curriculum experts", "#5b8def"],
    ["Customer and educator interviews", "#4d9bff"],
    ["Learning outcomes & efficacy data", "#6f7dff"],
    ["Security & compliance documentation", "#d46bd0"],
    ["Sales and implementation insights", "#5aa8ff"],
  ];
  return (
    <div className="space-y-1.5">
      {items.map(([l, c], i) => (
        <div
          key={l}
          className="flex items-center gap-2.5 rounded-[9px] border border-[#3fcfc0]/15 bg-[#071f1e] px-3 py-2 text-[10px] text-[#e3eeea]"
          style={{ marginLeft: i * 6 }}
        >
          <span className="h-3.5 w-3.5 rounded-[4px]" style={{ background: c }} />
          {l}
        </div>
      ))}
    </div>
  );
}

function MockWorkflow() {
  const steps = ["Outline", "Draft", "SEO optimisation", "Expert review", "Visual story", "Publish"];
  return (
    <div className={`${mockShell} flex gap-3 p-3`}>
      <ul className="w-[46%] space-y-2 text-[9px] text-[#e3eeea]">
        {steps.map((s) => (
          <li key={s} className="flex items-center gap-1.5">
            <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#4de3d2] text-[#05211f]">
              <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-none stroke-current stroke-[3]">
                <path d="m6 12 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {s}
          </li>
        ))}
      </ul>
      <div className="flex-1 space-y-1.5 border-l border-white/10 pl-3">
        <span className="block h-1.5 w-full rounded-full bg-white/25" />
        <span className="block h-1 w-4/5 rounded-full bg-white/10" />
        <span className="block h-1 w-full rounded-full bg-white/10" />
        <span className="block h-12 w-full rounded-[6px] bg-gradient-to-br from-[#2a8f84] to-[#0b4a43]" />
        <span className="block h-1 w-3/5 rounded-full bg-white/10" />
        <span className="block h-1 w-4/5 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

function MockResults() {
  return (
    <div className="space-y-2">
      <div className={`${mockShell} relative p-3`}>
        <p className="text-[10px] text-[#d5e2de]">Pipeline influenced</p>
        <p className="mt-1 font-serif text-[24px] leading-none text-white">£1.2M</p>
        <span className="absolute right-3 top-3 rounded-full border border-[#4de3d2]/40 bg-[#0b4a43] px-2 py-0.5 text-[9px] text-[#7be2d7]">
          +180% ↑
        </span>
        <svg viewBox="0 0 160 44" className="mt-2 h-10 w-full fill-none" aria-hidden="true">
          <polyline
            points="4,38 26,30 48,32 70,22 92,24 114,14 136,10 156,6"
            stroke="#4de3d2"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          ["Organic traffic", "+156%"],
          ["Demo requests", "+72%"],
          ["Revenue influenced", "£1.2M"],
        ].map(([l, v]) => (
          <div key={l} className="rounded-[10px] border border-[#3fcfc0]/15 bg-[#041716] p-2">
            <p className="text-[8px] leading-3 text-[#8eaaa3]">{l}</p>
            <p className="mt-1 font-serif text-[15px] leading-none text-[#4de3d2]">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const mocks = [
  <MockOpportunities key="m1" />,
  <MockSources key="m2" />,
  <MockWorkflow key="m3" />,
  <MockResults key="m4" />,
];

const faqItems = [
  {
    q: "What EdTech subjects do you cover?",
    a: "We write about K–12 education technology, maths intervention, assessment platforms, learning management systems, higher education ERP, student information systems, corporate learning and skills development. We also cover the technical and operational subjects surrounding these products, including implementation, integrations, data protection and measuring learning outcomes.",
  },
  {
    q: "Can you help us decide which EdTech topics to write about?",
    a: "Yes. We look at what your prospective customers are searching for, the questions coming up during sales conversations and the areas where your product has a clear advantage. For a maths platform, that might mean intervention comparisons and evidence of pupil progress. For a university ERP, it could mean implementation planning, integrations and procurement requirements.",
  },
  {
    q: "How do you handle claims about learning outcomes?",
    a: "We check the evidence before turning a learning outcome into a marketing claim. That means reviewing published evaluations, research methods, sample sizes and what the findings actually support. We distinguish independent research from vendor case studies and customer-reported results, so the content gives school leaders and education buyers a fair picture of what the product can deliver.",
  },
  {
    q: "Can you write about complex EdTech products?",
    a: "Yes. Some EdTech products are straightforward classroom tools. Others involve student information systems, learning platforms, integrations, data migration, access controls and institution-wide implementation. We work through the technical documentation and speak with the people responsible for the product so we can explain how it works without oversimplifying important details or making unsupported claims.",
  },
  {
    q: "Can you work with our curriculum and product experts?",
    a: "Yes. We work with curriculum specialists, educators, product managers, implementation teams and customer-facing staff to get the detail needed for each piece. We use focused interviews and existing documentation to understand the product, its limitations and how customers use it. Your experts review the important claims without having to write the content themselves.",
  },
  {
    q: "What types of EdTech content do you create?",
    a: "We create buyer guides, platform comparisons, research-led articles, customer stories, commercial landing pages, implementation guides and sales enablement materials. We can also scope interactive resources, such as implementation planners and business case tools. The format depends on whether the buyer needs to discover a solution, compare products, assess implementation or get internal approval.",
  },
  {
    q: "How long does a project take, and what do you need?",
    a: "Most standard long-form articles take around one to two weeks from an approved brief, depending on research and review requirements. We usually start with your product documentation, positioning, target audience and relevant sales or customer insights. More involved projects, including interactive planners and sales enablement tools, are scoped separately around the functionality, research and design required.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

useEffect(() => {
  const id = window.location.hash.replace("#", "");
  if (!id) return;
  const t = setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
  }, 50);
  return () => clearTimeout(t);
}, []);

useEffect(() => {
  const els = document.querySelectorAll<HTMLElement>(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}, []);



  return (
    <main className="overflow-hidden bg-[#041b1c] text-white">
      <style>{ANIM_CSS}</style>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_72%_38%,rgba(25,144,132,.16),transparent_28%),linear-gradient(135deg,#06332f_0%,#041b1c_55%,#031516_100%)] pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-220px] top-[-140px] h-[700px] w-[700px] rounded-full border border-[#6ddbd0]/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-95px] top-[-25px] h-[470px] w-[470px] rounded-full border border-dashed border-[#6ddbd0]/15"
        />

        <div className="mx-auto grid w-[min(1340px,calc(100%-96px))] items-center gap-6 pb-16 lg:grid-cols-[.92fr_1.08fr] lg:pb-20">
          <div className="relative z-10">
                    <p className="hero-anim mb-6 text-[11px] font-semibold uppercase tracking-[.22em] text-[#1F9FA1]">
              EdTech writing samples
            </p>

                      <h1 style={{ animationDelay: "120ms" }} className="hero-anim max-w-[720px] font-serif text-[50px] font-normal leading-[.98] tracking-[-.045em] text-[#f6f2e8] md:text-[58px]">
              EdTech content built to<br className="hidden md:block" />{" "}
              <span className="text-[#1F9FA1]">drive pipeline growth.</span>
            </h1>

            <p className="mt-7 max-w-[520px] text-[17px] leading-7 text-[#c4d3cf]">
      See the kind of work we create for EdTech brands, from detailed buyer guides to interactive sales tools that help buyers understand the product, evaluate options and move closer to a decision.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex min-h-12 items-center gap-8 rounded-full bg-[#167273] px-7 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1d8f90]"
              >
                Read the articles <Arrow />
              </a>

              <a
                href="https://www.seo-growup.com/get-in-touch"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-7 rounded-full border border-[#75cfc7]/55 px-7 text-[13px] font-semibold text-[#edf8f5] transition hover:-translate-y-0.5 hover:border-[#75e4da]"
              >
                Work with us
              </a>
            </div>

 
          </div>

          <div className="relative w-full lg:-mr-[7vw]">
            <img
              src="/images/hr-tech-hero-image.png"
              alt="Search performance dashboard showing organic traffic growth and ranking positions for fintech topics."
              className="block h-auto w-full lg:w-[122%] lg:max-w-none lg:-ml-[12%] [filter:saturate(1.12)_contrast(1.05)] drop-shadow-[0_38px_70px_rgba(0,0,0,.28)]"
            />

          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" className="bg-[#f6f2e9] text-[#082722]">
        <div className="mx-auto w-[min(1400px,calc(100%-48px))] pt-16 pb-16 md:w-[min(1400px,calc(100%-96px))] lg:pt-20 lg:pb-20">
          <div className="grid gap-8 lg:grid-cols-1">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.19em] text-[#17796e]">
                Featured articles
              </p>
              <h2 className="mt-4 max-w-[1250px] font-serif text-[43px] font-normal leading-[1.03] tracking-[-.045em] md:text-[58px]">
                Explore our EdTech writing samples.
              </h2>
              <p className="mt-8 max-w-[900px] text-[18px] leading-7 text-[#011522]">
                From school classroom tools to higher education ERP and enterprise learning platforms, these articles show how we turn complex education topics into clear, credible and commercially valuable content.
              </p>
            </div>

          </div>

                 {/* FEATURED CASE STUDY — JENZABAR */}
          <Link
            to={ROUTES.jenzabar}
            reloadDocument
            className="group relative mt-6 block overflow-hidden rounded-[16px] border border-[#0a443c]/15 bg-[#06332f] shadow-[0_20px_60px_rgba(4,27,28,.10)]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,31,29,.98)_0%,rgba(4,31,29,.94)_38%,rgba(4,31,29,.55)_62%,rgba(4,31,29,.05)_100%)]" />

            <div className="relative z-10 grid min-h-[360px] lg:grid-cols-[1.02fr_.98fr]">
              <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
                <div>
                  <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#1F9FA1]">
                    <span className="text-[#1F9FA1]">01</span>
                    Higher Ed
                  </p>

                  <h3 className="mt-5 max-w-[620px] font-serif text-[38px] font-normal leading-[1.02] tracking-[-.04em] text-[#f5f1e8] md:text-[49px]">
                    Jenzabar Implementation<br/> Business Case
                  </h3>

                  <p className="mt-5 max-w-[750px] text-[17px] leading-6 text-[#fafafa]">
                    Implementation is a big part of the buying decision for higher education ERP. So we built Jenzabar an interactive planning tool that helps institutions work through timelines, staff capacity and potential disruptions, with an executive-ready presentation they can take into internal approval meetings.
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <span className="inline-flex min-h-11 items-center gap-8 rounded-full bg-[#167273] px-6 text-[14px] font-semibold text-white transition-all duration-300 group-hover:gap-10 group-hover:bg-[#1d8f90]">
                   View implementation roadmap <Arrow />
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative hidden min-h-[360px] overflow-hidden lg:block">
                <div
                  aria-hidden="true"
                  className="absolute bottom-[42px] right-[122px] h-[240px] w-[240px] rounded-full border border-[#66d7cc]/20"
                />
                <div
                  aria-hidden="true"
                  className="absolute bottom-[72px] right-[152px] h-[180px] w-[180px] rounded-full border border-dashed border-[#66d7cc]/20"
                />

                <img
                  src="/images/jenzabar-edtech-sample.png"
                  alt="Jenzabar One implementation planner showing timeline, staffing, risks, milestones and resources across a 9 to 12 month rollout."
                  className="absolute right-[4%] top-1/2 z-10 h-[88%] w-auto max-w-none -translate-y-1/2 object-contain object-right drop-shadow-[0_30px_48px_rgba(0,0,0,.30)] transition duration-700 group-hover:scale-[1.015]"
                />
              </div>
            </div>
          </Link>


{/* TWO SUPPORTING PIECES */}
<div className="mt-4 grid gap-5 lg:grid-cols-2">

  {/* 02 — UK SCHOOLS */}
  <Link
    to="/articles/best-maths-intervention-programmes"
    reloadDocument
    className="group relative isolate block overflow-hidden rounded-[18px] border border-[#123f38]/15 bg-transparent shadow-[0_10px_35px_rgba(4,27,28,.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#167273]/30 hover:shadow-[0_20px_50px_rgba(4,27,28,.10)]"
  >
    {/* Oversized background number */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-7 top-8 z-0 select-none font-serif text-[125px] font-normal leading-none tracking-[-.09em] text-[#ccebe1]/75 md:text-[145px]"
    >
      02
    </span>



    {/* Card content */}
    <div className="relative z-10 flex min-h-[300px] flex-col p-7 md:p-8">

      <div>
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#008c85]">
          02 · UK Schools
        </p>

        <h3 className="mt-4 max-w-[520px] font-serif text-[29px] font-normal leading-[1.04] tracking-[-.038em] text-[#011522] md:text-[32px]">
          6 Best Maths Intervention Programmes for UK Schools in 2026
        </h3>

        <p className="mt-3 max-w-[480px] text-[16px] leading-[1.55] text-[#011522]">
          Compare six maths intervention programmes, from one-to-one
          tutoring to adaptive learning, with a practical look at
          staff workload, costs and pupil progress.
        </p>

        <p className="mt-3 text-[13px] leading-5 text-[#526269]">
          By GrowUp <span className="mx-1">|</span> For Third Space Learning
          <span className="mx-1">|</span> Updated October 2026
        </p>
      </div>

      {/* Bottom actions */}
      <div className="mt-auto flex items-end justify-between gap-4 pt-5">

        <span className="inline-flex min-h-[42px] w-fit items-center gap-4 rounded-full bg-[#167273] px-6 text-[12px] font-semibold text-white transition-all duration-300 group-hover:gap-6 group-hover:bg-[#1d8f90]">
       Read the artice
          <Arrow />
        </span>


      </div>
    </div>
  </Link>


  {/* 03 — ENTERPRISE LEARNING */}
  <Link
    to="/articles/northstar-reskilling"
    reloadDocument
    className="group relative isolate block overflow-hidden rounded-[18px] border border-[#123f38]/15 bg-transparent shadow-[0_10px_35px_rgba(4,27,28,.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#167273]/30 hover:shadow-[0_20px_50px_rgba(4,27,28,.10)]"
  >
    {/* Oversized background number */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-7 top-8 z-0 select-none font-serif text-[125px] font-normal leading-none tracking-[-.09em] text-[#ccebe1]/75 md:text-[145px]"
    >
      03
    </span>

  

    {/* Card content */}
    <div className="relative z-10 flex min-h-[300px] flex-col p-7 md:p-8">

      <div>
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#008c85]">
          03 · Enterprise Learning
        </p>

        <h3 className="mt-4 max-w-[505px] font-serif text-[29px] font-normal leading-[1.04] tracking-[-.038em] text-[#011522] md:text-[32px]">
          How to Build a Skills-Based Learning Programme for 5,000 Employees
        </h3>

        <p className="mt-3 max-w-[490px] text-[16px] leading-[1.55] text-[#011522]">
          Learn how to build and manage a skills-based learning
          programme for 5,000 employees using Northstar, from
          identifying skills gaps to tracking progress and
          reporting business impact.
        </p>

        <p className="mt-3 text-[13px] leading-5 text-[#526269]">
          GrowUp Editorial
          <span className="mx-1.5">|</span>
          8 min read
          <span className="mx-1.5">|</span>
          October 2026
        </p>
      </div>

      {/* Bottom actions */}
      <div className="mt-auto flex items-end justify-between gap-4 pt-5">

        <span className="inline-flex min-h-[42px] w-fit items-center gap-4 rounded-full bg-[#167273] px-6 text-[12px] font-semibold text-white transition-all duration-300 group-hover:gap-6 group-hover:bg-[#1d8f90]">
          Read the guide
          <Arrow />
        </span>


      </div>
    </div>
  </Link>

</div>

        </div>
      </section>

{/* APPROACH */}
<section id="approach" className="bg-[#041b1c]">
  <div className="mx-auto w-[min(1400px,calc(100%-48px))] pt-20 pb-16 md:w-[min(1400px,calc(100%-96px))] lg:pt-20 lg:pb-20">
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[.22em] text-[#1F9FA1]">
          Our approach
        </p>

        <h2 className="mt-5 max-w-[650px] font-serif text-[46px] font-normal leading-[1.02] tracking-[-.03em] text-[#f6f2e8] md:text-[62px]">
          Content built for
          <br />
          complex enterprise
          <br />
          <span className="text-[#1F9FA1]">buying journeys.</span>
        </h2>
      </div>

      <p className="max-w-[590px] text-[18px] leading-8 text-[#c4d3cf] lg:border-l lg:border-white/10 lg:pl-10">
 We build around how education technology is evaluated and bought: multiple stakeholders, budget approvals, IT requirements, implementation concerns and the evidence schools, universities and enterprise learning teams need before making a decision.
      </p>
    </div>


          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="relative flex flex-col rounded-[22px] border border-[#3fcfc0]/20 bg-[#05201f] p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#3fcfc0]/35 font-serif text-[18px] text-[#f0eee5]">
                    {s.n}
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#3fcfc0]/35 text-[#4de3d2]">
                    <StepIcon kind={s.icon} />
                  </span>
                </div>

                <h3 className="mt-6 min-h-[64px] font-serif text-[26px] font-normal leading-[1.1] tracking-[-.02em] text-[#f4f0e7]">
                  {s.t}
                </h3>
                <p className="mt-4 text-[14px] leading-6 text-[#b9cbc6]">{s.d}</p>

                <div className="mt-auto pt-6">{mocks[i]}</div>

                {i < steps.length - 1 && (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute -right-5 top-[43px] hidden h-px w-5 bg-[#4de3d2]/30 lg:block"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute -right-[14px] top-[40px] z-10 hidden h-[7px] w-[7px] rounded-full bg-[#4de3d2] shadow-[0_0_10px_rgba(77,227,210,.8)] lg:block"
                    />
                  </>
                )}
              </div>
            ))}
          </div>


   </div>
  </section>

  {/* INVESTMENT */}
  <section id="investment" className="scroll-mt-24 bg-white text-[#011522]">
    <div className="mx-auto w-[min(1340px,calc(100%-48px))] py-16 md:w-[min(1340px,calc(100%-96px))] lg:py-20">
      <div className="bg-[#f6f8f9] px-6 py-16 md:px-12 lg:px-16">
        {/* HEADER */}
        <div className="text-center">
          <p className="flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[.22em] text-[#167273]">
            <span className="h-px w-3 bg-[#167273]" />
            Pricing
          </p>
          <h2 className="mt-4 font-serif text-[43px] font-normal leading-[1.03] tracking-[-.045em] text-[#011522] md:text-[58px]">
            Investment Options and Packages
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[18px] leading-7 text-[#011522]">
            Choose a single article or an ongoing monthly programme. Both include
            research, strategic input and content written by EdTech specialists.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2">
          {/* MONTHLY (featured) */}
          <div className="reveal relative flex flex-col border border-[#011522] bg-white p-9 shadow-[0_24px_60px_rgba(1,21,34,.08)]">
             <span className="absolute -top-[11px] left-9 bg-[#167273] px-3 py-1 text-[9px] font-medium uppercase tracking-[.22em] text-white">
              Most popular
            </span>
            <h3 className="font-serif text-[30px] font-normal leading-[1.05] tracking-[-.03em] text-[#011522]">
              Monthly Programme
            </h3>
            <p className="mt-4 font-serif text-[52px] font-normal leading-none tracking-[-.045em] text-[#011522]">
              £3,400 <span className="font-sans text-[15px] font-normal tracking-normal text-[#011522]/50">/mo</span>
            </p>
            <p className="mt-2 text-[14px] text-[#011522]/50">4 pieces per month, saving £400</p>

            <div className="mt-6 border-y border-[#011522]/10 py-3 text-[11px] font-medium uppercase tracking-[.12em] text-[#011522]">
              Expert review and custom visuals on every piece
            </div>

            <p className="mt-5 text-[14px] leading-6 text-[#011522]">
              A consistent stream of research-led content for teams publishing every month.
            </p>
            <ul className="mt-5 flex-1">
              {[
                "4 buyer guides, comparisons or long-form articles each month",
                "Monthly topic plan and keyword research",
                "Educator and subject-expert review on every piece",
                "Custom visuals for every piece",
                "Monthly report on pipeline impact, rankings and traffic",
                "Priority turnaround",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 border-b border-[#011522]/[.07] py-3.5 text-[13.5px] text-[#011522] last:border-b-0"
                >
                  <span className="grid h-4 w-4 shrink-0 place-items-center text-[#167273]">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.5]" aria-hidden="true">
                      <path d="m5 12 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>

                    <a
              href="https://www.seo-growup.com/get-in-touch"
              target="_blank"
              rel="noreferrer"
              className="mt-8 block bg-[#011522] py-4 text-center text-[12px] font-medium uppercase tracking-[.14em] text-white transition hover:bg-[#167273]"
            >
              Start a monthly programme
            </a>
          </div>

          {/* ONE-OFF */}
          <div style={{ animationDelay: "150ms" }} className="reveal relative flex flex-col border border-[#011522]/10 bg-white p-9">
            <h3 className="font-serif text-[30px] font-normal leading-[1.05] tracking-[-.03em] text-[#011522]">
              Long-Form Article
            </h3>
            <p className="mt-4 font-serif text-[52px] font-normal leading-none tracking-[-.045em] text-[#011522]">
              £950 <span className="font-sans text-[15px] font-normal tracking-normal text-[#011522]/50">/article</span>
            </p>
            <p className="mt-2 text-[14px] text-[#011522]/50">One-off, no commitment</p>

            <div className="mt-6 border-y border-[#011522]/10 py-3 text-[11px] font-medium uppercase tracking-[.12em] text-[#011522]">
              Research, SEO and custom visuals included
            </div>

            <p className="mt-5 text-[14px] leading-6 text-[#011522]">
              In-depth, research-led articles and buyer guides for schools, higher education and learning platforms.
            </p>

                       <ul className="mt-5 flex-1">
              {[
                "1,600 to 2,000 words",
                "Primary-source research and fact-checking",
                "Keyword and search-intent research",
                "SEO title, meta description and internal links",
                "Custom graphics and visuals",
                "Two rounds of revisions",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 border-b border-[#011522]/[.07] py-3.5 text-[13.5px] text-[#011522] last:border-b-0"
                >
                  <span className="grid h-4 w-4 shrink-0 place-items-center text-[#167273]">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.5]" aria-hidden="true">
                      <path d="m5 12 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="https://www.seo-growup.com/get-in-touch"
              target="_blank"
              rel="noreferrer"
              className="mt-8 block border border-[#011522] py-4 text-center text-[12px] font-medium uppercase tracking-[.14em] text-[#011522] transition hover:bg-[#011522] hover:text-white"
            >
              Commission an article
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>


    {/* FAQ */}
    <section id="faq" className="scroll-mt-24 relative overflow-hidden bg-[#041b1c] text-white">


      <div className="mx-auto w-[min(1340px,calc(100%-48px))] py-20 md:w-[min(1340px,calc(100%-96px))] lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">

          {/* LEFT */}
          <div className="reveal relative">
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#1F9FA1]">
              FAQ
            </p>

<h2 className="mt-5 max-w-[520px] font-serif text-[46px] font-normal leading-[.98] tracking-[-.045em] text-[#f6f2e8] md:text-[61px]">
  Questions about our{" "}
  <span className="text-[#1F9FA1]">EdTech writing</span>{" "}
  services.
</h2>

<p className="mt-7 max-w-[470px] text-[17px] leading-7 text-[#c4d3cf]">
  Learn how we research complex EdTech products, work with your
  experts and create content that supports search, sales and
  buying decisions.
</p>

      
          </div>

          {/* RIGHT */}
          <div style={{ animationDelay: "150ms" }} className="reveal space-y-3">
            {faqItems.map((item, i) => (
              <details
                key={item.q}
                open={openFaq === i}
                onToggle={(e) => {
                  if (e.currentTarget.open) {
                    setOpenFaq(i);
                  } else if (openFaq === i) {
                    setOpenFaq(null);
                  }
                }}
                className="group overflow-hidden rounded-[18px] border border-[#3fcfc0]/20 bg-[#05201f] transition duration-300 open:border-[#3fcfc0]/45 open:bg-[#062b28]"
              >
                <summary className="flex cursor-pointer list-none items-center gap-5 px-5 py-5 marker:hidden md:px-7 md:py-6">
                  <span className="w-9 shrink-0 font-serif text-[22px] leading-none text-[#1F9FA1] md:text-[24px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="flex-1 font-serif text-[22px] font-normal leading-[1.15] tracking-[-.025em] text-[#f4f0e7] md:text-[27px]">
                    {item.q}
                  </h3>

                  <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0b4a43] text-[#1F9FA1]">
                    <span className="absolute h-px w-4 bg-current" />
                    <span className="absolute h-4 w-px bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>

                <div className="grid grid-cols-[36px_1fr_auto] gap-5 px-5 pb-6 md:grid-cols-[36px_1fr_44px] md:px-7 md:pb-7">
                  <span />

                  <p className="max-w-[690px] text-[14px] leading-7 text-[#b9cbc6] md:text-[15px]">
                    {item.a}
                  </p>

                  <span />
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>

 


    </main>
  );
}