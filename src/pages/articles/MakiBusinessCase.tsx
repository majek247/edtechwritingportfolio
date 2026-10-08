"use client";

// npm i pptxgenjs
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type Props = {
  demoHref?: string;
  customersHref?: string;
  portfolioHref?: string;
};

type Scn = "conservative" | "base" | "ambitious";
type StepId = 1 | 2 | 3 | 4;
type IconName =
  | "people"
  | "hires"
  | "clock"
  | "money"
  | "calendar"
  | "trend"
  | "refresh"
  | "coins"
  | "globe"
  | "spark"
  | "bolt"
  | "chart"
  | "target"
  | "check"
  | "briefcase"
  | "layers"
  | "user"
  | "gear"
  | "link"
  | "arrow";

const SCN: Record<
  Scn,
  { label: string; screen: number; time: number; attr: number }
> = {
  conservative: { label: "Conservative", screen: 30, time: 15, attr: 15 },
  base: { label: "Base", screen: 50, time: 30, attr: 30 },
  ambitious: { label: "Ambitious", screen: 70, time: 45, attr: 50 },
};

// Published on makipeople.com/customers (reported by Maki)
const proof = [
  {
    id: "cap",
    name: "Capgemini",
    logo: "/images/logos/capgemini.svg",
    href: "https://www.makipeople.com/customers/capgemini",
    icon: "clock",
    note: "Faster hiring across global roles.",
    stat: "Under 10 days",
    line: "time to hire, from several weeks",
    stat2: "95%",
    line2: "candidate satisfaction",
  },
  {
    id: "del",
    name: "Deloitte France",
logo: "/images/logos/deloitte-white.svg",
    href: "https://www.makipeople.com/customers/deloitte-france",
    icon: "people",
    note: "A better experience for every candidate.",
    stat: "94.2%",
    line: "positive candidate feedback",
    stat2: "Faster",
    line2: "recruiter shortlisting",
  },
  {
    id: "asos",
    name: "ASOS",
    logo: "/images/logos/asos-white.svg",
    href: "https://www.makipeople.com/customers/asos",
    icon: "spark",
    note: "Higher candidate satisfaction at scale.",
    stat: "93%+",
    line: "positive candidate feedback",
    stat2: "Skills",
    line2: "based, brand-led hiring",
  },
  {
    id: "trg",
    name: "The Restaurant Group",
    logo: "",
    href: "",
    icon: "layers",
    note: "No manual screening needed.",
    stat: "300+",
    line: "locations hiring at the frontline",
    stat2: "None",
    line2: "manual screening needed",
  },
];

const trusted = [
  { name: "Capgemini",       src: "/images/logos/capgemini.svg",           invert: true  },
  { name: "Deloitte",        src: "/images/logos/deloitte-white.svg",      invert: false },
  { name: "Nespresso",       src: "/images/logos/nespresso.svg",           invert: true  },
  { name: "ASOS",            src: "/images/logos/asos-white.svg",          invert: false },
  { name: "Grant Thornton",  src: "/images/logos/grant-thornton-light.svg", invert: false },
  { name: "Foundever",       src: "/images/logos/foundever.svg",           invert: true  },
];

const faqs = [
  [
    "How reliable are the projected savings?",
    "The projections are most reliable when the model uses current hiring data rather than broad assumptions. Application volume, screening time, time to hire, attrition and vacancy cost have the biggest influence on the result. Where those figures are well understood, the estimate is stronger. Where they are not, the model should stay conservative until a pilot provides better evidence.",
  ],
  [
    "What happens if hiring demand changes?",
    "The projected impact changes with hiring volume. If applications and hires increase, the value of faster screening and shorter time to hire usually increases as well. If demand falls, the projected benefit reduces. The model can be updated whenever hiring plans change, as long as the same roles, markets and business units remain in scope.",
  ],
  [
    "Which benefits should we treat as financial savings?",
    "Financial savings should be limited to costs that would genuinely fall as a result of using Maki. Recruiter time, for example, creates valuable capacity but only becomes a cash saving if it reduces headcount or external spend. Faster hiring is similar: the value can be significant, but it is better presented separately from direct cost reduction.",
  ],
  [
    "What would implementation require from our team?",
    "Implementation effort depends on the systems involved, the roles in scope and how hiring works today. Maki would typically work with recruiting, hiring managers, HR, IT and, where needed, procurement or security. The main areas to plan for are integration, role set-up, testing, ownership and adoption, with the exact effort becoming clearer once the rollout scope is defined.",
  ],
  [
    "How could we validate the case before scaling?",
    "A focused pilot is the clearest way to test whether the model holds up in practice. One role group, market or business unit can be used to compare screening effort, time to hire and candidate experience against the current baseline. Those results can then replace assumptions in the model before any broader rollout decision is made.",
  ],
  [
    "Which assumptions should we validate first?",
    "The first assumptions to validate are the ones that have the biggest effect on the result: application volume, recruiter screening time, time to hire, early attrition and vacancy cost. These figures drive most of the model, so getting them right matters more than refining smaller inputs that have relatively little influence on the final outcome.",
  ],
  [
    "How should we compare the model with actual results?",
    "The comparison should use the same baseline and measures that were agreed before the pilot. If the model projects lower screening effort or shorter time to hire, those exact measures should be tracked after launch. The aim is to see whether the real-world result falls within a credible range, rather than expecting every assumption to match perfectly.",
  ],
  [
    "What should procurement and IT review early?",
    "Procurement and IT should review anything that could affect approval, timing or rollout. That usually includes security, data handling, integrations, commercial terms, implementation ownership and internal governance requirements. Bringing those checks forward helps surface practical blockers early and gives the wider business case a more realistic view of what is required to move ahead.",
  ],
];

const steps: Array<{
  id: StepId;
  title: string;
  description: string;
  icon: IconName;
}> = [
  {
    id: 1,
    title: "Hiring volume",
    description: "Tell us about your current hiring activity.",
    icon: "people",
  },
  {
    id: 2,
    title: "Recruiter effort",
    description: "How much time and resource goes into hiring today?",
    icon: "clock",
  },
  {
    id: 3,
    title: "Cost impact",
    description: "What does slow hiring and attrition cost your business?",
    icon: "money",
  },
  {
    id: 4,
    title: "Review",
    description: "Check your inputs and final impact.",
    icon: "target",
  },
];



const stepTips: Record<StepId, Array<{ title: string; text: string }>> = {
  1: [
    {
      title: "Use current ATS data",
      text: "Use the latest 12 months of completed applications from the roles included in scope.",
    },
    {
      title: "Keep scope consistent",
      text: "Include the same roles, markets and business units across every input in the model.",
    },
    {
      title: "Default to conservative",
      text: "Use the lower defensible estimate whenever your source data is incomplete or inconsistent.",
    },
  ],
  2: [
    {
      title: "Count screening work",
      text: "Include CV review, eligibility checks, admin and first-screen decision-making before any interview.",
    },
    {
      title: "Use loaded recruiter cost",
      text: "Include salary, employer costs and overhead when calculating recruiter cost per working hour.",
    },
    {
      title: "Match reporting periods",
      text: "Use time-to-hire data from the same roles and 12-month period as application volumes.",
    },
  ],
  3: [
    {
      title: "Use Finance definitions",
      text: "Match the early attrition period already used in your workforce or finance reporting.",
    },
    {
      title: "Count supported costs",
      text: "Include replacement, onboarding and training costs only where internal data clearly supports them.",
    },
    {
      title: "Use defensible vacancy cost",
      text: "Base daily vacancy cost on lost productivity, cover, overtime or delayed commercial output.",
    },
  ],
  4: [
    {
      title: "Validate before sharing",
      text: "Reconcile final assumptions with ATS, HRIS and Finance data before circulating the model.",
    },
    {
      title: "Lead with Conservative",
      text: "Present Conservative as the planning case, then use Base to show credible upside.",
    },
    {
      title: "Include Maki investment",
      text: "Enter the expected annual Maki cost before presenting any three-year net benefit figure.",
    },
  ],
};

const riskIcons: IconName[] = ["chart", "user", "people", "gear"];

const riskIconSvg: Record<string, string> = {
  chart: '<path d="M5 19V9M12 19V5M19 19v-7"/><path d="M3 19h18"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',
  calendar:
    '<rect x="4" y="6" width="16" height="14" rx="2"/><path d="M8 3v6M16 3v6M4 10h16M8 14h2M14 14h2"/>',
  coins:
    '<ellipse cx="12" cy="7" rx="6" ry="3"/><path d="M6 7v4c0 1.7 2.7 3 6 3s6-1.3 6-3V7"/><path d="M6 11v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4"/>',
  hires:
    '<rect x="6" y="4" width="12" height="16" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-6 8-6s8 2 8 6"/>',
  people:
    '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3.5 19c.5-4 2.5-6 5.5-6s5 2 5.5 6"/><path d="M14 14c3 0 5 1.7 5.5 5"/>',
  gear: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
};

async function iconToPng(name: string, color = "#087675") {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="192" height="192" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${riskIconSvg[name]}</svg>`;
  const img = new Image();
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = 192;
  canvas.height = 192;
  canvas.getContext("2d")!.drawImage(img, 0, 0, 192, 192);
  return canvas.toDataURL("image/png");
}


const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);

const num = (n: number) =>
  new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(
    Number.isFinite(n) ? n : 0,
  );

const short = (n: number) =>
  n >= 1e6
    ? `£${(n / 1e6).toFixed(1)}M`
    : n >= 1e3
      ? `£${Math.round(n / 1e3)}K`
      : gbp(n);

const parseField = (raw: string) => {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
};

type SlideLayout = "cover" | "current" | "impact" | "proof" | "risks" | "next";

type Slide = {
  layout: SlideLayout;
  kicker: string;
  title: string;
  big?: string;
  sub?: string;
  bullets: string[];
  bulletIcons?: IconName[];
  visual: string;
  chart?: { labels: string[]; values: number[] };
};

const deckAssets = {
  logo: "/images/logos/maki.svg",
  logoWhite: "/images/logos/maki-white.svg",
  cover: "/images/make-hero-slide.png",
  current: "/images/02-current-state.png",
  impact: "/images/03-project-impact.png",
  proof: "/images/04-customer-proof.png",
  risks: "/images/05-risk-controls.png",
  next: "/images/06-next-steps.png",
} as const;

async function imageUrlToDataUri(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not load image: ${url}`);
  const blob = await response.blob();

  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function whiteLogoPng(url: string) {
  const img = new Image();
  img.src = url;
  await img.decode();
  const w = (img.naturalWidth || 400) * 2;
  const h = (img.naturalHeight || 120) * 2;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.filter = "brightness(0) invert(1)";
  ctx.drawImage(img, 0, 0, w, h);
  return canvas.toDataURL("image/png");
}

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2" />
        <path d="M3.5 19c.5-4 2.5-6 5.5-6s5 2 5.5 6" />
        <path d="M14 14c3 0 5 1.7 5.5 5" />
      </>
    ),
    hires: (
      <>
        <rect x="6" y="4" width="12" height="16" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    money: (
      <>
        <path d="M15 5c-1-.7-2-.9-3.2-.9-2.3 0-4 1.4-4 3.4 0 2.1 1.7 3 4.2 3.5 2.2.3 3.6 1.1 3.6 3.1 0 2.1-1.8 3.7-4.4 3.7-1.5 0-3-.4-4.2-1.3" />
        <path d="M12 2v20" />
      </>
    ),
    calendar: (
      <>
        <rect x="4" y="6" width="16" height="14" rx="2" />
        <path d="M8 3v6M16 3v6M4 10h16M8 14h2M14 14h2" />
      </>
    ),
    trend: (
      <>
        <path d="M4 7l5 5 3-3 6 6" />
        <path d="M15 15h3v-3" />
      </>
    ),
    refresh: (
      <>
        <path d="M19 7v5h-5" />
        <path d="M5 17v-5h5" />
        <path d="M18 12a7 7 0 0 0-12-4L5 9" />
        <path d="M6 12a7 7 0 0 0 12 4l1-1" />
      </>
    ),
    coins: (
      <>
        <ellipse cx="12" cy="7" rx="6" ry="3" />
        <path d="M6 7v4c0 1.7 2.7 3 6 3s6-1.3 6-3V7" />
        <path d="M6 11v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12h16M12 4c2 2.2 3 4.9 3 8s-1 5.8-3 8M12 4c-2 2.2-3 4.9-3 8s1 5.8 3 8" />
      </>
    ),
    spark: (
      <>
        <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z" />
        <path d="M18 15l.8 1.8L21 18l-2.2 1.2L18 21l-.8-1.8L15 18l2.2-1.2L18 15Z" />
      </>
    ),
    bolt: <path d="M13 2L5 13h6l-1 9 9-13h-6V2Z" />,
    chart: (
      <>
        <path d="M5 19V9M12 19V5M19 19v-7" />
        <path d="M3 19h18" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 12 19 5M16 5h3v3" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    briefcase: (
      <>
        <rect x="4" y="7" width="16" height="12" rx="2" />
        <path d="M9 7V5h6v2M4 12h16M10 12v2h4v-2" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 8 4-8 4-8-4 8-4Z" />
        <path d="m4 12 8 4 8-4M4 17l8 4 8-4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
      </>
    ),
    gear: (
      <>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    link: (
      <>
        <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
        <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
      </>
    ),
    arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  };

  return (
    <span className={`mi ${className}`.trim()}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {paths[name]}
      </svg>
    </span>
  );
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 12h15m-6-6 6 6-6 6" />
  </svg>
);

const Tick = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m5 12 4 4L19 6" />
  </svg>
);

function Field({
  label,
  help,
  value,
  set,
  prefix,
  suffix,
  max,
}: {
  label: string;
  help: string;
  value: number;
  set: (n: number) => void;
  icon: IconName;
  prefix?: string;
  suffix?: string;
  max?: number;
}) {
  return (
    <label className="calcField">
      <span className="fieldCopy">
        <span className="fieldLabel">
          {label}
          <span
            className="tipIcon"
            tabIndex={0}
            role="button"
            aria-label={`${label}: ${help}`}
            onClick={(e) => e.preventDefault()}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v5M12 7.5v.01" />
            </svg>
            <span className="tipBubble" role="tooltip">
              {help}
            </span>
          </span>
        </span>
      </span>
      <span className="fieldControl">
        {prefix && <i>{prefix}</i>}
        <input
          inputMode="decimal"
          value={num(value)}
          aria-label={label}
          onFocus={(e) => e.currentTarget.select()}
          onChange={(e) => {
            const next = parseField(e.target.value);
            set(max !== undefined ? Math.min(max, next) : next);
          }}
        />
        {suffix && <i>{suffix}</i>}
      </span>
    </label>
  );
}

function ReviewLine({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="reviewLine">
      <span>{label}</span>
      <strong>{value}</strong>
      <button type="button" onClick={onEdit}>
        Edit
      </button>
    </div>
  );
}

