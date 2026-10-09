"use client";

/**
 * JENZABAR JENZABAR IMPLEMENTATION PLAN
 * Independent portfolio concept by GrowUp; not a Jenzabar product or official plan.
 * Install: npm i lucide-react pptxgenjs
 * Drop this file into a React / Next.js project and render the default export.
 * The official Jenzabar butterfly logo is loaded from a published Jenzabar press asset.
 * For a production deployment, place an approved official logo at /images/logos/jenzabar.png
 * and set logoSrc accordingly.
 */
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRight, ArrowLeft, ArrowUpRight, CalendarDays, Check, CheckCircle2,
  ChevronDown, ChevronLeft, ChevronRight, CircleHelp, ClipboardList,
  Copy, FileDown, FileText, Gauge, GraduationCap,
  Landmark, Layers3, LayoutDashboard, Minus, Plus, 
  RotateCcw, ShieldAlert, SlidersHorizontal, Users, X,
} from "lucide-react";

export type Props = {
  demoHref?: string;
  portfolioHref?: string;
  /** Best: use the approved Jenzabar logo saved locally at /images/logos/jenzabar.png. */
  logoSrc?: string;
};

type ModuleKey = "student" | "finance" | "aid" | "hr" | "analytics" | "integrations";
type PhaseKey = "discovery" | "data" | "integration" | "finance" | "aid" | "records" | "training" | "cutover";
type RoleKey = "it" | "registrar" | "finance" | "aid" | "research" | "leadership";
type Owner = "jenzabar" | "shared" | "institution";
type Tab = "timeline" | "phases" | "months";
type WizardStep = 1 | 2 | 3 | 4 | 5;

type Config = {
  size: number;
  institutionType: string;
  sis: string;
  erp: string;
  modules: ModuleKey[];
  integrations: number;
  dataComplexity: "low" | "standard" | "high";
  startMonth: string;
  targetMonth: string;
  registrationMonths: number[];
  financialAidMonth: number;
  fiscalMonth: number;
  freezesEnabled: boolean;
};

type PhaseDefinition = {
  key: PhaseKey;
  name: string;
  owner: Owner;
  desc: string;
  deliverable: string;
  from: number;
  to: number;
  relevant?: ModuleKey;
  roles: Partial<Record<RoleKey, number>>;
};

type PlannedPhase = PhaseDefinition & { start: number; duration: number; end: number };
type RiskWindow = { id: string; index: number; label: string; detail: string; level: "High" | "Medium"; kind: "registration" | "aid" | "fiscal" };
 

const BRAND_LOGO = "https://mms.businesswire.com/media/20250730745865/en/2538073/22/Jenzabar_Butterfly_Logo_Color_Horiz.jpg";
const MODS: Array<{ key: ModuleKey; name: string }> = [
  { key: "student", name: "Student information" },
  { key: "finance", name: "Finance / ERP" },
  { key: "aid", name: "Financial aid" },
  { key: "hr", name: "HR / Payroll" },
  { key: "analytics", name: "Reporting & analytics" },
  { key: "integrations", name: "Integrations" },
];
const ROLE: Array<{ key: RoleKey; name: string; short: string; description: string }> = [
  { key: "it", name: "CIO / IT", short: "IT", description: "Integration, architecture, technical validation and cutover." },
  { key: "registrar", name: "Registrar", short: "Registrar", description: "Student records, registration workflows and user acceptance." },
  { key: "finance", name: "Finance", short: "Finance", description: "ERP processes, data reconciliation and fiscal controls." },
  { key: "aid", name: "Financial aid", short: "Financial aid", description: "Award processing, reporting, verification and compliance checks." },
  { key: "research", name: "Institutional research", short: "IR", description: "Data definitions, reports, validation and institutional measures." },
  { key: "leadership", name: "Project sponsor / PMO", short: "PMO", description: "Governance, scope, decisions and change management." },
];
const BASE_CAPACITY: Record<RoleKey, number> = {
  it: 86, registrar: 58, finance: 52, aid: 54, research: 44, leadership: 32,
};
const DEFAULT_CONFIG: Config = {
  size: 4500,
  institutionType: "Private college / university",
  sis: "Legacy or on-premise SIS",
  erp: "Separate finance / ERP",
  modules: [],
  integrations: 6,
  dataComplexity: "standard",
  startMonth: "2026-11",
  targetMonth: "2028-02",
  registrationMonths: [1, 8],
  financialAidMonth: 7,
  fiscalMonth: 6,
  freezesEnabled: true,
};
const PHASES: PhaseDefinition[] = [
  { key: "discovery", name: "Discovery & planning", owner: "shared", desc: "Confirm scope, governance, institutional requirements and the definition of a successful go-live.", deliverable: "Approved scope and project charter", from: 0, to: .19, roles: { it: 26, registrar: 12, finance: 12, aid: 10, research: 9, leadership: 23 } },
  { key: "data", name: "Data migration", owner: "shared", desc: "Inventory sources, map fields, clean institutional data and complete test conversions.", deliverable: "Verified migration datasets", from: .16, to: .55, roles: { it: 34, registrar: 24, finance: 18, aid: 22, research: 32, leadership: 7 } },
  { key: "integration", name: "Integrations", owner: "shared", desc: "Specify, build and validate connections with retained campus services and third parties.", deliverable: "Tested integration inventory", from: .26, to: .66, relevant: "integrations", roles: { it: 52, registrar: 9, finance: 12, aid: 12, research: 10, leadership: 6 } },
  { key: "finance", name: "Finance configuration", owner: "shared", desc: "Configure chart of accounts, approvals, billing and reconciliation workflows.", deliverable: "Finance process sign-off", from: .37, to: .73, relevant: "finance", roles: { it: 12, finance: 48, research: 5, leadership: 5 } },
  { key: "aid", name: "Financial aid", owner: "shared", desc: "Validate workflows, integrations, packaging and key disbursement controls.", deliverable: "Aid workflow test results", from: .40, to: .77, relevant: "aid", roles: { it: 13, registrar: 8, aid: 52, research: 9, leadership: 5 } },
  { key: "records", name: "Student records", owner: "shared", desc: "Configure course, registration, records and student-facing administrative processes.", deliverable: "Registrar acceptance sign-off", from: .49, to: .85, relevant: "student", roles: { it: 17, registrar: 50, finance: 8, aid: 8, research: 11, leadership: 5 } },
  { key: "training", name: "Testing & training", owner: "shared", desc: "Run end-to-end user acceptance, prepare support teams and complete role-based training.", deliverable: "UAT completion and readiness report", from: .67, to: .94, roles: { it: 27, registrar: 32, finance: 25, aid: 26, research: 14, leadership: 22 } },
  { key: "cutover", name: "Go-live readiness", owner: "shared", desc: "Execute cutover rehearsals, confirm stop/go criteria and prepare operational support.", deliverable: "Go / no-go decision", from: .88, to: 1, roles: { it: 52, registrar: 30, finance: 28, aid: 29, research: 13, leadership: 29 } },
];

type ActivityStage = {
  focus: string;
  activities: string[];
  outcome: string;
};

type PhaseActivityPlan = {
  start: ActivityStage;
  middle: ActivityStage;
  end: ActivityStage;
};

const PHASE_ACTIVITIES: Record<PhaseKey, PhaseActivityPlan> = {
  discovery: {
    start: {
      focus: "Establish project requirements",
      activities: [
        "Confirm project objectives, institutional priorities and implementation scope.",
        "Identify departmental leads, decision-makers and project governance.",
        "Review existing systems, dependencies and academic calendar constraints.",
      ],
      outcome: "Initial scope and project governance defined",
    },
    middle: {
      focus: "Develop the implementation approach",
      activities: [
        "Document departmental workflows and configuration requirements.",
        "Identify migration, integration and reporting dependencies.",
        "Agree working arrangements, project milestones and escalation procedures.",
      ],
      outcome: "Requirements and implementation approach reviewed",
    },
    end: {
      focus: "Confirm implementation readiness",
      activities: [
        "Review outstanding requirements and project dependencies.",
        "Confirm departmental responsibilities and resource allocations.",
        "Obtain approval of the proposed scope and implementation schedule.",
      ],
      outcome: "Project scope and delivery plan approved",
    },
  },

  data: {
    start: {
      focus: "Assess existing institutional data",
      activities: [
        "Inventory student, financial and administrative data sources.",
        "Identify data owners, formats and historical record requirements.",
        "Document data quality issues and initial field mappings.",
      ],
      outcome: "Source inventory and migration requirements established",
    },
    middle: {
      focus: "Prepare and convert institutional records",
      activities: [
        "Clean duplicate, incomplete and inconsistent records.",
        "Develop and refine conversion rules and field mappings.",
        "Run trial migrations and investigate conversion errors.",
      ],
      outcome: "Trial conversions completed and exceptions documented",
    },
    end: {
      focus: "Validate migrated data",
      activities: [
        "Reconcile converted records against source systems.",
        "Resolve outstanding data quality and conversion exceptions.",
        "Confirm departmental acceptance of migration results.",
      ],
      outcome: "Migration results validated for go-live readiness",
    },
  },

  integration: {
    start: {
      focus: "Confirm integration requirements",
      activities: [
        "Identify external systems and connections being retained.",
        "Document interface requirements, owners and data exchanges.",
        "Confirm technical dependencies and access requirements.",
      ],
      outcome: "Integration inventory and specifications established",
    },
    middle: {
      focus: "Configure and test integrations",
      activities: [
        "Configure interfaces and data exchange processes.",
        "Test connectivity, data formats and error handling.",
        "Coordinate technical changes with third-party providers.",
      ],
      outcome: "Integration testing completed and issues documented",
    },
    end: {
      focus: "Validate production integrations",
      activities: [
        "Complete end-to-end integration testing.",
        "Resolve critical interface and data exchange issues.",
        "Confirm monitoring, ownership and operational support arrangements.",
      ],
      outcome: "Integrations validated for operational use",
    },
  },

  finance: {
    start: {
      focus: "Define financial processes",
      activities: [
        "Review accounting, billing and purchasing workflows.",
        "Confirm chart of accounts and financial reporting requirements.",
        "Identify financial controls and reconciliation dependencies.",
      ],
      outcome: "Finance configuration requirements documented",
    },
    middle: {
      focus: "Configure finance workflows",
      activities: [
        "Configure accounting structures, approvals and billing processes.",
        "Test financial transactions and reporting outputs.",
        "Review configuration with finance stakeholders.",
      ],
      outcome: "Core finance processes configured and tested",
    },
    end: {
      focus: "Validate financial controls",
      activities: [
        "Reconcile representative financial transactions.",
        "Complete finance user acceptance testing.",
        "Review outstanding issues and obtain departmental sign-off.",
      ],
      outcome: "Financial workflows and controls accepted",
    },
  },

  aid: {
    start: {
      focus: "Review financial aid requirements",
      activities: [
        "Document financial aid workflows and reporting needs.",
        "Identify award processing and disbursement dependencies.",
        "Review compliance and student record requirements.",
      ],
      outcome: "Financial aid requirements confirmed",
    },
    middle: {
      focus: "Configure and test aid processes",
      activities: [
        "Configure applicable financial aid workflows.",
        "Test award processing and student record interactions.",
        "Validate reporting outputs and operational exceptions.",
      ],
      outcome: "Financial aid workflows tested",
    },
    end: {
      focus: "Confirm financial aid readiness",
      activities: [
        "Complete representative disbursement and processing tests.",
        "Resolve outstanding financial aid issues.",
        "Obtain departmental acceptance of critical workflows.",
      ],
      outcome: "Financial aid processes validated",
    },
  },

  records: {
    start: {
      focus: "Define student administration workflows",
      activities: [
        "Review admissions, registration and student record requirements.",
        "Document academic structures, terms and programme rules.",
        "Confirm configuration priorities with registrar teams.",
      ],
      outcome: "Student administration requirements documented",
    },
    middle: {
      focus: "Configure student record processes",
      activities: [
        "Configure student records and registration workflows.",
        "Test enrolment, course and academic record transactions.",
        "Resolve configuration issues with departmental users.",
      ],
      outcome: "Core student workflows configured and tested",
    },
    end: {
      focus: "Validate student administration",
      activities: [
        "Complete registration and student record acceptance testing.",
        "Review outstanding data and workflow exceptions.",
        "Confirm registrar readiness for operational transition.",
      ],
      outcome: "Student administration workflows accepted",
    },
  },

  training: {
    start: {
      focus: "Prepare testing and training",
      activities: [
        "Define user acceptance testing scenarios.",
        "Identify user groups and departmental training requirements.",
        "Prepare training materials and testing environments.",
      ],
      outcome: "Testing and training plans prepared",
    },
    middle: {
      focus: "Complete departmental testing",
      activities: [
        "Run end-to-end tests across applicable departments.",
        "Record defects and coordinate issue resolution.",
        "Deliver role-based training and review user feedback.",
      ],
      outcome: "Departmental testing and training progressed",
    },
    end: {
      focus: "Confirm operational readiness",
      activities: [
        "Retest critical issues and verify corrective actions.",
        "Complete priority user training.",
        "Review testing outcomes and obtain readiness approvals.",
      ],
      outcome: "Testing and training readiness confirmed",
    },
  },

  cutover: {
    start: {
      focus: "Prepare the go-live transition",
      activities: [
        "Confirm cutover sequence, responsibilities and dependencies.",
        "Review contingency and rollback arrangements.",
        "Conduct transition rehearsals and confirm outstanding issues.",
      ],
      outcome: "Cutover plan and readiness criteria reviewed",
    },
    middle: {
      focus: "Coordinate final preparations",
      activities: [
        "Complete remaining transition rehearsals.",
        "Validate production access, support coverage and communications.",
        "Review outstanding defects and operational risks.",
      ],
      outcome: "Final transition preparations completed",
    },
    end: {
      focus: "Confirm the go-live decision",
      activities: [
        "Review final readiness evidence and critical dependencies.",
        "Obtain the agreed go/no-go decision.",
        "Confirm production support and post-launch issue management.",
      ],
      outcome: "Go-live readiness decision documented",
    },
  },
};


type OwnershipTask = {
  id: string;
  text: string;
  owner: Owner;
  module?: ModuleKey;
  minIntegrations?: number;
  highDataComplexity?: boolean;
};

const DEFAULT_TASKS: OwnershipTask[] = [
  // CORE RESPONSIBILITIES
  // Included regardless of selected modules.

  {
    id: "governance",
    text: "Project management & governance",
    owner: "shared",
  },
  {
    id: "configuration",
    text: "Software configuration & solution design",
    owner: "shared",
  },
  {
    id: "technical",
    text: "Technical architecture & vendor guidance",
    owner: "jenzabar",
  },
  {
    id: "cleansing",
    text: "Clean and reconcile source data",
    owner: "institution",
  },
  {
    id: "migration",
    text: "Data mapping, conversion & validation",
    owner: "shared",
  },
  {
    id: "testing",
    text: "User acceptance testing & sign-off",
    owner: "institution",
  },
  {
    id: "comms",
    text: "Campus communication & change adoption",
    owner: "institution",
  },
  {
    id: "training",
    text: "End-user training delivery",
    owner: "shared",
  },
  {
    id: "cutover",
    text: "Go-live decisions & support handover",
    owner: "shared",
  },

  // STUDENT INFORMATION

  {
    id: "student-configuration",
    text: "Student records and registration configuration",
    owner: "shared",
    module: "student",
  },
  {
    id: "student-validation",
    text: "Registrar workflow validation and sign-off",
    owner: "institution",
    module: "student",
  },

  // FINANCE / ERP

  {
    id: "finance-configuration",
    text: "Finance, billing and reconciliation configuration",
    owner: "shared",
    module: "finance",
  },
  {
    id: "finance-validation",
    text: "Financial controls and process sign-off",
    owner: "institution",
    module: "finance",
  },

  // FINANCIAL AID

  {
    id: "aid-configuration",
    text: "Financial aid workflow configuration",
    owner: "shared",
    module: "aid",
  },
  {
    id: "aid-validation",
    text: "Award processing and compliance validation",
    owner: "institution",
    module: "aid",
  },

  // HR / PAYROLL

  {
    id: "hr-configuration",
    text: "HR and payroll workflow configuration",
    owner: "shared",
    module: "hr",
  },
  {
    id: "hr-validation",
    text: "Payroll reconciliation and acceptance testing",
    owner: "institution",
    module: "hr",
  },

  // REPORTING & ANALYTICS

  {
    id: "analytics-configuration",
    text: "Reporting and analytics configuration",
    owner: "shared",
    module: "analytics",
  },
  {
    id: "analytics-validation",
    text: "Reporting definitions and data validation",
    owner: "institution",
    module: "analytics",
  },

  // INTEGRATIONS

  {
    id: "integration",
    text: "Institution-specific integrations",
    owner: "shared",
    module: "integrations",
  },
  {
    id: "integration-testing",
    text: "Interface testing and institutional acceptance",
    owner: "institution",
    module: "integrations",
  },

  // ADDITIONAL INTEGRATION COMPLEXITY

  {
    id: "integration-dependencies",
    text: "Cross-system dependency and cutover planning",
    owner: "shared",
    module: "integrations",
    minIntegrations: 10,
  },

  // HIGH LEGACY DATA COMPLEXITY

  {
    id: "historical-reconciliation",
    text: "Historical data cleanup and reconciliation",
    owner: "institution",
    highDataComplexity: true,
  },
];
const OWNERS: Array<{ value: Owner; label: string }> = [
  { value: "jenzabar", label: "Jenzabar-led (proposed)" },
  { value: "shared", label: "Shared (proposed)" },
  { value: "institution", label: "Institution-led (proposed)" },
];
const FAQs = [
  ["How reliable is the implementation timeline?", "The timeline is an indicative planning model, not a Jenzabar implementation commitment. Its value is making scope, capacity, dependencies and academic calendar constraints visible early. Detailed dates require technical discovery and agreement with Jenzabar."],
  ["How are the internal staffing hours calculated?", "This concept uses editable illustrative effort estimates for each role and phase. They scale with institution size, scope and data complexity, and are distributed across active months. Use your own department-level estimates to validate the workload before sharing the plan."],
  ["What happens if registration or financial aid conflicts with a project phase?", "The calendar highlights overlapping sensitive months. Move a phase forward or back in the timeline, review the corresponding staffing implications and check whether cutover would create unacceptable operating risk."],
  ["Can we change which team owns each task?", "Yes. The ownership matrix is editable, and your selections are carried into the executive summary and PowerPoint export. All default allocations are proposed placeholders, not statements of Jenzabar's contractual obligations."],
  ["Can a smaller college use this with a lean IT team?", "Yes. Change enrollment, scope, integrations and role-specific available hours. The staffing heatmap will identify where the indicative demand exceeds the hours you have assigned to the programme."],
  ["Does this replace discovery with Jenzabar?", "No. It helps prepare for a more productive planning conversation. Before treating the result as a delivery plan, validate the actual implementation methodology, contractual scope, integration dependencies, dates and resourcing with Jenzabar."],
];