export default function MakiBusinessCaseBuilder({
  demoHref = "https://www.makipeople.com/demo",
  customersHref = "https://www.makipeople.com/customers",
  portfolioHref = "/",
}: Props) {
  const root = useRef<HTMLElement>(null);
  const [scn, setScn] = useState<Scn>("base");
  const [step, setStep] = useState<StepId>(1);

  const [apps, setApps] = useState(80000);
  const [hires, setHires] = useState(4200);
  const [mins, setMins] = useState(8);
  const [rate, setRate] = useState(42);
  const [days, setDays] = useState(45);
  const [attr, setAttr] = useState(18);
  const [replace, setReplace] = useState(8500);
  const [units, setUnits] = useState(12);
  const [vac, setVac] = useState(150);
  const [cost, setCost] = useState(0);

  const [picked, setPicked] = useState<string[]>(["cap", "del", "asos"]);
  const [active, setActive] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [titles, setTitles] = useState<Record<number, string>>({});
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const deckRef = useRef<HTMLDivElement>(null);
  const [deckScale, setDeckScale] = useState(1);

  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;
    const update = () => setDeckScale(el.clientWidth / 1280);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>("[data-r]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );

    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, []);

  const s = SCN[scn];

  const c = useMemo(() => {
    const hours = ((apps * mins) / 60) * (s.screen / 100);
    const capacity = hours * rate;
    const daysSaved = Math.round(days * (s.time / 100));
    const vacancy = hires * daysSaved * vac;
    const attrition = hires * (attr / 100) * (s.attr / 100) * replace;
    const annual = capacity + vacancy + attrition;
    const three = annual * 3;
    const net3 = three - cost * 3;
    const after = Math.max(0, days - daysSaved);

    return {
      hours,
      capacity,
      daysSaved,
      vacancy,
      attrition,
      annual,
      three,
      net3,
      after,
    };
  }, [apps, hires, mins, rate, days, attr, replace, vac, cost, s]);

  const chosen = proof.filter((p) => picked.includes(p.id));

  const nextSteps: Array<{
    title: string;
    detail: string;
    url?: string;
    icon: IconName;
    href?: string;
  }> = [
    {
      title: "Start with one priority area",
      detail: "Choose a defined role group or priority market.",
      icon: "hires",
    },
    {
      title: "Set the measures upfront",
      detail: "Agree what success should look like before launch.",
      icon: "chart",
    },
    {
      title: "Review the approach with Maki",
      detail: "Book a demo to discuss scope and next steps.",
      url: demoHref.replace("https://", ""),
      href: demoHref,
      icon: "link",
    },
  ];

  const impactCards: Array<{ icon: IconName; value: string; label: string }> = [
    {
      icon: "clock",
      value: num(c.hours),
      label: "recruiter hours returned per year",
    },
    {
      icon: "calendar",
      value: String(Math.round(c.daysSaved)),
      label: "fewer days to hire",
    },
    {
      icon: "chart",
      value: gbp(cost > 0 ? c.net3 : c.three),
      label:
        cost > 0
          ? "net estimated benefit over three years"
          : "estimated benefit over three years before Maki cost",
    },
  ];

  const impactTotal: { icon: IconName; value: string; label: string } = {
    icon: "coins",
    value: gbp(c.annual),
    label: "estimated annual benefit",
  };

  const slides: Slide[] = [
    {
      layout: "cover",
      kicker: "Executive summary",
      title: "A business case for improving hiring efficiency.",
            sub: `Maki Business Case · ${s.label} Scenario`,
      bullets: [
        `Across ${num(units)} markets or business units`,
        "Covers current performance, projected impact and supporting evidence",
      ],
      bulletIcons: ["globe", "chart"] as IconName[],
      visual: deckAssets.cover,
    },
    {
      layout: "current",
      kicker: "Current state",
      title: "What hiring costs today.",
      big: num(apps),
      sub: "applications per year",
      bullets: [
        `${num(hires)} hires across the roles in scope`,
        `${mins} minutes of recruiter screening per applicant`,
        `${days} days to hire · ${attr}% early attrition`,
      ],
      visual: deckAssets.current,
    },
    {
      layout: "impact",
      kicker: "Projected impact",
      title: "What changes with Maki.",
      big: gbp(c.annual),
      sub: "estimated annual benefit",
      bullets: [
        `${num(c.hours)} recruiter hours returned per year`,
        `${c.daysSaved} fewer days to hire`,
        cost > 0
          ? `${gbp(c.net3)} net estimated benefit over three years`
          : `${gbp(c.three)} estimated benefit over three years before Maki cost`,
      ],
      visual: deckAssets.impact,
      chart: {
        labels: ["Recruiter capacity", "Vacancy days", "Early attrition"],
        values: [
          Math.round(c.capacity),
          Math.round(c.vacancy),
          Math.round(c.attrition),
        ],
      },
    },
    {
      layout: "proof",
      kicker: "Customer evidence",
      title: "Proven outcomes from Maki customers.",
      sub: "Evidence from large-scale hiring transformations.",
      bullets: chosen.length
        ? chosen.map((p) => `${p.name}: ${p.stat} ${p.line}`)
        : ["Select customer examples in the builder"],
      visual: deckAssets.proof,
    },
    {
      layout: "risks",
      kicker: "Before rollout",
      title: "Validation priorities and criteria",
      bullets: [
        "Expected impact: confirm the projected gains with pilot results",
        "Candidate experience: measure completion rates and candidate feedback",
        "Team readiness: involve recruiters and hiring managers early",
        "Implementation: confirm ownership, timing and required resources",
      ],
      visual: deckAssets.risks,
    },
    {
      layout: "next",
      kicker: "Recommended next step",
      title: "Prove the case with a focused pilot.",

      bullets: [
        "Approve a focused pilot for a defined role group or market",
        "Agree success measures before launch",
        `Request a Maki demo: ${demoHref.replace("https://", "")}`,
      ],
      visual: deckAssets.next,
    },
  ];

  const sl = slides[active];
  const summary = slides
    .map((x, i) =>
      `${titles[i] ?? x.title}\n${[
        x.big && `${x.big} ${x.sub ?? ""}`,
        ...x.bullets,
      ]
        .filter(Boolean)
        .join("\n")}`,
    )
    .join("\n\n");

  const toggle = (
    set: Dispatch<SetStateAction<string[]>>,
    id: string,
  ) =>
    set((value) =>
      value.includes(id)
        ? value.filter((item) => item !== id)
        : [...value, id],
    );

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function download() {
    setBusy(true);

    try {
      const P = (await import("pptxgenjs")).default;
      const p = new P();

      p.layout = "LAYOUT_WIDE";
      p.author = "Maki";
      p.company = "Maki";
      p.subject = "Executive hiring business case";
      p.title = "Maki executive summary";
      p.lang = "en-GB";
      p.theme = {
        headFontFace: "Georgia",
        bodyFontFace: "Arial",
        lang: "en-GB",
      };

      const assetEntries = await Promise.all(
        Object.entries(deckAssets).map(async ([key, url]) => [
          key,
          await imageUrlToDataUri(url),
        ] as const),
      );

      const assets = Object.fromEntries(assetEntries) as Record<
        keyof typeof deckAssets,
        string
      >;
            const riskPngs = await Promise.all(riskIcons.map((name) => iconToPng(name)));
      const nextPngs = await Promise.all(
        nextSteps.map((item) => iconToPng(item.icon, "#7FD3D0")),
      );
      const impactPngs = await Promise.all(
        [...impactCards, impactTotal].map((item) =>
          iconToPng(item.icon, "#7FD3D0"),
        ),
      );

            const logoEntries = await Promise.all(
        proof
          .filter((item) => item.logo)
          .map(async (item) => [item.id, await whiteLogoPng(item.logo)] as const),
      );
      const logos = Object.fromEntries(logoEntries) as Record<string, string>;

      const C = {
        deep: "041B1C",
        deep2: "082F30",
        teal: "087675",
        mint: "7FD3D0",
        cream: "F8F7F2",
        cream2: "EEEDE7",
        white: "FFFFFF",
        ink: "0A2628",
        muted: "647A78",
        line: "D9E4E0",
        pale: "EEF6F3",
      };

      const addTopBrand = (
        d: any,
        slideNumber: number,
        dark = false,
      ) => {
        d.addImage({
          data: dark ? assets.logoWhite : assets.logo,
          x: dark ? 0.72 : 0.7,
          y: dark ? 0.5 : 0.5,
          w: dark ? 1.05 : 1.05,
          h: dark ? 0.316 : 0.316,
        });

        d.addText("CONFIDENTIAL", {
          x: 9.8,
          y: 0.55,
          w: 2.1,
          h: 0.22,
          fontFace: "Arial",
          fontSize: 8.5,
          bold: true,
          charSpacing: 0.8,
          color: dark ? "C8DEDB" : "526B68",
          align: "right",
          margin: 0,
        });

        d.addText(`${slideNumber} / ${slides.length}`, {
          x: 12.05,
          y: 0.55,
          w: 0.55,
          h: 0.22,
          fontFace: "Arial",
          fontSize: 8.5,
          bold: true,
          color: dark ? C.white : C.ink,
          align: "right",
          margin: 0,
        });
      };

      const addFooter = (
        d: any,
        slideNumber: number,
        dark = false,
      ) => {
        d.addShape(p.ShapeType.line, {
          x: 0.7,
          y: 7.03,
          w: 11.9,
          h: 0,
          line: {
            color: dark ? "315355" : "DCE5E2",
            transparency: dark ? 20 : 0,
            width: 0.8,
          },
        });

        d.addText(
          new Date().toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          }),
          {
            x: 0.7,
            y: 7.1,
            w: 1.6,
            h: 0.18,
            fontFace: "Arial",
            fontSize: 8,
            color: dark ? "8FB2AF" : "788A87",
            margin: 0,
          },
        );

        d.addText("Maki · Executive summary", {
          x: 5.0,
          y: 7.1,
          w: 3.3,
          h: 0.18,
          fontFace: "Arial",
          fontSize: 8,
          color: dark ? "8FB2AF" : "788A87",
          align: "center",
          margin: 0,
        });

        d.addText(String(slideNumber).padStart(2, "0"), {
          x: 12.0,
          y: 7.1,
          w: 0.6,
          h: 0.18,
          fontFace: "Arial",
          fontSize: 8,
          bold: true,
          color: dark ? C.white : C.ink,
          align: "right",
          margin: 0,
        });
      };

      const addKicker = (d: any, text: string, dark = false) => {
        d.addText(text.toUpperCase(), {
          x: 0.72,
          y: 1.3,
          w: 4.2,
          h: 0.22,
          fontFace: "Arial",
          fontSize: 9,
          bold: true,
          charSpacing: 1.6,
          color: dark ? C.mint : C.teal,
          margin: 0,
        });
      };

      const addBullets = (
        d: any,
        bullets: string[],
        x: number,
        y: number,
        w: number,
        dark = false,
        fontSize = 13,
      ) => {
        bullets.forEach((bullet, index) => {
          const yy = y + index * 0.48;

          d.addShape(p.ShapeType.ellipse, {
            x,
            y: yy + 0.075,
            w: 0.11,
            h: 0.11,
            line: {
              color: dark ? C.mint : C.teal,
              transparency: 100,
            },
            fill: { color: dark ? C.mint : C.teal },
          });

          d.addText(bullet, {
            x: x + 0.24,
            y: yy,
            w: w - 0.24,
            h: 0.29,
            fontFace: "Arial",
            fontSize,
            color: dark ? "E3F0EE" : "304C49",
            margin: 0,
            breakLine: false,
            valign: "mid",
          });
        });
      };

      slides.forEach((x, i) => {
        const d = p.addSlide();
        const dark =
          x.layout === "impact" || x.layout === "next" || x.layout === "proof";
        d.background = { color: dark ? C.deep : C.cream };

        addTopBrand(d, i + 1, dark);
        addKicker(d, x.kicker, dark);

        if (x.layout === "cover") {
          d.addText(titles[i] ?? x.title, {
            x: 0.72,
            y: 1.75,
            w: 5.25,
            h: 1.55,
            fontFace: "Georgia",
            fontSize: 37,
            bold: true,
            color: C.ink,
            margin: 0,
            breakLine: false,
            valign: "mid",
          });

          d.addText(x.sub ?? "", {
            x: 0.74,
            y: 3.45,
            w: 4.9,
            h: 0.35,
            fontFace: "Arial",
            fontSize: 15,
            color: "304A48",
            margin: 0,
          });

          d.addShape(p.ShapeType.line, {
            x: 0.74,
            y: 4.03,
            w: 4.2,
            h: 0,
            line: { color: "D8E2DF", width: 1 },
          });

          addBullets(d, x.bullets, 0.75, 4.28, 4.9, false, 12.5);

          d.addShape(p.ShapeType.roundRect, {
            x: 6.15,
            y: 1.18,
            w: 6.48,
            h: 5.38,
            rectRadius: 0.08,
            line: { color: "DDE7E3", width: 1 },
            fill: { color: "F0F4F1" },
          });

          d.addImage({
            data: assets.cover,
            x: 6.2,
            y: 1.22,
            w: 6.38,
            h: 5.28,
          });
        }

        if (x.layout === "current") {
          d.addText(titles[i] ?? x.title, {
            x: 0.72,
            y: 1.55,
            w: 6.0,
            h: 1.9,
            fontFace: "Georgia",
            fontSize: 56,
            bold: true,
            color: C.ink,
            margin: 0,
            valign: "top",
          });

          d.addText(
            "The current model captures screening effort, hiring volume, time to hire and early attrition across the roles in scope.",
            {
              x: 0.74,
              y: 3.45,
              w: 5.6,
              h: 1.4,
              fontFace: "Arial",
              fontSize: 16,
              color: "4B625F",
              margin: 0,
              valign: "top",
            },
          );

          const cardGap = 0.3;
          const cardW = (5.9 - cardGap) / 2;
          const cardH = 2.1;

          const statCards: Array<[string, string, string]> = [
            [
              "Screening effort",
              num(Math.round((apps * mins) / 60)),
              "recruiter hours per year",
            ],
            ["Hires", num(hires), "across the roles in scope"],
            [
              "Time to hire",
              `${num(days)} days`,
              "from role open to accepted offer",
            ],
            ["Early attrition", `${attr}%`, "of new hires leave early"],
          ];

          statCards.forEach(([label, value, note], index) => {
            const col = index % 2;
            const row = Math.floor(index / 2);
            const cx = 6.9 + col * (cardW + cardGap);
            const cy = 1.55 + row * (cardH + 0.25);

            d.addShape(p.ShapeType.roundRect, {
              x: cx,
              y: cy,
              w: cardW,
              h: cardH,
              rectRadius: 0.1,
              line: { color: "FFFFFF", transparency: 100 },
              fill: { color: "EAF3F0" },
            });

            d.addText(label, {
              x: cx + 0.28,
              y: cy + 0.35,
              w: cardW - 0.56,
              h: 0.3,
              fontFace: "Arial",
              fontSize: 13,
              bold: true,
              color: "0A2728",
              margin: 0,
            });

            d.addText(value, {
              x: cx + 0.28,
              y: cy + 0.75,
              w: cardW - 0.56,
              h: 0.7,
              fontFace: "Georgia",
              fontSize: 30,
              bold: true,
              color: "0A2728",
              margin: 0,
              valign: "mid",
              fit: "shrink",
            });

            d.addText(note, {
              x: cx + 0.28,
              y: cy + 1.55,
              w: cardW - 0.56,
              h: 0.4,
              fontFace: "Arial",
              fontSize: 11.5,
              color: "011522",
              margin: 0,
              valign: "top",
            });
          });
        }

        if (x.layout === "impact") {
          d.addText(titles[i] ?? x.title, {
            x: 0.72,
            y: 1.7,
            w: 11.9,
            h: 0.9,
            fontFace: "Georgia",
            fontSize: 34,
            bold: true,
            color: C.white,
            margin: 0,
          });

          d.addText("Based on the assumptions and scenario used in your model.", {
            x: 0.74,
            y: 2.67,
            w: 9,
            h: 0.32,
            fontFace: "Arial",
            fontSize: 14,
            color: "B5CECB",
            margin: 0,
          });

          const gap = 0.3;
          const cw = (11.9 - gap * 2) / 3;

          impactCards.forEach((item, index) => {
            const cx = 0.7 + index * (cw + gap);
            const cy = 3.2;

            d.addShape(p.ShapeType.roundRect, {
              x: cx,
              y: cy,
              w: cw,
              h: 2.2,
              rectRadius: 0.08,
              line: { color: "31595A", width: 1 },
              fill: { color: "0A3334" },
            });

            d.addShape(p.ShapeType.roundRect, {
              x: cx + 0.3,
              y: cy + 0.25,
              w: 0.5,
              h: 0.5,
              rectRadius: 0.08,
              line: { color: "31595A", width: 1 },
              fill: { color: "123F40" },
            });

            d.addImage({
              data: impactPngs[index],
              x: cx + 0.43,
              y: cy + 0.38,
              w: 0.24,
              h: 0.24,
            });

            d.addShape(p.ShapeType.line, {
              x: cx + 1.0,
              y: cy + 0.5,
              w: cw - 1.3,
              h: 0,
              line: { color: "31595A", width: 1 },
            });

            d.addText(item.value, {
              x: cx + 0.3,
              y: cy + 0.9,
              w: cw - 0.6,
              h: 0.6,
              fontFace: "Georgia",
              fontSize: 28,
              bold: true,
              color: C.mint,
              margin: 0,
              valign: "mid",
              fit: "shrink",
            });

            d.addText(item.label, {
              x: cx + 0.3,
              y: cy + 1.5,
              w: cw - 0.6,
              h: 0.55,
              fontFace: "Arial",
              fontSize: 11.5,
              color: "B5CECB",
              margin: 0,
              valign: "top",
            });
          });

          const wy = 5.6;

          d.addShape(p.ShapeType.roundRect, {
            x: 0.7,
            y: wy,
            w: 11.9,
            h: 1.1,
            rectRadius: 0.08,
            line: { color: C.mint, transparency: 55, width: 1 },
            fill: { color: "0B4A49" },
          });

          d.addShape(p.ShapeType.roundRect, {
            x: 1.0,
            y: wy + 0.3,
            w: 0.5,
            h: 0.5,
            rectRadius: 0.08,
            line: { color: "31595A", width: 1 },
            fill: { color: "123F40" },
          });

          d.addImage({
            data: impactPngs[impactCards.length],
            x: 1.13,
            y: wy + 0.43,
            w: 0.24,
            h: 0.24,
          });

          d.addText(impactTotal.value, {
            x: 1.85,
            y: wy,
            w: 5.0,
            h: 1.1,
            fontFace: "Georgia",
            fontSize: 34,
            bold: true,
            color: C.white,
            margin: 0,
            valign: "mid",
            fit: "shrink",
          });

          d.addShape(p.ShapeType.line, {
            x: 7.0,
            y: wy + 0.3,
            w: 0,
            h: 0.5,
            line: { color: C.mint, transparency: 55, width: 1 },
          });

          d.addText(impactTotal.label, {
            x: 7.3,
            y: wy,
            w: 5.0,
            h: 1.1,
            fontFace: "Arial",
            fontSize: 16,
            color: "E0EFEC",
            margin: 0,
            valign: "mid",
          });
        }

        if (false) {
          d.addText(titles[i] ?? x.title, {
            x: 0.72,
            y: 1.67,
            w: 5.3,
            h: 0.8,
            fontFace: "Georgia",
            fontSize: 32,
            bold: true,
            color: C.white,
            margin: 0,
          });

          d.addText(x.big ?? "", {
            x: 0.72,
            y: 2.7,
            w: 5.1,
            h: 0.8,
            fontFace: "Georgia",
            fontSize: 42,
            bold: true,
            color: C.mint,
            margin: 0,
          });

          d.addText(x.sub ?? "", {
            x: 0.74,
            y: 3.5,
            w: 4.2,
            h: 0.28,
            fontFace: "Arial",
            fontSize: 13,
            color: "B5CECB",
            margin: 0,
          });

          addBullets(d, x.bullets, 0.76, 4.08, 5.15, true, 11.8);

          if (x.chart) {
            d.addShape(p.ShapeType.roundRect, {
              x: 6.15,
              y: 1.46,
              w: 6.45,
              h: 4.95,
              rectRadius: 0.08,
              line: { color: "31595A", width: 1 },
              fill: { color: "0A3334" },
            });

            d.addChart(
              p.charts.BAR,
              [
                {
                  name: "Annual impact",
                  labels: x.chart.labels,
                  values: x.chart.values,
                },
              ],
              {
                x: 6.45,
                y: 1.9,
                w: 5.82,
                h: 4.05,
                barDir: "col",
                chartColors: ["7FD3D0"],
                showValue: true,
                showLegend: false,
                showTitle: false,
                catAxisLabelColor: "D7E8E5",
                valAxisLabelColor: "9AB9B6",
                valGridLine: { color: "31595A", transparency: 20 },
                chartLineColor: "31595A",
                dataLabelColor: "FFFFFF",
                dataLabelPosition: "outEnd",
                dataLabelFormatCode: "£0.0,,\"M\"",
                valAxisMinVal: 0,
              },
            );
          }
        }

 

        if (x.layout === "proof") {
          d.addText(titles[i] ?? x.title, {
            x: 0.72,
            y: 1.68,
            w: 9.5,
            h: 0.8,
            fontFace: "Georgia",
            fontSize: 34,
            bold: true,
            color: C.white,
            margin: 0,
          });

          d.addText(x.sub ?? "", {
            x: 0.74,
            y: 2.55,
            w: 6,
            h: 0.3,
            fontFace: "Arial",
            fontSize: 13,
            color: "B5CECB",
            margin: 0,
          });

          const cards = chosen.length ? chosen.slice(0, 3) : proof.slice(0, 3);
          const gap = 0.3;
          const cw = (11.9 - gap * 2) / 3;

          cards.forEach((item, index) => {
            const cx = 0.7 + index * (cw + gap);
            const cy = 3.15;

            d.addShape(p.ShapeType.roundRect, {
              x: cx,
              y: cy,
              w: cw,
              h: 3.45,
              rectRadius: 0.08,
              line: { color: "31595A", width: 1 },
              fill: { color: "0A3334" },
            });

            if (logos[item.id]) {
              d.addImage({
                data: logos[item.id],
                x: cx + 0.3,
                y: cy + 0.3,
                w: 1.9,
                h: 0.36,
                sizing: { type: "contain", w: 1.9, h: 0.36 },
              });
            } else {
              d.addText(item.name, {
                x: cx + 0.3,
                y: cy + 0.3,
                w: cw - 0.6,
                h: 0.36,
                fontFace: "Arial",
                fontSize: 13,
                bold: true,
                color: C.white,
                margin: 0,
              });
            }

            d.addShape(p.ShapeType.line, {
              x: cx + 0.3,
              y: cy + 0.9,
              w: cw - 0.6,
              h: 0,
              line: { color: "31595A", width: 1 },
            });

            d.addText(item.stat, {
              x: cx + 0.3,
              y: cy + 1.1,
              w: cw - 0.6,
              h: 0.6,
              fontFace: "Georgia",
              fontSize: 28,
              bold: true,
              color: C.white,
              margin: 0,
              valign: "mid",
            });

            d.addText(item.line, {
              x: cx + 0.3,
              y: cy + 1.75,
              w: cw - 0.6,
              h: 0.5,
              fontFace: "Arial",
              fontSize: 11.5,
              color: "B5CECB",
              margin: 0,
              valign: "top",
            });

            d.addShape(p.ShapeType.roundRect, {
              x: cx + 0.3,
              y: cy + 2.5,
              w: 0.5,
              h: 0.5,
              rectRadius: 0.08,
              line: { color: C.mint, width: 1 },
              fill: { color: "0A3334" },
            });

            d.addText("✓", {
              x: cx + 0.3,
              y: cy + 2.5,
              w: 0.5,
              h: 0.5,
              fontFace: "Arial",
              fontSize: 13,
              bold: true,
              color: C.mint,
              align: "center",
              valign: "mid",
              margin: 0,
            });

            d.addText(item.note, {
              x: cx + 0.95,
              y: cy + 2.45,
              w: cw - 1.25,
              h: 0.6,
              fontFace: "Arial",
              fontSize: 10.5,
              color: "E0EFEC",
              margin: 0,
              valign: "mid",
            });

            if (item.href) {
              d.addText("Read the case study →", {
                x: cx + 0.3,
                y: cy + 3.08,
                w: cw - 0.6,
                h: 0.25,
                fontFace: "Arial",
                fontSize: 10,
                bold: true,
                color: C.mint,
                margin: 0,
                hyperlink: { url: item.href, tooltip: item.name },
              });
            }
          });
        }
  

             if (x.layout === "risks") {
          d.addText(titles[i] ?? x.title, {
            x: 0.72,
            y: 1.68,
            w: 11.9,
            h: 0.9,
            fontFace: "Georgia",
            fontSize: 34,
            bold: true,
            color: C.ink,
            margin: 0,
          });

          x.bullets.forEach((item, index) => {
            const [risk, action] = item.split(":");
            const yy = 2.9 + index * 0.98;

            d.addShape(p.ShapeType.roundRect, {
              x: 0.7,
              y: yy,
              w: 11.9,
              h: 0.82,
              rectRadius: 0.08,
              line: { color: "DCE6E3", width: 1 },
              fill: { color: "FFFFFF" },
            });

            d.addText(String(index + 1).padStart(2, "0"), {
              x: 0.95,
              y: yy,
              w: 0.5,
              h: 0.82,
              fontFace: "Arial",
              fontSize: 11,
              bold: true,
              color: C.teal,
              margin: 0,
              valign: "mid",
            });

            d.addShape(p.ShapeType.roundRect, {
              x: 1.6,
              y: yy + 0.14,
              w: 0.54,
              h: 0.54,
              rectRadius: 0.1,
              line: { color: "E8F5F2", transparency: 100 },
              fill: { color: "E8F5F2" },
            });

            d.addImage({
              data: riskPngs[index] ?? riskPngs[0],
              x: 1.73,
              y: yy + 0.27,
              w: 0.28,
              h: 0.28,
            });

            d.addText(risk ?? item, {
              x: 2.5,
              y: yy,
              w: 3.2,
              h: 0.82,
              fontFace: "Georgia",
              fontSize: 15,
              bold: true,
              color: C.ink,
              margin: 0,
              valign: "mid",
            });

            d.addShape(p.ShapeType.line, {
              x: 5.85,
              y: yy + 0.2,
              w: 0,
              h: 0.42,
              line: { color: "DCE6E3", width: 1 },
            });

            d.addText(action?.trim() ?? "", {
              x: 6.15,
              y: yy,
              w: 6.2,
              h: 0.82,
              fontFace: "Arial",
              fontSize: 13,
              color: "5F716E",
              margin: 0,
              valign: "mid",
            });
          });
        }

             if (x.layout === "next") {
          d.addText(titles[i] ?? x.title, {
            x: 0.72,
            y: 1.7,
            w: 11.9,
            h: 0.9,
            fontFace: "Georgia",
            fontSize: 34,
            bold: true,
            color: C.white,
            margin: 0,
          });

          d.addText(x.sub ?? "", {
            x: 0.74,
            y: 2.67,
            w: 6,
            h: 0.32,
            fontFace: "Arial",
            fontSize: 14,
            color: "B5CECB",
            margin: 0,
          });

          const gap = 0.3;
          const cw = (11.9 - gap * 2) / 3;

          nextSteps.forEach((item, index) => {
            const cx = 0.7 + index * (cw + gap);
            const cy = 3.4;

            d.addShape(p.ShapeType.roundRect, {
              x: cx,
              y: cy,
              w: cw,
              h: 2.9,
              rectRadius: 0.08,
              line: { color: "31595A", width: 1 },
              fill: { color: "0A3334" },
            });

            d.addShape(p.ShapeType.ellipse, {
              x: cx + 0.3,
              y: cy + 0.3,
              w: 0.44,
              h: 0.44,
              line: { color: C.mint, width: 1 },
              fill: { color: "0A3334" },
            });

            d.addText(String(index + 1).padStart(2, "0"), {
              x: cx + 0.3,
              y: cy + 0.3,
              w: 0.44,
              h: 0.44,
              fontFace: "Arial",
              fontSize: 9,
              bold: true,
              color: C.mint,
              align: "center",
              valign: "mid",
              margin: 0,
            });

            d.addShape(p.ShapeType.roundRect, {
              x: cx + 0.9,
              y: cy + 0.3,
              w: 0.44,
              h: 0.44,
              rectRadius: 0.08,
              line: { color: "31595A", width: 1 },
              fill: { color: "123F40" },
            });

            d.addImage({
              data: nextPngs[index],
              x: cx + 1.01,
              y: cy + 0.41,
              w: 0.22,
              h: 0.22,
            });

            d.addText(item.title, {
              x: cx + 0.3,
              y: cy + 1.1,
              w: cw - 0.6,
              h: 0.5,
              fontFace: "Georgia",
              fontSize: 16,
              bold: true,
              color: C.white,
              margin: 0,
              valign: "mid",
            });

            d.addText(item.detail, {
              x: cx + 0.3,
              y: cy + 1.65,
              w: cw - 0.6,
              h: 0.4,
              fontFace: "Arial",
              fontSize: 11.5,
              color: "B5CECB",
              margin: 0,
              valign: "top",
            });

            if (item.href && item.url) {
              d.addText(item.url, {
                x: cx + 0.3,
                y: cy + 2.05,
                w: cw - 0.6,
                h: 0.35,
                fontFace: "Arial",
                fontSize: 11.5,
                color: C.mint,
                margin: 0,
                valign: "top",
                hyperlink: { url: item.href, tooltip: item.title },
              });
            }

            d.addShape(p.ShapeType.line, {
              x: cx + 0.3,
              y: cy + 2.65,
              w: 0.5,
              h: 0,
              line: { color: C.mint, width: 2 },
            });
          });
        }
        addFooter(d, i + 1, dark);
      });

      await p.writeFile({ fileName: "maki-executive-summary.pptx" });
    } finally {
      setBusy(false);
    }
  }

  const thumbRef = useRef<HTMLDivElement>(null);
  const [thumbScale, setThumbScale] = useState(0.1);

  useEffect(() => {
    const el = thumbRef.current;
    if (!el) return;
    const update = () => setThumbScale(el.clientWidth / 1280);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);


    const renderSlide = (
    sl: Slide,
    active: number,
    scale: number,
    editable = false,
  ) => (
    <div
      className={`deckSlide slide-${sl.layout}`}
      style={{ transform: `scale(${scale})` }}
    >
      <div className="dsTop">
        <img
          className="dsLogo"
          src={
            sl.layout === "impact" ||
            sl.layout === "proof" ||
            sl.layout === "next"
              ? deckAssets.logoWhite
              : deckAssets.logo
          }
          alt="Maki"
        />

        <div className="dsTopRight">
          <span>CONFIDENTIAL</span>
          <span>{active + 1} / {slides.length}</span>
        </div>
      </div>

      <div className="dsBody">
        <div className="dsMain">
          <span className="dsKicker">{sl.kicker}</span>

          <textarea
            aria-label="Slide title"
            rows={2}
            readOnly={!editable}
            tabIndex={editable ? 0 : -1}
            value={titles[active] ?? sl.title}
            onChange={(e) =>
              setTitles({ ...titles, [active]: e.target.value })
            }
          />

          {sl.sub && !sl.big && <p className="dsSub">{sl.sub}</p>}

          {sl.layout === "impact" && (
            <p className="dsSub">
              Based on the assumptions and scenario used in your model.
            </p>
          )}

          {sl.layout === "current" && (
            <p className="dsLead">
    The current model captures screening effort, hiring volume, time to hire and early attrition across the roles in scope.
            </p>
          )}

          {sl.big && sl.layout !== "current" && sl.layout !== "impact" && (
            <div className="dsBig">
              <strong>{sl.big}</strong>
              {sl.sub && <span>{sl.sub}</span>}
            </div>
          )}

          {sl.layout === "current" ? null : sl.layout === "impact" ? (
            <div className="dsImpact">
              {impactCards.map((item) => (
                <div className="dsImpactCard" key={item.label}>
                  <div className="dsImpactTop">
                    <Icon name={item.icon} />
                    <i />
                  </div>
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                </div>
              ))}

              <div className="dsImpactTotal">
                <Icon name={impactTotal.icon} />
                <strong>{impactTotal.value}</strong>
                <span>{impactTotal.label}</span>
              </div>
            </div>
          ) : sl.layout === "proof" && chosen.length > 0 ? (
            <div className="dsProof">
              {chosen.slice(0, 3).map((item) => (
                <div className="dsProofCard" key={item.id}>
                  {item.logo ? (
                    <img
                      className="dsProofLogo"
                      src={item.logo}
                      alt={item.name}
                    />
                  ) : (
                    <span className="dsProofName">{item.name}</span>
                  )}
                  <i className="dsProofRule" />
                  <strong>{item.stat}</strong>
                  <p>{item.line}</p>
                  <div className="dsProofNote">
                    <Icon name={item.icon as IconName} />
                    <span>{item.note}</span>
                  </div>
                  {item.href && (
                    <a
                      className="dsProofLink"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read the case study <Arrow />
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : sl.layout === "risks" ? (
            <div className="dsRiskList">
              {sl.bullets.map((bullet, index) => {
                const [label, detail] = bullet.split(":");
                return (
                  <div className="dsRiskRow" key={bullet}>
                    <em>{String(index + 1).padStart(2, "0")}</em>
                    <Icon name={riskIcons[index] ?? "check"} />
                    <strong>{label}</strong>
                    <p>{detail?.trim()}</p>
                  </div>
                );
              })}
            </div>
          ) : sl.layout === "next" ? (
            <div className="dsNext">
              {nextSteps.map((item, index) => (
                <div className="dsNextCard" key={item.title}>
                  <div className="dsNextTop">
                    <span className="dsNextNum">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon name={item.icon} />
                  </div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  {item.href && item.url && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.url}
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <ul className="dsList">
              {sl.bullets.map((bullet, bi) => (
                <li key={bullet}>
                  {sl.bulletIcons?.[bi] ? (
                    <Icon name={sl.bulletIcons[bi]} />
                  ) : (
                    <span />
                  )}
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>

        {sl.layout === "current" ? (
          <div className="dsCards">
            {[
              ["clock", "Screening effort", num(Math.round((apps * mins) / 60)), "recruiter hours per year"],
              ["people", "Hires", num(hires), "across the roles in scope"],
              ["calendar", "Time to hire", `${num(days)} days`, "from role open to accepted offer"],
              ["refresh", "Early attrition", `${attr}%`, "of new hires leave early"],
            ].map(([icon, label, value, note]) => (
              <div className="dsCard" key={label}>
                <Icon name={icon as IconName} />
                <small>{label}</small>
                <strong>{value}</strong>
                <p>{note}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="dsVisual" aria-hidden="true">
            <div className="dsVisualGlow" />
            <img src={sl.visual} alt="" />
          </div>
        )}
      </div>

      <div className="dsFoot">
        <span>
          {new Date().toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </span>

        <span>Maki · Executive summary</span>

        <strong>{String(active + 1).padStart(2, "0")}</strong>
      </div>
    </div>
  );

  const bars = [
    ["Recruiter capacity", c.capacity],
    ["Faster time to hire", c.vacancy],
    ["Total annual benefit", c.annual],
  ] as const;

  const chartMax = Math.max(
    3_000_000,
    Math.ceil(Math.max(c.annual, 1) / 3_000_000) * 3_000_000,
  );

  const chartTicks = [1, 0.75, 0.5, 0.25, 0];

  const nextStep = () => setStep((current) => Math.min(4, current + 1) as StepId);
  const previousStep = () => setStep((current) => Math.max(1, current - 1) as StepId);

  return (
    <article className="bc" ref={root}>
      <style>{css}</style>

      <header className="hero">
        <div className="wrap hgrid">
          <div className="hcopy">
            <p className="eye">WHAT COULD FASTER HIRING BE WORTH?</p>
            <h1>Build a defensible business case for hiring transformation.</h1>
            <p className="deck">
       Give Finance and leadership a more credible case for change, with a clearer view of potential savings, operational capacity and the business value of faster hiring outcomes.
            </p>
            <div className="btns">
              <a className="btn" href="#model">
                Build your business case <Arrow />
              </a>
           <a
  className="btn ghost"
  href="https://www.makipeople.com/demo"
  target="_blank"
  rel="noopener noreferrer"
>
  Book a demo
</a>
            </div>
 
          </div>

          <div className="dash" aria-hidden="true">
            <div className="heroFrame">
              <img
                className="heroimg"
                src="/images/maki-exec-summary.png"
                alt=""
                width={1200}
                height={800}
              />
            </div>
 
          </div>
        </div>

        <div className="wrap trust">
          <p>TRUSTED BY GLOBAL ENTERPRISES</p>
          <div>
            {trusted.map((brand) => (
              <span key={brand.name}>
                {brand.src ? (
                  <img
                    src={brand.src}
                    alt={brand.name}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  brand.name
                )}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="sec modelSec" id="model">
        <div className="wrap">
          <div className="modelTop" data-r>
            <div className="modelIntro">
           
           
       <div className="modelTitleRow">
  <h2>
 Establish the baseline for
    <br />
 your hiring business case.
  </h2>
</div>
           
              <p>
Enter the core operating data behind your current hiring process. We’ll use it to model the potential impact on capacity, hiring speed and associated costs.
              </p>
            </div>

          </div>

          <div className="calculator" data-r>
            <nav className="stepRail" aria-label="Business case steps">
              <div className="stepTrack" aria-hidden="true" />
              {steps.map((item) => {
                const isActive = step === item.id;
                const isDone = step > item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`railStep ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
                    onClick={() => setStep(item.id)}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <span className="railNumber">
                      {isDone ? <Tick /> : item.id}
                    </span>
                    <span className="railCopy">
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="stepCard" aria-live="polite">
              <div className="stepCardTop">
                <p>STEP {step} OF 4</p>
                <div className="stepProgress" aria-hidden="true">
                  <i style={{ width: `${step * 25}%` }} />
                </div>
               </div>

              <div className="stepCardBody">
                <div className="stepMain">

              {step === 1 && (
                <div className="stepPanel" key="step-1">
                  <div className="stepHeading">
                    <h3>Hiring volume</h3>
                    <p>Start with a few key numbers about your current hiring.</p>
                  </div>

                 <div className="fieldStack">
  <Field
    icon="hires"
    label="Annual applications"
    help="The total number of completed applications received for roles in scope over a 12-month period. Use your ATS total and exclude job views, abandoned applications and obvious duplicates."
    value={apps}
    set={setApps}
  />

  <Field
    icon="people"
    label="Annual hires"
    help="The total number of candidates hired into roles in scope over the same 12-month period. Use accepted offers or employee starts, whichever your organisation reports most consistently."
    value={hires}
    set={setHires}
  />

  <Field
    icon="globe"
    label="Markets / business units"
    help="The number of distinct countries, regions or business units included in the hiring model. Count separate hiring operations where process, ownership, language or assessment requirements materially differ."
    value={units}
    set={setUnits}
  />
</div>

                  <div className="stepInsight">
                    <Icon name="spark" />
                    <p>
                      These numbers help us estimate the scale of hiring activity
                      Maki can support across your organisation.
                    </p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="stepPanel" key="step-2">
                  <div className="stepHeading">
                    <h3>Recruiter effort</h3>
                    <p>Now quantify the work tied up in screening and open roles.</p>
                  </div>

                 <div className="fieldStack">
  <Field
    icon="clock"
    label="Screening minutes per applicant"
    help="The average recruiter time spent reviewing and deciding whether one applicant should progress past the initial screening stage. Include CV review, basic eligibility checks and first-screen admin, but exclude interviews."
    value={mins}
    set={setMins}
    suffix="mins"
  />

  <Field
    icon="money"
    label="Loaded recruiter cost per hour"
    help="The estimated hourly cost of the recruiter time used for screening. Include salary, employer costs and relevant overhead, then divide the annual loaded cost by productive working hours."
    value={rate}
    set={setRate}
    prefix="£"
  />

  <Field
    icon="calendar"
    label="Current time-to-hire"
    help="The average number of calendar days it takes to fill a role, measured from the role opening to an accepted offer. Use your ATS average for the same roles and 12-month period used elsewhere in the model."
    value={days}
    set={setDays}
    suffix="days"
  />
</div>

                  <div className="stepInsight">
                    <Icon name="clock" />
                    <p>
                      We use these inputs to model recruiter capacity and the cost
                      of roles staying vacant for longer.
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="stepPanel" key="step-3">
                  <div className="stepHeading">
                    <h3>Cost impact</h3>
                    <p>Put a value on attrition, vacancy time and the investment.</p>
                  </div>
<div className="fieldStack">
  <Field
    icon="trend"
    label="Early attrition rate"
    help="The percentage of new hires who leave within your organisation’s defined early-tenure period, such as the first 90 days, six months or first year. Use the same definition and reporting window your HR or Finance team already tracks."
    value={attr}
    set={setAttr}
    suffix="%"
    max={100}
  />

  <Field
    icon="refresh"
    label="Replacement cost per failed hire"
    help="The average cost of replacing a new hire who leaves during the early-tenure period. Include repeat recruitment, onboarding and training costs, plus any external agency or assessment spend you normally attribute to replacement."
    value={replace}
    set={setReplace}
    prefix="£"
  />

  <Field
    icon="coins"
    label="Cost of a vacant role per day"
    help="The estimated business cost for each day a role remains unfilled. This can include lost productivity, overtime, contractor cover or delayed revenue; use a figure your Finance team can reasonably defend."
    value={vac}
    set={setVac}
    prefix="£"
  />

  <Field
    icon="spark"
    label="Annual Maki cost (optional)"
    help="The expected annual cost of Maki for the roles, markets or business units included in this model. Add your quoted or budgeted annual cost to calculate the net three-year benefit after platform spend."
    value={cost}
    set={setCost}
    prefix="£"
  />
</div>
                </div>
              )}

              {step === 4 && (
                <div className="stepPanel reviewPanel" key="step-4">
                  <div className="stepHeading">
                    <h3>Review Your Model</h3>
                    <p>Check the assumptions before using the numbers internally.</p>
                  </div>

                  <div className="reviewGroups">
                    <div className="reviewGroup">
                      <p>Hiring volume</p>
                      <ReviewLine
                        label="Annual applications"
                        value={num(apps)}
                        onEdit={() => setStep(1)}
                      />
                      <ReviewLine
                        label="Annual hires"
                        value={num(hires)}
                        onEdit={() => setStep(1)}
                      />
                      <ReviewLine
                        label="Markets / business units"
                        value={num(units)}
                        onEdit={() => setStep(1)}
                      />
                    </div>

                    <div className="reviewGroup">
                      <p>Recruiter effort</p>
                      <ReviewLine
                        label="Screening"
                        value={`${num(mins)} mins / applicant`}
                        onEdit={() => setStep(2)}
                      />
                      <ReviewLine
                        label="Recruiter cost"
                        value={`${gbp(rate)} / hour`}
                        onEdit={() => setStep(2)}
                      />
                      <ReviewLine
                        label="Time-to-hire"
                        value={`${num(days)} days`}
                        onEdit={() => setStep(2)}
                      />
                    </div>

                    <div className="reviewGroup">
                      <p>Cost impact</p>
                      <ReviewLine
                        label="Early attrition"
                        value={`${num(attr)}%`}
                        onEdit={() => setStep(3)}
                      />
                      <ReviewLine
                        label="Replacement cost"
                        value={gbp(replace)}
                        onEdit={() => setStep(3)}
                      />
                      <ReviewLine
                        label="Vacant role / day"
                        value={gbp(vac)}
                        onEdit={() => setStep(3)}
                      />
                    </div>
                  </div>
                </div>
              )}
                </div>

                <aside className="quickTips">
                  <div>
                    <div className="quickTipsHead">
                      <span>QUICK TIPS</span>
                      <h4>Build A Defensible Model</h4>
                    </div>

                    <div className="tipList">
                      {stepTips[step].map((tip, i) => (
                        <div className="tipItem" key={tip.title}>
                          <span className="tipNum">0{i + 1}</span>
                          <div>
                            <strong>{tip.title}</strong>
                            <p>{tip.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="quickTipsFooter">
                    <div className="stepActions">
                      {step > 1 ? (
                        <button
                          className="backBtn"
                          type="button"
                          onClick={previousStep}
                        >
                          ← Back
                        </button>
                      ) : (
                        <span />
                      )}

                      {step < 4 ? (
                        <button
                          className="nextBtn"
                          type="button"
                          onClick={nextStep}
                        >
                          Next: {steps[step].title} <Arrow />
                        </button>
                      ) : (
                        <a className="nextBtn" href="#summary">
                          Use this model <Arrow />
                        </a>
                      )}
                    </div>

                    <span className="stepCount">
                      Step {step} of 4
                    </span>
                  </div>
                </aside>
              </div>
            </div>




<aside className="impactPanel">
  <div className="impactHead">
    <div>
      <h3>Your Potential Impact</h3>
      <p>
        Based on your inputs, here’s what Maki could deliver for your organisation.
      </p>
    </div>

    <div className="seg" role="group" aria-label="Impact scenario">
      {(Object.keys(SCN) as Scn[]).map((key) => (
        <button
          key={key}
          type="button"
          aria-pressed={scn === key}
          onClick={() => setScn(key)}
        >
          {SCN[key].label}
        </button>
      ))}
    </div>
  </div>

  <div className="kpis">
    <div className="kpi">
      <span className="kpiLabel">
        Recruiter hours saved
        <span className="tipIcon" tabIndex={0} role="button" aria-label="How recruiter hours saved is calculated">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 7.5v.01" />
          </svg>
      <span className="tipBubble" role="tooltip">
  <b>What it measures:</b> recruiter time freed up each year once Maki handles first-pass screening.
  <br /><br />
  <b>How it&apos;s calculated:</b> {num(apps)} applications × {mins} minutes per screen ÷ 60 = {num(Math.round((apps * mins) / 60))} hours of screening today. Under the {s.label} scenario, Maki removes {s.screen}% of that work.
  <br /><br />
  <b>Result:</b> {num(Math.round((apps * mins) / 60))} × {s.screen}% = {num(c.hours)} hours.
</span>
        </span>
      </span>

      <b className="kpiValue">
        {num(c.hours)}
      </b>

      <p className="kpiDescription">
        Recruiter hours saved
        <br />
        per year.
      </p>
    </div>

    <div className="kpi">
      <span className="kpiLabel">
        Vacancy capacity created
        <span className="tipIcon" tabIndex={0} role="button" aria-label="How vacancy capacity created is calculated">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 7.5v.01" />
          </svg>
   <span className="tipBubble" role="tooltip">
  <b>What it measures:</b> the value created by filling roles faster and restoring productive capacity sooner. This represents additional operating capacity, rather than direct cost savings.
  <br /><br />
  <b>How it&apos;s calculated:</b> your time-to-hire of {num(days)} days × {s.time}% faster under the {s.label} scenario = {c.daysSaved} fewer vacant days per hire. {num(hires)} hires × {c.daysSaved} days × {gbp(vac)} per vacant day.
  <br /><br />
  <b>Result:</b> {gbp(c.vacancy)}.
</span>
        </span>
      </span>

      <b className="kpiValue">
        {gbp(c.vacancy)}
      </b>

      <p className="kpiDescription">
        Vacancy capacity created
        <br />
        per year.
      </p>
    </div>

    <div className="kpi">
      <span className="kpiLabel">
        Faster time-to-hire
        <span className="tipIcon" tabIndex={0} role="button" aria-label="How faster time-to-hire is calculated">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 7.5v.01" />
          </svg>
        <span className="tipBubble" role="tooltip">
  <b>What it measures:</b> how much shorter your hiring cycle becomes.
  <br /><br />
  <b>How it&apos;s calculated:</b> your current time-to-hire of {num(days)} days × {s.time}% faster under the {s.label} scenario = {c.daysSaved} days saved. {num(days)} − {c.daysSaved} = {c.after} days.
  <br /><br />
  <b>Result:</b> {Math.round((c.daysSaved / days) * 100)}% faster, or {num(days)} days down to {c.after} days.
</span>
        </span>
      </span>

      <b className="kpiValue">
        {days ? Math.round((c.daysSaved / days) * 100) : 0}%
      </b>

      <p className="kpiDescription">
        Faster time-to-hire
        <br />
        <span>
          {num(days)} → {num(c.after)} days.
        </span>
      </p>
    </div>

    <div className="kpi hi">
      <span className="kpiLabel">
        {cost > 0 ? "Net estimated benefit" : "Total estimated benefit"}
        <span className="tipIcon" tabIndex={0} role="button" aria-label="How the total estimated benefit is calculated">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 7.5v.01" />
          </svg>
         <span className="tipBubble" role="tooltip">
  <b>What it measures:</b> the combined financial impact across recruiter capacity, vacancy days and reduced early attrition, over three years.
  <br /><br />
  <b>How it&apos;s calculated:</b> {gbp(c.capacity)} recruiter capacity + {gbp(c.vacancy)} vacancy capacity + {gbp(c.attrition)} early attrition = {gbp(c.annual)} per year. × 3 years.
  {cost > 0 && (
    <>
      <br /><br />
      <b>Maki cost:</b> {gbp(cost)} per year × 3 = {gbp(cost * 3)} deducted.
      <br /><br />
      <b>Result:</b> {gbp(c.three)} − {gbp(cost * 3)} = {gbp(c.net3)} net.
    </>
  )}
  {cost === 0 && (
    <>
      <br /><br />
      <b>Result:</b> {gbp(c.three)} before Maki cost. Add your annual Maki cost in Step 3 to see the net figure.
    </>
  )}
</span>
        </span>
      </span>

      <b className="kpiValue">
        {gbp(cost > 0 ? c.net3 : c.three)}
      </b>

      <p className="kpiDescription">
        {cost > 0 ? "Net estimated benefit" : "Total estimated benefit"}
        <br />
        over 3 years.
      </p>
    </div>
  </div>

  <div className="impactChartArea">
    <div className="chartTitleRow">
      <p>Annual Financial Impact</p>

      <span
        className="tipIcon"
        tabIndex={0}
        role="button"
        aria-label="How the annual financial impact chart is calculated"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5M12 7.5v.01" />
        </svg>
        <span className="tipBubble" role="tooltip">
          <b>How each bar is calculated</b>
          <br />
          All figures use the {s.label.toLowerCase()} scenario.
          <br /><br />

          <b>1. Recruiter capacity: {short(c.capacity)}</b>
          <br />
          {num(apps)} applications × {mins} min screening ÷ 60 ={" "}
          {num(Math.round((apps * mins) / 60))} hrs today. Maki removes{" "}
          {s.screen}% → {num(c.hours)} hrs × {gbp(rate)}/hr ={" "}
          {gbp(c.capacity)}.
          <br /><br />

          <b>2. Faster time to hire: {short(c.vacancy)}</b>
          <br />
          {num(days)} days × {s.time}% faster = {c.daysSaved} days saved per
          hire. {num(hires)} hires × {c.daysSaved} days × {gbp(vac)}/day ={" "}
          {gbp(c.vacancy)}.
          <br /><br />

          <b>3. Early attrition: {short(c.attrition)}</b>
          <br />
          {num(hires)} hires × {attr}% leave early ={" "}
          {num(Math.round(hires * (attr / 100)))} leavers. Maki avoids{" "}
          {s.attr}% → {num(Math.round(hires * (attr / 100) * (s.attr / 100)))}{" "}
          × {gbp(replace)} = {gbp(c.attrition)}.
          <br /><br />

          <b>Total annual benefit: {short(c.annual)}</b>
          <br />
          {short(c.capacity)} + {short(c.vacancy)} + {short(c.attrition)} ={" "}
          {short(c.annual)} per year. × 3 years = {short(c.three)}.
          <br /><br />

          <b>Note:</b>
          <br />
          The third bar shows the total, including early attrition. Attrition
          is not drawn as a separate bar.
        </span>
      </span>
    </div>

    <div
      className="chartShell"
      role="img"
      aria-label={`Annual impact: recruiter capacity ${gbp(c.capacity)}; faster hiring ${gbp(c.vacancy)}; total ${gbp(c.annual)}, including ${gbp(c.attrition)} in early attrition benefit.`}
    >
      <div className="axis">
        {chartTicks.map((tick) => (
          <span key={tick}>
            {tick === 0 ? "£0" : short(chartMax * tick)}
          </span>
        ))}
      </div>

      <div className="chartPlot">
        <div className="gridLines">
          {chartTicks.map((tick) => (
            <i key={tick} />
          ))}
        </div>

        <div className="chart">
          {bars.map(([label, value], i) => (
            <div
              className="barItem"
              key={label}
              style={
                {
                  "--bar-height": `${(value / chartMax) * 100}%`,
                } as CSSProperties
              }
            >
              <em>{short(value)}</em>

              <i
                className={
                  i === bars.length - 1
                    ? "bar tot"
                    : i === 0
                      ? "bar light"
                      : "bar"
                }
                style={{
                  height: `${(value / chartMax) * 100}%`,
                }}
              />

              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="impactNote">
      <span className="impactNoteMark" aria-hidden="true" />

      <p>
Conservative and Base use lower estimates than Maki’s published results of 45% faster hiring and 50% lower turnover. Ambitious uses those results in full. Benefits are shown annually for three years and exclude implementation effort.
      </p>
    </div>
  </div>
</aside>


          </div>
        </div>
      </section>

 

  


      <section className="sec summarySec" id="summary">
        <div className="wrap">
            <div className="sectionEyebrow" data-r>
            <i />
            EXECUTIVE SUMMARY
          </div>

          <div className="summaryHead" data-r>
            <h2>Present your business case in a format leadership can review.</h2>
            <p>
We turn your inputs and selected scenario into a six-slide executive summary, with the key numbers, supporting evidence and next steps ready for internal review.
            </p>
          </div>

          <div className="deckWrap" data-r>
            <div
              className="deckThumbs"
              role="tablist"
              aria-label="Executive summary slides"
            >
              {slides.map((x, i) => (
                <div
                  key={i}
                  role="tab"
                  tabIndex={0}
                  aria-selected={active === i}
                  aria-label={`Slide ${i + 1}: ${titles[i] ?? x.title}`}
                  className="deckThumb"
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(i);
                    }
                  }}
                >
                  <span className="thumbNum">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div
                    className="thumbCard"
                    ref={i === 0 ? thumbRef : undefined}
                    aria-hidden="true"
                  >
                    {renderSlide(x, i, thumbScale)}
                  </div>
                </div>
              ))}
            </div>

            <div className="deckStage">
              <div
                className="deckFrame"
                ref={deckRef}
                style={{ height: 720 * deckScale }}
              >
                
                
                
{renderSlide(sl, active, deckScale, true)}
              </div>

              <div className="deckBar">
                <div className="deckNav">
                  <button
                    type="button"
                    aria-label="Previous slide"
                    disabled={active === 0}
                    onClick={() =>
                      setActive((v) => Math.max(0, v - 1))
                    }
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m15 6-6 6 6 6" />
                    </svg>
                  </button>

                  <span>
                    Slide {active + 1} of {slides.length}
                  </span>

                  <button
                    type="button"
                    aria-label="Next slide"
                    disabled={active === slides.length - 1}
                    onClick={() =>
                      setActive((v) => Math.min(slides.length - 1, v + 1))
                    }
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  </button>
                </div>

                <div className="deckActions">
                  <button
                    className="deckBtn primary"
                    type="button"
                    onClick={download}
                    disabled={busy}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
                    </svg>

                    {busy
                      ? "Building your deck…"
                      : "Generate executive summary"}
                  </button>

                  <a
                    className="deckBtn ghost"
                    href={`mailto:?subject=${encodeURIComponent(
                      "Business case: Maki",
                    )}&body=${encodeURIComponent(summary)}`}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="6" cy="12" r="2.5" />
                      <circle cx="18" cy="6" r="2.5" />
                      <circle cx="18" cy="18" r="2.5" />
                      <path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" />
                    </svg>

                    Share with Finance
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec faqSec">
        <div className="wrap faqLayout">
          <div className="faqIntro" data-r>
            <div className="sectionEyebrow lightEye">
              <i />
              FAQ
            </div>
            <h2>Questions to resolve before taking the case forward.</h2>
            <p>
         Use these to challenge the assumptions, understand what could change the outcome and prepare for the practical questions that come up internally.
            </p>
            <a className="textAction darkLink" href={demoHref} target="_blank" rel="noreferrer">
              Ask Maki about your rollout <Arrow />
            </a>
          </div>

          <div className="faq" data-r>
            {faqs.map(([question, answer], index) => (
              <details key={question} open={openFaq === index}>
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenFaq(openFaq === index ? null : index);
                  }}
                >
                  <em className="faqNum">{String(index + 1).padStart(2, "0")}</em>
                  <span>{question}</span>
                  <i />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="final">
        <div className="wrap finalCard ctaCard" data-r>
          <div className="ctaCopy">
            <p className="ctaEyebrow">
              NEXT STEP <i />
            </p>
            <h2>
              Decide how to move 
              <br />
 forward with Maki.
            </h2>
            <p className="ctaText">
Give stakeholders a clear view of the case, the potential value and what needs to happen before moving forward.
            </p>
            <div className="ctaBtns">
              <a
                className="ctaBtn primary"
                href={demoHref}
                target="_blank"
                rel="noreferrer"
              >
                Request a Maki demo <Arrow />
              </a>
              <button
                type="button"
                className="ctaBtn ghost"
                onClick={download}
                disabled={busy}
              >
                {busy ? "Building your deck…" : "Download executive summary"}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
                </svg>
              </button>
            </div>
          </div>

          <ol className="ctaSteps">
            {[
              ["calendar", "Review the case", "Discuss the numbers with Maki."],
              ["hires", "Share internally", "Use the deck with stakeholders."],
              ["people", "Agree next steps", "Decide whether to start with a pilot."],
            ].map(([icon, title, text], i) => (
              <li className="ctaStep" key={title}>
                <div className="ctaIconRow">
                  <span className="ctaIcon">
                    <Icon name={icon as IconName} />
                  </span>
                </div>
                <span className="ctaNum">{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="wrap note">
          <p>
            <b>Portfolio note.</b> An independent concept by GrowUp, not
            published by or affiliated with Maki. 
          </p>
          <a href={portfolioHref}>Back to writing portfolio</a>
        </div>
      </section>
    </article>
  );
}

const css = `






.bc{
  --deep:#041b1c;
  --deep-2:#072426;
  --teal:#167273;
  --teal-2:#0d8585;
  --mint:#7fd3d0;
  --mint-soft:#eef8f6;
  --ink:#082b2b;
  --ink-2:#173b38;
  --mute:#5c7672;
  --line:#dfe9e6;
  --line-dark:rgba(127,211,208,.18);
  --shadow:0 18px 50px rgba(6,47,45,.07);
  background:#fff;
  color:var(--ink);
  font-family:Inter,"Helvetica Neue",Arial,sans-serif;
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
}
.bc,.bc *,.bc *:before,.bc *:after{box-sizing:border-box}
.bc :where(h1,h2,h3,p,ul,ol){margin:0;padding:0}
.bc ul,.bc ol{list-style:none}
.bc a{color:inherit;text-decoration:none}
.bc button,.bc input{font-family:inherit}
.bc button{color:inherit}
.bc svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:none}
.bc .wrap{width:min(1380px,calc(100% - 64px));margin-inline:auto}
.bc h1,.bc h2{font-family:Georgia,"Times New Roman",serif;font-weight:700;letter-spacing:-.047em;text-wrap:balance}
.bc h1{font-size:clamp(42px,5vw,72px);line-height:1.01}
.bc h2{font-size:clamp(34px,3.4vw,52px);line-height:1.04}
.bc h3{letter-spacing:-.025em}
.bc a:focus-visible,.bc button:focus-visible,.bc input:focus-visible,.bc summary:focus-visible{outline:3px solid var(--mint);outline-offset:3px}
.bc .eye{font-size:11px;font-weight:800;letter-spacing:.18em;color:var(--mint)}
.bc .btn{display:inline-flex;align-items:center;justify-content:center;gap:20px;min-height:54px;padding:14px 30px;border:1px solid var(--teal);border-radius:8px;background:var(--teal);color:#fff!important;font:750 14px Inter,Arial,sans-serif;letter-spacing:.02em;cursor:pointer;transition:transform .2s ease,background .2s ease,border-color .2s ease,box-shadow .2s ease}
.bc .btn:hover{background:#1b8586;border-color:#1b8586;transform:translateY(-2px);box-shadow:0 10px 24px rgba(22,114,115,.2)}
.bc .btn:disabled{opacity:.58;cursor:wait;transform:none;box-shadow:none}
.bc .btn.ghost{background:transparent;border-color:rgba(255,255,255,.3)}
.bc .btn.ghost:hover{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.5)}
.bc .btn.out{background:#fff;color:var(--teal)!important;border-color:#cfe0dc;box-shadow:none}
.bc .btn.out:hover{background:#f7fbfa;border-color:var(--teal)}
.bc .btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
.bc .tl,.bc .textAction{display:inline-flex;align-items:center;gap:9px;font-size:13px;font-weight:750;color:var(--mint)}
.bc .tl:hover,.bc .textAction:hover{gap:13px}
.bc .tl,.bc .textAction{transition:gap .2s ease}

/* HERO */
.bc .hero{position:relative;overflow:hidden;padding:118px 0 0;color:#fff;background:#041b1c}
.bc .hgrid{position:relative;z-index:1;display:grid;grid-template-columns:.92fr 1.08fr;gap:68px;align-items:center}
.bc .hcopy{max-width:660px;padding-bottom:38px}
.bc .hcopy h1{padding-top:18px}
@media(max-width:600px){.bc .hero .eye{padding-top:15px}}
.bc .deck{max-width:620px;margin-top:22px;color:#fafafa;font-size:18px;line-height:1.75;letter-spacing:.01em}
.bc .hcopy>*{animation:rise .8s cubic-bezier(.22,1,.36,1) both}
.bc .hcopy>:nth-child(2){animation-delay:.08s}.bc .hcopy>:nth-child(3){animation-delay:.16s}.bc .hcopy>:nth-child(4){animation-delay:.24s}.bc .hcopy>:nth-child(5){animation-delay:.32s}
@keyframes rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.bc .heroMicro{display:flex;flex-wrap:wrap;gap:12px 18px;margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,.12);color:#9fc2bf;font-size:11px}
.bc .heroMicro span{display:flex;align-items:center;gap:7px}.bc .heroMicro svg{width:13px;height:13px;color:var(--mint)}
.bc .dash{position:relative;min-width:0;padding:32px 0 56px}
   
   .bc .heroimg{display:block;width:100%;height:auto;border-radius:11px;object-fit:contain}
  
 .bc .trust{position:relative;z-index:1;padding:32px 0 38px; margin-top: -10px; border-top:1px solid rgba(255,255,255,.08)}
.bc .trust p{font-size:10px;font-weight:800;letter-spacing:.18em;color:#7da9a6}
.bc .trust div{display:grid;grid-template-columns:repeat(6,1fr);gap:22px;margin-top:17px}
.bc .trust span{display:flex;align-items:center;height:30px;font-size:17px;font-weight:750;letter-spacing:-.025em;color:#dbecea;opacity:.86}
.bc .trust img{display:block;height:26px;width:auto;max-width:160px;object-fit:contain;filter:brightness(0) invert(1)}

/* SHARED SECTION */
.bc .sec{padding:clamp(72px,7vw,108px) 0}
.bc .shead{max-width:780px}.bc .shead p{margin-top:14px;color:var(--mute);font-size:15px;line-height:1.7}
.bc .shead.split{max-width:none;display:flex;justify-content:space-between;align-items:flex-end;gap:34px}.bc .shead.split>div{max-width:760px}
.bc .sectionEyebrow{display:flex;align-items:center;gap:12px;margin-bottom:20px;color:var(--mint);font-size:10px;font-weight:800;letter-spacing:.17em}
.bc .sectionEyebrow span{display:grid;place-items:center;width:32px;height:32px;border:1px solid rgba(127,211,208,.25);border-radius:8px;background:rgba(127,211,208,.07);color:var(--mint);font-size:12px;letter-spacing:0}
.bc .sectionEyebrow i{display:block;width:30px;height:1px;background:rgba(127,211,208,.35)}
.bc .lightEye{color:var(--teal)}.bc .lightEye span{border-color:#d8ebe8;background:#eff8f6;color:var(--teal)}.bc .lightEye i{background:#c6dfdb}

 

  

/* SUMMARY */
.bc .summarySec{position:relative;overflow:hidden;color:#fff;background:radial-gradient(ellipse at 80% 10%,rgba(22,114,115,.3),transparent 45%),var(--deep)}
.bc .summaryHead{max-width:760px}.bc .summaryHead p{color:#a9c9c6}.bc .egrid{display:grid;grid-template-columns:1.08fr .92fr;gap:26px;align-items:start;margin-top:38px}
.bc .prev{padding:17px;border:1px solid rgba(127,211,208,.18);border-radius:13px;background:rgba(255,255,255,.035)}
.bc .previewTop{display:flex;justify-content:space-between;gap:18px;align-items:center;margin-bottom:14px}.bc .previewTop>div:first-child span{display:block;color:var(--mint);font-size:8px;font-weight:850;letter-spacing:.14em}.bc .previewTop>div:first-child p{margin-top:3px;color:#8fb1ae;font-size:9px}
.bc .tabs{display:flex;gap:6px}.bc .tabs button{display:grid;place-items:center;width:30px;height:30px;border:1px solid rgba(127,211,208,.24);border-radius:6px;background:transparent;color:#b4cecb;font-size:10px;font-weight:800;cursor:pointer}.bc .tabs button:hover{border-color:rgba(127,211,208,.5)}.bc .tabs [aria-selected=true]{background:var(--teal);border-color:var(--teal);color:#fff}
.bc .slide{position:relative;min-height:390px;padding:30px 32px 38px;border-radius:9px;background:#fff;color:var(--ink);overflow:hidden}.bc .slide:after{content:"";position:absolute;right:-90px;bottom:-130px;width:280px;height:280px;border-radius:50%;border:1px solid #e3efec;box-shadow:0 0 0 54px #f8fbfa,0 0 0 108px #fbfdfc;pointer-events:none}.bc .slideDark{background:linear-gradient(140deg,#062527,#041b1c);color:#fff}.bc .slideDark:after{border-color:rgba(127,211,208,.1);box-shadow:0 0 0 54px rgba(127,211,208,.025),0 0 0 108px rgba(127,211,208,.015)}
.bc .slideBrandRow{position:relative;z-index:1;display:flex;justify-content:space-between;gap:14px}.bc .brand{color:var(--teal);font-size:9px;font-weight:850;letter-spacing:.08em}.bc .slideDark .brand{color:var(--mint)}.bc .slideBrandRow>span{padding:4px 7px;border-radius:5px;background:#edf7f5;color:var(--teal);font-size:8px;font-weight:800}.bc .slideDark .slideBrandRow>span{background:rgba(127,211,208,.09);color:var(--mint)}
.bc .slide input{position:relative;z-index:1;width:92%;margin:18px 0 20px;padding:3px 0 7px;border:0;border-bottom:1px dashed #bfd2ce;outline:0;background:none;color:inherit;font:700 clamp(22px,2.5vw,34px) Georgia,"Times New Roman",serif;line-height:1.08;letter-spacing:-.04em}.bc .slideDark input{border-bottom-color:rgba(127,211,208,.28)}
.bc .sbig{position:relative;z-index:1;color:var(--teal);font-size:clamp(38px,4vw,58px);font-weight:800;letter-spacing:-.05em;line-height:1}.bc .slideDark .sbig{color:var(--mint)}.bc .sbig small{display:block;margin-top:7px;color:#6b817d;font:500 11px Inter,Arial,sans-serif;letter-spacing:0}.bc .slideDark .sbig small{color:#9fc0bd}.bc .ssub{position:relative;z-index:1;color:var(--teal);font-size:12px;font-weight:700}.bc .slideDark .ssub{color:var(--mint)}
.bc .slide ul{position:relative;z-index:1;display:grid;gap:9px;max-width:76%;margin-top:18px;color:#496762;font-size:11px}.bc .slideDark ul{color:#bed6d3}.bc .slide li{position:relative;padding-left:17px}.bc .slide li:before{content:"";position:absolute;left:0;top:.6em;width:6px;height:6px;border-radius:50%;background:var(--teal)}.bc .slideDark li:before{background:var(--mint)}
.bc .slideFooter{position:absolute;z-index:1;left:32px;right:32px;bottom:18px;display:flex;justify-content:space-between;padding-top:10px;border-top:1px solid #edf2f0;color:#8da09d;font-size:8px}.bc .slideDark .slideFooter{border-color:rgba(127,211,208,.14);color:#7da39f}
.bc .incl{padding:30px;border:1px solid rgba(127,211,208,.18);border-radius:13px;background:linear-gradient(160deg,rgba(255,255,255,.055),rgba(255,255,255,.028))}.bc .inclEye{color:var(--mint);font-size:8px;font-weight:850;letter-spacing:.15em}.bc .incl h3{max-width:430px;margin-top:10px;font-family:Georgia,"Times New Roman",serif;font-size:25px;line-height:1.18}.bc .incl ul{display:grid;gap:12px;margin:24px 0}.bc .incl li{display:flex;gap:11px;align-items:center;color:#c5dbd8;font-size:11px}.bc .tickCircle{display:grid;place-items:center;width:22px;height:22px;flex:0 0 22px;border-radius:50%;background:rgba(127,211,208,.08);color:var(--mint)}.bc .tickCircle svg{width:12px;height:12px}
.bc .summaryValue{padding:18px;border-top:1px solid rgba(127,211,208,.14);border-bottom:1px solid rgba(127,211,208,.14);background:rgba(0,0,0,.06)}.bc .summaryValue span{display:block;color:#88aaa6;font-size:9px}.bc .summaryValue strong{display:block;margin-top:5px;color:#fff;font-family:Georgia,"Times New Roman",serif;font-size:34px;line-height:1.05;letter-spacing:-.04em}.bc .summaryValue small{display:block;margin-top:5px;color:#7fa6a2;font-size:8px}
.bc .summaryActions{display:grid;gap:13px;margin-top:22px}.bc .summaryActions .btn{width:100%}.bc .summaryActions .textAction{justify-content:center;color:var(--mint)}.bc .downloadNote{display:block;margin-top:15px;color:#769b97;font-size:8px;line-height:1.45}

/* DECK THUMBS: live miniature of each slide */
.bc .thumbCard{position:relative;overflow:hidden;pointer-events:none;border-radius:6px}
.bc .thumbCard .deckSlide{position:absolute;top:0;left:0;width:1280px;height:720px;min-height:0;aspect-ratio:auto;padding:44px 72px 34px;border-radius:0;box-shadow:none;transform-origin:top left}

/* FAQ */
.bc .faqSec{padding-block:clamp(88px,9vw,132px)}
.bc .faqSec .faqLayout{grid-template-columns:minmax(0,.82fr) minmax(0,1.18fr);gap:80px;align-items:start}
.bc .faqSec .faqIntro{position:sticky;top:40px}

/* left side */
.bc .faqSec .sectionEyebrow{gap:18px;margin-bottom:30px;font-size:15px;letter-spacing:.22em}
.bc .faqSec .sectionEyebrow span{width:48px;height:48px;border-radius:10px;font-size:16px;font-weight:700}
.bc .faqSec .sectionEyebrow i{width:48px}
.bc .faqSec .faqIntro h2{max-width:580px;font-size:clamp(46px,5.4vw,80px);font-weight:400;line-height:1.02;letter-spacing:-.05em;color:#0a1f20}
.bc .faqSec .faqIntro>p{max-width:520px;margin-top:28px;font-size:20px;line-height:1.65;color:#011522}
.bc .faqSec .faqIntro .textAction{margin-top:36px;padding-bottom:8px;border-bottom:2px solid var(--teal);font-size:19px;font-weight:700;color:var(--teal)}
.bc .faqSec .faqIntro .textAction svg{width:24px;height:24px}

/* cards */
.bc .faqSec .faq{display:grid;gap:16px;border-top:0}
.bc .faqSec .faq details{border:1px solid #dbe6e3;border-radius:16px;background:#fff;transition:background .25s ease,border-color .25s ease,box-shadow .25s ease}
.bc .faqSec .faq details:hover{border-color:#dbe6e3}
.bc .faqSec .faq details[open]{background:#fff;border-color:#dbe6e3;box-shadow:none}

.bc .faqSec .faq summary{display:grid;grid-template-columns:auto minmax(0,1fr) 52px;align-items:center;gap:26px;padding:34px 36px;cursor:pointer;list-style:none}
.bc .faqSec .faq .faqNum{display:block;width:70px;height:34px;padding-right:26px;border-right:1px solid #cfdcd9;font-style:normal;font-size:15px;font-weight:600;line-height:34px;letter-spacing:.04em;color:#087675}
.bc .faqSec .faq summary span{font:400 clamp(22px,2vw,28px)/1.25 Georgia,"Times New Roman",serif;letter-spacing:-.03em;color:#0a1f20}

.bc .faqSec .faq summary i{width:52px;height:52px;flex:0 0 52px;border:1px solid #c5dbd6;background:#fff;transition:background .25s ease,border-color .25s ease}
.bc .faqSec .faq summary i:before,
.bc .faqSec .faq summary i:after{width:16px;height:2px}
.bc .faqSec .faq details[open] summary i{background:#fff;border-color:#c5dbd6}

.bc .faqSec .faq details p{max-width:none;margin:0 36px;padding:30px 0 38px 96px;border-top:1px solid #d5e3e0;font-size:18px;line-height:1.7;color:#011522}

@media(max-width:1080px){
  .bc .faqSec .faqLayout{grid-template-columns:1fr;gap:48px}
  .bc .faqSec .faqIntro{position:relative;top:auto}
}
@media(max-width:640px){
  .bc .faqSec .faq summary{grid-template-columns:auto minmax(0,1fr) 44px;gap:16px;padding:24px 20px}
  .bc .faqSec .faq .faqNum{width:auto;padding-right:16px}
  .bc .faqSec .faq summary span{font-size:20px}
  .bc .faqSec .faq summary i{width:44px;height:44px;flex-basis:44px}
  .bc .faqSec .faq details p{margin:0 20px;padding:22px 0 26px;font-size:16px}
}
.bc .faqSec{background:#fff}.bc .faqLayout{display:grid;grid-template-columns:.72fr 1.28fr;gap:82px;align-items:start}.bc .faqIntro{position:sticky;top:32px}.bc .faqIntro h2{max-width:500px}.bc .faqIntro>p{max-width:430px;margin-top:16px;color:#011522;font-size:14px;line-height:1.7}.bc .darkLink{margin-top:24px;color:var(--teal)}
.bc .faq{border-top:1px solid var(--line)}.bc details{border-bottom:1px solid var(--line)}.bc summary{display:flex;justify-content:space-between;gap:24px;align-items:center;padding:23px 3px;color:#1f403d;font-size:14px;font-weight:750;cursor:pointer;list-style:none}.bc summary::-webkit-details-marker{display:none}.bc summary i{position:relative;width:28px;height:28px;flex:0 0 28px;border:1px solid #d5e4e0;border-radius:50%}.bc summary i:before,.bc summary i:after{content:"";position:absolute;left:50%;top:50%;width:9px;height:1px;background:var(--teal);transform:translate(-50%,-50%)}.bc summary i:after{transform:translate(-50%,-50%) rotate(90deg);transition:transform .2s}.bc details[open] summary i:after{transform:translate(-50%,-50%) rotate(0)}.bc details p{max-width:760px;padding:0 48px 24px 3px;color:#011522;font-size:12px;line-height:1.7}

/* FINAL */
.bc .final .ctaCard{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:48px;align-items:center;padding:68px 72px;border:1px solid rgba(127,211,208,.22);border-radius:18px;background:rgba(255,255,255,.02)}

.bc .final .ctaEyebrow{display:flex;align-items:center;gap:16px;font-size:13px;font-weight:800;letter-spacing:.22em;color:var(--mint)}
.bc .final .ctaEyebrow i{display:block;width:56px;height:1px;background:rgba(127,211,208,.4)}
.bc .final .ctaCopy h2{margin-top:24px;font-size:clamp(40px,4.4vw,66px);font-weight:400;line-height:1.04;letter-spacing:-.05em;color:#fff}
.bc .final .ctaText{max-width:520px;margin-top:26px;font-size:18px;line-height:1.65;color:#fafafa}

.bc .final .ctaBtns{display:flex;flex-wrap:nowrap;gap:14px;margin-top:38px}
.bc .final .ctaBtn{display:inline-flex;align-items:center;justify-content:center;gap:16px;min-height:60px;padding:0 26px;border-radius:10px;font:700 15px/1 Inter,Arial,sans-serif;color:#fff;cursor:pointer;white-space:nowrap;transition:background .2s ease,border-color .2s ease,transform .2s ease}
.bc .final .ctaBtn svg{width:22px;height:22px;stroke-width:1.9}
.bc .final .ctaBtn.primary{border:1px solid #167273;background:#167273}
.bc .final .ctaBtn.primary:hover{background:#13aeaa;transform:translateY(-2px)}
.bc .final .ctaBtn.ghost{border:1px solid rgba(255,255,255,.4);background:transparent}
.bc .final .ctaBtn.ghost:hover:not(:disabled){border-color:#fff;background:rgba(255,255,255,.06);transform:translateY(-2px)}
.bc .final .ctaBtn:disabled{opacity:.6;cursor:wait}

.bc .final .ctaSteps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0}
.bc .final .ctaStep{display:flex;flex-direction:column}
.bc .final .ctaIconRow{display:flex;align-items:center;gap:16px}
.bc .final .ctaStep:not(:last-child) .ctaIconRow:after{content:"";flex:1;height:1px;margin-right:24px;margin-left:24px;background:rgba(127,211,208,.3)}
.bc .final .ctaIcon{display:grid;place-items:center;flex:none;width:56px;height:56px;border:1px solid rgba(127,211,208,.3);border-radius:12px;background:transparent;color:var(--mint)}
.bc .final .ctaIcon .mi{display:grid;place-items:center;line-height:0}
.bc .final .ctaIcon svg{width:24px;height:24px;stroke-width:1.5}
.bc .final .ctaNum{margin-top:32px;font-size:13px;font-weight:800;letter-spacing:.14em;color:var(--mint)}
.bc .final .ctaStep h3{margin-top:8px;font:400 20px/1.25 Georgia,"Times New Roman",serif;letter-spacing:-.015em;color:#fff}
.bc .final .ctaStep p{max-width:230px;margin-top:12px;font-size:16px;line-height:1.55;color:#b8d1ce}

@media(max-width:1180px){
  .bc .final .ctaCard{grid-template-columns:1fr;gap:56px;padding:48px 40px}
}
@media(max-width:700px){
  .bc .final .ctaCard{padding:32px 22px}
  .bc .final .ctaSteps{grid-template-columns:1fr;gap:32px}
  .bc .final .ctaStep:not(:last-child) .ctaIconRow:after{display:none}
  .bc .final .ctaBtn{width:100%}
}

/* FINAL */
.bc .final{position:relative;overflow:hidden;padding:86px 0 34px;color:#fff;background:linear-gradient(135deg,#031819,#062629)}
.bc .final:before{display:none}
.bc .finalCard{position:relative;z-index:1;display:grid;grid-template-columns:1.05fr .95fr;gap:72px;align-items:center;padding:46px;border:1px solid rgba(127,211,208,.16);border-radius:18px;background:rgba(255,255,255,.035)}
.bc .finalCopy h2{margin-top:12px}.bc .finalCopy>p:not(.eye){max-width:600px;margin-top:16px;color:#b7d0cd;font-size:14px;line-height:1.7}
.bc .finalImpact{padding:28px;border-radius:14px;background:#f7fbfa;color:var(--ink);box-shadow:0 28px 60px rgba(0,0,0,.22)}.bc .finalImpactTop{display:flex;justify-content:space-between;align-items:center;gap:12px}.bc .finalImpactTop>span{padding:5px 8px;border-radius:5px;background:#eaf6f4;color:var(--teal);font-size:9px;font-weight:800}.bc .finalImpactTop .mi{width:36px;height:36px;border-radius:50%}.bc .finalImpact>strong{display:block;margin-top:20px;color:#0b7272;font-family:Georgia,"Times New Roman",serif;font-size:42px;line-height:1;letter-spacing:-.05em}.bc .finalImpact>p{margin-top:7px!important;color:#5c7672!important;font-size:11px!important}.bc .finalStats{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:24px;padding-top:18px;border-top:1px solid #dde9e6}.bc .finalStats span{color:#6b827e;font-size:9px;line-height:1.45}.bc .finalStats b{display:block;color:#173b38;font-size:13px}
.bc .note{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:flex-start;gap:40px;margin-top:56px;padding-top:28px;border-top:1px solid rgba(127,211,208,.14);color:#8fb0ac;font-size:11px;line-height:1.65}.bc .note p{max-width:760px;letter-spacing:.005em}
.bc .note p b{color:#e8f5f2;font-weight:700}.bc .note a{flex:none;color:#d6e9e7;font-weight:700;white-space:nowrap;border-bottom:1px solid rgba(127,211,208,.4);padding-bottom:2px;transition:color .2s ease,border-color .2s ease}
.bc .note a:hover{color:#fff;border-bottom-color:#7fd3d0}

/* REVEAL */
.bc [data-r]{opacity:0;transform:translateY(18px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}.bc [data-r].in{opacity:1;transform:none}

@media(max-width:1280px){




}
@media(max-width:1080px){
   .bc .hgrid,.bc .egrid,.bc .faqLayout,.bc .finalCard{grid-template-columns:1fr}
  .bc .dash{max-width:760px}.bc .heroFloatA{left:10px}.bc .heroFloatB{right:10px}
  .bc .trust div{grid-template-columns:repeat(3,1fr)}
  .bc .modelTop{grid-template-columns:1fr;gap:24px;align-items:start}

    .bc .faqIntro{position:relative;top:auto}
}
@media(max-width:760px){
  .bc .wrap{width:calc(100% - 34px)}
  .bc .hero{padding-top:82px}.bc .hcopy{padding-bottom:10px}.bc .heroFloat{display:none}.bc .trust div{grid-template-columns:1fr 1fr;gap:12px}.bc .trust span{font-size:14px}

  .bc .previewTop{align-items:flex-start;flex-direction:column}.bc .tabs{flex-wrap:wrap}.bc .slide{min-height:420px;padding:24px 20px 38px}.bc .slide ul{max-width:100%}.bc .slideFooter{left:20px;right:20px}
  .bc .finalCard{padding:28px 20px;gap:38px}.bc .finalImpact>strong{font-size:34px}.bc .finalStats{grid-template-columns:1fr}.bc .note{flex-direction:column}
}
@media(max-width:460px){
  .bc h1{font-size:40px}.bc h2{font-size:34px}.bc .heroMicro{display:grid}.bc .trust div{grid-template-columns:1fr 1fr}



}
@media(prefers-reduced-motion:reduce){.bc *{animation:none!important;transition:none!important;scroll-behavior:auto!important}}

/* Calculator: isolated spacing, typography and icon layout. */
.bc .modelSec{background:#fff;padding:88px 0 96px;font-family:Inter,"Helvetica Neue",Arial,sans-serif}
.bc .modelSec .wrap{width:min(1380px,calc(100% - 64px));margin-inline:auto}
.bc .modelTop{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;margin-bottom:36px}
.bc .modelIntro{max-width:740px}
.bc .modelTitleRow{display:flex;align-items:flex-start;gap:20px}
.bc .modelNumber{display:none}
.bc .modelTitleRow h2{font-size:clamp(34px,3.6vw,52px);line-height:1.06;letter-spacing:-.045em}
.bc .modelIntro>p{margin:16px 0 0;max-width:610px;font-size:15px;line-height:1.65;color:#011522}
.bc .scenarioArea{flex:none;width:340px;min-width:0;margin:0;padding:0}
.bc .seg{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;padding:3px;border:1px solid #e3ebe8;border-radius:8px;background:transparent;box-shadow:none}
.bc .seg button{min-height:34px;border:0;border-radius:6px;background:transparent;color:#647674;font:600 12px Inter,Arial,sans-serif;cursor:pointer;padding:0 10px;box-shadow:none;transition:color .2s ease,background .2s ease,box-shadow .2s ease}
.bc .seg button[aria-pressed=true]{background:#087675;border:0;color:#fff;font-weight:600}
.bc .seg button:not([aria-pressed=true]):hover{color:#087675}
.bc .scenarioNote{display:none}
.bc .calculator{display:grid;grid-template-columns:228px minmax(0,1fr);gap:24px;align-items:start}
.bc .modelSec .mi{display:grid;place-items:center;flex:0 0 48px;width:48px;height:48px;margin:0;padding:0;border:0;border-radius:50%;background:#e8f5f2;color:#087c78;line-height:0}
.bc .modelSec .mi svg{display:block;width:24px;height:24px;margin:0;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none}
.bc .stepRail{position:relative;display:grid;gap:18px;padding:18px 0;overflow:visible;margin:0}
.bc .stepTrack{position:absolute;top:44px;bottom:66px;left:17px;border-left:1px dashed #caddd9;width:0}
.bc .railStep{position:relative;display:grid;grid-template-columns:36px 44px minmax(0,1fr);align-items:start;gap:10px;width:100%;min-height:91px;padding:8px 0;border:0;background:transparent;text-align:left;cursor:pointer;border-radius:12px;color:#183735}
.bc .railNumber{display:grid;place-items:center;width:34px;height:34px;margin-top:5px;border:1px solid #dce7e5;border-radius:50%;background:#fff;color:#527975;font-size:13px;font-weight:700;z-index:1}
.bc .railNumber svg{width:15px;height:15px}
.bc .railStep.active .railNumber,.bc .railStep.done .railNumber{background:#087675;border-color:#087675;color:white}
.bc .modelSec .railStep>.mi{width:44px;height:44px;display:grid}
.bc .railCopy{padding:4px 4px 0 0}
.bc .railCopy strong{display:block;font-size:13px;line-height:1.35;font-weight:700}
.bc .railCopy small{display:block;margin-top:6px;color:#011522;font-size:12px;line-height:1.55}
.bc .railStep.active .railCopy strong{color:#087675}
.bc .stepCard{min-width:0;min-height:0;padding:28px;border:1px solid #eaeeed;border-radius:12px;background:#fff;box-shadow:0 1px 2px rgba(16,40,36,.03)}
.bc .stepCardTop{display:flex;align-items:center;justify-content:space-between;gap:20px;width:calc(54% - 16px);margin-bottom:18px}
.bc .stepCardTop p{font-size:11px;letter-spacing:.13em;font-weight:750;color:#087675}
.bc .stepProgress{width:116px;height:5px;border-radius:9px;background:#e6ebed;overflow:hidden}
.bc .stepProgress i{display:block;height:100%;border-radius:9px;background:#087675;transition:width .2s}
.bc .stepCardBody{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,1fr);gap:28px;align-items:stretch}
.bc .stepMain,.bc .stepPanel{min-width:0}
.bc .stepHeading{padding:0;margin:0 0 24px;border:0}
.bc .stepHeading h3{font:700 34px/1.15 Georgia,"Times New Roman",serif;letter-spacing:-.04em;color:#152e2e}
.bc .stepHeading p{margin-top:10px;font-size:13px;line-height:1.6;color:#011522}
.bc .fieldStack{display:grid;gap:12px;border:0}
.bc .calcField{display:grid;grid-template-columns:44px minmax(0,1fr) 112px;align-items:center;gap:12px;min-height:98px;margin:0;padding:16px 14px;background:#f5f9f8;border:1px solid transparent;border-radius:15px}
.bc .modelSec .calcField>.mi{width:44px;height:44px}
.bc .fieldCopy{min-width:0}
.bc .fieldLabel{display:block;font-size:13px;line-height:1.4;font-weight:650;color:#243c3b}
.bc .fieldCopy small{display:block;margin-top:5px;font-size:12px;line-height:1.45;color:#011522}
.bc .calcField .infoDot{display:none}
.bc .fieldControl{display:flex;align-items:center;gap:4px;grid-column:auto;width:100%;min-width:0;margin:0;padding:0 10px;min-height:46px;border:1px solid #d5dfdf;border-radius:9px;background:#fff;box-shadow:0 1px 2px #123e3605}
.bc .fieldControl:focus-within{border-color:#087675;box-shadow:0 0 0 3px #08767515}
.bc .fieldControl input{width:100%;min-width:0;padding:10px 0;border:0;outline:none;background:transparent;text-align:right;color:#172e2e;font:650 16px/1.3 Inter,Arial,sans-serif;font-variant-numeric:tabular-nums}
.bc .fieldControl i{font-style:normal;font-size:11px;color:#80918f}
.bc .stepInsight{display:none}
.bc .quickTips{display:flex;flex-direction:column;justify-content:space-between;min-width:0;margin-top:-41px;padding:22px;background:#eff7f5;border:0;border-radius:17px;gap:24px}
.bc .quickTipsHead{display:flex;align-items:center;gap:12px;margin-bottom:18px}
.bc .quickTipsHead span{display:none}
.bc .quickTipsHead h4{font:700 16px/1.3 Inter,Arial,sans-serif;color:#20423e}
.bc .tipList{display:grid;gap:12px}
.bc .tipItem{display:flex;align-items:center;gap:12px;min-height:78px;padding:14px;border:0;border-radius:12px;background:#ffffffd9}
.bc .modelSec .tipItem>.mi{width:38px;height:38px;flex-basis:38px}
.bc .modelSec .tipItem>.mi svg{width:21px;height:21px}
.bc .tipItem p{font-size:12px;line-height:1.65;color:#687b80;margin:0}
.bc .quickTipsFooter{margin:0;padding:0;border:0}
.bc .stepActions{display:flex;flex-direction:column;gap:10px;border:0;padding:0;margin:0}
.bc .stepActions>span:empty{display:none}
.bc .nextBtn{display:flex;align-items:center;justify-content:center;gap:15px;min-height:50px;width:100%;padding:12px 16px;border:0;border-radius:9px;background:#087675;color:#fff;font:600 13px/1.4 Inter,Arial,sans-serif;text-decoration:none;cursor:pointer;order:0;box-shadow:0 3px 8px #08767512}
.bc .nextBtn:hover{background:#056360}
.bc .nextBtn svg{width:19px;height:19px}
.bc .backBtn{order:1;align-self:center;background:none;border:0;padding:5px 12px;color:#557770;font-size:12px;cursor:pointer}
.bc .stepCount{display:block;margin-top:12px;text-align:right;font-size:11px;color:#768a87}
.bc .reviewGroups{display:grid;gap:18px}.bc .reviewGroup>p{font-size:12px;font-weight:750;color:#087675;margin-bottom:6px}
.bc .reviewLine{display:grid;grid-template-columns:1fr auto auto;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid #e7efec;font-size:12px;color:#6d807c}
.bc .reviewLine strong{color:#243f3b;font-size:12px}.bc .reviewLine button{border:0;background:none;color:#087675;font-size:11px;cursor:pointer}





/* -----------------------------------------
   PREMIUM IMPACT / RESULTS PANEL
----------------------------------------- */

.bc .impactPanel{
  grid-column:1/-1;
  position:relative;
  display:grid;
  grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);
  grid-template-rows:auto 1fr;
  gap:30px 38px;

  margin-top:2px;
  padding:42px 44px 40px;

  border:1px solid #d4e1de;
  border-radius:20px;
  background:#fff;

  box-shadow:
    0 1px 2px rgba(12,54,48,.02),
    0 14px 38px rgba(12,54,48,.025);
}


/* Header */

.bc .impactHead{
  grid-column:1/-1;

  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:30px;

  margin:0;
}

.bc .impactHead h3{
  color:#102d2d;

  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(34px,3vw,44px);
  font-weight:700;
  line-height:1.02;

  letter-spacing:-.045em;
}

.bc .impactHead p{
  max-width:640px;

  margin-top:10px;

  color:#708186;
  font-size:13px;
  line-height:1.6;
}

.bc .impactBadge{
  flex:none;

  display:inline-flex;
  align-items:center;
  justify-content:center;

  min-height:42px;
  margin-top:1px;
  padding:0 17px;

  border-radius:10px;
  background:#eef7f5;

  color:#087675;
  font-size:11px;
  font-weight:750;
  line-height:1;
}


/* KPI grid */

.bc .kpis{
  grid-column:1;
  grid-row:2;

  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:14px;

  margin:0;
}

.bc .kpi{
  position:relative;

  display:flex;
  flex-direction:column;
  justify-content:flex-start;

  min-width:0;
  min-height:214px;

  padding:30px 30px 27px;

  border:1px solid #dbe6e3;
  border-radius:16px;

  background:#fff;

  transition:
    border-color .2s ease,
    box-shadow .2s ease,
    transform .2s ease;
}

.bc .kpi:hover{
  border-color:#c8dbd6;

  box-shadow:
    0 8px 24px rgba(12,54,48,.035);

  transform:translateY(-1px);
}


/* Small uppercase category */

.bc .kpiLabel{
  display:block;

  margin-bottom:20px;

  color:#011522;

  font-family:Inter,"Helvetica Neue",Arial,sans-serif;
  font-size:10px;
  font-weight:800;
  line-height:1.2;

  letter-spacing:.16em;
  text-transform:uppercase;
}


/* IMPORTANT:
   Same serif treatment as the mockup */
.bc .kpiValue{
  display:block;

  color:#102a2b;

  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(34px,3vw,46px);
  font-weight:700;
  line-height:.98;

  letter-spacing:-.045em;

  font-variant-numeric:lining-nums tabular-nums;

  overflow-wrap:anywhere;
}


/* Bottom description */

.bc .kpiDescription{
  margin-top:17px;

  color:#011522;

  font-family:Georgia,"Times New Roman",serif;
  font-size:15px;
  font-weight:400;
  line-height:1.38;

  letter-spacing:-.01em;
}

.bc .kpiDescription span{
  color:#819095;
}


/* Highlighted total card */

.bc .kpi.hi{
  border-color:#087675;
  background:#087675;
  box-shadow:none;
}

.bc .kpi.hi:hover{
  border-color:#087675;

  box-shadow:
    0 10px 28px rgba(8,118,117,.10);

  transform:translateY(-1px);
}

.bc .kpi.hi .kpiLabel{
  color:#e9fbf7;
}

.bc .kpi.hi .kpiValue{
  color:#fff;
}

.bc .kpi.hi .kpiDescription{
  color:#fff;
}

.bc .kpi.hi .kpiDescription span{
  color:#d8efeb;
}


/* Right chart area */

.bc .impactChartArea{
  grid-column:2;
  grid-row:2;

  display:flex;
  flex-direction:column;

  min-width:0;
  padding:3px 0 0;
}

.bc .chartTitleRow{
  position:relative;
  display:flex;
  align-items:center;
  gap:10px;

  margin:0 0 25px;
}
.bc .chartTitleRow .tipIcon{
  position:relative;
  width:19px;
  height:19px;
  color:#788d89;
}
.bc .chartTitleRow .tipIcon svg{width:17px;height:17px}
.bc .chartTitleRow .tipIcon:hover,
.bc .chartTitleRow .tipIcon:focus-visible{color:#087675}
.bc .chartTitleRow .tipBubble{
  left:auto;
  right:-12px;
  bottom:calc(100% + 10px);
  width:620px;
  font-size:12px;
  line-height:1.5;
  padding:16px 18px;
}
.bc .chartTitleRow .tipBubble br + br{display:block}

.bc .chartTitleRow p{
  color:#183333;

  font-family:Georgia,"Times New Roman",serif;
  font-size:16px;
  font-weight:700;
  line-height:1.3;

  letter-spacing:-.02em;
}

.bc .infoDot{
  display:inline-grid;
  place-items:center;

  width:19px;
  height:19px;

  border:1px solid #aebfbd;
  border-radius:50%;

  color:#788d89;

  font-family:Inter,Arial,sans-serif;
  font-size:10px;
  font-weight:700;
  line-height:1;
}


/* Chart */

.bc .chartShell{
  display:grid;
  grid-template-columns:54px minmax(0,1fr);
  gap:12px;

  width:100%;
  height:285px;
}

.bc .axis{
  display:flex;
  flex-direction:column;
  justify-content:space-between;

  padding-bottom:44px;
}

.bc .axis span{
  color:#788c91;

  font-family:Inter,"Helvetica Neue",Arial,sans-serif;
  font-size:10px;
  line-height:1;

  text-align:right;
}

.bc .chartPlot{
  position:relative;
  min-width:0;
}

.bc .gridLines{
  position:absolute;
  inset:0 0 44px;

  display:flex;
  flex-direction:column;
  justify-content:space-between;
}

.bc .gridLines i{
  width:100%;

  border-top:1px dashed #dce6e4;
}

.bc .chart{
  position:relative;
  z-index:1;

  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:28px;

  height:100%;

  padding:0 14px 44px;
}


/* Individual bar */

.bc .barItem{
  position:relative;

  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-end;

  min-width:0;
  height:100%;
}

.bc .barItem em{
  position:absolute;
  bottom:calc(var(--bar-height) + 10px);

  color:#172e2e;

  font-family:Georgia,"Times New Roman",serif;
  font-size:13px;
  font-weight:700;
  font-style:normal;
  line-height:1;

  letter-spacing:-.02em;

  white-space:nowrap;
}

.bc .barItem .bar{
  display:block;
  flex:none;

  width:68%;
  max-width:112px;

  border-radius:8px 8px 0 0;

  background:
    linear-gradient(
      180deg,
      #95cec6 0%,
      #7fc2b9 100%
    );

  transition:height .25s ease;
}

.bc .barItem .bar.light{
  background:
    linear-gradient(
      180deg,
      #e4f1ee 0%,
      #cde5df 100%
    );
}

.bc .barItem .bar.tot{
  background:
    linear-gradient(
      180deg,
      #108784 0%,
      #087675 100%
    );
}

.bc .barItem>span{
  position:absolute;
  top:calc(100% + 13px);

  width:125%;

  color:#74868a;

  font-family:Inter,"Helvetica Neue",Arial,sans-serif;
  font-size:10px;
  line-height:1.35;

  text-align:center;
}


/* Assumption note */

.bc .impactNote{
  display:grid;
  grid-template-columns:18px 1px minmax(0,1fr);
  align-items:center;
  gap:16px;

  margin-top:25px;
  padding:19px 22px;

  border:0;
  border-radius:12px;

  background:#f2f7f6;
}

.bc .impactNoteMark{
  order:1;
  display:block;

  width:12px;
  height:12px;

  border-radius:50%;

  background:#087675;
}

.bc .impactNote:before{
  order:2;
  content:"";

  width:1px;
  height:42px;

  background:#cfddda;
}

.bc .impactNote p{
  order:3;
  margin:0;

  color:#718287;

  font-family:Inter,"Helvetica Neue",Arial,sans-serif;
  font-size:10px;
  line-height:1.6;
}



.bc .modelSec button:focus-visible,.bc .modelSec a:focus-visible{outline:3px solid #84c9bf;outline-offset:4px}
@media(max-width:1180px){
 .bc .modelTop{align-items:flex-start;flex-direction:column}.bc .scenarioArea{margin-left:62px}
 .bc .calculator{grid-template-columns:190px minmax(0,1fr);gap:20px}.bc .railStep{grid-template-columns:32px 36px 1fr;gap:8px}.bc .modelSec .railStep>.mi{width:36px;height:36px}.bc .railCopy strong{font-size:12px}.bc .railCopy small{font-size:11px}
 .bc .stepCard{padding:22px}.bc .stepCardBody{gap:20px}.bc .calcField{grid-template-columns:36px minmax(0,1fr);gap:10px;padding:14px}.bc .modelSec .calcField>.mi{width:36px;height:36px}.bc .fieldControl{grid-column:2}.bc .quickTips{padding:18px}.bc .kpi{gap:10px;padding:16px 12px}.bc .modelSec .kpi>.mi{width:38px;height:38px;flex-basis:38px}
}
@media(max-width:900px){
 .bc .modelSec .wrap{width:calc(100% - 40px)}.bc .calculator{grid-template-columns:1fr}
 .bc .stepRail{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:0}.bc .stepTrack{display:none}.bc .railStep{display:flex;align-items:center;gap:9px;min-height:58px;padding:9px;border:1px solid #e2ece8;border-radius:12px}.bc .railNumber{flex:none;margin:0}.bc .modelSec .railStep>.mi,.bc .railCopy small{display:none}.bc .railCopy{padding:0}.bc .railStep.active{background:#f1f8f5;border-color:#a8cec3}
 .bc .stepCardBody{grid-template-columns:1.1fr 1fr}.bc .impactPanel{grid-template-columns:1fr;gap:0;padding:24px}.bc .kpis{grid-column:1;grid-row:auto;margin-bottom:28px}.bc .chartTitleRow,.bc .chartShell,.bc .impactNote{grid-column:1;grid-row:auto}.bc .chartShell{height:240px}.bc .kpi b{font-size:29px}
}
@media(max-width:600px){
 .bc .modelSec{padding:56px 0}.bc .modelSec .wrap{width:calc(100% - 28px)}.bc .modelTitleRow{gap:12px}.bc .modelTitleRow h2{font-size:34px}.bc .modelIntro>p{margin:16px 0 0;font-size:14px}.bc .scenarioArea{width:100%;margin:0}.bc .seg{grid-template-columns:repeat(3,1fr)}.bc .seg button{font-size:11px;padding:0 6px}
 .bc .stepRail{grid-template-columns:repeat(2,minmax(0,1fr))}.bc .railStep{padding:8px 10px}.bc .stepCard{padding:20px 16px;border-radius:18px}.bc .stepCardTop{width:100%;margin-bottom:20px}.bc .stepCardBody{grid-template-columns:1fr;gap:22px}.bc .stepHeading h3{font-size:30px}.bc .calcField{grid-template-columns:38px minmax(0,1fr) 100px;gap:9px;padding:12px 10px}.bc .fieldControl{grid-column:auto}.bc .fieldLabel{font-size:12px}.bc .fieldCopy small{font-size:11px}.bc .quickTips{margin:0;padding:18px}.bc .tipItem{min-height:64px}.bc .stepActions{display:flex}.bc .stepCount{display:block}
 .bc .impactPanel{padding:20px 16px;border-radius:18px}.bc .impactHead{display:block}.bc .impactHead h3{font-size:30px}.bc .impactBadge{display:inline-block;margin-top:12px}.bc .kpis{grid-template-columns:1fr;gap:10px}.bc .kpi{min-height:110px;align-items:center;padding:18px;gap:16px}.bc .kpi>div{padding:0}.bc .kpi b{font-size:29px}.bc .modelSec .kpi>.mi{width:48px;height:48px;flex-basis:48px}.bc .chart{gap:14px}.bc .chartShell{height:210px;grid-template-columns:40px 1fr}.bc .barItem>span{font-size:9px}.bc .barItem em{font-size:10px}
}
@media(max-width:380px){.bc .calcField{grid-template-columns:36px 1fr}.bc .fieldControl{grid-column:2}.bc .modelTitleRow h2{font-size:30px}}

/* ---- clean calculator overrides ---- */
.bc .railStep{grid-template-columns:36px minmax(0,1fr);gap:14px}
.bc .railCopy strong{font-size:15px}
.bc .railCopy small{font-size:13px}

.bc .calcField{grid-template-columns:minmax(0,1fr) 170px;min-height:92px;padding:16px 18px;border-radius:8px}

.bc .fieldLabel{font-size:15px;font-weight:700;color:#152e2e}
.bc .fieldCopy small{font-size:13px}
.bc .fieldControl{grid-column:auto}

.bc .quickTips{padding:26px;background:#f4f8f7;border-radius:10px;gap:20px}
.bc .quickTipsHead{display:block;margin:0 0 18px;padding-bottom:16px;border-bottom:1px solid #d9e7e3}
.bc .quickTipsHead span{display:block;margin-bottom:8px;font-size:10px;font-weight:700;letter-spacing:.16em;color:#087675}
.bc .quickTipsHead h4{font:700 26px/1.15 Georgia,"Times New Roman",serif;letter-spacing:-.04em;color:#152e2e}
.bc .tipItem{align-items:center;gap:16px;min-height:0;padding:16px 18px;background:#fff;border-radius:12px}
.bc .tipNum{display:grid;place-items:center;flex:0 0 40px;width:40px;height:40px;border-radius:50%;background:#e8f2ef;color:#087675;font-size:12px;font-weight:700}
.bc .tipItem strong{display:block;font-size:14px;font-weight:700;color:#152e2e}
.bc .tipItem p{margin-top:3px;font-size:12.5px;line-height:1.5;color:#011522}
.bc .stepCount{display:none}

@media(max-width:600px){
  .bc .calcField{grid-template-columns:minmax(0,1fr) 120px}
}
@media(max-width:380px){
  .bc .calcField{grid-template-columns:1fr}
}

/* ---- bigger, sharper body text ---- */
.bc .modelSec{text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}

/* intro + scenario toggle */
.bc .modelIntro>p{font-size:18px;line-height:1.65;max-width:680px}
.bc .scenarioArea{width:380px}
.bc .seg button{min-height:42px;font-size:14px;font-weight:600}

/* step rail */
.bc .railCopy strong{font-size:18px;font-weight:700}
.bc .railCopy small{font-size:15px;line-height:1.55}
.bc .railStep{min-height:104px}

/* step card */
.bc .stepCardTop p{font-size:13px}
.bc .stepHeading p{font-size:16px}

/* fields */
.bc .fieldLabel{font-size:18px}
.bc .fieldCopy small{font-size:15px}
.bc .fieldControl input{font-size:19px;font-weight:700}
.bc .calcField{min-height:104px}

/* quick tips */
.bc .quickTipsHead span{font-size:12px}
.bc .quickTipsHead h4{font-size:30px}
.bc .tipNum{flex:0 0 44px;width:44px;height:44px;font-size:14px}
.bc .tipItem strong{font-size:17px}
.bc .tipItem p{font-size:15px;line-height:1.5}
.bc .nextBtn{font-size:16px;min-height:54px}

@media(max-width:600px){
  .bc .modelIntro>p{font-size:16px}
  .bc .scenarioArea{width:100%}
  .bc .railCopy strong{font-size:15px}
  .bc .fieldLabel{font-size:16px}
  .bc .fieldCopy small{font-size:13px}
  .bc .tipItem strong{font-size:15px}
  .bc .tipItem p{font-size:13.5px}
}

/* ---- tooltip icons on field labels ---- */
.bc .fieldLabel{display:flex;align-items:center;gap:8px}
.bc .calcField{min-height:84px}

.bc .tipIcon{position:relative;display:inline-grid;place-items:center;flex:none;width:20px;height:20px;border-radius:50%;color:#6f8a86;cursor:help;outline:none;transition:color .2s ease}
.bc .tipIcon svg{width:18px;height:18px;stroke-width:1.7}
.bc .tipIcon:hover,.bc .tipIcon:focus-visible{color:#087675}

.bc .tipBubble{position:absolute;left:-10px;bottom:calc(100% + 10px);z-index:20;width:270px;padding:12px 14px;border-radius:8px;background:#011522;color:#fff;font:500 13px/1.5 Inter,Arial,sans-serif;letter-spacing:0;text-align:left;box-shadow:none;opacity:0;visibility:hidden;transform:translateY(4px);pointer-events:none;transition:opacity .18s ease,transform .18s ease,visibility .18s}
.bc .tipBubble:after{content:"";position:absolute;top:100%;left:16px;border:6px solid transparent;border-top-color:#011522}
.bc .tipIcon:hover .tipBubble,
.bc .tipIcon:focus .tipBubble,
.bc .tipIcon:focus-visible .tipBubble{opacity:1;visibility:visible;transform:none}

@media(max-width:600px){
  .bc .tipBubble{width:220px}
}

/* ---- field label: smaller, lighter ---- */
.bc .fieldLabel{font-size:16px;font-weight:600}
.bc .tipIcon svg{width:17px;height:17px}

@media(max-width:600px){
  .bc .fieldLabel{font-size:15px}
}


/* ---- review step: bigger text ---- */
.bc .reviewGroups{gap:26px}
.bc .reviewGroup>p{font-size:15px;font-weight:700;margin-bottom:6px}
.bc .reviewLine{padding:14px 0;gap:16px;font-size:15px;color:#011522}
.bc .reviewLine strong{font-size:16px;font-weight:700;color:#011522}
.bc .reviewLine button{font-size:14px;font-weight:600;padding:4px 2px}
.bc .reviewLine button:hover{text-decoration:underline}

@media(max-width:600px){
  .bc .reviewLine{font-size:14px}
  .bc .reviewLine strong{font-size:15px}
}

/* ---- impact panel: single-line values, consistent copy ---- */

/* KPI values: smaller, always on one line */
.bc .kpiValue{
  font-size:clamp(26px,2.3vw,34px);
  white-space:nowrap;
  overflow-wrap:normal;
  letter-spacing:-.04em;
}

/* Subtitle under "Your potential impact": same as the model intro */
.bc .impactHead p{
  max-width:680px;
  margin-top:12px;
  font-size:18px;
  line-height:1.65;
  color:#011522;
}

/* Footnote: darker, same colour, easier to read */
.bc .impactNote p{
  font-size:12px;
  line-height:1.65;
  color:#011522;
}

@media(max-width:900px){
  .bc .kpiValue{font-size:clamp(24px,5vw,32px)}
}
@media(max-width:600px){
  .bc .impactHead p{font-size:16px}
  .bc .kpiValue{font-size:28px}
}

/* ---- impact panel: even padding, smaller radius ---- */

/* KPI cards: size to content, same padding top and bottom */
.bc .kpis{align-self:start;align-content:start}
.bc .kpi{
  min-height:0;
  justify-content:flex-start;
  padding:28px 30px;
  border-radius:8px;
}
.bc .kpiLabel{margin-bottom:18px}
.bc .kpiDescription{margin-top:14px}

/* Outer panel */
.bc .impactPanel{border-radius:10px}

/* Badge, chart note */
.bc .impactBadge{border-radius:6px}
.bc .impactNote{border-radius:8px}

/* Bars */
.bc .barItem .bar{border-radius:4px 4px 0 0}

@media(max-width:600px){
  .bc .kpi{padding:22px 20px;border-radius:8px}
  .bc .impactPanel{border-radius:10px}
}



/* ---- toggle inside impact panel ---- */
.bc .impactHead .seg{flex:none;width:380px}

/* ---- chart text: bigger, same colour ---- */
.bc .chartShell{grid-template-columns:60px minmax(0,1fr)}
.bc .axis span{font-size:13px;color:#011522}
.bc .barItem em{font-size:16px;color:#011522}
.bc .barItem>span{font-size:14px;line-height:1.35;color:#011522}

@media(max-width:600px){
  .bc .impactHead .seg{width:100%;margin-top:16px}
  .bc .chartShell{grid-template-columns:48px minmax(0,1fr)}
  .bc .axis span{font-size:11px}
  .bc .barItem em{font-size:13px}
  .bc .barItem>span{font-size:11px}
}

/* ---- KPI card tooltips ---- */
.bc .kpiLabel{display:flex;align-items:center;gap:8px}
.bc .kpi:hover{z-index:5}

.bc .kpiLabel .tipIcon{position:static;width:18px;height:18px;color:#7a8f8b}
.bc .kpiLabel .tipIcon svg{width:16px;height:16px}

/* bubble spans the full card width so it never spills into the chart */
.bc .kpiLabel .tipBubble{left:0;right:0;width:auto;bottom:calc(100% + 8px);text-transform:none;letter-spacing:0;font-size:13px;font-weight:500;line-height:1.5}
.bc .kpiLabel .tipBubble:after{display:none}

/* light icon on the teal card */
.bc .kpi.hi .kpiLabel .tipIcon{color:#cfe9e4}
.bc .kpi.hi .kpiLabel .tipIcon:hover,
.bc .kpi.hi .kpiLabel .tipIcon:focus-visible{color:#fff}


/* ---- executive summary: deck viewer ---- */
.bc .summaryHead{max-width:none}
.bc .summaryHead h2{max-width:none;text-wrap:wrap;font-size:clamp(34px,4vw,60px)}
.bc .summaryHead p{max-width:none;margin-top:18px;color:#fafafa;font-size:20px;line-height:1.65}

.bc .deckWrap{display:grid;grid-template-columns:170px minmax(0,1fr);gap:24px;align-items:start;margin-top:44px}

/* thumbnails */
.bc .deckThumbs{display:grid;gap:10px}
.bc .deckThumb{display:grid;grid-template-columns:18px minmax(0,1fr);align-items:center;gap:8px;padding:7px 8px;border:1px solid rgba(127,211,208,.14);border-radius:8px;background:rgba(255,255,255,.03);color:#9fc0bd;text-align:left;cursor:pointer;transition:border-color .2s ease,background .2s ease,color .2s ease}
.bc .deckThumb:hover{border-color:rgba(127,211,208,.4)}
.bc .deckThumb[aria-selected=true]{border-color:#7fd3d0;background:rgba(127,211,208,.07);color:#fff}
.bc .thumbNum{font-size:12px;font-weight:700;text-align:center}
.bc .thumbCard{display:block;aspect-ratio:16/10;padding:7px 8px;border-radius:4px;background:#fbfaf7;overflow:hidden}
.bc .thumbCard b{display:block;max-height:2.4em;overflow:hidden;font:700 7px/1.2 Georgia,"Times New Roman",serif;letter-spacing:-.02em;color:#102d2d}
.bc .thumbCard i{display:block;height:2px;margin-top:4px;border-radius:2px;background:#d9e3e0}
.bc .thumbCard i:nth-of-type(2){width:72%}
.bc .thumbCard i:nth-of-type(3){width:48%}

/* stage */
.bc .deckStage{min-width:0}
.bc .deckFrame{padding:36px 42px;border:1px solid rgba(127,211,208,.16);border-radius:10px;background:rgba(255,255,255,.03)}
.bc .deckSlide{display:flex;flex-direction:column;aspect-ratio:16/8.6;padding:28px 40px 26px;border-radius:6px;background:#fbfaf7;color:#011522}
.bc .dsTop{display:flex;align-items:center;font-size:11px;font-weight:500;letter-spacing:.06em;color:#011522}
.bc .dsTop span:first-child{margin-right:auto;font-weight:700}
.bc .dsTop span:nth-child(2){margin-right:56px}
.bc .dsBody{flex:1;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:32px;min-height:0}
.bc .dsMain{min-width:0;max-width:560px}
.bc .deckSlide textarea{display:block;width:100%;padding:0;border:0;border-bottom:1px dashed transparent;outline:0;resize:none;overflow:hidden;background:transparent;color:#011522;font:700 clamp(28px,3.6vw,52px)/1.04 Georgia,"Times New Roman",serif;letter-spacing:-.045em;field-sizing:content}
.bc .deckSlide textarea:hover,.bc .deckSlide textarea:focus{border-bottom-color:#bfd2ce}
.bc .dsSub{margin-top:16px;font-size:17px;color:#011522}
.bc .dsList{display:grid;gap:12px;margin-top:22px;padding-top:20px;border-top:1px solid #e3e1da}
.bc .dsList li{display:flex;align-items:center;gap:14px;font-size:14px;line-height:1.45;color:#011522}
.bc .dsList .mi{display:inline-grid;flex:none;color:#4b6b66}
.bc .dsList .mi svg{width:20px;height:20px;stroke-width:1.6}
.bc .dsStat{text-align:right}
.bc .dsStat strong{display:block;color:#087675;font:700 clamp(34px,4vw,60px)/1 Georgia,"Times New Roman",serif;letter-spacing:-.045em}
.bc .dsStat span{display:block;margin-top:8px;font-size:14px;color:#011522}
.bc .dsFoot{display:flex;justify-content:space-between;align-items:flex-end;font-size:12px;color:#5f716e}
.bc .dsFoot strong{color:#011522;font-size:28px;font-weight:600;letter-spacing:-.04em}

/* nav + actions */
.bc .deckBar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-top:22px}
.bc .deckNav{display:flex;align-items:center;gap:18px;color:#dbecea;font-size:15px}
.bc .deckNav button{display:grid;place-items:center;width:46px;height:46px;border:1px solid rgba(127,211,208,.24);border-radius:10px;background:rgba(255,255,255,.04);color:#fff;cursor:pointer;transition:border-color .2s ease}
.bc .deckNav button:hover{border-color:rgba(127,211,208,.6)}
.bc .deckNav svg{width:20px;height:20px}
.bc .deckActions{display:flex;flex-wrap:wrap;gap:12px}
.bc .deckBtn{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:52px;padding:0 26px;border-radius:10px;font:650 15px Inter,Arial,sans-serif;color:#fff;cursor:pointer;transition:background .2s ease,border-color .2s ease}
.bc .deckBtn svg{width:19px;height:19px}
.bc .deckBtn.primary{border:1px solid #0e8b87;background:#0e8b87}
.bc .deckBtn.primary:hover{background:#12a09b;border-color:#12a09b}
.bc .deckBtn.primary:disabled{opacity:.6;cursor:wait}
.bc .deckBtn.ghost{border:1px solid rgba(255,255,255,.45);background:transparent}
.bc .deckBtn.ghost:hover{background:rgba(255,255,255,.07);border-color:#fff}

@media(max-width:1080px){
  .bc .deckWrap{grid-template-columns:1fr}
  .bc .deckThumbs{grid-template-columns:repeat(6,minmax(0,1fr))}
  .bc .deckThumb{grid-template-columns:1fr;justify-items:center;padding:10px 0}
  .bc .thumbCard{display:none}
}
@media(max-width:700px){
  .bc .deckFrame{padding:14px}
  .bc .deckSlide{aspect-ratio:auto;min-height:420px;padding:22px 20px}
  .bc .dsBody{grid-template-columns:1fr;gap:20px;padding:24px 0}
  .bc .dsStat{text-align:left}
  .bc .dsTop span:nth-child(2){display:none}
  .bc .deckBar{flex-direction:column;align-items:stretch}
  .bc .deckActions{flex-direction:column}
  .bc .deckBtn{width:100%}
}


/* =========================================================
   EXECUTIVE SUMMARY — PREMIUM DECK VIEWER
   ========================================================= */

.bc .summarySec{
  position:relative;
  overflow:hidden;
  padding:104px 0 112px;
  color:#fff;
  background:
    radial-gradient(circle at 72% 12%,rgba(22,114,115,.22),transparent 32%),
    radial-gradient(circle at 15% 90%,rgba(127,211,208,.07),transparent 28%),
    #041b1c;
}

.bc .summarySec:before{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  background:
    linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px);
  background-size:48px 48px;
  mask-image:linear-gradient(to bottom,transparent,rgba(0,0,0,.45),transparent);
}

.bc .summarySec .wrap{
  position:relative;
  z-index:1;
}

.bc .summaryHead{
  max-width:980px;
}

.bc .summaryHead h2{
  max-width:980px;
  font-size:clamp(42px,5vw,68px);
  line-height:1.01;
  letter-spacing:-.05em;
}

.bc .summaryHead p{
  max-width:760px;
  margin-top:18px;
  color:#fafafa;
  font-size:18px;
  line-height:1.7;
}

.bc .deckWrap{
  display:grid;
  grid-template-columns:164px minmax(0,1fr);
  gap:28px;
  align-items:start;
  margin-top:48px;
}

/* slide thumbnails */
.bc .deckThumbs{
  display:grid;
  gap:10px;
}

.bc .deckThumb{
  display:grid;
  grid-template-columns:22px minmax(0,1fr);
  align-items:center;
  gap:8px;
  width:100%;
  padding:6px;
  border:1px solid rgba(127,211,208,.12);
  border-radius:10px;
  background:rgba(255,255,255,.025);
  color:#8faaa7;
  text-align:left;
  cursor:pointer;
  transition:
    border-color .2s ease,
    background .2s ease,
    transform .2s ease;
}

.bc .deckThumb:hover{
  border-color:rgba(127,211,208,.34);
  background:rgba(255,255,255,.04);
}

.bc .deckThumb[aria-selected=true]{
  border-color:#58c2bd;
  background:rgba(127,211,208,.06);
  box-shadow:0 0 0 1px rgba(127,211,208,.08);
}

.bc .thumbNum{
  display:block;
  color:#9eb9b5;
  font-size:9px;
  font-weight:800;
  letter-spacing:.08em;
  text-align:center;
}

.bc .deckThumb[aria-selected=true] .thumbNum{
  color:#dff5f1;
}

.bc .thumbCard{
  position:relative;
  display:block;
  aspect-ratio:16/9;
  overflow:hidden;
  border-radius:6px;
  background:#f8f7f2;
}

.bc .thumbCard>img{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:contain;
  opacity:.72;
  transform:scale(.94);
}

.bc .thumbShade{
  position:absolute;
  inset:0;
  background:linear-gradient(
    180deg,
    rgba(248,247,242,.08) 0%,
    rgba(4,27,28,.12) 50%,
    rgba(4,27,28,.76) 100%
  );
}

.bc .thumbMeta{
  position:absolute;
  left:8px;
  right:7px;
  bottom:7px;
  z-index:2;
}

.bc .thumbMeta small{
  display:block;
  margin-bottom:2px;
  color:#b9d6d2;
  font-size:5.5px;
  font-weight:800;
  letter-spacing:.1em;
  text-transform:uppercase;
}

.bc .thumbMeta b{
  display:-webkit-box;
  overflow:hidden;
  color:#fff;
  font:700 7px/1.15 Georgia,"Times New Roman",serif;
  letter-spacing:-.02em;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
}

/* main stage */
.bc .deckStage{
  min-width:0;
}

.bc .deckFrame{
  padding:26px;
  border:1px solid rgba(127,211,208,.18);
  border-radius:16px;
  background:
    linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.018));
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.025),
    0 24px 70px rgba(0,0,0,.12);
}

.bc .deckSlide{
  position:relative;
  display:flex;
  flex-direction:column;
  aspect-ratio:16/9;
  min-height:0;
  overflow:hidden;
  padding:26px 32px 22px;
  border-radius:10px;
  background:#f8f7f2;
  color:#092526;
  box-shadow:0 24px 60px rgba(0,0,0,.2);
}

.bc .deckSlide.slide-impact,
.bc .deckSlide.slide-next{
  background:
    radial-gradient(circle at 78% 46%,rgba(22,114,115,.22),transparent 35%),
    #061f20;
  color:#fff;
}

.bc .dsTop{
  position:relative;
  z-index:3;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:24px;
  min-height:28px;
}

.bc .dsLogo{
  display:block;
  width:92px;
  height:auto;
  object-fit:contain;
}

.bc .slide-impact .dsLogo,
.bc .slide-next .dsLogo{
  padding:0;
  width:105px;
  border-radius:0;
  background:none;
}

.bc .dsTopRight{
  display:flex;
  align-items:center;
  gap:28px;
  color:#526d69;
  font-size:8px;
  font-weight:700;
  letter-spacing:.04em;
}

.bc .slide-impact .dsTopRight,
.bc .slide-next .dsTopRight{
  color:#9fbebb;
}

.bc .dsBody{
  position:relative;
  z-index:2;
  flex:1;
  display:grid;
  grid-template-columns:minmax(0,.96fr) minmax(300px,1.04fr);
  gap:28px;
  align-items:center;
  min-height:0;
  padding:22px 0 12px;
}

.bc .dsMain{
  min-width:0;
  max-width:none;
}

.bc .dsKicker{
  display:block;
  margin-bottom:10px;
  color:#087675;
  font-size:7.5px;
  font-weight:850;
  letter-spacing:.18em;
  text-transform:uppercase;
}

.bc .slide-impact .dsKicker,
.bc .slide-next .dsKicker{
  color:#7fd3d0;
}

.bc .deckSlide textarea{
  display:block;
  width:100%;
  min-height:0;
  padding:0;
  border:0;
  border-bottom:1px dashed transparent;
  outline:0;
  resize:none;
  overflow:hidden;
  background:transparent;
  color:#0a2728;
  font:700 clamp(27px,3.35vw,50px)/1.02 Georgia,"Times New Roman",serif;
  letter-spacing:-.045em;
  field-sizing:content;
}

.bc .slide-impact textarea,
.bc .slide-next textarea{
  color:#fff;
}

.bc .deckSlide textarea:hover,
.bc .deckSlide textarea:focus{
  border-bottom-color:#a9c5c0;
}

.bc .dsSub{
  max-width:470px;
  margin-top:12px;
  color:#011522;
  font-size:12px;
  line-height:1.45;
}

.bc .slide-impact .dsSub,
.bc .slide-next .dsSub{
  color:#fafafa;
}

.bc .dsBig{
  margin-top:17px;
}

.bc .dsBig strong{
  display:block;
  color:#087675;
  font:700 clamp(30px,3.3vw,48px)/1 Georgia,"Times New Roman",serif;
  letter-spacing:-.045em;
}

.bc .slide-impact .dsBig strong{
  color:#7fd3d0;
}

.bc .dsBig span{
  display:block;
  margin-top:5px;
  color:#71837f;
  font-size:9px;
}

.bc .slide-impact .dsBig span{
  color:#9fbebb;
}

.bc .dsList{
  display:grid;
  gap:9px;
  max-width:520px;
  margin-top:18px;
  padding:16px 0 0;
  border-top:1px solid #dfe6e2;
}

.bc .slide-impact .dsList,
.bc .slide-next .dsList{
  border-top-color:rgba(127,211,208,.18);
}

.bc .dsList li{
  display:grid;
  grid-template-columns:7px minmax(0,1fr);
  align-items:start;
  gap:10px;
  color:#011522;
  font-size:10px;
  line-height:1.45;
}

.bc .slide-impact .dsList li,
.bc .slide-next .dsList li{
  color:#d8e9e6;
}

.bc .dsList li>span{
  width:6px;
  height:6px;
  margin-top:.45em;
  border-radius:50%;
  background:#087675;
}

.bc .slide-impact .dsList li>span,
.bc .slide-next .dsList li>span{
  background:#7fd3d0;
}

/* visuals */
.bc .dsVisual{
  position:relative;
  display:grid;
  place-items:center;
  min-width:0;
  height:100%;
}

.bc .dsVisualGlow{
  position:absolute;
  inset:12% 6%;
  border-radius:50%;
  background:rgba(127,211,208,.11);
  filter:blur(34px);
}

.bc .dsVisual>img{
  position:relative;
  z-index:1;
  display:block;
  width:100%;
  height:100%;
  max-height:330px;
  object-fit:contain;
}

.bc .slide-current .dsVisual>img,
.bc .slide-risks .dsVisual>img{
  transform:scale(.96);
}

.bc .slide-impact .dsVisualGlow,
.bc .slide-next .dsVisualGlow{
  background:rgba(127,211,208,.12);
}

/* proof slide */
.bc .dsProof{
  display:grid;
  gap:7px;
  margin-top:16px;
}

.bc .dsProofRow{
  display:grid;
  grid-template-columns:1.1fr .75fr 1.4fr;
  gap:10px;
  align-items:center;
  padding:9px 10px;
  border:1px solid #dce5e2;
  border-radius:8px;
  background:rgba(255,255,255,.62);
}

.bc .dsProofRow span{
  color:#087675;
  font-size:8px;
  font-weight:800;
}

.bc .dsProofRow strong{
  color:#0a2728;
  font:700 12px Georgia,"Times New Roman",serif;
}

.bc .dsProofRow small{
  color:#697d79;
  font-size:7.5px;
  line-height:1.3;
}

/* risk slide */
.bc .dsRiskList{
  display:grid;
  gap:0;
  margin-top:16px;
  border-top:1px solid #dce5e2;
}

.bc .dsRiskRow{
  display:grid;
  grid-template-columns:27px 105px minmax(0,1fr);
  gap:8px;
  align-items:start;
  padding:10px 0;
  border-bottom:1px solid #dce5e2;
}

.bc .dsRiskRow>span{
  color:#087675;
  font-size:7px;
  font-weight:850;
}

.bc .dsRiskRow strong{
  color:#173734;
  font-size:8px;
}

.bc .dsRiskRow p{
  color:#6b7f7b;
  font-size:7.5px;
  line-height:1.35;
}

/* next steps slide */
.bc .dsSteps{
  display:grid;
  gap:10px;
  margin-top:18px;
}

.bc .dsSteps>div{
  display:grid;
  grid-template-columns:30px minmax(0,1fr);
  gap:10px;
  align-items:center;
}

.bc .dsSteps span{
  display:grid;
  place-items:center;
  width:26px;
  height:26px;
  border:1px solid rgba(127,211,208,.44);
  border-radius:50%;
  color:#7fd3d0;
  font-size:7px;
  font-weight:850;
}

.bc .dsSteps p{
  color:#d8e9e6;
  font-size:9px;
  line-height:1.4;
}

/* slide footer */
.bc .dsFoot{
  position:relative;
  z-index:3;
  display:grid;
  grid-template-columns:1fr auto 1fr;
  align-items:center;
  gap:18px;
  padding-top:10px;
  border-top:1px solid #dde5e1;
  color:#011522;
  opacity:.8;
  font-size:7px;
}

.bc .dsFoot span:nth-child(2){
  text-align:center;
}

.bc .dsFoot strong{
  color:#0a2728;
  font-size:7px;
  text-align:right;
}

.bc .slide-impact .dsFoot,
.bc .slide-next .dsFoot,
.bc .slide-proof .dsFoot{
  border-top-color:rgba(127,211,208,.17);
  color:#fafafa;
  opacity:.8;
}

.bc .slide-impact .dsFoot strong,
.bc .slide-next .dsFoot strong,
.bc .slide-proof .dsFoot strong{
  color:#fafafa;
}

/* controls */
.bc .deckBar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:20px;
  margin-top:18px;
}

.bc .deckNav{
  display:flex;
  align-items:center;
  gap:12px;
  color:#a8c4c0;
  font-size:10px;
  font-weight:700;
}

.bc .deckNav button{
  display:grid;
  place-items:center;
  width:38px;
  height:38px;
  border:1px solid rgba(127,211,208,.17);
  border-radius:9px;
  background:rgba(255,255,255,.035);
  color:#d2e7e4;
  cursor:pointer;
  transition:background .2s ease,border-color .2s ease;
}

.bc .deckNav button:hover:not(:disabled){
  border-color:rgba(127,211,208,.42);
  background:rgba(127,211,208,.07);
}

.bc .deckNav button:disabled{
  opacity:.32;
  cursor:default;
}

.bc .deckNav button svg{
  width:16px;
  height:16px;
}

.bc .deckActions{
  display:flex;
  align-items:center;
  gap:10px;
}

.bc .deckBtn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  min-height:46px;
  padding:0 22px;
  border-radius:8px;
  color:#fff;
  font-size:11px;
  font-weight:750;
  cursor:pointer;
  transition:
    background .18s ease,
    border-color .18s ease;
}

.bc .deckBtn svg{
  width:15px;
  height:15px;
}

.bc .deckBtn.primary{
  min-width:245px;
  border:1px solid #159b98;
  background:linear-gradient(135deg,#18a9a5,#087675);
  box-shadow:0 9px 24px rgba(8,118,117,.18);
}

.bc .deckBtn.primary:hover{
  transform:translateY(-1px);
  background:linear-gradient(135deg,#1cb5b0,#0a8582);
}

.bc .deckBtn.primary:disabled{
  opacity:.6;
  cursor:wait;
  transform:none;
}

.bc .deckBtn.ghost{
  min-width:180px;
  border:1px solid rgba(255,255,255,.36);
  background:transparent;
}

.bc .deckBtn.ghost:hover{
  border-color:rgba(255,255,255,.7);
  background:rgba(255,255,255,.05);
}

@media(max-width:1080px){
  .bc .deckWrap{
    grid-template-columns:1fr;
  }

  .bc .deckThumbs{
    grid-template-columns:repeat(6,minmax(0,1fr));
  }

  .bc .deckThumb{
    grid-template-columns:1fr;
    padding:5px;
  }

  .bc .thumbNum{
    display:none;
  }

  .bc .thumbMeta{
    display:none;
  }
}

@media(max-width:760px){
  .bc .summarySec{
    padding:72px 0 80px;
  }

  .bc .summaryHead h2{
    font-size:40px;
  }

  .bc .summaryHead p{
    font-size:14px;
  }

  .bc .deckThumbs{
    grid-template-columns:repeat(3,minmax(0,1fr));
  }

  .bc .deckFrame{
    padding:12px;
  }

  .bc .deckSlide{
    aspect-ratio:auto;
    min-height:570px;
    padding:20px 18px;
  }

  .bc .dsBody{
    grid-template-columns:1fr;
    gap:14px;
    padding:22px 0 12px;
  }

  .bc .dsVisual{
    min-height:180px;
  }

  .bc .dsVisual>img{
    max-height:200px;
  }

  .bc .dsTopRight span:first-child{
    display:none;
  }

  .bc .dsFoot span:nth-child(2){
    display:none;
  }

  .bc .dsFoot{
    grid-template-columns:1fr auto;
  }

  .bc .deckBar{
    flex-direction:column;
    align-items:stretch;
  }

  .bc .deckNav{
    justify-content:center;
  }

  .bc .deckActions{
    flex-direction:column;
  }

  .bc .deckBtn{
    width:100%;
  }
}


/* current-state stat cards */
.bc .dsCards{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-self:center}
.bc .dsCard{position:relative;display:flex;flex-direction:column;padding:20px 20px 18px;border:1px solid #dfe8e5;border-radius:10px;background:#fff;overflow:hidden;box-shadow:0 1px 2px rgba(8,43,43,.03),0 14px 30px rgba(8,43,43,.05)}
.bc .dsCard:before{content:"";position:absolute;left:0;top:0;right:0;height:2px;background:linear-gradient(90deg,#087675,#7fd3d0)}
.bc .dsCard .mi{display:grid;place-items:center;width:34px;height:34px;margin-bottom:16px;border-radius:50%;background:#e8f5f2;color:#087675}
.bc .dsCard .mi svg{width:17px;height:17px;stroke-width:1.8}
.bc .dsCard small{font-size:8px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#5f7773}
.bc .dsCard strong{margin-top:8px;font:700 clamp(24px,2.6vw,36px)/1 Georgia,"Times New Roman",serif;letter-spacing:-.045em;color:#0a2728;white-space:nowrap}
.bc .dsCard p{margin-top:10px;font-size:10px;line-height:1.4;color:#5f7773}


/* current-state cards: soft green, no border */
.bc .dsCards{gap:14px}
.bc .dsCard{padding:22px 22px 20px;border:0;border-radius:12px;background:#eaf3f0;box-shadow:none}
.bc .dsCard:before{display:none}
.bc .dsCard .mi{width:42px;height:42px;margin-bottom:18px;border-radius:10px;background:#d9ece6;color:#087675}
.bc .dsCard .mi svg{width:21px;height:21px}
.bc .dsCard small{font-size:11px;font-weight:700;letter-spacing:0;text-transform:none;color:#0a2728}
.bc .dsCard strong{margin-top:6px;font-size:clamp(22px,2.3vw,32px)}
.bc .dsCard p{margin-top:8px;font-size:9.5px;color:#011522}

/* paragraph under the title */
.bc .dsLead{max-width:340px;margin-top:18px;font-size:13px;line-height:1.65;color:#011522}

/* ---- slide 4: customer evidence (dark, full-width cards) ---- */
.bc .deckSlide.slide-proof{
  background:radial-gradient(circle at 78% 46%,rgba(22,114,115,.22),transparent 35%),#061f20;
  color:#fff;
}
.bc .slide-proof .dsLogo{padding:0;width:105px;border-radius:0;background:none}
.bc .slide-proof .dsTopRight{color:#9fbebb}
.bc .slide-proof .dsKicker{color:#7fd3d0}
.bc .slide-proof textarea{color:#fff}
.bc .slide-proof .dsSub{color:#fafafa;max-width:none}
.bc .slide-proof .dsFoot{border-top-color:rgba(127,211,208,.17);color:#fafafa}
.bc .slide-proof .dsFoot strong{color:#dff1ee}

/* image on the right is removed for this slide; cards take the full width */
.bc .slide-proof .dsVisual{display:none}
.bc .slide-proof .dsBody{grid-template-columns:1fr}

.bc .dsProof{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:18px}
.bc .dsProofCard{display:flex;flex-direction:column;padding:16px 18px 16px;border:1px solid rgba(127,211,208,.2);border-radius:10px;background:rgba(255,255,255,.04)}
.bc .dsProofLogo{display:block;height:20px;width:auto;max-width:120px;object-fit:contain;object-position:left;filter:brightness(0) invert(1)}
.bc .dsProofName{font:700 12px Inter,Arial,sans-serif;color:#fff;height:20px;display:flex;align-items:center}
.bc .dsProofRule{display:block;height:1px;margin:12px 0 14px;background:rgba(127,211,208,.22)}
.bc .dsProofCard>strong{font:700 clamp(18px,2.2vw,30px)/1.05 Georgia,"Times New Roman",serif;letter-spacing:-.04em;color:#fff}
.bc .dsProofCard>p{margin-top:6px;font-size:10px;line-height:1.4;color:#b8d1ce}
.bc .dsProofNote{display:flex;align-items:center;gap:9px;margin-top:14px}
.bc .dsProofNote .mi{display:grid;place-items:center;flex:none;width:28px;height:28px;border:1px solid rgba(127,211,208,.5);border-radius:7px;color:#7fd3d0}
.bc .dsProofNote .mi svg{width:15px;height:15px;stroke-width:1.7}
.bc .dsProofNote span:last-child{font-size:9px;line-height:1.35;color:#d8e9e6}

.bc .dsProofLink{
  display:inline-flex;align-items:center;gap:8px;
  align-self:flex-start;
  margin-top:auto;padding-top:16px;
  font:600 9.5px Inter,Arial,sans-serif;letter-spacing:.04em;
  color:#7fd3d0;
  text-decoration:none;
  transition:gap .2s ease,color .2s ease;
}
.bc .dsProofLink svg{width:12px;height:12px;stroke-width:2;transition:transform .2s ease}
.bc .dsProofLink:hover{gap:12px;color:#fff}
.bc .dsProofLink:hover svg{transform:translateX(2px)}
.bc .dsProofLink:focus-visible{outline:2px solid #7fd3d0;outline-offset:4px;border-radius:3px}



/* ---- slide 5: validation (image removed, full-width rows) ---- */
.bc .slide-risks .dsVisual{display:none}
.bc .slide-risks .dsBody{grid-template-columns:1fr}
.bc .slide-risks .dsRiskList{gap:8px;margin-top:18px;border-top:0}
.bc .slide-risks .dsRiskRow{
  display:grid;grid-template-columns:28px 34px 170px minmax(0,1fr);
  align-items:center;gap:12px;
    padding:8px 16px;
  border:1px solid rgba(8,118,117,.18);border-radius:10px;
  background:transparent;
}
.bc .dsRiskRow>em{font-style:normal;font-size:9px;font-weight:800;color:#087675;letter-spacing:.04em}
.bc .dsRiskRow>span.mi{display:grid;place-items:center;width:30px;height:30px;border-radius:8px;background:#e8f5f2;color:#087675}



.bc .dsRiskRow>span.mi svg{width:16px;height:16px;stroke-width:1.7}
.bc .slide-risks .dsRiskRow strong{font:700 12px Georgia,"Times New Roman",serif;letter-spacing:-.02em;color:#0a2728}
.bc .slide-risks .dsRiskRow p{padding-left:18px;border-left:1px solid #dce5e2;font-size:9.5px;line-height:1.4;color:#011522}

@media(max-width:760px){
  .bc .slide-risks .dsRiskRow{grid-template-columns:24px 30px minmax(0,1fr)}
  .bc .slide-risks .dsRiskRow p{grid-column:1/-1;padding-left:0;border-left:0}
}

@media(max-width:760px){
  .bc .dsProof{grid-template-columns:1fr}
  .bc .dsProofLink{margin-top:14px;padding-top:0}
}

/* ---- slide 6: next steps (image removed, three boxes) ---- */
.bc .slide-next .dsVisual{display:none}
.bc .slide-next .dsBody{grid-template-columns:1fr}
.bc .slide-next .dsSub{max-width:none}

.bc .dsNext{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:18px}
.bc .dsNextCard{position:relative;display:flex;flex-direction:column;padding:16px 18px 24px;border:1px solid rgba(127,211,208,.2);border-radius:10px;background:rgba(255,255,255,.04);overflow:hidden}
.bc .dsNextCard:after{content:"";position:absolute;left:18px;bottom:0;width:34px;height:2px;background:#7fd3d0}
.bc .dsNextTop{display:flex;align-items:center;gap:8px}
.bc .dsNextNum{display:grid;place-items:center;width:26px;height:26px;border:1px solid rgba(127,211,208,.5);border-radius:50%;font-size:7.5px;font-weight:850;color:#7fd3d0}
.bc .dsNextTop .mi{display:grid;place-items:center;width:28px;height:28px;border-radius:7px;background:rgba(127,211,208,.1);color:#7fd3d0}
.bc .dsNextTop .mi svg{width:15px;height:15px;stroke-width:1.7}
.bc .dsNextCard>strong{margin-top:14px;font:700 11px/1.25 Georgia,"Times New Roman",serif;letter-spacing:-.01em;color:#fff}
.bc .dsNextCard>p{margin-top:5px;font-size:9px;line-height:1.4;color:#b8d1ce}
.bc .dsNextCard>a{margin-top:10px;font-size:9px;line-height:1.4;color:#7fd3d0;text-decoration:none;transition:color .2s ease}
.bc .dsNextCard>a:hover{color:#fff}

@media(max-width:760px){
  .bc .dsNext{grid-template-columns:1fr}
}

/* ---- slide 3: projected impact (image removed, 3 boxes + 1 wide) ---- */
.bc .slide-impact .dsVisual{display:none}
.bc .slide-impact .dsBody{grid-template-columns:1fr}
.bc .slide-impact .dsSub{max-width:none}

.bc .dsImpact{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:16px}
.bc .dsImpactCard{display:flex;flex-direction:column;padding:14px 16px 14px;border:1px solid rgba(127,211,208,.2);border-radius:10px;background:rgba(255,255,255,.04)}
.bc .dsImpactTop{display:flex;align-items:center;gap:12px}
.bc .dsImpactTop i{display:block;flex:1;height:1px;background:rgba(127,211,208,.22)}
.bc .dsImpactTop .mi,.bc .dsImpactTotal .mi{display:grid;place-items:center;flex:none;width:30px;height:30px;border:1px solid rgba(127,211,208,.3);border-radius:8px;background:rgba(127,211,208,.1);color:#7fd3d0}
.bc .dsImpactTop .mi svg,.bc .dsImpactTotal .mi svg{width:16px;height:16px;stroke-width:1.7}
.bc .dsImpactCard>strong{margin-top:12px;font:700 clamp(18px,2.2vw,30px)/1 Georgia,"Times New Roman",serif;letter-spacing:-.04em;color:#7fd3d0;white-space:nowrap}
.bc .dsImpactCard>p{margin-top:6px;font-size:10px;line-height:1.4;color:#fafafa}

.bc .dsImpactTotal{grid-column:1/-1;display:flex;align-items:center;gap:18px;padding:12px 16px;border:1px solid rgba(127,211,208,.4);border-radius:10px;background:linear-gradient(90deg,rgba(22,114,115,.45),rgba(22,114,115,.12))}
.bc .dsImpactTotal>strong{font:700 clamp(18px,2.4vw,32px)/1 Georgia,"Times New Roman",serif;letter-spacing:-.04em;color:#fff;white-space:nowrap}
.bc .dsImpactTotal>span:last-child{padding-left:18px;border-left:1px solid rgba(127,211,208,.3);font-size:11px;color:#e0efec}

@media(max-width:760px){
  .bc .dsImpact{grid-template-columns:1fr}
  .bc .dsImpactTotal{flex-wrap:wrap}
}

/* =========================================================
   DECK: fixed 1280x720 canvas, scaled to fit the frame
   ========================================================= */
.bc .deckStage .deckFrame{position:relative;overflow:hidden;padding:0;border:0;border-radius:14px;background:#041b1c;box-shadow:0 0 0 1px rgba(127,211,208,.18),0 24px 70px rgba(0,0,0,.18)}
.bc .deckStage .deckFrame .deckSlide{position:absolute;top:0;left:0;width:1280px;height:720px;min-height:0;aspect-ratio:auto;padding:44px 72px 34px;border-radius:0;box-shadow:none;transform-origin:top left}

/* top bar */
.bc .deckSlide .dsTop{min-height:56px;gap:32px}
.bc .deckSlide .dsLogo{width:150px}
.bc .deckSlide.slide-impact .dsLogo,
.bc .deckSlide.slide-next .dsLogo,
.bc .deckSlide.slide-proof .dsLogo{width:172px;padding:0;border-radius:0;background:none}
.bc .deckSlide .dsTopRight{gap:36px;font-size:15px;letter-spacing:.05em}
.bc .deckSlide .dsTopRight span{display:inline;margin:0}

/* body grid */
.bc .deckSlide .dsBody{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px;align-items:center;padding:12px 0 8px}
.bc .deckSlide.slide-impact .dsBody,
.bc .deckSlide.slide-proof .dsBody,
.bc .deckSlide.slide-risks .dsBody,
.bc .deckSlide.slide-next .dsBody{grid-template-columns:1fr}
.bc .deckSlide .dsMain{max-width:none}

/* type */
.bc .deckSlide .dsKicker{margin-bottom:18px;font-size:15px;letter-spacing:.22em}
.bc .deckSlide textarea{font-size:76px;line-height:1.03;letter-spacing:-.045em}
.bc .deckSlide.slide-impact textarea,
.bc .deckSlide.slide-proof textarea,
.bc .deckSlide.slide-risks textarea,
.bc .deckSlide.slide-next textarea{font-size:56px}
.bc .deckSlide .dsSub{max-width:640px;margin-top:22px;font-size:22px;line-height:1.5}
.bc .deckSlide.slide-impact .dsSub,
.bc .deckSlide.slide-proof .dsSub,
.bc .deckSlide.slide-next .dsSub{max-width:none;margin-top:14px;font-size:21px}
.bc .deckSlide .dsLead{max-width:520px;margin-top:26px;font-size:22px;line-height:1.6}
.bc .deckSlide .dsBig{margin-top:28px}
.bc .deckSlide .dsBig strong{font-size:88px}
.bc .deckSlide .dsBig span{margin-top:10px;font-size:20px}

/* cover bullets */
.bc .deckSlide .dsList{gap:18px;max-width:none;margin-top:32px;padding-top:30px}
.bc .deckSlide .dsList li{grid-template-columns:12px minmax(0,1fr);gap:16px;font-size:22px;line-height:1.45}
.bc .deckSlide .dsList li>span{width:10px;height:10px;margin-top:.5em}

/* cover image */
.bc .deckSlide .dsVisual{min-height:0}
.bc .deckSlide .dsVisual>img{max-height:500px}

/* slide 2: current state cards */
.bc .deckSlide .dsCards{gap:16px}
.bc .deckSlide .dsCard{padding:24px 26px 22px;border-radius:14px}
.bc .deckSlide .dsCard .mi{width:48px;height:48px;margin-bottom:16px;border-radius:12px}
.bc .deckSlide .dsCard .mi svg{width:24px;height:24px}
.bc .deckSlide .dsCard small{font-size:17px}
.bc .deckSlide .dsCard strong{margin-top:8px;font-size:44px}
.bc .deckSlide .dsCard p{margin-top:10px;font-size:16px;line-height:1.4}

/* slide 3: projected impact */
.bc .deckSlide .dsImpact{gap:22px;margin-top:26px}
.bc .deckSlide .dsImpactCard{padding:24px 28px;border-radius:14px}
.bc .deckSlide .dsImpactTop{gap:18px}
.bc .deckSlide .dsImpactTop .mi,
.bc .deckSlide .dsImpactTotal .mi{width:46px;height:46px;border-radius:12px}
.bc .deckSlide .dsImpactTop .mi svg,
.bc .deckSlide .dsImpactTotal .mi svg{width:23px;height:23px}
.bc .deckSlide .dsImpactCard>strong{margin-top:22px;font-size:44px}
.bc .deckSlide .dsImpactCard>p{margin-top:10px;font-size:17px;line-height:1.4}
.bc .deckSlide .dsImpactTotal{gap:26px;padding:20px 30px;border-radius:14px}
.bc .deckSlide .dsImpactTotal>strong{font-size:46px}
.bc .deckSlide .dsImpactTotal>span:last-child{padding-left:26px;font-size:20px}

/* slide 4: customer evidence */
.bc .deckSlide .dsProof{grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:26px}
.bc .deckSlide .dsProofCard{padding:28px 30px 26px;border-radius:14px}
.bc .deckSlide .dsProofLogo{height:34px;max-width:200px}
.bc .deckSlide .dsProofName{height:34px;font-size:20px}
.bc .deckSlide .dsProofRule{margin:20px 0 22px}
.bc .deckSlide .dsProofCard>strong{font-size:46px}
.bc .deckSlide .dsProofCard>p{margin-top:10px;font-size:18px;line-height:1.4}
.bc .deckSlide .dsProofNote{gap:14px;margin-top:24px}
.bc .deckSlide .dsProofNote .mi{width:44px;height:44px;border-radius:10px}
.bc .deckSlide .dsProofNote .mi svg{width:22px;height:22px}
.bc .deckSlide .dsProofNote span:last-child{font-size:16px;line-height:1.4}
.bc .deckSlide .dsProofLink{gap:10px;padding-top:22px;font-size:16px}
.bc .deckSlide .dsProofLink svg{width:16px;height:16px}

/* slide 5: validation */
.bc .deckSlide .dsRiskList{gap:14px;margin-top:26px;border-top:0}
.bc .deckSlide .dsRiskRow{grid-template-columns:44px 52px 290px minmax(0,1fr);gap:20px;align-items:center;padding:16px 28px;border-radius:14px}
.bc .deckSlide .dsRiskRow>em{font-size:16px}
.bc .deckSlide .dsRiskRow>span.mi{width:50px;height:50px;border-radius:12px}
.bc .deckSlide .dsRiskRow>span.mi svg{width:25px;height:25px}
.bc .deckSlide .dsRiskRow strong{font-size:23px}
.bc .deckSlide .dsRiskRow p{grid-column:auto;padding-left:28px;border-left:1px solid #dce5e2;font-size:18px;line-height:1.45}

/* slide 6: next steps */
.bc .deckSlide .dsNext{grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:30px}
.bc .deckSlide .dsNextCard{min-height:270px;padding:28px 30px 40px;border-radius:14px}
.bc .deckSlide .dsNextCard:after{left:30px;width:56px;height:3px}
.bc .deckSlide .dsNextTop{gap:14px}
.bc .deckSlide .dsNextNum{width:46px;height:46px;font-size:14px}
.bc .deckSlide .dsNextTop .mi{width:48px;height:48px;border-radius:12px}
.bc .deckSlide .dsNextTop .mi svg{width:24px;height:24px}
.bc .deckSlide .dsNextCard>strong{margin-top:26px;font-size:27px;line-height:1.25}
.bc .deckSlide .dsNextCard>p,
.bc .deckSlide .dsNextCard>a{margin-top:12px;font-size:18px;line-height:1.5}

/* footer */
.bc .deckSlide .dsFoot{grid-template-columns:1fr auto 1fr;gap:24px;padding-top:16px;font-size:14px}
.bc .deckSlide .dsFoot span:nth-child(2){display:block}
.bc .deckSlide .dsFoot strong{font-size:18px}

/* cover bullets: dark icons instead of green dots */
.bc .deckSlide .dsList li:has(.mi){grid-template-columns:34px minmax(0,1fr);gap:18px;align-items:center}
.bc .deckSlide .dsList .mi{display:grid;place-items:center;width:34px;height:34px;background:none;border-radius:0;color:#0a2728}
.bc .deckSlide .dsList .mi svg{width:30px;height:30px;stroke-width:1.5}


/* cover bullets: smaller, single line */
.bc .deckSlide.slide-cover .dsList{gap:14px;margin-top:26px;padding-top:24px}
.bc .deckSlide.slide-cover .dsList li,
.bc .deckSlide.slide-cover .dsList li:has(.mi){grid-template-columns:24px auto;gap:14px;align-items:center;font-size:17px;line-height:1.3;white-space:nowrap}
.bc .deckSlide.slide-cover .dsList .mi{width:24px;height:24px}
.bc .deckSlide.slide-cover .dsList .mi svg{width:22px;height:22px;stroke-width:1.5}

/* give the text column more room on the cover */
.bc .deckSlide.slide-cover .dsBody{grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr)}
.bc .deckSlide.slide-cover .dsList{max-width:none}


/* cover bullets: icon and text on the same line */
.bc .deckSlide.slide-cover .dsList li,
.bc .deckSlide.slide-cover .dsList li:has(.mi){
  display:flex;
  align-items:center;
  gap:14px;
  line-height:1;
}
.bc .deckSlide.slide-cover .dsList .mi{
  display:flex;
  align-items:center;
  justify-content:center;
  flex:none;
  width:24px;
  height:24px;
  margin:0;
  padding:0;
  line-height:0;
}
.bc .deckSlide.slide-cover .dsList .mi svg{
  display:block;
  width:22px;
  height:22px;
  margin:0;
}

  /* slide 3 and 4 (customer evidence): remove footer line bleeding into the cards */
.bc .deckSlide.slide-proof .dsFoot,
.bc .deckSlide.slide-impact .dsFoot{border-top:0}

/* slide 4: tighter cards so they clear the footer */
.bc .deckSlide.slide-proof .dsProof{margin-top:20px;gap:20px}
.bc .deckSlide.slide-proof .dsProofCard{padding:24px 28px 22px}
.bc .deckSlide.slide-proof .dsProofCard>strong{font-size:40px;white-space:nowrap}
.bc .deckSlide.slide-proof .dsProofRule{margin:16px 0 18px}
.bc .deckSlide.slide-proof .dsProofNote{margin-top:18px}
.bc .deckSlide.slide-proof .dsProofLink{padding-top:16px}
.bc .deckSlide.slide-proof .dsBody{padding-bottom:0}



/* slides 3, 4 and 6: transparent card backgrounds */
.bc .deckSlide .dsImpactCard,
.bc .deckSlide .dsProofCard,
.bc .deckSlide .dsNextCard{
  background:transparent;
  backdrop-filter:none;
}


/* =========================================================
   DECK CONTROLS: bigger, premium
   ========================================================= */
.bc .deckStage .deckBar{
  align-items:center;
  justify-content:space-between;
  gap:28px;
  margin-top:32px;
  padding-top:28px;
  border-top:1px solid rgba(127,211,208,.14);
}

/* prev / next + counter */
.bc .deckStage .deckNav{
  display:flex;
  align-items:center;
  gap:18px;
  color:#cfe4e1;
  font-size:16px;
  font-weight:600;
  letter-spacing:.02em;
}
.bc .deckStage .deckNav button{
  width:56px;
  height:56px;
  border:1px solid rgba(127,211,208,.28);
  border-radius:14px;
  background:rgba(255,255,255,.04);
  color:#fff;
  transition:background .2s ease,border-color .2s ease,transform .2s ease;
}
.bc .deckStage .deckNav button:hover:not(:disabled){
  border-color:rgba(127,211,208,.7);
  background:rgba(127,211,208,.1);
  transform:translateY(-1px);
}
.bc .deckStage .deckNav button:disabled{opacity:.28}
.bc .deckStage .deckNav button svg{width:22px;height:22px;stroke-width:1.8}
.bc .deckStage .deckNav>span{
  min-width:128px;
  text-align:center;
  font-size:16px;
  font-weight:600;
  color:#e3f1ef;
}

/* action buttons */
.bc .deckStage .deckActions{gap:14px}
.bc .deckStage .deckBtn{
  min-height:60px;
  padding:0 34px;
  gap:14px;
  border-radius:8px;
  font:650 16px/1 Inter,Arial,sans-serif;
  letter-spacing:.01em;
}
.bc .deckStage .deckBtn svg{width:21px;height:21px;stroke-width:1.9}

.bc .deckStage .deckBtn.primary{
  min-width:300px;
  border:1px solid #167273;
  background:#167273;
  box-shadow:none;
}
.bc .deckStage .deckBtn.primary:hover:not(:disabled){
  background:#1a8586;
  border-color:#1a8586;
  box-shadow:none;
}

.bc .deckStage .deckBtn.ghost{
  min-width:220px;
  border:1px solid rgba(255,255,255,.3);
  background:rgba(255,255,255,.03);
}
.bc .deckStage .deckBtn.ghost:hover{
  transform:translateY(-2px);
  border-color:rgba(255,255,255,.65);
  background:rgba(255,255,255,.08);
}

@media(max-width:1180px){
  .bc .deckStage .deckBar{flex-wrap:wrap}
  .bc .deckStage .deckBtn.primary{min-width:260px}
  .bc .deckStage .deckBtn.ghost{min-width:190px}
}
@media(max-width:760px){
  .bc .deckStage .deckBar{flex-direction:column;align-items:stretch;gap:20px}
  .bc .deckStage .deckNav{justify-content:center}
  .bc .deckStage .deckActions{flex-direction:column}
  .bc .deckStage .deckBtn,
  .bc .deckStage .deckBtn.primary,
  .bc .deckStage .deckBtn.ghost{width:100%;min-width:0}
}


/* =========================================================
   MOBILE OVERRIDES — keep at the very end of the css string
   ========================================================= */
.bc{overflow-x:clip}

@media(max-width:900px){
  /* impact panel: stack chart under KPIs */
  .bc .impactChartArea{grid-column:1;grid-row:auto;margin-top:8px}
  .bc .impactHead{flex-direction:column;gap:16px}
  .bc .impactHead .seg{width:100%}

  /* calculator: single column */
  .bc .stepCardBody{grid-template-columns:1fr}
  .bc .stepCardTop{width:100%}
  .bc .quickTips{margin-top:0}
  .bc .railStep{min-height:64px}
}

@media(max-width:600px){
  .bc .wrap,
  .bc .modelSec .wrap{width:calc(100% - 32px)}

  /* hero */
  .bc .deck{font-size:16px;line-height:1.65}
  .bc .btns .btn{width:100%}

  /* calculator */
  .bc .modelSec{padding:48px 0 56px}
  .bc .stepCard{padding:18px 14px}
  .bc .stepHeading h3{font-size:28px}
  .bc .stepHeading p{font-size:14px}
  .bc .calcField{position:relative;grid-template-columns:minmax(0,1fr) 128px;padding:14px 12px}
  .bc .fieldControl input{font-size:17px}
  .bc .quickTips{padding:20px 16px}
  .bc .quickTipsHead h4{font-size:24px}
  .bc .tipNum{flex-basis:36px;width:36px;height:36px}

  /* tooltips: anchor to the card so they never run off-screen */
  .bc .fieldLabel .tipIcon,
  .bc .chartTitleRow .tipIcon{position:static}
  .bc .fieldLabel .tipBubble,
  .bc .chartTitleRow .tipBubble{left:0;right:0;width:auto;bottom:calc(100% + 8px)}
  .bc .fieldLabel .tipBubble:after,
  .bc .chartTitleRow .tipBubble:after{display:none}

  /* impact panel */
  .bc .impactPanel{padding:20px 14px}
  .bc .impactHead h3{font-size:28px}
  .bc .kpis{gap:10px;margin-bottom:20px}
  .bc .kpi{align-items:flex-start;gap:0;min-height:0;padding:20px 18px}
  .bc .kpiLabel{margin-bottom:12px}
  .bc .kpiValue{font-size:30px}
  .bc .kpiDescription{margin-top:10px;font-size:14px;text-align:left}

  /* chart */
  .bc .chartShell{height:270px;grid-template-columns:44px minmax(0,1fr);gap:6px}
  .bc .axis{padding-bottom:58px}
  .bc .gridLines{inset:0 0 58px}
  .bc .chart{gap:8px;padding:0 2px 58px}
  .bc .barItem .bar{width:80%}
  .bc .barItem em{font-size:12px}
  .bc .barItem>span{width:100%;top:calc(100% + 10px);font-size:11px}
  .bc .impactNote{grid-template-columns:12px minmax(0,1fr);gap:12px;padding:14px}
  .bc .impactNote:before{display:none}

  /* executive summary */
  .bc .summarySec{padding:64px 0 72px}
  .bc .summaryHead h2{font-size:34px}
  .bc .summaryHead p{font-size:15px}
  .bc .deckWrap{margin-top:32px;gap:16px}
  .bc .deckStage .deckBar{margin-top:20px;padding-top:20px}
  .bc .deckStage .deckNav button{width:48px;height:48px}
  .bc .deckStage .deckBtn{min-height:54px;padding:0 20px;font-size:15px}

  /* FAQ */
  .bc .faqSec{padding-block:56px}
  .bc .faqSec .faqIntro h2{font-size:34px;line-height:1.08}
  .bc .faqSec .faqIntro>p{font-size:16px;margin-top:18px}
  .bc .faqSec .faqIntro .textAction{font-size:16px;margin-top:24px}
  .bc .faqSec .faqIntro .textAction svg{width:20px;height:20px}
  .bc .faqSec .faq summary span{font-size:19px}
  .bc .faqSec .faq .faqNum{font-size:13px}
  .bc .faqSec .faq details p{font-size:16px}

  /* final CTA: this is the cut-off in screenshot 1 */
  .bc .final{padding:56px 0 28px}
  .bc .final .ctaCard{grid-template-columns:minmax(0,1fr);gap:36px;padding:28px 20px}
  .bc .final .ctaCopy{min-width:0}
  .bc .final .ctaCopy h2{font-size:36px}
  .bc .final .ctaText{font-size:16px}
  .bc .final .ctaBtns{flex-direction:column;flex-wrap:wrap;gap:12px}
  .bc .final .ctaBtn{width:100%;white-space:normal;min-height:56px}
  .bc .final .ctaStep p{max-width:none;font-size:15px}
}
`;