const fmt = (n: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(n));
const asMonth = (s: string) => { const [y, m] = s.split("-").map(Number); return new Date(y || 2027, (m || 1) - 1, 1); };
const shift = (s: string, add: number) => { const d = asMonth(s); return new Date(d.getFullYear(), d.getMonth() + add, 1); };
const isoMonth = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,"0")}`;
const monthDiff = (a: Date, b: Date) => (b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth();
const monthTitle = (d: Date) => d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
const monthLong = (d: Date) => d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
const cls = (owner: Owner) => owner === "jenzabar" ? "vendor" : owner === "institution" ? "campus" : "shared";
const chooseLabel = (owner: Owner) => owner === "jenzabar" ? "Jenzabar-led (proposed)" : owner === "institution" ? "Institution-led (proposed)" : "Shared (proposed)";

function getDuration(c: Config) {
  const sizeLoad = c.size >= 14000 ? 4 : c.size >= 7000 ? 2 : c.size <= 1600 ? -1 : 0;
  const scopeLoad = Math.max(0, c.modules.length - 2);
  const integrationLoad = c.integrations >= 16 ? 3 : c.integrations >= 10 ? 2 : c.integrations >= 5 ? 1 : 0;
  const complexity = c.dataComplexity === "high" ? 3 : c.dataComplexity === "low" ? -1 : 0;
  return Math.max(9, Math.min(24, 10 + sizeLoad + scopeLoad + integrationLoad + complexity));
}
function createPhases(c: Config, shifts: Partial<Record<PhaseKey, { start: number; duration: number }>>): PlannedPhase[] {
  const total = getDuration(c);
  return PHASES.filter(p => !p.relevant || c.modules.includes(p.relevant)).map(p => {
    const override = shifts[p.key];
    const baseStart = Math.round((total - 1) * p.from);
    const baseEnd = Math.max(baseStart + 1, Math.ceil(total * p.to));
    const start = Math.max(0, baseStart + (override?.start ?? 0));
    const duration = Math.max(1, baseEnd - baseStart + (override?.duration ?? 0));
    return { ...p, start, duration, end: start + duration };
  });
}
function riskDates(c: Config, n: number): RiskWindow[] {
  if (!c.freezesEnabled) return [];
  const out: RiskWindow[] = [];
  for (let idx = 0; idx < n; idx++) {
    const date = shift(c.startMonth, idx);
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    if (c.registrationMonths.includes(m)) out.push({ id: `reg-${y}-${m}`, index: idx, kind: "registration", label: "Registration freeze", detail: "Avoid high-impact student record or registration changes", level: "High" });
    if (c.financialAidMonth === m) out.push({ id: `aid-${y}-${m}`, index: idx, kind: "aid", label: "Aid disbursement", detail: "Confirm testing and operating cover before award processing", level: "High" });
    if (c.fiscalMonth === m) out.push({ id: `fiscal-${y}-${m}`, index: idx, kind: "fiscal", label: "Fiscal year-end", detail: "Protect financial close, reconciliation and reporting", level: "Medium" });
  }
  return out;
}
function calcLoad(c: Config, phases: PlannedPhase[], role: RoleKey, m: number) {
  const sizeFactor = Math.max(.65, Math.min(1.75, Math.pow(c.size / 4500, .27)));
  const complexityFactor = c.dataComplexity === "high" ? 1.26 : c.dataComplexity === "low" ? .82 : 1;
  return Math.round(phases.reduce((sum, p) => {
    if (m < p.start || m >= p.end) return sum;
    const middle = p.start + (p.duration - 1) / 2;
    const profile = .74 + .26 * Math.max(0, 1 - Math.abs(m - middle) / Math.max(1, p.duration / 2));
    const integrationBoost = p.key === "integration" ? Math.max(.75, c.integrations / 6) : 1;
    return sum + (p.roles[role] ?? 0) * profile * integrationBoost;
  }, 0) * sizeFactor * complexityFactor);
}

const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
function Logo({ src, inverse = false }: { src: string; inverse?: boolean }) {
  const [failed, setFailed] = useState(false);
  return <span className={`jr-logo ${inverse ? "jr-logo-dark" : ""}`}>
    {!failed && <img src={src} alt="Jenzabar" onError={() => setFailed(true)} />}
    {failed && <span className="jr-wordmark"><span className="jr-butterfly">✦</span> jenzabar</span>}
  </span>;
}
function SectionHeading({
  number,
  eyebrow,
  title,
  detail,
  eyebrowColor,
}: {
  number: string;
  eyebrow: string;
  title: string;
  detail?: string;
  eyebrowColor?: string;
}) {
  return (
    <div className="jr-section-head">
      <div>
        <span
          className="jr-kicker"
          style={
            eyebrowColor
              ? { color: eyebrowColor, fontSize: "12px" }
              : undefined
          }
        >
          {number} / {eyebrow}
        </span>
        <h2>{title}</h2>
      </div>
      {detail && <p>{detail}</p>}
    </div>
  );
}
function InputNum({ label, value, onChange, min=0, max=999999, help }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; help?: string }) {
  return <label className="jr-field"><span>{label}{help && <small title={help}> <CircleHelp size={13}/></small>}</span><input type="number" min={min} max={max} value={value} onChange={e => onChange(Math.max(min, Math.min(max, Number(e.target.value) || 0)))} /></label>;
}
function Segmented<T extends string>({ value, onChange, values }: { value: T; onChange: (v: T) => void; values: { value: T; label: string }[] }) {
  return <div className="jr-segment" role="group">{values.map(o => <button key={o.value} type="button" className={o.value === value ? "active" : ""} onClick={() => onChange(o.value)}>{o.label}</button>)}</div>;
}
function HelpDot({ text }: { text: string }) {
  return (
    <span className="jr-help-dot" tabIndex={0} role="button" aria-label={`Why we ask: ${text}`}>
      <CircleHelp size={14} />
      <span className="jr-help-tip" role="tooltip">{text}</span>
    </span>
  );
}

export default function JenzabarImplementationRealityMap({
  demoHref = "https://www.jenzabar.com/contact-us",
  logoSrc = BRAND_LOGO,
}: Props) {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [step, setStep] = useState<WizardStep>(1);
  const [phaseEdits, setPhaseEdits] = useState<Partial<Record<PhaseKey, { start: number; duration: number }>>>({});
  const [capacity, setCapacity] = useState<Record<RoleKey, number>>(BASE_CAPACITY);
  const [ownership, setOwnership] = useState<Record<string, Owner>>(Object.fromEntries(DEFAULT_TASKS.map(t => [t.id, t.owner])));
  const [activePhase, setActivePhase] = useState<PhaseKey>("data");
  const [tab, setTab] = useState<Tab>("timeline");
  const [selectedMonth, setSelectedMonth] =
  useState<number | null>(null);
  const [selectedLoad, setSelectedLoad] = useState<Selection>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [deckSlide, setDeckSlide] = useState(0);

  const [deckModalOpen, setDeckModalOpen] = useState(false);
  const [phaseModalOpen, setPhaseModalOpen] = useState(false);

  const [slideEdits, setSlideEdits] = useState<
    Record<
      number,
      {
        title?: string;
        subtitle?: string;
        body?: string;
        notes?: string;
      }
    >
  >({});

  const [exporting, setExporting] = useState(false);
  const [copyState, setCopyState] = useState(false);
  
  const [warnToast, setWarnToast] = useState<string | null>(null);
  const root = useRef<HTMLElement>(null);
  const drag = useRef<{
  key: PhaseKey;
  x: number;
  width: number;
} | null>(null);

const skipInspectAfterDrag = useRef(false);

  const patch = <K extends keyof Config>(
    k: K,
    v: Config[K]
  ) => {
    setConfig((prev) => ({
      ...prev,
      [k]: v,
    }));
  };

  const toggleModule = (k: ModuleKey) => {
    setConfig((prev) => ({
      ...prev,
      modules: prev.modules.includes(k)
        ? prev.modules.filter((m) => m !== k)
        : [...prev.modules, k],
    }));
  };

  // Build an institution-specific responsibility list
  // from the selected implementation scope.

  const scopedTasks = useMemo(() => {
    return DEFAULT_TASKS.filter((task) => {
      // Only include responsibilities for selected modules.
      if (
        task.module &&
        !config.modules.includes(task.module)
      ) {
        return false;
      }

      // Additional integration complexity applies
      // only when the threshold is reached.
      if (
        task.minIntegrations !== undefined &&
        config.integrations < task.minIntegrations
      ) {
        return false;
      }

      // Include additional legacy data work only
      // when historical data complexity is high.
      if (
        task.highDataComplexity &&
        config.dataComplexity !== "high"
      ) {
        return false;
      }

      return true;
    });
  }, [
    config.modules,
    config.integrations,
    config.dataComplexity,
  ]);
  const duration = useMemo(() => getDuration(config), [config]);
  const phases = useMemo(() => createPhases(config, phaseEdits), [config, phaseEdits]);
  const totalMonths = useMemo(() => Math.max(duration, ...phases.map(p => p.end), 1), [duration, phases]);
  const months = useMemo(() => Array.from({ length: totalMonths }, (_, i) => shift(config.startMonth, i)), [config.startMonth, totalMonths]);
  const risks = useMemo(() => riskDates(config, totalMonths), [config, totalMonths]);
  const riskByMonth = useMemo(() => {
    const map = new Map<number, RiskWindow[]>();
    risks.forEach(r => map.set(r.index, [...(map.get(r.index) ?? []), r]));
    return map;
  }, [risks]);
  const grid = useMemo(() => ROLE.map(r => ({ ...r, loads: months.map((_, m) => calcLoad(config, phases, r.key, m)) })), [config, phases, months]);
  const aggregate = useMemo(() => months.map((_, i) => grid.reduce((sum, r) => sum + r.loads[i], 0)), [grid, months]);
  const totalHours = useMemo(() => aggregate.reduce((a, b) => a + b, 0), [aggregate]);
  const overloaded = useMemo(() => grid.flatMap(r => r.loads.map((h, m) => ({ role: r.key, name: r.name, m, hours: h, pct: h / Math.max(capacity[r.key], 1) })).filter(a => a.pct > 1)), [grid, capacity]);
  const peakIndex = useMemo(() => aggregate.indexOf(Math.max(...aggregate)), [aggregate]);
  const peakMonth = months[Math.max(0, peakIndex)] ?? asMonth(config.startMonth);
  const goLive = months[months.length - 1] ?? asMonth(config.startMonth);
  const targetDelta = monthDiff(goLive, asMonth(config.targetMonth));
  const active = phases.find(p => p.key === activePhase) ?? phases[0];

  const getPhaseMonthDetail = (
  phase: PlannedPhase,
  monthIndex: number
) => {
  const elapsed = monthIndex - phase.start;
  const duration = Math.max(1, phase.duration);

  const progress =
    duration === 1
      ? 1
      : elapsed / (duration - 1);

  let stage: keyof PhaseActivityPlan;

if (duration === 1) {
  stage = "end";
} else if (elapsed === 0) {
  stage = "start";
} else if (elapsed === duration - 1) {
  stage = "end";
} else {
  stage = "middle";
}
  return {
    stage,
    ...PHASE_ACTIVITIES[phase.key][stage],
    currentMonth: elapsed + 1,
    totalPhaseMonths: duration,
    progress: Math.round(
      ((elapsed + 1) / duration) * 100
    ),
  };
};
  const activeLoad = selectedLoad ? { month: months[selectedLoad.month], role: ROLE.find(r => r.key === selectedLoad.role)!, hours: grid.find(r => r.key === selectedLoad.role)?.loads[selectedLoad.month] ?? 0, cap: capacity[selectedLoad.role] } : null;
  const note = useCallback((msg: string) => {
    setWarnToast(msg);
    window.setTimeout(() => setWarnToast(null), 3300);
  }, []);

  // Select a project phase and open its inspector modal
  const inspectPhase = (key: PhaseKey) => {
    setActivePhase(key);
    setPhaseModalOpen(true);
  };

  // Adjust the start or duration of a project phase
  const changePhase = (
    key: PhaseKey,
    attr: "start" | "duration",
    delta: number
  ) => {
    setPhaseEdits((old) => {
      const cur = old[key] ?? {
        start: 0,
        duration: 0,
      };

      return {
        ...old,
        [key]: {
          ...cur,
          [attr]: cur[attr] + delta,
        },
      };
    });
  };
  const alignTarget = () => { const target = asMonth(config.targetMonth); patch("startMonth", isoMonth(new Date(target.getFullYear(), target.getMonth() - totalMonths + 1, 1))); note("Kickoff shifted to align the modelled finish with your target."); };
  const summary = useMemo(() => {
    const scopeLabels = config.modules
      .map((key) => MODS.find((m) => m.key === key)?.name)
      .filter(Boolean)
      .join(", ");

    const phaseLines = phases.map(
      (phase) =>
        `${phase.name}: ${monthTitle(
          shift(config.startMonth, phase.start)
        )} – ${monthTitle(
          shift(config.startMonth, phase.end - 1)
        )} · ${chooseLabel(phase.owner)}`
    );

    const responsibilityLines = scopedTasks.map(
      (task) =>
        `${task.text}: ${chooseLabel(
          ownership[task.id] ?? task.owner
        )}`
    );

    return [
      "IMPLEMENTATION PLANNING BRIEF · ILLUSTRATIVE MODEL",
      `Institution: ${fmt(config.size)} students · ${config.institutionType}`,
      `Current SIS: ${config.sis}; ERP: ${config.erp}`,
      `Scope: ${scopeLabels || "Discovery only"}`,
      `Integrations: ${config.integrations}; Data complexity: ${config.dataComplexity}`,
      `Indicative kickoff: ${monthLong(
        asMonth(config.startMonth)
      )}`,
      `Modelled go-live: ${monthLong(goLive)}; Target: ${monthLong(
        asMonth(config.targetMonth)
      )}`,
      `Internal effort: ${fmt(
        totalHours
      )} estimated staff-hours across project phases`,
      `Peak workload: ${monthLong(
        peakMonth
      )}; Potential role-month capacity conflicts: ${
        overloaded.length
      }`,
      `Sensitive academic calendar windows: ${risks.length}`,
      "",
      "PHASES",
      ...phaseLines,
      "",
      "PROPOSED RESPONSIBILITY MATRIX",
      `${scopedTasks.length} responsibilities applicable to the selected scope`,
      ...responsibilityLines,
      "",
      "IMPORTANT: Independent planning concept by GrowUp. All estimates and proposed responsibilities are illustrative. Validate all assumptions and contractual allocations with Jenzabar.",
    ].join("\n");
  }, [
    config,
    goLive,
    totalHours,
    peakMonth,
    overloaded,
    risks,
    phases,
    ownership,
    scopedTasks,
  ]);


  // Text shown in the leadership presentation.
  // Dynamic figures continue coming from the implementation model.

  const briefDefaults = [
    {
      title: "Implementation Planning Brief",
      subtitle: `${fmt(config.size)} students · ${totalMonths} modelled months`,
      body:
        "An institution-specific planning brief covering implementation scope, delivery timing, staffing, academic risks and proposed responsibilities.",
    },
    {
      title: "Project timeline",
      subtitle: `${totalMonths} project months · ${monthLong(
        asMonth(config.startMonth)
      )} kickoff`,
      body:
        "Review the proposed phase sequence, dependencies and go-live date before agreeing the delivery plan.",
    },
    {
      title: "Staffing plan",
      subtitle: `${fmt(totalHours)} internal hours · ${overloaded.length} potential capacity conflicts`,
      body:
        "Understand when each functional team is needed and where project responsibilities may exceed available capacity.",
    },
    {
      title: "Key risks",
      subtitle: `${risks.length} campus-sensitive windows`,
      body:
        "Protect registration, financial aid and fiscal-close activity when sequencing implementation and go-live decisions.",
    },
    {
      title: "Ownership & governance",
      subtitle: `${scopedTasks.length} proposed responsibilities`,
      body:
        "Agree the division of responsibilities between Jenzabar, your institution and shared project teams.",
    },
    {
      title: "Next steps",
      subtitle: "Validate before approval",
      body: [
        "Confirm implementation scope and dependencies",
        "Validate department-level staffing capacity",
        "Agree proposed task ownership",
        "Protect critical academic calendar dates",
        "Confirm cutover and go-live decision criteria",
      ].join("\n"),
    },
  ];

  const readBriefSlide = (index: number) => ({
    title:
      slideEdits[index]?.title ??
      briefDefaults[index].title,

    subtitle:
      slideEdits[index]?.subtitle ??
      briefDefaults[index].subtitle,

    body:
      slideEdits[index]?.body ??
      briefDefaults[index].body,

    notes:
      slideEdits[index]?.notes ?? "",
  });

  const editBriefSlide = (
    field: "title" | "subtitle" | "body" | "notes",
    value: string
  ) => {
    setSlideEdits((previous) => ({
      ...previous,
      [deckSlide]: {
        ...previous[deckSlide],
        [field]: value,
      },
    }));
  };

  const resetBriefSlide = () => {
    setSlideEdits((previous) => {
      const next = { ...previous };
      delete next[deckSlide];
      return next;
    });
  };

  // Modal keyboard shortcuts and page scroll lock.

  useEffect(() => {
    if (!deckModalOpen) return;

      useEffect(() => {
    if (!phaseModalOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPhaseModalOpen(false);
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [phaseModalOpen]);

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDeckModalOpen(false);
        return;
      }

      const target = event.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setDeckSlide((current) => (current + 1) % 6);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setDeckSlide((current) => (current + 5) % 6);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [deckModalOpen]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);

      setCopyState(true);

      window.setTimeout(() => {
        setCopyState(false);
      }, 2000);
    } catch {
      note(
        "Copy unavailable. You can use the PowerPoint or browser print option."
      );
    }
  };


  // Export the six editable slides in the same sequence
  // as the carousel and large presentation modal.

  const exportEditedBrief = async () => {
    setExporting(true);

    try {
      const { default: PptxGenJS } = await import("pptxgenjs");

      const pptx = new PptxGenJS();

      pptx.layout = "LAYOUT_WIDE";
      pptx.author = "GrowUp · Independent portfolio concept";
      pptx.subject = "Illustrative implementation planning";
      pptx.title = "Implementation Planning Brief";
      pptx.company = "GrowUp";
      pptx.lang = "en-US";

      const C = {
        dark: "041B1C",
        ink: "102E31",
        green: "138063",
        mid: "55AE8A",
        light: "D8EEE2",
        paper: "FFFFFF",
        pale: "F4F9F6",
        line: "DFEBE4",
        muted: "668176",
        white: "FFFFFF",
      };

      const SH = pptx.ShapeType;

      const rect = (
        slide: any,
        x: number,
        y: number,
        w: number,
        h: number,
        fill: string,
        border?: string
      ) => {
        slide.addShape(SH.rect, {
          x, y, w, h,
          line: {
            color: border ?? fill,
            width: border ? 0.7 : 0,
          },
          fill: { color: fill },
        });
      };

      const txt = (
        slide: any,
        value: string,
        x: number,
        y: number,
        w: number,
        h: number,
        options: Record<string, unknown> = {}
      ) => {
        slide.addText(value, {
          x, y, w, h,
          fontFace: "Aptos",
          fontSize: 12,
          color: C.ink,
          margin: 0,
          breakLine: false,
          ...options,
        });
      };

      const base = (
        index: number,
        dark = false
      ) => {
        const slide = pptx.addSlide();

        slide.background = {
          color: dark ? C.dark : C.paper,
        };

        txt(
          slide,
          "JENZABAR  /  IMPLEMENTATION PLANNING",
          0.7, 0.35, 6, 0.25,
          {
            fontSize: 10,
            bold: true,
            color: dark ? C.light : C.green,
            charSpacing: 1,
          }
        );

        txt(
          slide,
          "INDEPENDENT PLANNING CONCEPT · GROWUP",
          8.1, 0.37, 4.5, 0.2,
          {
            fontSize: 8,
            align: "right",
            color: dark ? C.light : C.muted,
          }
        );

        rect(
          slide,
          0.7, 6.94, 11.95, 0.012,
          dark ? "315850" : C.line
        );

        txt(
          slide,
          "Illustrative assumptions · Validate with Jenzabar",
          0.7, 7.06, 8.5, 0.18,
          {
            fontSize: 8,
            color: dark ? C.light : C.muted,
          }
        );

        txt(
          slide,
          `${String(index + 1).padStart(2, "0")} / 06`,
          11.6, 7.05, 1.0, 0.18,
          {
            fontSize: 8,
            align: "right",
            color: dark ? C.light : C.muted,
          }
        );

        const notes = readBriefSlide(index).notes;

        if (
          notes.trim() &&
          typeof slide.addNotes === "function"
        ) {
          slide.addNotes(notes);
        }

        return slide;
      };

      const heading = (
        slide: any,
        index: number
      ) => {
        const content = readBriefSlide(index);

        txt(
          slide,
          `${String(index + 1).padStart(2, "0")} / ${
            [
              "EXECUTIVE SUMMARY",
              "DELIVERY TIMELINE",
              "STAFFING REQUIREMENTS",
              "ACADEMIC RISKS",
              "OWNERSHIP & GOVERNANCE",
              "NEXT STEPS",
            ][index]
          }`,
          0.7, 0.95, 8.5, 0.25,
          {
            fontSize: 10,
            color: C.green,
            bold: true,
            charSpacing: 1,
          }
        );

        txt(
          slide,
          content.title,
          0.7, 1.32, 11.9, 0.72,
          {
            fontFace: "Aptos Display",
            fontSize: 29,
            bold: true,
            breakLine: false,
            color: C.ink,
          }
        );

        txt(
          slide,
          content.subtitle,
          0.72, 2.10, 11.8, 0.44,
          {
            fontSize: 12,
            color: C.muted,
          }
        );
      };

      const narrative = (
        slide: any,
        index: number
      ) => {
        if (index === 5) return;

        txt(
          slide,
          readBriefSlide(index).body,
          0.72, 6.34, 11.8, 0.44,
          {
            fontSize: 10,
            color: C.muted,
          }
        );
      };

      // ===================================
      // SLIDE 01 — EXECUTIVE SUMMARY
      // ===================================

      {
        const s = base(0, true);
        const content = readBriefSlide(0);

        txt(
          s,
          "JENZABAR IMPLEMENTATION PLAN",
          0.75, 1.12, 7, 0.3,
          {
            fontSize: 12,
            color: C.light,
            bold: true,
            charSpacing: 1.2,
          }
        );

        txt(
          s,
          content.title,
          0.75, 1.73, 10.9, 1.4,
          {
            fontFace: "Aptos Display",
            fontSize: 39,
            bold: true,
            color: C.white,
          }
        );

        txt(
          s,
          content.subtitle,
          0.76, 3.28, 10.9, 0.4,
          {
            fontSize: 16,
            color: C.light,
          }
        );

        txt(
          s,
          content.body,
          0.76, 4.05, 10.7, 0.7,
          {
            fontSize: 13,
            color: C.light,
          }
        );

        const metrics = [
          ["STUDENTS", fmt(config.size)],
          ["MONTHS", String(totalMonths)],
          ["STAFF HOURS", fmt(totalHours)],
        ];

        metrics.forEach(([label, value], i) => {
          const x = 0.75 + i * 4.03;

          rect(s, x, 5.33, 3.78, 0.92, "103B35");

          txt(
            s, label,
            x + 0.19, 5.48, 3.35, 0.17,
            {
              fontSize: 9,
              bold: true,
              color: C.light,
            }
          );

          txt(
            s, value,
            x + 0.19, 5.76, 3.35, 0.32,
            {
              fontSize: 23,
              bold: true,
              color: C.white,
            }
          );
        });
      }

      // ===================================
      // SLIDE 02 — PROJECT TIMELINE
      // ===================================

      {
        const s = base(1);

        heading(s, 1);

        const chartX = 3.4;
        const chartW = 8.65;

        phases.forEach((phase, i) => {
          const y = 2.86 + i * 0.39;

          txt(
            s, phase.name,
            0.75, y, 2.4, 0.24,
            {
              fontSize: 10,
              bold: true,
            }
          );

          rect(
            s, chartX, y + 0.05,
            chartW, 0.15, "EEF5F0"
          );

          rect(
            s,
            chartX +
              (phase.start / totalMonths) * chartW,
            y + 0.05,
            Math.min(
              (phase.duration / totalMonths) * chartW,
              chartW - (phase.start / totalMonths) * chartW
            ),
            0.15,
            C.green
          );

          txt(
            s,
            `${phase.duration} mo`,
            12.15, y, 0.46, 0.22,
            {
              fontSize: 8,
              color: C.muted,
              align: "right",
            }
          );
        });

        txt(
          s,
          `Kickoff: ${monthLong(
            asMonth(config.startMonth)
          )}   ·   Modelled go-live: ${monthLong(goLive)}`,
          0.75, 6.01, 11.8, 0.25,
          {
            fontSize: 11,
            color: C.green,
            bold: true,
          }
        );

        narrative(s, 1);
      }

      // ===================================
      // SLIDE 03 — STAFFING
      // ===================================

      {
        const s = base(2);

        heading(s, 2);

        const count = Math.min(12, totalMonths);
        const cellW = 0.63;
        const chartX = 3.6;

        ROLE.forEach((role, row) => {
          const y = 3.02 + row * 0.48;

          txt(
            s, role.name,
            0.76, y, 2.5, 0.22,
            {
              fontSize: 10,
              bold: true,
            }
          );

          for (let m = 0; m < count; m++) {
            const hours = grid[row].loads[m];
            const available = Math.max(
              1,
              capacity[role.key]
            );

            const ratio = hours / available;

            const fill =
              ratio > 1
                ? "146B52"
                : ratio > 0.75
                ? "80C3A7"
                : ratio > 0.4
                ? "C8EAD9"
                : "EDF6EF";

            const x = chartX + m * 0.72;

            rect(s, x, y - 0.04, cellW, 0.32, fill);

            txt(
              s, String(hours),
              x, y + 0.055, cellW, 0.13,
              {
                fontSize: 8,
                align: "center",
                color: ratio > 1 ? C.white : C.ink,
              }
            );
          }
        });

        txt(
          s,
          `Peak demand: ${monthLong(
            peakMonth
          )}  ·  ${overloaded.length} potential role-month conflicts`,
          0.75, 6.1, 11.8, 0.26,
          {
            fontSize: 11,
            bold: true,
            color: C.green,
          }
        );

        narrative(s, 2);
      }

      // ===================================
      // SLIDE 04 — ACADEMIC RISKS
      // ===================================

      {
        const s = base(3);

        heading(s, 3);

        const list = risks.slice(0, 6);

        if (!list.length) {
          txt(
            s,
            "No campus-sensitive dates are currently enabled.",
            0.75, 3.06, 11, 0.45,
            {
              fontSize: 15,
              color: C.muted,
            }
          );
        }

        list.forEach((risk, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);

          const x = 0.75 + col * 6.12;
          const y = 2.95 + row * 1.03;

          rect(
            s, x, y, 5.84, 0.86,
            C.pale, C.line
          );

          txt(
            s, risk.label,
            x + 0.18, y + 0.11, 4.4, 0.2,
            {
              fontSize: 13,
              bold: true,
              color: C.ink,
            }
          );

          txt(
            s,
            `${monthLong(months[risk.index])} · ${risk.level}`,
            x + 0.18, y + 0.35, 5.3, 0.16,
            {
              fontSize: 10,
              color: C.green,
            }
          );

          txt(
            s, risk.detail,
            x + 0.18, y + 0.58, 5.45, 0.19,
            {
              fontSize: 8.5,
              color: C.muted,
            }
          );
        });

        narrative(s, 3);
      }

      // ===================================
      // SLIDE 05 — OWNERSHIP
      // ===================================

      {
        const s = base(4);

        heading(s, 4);

        const owners: Owner[] = [
          "jenzabar",
          "shared",
          "institution",
        ];

        owners.forEach((owner, i) => {
          const x = 0.72 + i * 4.17;

          const tasks = scopedTasks.filter(
            (task) =>
              (ownership[task.id] ?? task.owner) ===
              owner
          );

          rect(
            s, x, 2.82, 3.92, 3.32,
            C.pale, C.line
          );

          txt(
            s,
            owner === "jenzabar"
              ? "JENZABAR-LED*"
              : owner === "shared"
              ? "SHARED*"
              : "INSTITUTION-LED*",
            x + 0.16, 3.02, 3.55, 0.23,
            {
              fontSize: 11,
              bold: true,
              color: C.green,
            }
          );

          txt(
            s,
            `${tasks.length} proposed responsibilities`,
            x + 0.16, 3.34, 3.52, 0.19,
            {
              fontSize: 9,
              color: C.muted,
            }
          );

          tasks.slice(0, 8).forEach(
            (task, taskIndex) => {
              txt(
                s,
                `✓ ${task.text}`,
                x + 0.17,
                3.72 + taskIndex * 0.27,
                3.52, 0.23,
                {
                  fontSize: 8.6,
                  color: C.ink,
                }
              );
            }
          );

          if (tasks.length > 8) {
            txt(
              s,
              `+ ${tasks.length - 8} additional tasks`,
              x + 0.17, 5.91, 3.4, 0.16,
              {
                fontSize: 8,
                color: C.green,
              }
            );
          }
        });

        narrative(s, 4);
      }

      // ===================================
      // SLIDE 06 — NEXT STEPS
      // ===================================

      {
        const s = base(5, true);
        const content = readBriefSlide(5);

        txt(
          s,
          "06 / LEADERSHIP DECISIONS",
          0.75, 1.12, 8, 0.27,
          {
            fontSize: 11,
            color: C.light,
            bold: true,
            charSpacing: 1,
          }
        );

        txt(
          s, content.title,
          0.75, 1.62, 11.75, 0.83,
          {
            fontFace: "Aptos Display",
            fontSize: 34,
            bold: true,
            color: C.white,
          }
        );

        txt(
          s, content.subtitle,
          0.75, 2.57, 11.5, 0.35,
          {
            fontSize: 14,
            color: C.light,
          }
        );

        content.body
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .slice(0, 6)
          .forEach((line, i) => {
            const y = 3.2 + i * 0.5;

            rect(
              s, 0.77, y, 0.34, 0.33,
              "155344"
            );

            txt(
              s,
              String(i + 1).padStart(2, "0"),
              0.82, y + 0.1, 0.23, 0.12,
              {
                fontSize: 10,
                bold: true,
                color: C.light,
              }
            );

            txt(
              s, line,
              1.3, y + 0.035, 10.7, 0.29,
              {
                fontSize: 15,
                color: C.white,
              }
            );
          });
      }

      await pptx.writeFile({
        fileName: "Jenzabar-Editable-Implementation-Brief.pptx",
      });

    } catch (error) {
      console.error(error);
      note(
        "Could not generate the edited PowerPoint. Check that pptxgenjs is installed."
      );
    } finally {
      setExporting(false);
    }
  };



  useEffect(() => {
    const parent = root.current;
    if (!parent || typeof IntersectionObserver === "undefined") return;
    const items = parent.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("jr-visible"); observer.unobserve(e.target); } }), { threshold: .06 });
    items.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <main ref={root} className="jr" id="top">
    <style>{styles}</style>
 

    <section className="jr-hero">
      <div className="jr-wrap jr-hero-grid">
        <div className="jr-hero-copy" data-reveal>
<span className="jr-kicker jr-kicker-light" style={{ color: "#76c0c2", fontSize: "12px" }}>JENZABAR IMPLEMENTATION PLANNER</span>
     
     
          <h1>
            See what it takes <br />to implement Jenzabar One.
          </h1>
     
     
         <p style={{ color: "#fafafa", fontSize: "18px", letterSpacing: "0.01em" }}>
  Build a realistic implementation plan for your institution. Understand the timeline, staff involvement, key milestones and potential disruptions before committing resources.
</p>
 <div className="jr-hero-actions"><button type="button" className="jr-btn jr-btn-mint" style={{ background: "#167273", borderColor: "#167273", color: "#ffffff" }} onClick={()=>goTo("builder")}>Build your implementation map <ArrowRight size={17}/></button><button type="button" className="jr-btn jr-btn-outline" onClick={()=>goTo("map")}>See example plan</button></div>
          <div className="jr-hero-foot"><CheckCircle2 size={15}/> A practical planning model, not a vendor implementation promise.</div>
        </div>
        <div className="jr-hero-visual" data-reveal>
          <img 
            src="/images/jenzabaroneheroimg.png" 
            alt="Jenzabar One implementation planning workspace" 
            className="jr-hero-img"
          />
        </div>
      </div>
    </section>

    
 


    <section className="jr-builder jr-section" id="builder">
      <div className="jr-wrap">
         <div className="jr-builder-header">
  <div className="jr-builder-header-copy">
    <span className="jr-kicker">
      01 / BUILD YOUR BASELINE
    </span>

    <h2>
    First, establish what your institution needs to implement successfully.
    </h2>

  <p style={{ color: "#011522", fontSize: "19px", letterSpacing: "0.01em" }}>
Tell us about your systems, academic calendar and available resources so we can estimate the timeline and staffing requirements for your Jenzabar One implementation.
    </p>



  

  </div>

 
</div>
        <div className="jr-builder-layout" data-reveal>
        
        
<aside className="jr-builder-steps">
  {[
    {
      title: "Institution Profile",
      description: "Tell us about your institution.",
      icon: Landmark,
    },
    {
      title: "Systems & Scope",
      description: "What are you implementing?",
      icon: Layers3,
    },
    {
      title: "Campus Calendar",
      description: "Key academic dates.",
      icon: CalendarDays,
    },
    {
      title: "Team Capacity",
      description: "Available staff and resources.",
      icon: Users,
    },
    {
      title: "Review",
      description: "See your personalised plan.",
      icon: ClipboardList,
    },
  ].map((item, index) => {
    const number = (index + 1) as WizardStep;
    const Icon = item.icon;
    const active = step === number;
    const completed = step > number;

    return (
      <button
        type="button"
        key={item.title}
        className={`jr-step ${active ? "active" : ""} ${
          completed ? "done" : ""
        }`}
        onClick={() => setStep(number)}
        aria-current={active ? "step" : undefined}
      >
        <span className="jr-step-number">
          {String(number).padStart(2, "0")}
        </span>


        <span className="jr-step-copy">
          <strong>{item.title}</strong>
          <small>{item.description}</small>
        </span>
      </button>
    );
  })}
</aside>


          <div className="jr-form-card">
            <div className="jr-form-main">
            {step === 1 && (
  <>
    <div className="jr-form-heading">
      <h3>Your Institution Profile</h3>
      <p>
Establish your institution’s baseline for implementation planning.
      </p>
    </div>

    <div className="jr-fields-2">
      <label className="jr-field">
        <span>
          Institution size{" "}
          <HelpDot text="Student enrolment provides an indication of your institution's operational scale. We use this to estimate the volume of student records, testing requirements and staff training involved in your implementation plan." />
        </span>
        <select
          value={config.size}
          onChange={(e) => patch("size", Number(e.target.value))}
        >
          <option value={1500}>1,500 students</option>
          <option value={4500}>4,500 students</option>
          <option value={8000}>8,000 students</option>
          <option value={16000}>16,000 students</option>
          <option value={30000}>30,000 students</option>
        </select>
      </label>

      <label className="jr-field">
        <span>
          Institution type{" "}
          <HelpDot text="Whether you operate a private university, public institution or community college can affect implementation requirements. We use this information to adjust planning assumptions around academic operations, reporting and departmental coordination.." />
        </span>
        <select
          value={config.institutionType}
          onChange={(e) => patch("institutionType", e.target.value)}
        >
          <option>Private college / university</option>
          <option>Public university</option>
          <option>Community / technical college</option>
          <option>Specialist institution</option>
        </select>
      </label>

      <label className="jr-field">
        <span>
          Current student information system{" "}
          <HelpDot text="The system currently managing your student records influences the technical work involved in implementation. Identifying it helps us estimate data conversion, integration requirements and testing effort before your institution transitions to Jenzabar One." />
        </span>
        <select
          value={config.sis}
          onChange={(e) => patch("sis", e.target.value)}
        >
          <option>Legacy or on-premise SIS</option>
          <option>Jenzabar CX / EX</option>
          <option>Jenzabar SONIS</option>
          <option>Multiple student systems</option>
          <option>Other / not confirmed</option>
        </select>
      </label>

      <label className="jr-field">
        <span>
          Current ERP / finance environment{" "}
          <HelpDot text="This identifies how your institution currently manages financial operations and whether those systems connect to student administration. We use it to estimate integration complexity, data reconciliation and the coordination required during implementation." />
        </span>
        <select
          value={config.erp}
          onChange={(e) => patch("erp", e.target.value)}
        >
          <option>Separate finance / ERP</option>
          <option>Integrated ERP and SIS</option>
          <option>Multiple finance applications</option>
          <option>Other / not confirmed</option>
        </select>
      </label>
    </div>

    <label className="jr-field jr-date-wide">
      <span>
        Preferred target go-live{" "}
        <HelpDot text="Your target go-live is when you would like Jenzabar One operational. We use this date to assess the available implementation window, identify scheduling constraints and highlight potential conflicts with major academic activities." />
      </span>
      <input
        type="month"
        value={config.targetMonth}
        min="2026-11"
        onChange={(e) => patch("targetMonth", e.target.value)}
      />
    </label>
  </>
)}
     
     {step === 2 && (
  <>
    <div className="jr-form-heading">
      <span className="jr-form-eyebrow">
        STEP 2 OF 5
      </span>

      <h3>Systems & Implementation Scope</h3>

      <p>
   Identify which systems and modules your implementation will cover.
      </p>
    </div>

    <div className="jr-scope-section">
      <div className="jr-form-sub">
        Modules you are planning to implement
        <HelpDot text="Modules are the Jenzabar One functions included in your implementation. Your selection helps us estimate the number of workstreams, departmental involvement, testing activities and training requirements across the project." />
      </div>

      <div className="jr-module-grid">
        {[
          {
            key: "student",
            name: "Student information",
            icon: GraduationCap,
          },
          {
            key: "finance",
            name: "Finance / ERP",
            icon: Landmark,
          },
          {
            key: "aid",
            name: "Financial aid",
            icon: FileText,
          },
          {
            key: "hr",
            name: "HR / Payroll",
            icon: Users,
          },
          {
            key: "analytics",
            name: "Reporting & analytics",
            icon: Gauge,
          },
          {
            key: "integrations",
            name: "Integrations",
            icon: Layers3,
          },
        ].map((module) => {
          const Icon = module.icon;
          const selected = config.modules.includes(
            module.key as ModuleKey
          );

          return (
            <button
              type="button"
              key={module.key}
              className={`jr-module-option ${
                selected ? "selected" : ""
              }`}
              onClick={() =>
                toggleModule(module.key as ModuleKey)
              }
              aria-pressed={selected}
            >
              <Icon
                className="jr-module-icon"
                size={20}
                strokeWidth={1.7}
              />

              <span>{module.name}</span>

              <span className="jr-module-check">
                {selected && (
                  <Check
                    size={13}
                    strokeWidth={2.5}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>

    <div className="jr-scope-divider" />

    <div className="jr-fields-2 jr-scope-fields">
      <InputNum
        label="Existing integrations"
        value={config.integrations}
        onChange={(value) =>
          patch("integrations", value)
        }
        min={0}
        max={99}
        help="Count the external systems that will need to exchange information with Jenzabar One after implementation. This helps us estimate integration development, configuration, testing and the technical resources your institution may require."
      />

      <label className="jr-field">
        <span>
          Historical data complexity
          <HelpDot text="Consider whether your historical records are consistent, complete and stored across multiple systems. Your selection helps us estimate the data preparation, conversion and validation work required to support a successful migration." />
        </span>

        <select
          value={config.dataComplexity}
          onChange={(event) =>
            patch(
              "dataComplexity",
              event.target
                .value as Config["dataComplexity"]
            )
          }
        >
          <option value="low">
            Low · clean, consolidated
          </option>

          <option value="standard">
            Standard · some legacy variation
          </option>

          <option value="high">
            High · multiple sources / cleanup
          </option>
        </select>
      </label>
    </div>
  </>
)}
            
{step === 3 && (
  <>
    <div className="jr-form-heading">
      <h3>Academic Calendar &amp; Constraints</h3>
      <p>
Identify critical academic dates that could affect implementation.
      </p>
    </div>

    <div className="jr-fields-2">
      <label className="jr-field">
        <span>
          Proposed implementation kickoff{" "}
          <HelpDot text="Your implementation kickoff is the month your institution expects project work to begin. We use this date to schedule implementation phases, estimate available preparation time and identify potential conflicts with academic operations.." />
        </span>
        <input
          type="month"
          value={config.startMonth}
          min="2026-10"
          onChange={(e) => patch("startMonth", e.target.value)}
        />
      </label>

      <label className="jr-field">
        <span>
          Fiscal year-end month{" "}
          <HelpDot text="The fiscal year-end month marks a period of increased activity for your finance department. We highlight this window in your implementation plan so resource demands and critical project milestones can be reviewed." />
        </span>
        <select
          value={config.fiscalMonth}
          onChange={(e) => patch("fiscalMonth", Number(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {monthLong(new Date(2027, i, 1)).split(" ")[0]}
            </option>
          ))}
        </select>
      </label>

      <label className="jr-field">
        <span>
          Main financial aid disbursement month{" "}
          <HelpDot text="This is the month your institution typically distributes financial aid to students. We use it to highlight potential conflicts with system changes, data migration and go-live activities that could affect disbursement operations." />
        </span>
        <select
          value={config.financialAidMonth}
          onChange={(e) => patch("financialAidMonth", Number(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {monthLong(new Date(2027, i, 1)).split(" ")[0]}
            </option>
          ))}
        </select>
      </label>

      <div className="jr-field">
        <span>
          Registration-sensitive months{" "}
          <HelpDot text="These are months when student registration and enrolment activities place additional demands on your systems and staff. We highlight these periods to identify potential conflicts with migration, testing and go-live milestones." />
        </span>

        <div className="jr-monthpick">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
            <button
              type="button"
              key={m}
              className={
                config.registrationMonths.includes(m) ? "selected" : ""
              }
              onClick={() =>
                patch(
                  "registrationMonths",
                  config.registrationMonths.includes(m)
                    ? config.registrationMonths.filter((n) => n !== m)
                    : [...config.registrationMonths, m]
                )
              }
            >
              {new Date(2027, m - 1, 1).toLocaleDateString("en-US", {
                month: "short",
              })}
            </button>
          ))}
        </div>
      </div>
    </div>

    <label className="jr-checkline">
      <input
        type="checkbox"
        checked={config.freezesEnabled}
        onChange={(e) => patch("freezesEnabled", e.target.checked)}
      />
      Highlight operational risk windows on the timeline
    </label>
  </>
)}
           
{step === 4 && (
  <>
    <div className="jr-form-heading">
      <h3>Team Capacity &amp; Availability</h3>
      <p>
        Specify the monthly hours available from each
        departmental lead.
      </p>
    </div>

    <div className="jr-cap-fields">
      {ROLE.map((r) => (
        <label key={r.key}>
          <span>
            <b>{r.name}</b>
            <small>{r.description}</small>
          </span>

          <span className="jr-hours-input">
            <input
              type="number"
              min={0}
              max={400}
              value={capacity[r.key]}
              onChange={(e) =>
                setCapacity((x) => ({
                  ...x,
                  [r.key]: Math.max(
                    0,
                    Math.min(400, Number(e.target.value) || 0)
                  ),
                }))
              }
            />
            <small>hrs/mo</small>
          </span>
        </label>
      ))}
    </div>
  </>
)}
            
              {step===5 && <><div className="jr-form-heading"><h3>Review your preliminary model</h3><p>Here is the scope and timing implied by the inputs. Everything below remains editable.</p></div><div className="jr-review"><div><span>Institution size</span><b>{fmt(config.size)} students</b><button onClick={()=>setStep(1)}>Edit</button></div><div><span>In-scope modules</span><b>{config.modules.length} workstreams</b><button onClick={()=>setStep(2)}>Edit</button></div><div><span>Existing integrations</span><b>{config.integrations} systems</b><button onClick={()=>setStep(2)}>Edit</button></div><div><span>Kickoff</span><b>{monthLong(asMonth(config.startMonth))}</b><button onClick={()=>setStep(3)}>Edit</button></div><div><span>Modelled go-live</span><b>{monthLong(goLive)}</b><button onClick={()=>goTo("map")}>View</button></div><div><span>Internal staffing allowance</span><b>{fmt(Object.values(capacity).reduce((a,b)=>a+b,0))} hrs / mo</b><button onClick={()=>setStep(4)}>Edit</button></div></div></>}
              <div className="jr-form-actions"><button type="button" className="jr-text-btn" onClick={()=>step>1?setStep((step-1) as WizardStep):setConfig(DEFAULT_CONFIG)}>{step>1?<><ArrowLeft size={15}/> Previous</>:<><RotateCcw size={15}/> Reset inputs</>}</button><button type="button" className="jr-btn jr-btn-dark" onClick={()=>step===5?goTo("map"):setStep((step+1) as WizardStep)}>{step===5?"View your reality map":`Next: ${["Systems & scope","Campus calendar","Team capacity","Review plan"][step-1]}`} <ArrowRight size={16}/></button></div>
            </div>
<aside className="jr-form-context">
  <div className="jr-form-context-inner">
    <div className="jr-why">
      <div className="jr-why-icon">
        <Gauge size={18} strokeWidth={1.7} />
      </div>

      <div>
        <strong>
          {[
            "Planning considerations",
            "Scope implications",
            "Operational considerations",
            "Capacity considerations",
            "Review your assumptions",
          ][step - 1]}
        </strong>

        <p>
          {[
            "Your existing systems and available resources may introduce additional work. Account for these requirements when setting your implementation timeline.",
            "Changes to your implementation scope automatically update the estimated timeline, project phases and staffing requirements throughout the page.",
            "Account for periods when campus teams have limited availability, particularly during registration, financial aid processing and year-end reporting.",
            "Use realistic monthly staff hours rather than department headcount. The heatmap compares available capacity against implementation demands to identify potential staffing conflicts.",
            "Confirm your inputs and estimates before sharing with stakeholders. This plan is indicative and should be reviewed with Jenzabar before making commitments.",
          ][step - 1]}
        </p>
      </div>
    </div>

    <div className="jr-context-divider" />

    <div className="jr-aside-kpis">
      <span className="jr-aside-label">
        LIVE MODEL
        <HelpDot text="The timeline estimates how long implementation could take based on your institution's requirements. Staff hours reflect the expected work across project phases. Both estimates adjust as you change your selections." />
      </span>

      <div className="jr-kpi-block">
        <div className="jr-kpi-number">
          <strong>{totalMonths}</strong>
          <span>months</span>
        </div>

        <p>Estimated programme window</p>
      </div>

      <div className="jr-kpi-divider" />

      <div className="jr-kpi-block">
        <div className="jr-kpi-number">
          <strong>{fmt(totalHours)}</strong>
          <span>hours</span>
        </div>

        <p>Indicative internal effort</p>
      </div>
    </div>

    <div className="jr-aside-foot">
      <CircleHelp size={17} strokeWidth={1.7} />

      <span>
        All values recalculate live as you update
        your answers.
      </span>
    </div>
  </div>
</aside>
          
          </div>
        </div>
      </div>
    </section>

    <section className="jr-section jr-section-muted" id="map"><div className="jr-wrap">
      <SectionHeading
        number="02"
        eyebrow="YOUR JENZABAR IMPLEMENTATION PLAN"
        eyebrowColor="#76c0c2"
        title="Review your estimated Jenzabar One implementation timeline."
        detail="See how your implementation could progress from initial planning through go-live. Click any phase to inspect its scope and change timing."
      />
     
     
     
      <div className="jr-summary-row">
        <div>
          <span>
            MODELLED GO-LIVE
            <HelpDot text="The month the model expects your implementation to finish, based on your kickoff date, selected scope, integrations and data complexity. Compare against your stated target below." />
          </span>
          <strong>{monthLong(goLive)}</strong>
          <small>{totalMonths} months from kickoff</small>
        </div>

        <div>
<span>
  INTERNAL STAFF EFFORT
  <HelpDot
    text={`Based on your selected implementation modules, institution size, integrations and data complexity, we estimate ${fmt(totalHours)} staff hours across the project. Your team has ${fmt(
      Object.values(capacity).reduce((sum, h) => sum + h, 0) * totalMonths
    )} hours available over ${totalMonths} months. This is ${
      totalHours >
      Object.values(capacity).reduce((sum, h) => sum + h, 0) * totalMonths
        ? `${fmt(
            totalHours -
              Object.values(capacity).reduce((sum, h) => sum + h, 0) * totalMonths
          )} hours above`
        : `${fmt(
            Object.values(capacity).reduce((sum, h) => sum + h, 0) * totalMonths -
              totalHours
          )} hours below`
    } your total available capacity. Individual departments may still face monthly shortfalls.`}
  />
</span>
          <strong>{fmt(totalHours)} hrs</strong>
          <small>Indicative, not contractual</small>
        </div>

   <div>
  <span>
    PEAK TEAM DEMAND
    <HelpDot
      text={`Based on your selected modules, implementation phases and staffing requirements, ${monthLong(peakMonth)} has the highest estimated workload at ${fmt(Math.max(...aggregate))} hours. Your teams have ${fmt(Object.values(capacity).reduce((sum, h) => sum + h, 0))} hours available that month. ${
        Math.max(...aggregate) > Object.values(capacity).reduce((sum, h) => sum + h, 0)
          ? `Demand exceeds available capacity by ${fmt(Math.max(...aggregate) - Object.values(capacity).reduce((sum, h) => sum + h, 0))} hours.`
          : `Available capacity exceeds estimated demand by ${fmt(Object.values(capacity).reduce((sum, h) => sum + h, 0) - Math.max(...aggregate))} hours.`
      } Review individual departments in the staffing heatmap to identify potential resource conflicts.`}
    />
  </span>
  <strong>{monthTitle(peakMonth)}</strong>
  <small>{fmt(Math.max(...aggregate))} combined hours</small>
</div>

        <div className={`jr-target-box ${targetDelta<0?"late":""}`}>
          <span>
            VS. YOUR TARGET
            <HelpDot text="Difference between the modelled go-live and your preferred target month. A positive value means the model finishes earlier than your target; a negative value means it finishes later." />
          </span>
          <strong>{targetDelta===0?"On target":`${Math.abs(targetDelta)} mo ${targetDelta>0?"early":"late"}`}</strong>
          <button type="button" onClick={alignTarget}>Align to target <ArrowRight size={13}/></button>
        </div>
      </div>


      <div className="jr-map-card" data-reveal>
        <div className="jr-map-top">
  <div>
    <span className="jr-status">
      <span /> LIVE SCENARIO
    </span>

    <h3>Your implementation timeline</h3>

    <p>
      Plan start {monthLong(asMonth(config.startMonth))}
      {" · "}
      {config.modules.length} selected workstreams
    </p>
  </div>

  <div className="jr-map-controls">
    <button
      type="button"
      className="jr-square-btn"
      aria-label="Reset phase adjustments"
      title="Reset phase adjustments"
      onClick={() => setPhaseEdits({})}
    >
      <RotateCcw size={15} />
    </button>
  </div>
</div>
 
<div className="jr-scroll">
    <div
      className="jr-gantt"
      style={
        { "--jr-months": totalMonths } as CSSProperties
      }
    >
      {/* =====================================
          PROJECT PHASE HEADER
      ===================================== */}

      <div className="jr-gantt-labelhead">
        PROJECT PHASE
      </div>

      {/* =====================================
          MONTH HEADERS
      ===================================== */}
<div className="jr-gantt-monthhead">
  {months.map((date, index) => {
    const requiredHours = aggregate[index] ?? 0;

    const availableHours = Object.values(capacity).reduce(
      (sum, hours) => sum + hours,
      0
    );

    const isOverCapacity = requiredHours > availableHours;
    const isPeakMonth = index === peakIndex;

    return (
      <span
        key={index}
        className={[
          "jr-month-header",
          date.getMonth() === 0 ? "yearstart" : "",
          isPeakMonth ? "peak" : "",
          isOverCapacity ? "over-capacity" : "",
        ].filter(Boolean).join(" ")}
        title={`${monthLong(date)}: ${fmt(requiredHours)} hours required; ${fmt(availableHours)} hours available`}
      >
        <b>
          {date.toLocaleDateString("en-US", {
            month: "short",
          })}
        </b>

        {date.getMonth() === 0 && (
          <small className="jr-month-year">
            {date.getFullYear()}
          </small>
        )}

        <strong className="jr-month-hours">
          {fmt(requiredHours)}
          <span> hrs</span>
        </strong>
      </span>
    );
  })}
</div>
      {/* =====================================
          INTERACTIVE PROJECT PHASES
      ===================================== */}

      {phases.map((p) => (
        <div
          key={p.key}
          className={`jr-gantt-row ${
            activePhase === p.key
              ? "selected"
              : ""
          }`}
        >
          {/* CLICKABLE PROJECT PHASE NAME */}

          <button
            type="button"
            className="jr-gantt-label"
            onClick={() => inspectPhase(p.key)}
            aria-label={`Inspect ${p.name}`}
          >
            <span
              className={`jr-mini-dot ${cls(p.owner)}`}
            />

            {p.name}
          </button>

          {/* =====================================
              TIMELINE TRACK
          ===================================== */}

          <div className="jr-gantt-track">
            {/* MONTHLY GRID CELLS */}

            {months.map((_, index) => (
              <span
                key={index}
                className={`jr-gantt-cell ${
                  riskByMonth.has(index)
                    ? "risky"
                    : ""
                } ${
                  index % 3 === 0
                    ? "quarter"
                    : ""
                }`}
                title={
                  riskByMonth
                    .get(index)
                    ?.map((risk) => risk.label)
                    .join(", ") ?? ""
                }
              />
            ))}

            {/* =====================================
                INTERACTIVE TIMELINE BAR
            ===================================== */}

            <button
              type="button"
              className={`jr-gantt-bar ${
                cls(p.owner)
              } ${
                activePhase === p.key
                  ? "selected"
                  : ""
              }`}
              style={{
                left: `${
                  (100 * p.start) / totalMonths
                }%`,

                width: `${
                  (100 * p.duration) / totalMonths
                }%`,
              }}

              /* =================================
                 CLICK TO INSPECT PHASE
              ================================= */

              onClick={() => {
                if (skipInspectAfterDrag.current) {
                  skipInspectAfterDrag.current = false;
                  return;
                }

                inspectPhase(p.key);
              }}

              /* =================================
                 START DRAGGING
              ================================= */

              onPointerDown={(e) => {
                if (e.button !== 0) return;

                skipInspectAfterDrag.current = false;

                drag.current = {
                  key: p.key,
                  x: e.clientX,
                  width:
                    e.currentTarget.parentElement
                      ?.clientWidth || 1,
                };

                e.currentTarget.setPointerCapture(
                  e.pointerId
                );
              }}

              /* =================================
                 FINISH DRAGGING
              ================================= */

              onPointerUp={(e) => {
                const d = drag.current;

                drag.current = null;

                if (!d || d.key !== p.key) {
                  return;
                }

                const diff = Math.round(
                  (e.clientX - d.x) /
                    (d.width / totalMonths)
                );

                if (diff !== 0) {
                  skipInspectAfterDrag.current = true;

                  changePhase(
                    p.key,
                    "start",
                    diff
                  );

                  setActivePhase(p.key);
                }
              }}

              /* =================================
                 CANCEL DRAG
              ================================= */

              onPointerCancel={() => {
                drag.current = null;

                skipInspectAfterDrag.current = false;
              }}

              /* =================================
                 HOVER DESCRIPTION
              ================================= */

              title={
                `Click to inspect or drag horizontally to shift. ` +
                `${p.name} · ` +
                `${monthTitle(months[p.start])} to ` +
                `${monthTitle(months[p.end - 1])}`
              }
            >
              {/* DURATION LABEL */}

              {p.duration >= 2 && (
                <span>{p.duration} mo</span>
              )}
            </button>
          </div>
        </div>
      ))}

      {/* =====================================
          CAMPUS-SENSITIVE WINDOWS
      ===================================== */}

      <div className="jr-gantt-risklabel">
        CAMPUS WINDOWS
      </div>

      <div className="jr-risk-track">
        {months.map((_, index) => (
          <div
            key={index}
            className={`jr-risk-cell ${
              riskByMonth.has(index)
                ? "active"
                : ""
            }`}
          >
            {riskByMonth
              .get(index)
              ?.map((risk) => (
                <span
                  key={risk.id}
                  title={`${risk.label}: ${risk.detail}`}
                  className={
                    risk.level === "High"
                      ? "high"
                      : "medium"
                  }
                >
                  <ShieldAlert size={12} />
                </span>
              ))}
          </div>
        ))}
         </div>
    </div>
  </div>


  
        <div className="jr-map-bottom"><div className="jr-legend"><span><i className="vendor"/> Jenzabar-led*</span><span><i className="campus"/> Institution-led*</span><span><i className="shared"/> Shared*</span><span><i className="risky"/> Campus-sensitive month</span></div><div className="jr-map-note">*Indicative owner, subject to agreement.</div></div>
      </div>
 
    </div></section>

<div className="jr-workforce-suite">

  
  {/* ====================================
      04 / OWNERSHIP & RISK
  ==================================== */}

  <section
    className="jr-section jr-ownership-section"
    id="ownership"
  >
    <div className="jr-wrap">
      <SectionHeading
        number="03"
        eyebrow="OWNERSHIP & RISK"
        title="Establish clear responsibilities before implementation begins."
        detail="Review which activities Jenzabar would lead, what your institution needs to manage and where both teams will work together."
      />

      <div className="jr-ownership-grid" data-reveal>
        {/* THREE-COLUMN OWNERSHIP PANEL */}

        <div className="jr-owners-panel">
          <div className="jr-panel-title jr-owner-panel-head">
            <div>
              <h3>
                Proposed responsibility split
              </h3>

              <p>
                Suggested assignments grouped by owner.
                Adjust them below.
              </p>
            </div>
          </div>

          <div className="jr-ownership-columns">
            {(
              [
                "jenzabar",
                "shared",
                "institution",
              ] as Owner[]
            ).map((owner) => (
              <div
                className={`jr-ownership-col ${cls(owner)}`}
                key={owner}
              >
                <div className="jr-owner-col-head">
                  {owner === "jenzabar" ? (
                    <span className="jr-owner-brand">
                      <Logo src="/images/jenzabarlogo.svg" />
                    </span>
                  ) : (
                    <span className="jr-owner-mark">
                      {owner === "shared" ? (
                        <Users
                          size={20}
                          strokeWidth={1.7}
                        />
                      ) : (
                        <Landmark
                          size={20}
                          strokeWidth={1.7}
                        />
                      )}
                    </span>
                  )}

                  <strong>
                    {owner === "jenzabar"
                      ? "Jenzabar handles*"
                      : owner === "shared"
                      ? "Shared responsibilities*"
                      : "Your institution handles*"}
                  </strong>
                </div>

                <div className="jr-owner-tasks">
                  {scopedTasks
                    .filter(
                      (task) =>
                        ownership[task.id] === owner
                    )
                    .map((task) => (
                      <div
                        className="jr-owner-task"
                        key={task.id}
                      >
                        <CheckCircle2
                          size={16}
                          strokeWidth={1.9}
                        />

                        <span>{task.text}</span>
                      </div>
                    ))}

                  {!scopedTasks.some(
                    (task) =>
                      ownership[task.id] === owner
                  ) && (
                    <p className="jr-owner-empty">
                      No responsibilities assigned yet.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* EXPANDABLE OWNERSHIP EDITOR */}

          <details className="jr-owner-editor">
            <summary className="jr-ownership-toggle">
              <SlidersHorizontal size={15} />
              Edit ownership
            </summary>

            <div className="jr-owner-edit-panel">
              <div className="jr-owner-edit-heading">
                <strong>
                  Adjust proposed responsibilities
                </strong>

                <span>
                  Changes update the three columns
                  and the leadership brief.
                </span>
              </div>

              <div className="jr-owner-table">
                <div className="jr-owner-head">
                  <span>RESPONSIBILITY</span>
                  <span>PROPOSED LEAD</span>
                </div>

                {scopedTasks.map((task) => (
                  <label key={task.id}>
                    <span>
                      <CheckCircle2 size={16} />
                      {task.text}
                    </span>

                    <select
                      aria-label={`Owner of ${task.text}`}
                      value={
                        ownership[task.id] ?? task.owner
                      }
                      onChange={(event) =>
                        setOwnership((old) => ({
                          ...old,
                          [task.id]: event.target
                            .value as Owner,
                        }))
                      }
                    >
                      <option value="jenzabar">
                        Jenzabar-led*
                      </option>

                      <option value="shared">
                        Shared*
                      </option>

                      <option value="institution">
                        Institution-led*
                      </option>
                    </select>
                  </label>
                ))}
              </div>
            </div>
          </details>

          <p className="jr-fineprint">
            *These are illustrative, editable assignments,
            not statements of contractual responsibility.
            Confirm delivery ownership, specialist inputs
            and governance with Jenzabar.
          </p>
        </div>

        {/* ACADEMIC RISK WINDOWS */}

        <div className="jr-risk-panel">
          <div className="jr-panel-title jr-risk-panel-head">
            <div>
              <h3>
                Campus-critical risk windows
              </h3>

              <p>
                Generated from the academic calendar you entered.
              </p>
            </div>

            <button
              type="button"
              className="jr-risk-edit"
              onClick={() => {
                setStep(3);
                goTo("builder");
              }}
            >
              <CalendarDays size={14} />
              Change calendar
            </button>
          </div>

          <div className="jr-risks">
            {risks.length ? (
              risks.slice(0, 7).map((risk) => (
                <button
                  type="button"
                  className="jr-risk-item"
                  key={risk.id}
                  onClick={() => {
                    setTab("months");
                    goTo("map");
                  }}
                  title="View this month in the implementation map"
                >
                  <span className="jr-risk-icon">
                    <CalendarDays
                      size={17}
                      strokeWidth={1.7}
                    />
                  </span>

                  <span className="jr-risk-body">
                    <strong>{risk.label}</strong>

                    <small>
                      {monthLong(
                        months[risk.index]
                      )}
                    </small>

                    <em>{risk.detail}</em>
                  </span>

                  <b
                    className={
                      risk.level.toLowerCase()
                    }
                  >
                    {risk.level}
                  </b>
                </button>
              ))
            ) : (
              <div className="jr-empty">
                No sensitive months enabled.
                Set these in the Campus calendar step.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<section className="jr-brief" id="brief">
  <div className="jr-wrap jr-brief-grid">
    <div className="jr-brief-copy">
      <span className="jr-kicker jr-kicker-light">
        05 / LEADERSHIP READOUT
      </span>

      <h2>
        Turn the plan into a
        <br />
        board-ready decision.
      </h2>

      <p>
        Generate a tailored implementation brief with your current timeline,
        projected staffing load, risk windows and proposed ownership.
        Give Finance and IT a common starting point.
      </p>

      <div className="jr-brief-actions">
        <button
          type="button"
          className="jr-btn jr-btn-mint"
          onClick={exportEditedBrief}
          disabled={exporting}
        >
          {exporting
            ? "Generating slides…"
            : "Generate implementation brief"}
          <FileDown size={17} />
        </button>

        <button
          type="button"
          className="jr-brief-copy-btn"
          onClick={copy}
        >
          {copyState ? <Check size={16} /> : <Copy size={16} />}
          {copyState ? "Copied" : "Copy key assumptions"}
        </button>
      </div>

      <p className="jr-brief-disclaimer">
        Illustrative planning brief. Review dates, resources and responsibilities before approval.
      </p>
    </div>

    <div
      className="jr-slide-area"
      aria-label="Six-part implementation brief preview"
    >
      <div
        className="jr-slide-tabs"
        role="tablist"
        aria-label="Brief sections"
      >
        {[
          "Summary",
          "Timeline",
          "Staffing",
          "Risks",
          "Governance",
          "Next steps",
        ].map((label, i) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={deckSlide === i}
            className={deckSlide === i ? "active" : ""}
            onClick={() => setDeckSlide(i)}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        className="jr-slide-previews"
        aria-label="Select a preview slide"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const wrapped = (i - deckSlide + 6) % 6;
          const offset = wrapped > 3 ? wrapped - 6 : wrapped;
          const distance = Math.abs(offset);
          const activeSlide = deckSlide === i;

          const slideTitles = briefDefaults.map(
            (_, index) => readBriefSlide(index).title
          );

          const slideSubtitles = briefDefaults.map(
            (_, index) => readBriefSlide(index).subtitle
          );

          return (
           
           
                       <button
                key={i}
                type="button"
                className={`jr-mini-slide ${
                  activeSlide ? "active" : ""
                }`}
                aria-label={`Open slide ${i + 1}: ${slideTitles[i]}`}
                aria-pressed={activeSlide}
                tabIndex={distance >= 3 ? -1 : 0}
                onClick={() => {
                  setDeckSlide(i);
                  setDeckModalOpen(true);
                }}


              style={
                {
                  "--deck-x": `${offset * 148}px`,
                  "--deck-y": `${distance * 10}px`,
                  "--deck-rotate": `${offset * -9}deg`,
                  "--deck-scale": String(1 - distance * 0.085),
                  zIndex: 20 - distance,
                  opacity: distance >= 3 ? 0 : 1,
                  pointerEvents: distance >= 3 ? "none" : "auto",
                } as CSSProperties
              }
            >
              <span className="jr-deck-number">
                {String(i + 1).padStart(2, "0")}
              </span>

              <strong className="jr-deck-title">
                {slideTitles[i]}
              </strong>

              <span className="jr-deck-subtitle">
                {slideSubtitles[i]}
              </span>

              <div
                className={`jr-deck-paper jr-deck-paper-${i}`}
                aria-hidden="true"
              >
                {/* SLIDE 01: EXECUTIVE SUMMARY */}

                {i === 0 && (
                  <div className="jr-deck-cover">
                    <div className="jr-deck-logo">
                      <Logo src={logoSrc} />
                    </div>

                    <span className="jr-deck-doc-kicker">
                      JENZABAR IMPLEMENTATION PLAN
                    </span>

                    <b>
                      Implementation
                      <br />
                      Planning Brief
                    </b>

                    <small>
                      {fmt(config.size)} students · {totalMonths} months
                    </small>

                    <div className="jr-deck-cover-shape" />
                  </div>
                )}

                {/* SLIDE 02: PROJECT TIMELINE */}

                {i === 1 && (
                  <div className="jr-deck-timeline">
                    <span className="jr-deck-preview-heading">
                      IMPLEMENTATION PHASES
                    </span>

                    {phases.slice(0, 6).map((phase) => (
                      <div
                        key={phase.key}
                        className="jr-deck-timeline-row"
                      >
                        <span
                          style={{
                            left: `${
                              (phase.start / totalMonths) * 100
                            }%`,
                            width: `${
                              (phase.duration / totalMonths) * 100
                            }%`,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* SLIDE 03: STAFFING HEATMAP */}

                {i === 2 && (
                  <div className="jr-deck-staffing">
                    <span className="jr-deck-preview-heading">
                      MONTHLY TEAM EFFORT
                    </span>

                    <div className="jr-deck-heat">
                      {grid.slice(0, 4).flatMap((role) =>
                        role.loads.slice(0, 5).map((hours, month) => (
                          <i
                            key={`${role.key}-${month}`}
                            className={
                              hours > capacity[role.key]
                                ? "over"
                                : hours > capacity[role.key] * 0.65
                                ? "high"
                                : "low"
                            }
                          />
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* SLIDE 04: ACADEMIC RISKS */}

                {i === 3 && (
                  <div className="jr-deck-risks">
                    <span className="jr-deck-preview-heading">
                      CAMPUS RISK WINDOWS
                    </span>

                    {risks.length ? (
                      risks.slice(0, 3).map((risk) => (
                        <div
                          key={risk.id}
                          className="jr-deck-risk-row"
                        >
                          <ShieldAlert size={11} />
                          <span>{risk.label}</span>
                        </div>
                      ))
                    ) : (
                      <span className="jr-deck-no-risks">
                        No dates flagged
                      </span>
                    )}
                  </div>
                )}

                {/* SLIDE 05: OWNERSHIP & GOVERNANCE */}

                {i === 4 && (
                  <div className="jr-deck-owners">
                    <span className="jr-deck-preview-heading">
                      PROPOSED TASK OWNERS
                    </span>

                    {(
                      [
                        "jenzabar",
                        "shared",
                        "institution",
                      ] as Owner[]
                    ).map((owner) => (
                      <div
                        key={owner}
                        className="jr-deck-owner-row"
                      >
                        <span className="jr-deck-owner-mark">
                          <Users size={11} />
                        </span>

                        <span>
                          {owner === "jenzabar"
                            ? "Jenzabar-led"
                            : owner === "shared"
                            ? "Shared"
                            : "Institution-led"}
                        </span>

                        <b>
                          {
                            scopedTasks.filter(
                              (task) =>
                                (ownership[task.id] ?? task.owner) === owner
                            ).length
                          }
                        </b>
                      </div>
                    ))}
                  </div>
                )}

                {/* SLIDE 06: NEXT STEPS */}

                {i === 5 && (
                  <div className="jr-deck-next">
                    <span className="jr-deck-preview-heading">
                      VALIDATE BEFORE APPROVAL
                    </span>

                    {[
                      "Confirm scope",
                      "Validate capacity",
                      "Agree go-live criteria",
                    ].map((label, index) => (
                      <div
                        className="jr-deck-next-row"
                        key={label}
                      >
                        <span>{index + 1}</span>
                        <b>{label}</b>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="jr-slide-controls">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() =>
            setDeckSlide((x) => (x + 5) % 6)
          }
        >
          <ChevronLeft size={18} />
        </button>

        <span>
          Slide <strong>{deckSlide + 1}</strong> of 6
        </span>

        <button
          type="button"
          aria-label="Next slide"
          onClick={() =>
            setDeckSlide((x) => (x + 1) % 6)
          }
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  </div>
</section>

    <section className="jr-faq jr-section" id="faq"><div className="jr-wrap jr-faq-layout"><div><span className="jr-kicker">FREQUENTLY ASKED QUESTIONS</span><h2>Questions your CFO<br/>and IT team will ask.</h2><p>Use these answers to challenge the assumptions before taking the model into a project planning meeting.</p><a href={demoHref} className="jr-inline-link" target="_blank" rel="noreferrer">Discuss implementation with Jenzabar <ArrowUpRight size={16}/></a></div><div className="jr-faq-list">{FAQs.map(([q,a],i)=><div key={i} className="jr-faq-item"><button type="button" aria-expanded={openFaq===i} onClick={()=>setOpenFaq(openFaq===i?null:i)}><span><small>{String(i+1).padStart(2,"0")}</small>{q}</span>{openFaq===i?<Minus size={17}/>:<Plus size={17}/>}</button>{openFaq===i&&<p>{a}</p>}</div>)}</div></div></section>


<section className="jr-final">
  <div className="jr-wrap jr-final-inner">
    {/* FINAL CTA COPY */}

    <div className="jr-final-copy">
      <span className="jr-kicker jr-kicker-light">
        NEXT STEP
      </span>

      <h2>
        Plan the change before
        <br />
        you commit to it.
      </h2>

      <p>
        Bring a personalised JENZABAR IMPLEMENTATION PLAN
        to your first serious scoping discussion.
      </p>
    </div>

    {/* FINAL CTA ACTIONS */}

    <div className="jr-final-actions">
      <a
        href={demoHref}
        target="_blank"
        rel="noreferrer"
        className="jr-btn jr-btn-mint"
      >
        Talk through your roadmap
        <ArrowRight size={18} />
      </a>

      <button
        className="jr-btn jr-btn-outline"
        type="button"
        onClick={() => goTo("builder")}
      >
        Revise your plan
        <SlidersHorizontal size={16} />
      </button>
    </div>
  </div>
</section>


    {warnToast && (
      <div role="status" className="jr-toast">
        <CheckCircle2 size={18} />
        {warnToast}
      </div>
    )}

        {warnToast && (
      <div role="status" className="jr-toast">
        <CheckCircle2 size={18} />
        {warnToast}
      </div>
    )}


{phaseModalOpen && active && (
  <div
    className="jr-phase-overlay"
    onMouseDown={(event) => {
      if (event.target === event.currentTarget) {
        setPhaseModalOpen(false);
      }
    }}
  >
    <div
      className="jr-phase-modal jr-phase-modal-upgraded"
      role="dialog"
      aria-modal="true"
      aria-label={`${active.name} implementation plan`}
    >
      <button
        type="button"
        className="jr-phase-close"
        aria-label="Close phase details"
        onClick={() => setPhaseModalOpen(false)}
      >
        <X size={19} />
      </button>

      {/* HEADER */}

      <div className="jr-pm-header">
        <span className="jr-pm-eyebrow">
          IMPLEMENTATION PHASE DETAILS
        </span>

        <h3>{active.name}</h3>

        <p>{active.desc}</p>

        <div className="jr-pm-meta">
          <span className={`jr-owner-tag ${cls(active.owner)}`}>
            {chooseLabel(active.owner)}
          </span>

          <span>
            <CalendarDays size={14} />
            {monthLong(shift(config.startMonth, active.start))}
            {" – "}
            {monthLong(
              shift(config.startMonth, active.end - 1)
            )}
          </span>

          <span>
            {active.duration}{" "}
            {active.duration === 1 ? "month" : "months"}
          </span>
        </div>
      </div>

      {/* PHASE SUMMARY */}

      <div className="jr-pm-summary">
        <div>
          <span>PHASE DURATION</span>
          <strong>{active.duration} months</strong>
        </div>

        <div>
          <span>ESTIMATED PHASE EFFORT</span>
          <strong>
            {fmt(
              Array.from(
                { length: active.duration },
                (_, index) => active.start + index
              ).reduce(
                (sum, monthIndex) =>
                  sum +
                  ROLE.reduce(
                    (roleSum, role) =>
                      roleSum +
                      calcLoad(
                        config,
                        [active],
                        role.key,
                        monthIndex
                      ),
                    0
                  ),
                0
              )
            )}{" "}
            hrs
          </strong>
        </div>

        <div>
          <span>EXPECTED DELIVERABLE</span>
          <strong>{active.deliverable}</strong>
        </div>
      </div>

      {/* MONTH-BY-MONTH PLAN */}

      <div className="jr-pm-body">
        <div className="jr-pm-section-heading">
          <div>
            <span className="jr-pm-eyebrow">
              MONTH-BY-MONTH DELIVERY PLAN
            </span>

            <h4>What happens during this phase</h4>

            <p>
              Review the planned activities, staffing
              requirements and expected outcomes for
              each month.
            </p>
          </div>

          <span className="jr-pm-count">
            {active.duration}{" "}
            {active.duration === 1 ? "month" : "months"}
          </span>
        </div>

        <div className="jr-pm-month-list">
          {Array.from(
            { length: active.duration },
            (_, index) => {
              const monthIndex = active.start + index;

              const date = shift(
                config.startMonth,
                monthIndex
              );

              const detail = getPhaseMonthDetail(
                active,
                monthIndex
              );

              const roleDemand = ROLE.map((role) => ({
                ...role,
                hours: calcLoad(
                  config,
                  [active],
                  role.key,
                  monthIndex
                ),
              }));

              const phaseHours = roleDemand.reduce(
                (sum, role) => sum + role.hours,
                0
              );

              const monthRisks = risks.filter(
                (risk) => risk.index === monthIndex
              );

              return (
                <div
                  className="jr-pm-month"
                  key={`${active.key}-${monthIndex}`}
                >
                  <div className="jr-pm-month-rail">
                    <span className="jr-pm-month-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {index < active.duration - 1 && (
                      <span className="jr-pm-rail-line" />
                    )}
                  </div>

                  <div className="jr-pm-month-card">
                    <div className="jr-pm-month-top">
                      <div>
                        <span className="jr-pm-month-date">
                          {monthLong(date)}
                        </span>

                        <h5>{detail.focus}</h5>
                      </div>

                      <div className="jr-pm-hours">
                        <strong>{fmt(phaseHours)} hrs</strong>
                        <span>Estimated phase effort</span>
                      </div>
                    </div>

                    <div className="jr-pm-activities">
                      <span className="jr-pm-small-heading">
                        PLANNED ACTIVITIES
                      </span>

                      {detail.activities.map(
                        (activity, activityIndex) => (
                          <div key={activityIndex}>
                            <span className="jr-pm-task-marker">
                              {String(activityIndex + 1).padStart(
                                2,
                                "0"
                              )}
                            </span>
                            <p>{activity}</p>
                          </div>
                        )
                      )}
                    </div>

                    <div className="jr-pm-month-outcome">
                      <div>
                        <span>EXPECTED OUTCOME</span>
                        <strong>{detail.outcome}</strong>
                      </div>
                    </div>

                    <div className="jr-pm-role-effort">
                      <span className="jr-pm-small-heading">
                        ESTIMATED STAFF HOURS BY TEAM
                      </span>

                      <div className="jr-pm-roles">
                        {roleDemand
                          .filter((role) => role.hours > 0)
                          .map((role) => (
                            <div key={role.key}>
                              <span>{role.name}</span>
                              <strong>
                                {fmt(role.hours)} hrs
                              </strong>
                            </div>
                          ))}
                      </div>
                    </div>

                    {monthRisks.length > 0 && (
                      <div className="jr-pm-risk">
                        <ShieldAlert size={16} />

                        <div>
                          <strong>
                            Campus scheduling considerations
                          </strong>

                          {monthRisks.map((risk) => (
                            <p key={risk.id}>
                              {risk.label}: {risk.detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* SCHEDULE CONTROLS */}

      <div className="jr-pm-controls">
        <div className="jr-pm-controls-heading">
          <h4>Adjust the implementation schedule</h4>
          <p>
            Update the phase timing to explore how
            changes affect your implementation plan.
          </p>
        </div>

        <div className="jr-pm-control-grid">
          <div className="jr-pm-control">
            <div>
              <strong>Phase start</strong>
              <span>
                {monthLong(
                  shift(config.startMonth, active.start)
                )}
              </span>
            </div>

            <div className="jr-pm-stepper">
              <button
                type="button"
                aria-label="Move phase one month earlier"
                disabled={active.start === 0}
                onClick={() =>
                  changePhase(active.key, "start", -1)
                }
              >
                <Minus size={15} />
              </button>

              <button
                type="button"
                aria-label="Move phase one month later"
                onClick={() =>
                  changePhase(active.key, "start", 1)
                }
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          <div className="jr-pm-control">
            <div>
              <strong>Phase duration</strong>
              <span>
                {active.duration}{" "}
                {active.duration === 1
                  ? "month"
                  : "months"}
              </span>
            </div>

            <div className="jr-pm-stepper">
              <button
                type="button"
                aria-label="Shorten phase by one month"
                disabled={active.duration <= 1}
                onClick={() =>
                  changePhase(active.key, "duration", -1)
                }
              >
                <Minus size={15} />
              </button>

              <button
                type="button"
                aria-label="Extend phase by one month"
                onClick={() =>
                  changePhase(active.key, "duration", 1)
                }
              >
                <Plus size={15} />
              </button>
            </div>
          </div>
        </div>

        <p className="jr-pm-disclaimer">
          Activities, staff hours and ownership are
          illustrative planning assumptions. Review the
          proposed scope and schedule with Jenzabar before
          treating this as an agreed delivery plan.
        </p>
      </div>
    </div>
  </div>
)}
    {/* ============================================
        EXPANDED PRESENTATION EDITOR
    ============================================ */}

    {deckModalOpen && (
      <div
        className="jr-deck-overlay"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            setDeckModalOpen(false);
          }
        }}
      >
        <div
          className="jr-deck-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Edit slide ${deckSlide + 1}`}
        >
          {/* MODAL HEADER */}

          <header className="jr-deck-modal-header">
            <div>
              <span className="jr-deck-modal-eyebrow">
                IMPLEMENTATION PLANNING BRIEF
              </span>

              <strong>
                Slide {String(deckSlide + 1).padStart(2, "0")}
                <span> / 06</span>
              </strong>
            </div>

            <div className="jr-deck-modal-header-actions">
              <span className="jr-deck-live-status">
                <CheckCircle2 size={14} />
                Live preview
              </span>

              <button
                type="button"
                className="jr-deck-close"
                aria-label="Close slide editor"
                onClick={() => setDeckModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </header>

          <div className="jr-deck-modal-body">
            {/* =====================================
                LARGE SLIDE PREVIEW
            ===================================== */}

            <div className="jr-deck-preview-workspace">
              <div className="jr-deck-workspace-label">
                <span>
                  PRESENTATION PREVIEW
                </span>

                <span>
                  16:9 widescreen
                </span>
              </div>

              <div className="jr-deck-large-slide">
                {/* SLIDE MASTHEAD */}

                <div className="jr-deck-large-masthead">
                  <Logo src={logoSrc} />

                  <span>
                    JENZABAR IMPLEMENTATION PLAN
                  </span>
                </div>

                <div className="jr-deck-large-heading">
                  <span>
                    {String(deckSlide + 1).padStart(2, "0")}
                    {" / "}
                    {[
                      "EXECUTIVE SUMMARY",
                      "DELIVERY TIMELINE",
                      "STAFFING REQUIREMENTS",
                      "ACADEMIC RISKS",
                      "OWNERSHIP & GOVERNANCE",
                      "DECISIONS & NEXT STEPS",
                    ][deckSlide]}
                  </span>

                  <h2>
                    {readBriefSlide(deckSlide).title}
                  </h2>

                  <p>
                    {readBriefSlide(deckSlide).subtitle}
                  </p>
                </div>

                {/* SLIDE 01 / EXECUTIVE SUMMARY */}

                {deckSlide === 0 && (
                  <div className="jr-deck-large-summary">
                    <div className="jr-deck-large-stats">
                      <div>
                        <span>INSTITUTION SIZE</span>
                        <strong>
                          {fmt(config.size)}
                        </strong>
                        <small>students</small>
                      </div>

                      <div>
                        <span>PROGRAMME WINDOW</span>
                        <strong>
                          {totalMonths}
                        </strong>
                        <small>months</small>
                      </div>

                      <div>
                        <span>INTERNAL EFFORT</span>
                        <strong>
                          {fmt(totalHours)}
                        </strong>
                        <small>hours</small>
                      </div>
                    </div>

                    <div className="jr-deck-large-summary-band">
                      <div>
                        <span>MODELLED GO-LIVE</span>
                        <strong>
                          {monthLong(goLive)}
                        </strong>
                      </div>

                      <div>
                        <span>YOUR TARGET</span>
                        <strong>
                          {monthLong(
                            asMonth(config.targetMonth)
                          )}
                        </strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 02 / FULL TIMELINE */}

                {deckSlide === 1 && (
                  <div className="jr-deck-large-timeline">
                    <div className="jr-deck-large-timeline-head">
                      <strong>PROJECT PHASE</strong>

                      <span>
                        {monthTitle(
                          asMonth(config.startMonth)
                        )}
                        {" – "}
                        {monthTitle(goLive)}
                      </span>
                    </div>

                    {phases.map((phase) => (
                      <div
                        className="jr-deck-large-phase"
                        key={phase.key}
                      >
                        <span>{phase.name}</span>

                        <div>
                          <i
                            style={{
                              left: `${
                                (phase.start / totalMonths) *
                                100
                              }%`,
                              width: `${
                                (phase.duration /
                                  totalMonths) *
                                100
                              }%`,
                            }}
                          />
                        </div>

                        <small>
                          {phase.duration} mo
                        </small>
                      </div>
                    ))}
                  </div>
                )}

                {/* SLIDE 03 / STAFFING LOAD */}

                {deckSlide === 2 && (
                  <div className="jr-deck-large-staffing">
                    <div className="jr-deck-large-heat-heading">
                      <strong>
                        MONTHLY PROJECT HOURS
                      </strong>

                      <span>
                        Peak: {monthLong(peakMonth)}
                      </span>
                    </div>

                    {grid.map((role) => {
                      const visibleMonths = Math.min(
                        12,
                        totalMonths
                      );

                      return (
                        <div
                          className="jr-deck-large-heat-row"
                          key={role.key}
                          style={{
                            gridTemplateColumns: `150px repeat(${visibleMonths}, minmax(0, 1fr))`,
                          }}
                        >
                          <strong>{role.name}</strong>

                          {role.loads
                            .slice(0, visibleMonths)
                            .map((hours, index) => {
                              const availability =
                                capacity[role.key];

                              return (
                                <span
                                  key={index}
                                  className={
                                    hours > availability
                                      ? "over"
                                      : hours >
                                        availability * 0.65
                                      ? "high"
                                      : "low"
                                  }
                                  title={`${hours} project hours`}
                                >
                                  {hours}
                                </span>
                              );
                            })}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* SLIDE 04 / RISKS */}

                {deckSlide === 3 && (
                  <div className="jr-deck-large-risks">
                    {risks.length ? (
                      risks.slice(0, 6).map((risk) => (
                        <div
                          className="jr-deck-large-risk"
                          key={risk.id}
                        >
                          <div>
                            <ShieldAlert size={17} />
                            <span>
                              <strong>
                                {risk.label}
                              </strong>
                              <small>
                                {monthLong(
                                  months[risk.index]
                                )}
                              </small>
                            </span>
                          </div>

                          <p>{risk.detail}</p>

                          <b
                            className={
                              risk.level.toLowerCase()
                            }
                          >
                            {risk.level}
                          </b>
                        </div>
                      ))
                    ) : (
                      <div className="jr-deck-large-empty">
                        No campus-sensitive windows
                        currently enabled.
                      </div>
                    )}
                  </div>
                )}

                {/* SLIDE 05 / RESPONSIBILITIES */}

                {deckSlide === 4 && (
                  <div className="jr-deck-large-ownership">
                    {(
                      [
                        "jenzabar",
                        "shared",
                        "institution",
                      ] as Owner[]
                    ).map((owner) => {
                      const tasks = scopedTasks.filter(
                        (task) =>
                          (ownership[task.id] ??
                            task.owner) === owner
                      );

                      return (
                        <div
                          className="jr-deck-large-owner"
                          key={owner}
                        >
                          <strong>
                            {owner === "jenzabar"
                              ? "Jenzabar-led*"
                              : owner === "shared"
                              ? "Shared*"
                              : "Institution-led*"}
                          </strong>

                          <span>
                            {tasks.length} responsibilities
                          </span>

                          {tasks.slice(0, 7).map(
                            (task) => (
                              <div key={task.id}>
                                <CheckCircle2
                                  size={13}
                                />
                                <p>
                                  {task.text}
                                </p>
                              </div>
                            )
                          )}

                          {tasks.length > 7 && (
                            <small>
                              +{tasks.length - 7} more
                            </small>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* SLIDE 06 / NEXT STEPS */}

                {deckSlide === 5 && (
                  <div className="jr-deck-large-next">
                    {readBriefSlide(5)
                      .body.split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((line, index) => (
                        <div key={index}>
                          <span>
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <strong>{line}</strong>

                          <CheckCircle2 size={19} />
                        </div>
                      ))}
                  </div>
                )}

                {/* EDITABLE PRESENTATION NARRATIVE */}

                {deckSlide !== 5 && (
                  <p className="jr-deck-large-narrative">
                    {readBriefSlide(deckSlide).body}
                  </p>
                )}

                <footer className="jr-deck-large-footer">
                  <span>
                    Independent planning concept by GrowUp.
                    Not an official Jenzabar document.
                  </span>

                  <strong>
                    {String(deckSlide + 1).padStart(
                      2,
                      "0"
                    )}
                    /06
                  </strong>
                </footer>
              </div>

              <div className="jr-deck-preview-helper">
                <CircleHelp size={15} />
                Calculated figures reflect your current
                implementation inputs. Edit those in the
                baseline builder.
              </div>
            </div>

            {/* =====================================
                TEXT EDITOR
            ===================================== */}

            <aside className="jr-deck-editor-panel">
              <div className="jr-deck-editor-heading">
                <div>
                  <span>EDIT SLIDE</span>
                  <h3>
                    Presentation content
                  </h3>
                  <p>
                    Changes appear immediately in the preview.
                  </p>
                </div>
              </div>

              <div className="jr-deck-editor-fields">
                <label>
                  <span>Slide headline</span>

                  <textarea
                    rows={2}
                    value={
                      readBriefSlide(deckSlide).title
                    }
                    onChange={(event) =>
                      editBriefSlide(
                        "title",
                        event.target.value
                      )
                    }
                  />
                </label>

                <label>
                  <span>Supporting line</span>

                  <textarea
                    rows={2}
                    value={
                      readBriefSlide(deckSlide).subtitle
                    }
                    onChange={(event) =>
                      editBriefSlide(
                        "subtitle",
                        event.target.value
                      )
                    }
                  />
                </label>

                <label>
                  <span>
                    {deckSlide === 5
                      ? "Next-step checklist"
                      : "Slide summary"}
                  </span>

                  <textarea
                    rows={deckSlide === 5 ? 7 : 4}
                    value={
                      readBriefSlide(deckSlide).body
                    }
                    onChange={(event) =>
                      editBriefSlide(
                        "body",
                        event.target.value
                      )
                    }
                  />

                  {deckSlide === 5 && (
                    <small>
                      Enter one next step per line.
                    </small>
                  )}
                </label>

                <label>
                  <span>Presenter notes</span>

                  <textarea
                    rows={4}
                    placeholder="Add context, questions or talking points for leadership..."
                    value={
                      readBriefSlide(deckSlide).notes
                    }
                    onChange={(event) =>
                      editBriefSlide(
                        "notes",
                        event.target.value
                      )
                    }
                  />
                </label>
              </div>

              <div className="jr-deck-editor-bottom">
                <button
                  type="button"
                  onClick={resetBriefSlide}
                  disabled={!slideEdits[deckSlide]}
                >
                  <RotateCcw size={14} />
                  Reset slide text
                </button>

                <span>
                  <CheckCircle2 size={14} />
                  Updated in preview
                </span>
              </div>
            </aside>
          </div>

          {/* =====================================
              MODAL NAVIGATION
          ===================================== */}

          <footer className="jr-deck-modal-footer">
            <div className="jr-deck-modal-navigation">
              <button
                type="button"
                aria-label="Previous presentation slide"
                onClick={() =>
                  setDeckSlide(
                    (current) => (current + 5) % 6
                  )
                }
              >
                <ChevronLeft size={18} />
              </button>

              <span>
                Slide {deckSlide + 1} of 6
              </span>

              <button
                type="button"
                aria-label="Next presentation slide"
                onClick={() =>
                  setDeckSlide(
                    (current) => (current + 1) % 6
                  )
                }
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <button
              type="button"
              className="jr-deck-modal-done"
              onClick={() => setDeckModalOpen(false)}
            >
              Done editing
              <Check size={15} />
            </button>
          </footer>
        </div>
      </div>
    )}
  </main>;
}


const styles = `
/* JENZABAR JENZABAR IMPLEMENTATION PLAN · premium GrowUp green theme */
.jr{--deep:#041b1c;--deep2:#0a3434;--green:#0d7065;--mint:#a9e1ce;--mint2:#d5f1e5;--ink:#122626;--muted:#657774;--paper:#fff;--mist:#f7f9f7;--line:#dfe8e4;--warn:#d7834c;color:var(--ink);background:#fff;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;line-height:1.55;overflow:hidden;}
.jr *{box-sizing:border-box}.jr button,.jr select,.jr input{font:inherit}.jr button{cursor:pointer}.jr a{color:inherit;text-decoration:none}.jr svg{flex-shrink:0}.jr h1,.jr h2,.jr h3,.jr h4,.jr p{margin:0}.jr h1,.jr h2,.jr h3{letter-spacing:-.042em}.jr h1,.jr h2{font-family:Georgia,'Times New Roman',serif;font-weight:500}.jr h3{font-family:Georgia,'Times New Roman',serif;font-weight:500}.jr button:focus-visible,.jr a:focus-visible,.jr input:focus-visible,.jr select:focus-visible{outline:3px solid #5ccfb0;outline-offset:3px}.jr-wrap{width:min(1340px,calc(100% - 96px));margin-inline:auto}.jr-kicker{font-size:10px;letter-spacing:.15em;color:var(--green);font-weight:800;text-transform:uppercase;display:block}.jr-kicker-light{color:#9cdfc6}.jr-section{padding:93px 0}.jr-section-muted{background:var(--mist)}.jr-section-head{display:flex;align-items:end;justify-content:space-between;gap:40px;margin-bottom:32px}.jr-section-head h2{font-size:clamp(33px,3.4vw,51px);line-height:1.1;white-space:pre-line;margin-top:13px;max-width:900px}.jr-section-head>p{font-size:14px;max-width:420px;line-height:1.8;color:var(--muted)}.jr-logo{height:39px;width:188px;display:inline-flex;align-items:center;overflow:hidden}.jr-logo img{display:block;max-width:100%;max-height:100%;width:100%;height:100%;object-fit:contain;object-position:left center;mix-blend-mode:multiply}.jr-logo-dark{background:#fff;border-radius:4px;padding:2px 6px;width:168px;height:37px}.jr-wordmark{font-size:27px;color:#263b3a;letter-spacing:-.08em;font-weight:700}.jr-butterfly{background:linear-gradient(140deg,#70c897 20%,#d351a2 47%,#e4b94c 65%,#6a87c9);color:transparent;background-clip:text;font-size:31px}
.jr-hero{background:radial-gradient(ellipse at 73% 44%,#113a39 0%,#071f20 45%,#041b1c 73%);position:relative;color:#fff}.jr-hero:after{content:'';position:absolute;inset:0;background-image:linear-gradient(90deg,transparent 90%,rgba(200,250,225,.04) 100%);background-size:72px 72px;pointer-events:none}.jr-hero-grid{min-height:568px;display:grid;grid-template-columns:43% 57%;align-items:center;gap:10px;position:relative;z-index:1}.jr-hero-copy{padding:80px 0;position:relative;z-index:3}.jr-hero h1{font-size:clamp(47px,4.25vw,72px);line-height:.99;max-width:600px;margin:24px 0 24px}.jr-hero h1 em{font-style:normal;color:#afe5d1}.jr-hero-copy>p{max-width:490px;font-size:16px;line-height:1.74;color:#d3e3df}.jr-hero-actions{display:flex;gap:13px;flex-wrap:wrap;margin-top:33px}.jr-btn{border:1px solid transparent;min-height:46px;border-radius:4px;padding:13px 18px;font-size:12px;font-weight:800;display:inline-flex;gap:15px;align-items:center;justify-content:center;white-space:nowrap;transition:transform .18s,background .18s}.jr-btn:hover{transform:translateY(-2px)}.jr-btn-mint{background:#aee6d2;color:#06302d}.jr-btn-mint:hover{background:#c4f2e0}.jr-btn-outline{border-color:#92aaa5;color:#fff;background:transparent}.jr-btn-outline:hover{background:#153b39}.jr-btn-dark{background:var(--deep);color:#fff}.jr-btn-dark:hover{background:#15574e}.jr-hero-foot{display:flex;align-items:center;gap:8px;font-size:11px;color:#a9c4bb;margin-top:24px}
.jr-hero-visual{width:108%;margin-left:0;transform:perspective(1600px) rotateY(-7deg) rotateX(2deg);transform-origin:left center;position:relative;box-shadow:0 44px 70px rgba(0,0,0,.32)}.jr-hero-visual:before{content:'';position:absolute;inset:-10px;border:1px solid #52716d;border-radius:14px;opacity:.5;pointer-events:none}.jr-window-top{display:flex;align-items:center;justify-content:space-between;gap:12px;height:56px;padding:0 20px;background:#102f30;border:1px solid #42605d;border-bottom:0;border-radius:7px 7px 0 0}.jr-window-brand{display:flex;align-items:center;gap:7px;font-weight:700;font-size:13px;white-space:nowrap}.jr-window-logo{font-size:19px;color:#b9e9cf}.jr-window-suffix{font-weight:400;font-size:10px;color:#88aba2;margin-left:5px}.jr-live-dot{font-size:10px;color:#c4ded4}.jr-live-dot:before,.jr-status span{content:'';display:inline-block;width:7px;height:7px;border-radius:50%;background:#7ed8b7;margin-right:8px}.jr-window-body{height:375px;border:1px solid #42605d;background:#092527;display:flex;border-radius:0 0 7px 7px}.jr-window-side{width:121px;flex-shrink:0;border-right:1px solid #244442;padding:18px 8px}.jr-window-side span{display:flex;align-items:center;gap:8px;color:#769b95;font-size:10px;padding:11px 8px;white-space:nowrap}.jr-window-side span.active{color:#d5f8ea;background:#1a4543;border-radius:4px}.jr-window-chart{flex:1;padding:18px 17px 12px;min-width:0;overflow:hidden}.jr-window-chart-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:19px}.jr-window-chart-head strong{font-size:12px}.jr-window-chart-head span{display:flex;gap:5px;align-items:center;color:#a2c2b9;border:1px solid #46645e;border-radius:3px;padding:5px 7px;font-size:9px}.jr-preview-months{margin-left:98px;display:flex;justify-content:space-between;color:#9aaea9;font-size:9px;letter-spacing:.04em;padding-bottom:11px}.jr-preview-row{display:flex;height:32px;align-items:center;border-bottom:1px solid #1c3c3b;gap:8px}.jr-preview-row>span{font-size:9px;color:#bacac5;min-width:91px}.jr-preview-track{height:100%;flex:1;position:relative;background:repeating-linear-gradient(90deg,transparent 0,transparent calc(11.11% - 1px),#234341 calc(11.11% - 1px),#234341 11.11%)}.jr-preview-track b{display:block;position:absolute;top:11px;height:9px;border-radius:3px;box-shadow:0 1px 8px rgba(0,0,0,.2)}.jr-preview-warnings{display:flex;align-items:center;justify-content:space-between;color:#f1af86;font-size:9px;padding:13px 0 0 95px}.jr-preview-warnings span{display:flex;align-items:center;gap:5px}
   
.jr-builder-layout{display:grid;grid-template-columns:242px minmax(0,1fr);gap:25px}.jr-builder-steps{display:flex;flex-direction:column;align-items:stretch;padding-top:3px}.jr-step{display:flex;gap:15px;align-items:flex-start;padding:16px 14px;background:transparent;border:0;border-left:2px solid #dfe8e5;text-align:left}.jr-step.active{border-left-color:#138c72;background:#f0f7f3}.jr-step>span{font-size:12px;min-width:21px;font-weight:700;color:#46615b;padding-top:1px}.jr-step b{font-size:13px;display:block}.jr-step small{display:block;color:#7a8a84;line-height:1.5;font-size:11px;margin-top:4px}.jr-form-card{display:grid;grid-template-columns:minmax(0,1fr) 230px;min-height:478px;border:1px solid #e0e8e3;border-radius:8px;background:#fff;box-shadow:0 12px 36px rgba(7,44,36,.04);overflow:hidden}.jr-form-main{padding:32px 30px;display:flex;flex-direction:column}.jr-form-heading h3{font-size:24px}.jr-form-heading p{font-size:12px;color:var(--muted);margin-top:8px;margin-bottom:26px;line-height:1.6}.jr-fields-2{display:grid;grid-template-columns:1fr 1fr;gap:17px 15px}.jr-field{display:flex;flex-direction:column;gap:7px;min-width:0}.jr-field>span{font-size:11px;font-weight:700;color:#344d46;display:flex;align-items:center;gap:5px}.jr-field small{display:flex;color:#8d9a94}.jr-field input,.jr-field select{border:1px solid #dbe5df;border-radius:5px;background:#fff;height:44px;padding:0 12px;color:#1f3933;width:100%;font-size:12px;min-width:0}.jr-field input:focus,.jr-field select:focus{border-color:#128c77}.jr-date-wide{max-width:calc(50% - 7px);margin-top:18px}.jr-form-context{background:#f6f9f7;border-left:1px solid #e9efeb}.jr-form-context-inner{display:flex;flex-direction:column;padding:24px 17px;height:100%}.jr-why{display:flex;gap:10px}.jr-why>svg{color:#188068;margin-top:1px}.jr-why strong{font-size:12px}.jr-why p{font-size:11px;line-height:1.65;color:#6b7e75;margin-top:6px}.jr-aside-kpis{margin-top:40px;padding:19px;background:linear-gradient(150deg,#dfeee6,#eef7f1);border-radius:7px}.jr-aside-kpis>span{letter-spacing:.12em;font-weight:800;font-size:9px;color:#377a69}.jr-aside-kpis strong{display:block;font-size:30px;letter-spacing:-.05em;margin-top:10px}.jr-aside-kpis strong small{font-size:12px;font-weight:500;letter-spacing:0}.jr-aside-kpis div{font-size:11px;color:#60766d}.jr-aside-kpis hr{border:0;border-top:1px solid #c7ddd0;margin:15px 0 7px}.jr-aside-foot{display:flex;align-items:center;gap:8px;color:#457d69;font-size:10px;margin-top:auto;padding-top:20px}.jr-form-actions{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:auto;padding-top:33px}.jr-text-btn{border:0;background:none;display:flex;align-items:center;gap:7px;color:#527069;font-size:12px;font-weight:700}.jr-form-sub{font-weight:700;font-size:11px;margin-bottom:13px}.jr-inline-note{margin-top:23px;padding:13px;background:#eff7f1;font-size:11px;color:#3c7363;display:flex;gap:8px;align-items:center;border-radius:6px}.jr-monthpick{display:grid;grid-template-columns:repeat(6,1fr);gap:4px}.jr-monthpick button{background:#f4f6f3;border:1px solid #e3eae5;padding:6px 0;border-radius:4px;font-size:10px}.jr-monthpick button.selected{background:#12443c;color:#fff;border-color:#12443c}.jr-checkline{display:flex;align-items:center;gap:9px;font-size:12px;color:#435a51;margin-top:25px}.jr-checkline input{accent-color:#117664}.jr-cap-fields{display:grid;gap:6px}.jr-cap-fields>label{display:flex;justify-content:space-between;align-items:center;gap:15px;border-bottom:1px solid #e7efea;padding:8px 0}.jr-cap-fields b{display:block;font-size:12px}.jr-cap-fields small{display:block;color:#778982;font-size:10px}.jr-hours-input{display:flex;align-items:center;gap:7px}.jr-hours-input input{border:1px solid #dce8e0;border-radius:4px;text-align:right;width:75px;height:35px;padding:5px}.jr-review>div{display:grid;grid-template-columns:1fr 1fr 47px;gap:12px;align-items:center;border-bottom:1px solid #e7ede9;padding:12px 0;font-size:12px}.jr-review span{color:var(--muted)}.jr-review b{font-size:12px}.jr-review button{background:none;border:0;color:#0f806c;font-weight:700;font-size:11px}
.jr-summary-row{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid #e0e9e3;border-radius:7px;overflow:hidden;background:#fff;margin-bottom:21px}.jr-summary-row>div{padding:20px 24px;border-right:1px solid #e6eee8;display:flex;flex-direction:column}.jr-summary-row>div:last-child{border-right:0}.jr-summary-row span{font-size:9px;letter-spacing:.12em;font-weight:800;color:#718780}.jr-summary-row strong{font-family:Georgia,serif;font-size:24px;font-weight:500;margin-top:6px;white-space:nowrap}.jr-summary-row small{font-size:10px;color:#7a8981;margin-top:4px}.jr-summary-row button{align-self:flex-start;background:none;border:0;padding:0;font-size:10px;font-weight:800;color:var(--green);margin-top:6px;display:flex;align-items:center;gap:4px}.jr-target-box.late strong{color:#bf6843}.jr-map-card{background:#fff;border:1px solid #dce8e1;border-radius:8px;overflow:hidden;box-shadow:0 12px 30px rgba(7,44,36,.04)}.jr-map-top{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:25px 25px 21px}.jr-map-top h3{font-size:24px;margin-top:6px}.jr-map-top p{font-size:11px;color:var(--muted);margin-top:5px}.jr-status{display:inline-flex;align-items:center;color:#2d826c;font-weight:700;font-size:9px;letter-spacing:.12em}.jr-map-controls{display:flex;align-items:center;gap:8px}.jr-segment{display:inline-flex;align-items:center;background:#f0f3f1;border-radius:5px;padding:4px;gap:3px}.jr-segment button{background:transparent;border:0;border-radius:4px;color:#6d7c74;font-size:11px;padding:9px 13px;white-space:nowrap}.jr-segment button.active{background:var(--deep);color:#fff}.jr-square-btn{width:38px;height:38px;border:1px solid #dce6df;background:#fff;display:grid;place-items:center;border-radius:4px}.jr-scroll{overflow-x:auto;scrollbar-color:#b8ccc2 #eff4ef;scrollbar-width:thin}.jr-gantt{--jr-months:14;min-width:max(840px,calc(235px + var(--jr-months)*61px));display:grid;grid-template-columns:235px minmax(0,1fr);border-top:1px solid #e6eee9}.jr-gantt-labelhead,.jr-gantt-monthhead{background:#f6f9f6;min-height:54px;border-bottom:1px solid #e6ede8}.jr-gantt-labelhead{display:flex;align-items:center;padding-left:23px;font-size:9px;font-weight:800;letter-spacing:.12em;color:#71847b}.jr-gantt-monthhead{display:grid;grid-template-columns:repeat(var(--jr-months),minmax(0,1fr))}.jr-gantt-monthhead>span{position:relative;font-size:10px;color:#6a7a70;display:flex;align-items:center;justify-content:center;border-left:1px solid #e8efea}.jr-gantt-monthhead b{font-size:10px;font-weight:700}.jr-gantt-monthhead small{position:absolute;top:3px;left:50%;transform:translateX(-50%);font-size:8px;color:#176a5a;font-weight:800}.jr-gantt-monthhead .yearstart b{padding-top:8px}.jr-gantt-row{display:contents}.jr-gantt-label{font-weight:700;font-size:12px;border:0;background:#fff;border-bottom:1px solid #e9efeb;text-align:left;padding:15px 13px 15px 21px;display:flex;align-items:center;gap:10px;white-space:nowrap}.jr-gantt-row.selected .jr-gantt-label{background:#f0f8f3;color:#085d4a}.jr-mini-dot{width:8px;height:8px;border-radius:50%;background:#12816a;display:inline-block;flex-shrink:0}.jr-mini-dot.campus{background:#a4b9b0}.jr-mini-dot.vendor{background:#193b37}.jr-gantt-track{height:54px;display:flex;position:relative;background:#fff;border-bottom:1px solid #e9efeb}.jr-gantt-row.selected .jr-gantt-track{background:#f8fbf9}.jr-gantt-cell{flex:1;border-left:1px solid #e8efea}.jr-gantt-cell.quarter{border-left-color:#cedbd3}.jr-gantt-cell.risky{background:rgba(202,107,65,.065)}.jr-gantt-bar{cursor:grab;touch-action:pan-y;position:absolute;top:17px;height:20px;border:0;border-radius:4px;background:#2d9a83;box-shadow:0 2px 5px rgba(0,0,0,.12);color:#fff;display:flex;align-items:center;justify-content:center;white-space:nowrap;min-width:9px;transition:filter .15s}.jr-gantt-bar:active{cursor:grabbing}.jr-gantt-bar span{font-size:9px;font-weight:800}.jr-gantt-bar.vendor{background:#163b38}.jr-gantt-bar.campus{background:#9aafa5}.jr-gantt-bar.shared{background:#24977d}.jr-gantt-bar.selected{filter:brightness(1.1);outline:2px solid #8ccdb6;outline-offset:2px}.jr-gantt-risklabel{height:48px;padding:16px 20px;font-weight:800;letter-spacing:.09em;color:#708078;font-size:9px}.jr-risk-track{height:48px;display:grid;grid-template-columns:repeat(var(--jr-months),minmax(0,1fr))}.jr-risk-cell{display:flex;justify-content:center;gap:2px;align-items:center;border-left:1px solid #edf1ed}.jr-risk-cell.active{background:#fff5ed}.jr-risk-cell span.high{color:#d97942}.jr-risk-cell span.medium{color:#e0a35d}.jr-map-bottom{display:flex;justify-content:space-between;gap:16px;padding:19px 22px;border-top:1px solid #e5ede8;background:#fbfcfb}.jr-legend{display:flex;align-items:center;gap:20px;flex-wrap:wrap}.jr-legend span{display:flex;align-items:center;gap:8px;font-size:10px;color:#65786d}.jr-legend i{width:9px;height:9px;border-radius:50%;background:#24977d}.jr-legend i.vendor{background:#163b38}.jr-legend i.campus{background:#9aafa5}.jr-legend i.risky{background:#de8b62}.jr-map-note{font-size:10px;color:#8d9c94}.jr-phase-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:0 23px 25px}.jr-phase-tile{min-height:147px;position:relative;background:#f9fbf9;border:1px solid #e1eae4;text-align:left;padding:18px;border-radius:5px;display:flex;align-items:flex-start;flex-direction:column;gap:8px}.jr-phase-tile.selected{border-color:#22876f;background:#eef8f1}.jr-phase-tile strong{font-size:13px}.jr-phase-tile small{font-size:11px;color:#527d68}.jr-phase-tile>span:not(.jr-mini-dot){color:var(--muted);font-size:11px}.jr-phase-tile>svg{position:absolute;right:15px;top:17px}.jr-month-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:0 23px 25px}.jr-month-cards button{display:flex;text-align:left;flex-direction:column;gap:6px;background:#f8fbf9;border:1px solid #e3ece6;border-radius:5px;padding:16px}.jr-month-cards strong{font-size:13px}.jr-month-cards span,.jr-month-cards small{font-size:11px;color:#60766b}.jr-month-cards b{font-size:10px;color:#b2653f;display:flex;gap:4px;align-items:center}
.jr-phase-inspector{display:flex;flex-direction:column;gap:21px;background:#fff;border:1px solid #e2eae5;border-radius:7px;margin-top:18px;padding:23px 26px}.jr-inspector-head{display:flex;gap:20px;justify-content:space-between;align-items:start}.jr-inspector-head h3{font-size:24px;margin:7px 0}.jr-inspector-head p{max-width:770px;font-size:12px;color:#6b7b72}.jr-owner-tag{white-space:nowrap;font-size:10px;background:#ebf7ef;padding:7px 10px;border-radius:4px;color:#168264;font-weight:800}.jr-owner-tag.campus{background:#edf1ed;color:#73877b}.jr-owner-tag.vendor{background:#e8f0e9;color:#244f45}.jr-inspector-footer{border-top:1px solid #e9efeb;padding-top:19px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.jr-inspector-date{display:flex;align-items:center;gap:9px;font-size:12px;font-weight:800}.jr-inspector-footer>div:nth-child(2){display:flex;flex-direction:column;font-size:11px}.jr-inspector-footer small{color:#708078}.jr-inspector-footer strong{font-size:12px}.jr-adjust{display:flex;align-items:center;gap:6px}.jr-adjust>span{font-size:10px;color:var(--muted);margin-right:5px}.jr-adjust button{display:grid;place-items:center;background:#f0f6f2;border:1px solid #deebe2;width:27px;height:27px;border-radius:4px}
.jr-staff-layout{display:grid;grid-template-columns:minmax(0,1fr) 270px;gap:19px}.jr-staff-main,.jr-staff-card{border:1px solid #e2e9e3;border-radius:7px;background:#fff}.jr-staff-main{padding:21px 22px;min-width:0}.jr-staff-top{display:flex;gap:10px;justify-content:space-between;align-items:center;margin-bottom:18px}.jr-staff-top strong{display:block;font-size:13px}.jr-staff-top span{display:block;font-size:11px;color:#74847b;margin-top:5px}.jr-staff-scale{white-space:nowrap;display:flex!important;align-items:center;gap:5px;font-size:9px!important}.jr-staff-scale i{width:9px;height:9px;border-radius:1px;background:#eef5ee}.jr-staff-scale i:nth-of-type(2){background:#80bfa6}.jr-staff-scale i:nth-of-type(3){background:#ce8054}.jr-heatmap{--jr-months:14;min-width:max(720px,calc(150px + var(--jr-months)*43px));display:grid;grid-template-columns:148px minmax(0,1fr);gap:4px}.jr-heat-left{font-size:11px;font-weight:700;align-self:center;padding:0 8px;white-space:nowrap}.jr-heat-header{color:#809086;font-size:9px}.jr-heat-months{display:grid;grid-template-columns:repeat(var(--jr-months),1fr);gap:3px}.jr-heat-months span{font-size:9px;color:#84968a;text-align:center}.jr-heat-row{display:contents}.jr-heat-cells{display:grid;grid-template-columns:repeat(var(--jr-months),1fr);gap:3px;padding:3px 0}.jr-heat-cell{height:40px;border:0;border-radius:3px;display:grid;place-items:center;color:#3d6e5b;min-width:0;background:#edf6ef}.jr-heat-cell span{opacity:0;font-size:9px;font-weight:800}.jr-heat-cell:hover span,.jr-heat-cell.selected span{opacity:1}.jr-heat-cell.low{background:#ebf4eb}.jr-heat-cell.med{background:#cce9d8}.jr-heat-cell.high{background:#80bca2}.jr-heat-cell.veryhigh{background:#368d74;color:#fff}.jr-heat-cell.over{background:#d79a70;color:#fff}.jr-heat-cell.selected{outline:2px solid #123e36;outline-offset:1px}.jr-staff-aside{display:flex;flex-direction:column;gap:15px}.jr-staff-card{padding:21px;display:flex;align-items:flex-start;flex-direction:column}.jr-staff-card>svg{color:#0b6253;margin-bottom:15px}.jr-staff-card>span{font-size:9px;letter-spacing:.1em;color:#547b69;font-weight:800}.jr-staff-card>strong{font-family:Georgia,serif;font-size:24px;line-height:1.2;font-weight:500;margin:12px 0}.jr-staff-card p{font-size:11px;color:#77877e;line-height:1.6}.jr-staff-card-soft{background:#f6faf7;flex:1}.jr-staff-card button{padding:0;border:0;background:transparent;color:#127a66;display:flex;align-items:center;gap:8px;font-size:11px;font-weight:800;margin-top:16px}.jr-load-detail{margin-top:18px;display:flex;align-items:center;justify-content:space-between;gap:15px;padding:19px 23px;background:#f4faf5;border:1px solid #d5e8da;border-radius:6px;position:relative}.jr-load-detail h3{font-size:21px;margin:3px 0}.jr-load-detail p{color:#647b6d;font-size:11px}.jr-load-numbers{display:flex;gap:30px;padding-right:20px}.jr-load-numbers strong{display:flex;flex-direction:column;font-size:23px;white-space:nowrap}.jr-load-numbers small{font-weight:500;font-size:10px;color:#6d8376}.jr-load-numbers .jr-red{color:#bf6543}.jr-load-detail>button{position:absolute;top:10px;right:9px;background:transparent;border:0}.jr-method-note{display:flex;gap:8px;align-items:flex-start;font-size:13px;color:#011522;margin-top:18px;line-height:1.6}
.jr-ownership-grid{display:grid;grid-template-columns:1.35fr .85fr;gap:20px}.jr-owners-panel,.jr-risk-panel{border:1px solid #dfe9e2;background:#fff;padding:23px 24px;border-radius:7px;min-width:0}.jr-panel-title h3{font-size:23px}.jr-panel-title p{font-size:11px;color:#708477;margin-top:5px;margin-bottom:22px}.jr-owner-head{display:grid;grid-template-columns:1.4fr 1fr;gap:10px;padding:11px 8px;background:#f3f8f4;font-size:9px;font-weight:800;letter-spacing:.08em;color:#718375}.jr-owner-table>label{display:grid;grid-template-columns:1.4fr 1fr;align-items:center;gap:10px;border-bottom:1px solid #e9efea;padding:10px 8px}.jr-owner-table>label>span{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:650}.jr-owner-table>label>span svg{color:#1d8065}.jr-owner-table select{width:100%;max-width:206px;justify-self:end;border:1px solid #e1e9e3;padding:8px 7px;background:#f9fbf8;border-radius:4px;font-size:10px}.jr-fineprint{margin-top:15px;color:#849287;font-size:10px;line-height:1.6}.jr-risks{display:flex;flex-direction:column;gap:0}.jr-risk-item{display:grid;grid-template-columns:27px 1fr auto;gap:9px;align-items:start;text-align:left;border:0;border-bottom:1px solid #e8eee9;background:#fff;padding:12px 2px}.jr-risk-icon{color:#cd7447;padding-top:3px}.jr-risk-item strong{font-size:12px;color:#ad5734}.jr-risk-item small{font-size:10px;color:#4a6657;display:block;margin-top:3px;font-weight:700}.jr-risk-item em{font-style:normal;color:#7b8b81;font-size:10px;display:block;line-height:1.5;margin-top:3px}.jr-risk-item b{font-size:9px;color:#bd673e;background:#fff0e9;border-radius:4px;padding:4px 6px}.jr-risk-item b.medium{background:#fff6e8;color:#a07836}.jr-risk-edit{display:flex;align-items:center;gap:8px;border:0;background:transparent;color:var(--green);font-size:11px;font-weight:800;margin-top:15px}.jr-empty{padding:20px;font-size:12px;color:var(--muted)}
.jr-brief{padding:73px 0;background:var(--deep);color:#fff}.jr-brief-grid{display:grid;grid-template-columns:44% 56%;gap:15px;align-items:center}.jr-brief h2{font-size:clamp(33px,3.2vw,48px);line-height:1.12;margin:16px 0}.jr-brief-copy>p{font-size:13px;line-height:1.8;color:#bed6cc;max-width:505px}.jr-brief-actions{display:flex;align-items:center;gap:18px;margin-top:30px;flex-wrap:wrap}.jr-brief-copy-btn{border:0;background:transparent;color:#cae5d9;display:flex;gap:7px;align-items:center;font-size:11px}.jr-slide-area{min-width:0;padding:0 9px}.jr-slide-tabs{display:flex;gap:14px;overflow-x:auto;border-bottom:1px solid #365451;margin-bottom:15px}.jr-slide-tabs button{white-space:nowrap;border:0;border-bottom:2px solid transparent;background:none;color:#a8c0b7;padding:12px 2px;font-size:10px}.jr-slide-tabs button.active{border-bottom-color:#aee6d2;color:#fff}.jr-slide-previews{display:flex;gap:7px;overflow-x:auto;padding:10px 0 14px}.jr-mini-slide{flex:0 0 148px;height:193px;padding:14px 10px;border:2px solid transparent;border-radius:2px;display:flex;align-items:flex-start;flex-direction:column;gap:7px;text-align:left;background:#fbfcfa;color:#132b27;overflow:hidden}.jr-mini-slide.active{border-color:#9be6c9;transform:translateY(-4px)}.jr-mini-slide small{font-size:8px;color:#598b73}.jr-mini-slide strong{font-family:Georgia,serif;font-size:16px;font-weight:500;line-height:1.16}.jr-mini-slide>span{font-size:9px;color:#66786f}.jr-slide-controls{display:flex;align-items:center;justify-content:center;gap:15px;color:#bad7ca;font-size:11px}.jr-slide-controls button{display:grid;place-items:center;background:transparent;color:#fff;border:1px solid #45665b;padding:6px;border-radius:4px}
.jr-faq-layout{display:grid;grid-template-columns:.82fr 1.18fr;gap:85px}.jr-faq h2{font-size:clamp(32px,3vw,46px);line-height:1.1;margin:18px 0}.jr-faq-layout>div:first-child>p{font-size:13px;line-height:1.75;color:var(--muted);max-width:350px}.jr-inline-link{color:#0f7767!important;font-size:12px;font-weight:800;margin-top:22px;display:flex;gap:8px;align-items:center}.jr-faq-item{border-bottom:1px solid #e1e9e3}.jr-faq-item:first-child{border-top:1px solid #e1e9e3}.jr-faq-item>button{width:100%;display:flex;align-items:center;justify-content:space-between;gap:20px;text-align:left;border:0;background:transparent;padding:17px 0;color:#253b33}.jr-faq-item button span{display:flex;gap:19px;align-items:center;font-size:12px;font-weight:700}.jr-faq-item button small{font-size:10px;color:#8f9f95}.jr-faq-item p{font-size:12px;color:#627a6b;line-height:1.75;padding:0 29px 21px}
.jr-final{background:#082525;border-top:1px solid #22403c;color:#fff;padding:47px 0}.jr-final-inner{display:flex;align-items:center;justify-content:space-between;gap:30px}.jr-final h2{font-size:35px;margin:7px 0 6px}.jr-final p{color:#bad3c7;font-size:12px}.jr-final-inner>div:last-child{display:flex;gap:11px;flex-wrap:wrap}.jr-toast{position:fixed;z-index:100;bottom:24px;right:24px;background:#0a3733;color:#e0ffee;display:flex;align-items:center;gap:9px;padding:15px 20px;border-radius:6px;box-shadow:0 13px 34px rgba(0,0,0,.25);font-size:12px}
.jr [data-reveal]{opacity:1}.jr [data-reveal].jr-visible{animation:jrRise .52s ease both}@keyframes jrRise{from{opacity:0;transform:translateY(11px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:1180px){ .jr-wrap{width:min(1340px,calc(100% - 72px))}.jr-hero-grid{grid-template-columns:48% 52%}.jr-hero-visual{width:120%;transform:scale(.88) perspective(1200px) rotateY(-5deg);transform-origin:left center}.jr-proof-grid{grid-template-columns:1.7fr repeat(4,1fr)}.jr-form-card{grid-template-columns:minmax(0,1fr) 200px}.jr-builder-layout{grid-template-columns:200px minmax(0,1fr)}.jr-brief-grid{grid-template-columns:40% 60%}}
@media(max-width:900px){.jr-wrap{width:calc(100% - 38px)}.jr-hero-grid{grid-template-columns:1fr;min-height:0;padding:60px 0}.jr-hero-copy{padding:0}.jr-hero-visual{width:96%;margin:30px 0 0 5px;transform:none}.jr-hero h1{font-size:clamp(50px,7vw,68px)}.jr-proof-grid{grid-template-columns:repeat(2,1fr);gap:12px}.jr-proof-heading{grid-column:1/-1}.jr-builder-layout{grid-template-columns:1fr}.jr-builder-steps{display:grid;grid-template-columns:repeat(5,1fr);gap:5px}.jr-step{padding:10px 7px;gap:6px;flex-direction:column;border-left:0;border-top:2px solid #e1ece3}.jr-step.active{border-left:0;border-top-color:#178a76}.jr-step small{display:none}.jr-step b{font-size:10px}.jr-summary-row{grid-template-columns:repeat(2,1fr)}.jr-summary-row>div:nth-child(2){border-right:0}.jr-summary-row>div:nth-child(-n+2){border-bottom:1px solid #e5ede8}.jr-staff-layout,.jr-ownership-grid{grid-template-columns:1fr}.jr-staff-aside{flex-direction:row}.jr-staff-card{flex:1}.jr-faq-layout{gap:40px}.jr-brief-grid{grid-template-columns:1fr}.jr-brief-copy{max-width:640px}.jr-final-inner{flex-direction:column;align-items:flex-start}.jr-brief-actions{margin-bottom:30px}.jr-slide-area{padding:0}}
@media(max-width:610px){.jr-section{padding:62px 0}.jr-wrap{width:calc(100% - 32px)}.jr-logo{width:151px;height:34px}.jr-hero-grid{padding:54px 0}.jr-hero h1{font-size:clamp(44px,11vw,58px)}.jr-hero-copy>p{font-size:14px}.jr-hero-actions{flex-direction:column;align-items:stretch}.jr-hero-visual{width:118%;margin-left:-3%;transform:scale(.83);transform-origin:left top;margin-bottom:-60px}.jr-window-body{height:325px}.jr-preview-row{height:27px}.jr-window-side{width:94px}.jr-window-side span{font-size:9px;gap:3px}.jr-window-chart{padding:12px 8px}.jr-window-chart-head strong{font-size:10px}.jr-preview-row>span{min-width:74px;font-size:8px}.jr-preview-months{margin-left:80px}.jr-preview-warnings{padding-left:0;font-size:8px}.jr-proof-grid{gap:4px}.jr-proof-heading h2{font-size:27px}.jr-section-head{display:block}.jr-section-head h2{font-size:35px}.jr-section-head>p{margin-top:15px}.jr-builder-steps{grid-template-columns:repeat(5,1fr)}.jr-step{padding:7px 3px}.jr-step b{font-size:9px}.jr-form-card{grid-template-columns:1fr}.jr-form-context{border:0;border-top:1px solid #e4eee5}.jr-form-context-inner{padding:18px}.jr-why p{margin-bottom:6px}.jr-aside-kpis{display:none}.jr-form-main{padding:23px 18px;min-height:455px}.jr-fields-2{grid-template-columns:1fr}.jr-date-wide{max-width:100%}.jr-form-actions{flex-wrap:wrap}.jr-form-actions .jr-btn{width:100%;order:-1}.jr-summary-row strong{font-size:21px}.jr-summary-row>div{padding:16px 13px}.jr-map-top{display:block;padding:19px 16px}.jr-map-top h3{font-size:22px}.jr-map-controls{margin-top:17px;justify-content:space-between}.jr-segment{width:100%;justify-content:space-between}.jr-segment button{flex:1;padding:8px 7px;font-size:10px}.jr-map-bottom{flex-direction:column}.jr-phase-grid,.jr-month-cards{grid-template-columns:repeat(2,1fr);gap:9px;padding:0 13px 14px}.jr-phase-tile{padding:12px}.jr-phase-inspector{padding:18px}.jr-inspector-head{display:block}.jr-owner-tag{display:inline-flex;margin-top:11px}.jr-inspector-footer{align-items:flex-start;justify-content:flex-start}.jr-staff-main{padding:15px 11px}.jr-staff-top{display:block}.jr-staff-scale{margin-top:10px}.jr-staff-aside{flex-direction:column}.jr-load-detail{display:block}.jr-load-numbers{margin-top:16px;gap:17px;flex-wrap:wrap}.jr-load-numbers strong{font-size:19px}.jr-owner-table>label{grid-template-columns:1fr 135px;gap:5px}.jr-owner-table>label>span{font-size:10px}.jr-owner-table select{font-size:9px}.jr-owners-panel,.jr-risk-panel{padding:17px 12px}.jr-brief h2{font-size:35px}.jr-faq-layout{grid-template-columns:1fr;gap:26px}.jr-faq h2{font-size:33px}.jr-final h2{font-size:31px}.jr-final-inner>div:last-child{flex-direction:column;width:100%}.jr-final-inner .jr-btn{width:100%}}
@media(prefers-reduced-motion:reduce){.jr *, .jr *:before,.jr *:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}



/* ============================================
   PREMIUM ENTERPRISE BASELINE BUILDER
   ============================================ */

.jr-builder {
  background: #ffffff;
  padding: 80px 0 130px;
  color: #011522;
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.jr-builder button,
.jr-builder input,
.jr-builder select {
  font-family: inherit;
}

.jr-wrap{width:min(1340px,calc(100% - 96px));margin-inline:auto}

/* SECTION HEADER */

.jr-builder-header {
  display: block;
  margin-bottom: 56px;
}

.jr-builder-header-copy {
  width: 100%;
  max-width: 1020px;
}

.jr-builder-header .jr-kicker {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: #08766a;
  margin-bottom: 22px;
}

.jr-builder-header h2 {
  margin: 0;
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: clamp(38px, 3.8vw, 58px);
  font-weight: 760;
  letter-spacing: -0.058em;
  line-height: 1.06;
  color: #011522;
}

.jr-builder-header-copy p {
  margin-top: 22px;
  max-width: 880px;
  font-size: 17px;
  line-height: 1.7;
  font-weight: 450;
  color: #011522;
}

/* MAIN BUILDER LAYOUT */

.jr-builder-layout {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 26px;
  align-items: start;
}

/* LEFT NAVIGATION */

.jr-builder-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  border-left: 1px solid #d9e4e2;
}

.jr-step {
  position: relative;
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  align-items: center;
  gap: 16px;
  width: 100%;
  min-height: 104px;
  border: 0;
  border-left: 3px solid transparent;
  background: transparent;
.jr-step {
  position: relative;
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  align-items: center;
  gap: 16px;
  width: 100%;
  min-height: 104px;
  border: 0;
  border-left: 3px solid transparent;
  background: transparent;
  border-radius: 0 4px 4px 0;
  padding: 20px 18px 20px 20px;
  text-align: left;
  transition: background .2s ease;
}
  padding: 20px 18px 20px 20px;
  text-align: left;
  transition: background .2s ease;
}

.jr-step:hover {
  background: #f6faf8;
}

.jr-step.active {
  background: #eaf5f1;
  border-left-color: #006d5e;
}

.jr-step.done {
  border-left-color: transparent;
}

.jr-step-number {
  font-size: 17px;
  font-weight: 780;
  color: #43566d;
  padding: 0;
  min-width: 0;
  letter-spacing: -0.015em;
}

.jr-step-copy {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.jr-step-copy strong {
  display: block;
  font-size: 19px;
  font-weight: 740;
  color: #011522;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.jr-step-copy small {
  display: block;
  margin-top: 8px;
  color: #011522;
  font-size: 15px;
  line-height: 1.5;
  font-weight: 450;
  opacity: .72;
}

/* FORM CONTAINER */

.jr-form-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  background: #fff;
  border: 1px solid #dce5e6;
  border-radius: 6px;
  min-height: 620px;
  overflow: hidden;
}

.jr-form-main {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 40px 38px 30px;
}

.jr-form-eyebrow {
  display: block;
  font-size: 12px;
  font-weight: 800;
  color: #087769;
  letter-spacing: .16em;
  margin-bottom: 12px;
}

.jr-builder .jr-form-heading h3 {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 32px;
  font-weight: 760;
  line-height: 1.15;
  letter-spacing: -.05em;
  color: #011522;
}

.jr-form-heading p {
  font-size: 15px;
  line-height: 1.65;
  color: #011522;
  margin: 12px 0 22px;
  font-weight: 450;
}

/* MODULE CARDS */

.jr-form-sub {
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 750;
  color: #011522;
  letter-spacing: -0.01em;
}

.jr-module-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.jr-module-option {
  width: 100%;
  min-height: 72px;
  padding: 16px 15px;
  border: 1px solid #e0e7ec;
  border-radius: 9px;
  background: #ffffff;
  display: flex;
  align-items: center;
  gap: 13px;
  text-align: left;
  transition:
    background .17s ease,
    border-color .17s ease,
    box-shadow .17s ease;
}

.jr-module-option:hover {
  border-color: #94cabb;
  background: #fafdfb;
}

.jr-module-option.selected {
  border-color: #aedbcf;
  background: #edf8f4;
  box-shadow: 0 0 0 1px rgba(0, 103, 86, .03);
}

.jr-module-icon {
  color: #0b5854;
  flex-shrink: 0;
}

.jr-module-option > span:nth-child(2) {
  flex: 1;
  min-width: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  color: #011522;
  letter-spacing: -0.01em;
}

.jr-module-check {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border: 1.5px solid #c4ced8;
  border-radius: 5px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.jr-module-option.selected .jr-module-check {
  background: #006153;
  border-color: #006153;
  color: #fff;
}

/* FORM DIVIDER */

.jr-scope-divider {
  width: 100%;
  height: 1px;
  background: #e4eaf0;
  margin: 34px 0 28px;
}

/* INPUTS */

.jr-scope-fields {
  gap: 22px;
}

.jr-builder .jr-field {
  gap: 11px;
}

.jr-builder .jr-field > span {
  font-size: 14px;
  font-weight: 700;
  color: #011522;
  letter-spacing: -0.005em;
}

.jr-field-help {
  color: #8ba0aa;
}

/* Why-we-ask tooltip */

.jr-help-dot {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
  color: #8ba0aa;
  cursor: help;
  vertical-align: middle;
}

.jr-help-dot:hover,
.jr-help-dot:focus-visible {
  color: #08776a;
}

.jr-help-dot .jr-help-tip {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(-4px);

  width: 300px;
  padding: 12px 14px;

  background: #011522;
  color: #f5fbf8;

  font-size: 12px;
  font-weight: 450;
  line-height: 1.6;
  letter-spacing: -0.005em;
  text-align: left;

  border-radius: 6px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.16s ease, transform 0.16s ease;
  z-index: 50;
}

.jr-help-dot .jr-help-tip::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-bottom-color: #011522;
}

.jr-help-dot:hover .jr-help-tip,
.jr-help-dot:focus-visible .jr-help-tip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
  pointer-events: auto;
}

/* Keep the "Modules you are planning to implement" label aligned */

.jr-form-sub {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.jr-builder .jr-field input,
.jr-builder .jr-field select {
  height: 52px;
  min-width: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #d9e2e9;
  border-radius: 8px;
  padding: 0 16px;
  color: #011522;
  font-size: 14px;
  font-weight: 550;
  transition: border-color .18s ease, box-shadow .18s ease;
}

.jr-builder .jr-field input:focus,
.jr-builder .jr-field select:focus {
  outline: none;
  border-color: #00826c;
  box-shadow: 0 0 0 3px rgba(0, 130, 108, .09);
}

 

/* FORM FOOTER */

.jr-form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-top: auto;
  padding-top: 40px;
}

.jr-form-actions .jr-text-btn {
  border: 0;
  background: none;
  color: #011522;
  font-size: 14px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.jr-form-actions .jr-btn-dark {
  border-radius: 7px;
  background: #167273;
  padding: 0 24px;
  min-height: 52px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.005em;
}

.jr-form-actions .jr-btn-dark:hover {
  background: #1a8586;
}

/* RIGHT CONTEXT PANEL */

.jr-form-context {
  min-width: 0;
  background: #fafbfa;
  border-left: 1px solid #e3eeeb;
}

.jr-form-context-inner {
  display: flex;
  flex-direction: column;
  gap: 0;
  height: 100%;
  padding: 32px 26px 28px;
}

.jr-why {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.jr-why-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #e4f3ed;
  color: #075f54;
  border-radius: 50%;
}

.jr-why > div:last-child {
  min-width: 0;
}

.jr-why strong {
  display: block;
  font-size: 15px;
  font-weight: 750;
  color: #011522;
  line-height: 1.4;
  padding-top: 2px;
  letter-spacing: -0.01em;
}

.jr-why p {
  font-size: 13px;
  line-height: 1.75;
  margin-top: 10px;
  color: #011522;
  font-weight: 450;
}

.jr-context-divider {
  height: 1px;
  width: 100%;
  background: #dce9e5;
  margin: 28px 0;
}

/* LIVE MODEL PANEL */

.jr-aside-kpis {
  display: block;
  margin: 0;
  padding: 28px 24px;
  background: #e7f5f0;
  border: 0;
  border-radius: 4px;
}

.jr-aside-label {
  display: block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .16em;
  color: #087567;
  margin-bottom: 26px;
}

.jr-kpi-number {
  display: flex;
  align-items: baseline;
  gap: 10px;
  white-space: nowrap;
}

.jr-kpi-number strong {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: clamp(38px, 3vw, 50px);
  font-weight: 780;
  letter-spacing: -.06em;
  line-height: 1.05;
  color: #011522;
  margin: 0;
}

.jr-kpi-number span {
  font-size: 15px;
  font-weight: 550;
  color: #011522;
  opacity: .72;
}

.jr-kpi-block p {
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.55;
  color: #011522;
  font-weight: 500;
  opacity: 1;
}

.jr-kpi-divider {
  height: 1px;
  background: #bfded2;
  margin: 24px 0 22px;
}

.jr-aside-foot {
  margin-top: auto;
  padding-top: 26px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 13px;
  line-height: 1.7;
  color: #011522;
  font-weight: 450;
  opacity: .72;
}

.jr-aside-foot svg {
  color: #118574;
  margin-top: 1px;
}

/* OTHER WIZARD STEPS */

.jr-builder .jr-cap-fields > label {
  padding: 14px 0;
}

.jr-builder .jr-cap-fields b {
  font-size: 15px;
  font-weight: 700;
  color: #011522;
}

.jr-builder .jr-cap-fields small {
  font-size: 13px;
  color: #011522;

  margin-top: 3px;
}

.jr-builder .jr-review > div {
  padding: 18px 0;
  font-size: 14px;
}

.jr-builder .jr-review span {
  color: #011522;
  opacity: .7;
  font-weight: 500;
}

.jr-builder .jr-review b {
  font-size: 14px;
  font-weight: 700;
  color: #011522;
}

.jr-builder .jr-review button {
  font-size: 13px;
  font-weight: 700;
}

.jr-builder .jr-monthpick button {
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 0;
}

.jr-builder .jr-checkline {
  line-height: 1.6;
  font-size: 14px;
  font-weight: 550;
}

/* RESPONSIVE */

@media (max-width: 1280px) {
  .jr-builder-layout {
    grid-template-columns: 250px minmax(0, 1fr);
    gap: 20px;
  }

   .jr-form-card {
    grid-template-columns: minmax(0, 1fr) 300px;
  }
  }

  .jr-form-main {
    padding: 34px 30px;
  }

  .jr-module-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 1050px) {
  .jr-builder-header {
    margin-bottom: 36px;
  }

  .jr-builder-layout {
    grid-template-columns: 1fr;
  }

  .jr-builder-steps {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    border-left: 0;
    gap: 8px;
  }

  .jr-step {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    min-height: 108px;
    border-left: 0;
    border-top: 3px solid transparent;
    border-radius: 9px;
    padding: 14px;
  }

  .jr-step.active {
    border-left: 0;
    border-top-color: #006d5e;
  }

  .jr-step-copy small {
    display: none;
  }

  .jr-form-card {
    grid-template-columns: minmax(0, 1fr) 260px;
  }

  .jr-module-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .jr-builder {
    padding: 72px 0 82px;
  }

  .jr-builder .jr-wrap {
    width: calc(100% - 36px);
  }

  .jr-builder-header {
    margin-bottom: 34px;
  }

  .jr-builder-header h2 {
    font-size: clamp(32px, 6.4vw, 44px);
  }

  .jr-builder-header-copy p {
    font-size: 15px;
  }

  .jr-builder-steps {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .jr-step {
    min-height: 72px;
    align-items: center;
    justify-content: center;
    padding: 10px 5px;
  }

  .jr-step-number {
    font-size: 12px;
  }

  .jr-step-copy {
    display: none;
  }

  .jr-form-card {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .jr-form-main {
    padding: 28px 24px;
    min-height: 0;
  }

  .jr-builder .jr-form-heading h3 {
    font-size: 27px;
  }

  .jr-module-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .jr-form-context {
    border-left: 0;
    border-top: 1px solid #e3eeeb;
  }

  .jr-form-context-inner {
    padding: 26px;
  }

  .jr-aside-kpis {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 22px;
    align-items: start;
  }

  .jr-aside-label {
    grid-column: 1 / -1;
    margin-bottom: 10px;
  }

  .jr-kpi-divider {
    display: none;
  }

  .jr-aside-foot {
    margin-top: 18px;
  }
}

@media (max-width: 480px) {
  .jr-builder-header h2 {
    font-size: 34px;
  }

  .jr-module-grid {
    grid-template-columns: 1fr;
  }

  .jr-fields-2 {
    grid-template-columns: 1fr;
  }

  .jr-date-wide {
    max-width: 100%;
  }

  .jr-form-actions {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 22px;
  }

  .jr-form-actions .jr-btn-dark {
    width: 100%;
  }

  .jr-form-actions .jr-text-btn {
    justify-content: center;
  }

  .jr-aside-kpis {
    grid-template-columns: 1fr 1fr;
    padding: 22px;
  }

  .jr-kpi-number {
    gap: 6px;
  }

  .jr-kpi-number strong {
    font-size: 32px;
  }

  .jr-kpi-number span {
    font-size: 12px;
  }
}


/* =========================================
   PREMIUM DARK JENZABAR IMPLEMENTATION PLAN
   Applies only to section #map
   ========================================= */

/* 01 — SECTION BACKGROUND */

#map {
  --map-line: rgba(177, 225, 211, 0.11);
  --map-muted: #91aaa4;
  --map-mint: #37d3a5;

  background: #041b1c;
  background-image: radial-gradient(
    ellipse at 70% 30%,
    #0c2928 0%,
    #061e1f 48%,
    #031516 100%
  );

  color: #f4faf7;
  padding-top: 105px;
  padding-bottom: 110px;
}

/* 02 — SECTION HEADING */

#map .jr-section-head {
  margin-bottom: 30px;
}

#map .jr-section-head .jr-kicker {
  color: #42d7ad;
  letter-spacing: 0.15em;
}

#map .jr-section-head h2 {
  color: #f8fcfa;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 400;
  letter-spacing: -0.046em;
  line-height: 1.1;
}

#map .jr-section-head > p {
  color: #fafafa;
  font-size: 13px;
  line-height: 1.85;
}

/* 03 — FOUR KPI CARDS */

#map .jr-summary-row {
  background: rgba(10, 32, 32, 0.9);
  border: 1px solid var(--map-line);
  border-radius: 12px;
  overflow: visible;
  margin-bottom: 22px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.09);
}

#map .jr-summary-row > div {
  padding: 23px 25px;
  background: transparent;
  border-right: 1px solid var(--map-line);
  min-height: 114px;
}

#map .jr-summary-row > div:last-child {
  border-right: 0;
}

#map .jr-summary-row span {
  color: #87aba3;
  font-size: 9px;
  font-weight: 750;
  letter-spacing: 0.13em;
}

#map .jr-summary-row strong {
  color: #f6fcf9;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(19px, 1.85vw, 25px);
  font-weight: 400;
  letter-spacing: -0.035em;
  margin-top: 10px;
}

#map .jr-summary-row small {
  color: #91aaa4;
  font-size: 10px;
  margin-top: 6px;
}

#map .jr-summary-row button {
  color: #48dfb1;
  font-size: 10px;
  font-weight: 700;
  margin-top: 8px;
}

#map .jr-summary-row button:hover {
  color: #b5f6de;
}

#map .jr-target-box.late strong {
  color: #f0aa7e;
}

/* 04 — MAIN TIMELINE CONTAINER */

#map .jr-map-card {
  background: #071d1e;
  border: 1px solid var(--map-line);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.12);
}

/* TIMELINE HEADER */

#map .jr-map-top {
  background: #092021;
  border-bottom: 1px solid var(--map-line);
  padding: 25px 25px 23px;
}

#map .jr-status {
  color: #43dfaf;
  font-size: 10px;
  letter-spacing: 0.11em;
}

#map .jr-status span {
  background: #27dba4;
  box-shadow: 0 0 9px rgba(39, 219, 164, 0.25);
}

#map .jr-map-top h3 {
  color: #f5fcf8;
  font-size: 25px;
  font-weight: 400;
  letter-spacing: -0.035em;
  margin-top: 7px;
}

#map .jr-map-top p {
  color: #92aaa5;
  font-size: 11px;
  margin-top: 7px;
}

/* TIMELINE / PHASES / MONTH DETAIL TABS */

#map .jr-segment {
  background: #112b2b;
  border: 1px solid rgba(160, 210, 195, 0.08);
  border-radius: 8px;
  padding: 4px;
  gap: 3px;
}

#map .jr-segment button {
  color: #a1b8b1;
  background: transparent;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  padding: 9px 15px;
}

#map .jr-segment button:hover {
  color: #ffffff;
}

#map .jr-segment button.active {
  background: #35d5a5;
  color: #052c26;
  font-weight: 750;
  box-shadow: 0 2px 9px rgba(20, 202, 147, 0.12);
}

/* RESET BUTTON */

#map .jr-square-btn {
  width: 39px;
  height: 39px;
  border: 1px solid rgba(170, 222, 203, 0.17);
  background: #0b2525;
  color: #d8eee6;
  border-radius: 7px;
}

#map .jr-square-btn:hover {
  background: #153c36;
  border-color: #37d3a5;
}

/* 05 — GANTT CHART STRUCTURE */

#map .jr-scroll {
  scrollbar-width: thin;
  scrollbar-color: #2a5b50 #071d1e;
}

#map .jr-gantt {
  grid-template-columns: 205px minmax(0, 1fr);

  min-width: max(
    840px,
    calc(205px + var(--jr-months) * 50px)
  );

  background: #071d1e;
  border-top: 0;
}

/* MONTH HEADERS */

#map .jr-gantt-labelhead,
#map .jr-gantt-monthhead {
  background: #102929;
  min-height: 51px;
  border-bottom: 1px solid var(--map-line);
}

#map .jr-gantt-labelhead {
  padding-left: 20px;
  color: #8eaaa1;
  font-size: 9px;
  letter-spacing: 0.12em;
}

#map .jr-gantt-monthhead > span {
  color: #b3cac1;
  border-left: 1px solid rgba(171, 216, 197, 0.08);
  font-size: 10px;
}

#map .jr-gantt-monthhead b {
  color: #c4d9d0;
  font-size: 10px;
  font-weight: 600;
}

#map .jr-gantt-monthhead small {
  color: #4de0b5;
  font-size: 8px;
}

/* PROJECT PHASE LABELS */

#map .jr-gantt-label {
  height: 44px;
  min-height: 44px;
  padding: 0 13px 0 19px;

  background: #081e1f;
  border-bottom: 1px solid rgba(175, 218, 204, 0.08);

  color: #dceae5;
  font-size: 11px;
  font-weight: 550;
  gap: 11px;

  transition: background 0.18s ease;
}

#map .jr-gantt-label:hover {
  background: #11302e;
}

#map .jr-mini-dot {
  width: 7px;
  height: 7px;
  background: #21c99a;
}

#map .jr-mini-dot.vendor {
  background: #18816c;
}

#map .jr-mini-dot.campus {
  background: #8cbdae;
}

#map .jr-mini-dot.shared {
  background: #25cfa0;
}

/* THE GRID — THINNER & CLEANER */

#map .jr-gantt-track {
  height: 44px;
  background: #081e1f;
  border-bottom: 1px solid rgba(175, 218, 204, 0.08);
}

#map .jr-gantt-cell {
  border-left: 1px solid rgba(159, 210, 194, 0.075);
}

#map .jr-gantt-cell.quarter {
  border-left-color: rgba(176, 223, 205, 0.17);
}

#map .jr-gantt-cell.risky {
  background: rgba(226, 147, 64, 0.10);
}

/* ACTIVE / SELECTED PHASE */

#map .jr-gantt-row.selected .jr-gantt-label {
  background: #10342f;
  color: #63e7be;
  box-shadow: inset 3px 0 0 #35d5a5;
}

#map .jr-gantt-row.selected .jr-gantt-track {
  background: rgba(26, 127, 103, 0.17);
}

/* 06 — THIN PREMIUM TIMELINE BARS */

#map .jr-gantt-bar {
  top: 16px;
  height: 12px;
  min-height: 12px;

  border: 0;
  border-radius: 4px;

  background: linear-gradient(
    90deg,
    #22af88 0%,
    #36c69a 100%
  );

  color: #ffffff;

  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);

  cursor: grab;

  transition:
    filter 0.18s ease,
    box-shadow 0.18s ease;
}

/* Shared workstreams */

#map .jr-gantt-bar.shared {
  background: linear-gradient(
    90deg,
    #229f81,
    #48caa1
  );
}

/* Jenzabar-led workstreams */

#map .jr-gantt-bar.vendor {
  background: linear-gradient(
    90deg,
    #117d68,
    #269f85
  );
}

/* Institution-led workstreams */

#map .jr-gantt-bar.campus {
  background: linear-gradient(
    90deg,
    #79ae9e,
    #a3d3bb
  );

  color: #06372d;
}

/* Small duration labels */

#map .jr-gantt-bar span {
  color: inherit;
  font-size: 8px;
  line-height: 1;
  font-weight: 750;
  letter-spacing: 0.01em;
  position: relative;
  z-index: 1;
}

/* Larger invisible hit area for mouse dragging */

#map .jr-gantt-bar::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -10px;
  bottom: -10px;
}

#map .jr-gantt-bar:hover {
  filter: brightness(1.17);
  box-shadow: 0 2px 9px rgba(42, 220, 164, 0.18);
}

#map .jr-gantt-bar:active {
  cursor: grabbing;
}

/* Selected bar */

#map .jr-gantt-bar.selected {
  outline: 1px solid #a5f5d8;
  outline-offset: 3px;
  filter: none;

  box-shadow:
    0 0 0 2px rgba(40, 206, 155, 0.12),
    0 2px 8px rgba(26, 207, 150, 0.18);
}

/* 07 — CAMPUS RISK WINDOWS */

#map .jr-gantt-risklabel {
  height: 43px;
  padding: 14px 19px;
  background: #0a2222;
  border-bottom: 1px solid var(--map-line);
  color: #88a39b;
  font-size: 9px;
}

#map .jr-risk-track {
  height: 43px;
  background: #0a2222;
  border-bottom: 1px solid var(--map-line);
}

#map .jr-risk-cell {
  border-left: 1px solid rgba(170, 219, 200, 0.075);
}

#map .jr-risk-cell.active {
  background: rgba(224, 146, 65, 0.14);
}

#map .jr-risk-cell span.high {
  color: #ffa45c;
}

#map .jr-risk-cell span.medium {
  color: #e7b16d;
}

/* 08 — LEGEND AND CHART FOOTER */

#map .jr-map-bottom {
  background: #092122;
  border-top: 1px solid var(--map-line);
  padding: 17px 23px;
  gap: 18px;
}

#map .jr-legend {
  gap: 20px;
}

#map .jr-legend span {
  color: #a4bcb4;
  font-size: 10px;
  gap: 7px;
}

#map .jr-legend i {
  width: 8px;
  height: 8px;
}

#map .jr-legend i.vendor {
  background: #117d68;
}

#map .jr-legend i.campus {
  background: #95c5b2;
}

#map .jr-legend i.shared {
  background: #35d5a5;
}

#map .jr-legend i.risky {
  background: #ed9751;
}

#map .jr-map-note {
  color: #78938a;
  font-size: 9px;
}

/* 09 — SELECTED PROJECT PHASE PANEL */

 #map .jr-phase-inspector {
  background: #092122;
  border: 1px solid var(--map-line);
  border-radius: 12px;
  padding: 26px 27px;
  margin-top: 0;
  gap: 22px;

  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.08);
}

/* PHASE MODAL OVERLAY */

.jr-phase-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;

  background: rgba(0, 12, 14, 0.88);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  animation: jrPhaseFade 0.18s ease both;
}

@keyframes jrPhaseFade {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.jr-phase-modal {
  position: relative;

  width: min(960px, 100%);
  max-height: calc(100dvh - 48px);

  overflow-y: auto;

  border-radius: 14px;

  animation: jrPhaseRise 0.24s cubic-bezier(0.2, 0.8, 0.2, 1) both;

  /* DARK THEME */
  background: #092122;
  border: 1px solid rgba(177, 225, 211, 0.14);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55);
}

/* THE INSPECTOR PANEL INSIDE THE MODAL */

.jr-phase-modal .jr-phase-inspector {
  background: transparent;
  border: 0;
  border-radius: 0;
  padding: 30px 32px;
  margin: 0;
  gap: 22px;
  box-shadow: none;
}

/* EYEBROW */

.jr-phase-modal .jr-inspector-head .jr-kicker {
  color: #42d7ad;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.15em;
}

/* PHASE NAME */

.jr-phase-modal .jr-inspector-head h3 {
  font-family: Georgia, "Times New Roman", serif;
  color: #f9fcfa;
  font-size: 26px;
  font-weight: 400;
  letter-spacing: -0.03em;
  margin: 10px 0 8px;
}

/* DESCRIPTION */

.jr-phase-modal .jr-inspector-head p {
  color: #a3b9b2;
  font-size: 13px;
  line-height: 1.7;
  max-width: 700px;
}

/* SHARED (PROPOSED) TAG */

.jr-phase-modal .jr-owner-tag {
  background: rgba(47, 206, 158, 0.13);
  border: 1px solid rgba(80, 223, 178, 0.12);
  color: #84eac4;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 10px;
  font-weight: 700;
}

.jr-phase-modal .jr-owner-tag.campus,
.jr-phase-modal .jr-owner-tag.vendor {
  background: #153a34;
  color: #a5d6c2;
}

/* FOOTER DIVIDER */

.jr-phase-modal .jr-inspector-footer {
  border-top: 1px solid rgba(177, 225, 211, 0.11);
  padding-top: 22px;
  gap: 20px;
}

/* DATE */

.jr-phase-modal .jr-inspector-date {
  color: #e5f3ec;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: -0.01em;
}

.jr-phase-modal .jr-inspector-date svg {
  color: #47d1a5;
}

/* DELIVERABLE LABEL + VALUE */

.jr-phase-modal .jr-inspector-footer small {
  color: #77998e;
  font-size: 10px;
  font-weight: 500;
}

.jr-phase-modal .jr-inspector-footer strong {
  color: #edf8f2;
  font-size: 13px;
  font-weight: 650;
}

/* ADJUST CONTROLS */

.jr-phase-modal .jr-adjust > span {
  color: #a2bcb2;
  font-size: 11px;
  margin-right: 7px;
}

.jr-phase-modal .jr-adjust button {
  width: 29px;
  height: 29px;
  background: #173231;
  border: 1px solid rgba(174, 225, 206, 0.16);
  border-radius: 6px;
  color: #e7f8ef;
}

.jr-phase-modal .jr-adjust button:hover {
  background: #24594c;
  border-color: #47d7aa;
}

/* CLOSE BUTTON — restyle to match */

.jr-phase-close {
  background: #102d2c;
  color: #e1f0e9;
  border: 1px solid #35534b;
}

.jr-phase-close:hover {
  background: #19413a;
  border-color: #69c6a2;
}

@keyframes jrPhaseRise {
  from { opacity: 0; transform: translateY(14px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.jr-phase-close {
  position: absolute;
  top: 14px;
  right: 14px;

  width: 36px;
  height: 36px;

  display: grid;
  place-items: center;

  background: #102d2c;
  color: #e1f0e9;

  border: 1px solid #35534b;
  border-radius: 8px;

  cursor: pointer;
  z-index: 2;

  transition: background 0.18s ease, border-color 0.18s ease;
}

.jr-phase-close:hover {
  background: #19413a;
  border-color: #69c6a2;
}

.jr-phase-close svg {
  display: block;
}

#map .jr-inspector-head .jr-kicker {
  color: #42d7ad;
  font-size: 10px;
}

#map .jr-inspector-head h3 {
  font-family: Georgia, "Times New Roman", serif;
  color: #f9fcfa;
  font-size: 26px;
  font-weight: 400;
  margin: 8px 0;
}

#map .jr-inspector-head p {
  color: #a3b9b2;
  font-size: 12px;
  line-height: 1.75;
}

#map .jr-owner-tag {
  background: rgba(47, 206, 158, 0.13);
  border: 1px solid rgba(80, 223, 178, 0.12);
  color: #84eac4;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 10px;
}

#map .jr-owner-tag.campus,
#map .jr-owner-tag.vendor {
  background: #153a34;
  color: #a5d6c2;
}

#map .jr-inspector-footer {
  border-top: 1px solid var(--map-line);
  padding-top: 21px;
  gap: 20px;
}

#map .jr-inspector-date {
  color: #e5f3ec;
  font-size: 12px;
}

#map .jr-inspector-date svg {
  color: #47d1a5;
}

#map .jr-inspector-footer small {
  color: #77998e;
  font-size: 10px;
}

#map .jr-inspector-footer strong {
  color: #edf8f2;
  font-size: 12px;
  font-weight: 650;
}

/* PHASE ADJUSTMENT BUTTONS */

#map .jr-adjust > span {
  color: #a2bcb2;
  font-size: 10px;
  margin-right: 7px;
}

#map .jr-adjust button {
  width: 29px;
  height: 29px;
  background: #173231;
  border: 1px solid rgba(174, 225, 206, 0.16);
  border-radius: 6px;
  color: #e7f8ef;
}

#map .jr-adjust button:hover {
  background: #24594c;
  border-color: #47d7aa;
}

/* 10 — PHASES TAB */

#map .jr-phase-grid {
  background: #071d1e;
  padding-top: 23px;
}

#map .jr-phase-tile {
  background: #102929;
  border: 1px solid var(--map-line);
  border-radius: 9px;
  color: #e8f5ef;
}

#map .jr-phase-tile:hover {
  background: #153833;
  border-color: #278b70;
}

#map .jr-phase-tile.selected {
  background: #123e34;
  border-color: #39d1a1;
}

#map .jr-phase-tile strong {
  color: #f1fbf6;
}

#map .jr-phase-tile small {
  color: #54d9b1;
}

#map .jr-phase-tile > span:not(.jr-mini-dot) {
  color: #9cb6ac;
}

#map .jr-phase-tile > svg {
  color: #64c9a6;
}

/* 11 — MONTH DETAIL TAB */

#map .jr-month-cards {
  background: #071d1e;
  padding-top: 23px;
}

#map .jr-month-cards button {
  background: #102929;
  border: 1px solid var(--map-line);
  border-radius: 9px;
}

#map .jr-month-cards button:hover {
  background: #153833;
  border-color: #328b72;
}

#map .jr-month-cards strong {
  color: #f2fbf6;
}

#map .jr-month-cards span,
#map .jr-month-cards small {
  color: #a0b9b0;
}

#map .jr-month-cards b {
  color: #f0a76f;
}

/* 12 — RESPONSIVE LAYOUT */

@media (max-width: 900px) {
  #map .jr-summary-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  #map .jr-summary-row > div:nth-child(2) {
    border-right: 0;
  }

  #map .jr-summary-row > div:nth-child(-n+2) {
    border-bottom: 1px solid var(--map-line);
  }

  #map .jr-map-top {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 22px;
  }

  #map .jr-map-controls {
    width: 100%;
  }
}

@media (max-width: 610px) {
  #map {
    padding-top: 70px;
    padding-bottom: 76px;
  }

  #map .jr-summary-row {
    grid-template-columns: 1fr;
  }

  #map .jr-summary-row > div {
    min-height: 0;
    border-right: 0;
    border-bottom: 1px solid var(--map-line);
    padding: 19px 21px;
  }

  #map .jr-summary-row > div:last-child {
    border-bottom: 0;
  }

  #map .jr-map-top {
    padding: 22px 18px;
  }

  #map .jr-map-controls {
    flex-wrap: wrap;
  }

  #map .jr-segment button {
    font-size: 10px;
    padding: 9px 11px;
  }

  #map .jr-gantt {
    grid-template-columns: 185px minmax(0, 1fr);

    min-width: max(
      760px,
      calc(185px + var(--jr-months) * 45px)
    );
  }

  #map .jr-gantt-label {
    font-size: 10px;
    padding-left: 13px;
  }

  #map .jr-map-bottom {
    padding: 17px;
  }

  #map .jr-phase-inspector {
    padding: 20px;
  }

  #map .jr-inspector-head {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}


/* ==========================================
   STAFFING + OWNERSHIP
   PREMIUM WHITE DASHBOARD
   ========================================== */

/* ONE CONTINUOUS WHITE BACKGROUND */

.jr .jr-workforce-suite {
  background: #ffffff;
}

#staffing,
#ownership {
  background: #ffffff;
  color: #0d2530;
}

#staffing {
  padding: 88px 0 42px;
}

#ownership {
  padding: 80px 0 95px;
}

/* MATCH BASELINE BUILDER TYPOGRAPHY */

#staffing,
#ownership,
#staffing h2,
#ownership h2,
#staffing h3,
#ownership h3,
#staffing strong,
#ownership strong,
#staffing button,
#ownership button,
#ownership select {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
}

#staffing .jr-section-head,
#ownership .jr-section-head {
  align-items: end;
  margin-bottom: 28px;
  gap: 32px;
}

#staffing .jr-section-head h2,
#ownership .jr-section-head h2 {
  font-size: clamp(38px, 3.8vw, 58px);
  font-weight: 800;
  letter-spacing: -0.058em;
  line-height: 1.06;
  color: #011522;
  max-width: 850px;
  margin-top: 13px;
}

#staffing .jr-section-head .jr-kicker,
#ownership .jr-section-head .jr-kicker {
  color: #087b65;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

#staffing .jr-section-head > p,
#ownership .jr-section-head > p {
  color: #011522;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.7;
   max-width: 520px;
}




/* ==========================================
   OWNERSHIP + RISK
   ========================================== */

#ownership .jr-ownership-grid {
  display: grid;
  grid-template-columns:
    minmax(0, 1.45fr) minmax(380px, 0.95fr);
  gap: 15px;
  align-items: stretch;
}

#ownership .jr-owners-panel,
#ownership .jr-risk-panel {
  padding: 19px 19px 18px;
  min-width: 0;
}

#ownership .jr-panel-title h3 {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #011522;
}

#ownership .jr-panel-title p {
  font-size: 13px;
  font-weight: 500;
  color: #011522;
  margin: 6px 0 0;
  line-height: 1.6;
}

#ownership .jr-owner-panel-head,
#ownership .jr-risk-panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 17px;
}

#ownership .jr-risk-panel-head > div {
  flex: 1;
  min-width: 0;
}

#ownership .jr-risk-panel-head p {
  white-space: nowrap;
}

/* OWNERSHIP EDIT AND CALENDAR BUTTONS */

#ownership .jr-ownership-toggle,
#ownership .jr-risk-edit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-shrink: 0;

  background: #f8fcf9;
  color: #08725b;
  border: 1px solid #d3e6dd;
  border-radius: 6px;

  font-size: 11px;
  font-weight: 800;
  min-height: 32px;
  padding: 6px 10px;
  margin: 0;
}

#ownership .jr-ownership-toggle:hover,
#ownership .jr-risk-edit:hover {
  background: #e9f6ef;
}

/* THREE OWNERSHIP COLUMNS */

#ownership .jr-ownership-columns {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border: 1px solid #e4eae9;
  border-radius: 8px;
  overflow: hidden;
}

#ownership .jr-ownership-col {
  padding: 18px 13px;
  min-width: 0;
}

#ownership .jr-ownership-col + .jr-ownership-col {
  border-left: 1px solid #e6eeea;
}

#ownership .jr-owner-col-head {
  min-height: 45px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;
}

#ownership .jr-owner-col-head > strong {
  margin-left: 0;
}

/* Pull the Jenzabar column's heading closer to its logo */

#ownership .jr-ownership-col.vendor .jr-owner-col-head {
  gap: 0;
}

#ownership .jr-ownership-col.vendor .jr-owner-brand {
  margin-right: -49px;
}

#ownership .jr-owner-col-head strong {
  font-size: 14px;
  font-weight: 800;
  line-height: 1.35;
  color: #011522;
}

/* JENZABAR LOGO */

#ownership .jr-owner-brand {
  flex: 0 0 auto;
  min-width: 0;
  display: flex;
  align-items: center;
}

#ownership .jr-owner-brand .jr-logo {
  display: flex;
  width: 88px;
  height: 22px;
  min-width: 0;
  overflow: visible;
}

#ownership .jr-owner-brand .jr-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: left center;
  mix-blend-mode: normal;
}

#ownership .jr-owner-brand .jr-wordmark {
  font-size: 12px;
  letter-spacing: -0.04em;
  white-space: nowrap;
}

#ownership .jr-owner-brand .jr-butterfly {
  font-size: 15px;
}

#ownership .jr-owner-mark {
  flex: 0 0 24px;
  display: grid;
  place-items: center;
  color: #0b6f59;
}

/* RESPONSIBILITY ITEMS */

#ownership .jr-owner-tasks {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

#ownership .jr-owner-task {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
}

#ownership .jr-owner-task svg {
  flex-shrink: 0;
  color: #17764f;
  margin-top: 1px;
}

#ownership .jr-owner-task span {
  display: block;
  color: #011522;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.55;
}

#ownership .jr-owner-empty {
  color: #011522;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
}

#ownership .jr-fineprint {
  font-size: 12px;
  font-weight: 500;
  color: #011522;
  margin-top: 15px;
  line-height: 1.65;
}

/* EXPANDABLE OWNER EDITOR */

#ownership .jr-owner-editor {
  margin-top: 14px;
}

#ownership .jr-owner-editor > summary {
  list-style: none;
  cursor: pointer;
  width: max-content;
}

#ownership .jr-owner-editor > summary::-webkit-details-marker {
  display: none;
}

#ownership .jr-owner-editor[open] .jr-ownership-toggle {
  background: #e9f6ef;
}

#ownership .jr-owner-edit-panel {
  margin-top: 15px;
  border: 1px solid #dbe8e1;
  background: #fcfefd;
  border-radius: 8px;
  padding: 14px;
}

#ownership .jr-owner-edit-heading {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 12px;
}

#ownership .jr-owner-edit-heading strong {
  color: #011522;
  font-size: 15px;
  font-weight: 800;
}

#ownership .jr-owner-edit-heading span {
  color: #011522;
  font-size: 13px;
  font-weight: 500;
}

#ownership .jr-owner-head {
  background: #edf7f1;
}

#ownership .jr-owner-table > label {
  padding: 9px 7px;
}

#ownership .jr-owner-table > label > span {
  font-size: 14px;
  font-weight: 600;
  color: #011522;
}

#ownership .jr-owner-table select {
  font-size: 13px;
  font-weight: 600;
  color: #011522;
  max-width: 195px;
}

/* ==========================================
   CAMPUS RISK WINDOWS
   ========================================== */

#ownership .jr-risks {
  display: flex;
  flex-direction: column;
}

#ownership .jr-risk-item {
  display: grid;
  grid-template-columns:
    24px minmax(0, 1fr) auto;

  align-items: start;
  gap: 10px;
  padding: 13px 1px;

  border: 0;
  border-bottom: 1px solid #edf1ef;
  background: #ffffff;
  text-align: left;
}

#ownership .jr-risk-item:first-child {
  padding-top: 5px;
}

#ownership .jr-risk-item:last-child {
  border-bottom: 0;
}

#ownership .jr-risk-item:hover {
  background: #f9fcfa;
}

#ownership .jr-risk-icon {
  color: #0a7861;
  padding-top: 2px;
}

#ownership .jr-risk-body strong {
  font-size: 15px;
  font-weight: 800;
  color: #011522;
}

#ownership .jr-risk-body small {
  font-size: 13px;
  font-weight: 700;
  color: #011522;
  margin: 4px 0;
}

#ownership .jr-risk-body em {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.6;
  color: #011522;
}

/* GREEN RISK BADGES */

#ownership .jr-risk-item b {
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
  padding: 5px 9px;
  border-radius: 5px;
}

#ownership .jr-risk-item b.high {
  color: #075d47;
  background: #d9f2e5;
}

#ownership .jr-risk-item b.medium {
  color: #32755f;
  background: #eef7f0;
}

/* ==========================================
   RESPONSIVE
   ========================================== */

@media (max-width: 1180px) {
  #ownership .jr-ownership-grid {
    grid-template-columns: 1fr;
  }

  #staffing .jr-staff-layout {
    grid-template-columns: minmax(0, 1fr) 235px;
  }
}

@media (max-width: 900px) {
  #staffing .jr-staff-layout {
    grid-template-columns: 1fr;
  }

  #staffing .jr-staff-aside {
    flex-direction: row;
  }

  #staffing .jr-staff-card {
    flex: 1;
  }

  #ownership .jr-ownership-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 650px) {
  #staffing {
    padding: 65px 0 28px;
  }

  #ownership {
    padding: 35px 0 75px;
  }

  #staffing .jr-section-head h2,
  #ownership .jr-section-head h2 {
    font-size: clamp(31px, 8vw, 40px);
  }

  #staffing .jr-staff-main {
    padding: 15px 12px;
  }

  #staffing .jr-staff-top {
    flex-direction: column;
    gap: 8px;
  }

  #staffing .jr-staff-scale {
    gap: 10px;
  }

  #staffing .jr-staff-aside {
    flex-direction: column;
  }

  #staffing .jr-load-detail {
    padding: 18px;
  }

  #ownership .jr-owners-panel,
  #ownership .jr-risk-panel {
    padding: 16px 13px;
  }

  #ownership .jr-ownership-columns {
    grid-template-columns: 1fr;
  }

  #ownership .jr-ownership-col {
    padding: 15px;
  }

  #ownership .jr-ownership-col + .jr-ownership-col {
    border-left: 0;
    border-top: 1px solid #e6eeea;
  }

  #ownership .jr-owner-col-head {
    min-height: 0;
    margin-bottom: 11px;
  }

  #ownership .jr-owner-panel-head,
  #ownership .jr-risk-panel-head {
    flex-wrap: wrap;
  }

  #ownership .jr-owner-table > label {
    grid-template-columns:
      minmax(0, 1fr) 118px;
  }

  #ownership .jr-owner-table select {
    min-width: 0;
  }
}


/* ============================================
   05 / LEADERSHIP READOUT — VARIANT 2
   Floating executive brief carousel
   ============================================ */

#brief.jr-brief {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 108px 0 98px;
  background: radial-gradient(
    ellipse at 76% 35%,
    #0c302c 0%,
    #062120 42%,
    #041b1c 78%
  );
  color: #f5fcf8;
}

#brief.jr-brief::before,
#brief.jr-brief::after {
  content: "";
  position: absolute;
  pointer-events: none;
  z-index: -1;
  border: 1px solid rgba(104, 203, 163, 0.09);
  border-radius: 50%;
  width: 900px;
  height: 900px;
  right: -410px;
  top: -490px;
  transform: rotate(-22deg);
}

#brief.jr-brief::after {
  width: 1100px;
  height: 1100px;
  right: -660px;
  top: 30px;
  border-color: rgba(104, 203, 163, 0.06);
}

#brief .jr-brief-grid {
  display: grid;
  grid-template-columns:
    minmax(0, 0.88fr)
    minmax(0, 1.3fr);
  gap: 36px;
  align-items: center;
}

/* LEFT COPY */

#brief .jr-brief-copy {
  position: relative;
  z-index: 2;
  min-width: 0;
}

#brief .jr-brief-copy .jr-kicker {
  font-size: 11px;
  font-weight: 760;
  letter-spacing: 0.15em;
  color: #4bd7ad;
}

#brief .jr-brief-copy h2 {
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(38px, 3.3vw, 51px);
  font-weight: 400;
  letter-spacing: -0.048em;
  line-height: 1.1;
  margin: 17px 0 19px;
  color: #ffffff;
}

#brief .jr-brief-copy > p:not(.jr-brief-disclaimer) {
  max-width: 440px;
  color: #b8cdc5;
  font-size: 14px;
  line-height: 1.8;
}

/* ACTION BUTTONS */

#brief .jr-brief-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 29px;
  flex-wrap: wrap;
}

#brief .jr-brief-actions .jr-btn-mint {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px solid #b7efda;
  border-radius: 7px;
  min-height: 47px;
  padding: 0 17px;
  background: #a7e8d1;
  color: #05342d;
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 12px;
  font-weight: 730;
  box-shadow: 0 8px 24px rgba(0,0,0,0.14);
}

#brief .jr-brief-actions .jr-btn-mint:hover {
  background: #c2f5e1;
}

#brief .jr-brief-copy-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 47px;
  padding: 0 14px;
  border-radius: 7px;
  border: 1px solid rgba(182,229,210,0.22);
  background: rgba(255,255,255,0.025);
  color: #c9e6d8;
  font-size: 11px;
  font-weight: 600;
}

#brief .jr-brief-copy-btn:hover {
  background: rgba(179,231,207,0.08);
  border-color: rgba(182,229,210,0.4);
}

#brief .jr-brief-disclaimer {
  margin-top: 17px;
  color: #78958c;
  font-size: 10px;
  line-height: 1.55;
  max-width: 410px;
}

/* ============================================
   TOP SIX SECTION TABS
   ============================================ */

#brief .jr-slide-area {
  min-width: 0;
  padding: 0;
  position: relative;
}

#brief .jr-slide-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 9px;
  margin: 0 0 12px;
  padding: 0;
  overflow-x: auto;
  border-bottom: 1px solid rgba(169,224,205,0.22);
  scrollbar-width: none;
}

#brief .jr-slide-tabs::-webkit-scrollbar {
  display: none;
}

#brief .jr-slide-tabs button {
  flex: 0 0 auto;
  border: 0;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  background: transparent;
  padding: 13px 3px 12px;
  font-size: 11px;
  font-weight: 550;
  white-space: nowrap;
  color: #a2bbb1;
}

#brief .jr-slide-tabs button.active,
#brief .jr-slide-tabs button[aria-selected="true"] {
  color: #a5f0cf;
  border-bottom-color: #54deae;
  font-weight: 740;
}

#brief .jr-slide-tabs button:hover {
  color: #ffffff;
}

/* ============================================
   CINEMATIC CAROUSEL STAGE
   ============================================ */

#brief .jr-slide-previews {
  position: relative;
  display: block;
  height: 352px;
  overflow: hidden;
  padding: 0;
  margin: 0 -12px;
  perspective: 1250px;
  isolation: isolate;
}

#brief .jr-slide-previews::after {
  content: "";
  position: absolute;
  left: 7%;
  right: 7%;
  bottom: 14px;
  height: 24px;
  pointer-events: none;
  background: radial-gradient(
    ellipse,
    rgba(0,0,0,0.34),
    transparent 72%
  );
}

/* FLOATING SLIDE CARDS */

#brief .jr-mini-slide {
  position: absolute;
  top: 18px;
  left: 50%;

  width: 198px;
  height: 293px;
  flex: none;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;

  overflow: hidden;
  text-align: left;
  padding: 15px 12px 12px;

  border: 1px solid rgba(147,222,191,0.16);
  border-radius: 12px;

  background: linear-gradient(
    152deg,
    #10312e 0%,
    #061b1c 100%
  );

  color: #ffffff;

  box-shadow: 0 24px 45px rgba(0,0,0,0.28);
  transform-origin: center center;

  transform:
    translateX(calc(-50% + var(--deck-x)))
    translateY(var(--deck-y))
    rotateY(var(--deck-rotate))
    scale(var(--deck-scale));

  transition:
    transform 0.52s cubic-bezier(0.2,0.8,0.2,1),
    opacity 0.42s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  will-change: transform;
}

/* ACTIVE CENTRE CARD */

#brief .jr-mini-slide.active {
  border-color: #48dbac;

  box-shadow:
    0 0 0 1px rgba(72,219,172,0.28),
    0 24px 50px rgba(0,0,0,0.46),
    0 0 24px rgba(61,218,161,0.10);
}

#brief .jr-mini-slide:hover {
  border-color: rgba(100,235,185,0.7);
}

#brief .jr-mini-slide:focus-visible {
  outline: 2px solid #a2e8cd;
  outline-offset: 4px;
}

/* CARD TYPOGRAPHY */

#brief .jr-deck-number {
  display: block;
  color: #a0c7b5;
  font-size: 10px;
  letter-spacing: 0.12em;
  font-weight: 700;
}

#brief .jr-mini-slide .jr-deck-title {
  display: block;
  margin: 8px 0 5px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  line-height: 1.14;
  font-weight: 400;
  letter-spacing: -0.035em;
  color: #ffffff;
  min-height: 42px;
}

#brief .jr-mini-slide .jr-deck-subtitle {
  font-size: 10px;
  color: #a2c4b6;
  line-height: 1.4;
  min-height: 15px;
}

/* ============================================
   WHITE DOCUMENT PREVIEWS
   ============================================ */

#brief .jr-deck-paper {
  margin-top: auto;
  width: 100%;
  height: 133px;
  min-height: 133px;
  border-radius: 5px;
  overflow: hidden;
  background: #f9fcfa;
  color: #113b32;
  box-shadow: 0 3px 8px rgba(0,0,0,0.18);
  padding: 11px;
}

#brief .jr-deck-preview-heading {
  display: block;
  font-family: Inter, sans-serif;
  font-size: 6px;
  font-weight: 800;
  color: #568475;
  letter-spacing: 0.1em;
  margin-bottom: 9px;
}

/* COVER PREVIEW */

#brief .jr-deck-cover {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  isolation: isolate;
}

#brief .jr-deck-logo .jr-logo {
  width: 65px;
  height: 17px;
  overflow: hidden;
}

#brief .jr-deck-logo .jr-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: left;
}

#brief .jr-deck-logo .jr-wordmark {
  font-size: 9px;
  color: #164838;
}

#brief .jr-deck-doc-kicker {
  font-size: 6px;
  letter-spacing: 0.08em;
  color: #64877c;
  margin-top: 10px;
}

#brief .jr-deck-cover b {
  font-size: 12px;
  line-height: 1.2;
  margin-top: 3px;
  font-weight: 760;
  color: #133931;
  z-index: 1;
}

#brief .jr-deck-cover small {
  font-size: 6px;
  margin-top: auto;
  color: #789a88;
  z-index: 1;
}

#brief .jr-deck-cover-shape {
  position: absolute;
  right: -20px;
  bottom: -31px;
  width: 105px;
  height: 99px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    #dff7ed,
    #73bc9f
  );
  z-index: -1;
}

/* TIMELINE PREVIEW */

#brief .jr-deck-timeline-row {
  position: relative;
  background: #e8f2ed;
  height: 11px;
  margin-bottom: 6px;
  border-radius: 2px;
  overflow: hidden;
}

#brief .jr-deck-timeline-row > span {
  display: block;
  position: absolute;
  height: 5px;
  top: 3px;
  border-radius: 3px;
  background: #298e70;
  min-width: 5px;
}

#brief .jr-deck-timeline-row:nth-child(2n) > span {
  background: #7ac3a5;
}

/* STAFFING PREVIEW */

#brief .jr-deck-heat {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3px;
}

#brief .jr-deck-heat i {
  display: block;
  height: 15px;
  border-radius: 2px;
  background: #d3ede0;
}

#brief .jr-deck-heat i.high {
  background: #70bb9e;
}

#brief .jr-deck-heat i.over {
  background: #186d55;
}

/* RISKS PREVIEW */

#brief .jr-deck-risk-row {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 0;
  border-bottom: 1px solid #e8f0eb;
  color: #346b5a;
  font-size: 8px;
  text-align: left;
}

#brief .jr-deck-risk-row svg {
  color: #c9854b;
}

#brief .jr-deck-no-risks {
  color: #627f75;
  font-size: 9px;
}

/* OWNERSHIP PREVIEW */

#brief .jr-deck-owner-row {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 5px 0;
  border-bottom: 1px solid #e7f0eb;
  font-size: 8px;
  color: #3d6256;
}

#brief .jr-deck-owner-mark {
  width: 17px;
  height: 17px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #e2f3e9;
  color: #208568;
}

#brief .jr-deck-owner-row b {
  margin-left: auto;
  color: #13533e;
  font-size: 9px;
}

/* NEXT STEPS PREVIEW */

#brief .jr-deck-next-row {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 7px 0;
  font-size: 8px;
  color: #42695b;
}

#brief .jr-deck-next-row > span {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #d9f4e5;
  color: #0c7e5a;
  display: grid;
  place-items: center;
  font-size: 8px;
  font-weight: 750;
}

#brief .jr-deck-next-row b {
  font-size: 8px;
  font-weight: 600;
}

/* ============================================
   CAROUSEL CONTROLS
   ============================================ */

#brief .jr-slide-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-top: 4px;
  color: #bbd7cb;
  font-size: 12px;
}

#brief .jr-slide-controls > span {
  min-width: 75px;
  text-align: center;
}

#brief .jr-slide-controls strong {
  color: #ffffff;
}

#brief .jr-slide-controls button {
  display: grid;
  place-items: center;
  width: 39px;
  height: 39px;
  padding: 0;
  border: 1px solid rgba(181,229,205,0.24);
  border-radius: 9px;
  background: rgba(255,255,255,0.025);
  color: #e8f7f0;
}

#brief .jr-slide-controls button:hover {
  background: #164138;
  border-color: #56d7aa;
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 1050px) {
  #brief .jr-brief-grid {
    grid-template-columns: 1fr;
    gap: 34px;
  }

  #brief .jr-brief-copy {
    max-width: 720px;
  }

  #brief .jr-brief-copy h2 {
    max-width: 600px;
  }

  #brief .jr-brief-disclaimer {
    margin-top: 12px;
  }

  #brief .jr-slide-area {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
  }
}

@media (max-width: 610px) {
  #brief.jr-brief {
    padding: 65px 0 70px;
  }

  #brief .jr-brief-copy h2 {
    font-size: clamp(34px, 9vw, 43px);
  }

  #brief .jr-brief-copy > p:not(.jr-brief-disclaimer) {
    font-size: 13px;
  }

  #brief .jr-brief-actions {
    align-items: stretch;
  }

  #brief .jr-brief-actions .jr-btn-mint {
    width: 100%;
  }

  #brief .jr-brief-copy-btn {
    width: 100%;
  }

  #brief .jr-slide-tabs {
    justify-content: flex-start;
    gap: 17px;
  }

  #brief .jr-slide-previews {
    height: 334px;
    margin: 0 -4px;
  }

  #brief .jr-mini-slide {
    width: 188px;
    height: 285px;
  }

  #brief .jr-slide-controls {
    margin-top: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  #brief .jr-mini-slide {
    transition: none;
  }
}



/* ================================================
   PREMIUM DARK PRESENTATION WORKSPACE
   JENZABAR IMPLEMENTATION BRIEF
   ================================================ */

/* 01. FULL-SCREEN OVERLAY */

.jr .jr-deck-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;

  background: rgba(0, 12, 14, 0.91);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

/* 02. MAIN MODAL */

.jr .jr-deck-modal {
  width: min(1500px, 100%);
  height: min(89vh, 920px);
  max-height: calc(100dvh - 48px);
  min-height: 0;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  background: #041b1c;
  color: #edf8f2;

  border: 1px solid #25433f;
  border-radius: 12px;

  box-shadow:
    0 45px 110px rgba(0, 0, 0, 0.56),
    0 1px 0 rgba(255, 255, 255, 0.045);
}

/* MATCH BASELINE BUILDER TYPOGRAPHY */

.jr .jr-deck-modal,
.jr .jr-deck-modal button,
.jr .jr-deck-modal input,
.jr .jr-deck-modal textarea,
.jr .jr-deck-modal h2,
.jr .jr-deck-modal h3,
.jr .jr-deck-modal strong,
.jr .jr-deck-modal span,
.jr .jr-deck-modal p,
.jr .jr-deck-modal small {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
}

/* ================================================
   03. REMOVE DECORATIVE ICONS
   ================================================ */

.jr .jr-deck-modal svg {
  display: none !important;
}

/* Replace icon-only controls with clean typography */

.jr .jr-deck-close {
  display: grid;
  place-items: center;

  width: 34px;
  height: 34px;
  padding: 0;

  border: 1px solid #35534b;
  border-radius: 6px;

  background: #102d2c;
  color: #e1f0e9;

  font-size: 0;
}

.jr .jr-deck-close::after {
  content: "×";
  font-family: Arial, sans-serif;
  font-size: 24px;
  font-weight: 300;
  line-height: 1;
}

.jr .jr-deck-close:hover {
  background: #19413a;
  border-color: #69c6a2;
}

/* Minimal navigation arrows */

.jr .jr-deck-modal-navigation button {
  font-size: 0;
}

.jr .jr-deck-modal-navigation button:first-of-type::after {
  content: "←";
  font-size: 19px;
  font-weight: 400;
}

.jr .jr-deck-modal-navigation button:last-of-type::after {
  content: "→";
  font-size: 19px;
  font-weight: 400;
}

/* ================================================
   04. DARK MODAL HEADER
   ================================================ */

.jr .jr-deck-modal-header {
  min-height: 76px;
  padding: 19px 29px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  flex-shrink: 0;

  background: #061f20;
  border-bottom: 1px solid #25433f;
  color: #f3faf7;
}

.jr .jr-deck-modal-header > div:first-child {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.jr .jr-deck-modal-eyebrow {
  color: #59cfa7;

  font-size: 10px;
  font-weight: 750;
  letter-spacing: 0.15em;
}

.jr .jr-deck-modal-header strong {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.025em;

  color: #f5fcf8;
}

.jr .jr-deck-modal-header strong span {
  color: #77988b;
  font-weight: 400;
}

.jr .jr-deck-modal-header-actions {
  display: flex;
  align-items: center;
  gap: 23px;
}

/* Replace the live preview icon with a small status dot */

.jr .jr-deck-live-status {
  display: inline-flex;
  align-items: center;
  gap: 9px;

  font-size: 11px;
  font-weight: 550;
  color: #a5c6b7;
}

.jr .jr-deck-live-status::before {
  content: "";

  display: block;
  width: 7px;
  height: 7px;

  background: #54d4a0;
  border-radius: 50%;
}

/* ================================================
   05. TWO-COLUMN WORKSPACE
   ================================================ */

.jr .jr-deck-modal-body {
  flex: 1;
  min-height: 0;
  overflow: hidden;

  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    335px;

  background: #061c1d;
}

/* PRESENTATION WORKSPACE */

.jr .jr-deck-preview-workspace {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  gap: 18px;
  padding: 30px 35px;

  min-width: 0;
  min-height: 0;
  overflow-y: auto;

  background: #071c1d;
  border-right: 1px solid #25433f;
}

.jr .jr-deck-workspace-label {
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 15px;

  color: #77998c;

  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.jr .jr-deck-workspace-label span:last-child {
  font-size: 10px;
  letter-spacing: 0;
  font-weight: 450;
  color: #7b988e;
}

/* ================================================
   06. DARK PRESENTATION SLIDE
   ================================================ */

.jr .jr-deck-large-slide {
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  aspect-ratio: 16 / 9;
  min-height: 410px;

  padding: 29px 32px 23px;

  overflow: hidden;

  background: #0b2928;
  color: #edf8f2;

  border: 1px solid #33534a;
  border-radius: 7px;

  box-shadow:
    0 25px 65px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

/* BRAND MASTHEAD */

.jr .jr-deck-large-masthead {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 15px;

  padding-bottom: 16px;
  margin-bottom: 3px;

  border-bottom: 1px solid #315249;
}

.jr .jr-deck-large-masthead .jr-logo {
  width: 101px;
  height: 30px;

  display: flex;
  align-items: center;
  overflow: hidden;

  background: #fff;
  padding: 5px 8px;
  border-radius: 4px;
}

.jr .jr-deck-large-masthead .jr-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: left center;
}

.jr .jr-deck-large-masthead .jr-logo .jr-wordmark {
  color: #11352e;
  font-size: 11px;
}

.jr .jr-deck-large-masthead > span:last-child {
  color: #7ba79a;

  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.13em;
}

/* PRESENTATION HEADING */

.jr .jr-deck-large-heading {
  padding: 19px 0 18px;
}

.jr .jr-deck-large-heading > span {
  display: block;

  color: #5bd5aa;

  font-size: 10px;
  font-weight: 780;
  letter-spacing: 0.13em;
}

.jr .jr-deck-large-heading h2 {
  color: #f7fcf9;

  font-size: clamp(22px, 2.35vw, 33px);
  font-weight: 730;
  letter-spacing: -0.055em;
  line-height: 1.13;

  margin: 9px 0 8px;

  overflow-wrap: anywhere;
}

.jr .jr-deck-large-heading p {
  color: #a4c1b5;

  font-size: 12px;
  line-height: 1.55;
}

/* ================================================
   07. EXECUTIVE SUMMARY SLIDE
   ================================================ */

.jr .jr-deck-large-summary {
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin: auto 0;
}

.jr .jr-deck-large-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  overflow: hidden;

  border: 1px solid #315047;
  border-radius: 6px;

  background: #102f2c;
}

.jr .jr-deck-large-stats > div {
  padding: 21px 19px;

  display: flex;
  flex-direction: column;
  gap: 7px;
}

.jr .jr-deck-large-stats > div + div {
  border-left: 1px solid #315047;
}

.jr .jr-deck-large-stats span,
.jr .jr-deck-large-summary-band span {
  color: #91b5a6;

  font-size: 9px;
  font-weight: 750;
  letter-spacing: 0.12em;
}

.jr .jr-deck-large-stats strong {
  font-size: clamp(23px, 2.5vw, 36px);
  font-weight: 750;
  letter-spacing: -0.055em;

  color: #f4fcf7;
}

.jr .jr-deck-large-stats small {
  color: #91b5a5;
  font-size: 11px;
}

.jr .jr-deck-large-summary-band {
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 20px;
  padding: 18px 21px;

  border-radius: 6px;
  border: 1px solid #285747;

  background: #13392f;
}

.jr .jr-deck-large-summary-band > div {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.jr .jr-deck-large-summary-band strong {
  color: #b3eed3;
  font-size: 17px;
  font-weight: 680;
  letter-spacing: -0.025em;
}

/* ================================================
   08. TIMELINE SLIDE
   ================================================ */

.jr .jr-deck-large-timeline {
  display: flex;
  flex-direction: column;

  gap: 6px;
  margin: auto 0;
}

.jr .jr-deck-large-timeline-head,
.jr .jr-deck-large-phase {
  display: grid;
  grid-template-columns: 165px minmax(0, 1fr) 43px;

  align-items: center;
  gap: 12px;
}

.jr .jr-deck-large-timeline-head {
  color: #85a99a;

  font-size: 9px;
  font-weight: 750;
  letter-spacing: 0.1em;

  margin-bottom: 13px;
}

.jr .jr-deck-large-timeline-head span {
  text-align: center;
}

.jr .jr-deck-large-phase {
  min-height: 27px;
}

.jr .jr-deck-large-phase > span {
  color: #c3dcd1;

  font-size: 10px;
  font-weight: 570;
}

.jr .jr-deck-large-phase > div {
  height: 17px;
  position: relative;

  background: repeating-linear-gradient(
    90deg,
    #163b35 0,
    #163b35 calc(10% - 1px),
    #284b40 calc(10% - 1px),
    #284b40 10%
  );

  border-radius: 3px;
  overflow: hidden;
}

.jr .jr-deck-large-phase i {
  position: absolute;

  top: 5px;
  height: 7px;

  border-radius: 3px;
  background: #54cda0;
}

.jr .jr-deck-large-phase small {
  color: #90b5a3;
  font-size: 10px;
}

/* ================================================
   09. STAFFING SLIDE
   ================================================ */

.jr .jr-deck-large-staffing {
  display: flex;
  flex-direction: column;
  gap: 5px;

  margin: auto 0;
  overflow-x: auto;
}

.jr .jr-deck-large-heat-heading {
  display: flex;
  justify-content: space-between;

  margin-bottom: 13px;
}

.jr .jr-deck-large-heat-heading strong {
  color: #8cbaaa;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.jr .jr-deck-large-heat-heading span {
  color: #98bcb0;
  font-size: 10px;
}

.jr .jr-deck-large-heat-row {
  display: grid;
  align-items: center;

  gap: 4px;
  min-width: 560px;
}

.jr .jr-deck-large-heat-row > strong {
  color: #c9e0d5;

  font-size: 10px;
  font-weight: 570;
}

.jr .jr-deck-large-heat-row > span {
  display: grid;
  place-items: center;

  height: 27px;
  border-radius: 3px;

  font-size: 9px;
  font-weight: 650;

  color: #d5f3e3;
  background: #244f43;
}

.jr .jr-deck-large-heat-row > span.low {
  background: #23483c;
  color: #b8decc;
}

.jr .jr-deck-large-heat-row > span.high {
  background: #3a8d70;
  color: #f3fff8;
}

.jr .jr-deck-large-heat-row > span.over {
  background: #75d0a9;
  color: #063629;
  font-weight: 760;
}

/* ================================================
   10. ACADEMIC RISKS SLIDE
   ================================================ */

.jr .jr-deck-large-risks {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 11px;
  align-content: center;

  margin: auto 0;
}

.jr .jr-deck-large-risk {
  position: relative;
  min-width: 0;

  padding: 15px;

  background: #102f2c;
  border: 1px solid #33534a;
  border-radius: 6px;
}

.jr .jr-deck-large-risk > div {
  display: flex;
  align-items: flex-start;
  gap: 0;
}

.jr .jr-deck-large-risk strong {
  color: #f1faf5;
  font-size: 12px;
  font-weight: 650;
}

.jr .jr-deck-large-risk small {
  display: block;
  color: #8daf9f;

  font-size: 10px;
  margin-top: 6px;
}

.jr .jr-deck-large-risk p {
  color: #9fbaad;

  font-size: 10px;
  line-height: 1.55;

  margin-top: 11px;
  padding-right: 44px;
}

.jr .jr-deck-large-risk b {
  position: absolute;
  top: 13px;
  right: 12px;

  border: 1px solid #356450;
  background: #174537;
  color: #b8efd4;

  font-size: 9px;
  font-weight: 750;
  border-radius: 4px;
  padding: 5px 8px;
}

.jr .jr-deck-large-risk b.high {
  background: #1d5842;
  color: #d0f9e0;
}

.jr .jr-deck-large-empty {
  color: #a8c4b7;
  padding: 20px;
}

/* ================================================
   11. OWNERSHIP SLIDE
   ================================================ */

.jr .jr-deck-large-ownership {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  overflow: hidden;
  margin: auto 0;

  border: 1px solid #33544b;
  border-radius: 6px;

  background: #102f2c;
}

.jr .jr-deck-large-owner {
  min-width: 0;
  padding: 17px 15px;
}

.jr .jr-deck-large-owner + .jr-deck-large-owner {
  border-left: 1px solid #33544b;
}

.jr .jr-deck-large-owner > strong {
  display: block;

  color: #e4f8ed;
  font-size: 11px;
  font-weight: 750;

  margin-bottom: 7px;
}

.jr .jr-deck-large-owner > span {
  display: block;

  color: #83ae9c;
  font-size: 9px;

  margin-bottom: 15px;
}

.jr .jr-deck-large-owner > div {
  display: flex;
  gap: 0;
  align-items: flex-start;

  padding: 8px 0;
  margin: 0;

  border-bottom: 1px solid #27483d;
}

.jr .jr-deck-large-owner > div:last-of-type {
  border-bottom: 0;
}

.jr .jr-deck-large-owner p {
  color: #bed8ca;

  font-size: 10px;
  line-height: 1.5;
}

.jr .jr-deck-large-owner small {
  display: block;
  margin-top: 9px;

  color: #5ed1a5;
  font-size: 9px;
}

/* ================================================
   12. NEXT STEPS SLIDE
   ================================================ */

.jr .jr-deck-large-next {
  display: flex;
  flex-direction: column;

  gap: 9px;
  margin: auto 0;
}

.jr .jr-deck-large-next > div {
  display: flex;
  align-items: center;
  gap: 18px;

  padding: 13px 17px;

  background: #102f2c;
  border: 1px solid #305147;
  border-radius: 5px;
}

.jr .jr-deck-large-next > div > span {
  color: #65d9aa;
  font-size: 12px;
  font-weight: 780;
}

.jr .jr-deck-large-next strong {
  flex: 1;

  color: #e2f5ea;

  font-size: 12px;
  font-weight: 630;
}

/* ================================================
   13. SLIDE NARRATIVE AND FOOTER
   ================================================ */

.jr .jr-deck-large-narrative {
  margin-top: 18px;

  color: #a2c4b2;
  font-size: 11px;
  line-height: 1.6;
}

.jr .jr-deck-large-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 18px;
  margin-top: auto;
  padding-top: 13px;

  border-top: 1px solid #33534a;
}

.jr .jr-deck-large-footer span {
  color: #779d8d;
  font-size: 9px;
  line-height: 1.4;
}

.jr .jr-deck-large-footer strong {
  color: #a3d6bd;

  font-size: 10px;
  font-weight: 700;
}

/* HELPER UNDER PREVIEW */

.jr .jr-deck-preview-helper {
  display: flex;
  align-items: center;

  color: #82a99a;
  font-size: 11px;
  line-height: 1.65;
}

/* ================================================
   14. DARK EDITOR SIDEBAR
   ================================================ */

.jr .jr-deck-editor-panel {
  display: flex;
  flex-direction: column;

  min-width: 0;
  min-height: 0;

  overflow-y: auto;

  padding: 31px 27px;

  background: #071d1e;
  color: #eaf7ef;

  border-left: 1px solid #25433f;
}

.jr .jr-deck-editor-heading {
  margin-bottom: 29px;
}

.jr .jr-deck-editor-heading span {
  color: #52cda1;

  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.jr .jr-deck-editor-heading h3 {
  margin: 10px 0 10px;

  color: #f1fbf5;

  font-size: 23px;
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 1.2;
}

.jr .jr-deck-editor-heading p {
  color: #92afa3;

  font-size: 12px;
  line-height: 1.7;
}

/* EDITABLE FIELDS */

.jr .jr-deck-editor-fields {
  display: flex;
  flex-direction: column;

  gap: 24px;
}

.jr .jr-deck-editor-fields label {
  display: flex;
  flex-direction: column;

  gap: 10px;
}

.jr .jr-deck-editor-fields label > span {
  color: #bdd8ca;

  font-size: 11px;
  font-weight: 660;
}

.jr .jr-deck-editor-fields textarea {
  display: block;
  width: 100%;
  min-width: 0;

  resize: vertical;

  padding: 13px 14px;

  background: #0c2b2b;
  color: #f0faf4;

  border: 1px solid #33534b;
  border-radius: 6px;

  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 12px;
  font-weight: 450;
  line-height: 1.65;

  outline: none;

  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.jr .jr-deck-editor-fields textarea:hover {
  border-color: #527566;
}

.jr .jr-deck-editor-fields textarea:focus {
  border-color: #5fd0a5;

  box-shadow:
    0 0 0 3px rgba(95, 208, 165, 0.09);
}

.jr .jr-deck-editor-fields textarea::placeholder {
  color: #668b7d;
  opacity: 1;
}

.jr .jr-deck-editor-fields small {
  color: #789b8b;
  font-size: 10px;
  line-height: 1.5;
}

/* EDITOR BOTTOM */

.jr .jr-deck-editor-bottom {
  margin-top: 27px;
  padding-top: 19px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;

  border-top: 1px solid #29473f;
}

.jr .jr-deck-editor-bottom button {
  display: inline-flex;
  align-items: center;

  color: #92d9b6;

  font-size: 11px;
  font-weight: 650;

  padding: 0;
  border: 0;
  background: transparent;
}

.jr .jr-deck-editor-bottom button:hover {
  color: #c2f4d9;
}

.jr .jr-deck-editor-bottom button:disabled {
  opacity: 0.4;
  cursor: default;
}

.jr .jr-deck-editor-bottom > span {
  color: #81a697;
  font-size: 10px;
}

/* ================================================
   15. MODAL FOOTER
   ================================================ */

.jr .jr-deck-modal-footer {
  min-height: 72px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  padding: 16px 28px;

  background: #061f20;
  border-top: 1px solid #25433f;
}

.jr .jr-deck-modal-navigation {
  display: flex;
  align-items: center;
  gap: 17px;

  color: #a4c6b5;

  font-size: 12px;
  font-weight: 500;
}

.jr .jr-deck-modal-navigation button {
  display: grid;
  place-items: center;

  width: 37px;
  height: 37px;
  padding: 0;

  background: #0d2a2a;
  color: #e7f9f0;

  border: 1px solid #35574a;
  border-radius: 6px;
}

.jr .jr-deck-modal-navigation button:hover {
  background: #19483b;
  border-color: #69cfa6;
}

/* DONE EDITING */

.jr .jr-deck-modal-done {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0;

  min-height: 40px;
  padding: 0 22px;

  background: #b0e9d0;
  color: #082f28;

  border: 1px solid #b0e9d0;
  border-radius: 6px;

  font-size: 12px;
  font-weight: 750;
}

.jr .jr-deck-modal-done:hover {
  background: #c6f5df;
  border-color: #c6f5df;
}

/* OPTIONAL EXPORT BUTTON */

/* ================================================
   16. SCROLLBARS
   ================================================ */

.jr .jr-deck-preview-workspace,
.jr .jr-deck-editor-panel,
.jr .jr-deck-large-staffing {
  scrollbar-width: thin;
  scrollbar-color: #3c6453 #0b2826;
}

.jr .jr-deck-editor-panel::-webkit-scrollbar,
.jr .jr-deck-preview-workspace::-webkit-scrollbar {
  width: 6px;
}

.jr .jr-deck-editor-panel::-webkit-scrollbar-thumb,
.jr .jr-deck-preview-workspace::-webkit-scrollbar-thumb {
  background: #3d6653;
  border-radius: 8px;
}

/* ================================================
   17. RESPONSIVE
   ================================================ */

@media (max-width: 1100px) {
  .jr .jr-deck-modal-body {
    grid-template-columns:
      minmax(0, 1fr)
      285px;
  }

  .jr .jr-deck-preview-workspace {
    padding: 22px;
  }

  .jr .jr-deck-large-slide {
    padding: 22px;
  }
}

@media (max-width: 800px) {
  .jr .jr-deck-overlay {
    padding: 10px;
  }

  .jr .jr-deck-modal {
    width: 100%;
    height: 96dvh;
    max-height: 96dvh;
  }

  .jr .jr-deck-modal-body {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .jr .jr-deck-preview-workspace {
    flex-shrink: 0;
    padding: 20px;
  }

  .jr .jr-deck-editor-panel {
    overflow: visible;
    border-left: 0;
    border-top: 1px solid #25433f;
  }

  .jr .jr-deck-large-slide {
    min-height: 380px;
  }
}

@media (max-width: 550px) {
  .jr .jr-deck-modal-header {
    padding: 16px 18px;
  }

  .jr .jr-deck-live-status {
    display: none;
  }

  .jr .jr-deck-preview-workspace {
    padding: 15px;
    overflow-x: auto;
  }

  .jr .jr-deck-large-slide {
    width: 100%;
    min-width: 0;
    min-height: 360px;

    padding: 17px;
  }

  .jr .jr-deck-large-heading h2 {
    font-size: 22px;
  }

  .jr .jr-deck-large-masthead > span:last-child {
    display: none;
  }

  .jr .jr-deck-large-timeline,
  .jr .jr-deck-large-staffing,
  .jr .jr-deck-large-ownership {
    overflow-x: auto;
  }

  .jr .jr-deck-large-timeline {
    min-width: 380px;
  }

  .jr .jr-deck-large-ownership {
    grid-template-columns: 1fr;
  }

  .jr .jr-deck-large-owner + .jr-deck-large-owner {
    border-left: 0;
    border-top: 1px solid #33544b;
  }

  .jr .jr-deck-large-risks {
    grid-template-columns: 1fr;
  }

  .jr .jr-deck-modal-footer {
    padding: 12px 16px;
    flex-wrap: wrap;
  }
}

@media (prefers-reduced-motion: reduce) {
  .jr .jr-deck-overlay {
    animation: none;
  }
}


/* ================================================
   JENZABAR IMPLEMENTATION PLAN
   TYPOGRAPHY — MATCH BASELINE BUILDER
   ================================================ */

/* 01. GLOBAL FONT CONSISTENCY */

#map,
#map button,
#map input,
#map select,
#map h2,
#map h3,
#map h4,
#map strong,
#map span,
#map small,
#map p,
#map b {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
}

#map {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ================================================
   02. MAIN SECTION HEADING
   SAME STYLE AS "START WITH YOUR INSTITUTION"
   ================================================ */

/* Section eyebrow */

#map .jr-section-head .jr-kicker {
  display: block;

  color: #57d8b0;

  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
  line-height: 1.5;

  margin-bottom: 0;
}

/* Main H2 */

#map .jr-section-head h2 {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: clamp(38px, 3.8vw, 58px);
  font-weight: 760;
  letter-spacing: -0.058em;
  line-height: 1.06;

  color: #f7fcfa;

  max-width: 860px;
  margin-top: 22px;
}

/* Supporting description */

#map .jr-section-head > p {
  font-size: 17px;
  font-weight: 450;
  line-height: 1.7;

  color: #fafafa;

  max-width: 450px;
}

/* Section heading spacing */

#map .jr-section-head {
  margin-bottom: 40px;
  gap: 50px;
}

/* ================================================
   03. FOUR EXECUTIVE KPI CARDS
   ================================================ */

/* Metric labels */

#map .jr-summary-row span {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  color: #91b6a8;

  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.13em;
  line-height: 1.5;
}

/* Main metric numbers */

#map .jr-summary-row strong {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: clamp(23px, 2.15vw, 31px);
  font-weight: 750;
  letter-spacing: -0.055em;
  line-height: 1.18;

  color: #f6fcf9;

  margin-top: 11px;
  white-space: nowrap;
}

/* Supporting metric text */

#map .jr-summary-row small {
  font-size: 12px;
  font-weight: 450;
  line-height: 1.6;

  color: #9cb9ac;

  margin-top: 9px;
}

/* Align to target action */

#map .jr-summary-row button {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.01em;

  color: #64dfb4;
  margin-top: 11px;
}

/* KPI card proportions */

#map .jr-summary-row > div {
  padding: 26px 27px;
  min-height: 128px;
}

/* ================================================
   04. LIVE IMPLEMENTATION TIMELINE HEADER
   ================================================ */

/* LIVE SCENARIO eyebrow */

#map .jr-status {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;

  color: #51d9ac;
}

/* "Your implementation timeline" */

#map .jr-map-top h3 {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 32px;
  font-weight: 760;
  letter-spacing: -0.05em;
  line-height: 1.15;

  color: #f7fcfa;

  margin-top: 12px;
}

/* Plan start and workstreams */

#map .jr-map-top p {
  font-size: 14px;
  font-weight: 450;
  line-height: 1.65;

  color: #a4c1b5;

  margin-top: 10px;
}

/* Timeline header spacing */

#map .jr-map-top {
  padding: 28px 28px 26px;
}

/* ================================================
   05. TIMELINE / PHASES / MONTH DETAIL TABS
   ================================================ */

#map .jr-segment button {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 12px;
  font-weight: 550;
  letter-spacing: -0.01em;

  color: #a9c4b9;
}

#map .jr-segment button.active {
  font-weight: 750;
  color: #052c26;
}

/* ================================================
   06. GANTT CHART LABELS
   ================================================ */

/* PROJECT PHASE heading */

#map .jr-gantt-labelhead {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.13em;

  color: #96b7aa;
}

/* Month headings */

#map .jr-gantt-monthhead b {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 11px;
  font-weight: 650;
  letter-spacing: -0.01em;

  color: #c3ddd0;
}

/* Year label */

#map .jr-gantt-monthhead small {
  font-size: 9px;
  font-weight: 750;

  color: #58dcae;
}

/* Project phase names */

#map .jr-gantt-label {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.015em;

  color: #d9ede3;
}

/* Active project phase */

#map .jr-gantt-row.selected .jr-gantt-label {
  font-weight: 750;
  color: #68e7be;
}

/* Duration labels on thin bars */

#map .jr-gantt-bar span {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0;
  line-height: 1;
}

/* IMPORTANT:
   Gantt bar heights and positions are unchanged.
   Keep your existing 12px bars.
*/

/* ================================================
   07. CAMPUS WINDOWS AND LEGEND
   ================================================ */

#map .jr-gantt-risklabel {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;

  color: #97b7aa;
}

#map .jr-legend span {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 11px;
  font-weight: 500;

  color: #abc5b9;
}

#map .jr-map-note {
  font-size: 10px;
  font-weight: 450;
  line-height: 1.5;

  color: #8fac9e;
}

/* ================================================
   08. SELECTED PROJECT PHASE PANEL
   ================================================ */

/* Selected project phase eyebrow */

#map .jr-inspector-head .jr-kicker {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;

  color: #53d9ac;
}

/* Data migration, integrations, etc. */

#map .jr-inspector-head h3 {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 32px;
  font-weight: 760;
  letter-spacing: -0.05em;
  line-height: 1.16;

  color: #f7fcfa;

  margin: 11px 0;
}

/* Description */

#map .jr-inspector-head p {
  font-size: 15px;
  font-weight: 450;
  line-height: 1.7;

  color: #abc9ba;

  max-width: 780px;
}

/* Shared (proposed) label */

#map .jr-owner-tag {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

/* Dates */

#map .jr-inspector-date {
  font-size: 13px;
  font-weight: 650;
  letter-spacing: -0.015em;

  color: #e8f6ee;
}

/* Deliverable label */

#map .jr-inspector-footer small {
  font-size: 11px;
  font-weight: 500;

  color: #91b1a1;
}

/* Deliverable value */

#map .jr-inspector-footer strong {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.015em;

  color: #f0faf5;
}

/* Adjustment controls */

#map .jr-adjust > span {
  font-size: 11px;
  font-weight: 550;

  color: #a4c2b3;
}

/* ================================================
   09. PHASES AND MONTH DETAIL VIEWS
   ================================================ */

#map .jr-phase-tile strong {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 15px;
  font-weight: 720;
  letter-spacing: -0.025em;
  line-height: 1.3;
}

#map .jr-phase-tile small {
  font-size: 11px;
  font-weight: 550;
  line-height: 1.5;
}

#map .jr-month-cards strong {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 15px;
  font-weight: 720;
  letter-spacing: -0.025em;
}

#map .jr-month-cards span,
#map .jr-month-cards small {
  font-size: 11px;
  font-weight: 500;
  line-height: 1.5;
}

/* ================================================
   10. RESPONSIVE TYPOGRAPHY
   ================================================ */

@media (max-width: 1050px) {
  #map .jr-section-head {
    gap: 28px;
  }

  #map .jr-section-head h2 {
    font-size: clamp(36px, 4.5vw, 48px);
  }

  #map .jr-section-head > p {
    font-size: 15px;
  }

  #map .jr-summary-row strong {
    font-size: 25px;
  }
}

@media (max-width: 760px) {
  #map .jr-section-head h2 {
    font-size: clamp(34px, 7vw, 43px);
  }

  #map .jr-section-head > p {
    font-size: 14px;
    margin-top: 17px;
  }

  #map .jr-section-head {
    margin-bottom: 28px;
  }

  #map .jr-summary-row strong {
    font-size: 24px;
  }

  #map .jr-map-top h3 {
    font-size: 27px;
  }

  #map .jr-inspector-head h3 {
    font-size: 27px;
  }

  #map .jr-inspector-head p {
    font-size: 13px;
  }
}

@media (max-width: 610px) {
  #map .jr-summary-row > div {
    padding: 21px 20px;
  }

  #map .jr-map-top {
    padding: 22px 18px;
  }

  #map .jr-section-head h2 {
    font-size: clamp(32px, 8vw, 40px);
  }

  #map .jr-inspector-head h3 {
    font-size: 25px;
  }

  #map .jr-gantt-label {
    font-size: 11px;
  }
}


/* ============================================
   05 / LEADERSHIP READOUT
   MATCH BASELINE BUILDER TYPOGRAPHY
   ============================================ */

/* Consistent Inter typography */

#brief,
#brief button,
#brief h2,
#brief h3,
#brief strong,
#brief span,
#brief p,
#brief small,
#brief b {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
}

/* Section eyebrow */

#brief .jr-brief-copy .jr-kicker {
  display: block;
  color: #57d8b0;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
  line-height: 1.5;
}

/* Main headline */

#brief .jr-brief-copy h2 {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: clamp(37px, 3.3vw, 49px);
  font-weight: 760;
  letter-spacing: -0.058em;
  line-height: 1.08;

  color: #f7fcfa;

  max-width: 570px;
  margin: 21px 0 20px;
}

/* Supporting paragraph */

#brief .jr-brief-copy > p:not(.jr-brief-disclaimer) {
  font-size: 15px;
  font-weight: 450;
  line-height: 1.8;

  color: #b7d2c6;

  max-width: 470px;
}

/* Action buttons */

#brief .jr-brief-actions {
  gap: 12px;
  margin-top: 31px;
}

#brief .jr-brief-actions .jr-btn-mint {
  font-size: 13px;
  font-weight: 720;
  letter-spacing: -0.012em;

  min-height: 49px;
  padding: 0 19px;
  border-radius: 7px;
}

#brief .jr-brief-copy-btn {
  font-size: 12px;
  font-weight: 650;

  min-height: 49px;
  padding: 0 16px;
  border-radius: 7px;
}

/* Small disclaimer */

#brief .jr-brief-disclaimer {
  font-size: 11px;
  font-weight: 450;
  line-height: 1.65;

  color: #8bab9e;
  margin-top: 18px;
  max-width: 450px;
}

/* ============================================
   CAROUSEL NAVIGATION TABS
   ============================================ */

#brief .jr-slide-tabs button {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 12px;
  font-weight: 550;
  letter-spacing: -0.012em;

  color: #aac6b9;

  padding: 14px 4px 15px;
  transition: color 0.2s ease;
}

#brief .jr-slide-tabs button:hover {
  color: #ffffff;
}

#brief .jr-slide-tabs button.active,
#brief .jr-slide-tabs button[aria-selected="true"] {
  color: #aaf1d1;
  font-weight: 750;
  border-bottom-color: #59dfaf;
}

/* ============================================
   FLOATING PRESENTATION CARDS
   ============================================ */

/* Card numbering */

#brief .jr-deck-number {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: #a2cdb9;
}

/* Card titles: remove Georgia */

#brief .jr-mini-slide .jr-deck-title {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 16px;
  font-weight: 730;
  letter-spacing: -0.04em;
  line-height: 1.2;

  color: #f7fcfa;

  margin: 10px 0 6px;
  min-height: 40px;
}

/* Card supporting figures */

#brief .jr-mini-slide .jr-deck-subtitle {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 10px;
  font-weight: 450;
  letter-spacing: -0.005em;
  line-height: 1.5;

  color: #a6c8b8;
}

/* Maintain the active card highlight */

#brief .jr-mini-slide.active {
  border-color: #4ce0ad;

  box-shadow:
    0 0 0 1px rgba(72, 219, 172, 0.22),
    0 24px 50px rgba(0, 0, 0, 0.46),
    0 0 24px rgba(61, 218, 161, 0.10);
}

/* Document preview type */

#brief .jr-deck-preview-heading {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 7px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

#brief .jr-deck-cover b {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 11px;
  font-weight: 750;
  letter-spacing: -0.035em;
  line-height: 1.2;
}

/* Slide navigation below carousel */

#brief .jr-slide-controls {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 12px;
  font-weight: 500;
  color: #b6d3c5;
}

#brief .jr-slide-controls strong {
  font-weight: 750;
  color: #ffffff;
}

/* ============================================
   FAQ / PREMIUM WHITE SECTION
   ============================================ */

#faq {
  background: #ffffff;
  color: #10252f;

  padding: 110px 0 120px;
  scroll-margin-top: 110px;
}

/* Inter throughout the FAQ */

#faq,
#faq h2,
#faq button,
#faq span,
#faq strong,
#faq small,
#faq p,
#faq a {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
}

/* Main FAQ layout */

#faq .jr-faq-layout {
  display: grid;
  grid-template-columns:
    minmax(0, 0.88fr)
    minmax(0, 1.12fr);

  gap: clamp(45px, 6vw, 105px);
  align-items: start;
}

/* ============================================
   FAQ LEFT COLUMN
   ============================================ */

/* FAQ eyebrow */

#faq .jr-kicker {
  display: block;

  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.17em;
  line-height: 1.5;

  color: #087b67;
}

/* Large heading: same typography as baseline */

#faq h2 {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: clamp(36px, 3.35vw, 51px);
  font-weight: 760;
  letter-spacing: -0.058em;
  line-height: 1.09;

  color: #081d2b;

  margin: 20px 0 20px;
}

/* Introductory paragraph */

#faq .jr-faq-layout > div:first-child > p {
  font-size: 15px;
  font-weight: 450;
  line-height: 1.8;

  color: #011522;

  max-width: 420px;
}

/* Discuss implementation link */

#faq .jr-inline-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  margin-top: 28px;

  font-size: 13px;
  font-weight: 750;
  letter-spacing: -0.015em;

  color: #087760 !important;

  text-decoration: none;
  transition: color 0.18s ease;
}

#faq .jr-inline-link:hover {
  color: #034b3b !important;
  text-decoration: underline;
  text-underline-offset: 5px;
}

/* ============================================
   FAQ RIGHT COLUMN — ACCORDION
   ============================================ */

#faq .jr-faq-list {
  width: 100%;
  min-width: 0;
  border-top: 1px solid #dbe5e1;
}

/* Clean dividers between questions */

#faq .jr-faq-item {
  border-bottom: 1px solid #dbe5e1;
  background: transparent;
}

#faq .jr-faq-item:first-child {
  border-top: 0;
}

/* Entire clickable question */

#faq .jr-faq-item > button {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  width: 100%;
  gap: 24px;

  padding: 25px 0;

  border: none;
  border-radius: 0;
  background: transparent;

  color: #102b34;
  text-align: left;

  cursor: pointer;
  transition: color 0.18s ease;
}

/* Number + question */

#faq .jr-faq-item > button > span {
  display: flex;
  align-items: baseline;
  gap: 20px;

  flex: 1;
  min-width: 0;

  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.5;

  color: #102b34;
}

/* Question number */

#faq .jr-faq-item button small {
  display: inline-block;
  flex-shrink: 0;
  min-width: 22px;

  font-size: 11px;
  font-weight: 750;
  letter-spacing: 0.02em;

  color: #79968a;
}

/* Minimal plus/minus indicator */

#faq .jr-faq-item > button > svg {
  flex-shrink: 0;

  width: 18px;
  height: 18px;

  margin-top: 4px;

  color: #285d50;
  stroke-width: 1.7;

  transition: transform 0.2s ease;
}

/* Hover */

#faq .jr-faq-item > button:hover > span {
  color: #06765c;
}

#faq .jr-faq-item > button:hover > svg {
  color: #087b62;
}

/* Active/expanded question */

#faq .jr-faq-item > button[aria-expanded="true"] {
  padding-bottom: 12px;
}

#faq .jr-faq-item > button[aria-expanded="true"] > span {
  color: #076b55;
  font-weight: 750;
}

#faq .jr-faq-item > button[aria-expanded="true"] small {
  color: #087b62;
}

/* ============================================
   FAQ ANSWERS — BIGGER AND MORE READABLE
   ============================================ */

#faq .jr-faq-item > p {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 15px;
  font-weight: 450;
  line-height: 1.85;
  letter-spacing: -0.005em;

  color: #011522;

  max-width: 680px;

  margin: 0;
  padding: 3px 42px 28px;
}

/* Keyboard navigation */

#faq .jr-faq-item > button:focus-visible {
  outline: 2px solid #0b9675;
  outline-offset: -2px;
  border-radius: 4px;
}

/* ============================================
   RESPONSIVE / BOTH SECTIONS
   ============================================ */

@media (max-width: 1100px) {
  #brief .jr-brief-copy h2 {
    font-size: clamp(37px, 4vw, 48px);
  }

  #faq .jr-faq-layout {
    gap: 45px;
  }

  #faq h2 {
    font-size: clamp(36px, 4.3vw, 46px);
  }
}

@media (max-width: 900px) {
  #brief .jr-brief-grid {
    grid-template-columns: 1fr;
    gap: 45px;
  }

  #brief .jr-brief-copy {
    max-width: 700px;
  }

  #faq .jr-faq-layout {
    grid-template-columns: 1fr;
    gap: 45px;
  }

  #faq .jr-faq-layout > div:first-child {
    max-width: 650px;
  }

  #faq h2 {
    max-width: 650px;
  }
}

@media (max-width: 610px) {
  #brief .jr-brief-copy h2 {
    font-size: clamp(34px, 8vw, 43px);
  }

  #brief .jr-brief-copy > p:not(.jr-brief-disclaimer) {
    font-size: 14px;
  }

  #brief .jr-brief-actions {
    flex-direction: column;
    align-items: stretch;
  }

  #brief .jr-brief-actions .jr-btn-mint,
  #brief .jr-brief-copy-btn {
    width: 100%;
  }

  #brief .jr-mini-slide .jr-deck-title {
    font-size: 15px;
  }

  #faq {
    padding: 72px 0 85px;
  }

  #faq h2 {
    font-size: clamp(32px, 8vw, 40px);
  }

  #faq .jr-faq-layout > div:first-child > p {
    font-size: 14px;
  }

  #faq .jr-faq-item > button {
    padding: 22px 0;
    gap: 12px;
  }

  #faq .jr-faq-item > button > span {
    font-size: 15px;
    gap: 12px;
    line-height: 1.45;
  }

  #faq .jr-faq-item > p {
    font-size: 14px;
    line-height: 1.75;
    padding: 2px 20px 24px 34px;
  }
}


  


/* ============================================
   FINAL CTA — PREMIUM ENTERPRISE DESIGN
   MATCH BASELINE BUILDER TYPOGRAPHY
   ============================================ */

/* SECTION BACKGROUND */

.jr .jr-final {
  background: #082525;
  color: #ffffff;

  padding: 76px 0 80px;

  border-top: 1px solid #244641;
  border-bottom: 0;
}

/* MATCH BASELINE BUILDER WIDTH */

 

/* LAYOUT */

.jr .jr-final-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 50px;
}

/* CONSISTENT FONT */

.jr .jr-final,
.jr .jr-final h2,
.jr .jr-final p,
.jr .jr-final span,
.jr .jr-final a,
.jr .jr-final button {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
}

/* ============================================
   LEFT CONTENT
   ============================================ */

.jr .jr-final-copy {
  min-width: 0;
}

/* EYEBROW */

.jr .jr-final .jr-kicker {
  display: block;

  color: #66dab2;

  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
  line-height: 1.5;

  margin-bottom: 20px;
}

/* MAIN HEADING */

.jr .jr-final h2 {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: clamp(34px, 3.25vw, 48px);
  font-weight: 760;
  letter-spacing: -0.058em;
  line-height: 1.09;

  color: #f7fcfa;

  max-width: 810px;
  margin: 0 0 19px;
}

/* SUPPORTING COPY */

.jr .jr-final p {
  font-size: 15px;
  font-weight: 450;
  line-height: 1.8;

  color: #b9d3c8;

  max-width: 590px;
  margin: 0;
}

/* ============================================
   CTA BUTTONS
   ============================================ */

.jr .jr-final-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  flex-wrap: wrap;
}

/* PRIMARY BUTTON */

.jr .jr-final .jr-btn-mint {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 13px;

  min-height: 52px;
  padding: 0 22px;

  background: #aee6d2;
  border: 1px solid #aee6d2;
  border-radius: 7px;

  color: #011522 !important;

  font-size: 13px;
  font-weight: 750;
  letter-spacing: -0.015em;

  text-decoration: none;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

/* PRIMARY BUTTON ICON */

.jr .jr-final .jr-btn-mint svg {
  color: #011522 !important;
  stroke: #011522;
  stroke-width: 1.8;
}

/* PRIMARY BUTTON HOVER */

.jr .jr-final .jr-btn-mint:hover {
  background: #c4f2e0;
  border-color: #c4f2e0;
  color: #011522 !important;
  transform: translateY(-1px);
}

/* SECONDARY BUTTON */

.jr .jr-final .jr-btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  min-height: 52px;
  padding: 0 20px;

  background: transparent;
  border: 1px solid #56736b;
  border-radius: 7px;

  color: #e8f5ef;

  font-size: 13px;
  font-weight: 650;
  letter-spacing: -0.012em;

  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.jr .jr-final .jr-btn-outline:hover {
  background: #123b35;
  border-color: #8fcbb3;
}

/* SECONDARY BUTTON ICON */

.jr .jr-final .jr-btn-outline svg {
  color: #d0e8db;
  stroke-width: 1.7;
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 1100px) {
  .jr .jr-final-inner {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .jr .jr-final-actions {
    justify-content: flex-start;
  }

  .jr .jr-final h2 {
    max-width: 750px;
  }
}

@media (max-width: 760px) {
  .jr .jr-final {
    padding: 62px 0 66px;
  }

  .jr .jr-final .jr-wrap {
    width: calc(100% - 36px);
  }

  .jr .jr-final h2 {
    font-size: clamp(32px, 6vw, 41px);
  }

  .jr .jr-final p {
    font-size: 14px;
  }
}

@media (max-width: 550px) {
  .jr .jr-final h2 {
    font-size: clamp(30px, 8vw, 38px);
  }

  .jr .jr-final h2 br {
    display: none;
  }

  .jr .jr-final-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .jr .jr-final-actions .jr-btn {
    width: 100%;
    justify-content: center;
  }

  .jr .jr-final .jr-kicker {
    font-size: 11px;
  }
}


/* ============================================
   HERO — CLEAN PREMIUM ENTERPRISE DESIGN
   ============================================ */

/* 01. SOLID NEAR-BLACK BACKGROUND */

.jr .jr-hero {
  position: relative;
  isolation: isolate;

  background: #041b1c;
  background-image: none;

  color: #ffffff;

  padding: 45px 0 70px;

  overflow: hidden;
}

/* REMOVE THE VERTICAL GRID OVERLAY */

.jr .jr-hero::before,
.jr .jr-hero::after {
  content: none !important;
  display: none !important;
  background: none !important;
}

/* 02. MATCH BASELINE BUILDER WIDTH */

 

/* HERO LAYOUT */

.jr .jr-hero-grid {
  display: grid;

  grid-template-columns:
    minmax(0, 0.88fr)
    minmax(0, 1.12fr);

  gap: 56px;
  align-items: center;

  min-height: 545px;

  position: relative;
  z-index: 1;
}

/* 03. HERO COPY */

.jr .jr-hero-copy {
  position: relative;
  z-index: 2;

  padding: 55px 0 45px;
  min-width: 0;
}

/* CONSISTENT INTER TYPOGRAPHY */

.jr .jr-hero,
.jr .jr-hero h1,
.jr .jr-hero p,
.jr .jr-hero span,
.jr .jr-hero button,
.jr .jr-hero strong {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
}

/* EYEBROW */

.jr .jr-hero .jr-kicker {
  display: block;

  color: #65dcb4;

  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
  line-height: 1.5;

  margin-bottom: 24px;
}

/* 04. MAIN HEADLINE */

.jr .jr-hero h1 {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: clamp(46px, 4.3vw, 69px);
  font-weight: 760;
  letter-spacing: -0.065em;
  line-height: 1.045;

  color: #f7fcfa;

  max-width: 650px;

  margin: 0 0 25px;
}

/* EMPHASISED WORD */

.jr .jr-hero h1 em {
  font-family: inherit;
  font-size: inherit;
  font-style: normal;
  font-weight: inherit;

  color: #aee6d2;
}

/* 05. HERO DESCRIPTION */

.jr .jr-hero-copy > p {
  font-size: 16px;
  font-weight: 450;
  letter-spacing: -0.012em;
  line-height: 1.8;

  color: #b9d4ca;

  max-width: 500px;
  margin: 0;
}

/* 06. HERO BUTTONS */

.jr .jr-hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  gap: 13px;
  margin-top: 32px;
}

/* PRIMARY BUTTON */

.jr .jr-hero .jr-btn-mint {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 13px;

  min-height: 50px;
  padding: 0 21px;

  background: #aee6d2;
  border: 1px solid #aee6d2;
  border-radius: 7px;

  color: #011522 !important;

  font-size: 13px;
  font-weight: 750;
  letter-spacing: -0.012em;

  box-shadow: none;

  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.jr .jr-hero .jr-btn-mint svg {
  color: #fafafa !important;
  stroke: #fafafa !important;
}

.jr .jr-hero .jr-btn-mint:hover {
  background: #25adad;
  border-color: #25adad;

  color: #fafafa !important;
  transform: none;
}

/* SECONDARY BUTTON */

.jr .jr-hero .jr-btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  min-height: 50px;
  padding: 0 20px;

  background: transparent;
  border: 1px solid #54736c;
  border-radius: 7px;

  color: #eaf7f0;

  font-size: 13px;
  font-weight: 650;

  box-shadow: none;
}

.jr .jr-hero .jr-btn-outline:hover {
  background: #10302c;
  border-color: #89b9a6;
  transform: none;
}

/* SMALL DISCLAIMER */

.jr .jr-hero-foot {
  display: flex;
  align-items: center;

  gap: 9px;
  margin-top: 24px;

  font-size: 11px;
  font-weight: 450;
  line-height: 1.6;

  color: #89aca0;
}

.jr .jr-hero-foot svg {
  width: 15px;
  height: 15px;

  color: #83cbb0;
}

/* ============================================
   07. CLEAN DASHBOARD PRESENTATION
   ============================================ */

.jr .jr-hero-visual {
  position: relative;

  width: 100%;
  min-width: 0;

  margin: 0;

  /* REMOVE 3D PERSPECTIVE */

  transform: none !important;
  transform-origin: center;

  /* REMOVE LARGE SHADOW */

  box-shadow: none;

  border-radius: 9px;
}

/* NEW: Replace the mockup with the actual image */
.jr .jr-hero-visual-img {
  background-image: url('images/jenzabar-hero-img.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 450px; /* Adjust this if your image is shorter or taller */
  border-radius: 9px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2); /* Optional: adds a nice shadow to the image */
}

/* Hide the old mockup elements when the image is active */
.jr .jr-hero-visual-img .jr-window-top,
.jr .jr-hero-visual-img .jr-window-body {
  display: none;
}

/* REMOVE DECORATIVE DASHBOARD FRAME */

.jr .jr-hero-visual::before,
.jr .jr-hero-visual::after {
  content: none !important;
  display: none !important;
}

/* DASHBOARD HEADER */

.jr .jr-window-top {
  height: 54px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 14px;
  padding: 0 19px;

  background: #092525;

  border: 1px solid #31524c;
  border-bottom: 1px solid #294740;

  border-radius: 8px 8px 0 0;
}

/* DASHBOARD TITLE */

.jr .jr-window-brand {
  font-size: 12px;
  font-weight: 750;
  letter-spacing: -0.015em;

  color: #eaf9f1;
}

/* SMALL BRAND SYMBOL */

.jr .jr-window-logo {
  font-size: 17px;
  color: #aee6d2;
}

/* WORKSPACE LABEL */

.jr .jr-window-suffix {
  font-size: 10px;
  font-weight: 450;

  color: #83a89b;
}

/* ILLUSTRATIVE PREVIEW LABEL */

.jr .jr-live-dot {
  font-size: 10px;
  font-weight: 500;

  color: #93b9aa;
}

/* DASHBOARD BODY */

.jr .jr-window-body {
  display: flex;

  height: 375px;

  background: #071f20;

  border: 1px solid #31524c;
  border-top: 0;

  border-radius: 0 0 8px 8px;

  overflow: hidden;
}

/* DASHBOARD SIDEBAR */

.jr .jr-window-side {
  width: 120px;
  flex-shrink: 0;

  padding: 17px 9px;

  background: #092323;
  border-right: 1px solid #24413b;
}

.jr .jr-window-side span {
  display: flex;
  align-items: center;

  gap: 9px;
  padding: 11px 9px;

  font-size: 10px;
  font-weight: 500;

  color: #8daea2;
}

/* ACTIVE NAVIGATION */

.jr .jr-window-side span.active {
  color: #e7f9ef;

  background: #154139;
  border-radius: 5px;

  font-weight: 650;
}

/* CHART CONTENT */

.jr .jr-window-chart {
  flex: 1;
  min-width: 0;

  padding: 20px 17px 12px;

  background: #071f20;
}

/* CHART HEADING */

.jr .jr-window-chart-head strong {
  font-size: 12px;
  font-weight: 700;

  color: #e7f6ed;
}

.jr .jr-window-chart-head span {
  font-size: 10px;
  color: #a1beaf;
}

/* CHART MONTHS */

.jr .jr-preview-months {
  color: #8dac9f;

  font-size: 9px;
  font-weight: 600;

  letter-spacing: 0.05em;
}

/* CHART PHASE NAMES */

.jr .jr-preview-row > span {
  font-size: 10px;
  font-weight: 500;

  color: #b8d1c5;
}

/* LIGHTER GRID LINES */

.jr .jr-preview-track {
  background: repeating-linear-gradient(
    90deg,
    transparent 0,
    transparent calc(11.11% - 1px),
    #1d3935 calc(11.11% - 1px),
    #1d3935 11.11%
  );
}

.jr .jr-preview-row {
  border-bottom: 1px solid #1b3934;
}

/* CLEANER TIMELINE BARS */

.jr .jr-preview-track b {
  height: 8px;
  top: 12px;

  border-radius: 3px;
  box-shadow: none;
}

/* CAMPUS WINDOW LEGEND */

.jr .jr-preview-warnings {
  color: #9ac5b0;
  font-size: 9px;
}

/* REMOVE THE OVERLAPPING WHITE ALERT CARD */

/* ============================================
   08. RESPONSIVE
   ============================================ */

@media (max-width: 1100px) {
  .jr .jr-hero-grid {
    grid-template-columns: 1fr 1fr;
    gap: 35px;
  }

  .jr .jr-hero h1 {
    font-size: clamp(42px, 4.6vw, 58px);
  }

  .jr .jr-hero-copy {
    padding: 50px 0 40px;
  }
}

@media (max-width: 850px) {
  .jr .jr-hero {
    padding: 40px 0 65px;
  }

  .jr .jr-hero-grid {
    grid-template-columns: 1fr;
    gap: 30px;

    min-height: 0;
  }

  .jr .jr-hero-copy {
    padding: 45px 0 10px;
  }

  .jr .jr-hero h1 {
    font-size: clamp(42px, 6vw, 58px);
    max-width: 700px;
  }

  .jr .jr-hero-visual {
    max-width: 720px;
    margin: 0 auto;
  }
  
  .jr .jr-hero-visual-img {
    min-height: 350px; /* Smaller height for mobile */
  }
}

@media (max-width: 610px) {
  .jr .jr-hero {
    padding: 30px 0 55px;
  }

  .jr .jr-hero .jr-wrap {
    width: calc(100% - 36px);
  }

  .jr .jr-hero-copy {
    padding: 36px 0 5px;
  }

  .jr .jr-hero .jr-kicker {
    font-size: 11px;
    margin-bottom: 18px;
  }

  .jr .jr-hero h1 {
    font-size: clamp(36px, 9vw, 47px);
    line-height: 1.07;
    letter-spacing: -0.055em;

    margin-bottom: 20px;
  }

  .jr .jr-hero-copy > p {
    font-size: 14px;
    line-height: 1.75;
  }

  .jr .jr-hero-actions {
    flex-direction: column;
    align-items: stretch;

    margin-top: 26px;
  }

  .jr .jr-hero-actions .jr-btn {
    width: 100%;
    justify-content: center;
  }

  .jr .jr-hero-visual {
    overflow-x: auto;
  }

  .jr .jr-window-top,
  .jr .jr-window-body {
    min-width: 580px;
  }
}

/* KEEP YOUR EXISTING PRINT RULES */

/* Preserved structural rules from the original modal layout */

/* Summary row info tooltips on the dark timeline panel */

#map .jr-summary-row .jr-help-dot {
  color: #7ea79a;
  margin-left: 6px;
}

#map .jr-summary-row .jr-help-dot:hover,
#map .jr-summary-row .jr-help-dot:focus-visible {
  color: #7ee5ba;
}

#map .jr-summary-row .jr-help-dot .jr-help-tip {
  top: auto;
  bottom: calc(100% + 10px);

  width: 300px;
  padding: 12px 14px;

  background: #0b2624;
  color: #e8f7ef;

  border: 1px solid #2b5a4e;
  border-radius: 6px;

  font-size: 11.5px;
  line-height: 1.6;

  text-transform: none;
  letter-spacing: 0;

  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.42);

  z-index: 60;
}

#map .jr-summary-row .jr-help-dot .jr-help-tip::after {
  top: 100%;
  bottom: auto;
  border-top-color: #0b2624;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
}

#map .jr-summary-row .jr-help-dot:hover .jr-help-tip,
#map .jr-summary-row .jr-help-dot:focus-visible .jr-help-tip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* Remove uppercase + letter-spacing inherited from the parent span */

#map .jr-summary-row .jr-help-dot,
#map .jr-summary-row .jr-help-dot * {
  text-transform: none;
  letter-spacing: normal;
}

.jr .jr-deck-large-risk > div span {display:flex;flex-direction:column;gap:2px}

.jr .jr-deck-preview-helper {gap:7px}

.jr .jr-deck-editor-bottom > span {display:inline-flex;align-items:center;gap:6px}

.jr .jr-deck-large-heat-row > span {min-width:0}





/* ============================================
   FINAL HERO REFINEMENT
   TALLER ARTWORK + BOLDER TYPOGRAPHY
   ============================================ */

/* SOLID BLACK-GREEN BACKGROUND */

.jr .jr-hero {
  position: relative;
  overflow: hidden;
  isolation: isolate;

  background: #041b1c;
  background-image: none;

  padding: 68px 0 48px;
  color: #ffffff;
}

/* MATCH THE REST OF THE PAGE */

 

/* MORE SPACIOUS HERO LAYOUT */

.jr .jr-hero-grid {
  display: grid;
  grid-template-columns:
    minmax(0, 0.9fr)
    minmax(0, 1.1fr);

  align-items: center;
  gap: 35px;

  min-height: 600px;
  padding: 0;
}

/* LEFT CONTENT */

.jr .jr-hero-copy {
  position: relative;
  z-index: 2;
  min-width: 0;

  padding: 45px 0;
}

/* EYEBROW */

.jr .jr-hero .jr-kicker {
  color: #69ddb3;

  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;

  margin-bottom: 25px;
}

/* BIGGER, BOLDER HERO HEADLINE */

.jr .jr-hero h1 {
  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: clamp(52px, 4.7vw, 76px);
  font-weight: 800;
  letter-spacing: -0.068em;
  line-height: 1.035;

  color: #f8fcfa;

  max-width: 660px;
  margin: 0 0 28px;
}

.jr .jr-hero h1 em {
  font-family: inherit;
  font-style: normal;
  font-weight: inherit;
  color: #aee6d2;
}

/* SUPPORTING PARAGRAPH */

.jr .jr-hero-copy > p {
  max-width: 530px;

  font-family: Inter, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;

  font-size: 16px;
  font-weight: 450;
  line-height: 1.8;

  color: #bed9ce;
}

/* BUTTON SPACING */

.jr .jr-hero-actions {
  gap: 13px;
  margin-top: 33px;
}

.jr .jr-hero-actions .jr-btn {
  min-height: 52px;
  padding-inline: 22px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 750;
}

/* KEEP THE PRIMARY CTA TEXT DARK */

.jr .jr-hero .jr-btn-mint {
  color: #fafafa !important;
}

/* DISCLAIMER */

.jr .jr-hero-foot {
  margin-top: 24px;
  font-size: 11px;
  color: #91b5a6;
}

/* ============================================
   BIGGER RIGHT-SIDE HERO ARTWORK
   ============================================ */

/* CONTAINER */

.jr .jr-hero-visual {
  position: relative;
  z-index: 1;

  width: 100%;
  min-width: 0;
  margin: 0;

  overflow: visible;

  background: transparent;
  border: none;
  box-shadow: none;

  transform: none !important;
}

/* THE ACTUAL TRANSPARENT PNG */

.jr .jr-hero-img {
  display: block;

  width: 115%;
  max-width: none;
  height: auto;

  object-fit: contain;
  object-position: center;

  transform: translateX(-7%);
  transform-origin: center;

  background: transparent;
  border: none;
  box-shadow: none;

  filter: none;
}

/* NO ARTIFICIAL IMAGE FRAME */

.jr .jr-hero-visual::before,
.jr .jr-hero-visual::after {
  content: none !important;
  display: none !important;
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 1150px) {
  .jr .jr-hero {
    padding: 55px 0 75px;
  }

  .jr .jr-hero-grid {
    grid-template-columns:
      minmax(0, 1fr)
      minmax(0, 1fr);

    gap: 25px;
    min-height: 540px;
  }

  .jr .jr-hero h1 {
    font-size: clamp(46px, 4.8vw, 63px);
  }

  .jr .jr-hero-img {
    width: 110%;
    transform: translateX(-5%);
  }
}

@media (max-width: 850px) {
  .jr .jr-hero {
    padding: 40px 0 70px;
  }

  .jr .jr-hero-grid {
    grid-template-columns: 1fr;
    gap: 25px;
    min-height: 0;
    padding: 0;
  }

  .jr .jr-hero-copy {
    padding: 38px 0 10px;
  }

  .jr .jr-hero h1 {
    max-width: 720px;
    font-size: clamp(43px, 6.5vw, 61px);
  }

  .jr .jr-hero-visual {
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    overflow: visible;
  }

  .jr .jr-hero-img {
    width: 100%;
    transform: translateX(0);
  }
}

@media (max-width: 610px) {
  .jr .jr-hero {
    padding: 30px 0 55px;
  }

  .jr .jr-hero .jr-wrap {
    width: calc(100% - 36px);
  }

  .jr .jr-hero-grid {
    gap: 22px;
  }

  .jr .jr-hero-copy {
    padding: 30px 0 0;
  }

  .jr .jr-hero .jr-kicker {
    font-size: 10px;
    margin-bottom: 20px;
  }

  .jr .jr-hero h1 {
    font-size: clamp(37px, 9vw, 49px);
    font-weight: 800;
    line-height: 1.06;
    letter-spacing: -0.06em;

    margin-bottom: 21px;
  }

  .jr .jr-hero-copy > p {
    font-size: 14px;
    line-height: 1.75;
  }

  .jr .jr-hero-actions {
    flex-direction: column;
    align-items: stretch;
    margin-top: 27px;
  }

  .jr .jr-hero-actions .jr-btn {
    width: 100%;
    justify-content: center;
  }

  .jr .jr-hero-visual {
    width: 100%;
    margin: 0;
    overflow: visible;
  }

  .jr .jr-hero-img {
    width: 100%;
    max-width: 100%;
    height: auto;
    transform: translateX(0);
  }
}

/* KEEP YOUR EXISTING PRINT RULES */

/* ==========================================
   PREMIUM GANTT CHART — READABILITY UPDATE
   ========================================== */

/* 1. Increase timeline row height */
#map .jr-gantt-track {
  height: 56px;
}

/* 2. Centre project phase labels */
#map .jr-gantt-label {
  min-height: 56px;
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 13px;
  font-weight: 650;
}

/* 3. Increase green timeline bar height */
#map .jr-gantt-bar {
  top: 15px;
  height: 26px;
  min-height: 26px;

  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow:
    0 2px 5px rgba(0, 0, 0, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

/* 4. Make the duration labels readable */
#map .jr-gantt-bar span {
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.01em;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);
}

/* 5. Preserve selected bar emphasis */
#map .jr-gantt-bar.selected {
  outline: 2px solid #8ccdb6;
  outline-offset: 2px;
}

/* 6. Keep labels readable on lighter bars */
#map .jr-gantt-bar.campus span {
  color: #06372d;
  text-shadow: none;
}

/* ==========================================
   GANTT CHART — MONTHLY STAFF HOURS
   ========================================== */

/* Taller header to fit months and hours */
#map .jr-gantt-labelhead,
#map .jr-gantt-monthhead {
  min-height: 78px;
}

/* Stack month and estimated hours */
#map .jr-gantt-monthhead > .jr-month-header {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 0;
  padding: 15px 2px 8px;
  background: transparent;
}

/* Month name */
#map .jr-gantt-monthhead .jr-month-header > b {
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  padding: 0;
  color: #d4e7df;
}

/* Year label, above January */
#map .jr-gantt-monthhead .jr-month-year {
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 8px;
  font-weight: 750;
  color: #5bdfb5;
}

/* Monthly estimated hours */
#map .jr-gantt-monthhead .jr-month-hours {
  display: block;
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
  color: #60dfba;
  letter-spacing: -0.02em;
}

/* Smaller unit */
#map .jr-gantt-monthhead .jr-month-hours span {
  font-size: 9px;
  font-weight: 600;
}

/* Peak demand month */
#map .jr-gantt-monthhead .jr-month-header.peak {
  background: rgba(47, 190, 148, 0.13);
  box-shadow: inset 0 2px 0 #2fd1a1;
}

#map .jr-gantt-monthhead .jr-month-header.peak .jr-month-hours {
  color: #ffffff;
}

/* Months exceeding combined staff capacity */
#map .jr-gantt-monthhead .jr-month-header.over-capacity .jr-month-hours {
  color: #ffbb85;
}

/* Peak month takes priority when also over capacity */
#map .jr-gantt-monthhead .jr-month-header.peak.over-capacity {
  background: rgba(255, 177, 112, 0.12);
  box-shadow: inset 0 2px 0 #ffbb85;
}

/* Keep the hours readable on smaller screens */
@media (max-width: 768px) {
  #map .jr-gantt-monthhead .jr-month-hours {
    font-size: 11px;
  }

  #map .jr-gantt-monthhead .jr-month-header > b {
    font-size: 10px;
  }
}


/* MONTH DETAIL — INTERACTIVE BREAKDOWN */

#map .jr-month-detail-view {
  padding-bottom: 24px;
}

#map .jr-month-card {
  cursor: pointer;
  transition: border-color .2s, background .2s;
}

#map .jr-month-card.active {
  background: #103b35;
  border-color: #36c9a2;
}

#map .jr-month-card-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

#map .jr-month-peak {
  font-size: 9px;
  font-weight: 750;
  color: #ffbf85;
  text-transform: uppercase;
}

#map .jr-month-card-hours {
  color: #f5fcf8;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -.03em;
}

#map .jr-month-card-hours span {
  color: #91b5aa;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0;
}

#map .jr-month-card-action {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 9px;
  color: #49d7ac !important;
  font-size: 10px !important;
  font-weight: 700;
}

/* Expanded detail panel */

#map .jr-month-breakdown {
  margin: 0 23px;
  padding: 26px;
  border: 1px solid #28534a;
  border-radius: 8px;
  background: #092625;
}

#map .jr-month-breakdown-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

#map .jr-breakdown-kicker {
  color: #4ed9af;
  font-size: 10px;
  letter-spacing: .12em;
  font-weight: 800;
}

#map .jr-month-breakdown h4 {
  margin: 9px 0 5px;
  color: #fff;
  font-size: 24px;
}

#map .jr-month-breakdown-head p,
#map .jr-breakdown-note {
  color: #a0bdb4;
  font-size: 12px;
  line-height: 1.7;
}

#map .jr-breakdown-close {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid #31544c;
  border-radius: 5px;
  color: #bad4ca;
  cursor: pointer;
}

/* Summary metrics */

#map .jr-breakdown-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 24px 0 28px;
}

#map .jr-breakdown-summary > div {
  padding: 17px;
  background: #103532;
  border: 1px solid #255048;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

#map .jr-breakdown-summary span {
  font-size: 11px;
  color: #a1bdb4;
}

#map .jr-breakdown-summary strong {
  font-size: 21px;
  font-weight: 750;
  color: #fff;
}

/* Department workload */

#map .jr-breakdown-section-title,
#map .jr-breakdown-role-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

#map .jr-month-breakdown h5 {
  font-size: 14px;
  font-weight: 750;
  color: #f3fbf7;
}

#map .jr-breakdown-section-title > span {
  color: #94b4a9;
  font-size: 11px;
}

#map .jr-breakdown-roles {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px 30px;
  margin-top: 23px;
}

#map .jr-breakdown-role-top {
  margin-bottom: 10px;
  font-size: 12px;
  color: #d7e9e2;
}

#map .jr-breakdown-role-top strong {
  color: #fff;
  font-size: 12px;
}

#map .jr-breakdown-progress {
  height: 7px;
  overflow: hidden;
  border-radius: 10px;
  background: #254640;
}

#map .jr-breakdown-progress > div {
  height: 100%;
  background: #38c99e;
  border-radius: inherit;
  transition: width .2s ease;
}

#map .jr-breakdown-progress > div.over {
  background: #efab72;
}

#map .jr-breakdown-summary .jr-negative,
#map .jr-breakdown-role-top .jr-negative {
  color: #ffbf85;
}

#map .jr-breakdown-shortfall {
  display: block;
  color: #ffbf85;
  margin-top: 7px;
  font-size: 10px;
}

/* Active phases */

#map .jr-breakdown-phases {
  margin-top: 28px;
  padding-top: 22px;
  border-top: 1px solid #285047;
}

#map .jr-breakdown-phases > div {
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
  margin-top: 13px;
}

#map .jr-breakdown-phases > div > span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border: 1px solid #28534b;
  border-radius: 5px;
  color: #cce4da;
  font-size: 11px;
}

#map .jr-breakdown-note {
  margin-top: 24px;
  padding-top: 14px;
  border-top: 1px solid #24473e;
}

@media (max-width: 700px) {
  #map .jr-month-breakdown {
    margin: 0 13px;
    padding: 18px;
  }

  #map .jr-breakdown-summary {
    grid-template-columns: 1fr;
  }

  #map .jr-breakdown-roles {
    grid-template-columns: 1fr;
  }
}



/* MONTHLY IMPLEMENTATION ACTIVITIES */

#map .jr-month-activities {
  margin-top: 28px;
  padding-top: 26px;
  border-top: 1px solid #285047;
}

#map .jr-month-activities-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

#map .jr-month-activities-heading h5 {
  margin: 8px 0;
  font-size: 19px;
  font-weight: 750;
  color: #ffffff;
}

#map .jr-month-activities-heading p {
  color: #a3bfb4;
  font-size: 12px;
  line-height: 1.6;
}

#map .jr-activities-count {
  font-size: 11px;
  color: #a5c4b8;
  white-space: nowrap;
}

#map .jr-month-activities-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

#map .jr-month-activity {
  display: flex;
  gap: 15px;
  padding: 22px;
  background: #0d2c29;
  border: 1px solid #285047;
  border-radius: 8px;
}

#map .jr-month-activity-number {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  background: #174339;
  border-radius: 5px;
  color: #55dfaf;
  font-size: 12px;
  font-weight: 800;
}

#map .jr-month-activity-content {
  flex: 1;
  min-width: 0;
}

#map .jr-month-activity-top {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  align-items: flex-start;
}

#map .jr-month-activity-top h6 {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 750;
  color: #ffffff;
}

#map .jr-month-activity-stage {
  font-size: 12px;
  color: #55d8ac;
}

#map .jr-month-phase-position {
  color: #abc5ba;
  font-size: 11px;
  white-space: nowrap;
}

#map .jr-month-phase-progress {
  height: 4px;
  background: #285047;
  border-radius: 6px;
  margin: 18px 0 20px;
  overflow: hidden;
}

#map .jr-month-phase-progress > div {
  height: 100%;
  background: #3dcca2;
  border-radius: inherit;
}

#map .jr-month-activity-tasks {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

#map .jr-month-activity-tasks > div {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #d2e5dc;
  font-size: 12px;
  line-height: 1.65;
}

#map .jr-month-activity-tasks svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: #4ed7a9;
}

#map .jr-month-activity-outcome {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #285047;
}

#map .jr-month-activity-outcome > span {
  color: #82a99b;
  font-size: 10px;
  font-weight: 750;
  letter-spacing: .08em;
}

#map .jr-month-activity-outcome strong {
  color: #e9f7ef;
  font-size: 12px;
  font-weight: 650;
}

@media (max-width: 700px) {
  #map .jr-month-activities-heading,
  #map .jr-month-activity-top {
    flex-wrap: wrap;
  }

  #map .jr-month-activity {
    padding: 16px;
    gap: 10px;
  }
}

/* ==========================================
   PREMIUM IMPLEMENTATION PHASE MODAL
   ========================================== */

.jr-phase-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
  background: rgba(0, 15, 16, 0.86);
  backdrop-filter: blur(8px);
}

.jr-phase-modal.jr-phase-modal-upgraded {
  position: relative;
  width: min(1040px, 100%);
  max-width: 1040px;
  max-height: min(90vh, 1000px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  background: #071f20;
  color: #edf8f3;
  border: 1px solid #28504a;
  border-radius: 12px;
  box-shadow: 0 35px 110px rgba(0, 0, 0, .4);
  scrollbar-width: thin;
  scrollbar-color: #315a51 #071f20;
}

/* Modal close */

.jr-phase-modal-upgraded .jr-phase-close {
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 4;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: #133633;
  border: 1px solid #31554c;
  color: #e8f6ef;
  cursor: pointer;
}

/* Header */

.jr-pm-header {
  padding: 42px 45px 30px;
  border-bottom: 1px solid #25463f;
}

.jr-pm-eyebrow {
  color: #4cdbad;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .13em;
}

.jr-pm-header h3 {
  color: #ffffff;
  font-family: inherit;
  font-size: clamp(28px, 3vw, 37px);
  font-weight: 750;
  letter-spacing: -.045em;
  line-height: 1.15;
  margin: 12px 50px 12px 0;
}

.jr-pm-header > p {
  color: #acc8bd;
  max-width: 740px;
  line-height: 1.7;
  font-size: 13px;
}

.jr-pm-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 13px;
  margin-top: 22px;
}

.jr-pm-meta > span:not(.jr-owner-tag) {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 12px;
  border: 1px solid #295047;
  border-radius: 5px;
  color: #d3e7dd;
  font-size: 11px;
}

/* Three-column summary */

.jr-pm-summary {
  display: grid;
  grid-template-columns: 1fr 1fr 1.6fr;
  border-bottom: 1px solid #25463f;
  background: #0b2928;
}

.jr-pm-summary > div {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
  padding: 24px 32px;
  border-right: 1px solid #25463f;
}

.jr-pm-summary > div:last-child {
  border-right: 0;
}

.jr-pm-summary span {
  font-size: 9px;
  color: #8faea2;
  font-weight: 800;
  letter-spacing: .1em;
}

.jr-pm-summary strong {
  color: #ffffff;
  font-size: 19px;
  line-height: 1.35;
  font-weight: 700;
}

.jr-pm-summary > div:last-child strong {
  font-size: 13px;
}

/* Monthly plan */

.jr-pm-body {
  padding: 36px 45px 40px;
}

.jr-pm-section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.jr-pm-section-heading h4,
.jr-pm-controls-heading h4 {
  color: #ffffff;
  font-size: 23px;
  letter-spacing: -.03em;
  margin: 9px 0;
}

.jr-pm-section-heading p,
.jr-pm-controls-heading p {
  color: #9fbaaf;
  font-size: 12px;
  line-height: 1.7;
}

.jr-pm-count {
  font-size: 11px;
  color: #a8c5ba;
  white-space: nowrap;
}

.jr-pm-month-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.jr-pm-month {
  display: grid;
  grid-template-columns: 37px minmax(0, 1fr);
  gap: 16px;
}

.jr-pm-month-rail {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.jr-pm-month-number {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  background: #164b3e;
  border: 1px solid #2b7a61;
  color: #75e5bc;
  font-size: 11px;
  font-weight: 800;
  border-radius: 6px;
}

.jr-pm-rail-line {
  flex: 1;
  min-height: 24px;
  width: 1px;
  background: #31564c;
}

.jr-pm-month-card {
  margin-bottom: 18px;
  border: 1px solid #2b4a44;
  border-radius: 8px;
  background: #0d2928;
  overflow: hidden;
}

.jr-pm-month-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 22px 25px;
  border-bottom: 1px solid #2b4a44;
}

.jr-pm-month-date {
  color: #4fdbad;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .08em;
}

.jr-pm-month-top h5 {
  margin: 7px 0 0;
  color: #ffffff;
  font-size: 17px;
  font-weight: 750;
}

.jr-pm-hours {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
  white-space: nowrap;
}

.jr-pm-hours strong {
  color: #ffffff;
  font-size: 22px;
}

.jr-pm-hours span {
  color: #9ab5a9;
  font-size: 10px;
}

/* Activities */

.jr-pm-activities {
  padding: 22px 25px 15px;
}

.jr-pm-small-heading {
  display: block;
  color: #83a99b;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .08em;
  margin-bottom: 15px;
}

.jr-pm-activities > div {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  margin-bottom: 14px;
}

.jr-pm-task-marker {
  color: #56d7aa;
  font-size: 11px;
  font-weight: 800;
  flex-shrink: 0;
  padding-top: 2px;
}

.jr-pm-activities p {
  color: #d6e6df;
  font-size: 12px;
  line-height: 1.65;
  margin: 0;
}

/* Expected outcome */

.jr-pm-month-outcome {
  margin: 0 25px;
  padding: 18px 0;
  border-top: 1px solid #28483f;
}

.jr-pm-month-outcome > div {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.jr-pm-month-outcome span {
  font-size: 9px;
  color: #88aa9d;
  font-weight: 800;
  letter-spacing: .08em;
}

.jr-pm-month-outcome strong {
  font-size: 12px;
  color: #e8f8ef;
  font-weight: 650;
}

/* Staffing */

.jr-pm-role-effort {
  padding: 20px 25px;
  background: #11332f;
  border-top: 1px solid #2b5047;
}

.jr-pm-roles {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 15px 20px;
}

.jr-pm-roles > div {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  font-size: 11px;
}

.jr-pm-roles span {
  color: #acc9bd;
}

.jr-pm-roles strong {
  color: #ffffff;
  white-space: nowrap;
}

/* Academic risk */

.jr-pm-risk {
  display: flex;
  gap: 12px;
  padding: 17px 25px;
  background: rgba(194, 120, 57, .10);
  border-top: 1px solid rgba(215, 151, 78, .22);
}

.jr-pm-risk > svg {
  flex-shrink: 0;
  color: #eeb173;
}

.jr-pm-risk strong {
  color: #f1c18d;
  font-size: 12px;
}

.jr-pm-risk p {
  color: #d6b99a;
  font-size: 11px;
  line-height: 1.6;
  margin-top: 5px;
}

/* Schedule controls */

.jr-pm-controls {
  padding: 32px 45px 38px;
  background: #0a2625;
  border-top: 1px solid #285048;
}

.jr-pm-control-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px;
  margin-top: 22px;
}

.jr-pm-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: #103532;
  border: 1px solid #2b5149;
  border-radius: 7px;
  padding: 17px;
}

.jr-pm-control > div:first-child {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.jr-pm-control strong {
  color: #ffffff;
  font-size: 12px;
}

.jr-pm-control span {
  color: #9ebdb0;
  font-size: 11px;
}

.jr-pm-stepper {
  display: flex;
  gap: 7px;
}

.jr-pm-stepper button {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 1px solid #36645a;
  border-radius: 5px;
  color: #d9f3e7;
  background: #18453b;
  cursor: pointer;
}

.jr-pm-stepper button:hover:not(:disabled) {
  background: #22614e;
}

.jr-pm-stepper button:disabled {
  opacity: .35;
  cursor: not-allowed;
}

.jr-pm-disclaimer {
  margin-top: 22px;
  color: #8eaea1;
  font-size: 11px;
  line-height: 1.7;
}

/* Responsive */

@media (max-width: 700px) {
  .jr-phase-overlay {
    padding: 12px;
  }

  .jr-phase-modal.jr-phase-modal-upgraded {
    max-height: 94vh;
  }

  .jr-pm-header,
  .jr-pm-body,
  .jr-pm-controls {
    padding-left: 20px;
    padding-right: 20px;
  }

  .jr-pm-summary {
    grid-template-columns: 1fr;
  }

  .jr-pm-summary > div {
    border-right: 0;
    border-bottom: 1px solid #25463f;
    padding: 16px 20px;
  }

  .jr-pm-month {
    grid-template-columns: 24px minmax(0, 1fr);
    gap: 8px;
  }

  .jr-pm-month-number {
    width: 24px;
    height: 24px;
    font-size: 9px;
  }

  .jr-pm-month-top {
    flex-wrap: wrap;
    padding: 18px;
  }

  .jr-pm-hours {
    align-items: flex-start;
  }

  .jr-pm-activities {
    padding: 18px;
  }

  .jr-pm-month-outcome {
    margin: 0 18px;
  }

  .jr-pm-role-effort,
  .jr-pm-risk {
    padding: 18px;
  }

  .jr-pm-roles,
  .jr-pm-control-grid {
    grid-template-columns: 1fr;
  }

  .jr-pm-section-heading {
    flex-wrap: wrap;
  }
}
  
/* ==========================================
   DEPARTMENTAL CAPACITY REVIEW
   ========================================== */

#staffing .jr-capacity-review {
  margin-top: 16px;
  background: #f7faf8;
  border: 1px solid #dce9e2;
  border-radius: 9px;
  padding: 26px;
  color: #09232b;
}

/* Header */

#staffing .jr-capacity-review-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 23px;
}

#staffing .jr-capacity-eyebrow {
  display: block;
  color: #16836d;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .1em;
}

#staffing .jr-capacity-review-header h3 {
  margin: 9px 0 5px;
  color: #081f2a;
  font-family: inherit;
  font-size: 25px;
  font-weight: 750;
  letter-spacing: -.04em;
}

#staffing .jr-capacity-review-header p {
  margin: 0;
  color: #6d8077;
  font-size: 12px;
}

#staffing .jr-capacity-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

#staffing .jr-capacity-status {
  padding: 8px 11px;
  border-radius: 5px;
  background: #e4f2e9;
  color: #14765b;
  font-size: 11px;
  font-weight: 750;
  white-space: nowrap;
}

#staffing .jr-capacity-status.over {
  background: #fff0e1;
  color: #a26027;
}

#staffing .jr-capacity-close {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 1px solid #d4e3db;
  border-radius: 5px;
  background: #ffffff;
  color: #57756b;
  cursor: pointer;
}

/* Summary metrics */

#staffing .jr-capacity-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 11px;
}

#staffing .jr-capacity-metrics > div {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px;
  background: #ffffff;
  border: 1px solid #e0eae4;
  border-radius: 7px;
}

#staffing .jr-capacity-metrics span {
  color: #74877c;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .06em;
}

#staffing .jr-capacity-metrics strong {
  color: #0b252d;
  font-size: 25px;
  font-weight: 800;
  letter-spacing: -.04em;
}

#staffing .jr-capacity-metrics strong.over {
  color: #b16a32;
}

#staffing .jr-capacity-metrics small {
  color: #74877c;
  font-size: 11px;
}

/* Utilisation progress */

#staffing .jr-capacity-progress-section {
  margin-top: 24px;
}

#staffing .jr-capacity-progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 11px;
}

#staffing .jr-capacity-progress-header strong {
  color: #18372e;
  font-size: 12px;
}

#staffing .jr-capacity-progress-header span {
  color: #60776b;
  font-size: 11px;
}

#staffing .jr-capacity-progress-track {
  width: 100%;
  height: 9px;
  background: #dcece2;
  border-radius: 20px;
  overflow: hidden;
}

#staffing .jr-capacity-progress-track > div {
  height: 100%;
  background: #169777;
  border-radius: inherit;
  transition: width .2s ease;
}

#staffing .jr-capacity-progress-track > div.over {
  background: #dda16d;
}

#staffing .jr-capacity-message {
  margin: 11px 0 0;
  color: #61796c;
  font-size: 12px;
  line-height: 1.6;
}

#staffing .jr-capacity-message.over {
  color: #9a5d2a;
}

/* Implementation work */

#staffing .jr-capacity-work-section {
  margin-top: 25px;
  padding-top: 23px;
  border-top: 1px solid #dae7de;
}

#staffing .jr-capacity-work-header h4 {
  margin: 8px 0;
  color: #102a30;
  font-size: 18px;
  font-weight: 750;
  letter-spacing: -.03em;
}

#staffing .jr-capacity-work-header p {
  color: #60776d;
  font-size: 12px;
  line-height: 1.7;
}

#staffing .jr-capacity-work-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 11px;
  margin-top: 18px;
}

#staffing .jr-capacity-work-item {
  padding: 17px;
  background: #ffffff;
  border: 1px solid #dde8e2;
  border-radius: 7px;
}

#staffing .jr-capacity-work-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

#staffing .jr-capacity-work-top > div {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

#staffing .jr-capacity-work-top strong {
  color: #10352d;
  font-size: 13px;
}

#staffing .jr-capacity-work-top span {
  color: #16836d;
  font-size: 11px;
}

#staffing .jr-capacity-phase-hours {
  color: #153b31 !important;
  font-size: 12px !important;
  font-weight: 800;
  white-space: nowrap;
}

#staffing .jr-capacity-work-item p {
  color: #61776c;
  margin: 12px 0;
  font-size: 11px;
  line-height: 1.65;
}

#staffing .jr-capacity-work-item small {
  color: #84958a;
  font-size: 10px;
}

#staffing .jr-capacity-empty {
  grid-column: 1 / -1;
  color: #61776c;
  font-size: 12px;
}

/* Footnote */

#staffing .jr-capacity-footer {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding-top: 20px;
  margin-top: 22px;
  border-top: 1px solid #dae7de;
}

#staffing .jr-capacity-footer svg {
  flex-shrink: 0;
  color: #16836d;
}

#staffing .jr-capacity-footer p {
  color: #6a8073;
  font-size: 11px;
  line-height: 1.7;
  margin: 0;
}

@media (max-width: 700px) {
  #staffing .jr-capacity-review {
    padding: 17px;
  }

  #staffing .jr-capacity-review-header {
    flex-wrap: wrap;
  }

  #staffing .jr-capacity-metrics {
    grid-template-columns: 1fr;
  }

  #staffing .jr-capacity-work-list {
    grid-template-columns: 1fr;
  }
}

@media print{
   .jr-hero,.jr-builder,.jr-brief-actions,.jr-faq,.jr-final,.jr-map-controls,.jr-inspector-footer .jr-adjust{display:none!important}.jr-section{padding:15px 0}.jr-wrap{width:100%}.jr-map-card,.jr-owners-panel,.jr-risk-panel,.jr-staff-main{box-shadow:none;break-inside:avoid}.jr-gantt,.jr-heatmap{zoom:.8}}
`;
