"use client";

import { useEffect, useRef, useState } from "react";

const sources = [
  ["Ben: global enterprise benefits platform", "https://www.thanksben.com/"],
  ["Ben: global benefits management", "https://www.thanksben.com/benefits-management"],
  ["Ben: how the platform works", "https://www.thanksben.com/how-it-works"],
  ["Benifex: OneHub platform", "https://benifex.com/onehub/"],
  ["Benifex: benefits features", "https://benifex.com/benefits-features"],
  ["Benifex: customer stories", "https://benifex.com/case-study"],
  ["Darwin by Mercer Marsh Benefits", "https://www.marsh.com/en/services/employee-health-benefits/expertise/darwin.html"],
  ["Darwin employee benefits software", "https://www.mercer.com/solutions/health-and-benefits/employee-benefits-technology-platforms/darwin-employee-benefits-software/"],
  ["Alight Worklife platform", "https://www.alight.com/platform/alight-worklife"],
  ["Alight benefits administration", "https://www.alight.com/solutions/health-benefits/benefits-administration"],
  ["Forma: flexible employee benefits", "https://www.joinforma.com/"],
  ["Forma: 2026 global lifestyle benefits research", "https://www.joinforma.com/resources/lifestyle-spending-accounts-benchmark-report"],
  ["Benepass: flexible benefits", "https://getbenepass.com/benefits"],
  ["Benepass: platform features", "https://getbenepass.com/features"],
  ["Reward Gateway | Edenred: employee engagement platform", "https://www.rewardgateway.com/"],
  ["Reward Gateway | Edenred: global platform", "https://www.rewardgateway.com/au/platform/global"],
] as const;

type Vendor = {
  id: string;
  name: string;
  tag: string;
  best: string;
  summary: string;
  priceShort: string;
  watch: string;
  intro: string[];
  features: [string, string][];
  pros: [string, string][];
  cons: [string, string][];
  pricing: string;
  review: {
    quote?: string;
    person?: string;
    role?: string;
    source: number;
    body: string;
  };
  verdict: string;
  refs: number[];
  quote?: string;
  quotePerson?: string;
  quoteRole?: string;
  image?: string;
};



const vendors: Vendor[] = [
  {
    id: "ben",
    name: "Ben",
    tag: "Global benefits operations, employee experience and insights",
    best: "Global enterprises trying to run benefits across multiple countries without giving up local flexibility or maintaining separate operating processes in every market.",
    summary: "Combines benefits administration, employee experience and global benefits data in one operating layer, with support across 140+ countries.",
    priceShort: "Request a quote",
    watch: "Ask Ben to show how your actual provider mix would work country by country. I would want to see a mid-month eligibility change, the payroll hand-off and global spend reporting live rather than assume those workflows are automated everywhere.",
    intro: [
      "Let me save you the eyebrow raise: <strong>yes, Ben is sitting at number one in a guide on Ben’s own blog.</strong>",
      "The reason I am comfortable leaving it there is that the argument for Ben is not “it has more benefits” or “the employee app looks nicer.” Plenty of platforms can make both of those claims.",
      "The stronger case is operational.",
      "Ben is designed around the problem most global Reward teams eventually run into: benefits may look centralised on an org chart while the actual work is scattered across local providers, payroll files, eligibility rules, spreadsheets and people who know how a particular country works because they have been fixing it manually for six years.",
      "Ben’s pitch is essentially: put more of that operating model in one place."
    ],
     features: [
      ["Global benefits administration", "Eligibility, enrolment, employee changes, provider reconciliation, payroll deductions and audit history can be managed through one operating model across entities and markets."],
      ["Local policy control", "Country, entity and employee-group rules can vary without forcing regional teams into separate systems or weakening central governance over the wider programme."],
      ["Benefits intelligence", "Spend, take-up and utilisation can be analysed across markets, plans and employee segments, giving Reward and Finance a clearer view of programme cost and performance."],
      ["AI-assisted controls", "AI helps catch bad data, payroll mismatches and compliance issues before they turn into another manual fix for the Reward or HR team."],
    ],
       pros: [
      ["Cleaner operating model", "Ben can replace a lot of the fragmented admin that builds up when each market develops its own processes, owners and workarounds over time."],
      ["Stronger central oversight", "Reward teams get a clearer view of what is happening across countries without needing to pull updates from local teams every time leadership asks for an answer."],
      ["Better change handling", "The platform fits organisations where entities, employee groups and benefit structures change regularly and the existing setup is becoming difficult to govern."],
    ],
    cons: [
      ["Market depth varies", "Coverage across 140+ countries does not mean every provider, payroll process or statutory requirement has the same depth. Test your hardest markets first."],
      ["Built for complexity", "Ben makes most sense when there is real cross-border complexity to remove. Smaller teams with a simpler benefits setup may not get enough value from the operating model."],
    ],
    pricing: "We offer Pro and Premium plans, with pricing based on your organisation’s size, markets, benefits setup and implementation requirements. Your quote can include custom integrations, reporting, support, implementation and any additional services needed across your markets.",
    review: {
      source: 1,
      person: "Ben customer evidence",
      role: "Vendor-published",
      body: "We are already running the kind of setups enterprise Reward teams worry about in procurement. Pleo uses Ben to manage 20+ benefits across more than 28 countries. Sigma Connected has 28 benefits running across 28+ markets, and Fastmarkets rolled out across eight countries after moving away from a legacy setup where even small changes could take weeks."
    },
    verdict: "Ben is the one I would start with when the problem is not simply ‘employees need a nicer benefits portal’ but ‘our global programme is held together by spreadsheets, tickets and local workarounds’. The value case is strongest when administration, employee experience and reporting all need fixing together.",
    refs: [1, 2, 3],
    image: "/images/benefits-utilisation.webp",
    quote: "Ben helped create and manage our perfect platform, and provided such amazing support.",
    quotePerson: "Mark Cowen",
    quoteRole: "Head of Colleague Experience, Sigma Connected",
  },
  {
    id: "benifex",
    name: "Benifex",
    tag: "Mature global benefits, reward and employee experience",
    best: "Large multinationals that want one broad benefits and reward environment covering traditional benefits, wellbeing, recognition, discounts and employee communications.",
    summary: "OneHub brings multiple parts of the employee benefits and reward experience together, with extensive configuration for large global organisations.",
    priceShort: "Request a quote",
    watch: "Be clear on which OneHub modules you genuinely need, what local configuration sits with your team and what still depends on Benifex services. A broad platform is useful, but only if the operating model does not become harder to manage.",
    intro: [
      "Benifex is the platform I would put on the shortlist when the brief sounds something like: “we need one global experience, but please do not break what already works locally.”",
      "That tension runs through most multinational benefits programmes.",
      "You want enough consistency that employees recognise the same company wherever they work, but not so much that local Reward teams lose the ability to run benefits that actually make sense in their market.",
      "OneHub is built around that compromise.",
      "It covers core benefits alongside total reward, wallet allowances, recognition, wellbeing and discounts.  "
    ],
       features: [
      ["Global benefits administration", "OneHub supports benefits management from onboarding and enrolment through to communications, administration, provider reporting and payroll outputs across international populations."],
      ["Local programme flexibility", "Different countries can retain their own benefits, providers and workflows while employees still access them through a more consistent global experience."],
      ["Total reward and insights", "Employees can see the wider value of their reward package, while HR teams get real-time visibility into spend, budgeting, engagement and take-up across markets."],
      ["Broader employee experience", "Benefits can sit alongside wallet allowances, recognition, discounts, wellbeing and mobile access, which gives enterprises the option to consolidate more of the employee experience into one place."],
    ],
    pros: [
      ["Proven multinational scale", "The customer base includes Microsoft, Salesforce, Snowflake, Baker Hughes, Liberty Global and other organisations dealing with genuinely complex global rollouts rather than simple multi-country expansion."],
      ["Strong rollout model", "The platform suits organisations that need to standardise gradually. Microsoft, for example, launched first across eight countries and 13,500 employees and dependants, with more countries planned."],
      ["Broader consolidation potential", "If benefits, total reward, recognition and wellbeing currently live in separate systems, OneHub gives you a realistic route to reducing the number of employee destinations without making every module mandatory."],
    ],
    cons: [
      ["Scope can sprawl", "OneHub covers a lot of ground. If the buying process is not tightly defined, it is easy to end up evaluating benefits, wallet, wellbeing, recognition and communications all at once instead of fixing the workflows that matter most."],
      ["Service boundaries matter", "Benifex combines technology with administration, communications, support and consulting services. Make sure you are clear on what your internal team will own, what Benifex will run and how that changes by market."],
    ],
    pricing: "There is no public standard price for the full OneHub platform. Enterprise pricing depends on employee numbers, countries, modules and the level of administration or support included. OneHub Wallet is publicly listed from £2 PEPM, excluding certain transaction and FX costs.",
    review: {
      source: 6,
      person: "Snowflake and Salesforce",
      role: "Vendor-published customer stories",
      body: "The strongest proof is the breadth of the global rollouts. Microsoft launched OneHub across eight countries and 13,500 employees and dependants in its first wave, while Snowflake uses the platform across a workforce operating in more than 20 countries. "
    },
    verdict: "Benifex is a serious option for multinational employers that want a mature, broad employee benefits ecosystem rather than a narrow point solution. I would shortlist it when benefits, reward, wellbeing and employee experience are all part of the same transformation programme.",
    refs: [4, 5, 6],
    image: "/images/benefix.webp",
    quote: "Benifex has made our international benefit dreams come true!",
    quotePerson: "Samantha Sergent",
    quoteRole: "Director of International Benefits, Microsoft",
  },
  {
    id: "darwin",
    name: "Darwin",
    tag: "Global benefits technology with Mercer Marsh Benefits expertise",
    best: "Multinationals that want established global benefits technology and prefer to combine the platform with benefits consulting, broking and wider advisory support.",
    summary: "Covers enrolment, benefits administration, total reward, automation, governance and global reporting within the wider Mercer Marsh Benefits ecosystem.",
    priceShort: "Request a quote",
    watch: "Ask where Darwin ends and the surrounding service model begins. I would want a very clear view of what your internal team can configure directly, what requires Mercer Marsh Benefits support and how quickly changes can be made across markets.",
  intro: [
      "Darwin’s main advantage is that the technology does not sit on its own. The platform covers employee access, benefits administration and analytics, while Mercer Marsh Benefits can support the wider work around provider strategy, broking, programme design and cost management.",
      "That makes it a strong fit for large employers where the benefits problem extends beyond enrolment or employee experience. If the transformation involves multiple markets, local teams and centralised administration, Darwin gives you both the platform and the surrounding expertise."
    ],
    features: [
      ["Benefits administration", "Enrolment, eligibility, life events, payroll data and provider processes can be automated across different employee populations and markets."],
      ["HR and payroll connectivity", "Darwin connects benefits data with HR, payroll and third-party systems, reducing the amount of manual data movement between them."],
      ["Benefits analytics", "Global and local data can be analysed together, helping Reward teams compare spend, take-up and programme performance across markets."],
      ["Governance and auditability", "Automated transfers, audit history and enterprise security controls help reduce the risks that come with manual data handling."],
    ],
    pros: [
      ["Strong enterprise pedigree", "Darwin is already used by eight of the world’s ten largest technology companies, so there is meaningful evidence of the platform operating inside large, complex organisations."],
      ["Advisory sits nearby", "The Mercer Marsh Benefits relationship can be useful when the transformation involves provider strategy, scheme design and cost management as well as technology."],
      ["Supports centralisation", "Darwin is well suited to organisations moving benefits administration into a global or regional shared-service model rather than leaving every market to run separately."],
    ],
    cons: [
      ["Ownership needs clarity", "The combined technology and advisory model can be a strength, but I would still make the operating boundary explicit: what your team can manage directly, what Mercer runs and what triggers additional support."],
      ["More than software", "If your requirement is narrowly focused on flexible allowances or a lighter employee-facing layer, the wider Darwin and Mercer model may be more infrastructure than you need."],
    ],
    pricing: "Darwin does not publish standard enterprise pricing. I would ask for the technology, implementation, integrations, managed administration and any Mercer Marsh Benefits consulting or broking work to be separated so the operating model and commercial model are both clear.",
    review: {
      source: 8,
      person: "Darwin customer base",
      role: "Vendor-published evidence",
      body: "Darwin is used by some of the largest employers in the market, including eight of the world’s ten biggest technology companies. One customer example also reports 87% employee usage, with thousands of benefit selections made through the platform."
    },
    verdict: "Darwin belongs on the shortlist when you need serious global benefits infrastructure and you value the wider Mercer Marsh Benefits ecosystem. I would test it hardest on configuration ownership, data movement and the practical difference between what the platform does and what the service team does for you.",
    refs: [7, 8],
    image: "/images/darwin.png",
    quote: "87% of employees have now used Darwin to make thousands of benefits selections.",
    quotePerson: "Ellie Vaughan",
    quoteRole: "Global Head of Reward and Benefits, Herbert Smith Freehills Kramer",
  },
  {
    id: "alight",
    name: "Alight Worklife",
    tag: "Health, wealth, leave and benefits administration at very large scale",
    best: "Very large employers with complex health, wealth, leave and benefits programmes that need deep administration as well as employee guidance and integration.",
    summary: "Brings benefits administration, health, wealth, leave, communications and employee navigation into a much broader benefits ecosystem.",
    priceShort: "Request a quote",
    watch: "Test whether the depth matches the problem you are actually solving. If your biggest issue is global benefits coordination rather than end-to-end administration, make sure you are not buying significantly more infrastructure and implementation complexity than you need.",
    intro: [
      "Alight Worklife is built for employers where benefits administration has become a substantial operating environment in its own right.",
      "The scope is broader than core enrolment. Health, retirement, leave, wellbeing, navigation and employee guidance can sit inside the same platform, with Alight also supporting the administration behind those programmes. That makes it particularly relevant when the benefits estate already spans multiple vendors, processes and employee populations."
    ],
    features: [
      ["Benefits administration", "Complex enrolment, plan rules, employee changes and ongoing administration can be managed across large employee populations and multiple benefits programmes."],
      ["Health and wealth", "Healthcare, retirement, financial wellbeing and related guidance can sit within the same broader employee experience rather than across separate destinations."],
      ["Leave management", "Worklife extends into absence and leave administration, giving larger employers another part of the benefits estate to manage within the same environment."],
      ["Personalised guidance", "LumenAI uses workforce and benefits data to tailor communications and guidance around enrolment, healthcare, retirement, finances and leave."],
    ],
    pros: [
      ["Genuine administration depth", "Alight goes well beyond presenting benefits to employees. The platform and surrounding services are designed to handle the administration behind complex health, wealth and leave programmes."],
      ["Handles large populations", "The model is built for employers where workforce size, plan complexity and the number of connected benefits programmes make lighter platforms difficult to scale."],
      ["Strong integration breadth", "Worklife can connect with more than 600 benefits programmes and tools, which matters when replacing every existing provider is neither realistic nor desirable."],
    ],
    cons: [
      ["Can be oversized", "If the requirement is mainly flexible benefits, allowances or a simpler global employee experience, Alight may introduce more administration depth than the programme actually needs."],
      ["International depth varies", "The overall platform is broad, but I would still confirm which administration, navigation and health capabilities are available in each priority market rather than assuming the US model translates directly everywhere."],
    ],
    pricing: "Alight does not publish standard enterprise pricing for Worklife. Commercial scope depends on employee population, modules, administration services, integrations and implementation requirements.",
    review: {
      source: 9,
      person: "Alight Worklife",
      role: "Vendor-published platform evidence",
      body: "The stronger proof is in the financial and operational outcomes. A Forrester Consulting study commissioned by Alight found 112% ROI, $2 million in annual health-cost savings and 25% productivity gains for a global employer with around 20,000 employees using Worklife. "
    },
    verdict: "Alight Worklife is the option I would look at when the benefits estate is huge, interconnected and already stretches well beyond perks or allowances. For a multinational with deep health, wealth and leave complexity, that breadth is a strength. For a simpler brief, it can be more machinery than the job requires.",
    refs: [9, 10],
    image: "/images/alight.png",
    quote: "Alight has helped us streamline and make our day-to-day administrative processes much more efficient.",
    quotePerson: "Executive Director of Benefits",
    quoteRole: "Global employer with approximately 20,000 employees",
  },
  {
    id: "forma",
    name: "Forma",
    tag: "Global lifestyle benefits and flexible spending accounts",
    best: "Global employers whose main challenge is giving employees locally useful, equitable flexible benefits without building a separate reimbursement process in every country.",
    summary: "Strong focus on lifestyle spending accounts, flexible benefit budgets and employee choice across distributed workforces.",
    priceShort: "Request a quote",
    watch: "Separate flexible spending from core benefits administration early. Ask exactly which parts of medical, pension, insurance and statutory benefits remain outside Forma so you understand whether it is the main platform or one layer within a wider benefits stack.",
    intro: [
      "Forma is built around Lifestyle Spending Accounts and flexible benefits rather than full global benefits administration. Employers can run wellbeing, learning, caregiving, home office and other allowances through one platform, while changing funding levels, eligible categories and programme rules by country or employee group.",
      "That makes Forma particularly useful when flexible benefits are spread across expense claims, local vendors and separate reimbursement processes."
    ],
    features: [
      ["Flexible spending accounts", "Employers can create multiple accounts for wellbeing, learning, caregiving, meals, remote work and other categories within the same benefits environment."],
      ["Local market rules", "Programmes can vary by country, employee group and funding level without requiring a separate reimbursement workflow for each population."],
      ["Global employee access", "Employees get one way to spend, claim and manage their allowances even when the benefit design differs behind the scenes."],
      ["Utilisation reporting", "Admin teams can see how funds are being used across programmes and markets, making it easier to adjust funding and categories over time."],
    ],
    pros: [
      ["Purpose is clear", "If the existing problem is reimbursements, fragmented allowances and low-use point solutions, Forma gives you a much cleaner problem to evaluate than a broad benefits suite."],
      ["Global flexibility works", "The model is well suited to organisations where equity matters more than giving every employee the exact same benefit."],
      ["Admin can fall sharply", "Forma publishes examples of receipt-review workload falling by more than 80% and admin time dropping from 128 hours a month to 15 minutes."],
    ],
    cons: [
      ["Scope is narrower", "Forma does not replace every part of the benefits estate. Traditional insured benefits, complex enrolment and certain local-provider workflows may still need another platform."],
      ["Funding needs judgement", "The technology can make a programme flexible, but it cannot decide whether £500 of wellbeing spend is meaningful in every country. Local funding and category design still need proper thought."],
    ],
    pricing: "Forma does not publish standard enterprise pricing. Commercial scope will depend on the accounts you run, employee population, countries, payment methods, implementation and any additional programme support.",
    review: {
      source: 11,
      person: "Forma customer evidence",
      role: "Vendor-published",
      body: "Forma has useful proof around both consolidation and usage. Logitech consolidated more than 30 point solutions and later brought additional benefits onto the platform, while Bitsight built a global LSA programme with more than 87% engagement."
    },
    verdict: "Forma is a strong shortlist choice when global flexibility is the job to be done. If you are trying to give employees meaningful choice across countries and replace scattered reimbursement programmes, it is highly relevant. If you need end-to-end administration of a broad traditional benefits estate, compare it with a different lens.",
    refs: [11, 12],
    image: "/images/forma.jpg",
    quote: "Forma’s not only taking the work off our internal teams to administer, it helps our employees live their best lives.",
    quotePerson: "Julia",
    quoteRole: "Global Benefits, Logitech",
  },
  {
    id: "benepass",
    name: "Benepass",
    tag: "Card-first flexible benefits for distributed teams",
    best: "Employers that want card-based flexible benefits and spending programmes with detailed rules for how employees can use employer-funded allowances.",
    summary: "Combines a benefits card, employee app and configurable spending rules for programmes such as wellbeing, learning, meals and lifestyle benefits.",
    priceShort: "Request a quote",
    watch: "Go country by country on funding, tax treatment and employee access. I would also map what happens outside the spending-account layer, because the important question is whether Benepass replaces complexity or simply sits alongside your existing core-benefits processes.",
    intro: [
      "Benepass is built around a simple operating model: fund the benefit, define the rules and let employees spend directly.",
      "The platform combines physical and virtual cards with Lifestyle Spending Accounts, wellness, food, family, professional development, remote-work programmes and several US pre-tax benefits. Eligible transactions can be approved at the point of purchase, while claims remain available when card payment is not practical.",
      "For global teams, the advantage is consistency. Employees in different countries can use one benefits experience rather than navigating separate expense processes or local reimbursement tools, while employers still control budgets and eligible spend."
    ],
     features: [
      ["Card-first spending", "Physical and virtual cards let employees use funded benefits directly, with eligible purchases approved against programme rules at the point of transaction."],
      ["Configurable spending rules", "Employers can control eligible categories, merchants, budgets and employee groups without pushing every exception through a manual reimbursement process."],
      ["Global programme access", "Employees can spend through the same platform across 90+ countries, while programmes and eligibility can still vary across different workforce populations."],
      ["Claims and reimbursements", "When card payment is not possible, employees can still submit claims, with Benepass reporting average reimbursement approval times of under one minute."],
    ],
    pros: [
      ["Reduces reimbursement admin", "The card-first model removes a lot of the work created when employees pay personally, submit receipts and wait for HR or Finance to approve every transaction."],
      ["Rules stay enforceable", "Flexibility does not mean giving up control. Employers can widen employee choice while still defining exactly what each programme will and will not fund."],
      ["High card adoption", "Benepass reports that more than 80% of transactions happen on card when employees have both card and reimbursement options, which suggests the payment model is doing real work rather than sitting beside the old process."],
    ],
    cons: [
      ["Not full administration", "Card-based flexible benefits are not the same as administering insured benefits, complex enrolment or local provider relationships. Some employers will still need a broader administration platform alongside it."],
      ["Local rules still matter", "Global card acceptance does not remove tax, payroll or regulatory differences between countries. Test how your highest-risk markets are handled before treating one programme as globally identical."],
    ],
    pricing: "Benepass does not publish standard enterprise pricing. I would ask for the platform fee, card and funding costs, international transaction treatment, reimbursements, integrations and any charges that vary by benefit programme or country.",
    review: {
      source: 13,
      person: "Benepass customer evidence",
      role: "Vendor-published",
      body: "Trupanion reports an 80% annual engagement rate and 67% lower LSA admin costs, while The Aspen Group moved thousands of HSA, FSA and commuter accounts to Benepass in 75 days and now processes over 81% of transactions by card."
    },
    verdict: "Benepass is compelling when flexible spending is the centre of the benefits strategy. The card-first experience is easy to understand and the rules can carry a lot of operational weight. I would be more cautious if the real requirement is broad multinational administration rather than flexible benefits delivery.",
    refs: [13, 14],
    image: "/images/benepass.webp",
    quote: "That proactive, as opposed to reactive approach, is something that has been really impactful to our team.",
    quotePerson: "Stephanie Brazil",
    quoteRole: "Director of Benefits and Workforce Support Services, The Aspen Group",
  },
  {
    id: "reward-gateway",
    name: "Reward Gateway | Edenred",
    tag: "Benefits, discounts, recognition and employee engagement",
    best: "Global employers that want benefits to sit alongside recognition, discounts, wellbeing and communications in one employee-facing destination.",
    summary: "Stronger emphasis on the wider employee engagement experience, bringing benefits together with recognition, discounts, wellbeing and communication tools.",
    priceShort: "Request a quote",
    watch: "Ask how far the platform goes into actual benefits administration in your priority markets. If the core problem is eligibility, provider management, payroll reconciliation or global benefits governance, make sure those workflows are not sitting elsewhere behind the employee experience.",
     intro: [
      "Reward Gateway | Edenred is a global employee engagement platform that brings benefits, discounts, recognition, wellbeing and communications into one branded employee experience.",
      "The platform is designed to give large, distributed workforces one place to access employer programmes, while allowing discounts, rewards, content and communications to remain locally relevant across different countries.",
      "It supports multinational programmes across 65+ countries, with multi-language and multi-currency capabilities for global teams."
    ],
     features: [
      ["Employee engagement hub", "Benefits, recognition, wellbeing, communications and surveys can sit inside one branded destination that employees can access across desktop and mobile."],
      ["Discounts and savings", "Employees can access discounts and cashback across thousands of brands, with programmes designed to support multiple countries, currencies and languages."],
      ["Recognition and reward", "Peer and manager recognition can be tied to company values, service milestones and rewards, with employees able to choose from a broad range of redemption options."],
      ["Targeted communications", "HR teams can use the same platform to surface benefits, company updates and campaigns to different employee groups rather than relying on separate communication channels."],
    ],
    pros: [
      ["Drives repeat engagement", "The platform gives employees reasons to return throughout the year through discounts, recognition, wellbeing and communications rather than only during benefits enrolment."],
      ["Works for frontline teams", "Customer examples show strong adoption among employees without regular access to company devices or email, which matters for retail, transport and field-based workforces."],
      ["Strong adoption proof", "Reward Gateway | Edenred publishes examples including 94% active usage at Chubb Fire & Security and Southeastern, alongside 95% active usage at Knight Frank."],
    ],
    cons: [
      ["Not deep administration", "The platform is strongest around engagement, recognition and employee access. Employers with complex eligibility, payroll reconciliation or provider administration may still need deeper benefits infrastructure alongside it."],
      ["Scope can expand", "Benefits, recognition, wellbeing, discounts and communications can all sit in the same programme. Keep the buying scope tied to the outcomes you actually need rather than adding modules simply because they are available."],
    ],
    pricing: "Reward Gateway | Edenred does not publish standard enterprise pricing. Commercial scope depends on the modules selected, employee population, countries, integrations, implementation and the reward or discount programmes included.",
    review: {
      source: 15,
      person: "Reward Gateway | Edenred",
      role: "Vendor-published customer evidence",
      body: "The strongest proof is around adoption and measurable employee value. Southeastern reached 94% active usage, generated £83,000 in employee savings and saved £500,000 in National Insurance contributions, while Chubb Fire & Security increased active usage from 33% to 94% and reduced attrition by 33%."
    },
    verdict: "Reward Gateway | Edenred is strongest when the project is about making benefits and the wider EVP visible, useful and frequently visited. If your biggest pain sits in back-office benefits administration, I would pair it against a platform that goes deeper on global operations before deciding.",
    refs: [15, 16],
    image: "/images/reward-gateway.webp",
    quote: "Engagement with the platform has been incredible, 95% of our people are active on it.",
    quotePerson: "Kristin",
    quoteRole: "Knight Frank",
  },
];


const criteria = [
  [
    "Is ‘global’ actually one operating model?",
    "Ask the vendor to show one employee population in the UK, another in Germany, and another in Singapore on a single screen. Can central HR maintain global policy governance while local rules, provider integrations, and statutory eligibility stay distinct under the hood? If the answer involves logging into three regional portals and stitching CSVs together, you have your answer.",
    "globe",
    "/images/global-employee-population.png",
  ],
  [
    "What happens when eligibility changes on Thursday?",
    "Ask the vendor to move an employee to a new entity, change their grade and add a dependant halfway through the month. Then follow what happens next. Do eligibility, provider records and payroll deductions update from that one change, or does HR still need to update each system separately? ",
    "rules",
    "/images/alex-chen-movement.png",
  ],
  [
    "Can payroll close without a reconciliation spreadsheet?",
    "Take one employee’s benefit deduction and follow it from enrolment through to payroll and the provider bill. Then introduce a mismatch and see what happens. Does the platform flag the problem before payroll closes, show exactly what is wrong and tell the right person? Or does someone still have to compare files manually to catch it?",
    "payroll",
    "/images/benefit-deductions.png",
  ],
  [
    "Will employees outside HQ actually use it?",
    "Test the platform the way your employees will actually use it: on mobile, in different languages, with dependants and without a corporate email address. Include deskless employees and teams outside your largest markets. A consistent global experience does not mean much if enrolment is simple for head-office staff but difficult for everyone else.",
    "mobile",
    "/images/benefits-priya.png",
  ],
  [
    "Can you explain the spend to Finance?",
    "Ask the vendor to show benefits spend, take-up and utilisation across countries, plans and employee groups without exporting the data first. Then ask why one market is 11% over budget. Can you quickly separate headcount growth, provider rate increases and higher plan usage, or will Finance still need someone to rebuild the answer in Excel?",
    "chart",
    "/images/globalbenefitsspend.png",
  ],
  [
    "How much control stays with your team?",
    "Ask the vendor to add a new entity in Poland, change an eligibility rule and update a local employee communication during the demo. Can your team make those changes themselves, or does each one require a support ticket or implementation request? If routine admin takes weeks to complete after go-live, the platform will become another operational dependency.",
    "sliders",
    "/images/new-entity-setup.png",
  ],
] as const;



const choices = [
  ["Bringing fragmented global benefits administration into one operating model", "Ben", "Strongest fit when the problem is spread across local processes, payroll, eligibility and reporting rather than employee access alone."],
  ["Standardising a broad benefits and reward experience across a large multinational", "Benifex", "Best suited to organisations that want global consistency across benefits, total reward, wellbeing and recognition while keeping local programmes intact."],
  ["Combining benefits technology with consulting, broking and programme support", "Darwin", "The surrounding Mercer Marsh Benefits relationship makes more sense when the transformation includes providers, design and cost management as well as software."],
  ["Running complex health, wealth, leave and administration at very large scale", "Alight Worklife", "The deepest administration proposition in the group, particularly for employers with large populations and several connected benefits programmes."],
  ["Replacing fragmented LSAs, allowances and reimbursement programmes globally", "Forma", "A clearer fit when the core problem is flexible-benefits design and administration rather than traditional insured-benefit workflows."],
  ["Moving flexible benefits from reimbursement to direct employee spending", "Benepass", "Strongest where card-based access, transaction controls and simpler employee spending are the main requirements."],
  ["Increasing benefits visibility, recognition and engagement across the workforce", "Reward Gateway | Edenred", "Best suited to organisations where the employee-facing experience and programme adoption matter more than deep benefits administration."],
] as const;

const iconPaths: Record<string, string[]> = {
  globe: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M2 12h20", "M12 2a15 15 0 0 1 0 20", "M12 2a15 15 0 0 0 0 20"],
  rules: ["M4 6h16", "M4 12h10", "M4 18h16", "M18 10v4", "M16 12h4"],
  payroll: ["M4 3h16v18H4z", "M8 7h8", "M8 11h3", "M8 15h8", "M15 10v3", "M13.5 11.5h3"],
  mobile: ["M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z", "M10 18h4"],
  chart: ["M4 20V10", "M10 20V4", "M16 20v-7", "M22 20H2"],
  sliders: ["M4 6h10", "M18 6h2", "M14 4v4", "M4 12h2", "M10 12h10", "M8 10v4", "M4 18h12", "M20 18h0", "M18 16v4"],
  spark: ["m12 3 1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8L12 3Z", "m5 16 .8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16Z"],
  check: ["m5 12 4 4L19 6"],
  alert: ["M12 3 2 21h20L12 3Z", "M12 9v5", "M12 18h.01"],
  arrow: ["M5 12h14", "m13 6 6 6-6 6"],
  arrowRight: ["M5 12h14", "m12 5 7 7-7 7"],
  minus: ["M5 12h14"],
};

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths = iconPaths[name] || iconPaths.spark;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths.map((d) => <path key={d} d={d} />)}
    </svg>
  );
}
function HeroControlRoom() {
  return (
    <figure className="gb-hero-art" aria-label="Ben global benefits platform interface">
      <img
        src="/images/ben-hero-img.png"
        alt="Ben global benefits platform showing operations overview"
        width={1200}
        height={900}
        fetchPriority="high"
      />
    </figure>
  );
}

export type Props = {
  portfolioHref?: string;
  contactHref?: string;
};

const subheads = [["features", "Key capabilities"], ["pros", "Pros"], ["cons", "Limitations"], ["pricing", "Pricing"], ["reviews", "Customer evidence"]] as const;

export default function BestGlobalEmployeeBenefitsPlatforms2026({
  portfolioHref = "/#work",
  contactHref = "https://www.seo-growup.com/get-in-touch",
}: Props = {}) {
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);
  const [copyStatus, setCopyStatus] = useState("Copy article link ↗");
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => {
      const node = articleRef.current;
      if (!node) return;
      const top = node.getBoundingClientRect().top + window.scrollY;
      const distance = Math.max(1, node.offsetHeight - window.innerHeight);
      setProgress(Math.round(Math.max(0, Math.min(1, (window.scrollY - top) / distance)) * 100));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-12% 0px -72% 0px" }
    );

    articleRef.current?.querySelectorAll("section[id],h3[id]").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href.split("#")[0]);
      setCopyStatus("Link copied ✓");
    } catch {
      setCopyStatus("Copy the URL from your address bar");
    }
  };

  const sourceLink = (n: number) => sources[n - 1][1];
  const jump = (id: string, label: string) => (
    <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a>
  );

  return (
    <div className="gb-page" id="gb-top">
      <style>{styles}</style>
      <a className="gb-skip" href="#introduction">Skip to article</a>
      <div className="gb-progress" style={{ width: `${progress}%` }} />

      <div className="gb-wrap">
        <main>
          <header className="gb-hero">
            <div className="gb-hero-main gb-container">
              <div className="gb-hero-copy">
                <div className="gb-eyebrow">HR tech writing sample</div>
                <h1>7 Best Global Employee Benefits Platforms <span>for Enterprise Teams in 2026</span></h1>
                <p className="gb-deck">A practical comparison of seven platforms covering global administration, local flexibility, employee experience, payroll controls and reporting, with real-world use cases to help teams evaluate vendors.</p>
                <div className="gb-meta">
                  <span>By GrowUp | For Ben</span>
                  <time dateTime="2026-10-05">Reviewed 5 October 2026</time>
                  <span>18 min read</span>
                </div>
                <a className="gb-jump" href="#shortlist">Compare the seven platforms <span>↓</span></a>
              </div>
              <HeroControlRoom />
            </div>
          </header>

          <div className="gb-strip">
            <span className="gb-eyebrow">In this guide</span>
            {vendors.map((v) => <a key={v.id} href={`#${v.id}`}>{v.name}</a>)}
          </div>

          <div className="gb-layout">
            <aside className="gb-toc">
              <div className="gb-eyebrow">On this page</div>
              <nav aria-label="Article contents">
                {jump("criteria", "What enterprise teams should test")}
                {jump("shortlist", "The seven platforms compared")}
               
               
               
                {vendors.map((v, i) => (
                  <details key={v.id} open={active.startsWith(v.id)}>
                    <summary>{i + 1}. {v.name}</summary>
                    {jump(v.id, "Overview")}
                    {subheads.map(([id, label]) => jump(`${v.id}-${id}`, label))}
                  </details>
                ))}
                {jump("choose", "Which platform should you choose?")}
                {jump("sources", "Sources & research")}
              </nav>
              <div className="gb-toc-foot">
                {progress}% of article read
                <button className="gb-copy-button" onClick={copyLink}>{copyStatus}</button>
                <span className="gb-sr-status" role="status" aria-live="polite">{copyStatus === "Link copied ✓" ? "Copied to clipboard" : ""}</span>
              </div>
            </aside>

            <article className="gb-article" ref={articleRef}>
              <details className="gb-mobile-toc">
                <summary>Explore this guide</summary>
                <nav aria-label="Mobile article contents">
                  {jump("method", "How I compared them")}
                  {jump("criteria", "What to test")}
                  {jump("shortlist", "Compare the platforms")}
                  {vendors.map((v) => jump(v.id, v.name))}
                  {jump("choose", "Choose your shortlist")}
                </nav>
              </details>

          <section id="introduction" className="gb-intro" style={{ paddingTop: 0 }} aria-label="Introduction">
  <p className="gb-intro-lede">The worst meeting you can get as a global HR lead is a surprise 15-minute calendar invite from the CFO with no agenda.</p>
  <p className="gb-intro-body">I had that meeting two years ago. We were operating across 18 countries with 6,000 employees, and our global benefits spend had just run 11% over plan for the second consecutive quarter. I couldn’t answer why on the spot because our benefits data was trapped across six regional broker portals, three local HR systems, and a web of static Excel trackers maintained by local ops teams. To make matters worse, sales had just signed off on opening an entity in Poland with 50 hires going live in 30 days, and I had no infrastructure to deploy local compliant benefits without building another manual workflow from scratch.</p>
  
  
  <figure className="lc-maya-search">
  <img
    src="/images/benefits-operations.png"
    alt="Me, two years ago, trying to build a CFO-ready answer from six time zones"
    width={1200}
    height={750}
    loading="lazy"
    decoding="async"
  />
  <figcaption className="lc-maya-caption">Me, two years ago, trying to build a CFO-ready answer from six time zones</figcaption>
</figure>
  

<p className="gb-intro-body" style={{ paddingTop: 15 }}>I realised then that most enterprise benefits platforms are built for the best-case scenario. They look brilliant when you're enrolling an employee in London with standard data, but collapse the moment a local provider refuses to integrate or an entity structure changes mid-quarter.</p>
  <p className="gb-intro-body">I built this guide around that exact lesson. I looked past marketing claims and evaluated what each platform actually does when local compliance rules shift, spend drifts out of budget, or a new international entity needs to go live on a tight deadline.</p>
</section>

        

              <section id="criteria">
                <h2>What should enterprise teams look for in a global benefits platform?</h2>
                 <p>Sitting in my car after that CFO meeting, I made a promise to myself: I would never again buy HR software based on a glossy sales pitch or a 50-page RFP document where vendors just mark “Yes” to every feature.</p>

       
                <p style={{ marginTop: -5 }}>Now when I look at any platform in this space (including our own), I ignore the pre-scripted demo script. Instead, I run six non-negotiable stress tests built directly from those operational battle scars:</p>
                
                <div className="gb-crit">
                  {criteria.map(([title, body, icon, image], i) => (
                    <div className="gb-crit-item" key={title}>
                      <div className="gb-crit-header">
                        <span className="gb-icon"><Icon name={icon} /></span>
                        <div className="gb-crit-text">
                          <span className="gb-check-num">0{i + 1}</span>
                          <strong>{title}</strong>
                        </div>
                      </div>
                      <div className="gb-crit-content">
                        <img src={image} alt={title} className="gb-crit-image" />
                        <p>{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="shortlist">
                <h2>7 best global employee benefits platforms for enterprise teams in 2026</h2>
                <p>The seven platforms below solve different parts of the global benefits problem, so I would not compare them on feature count alone. I would use the six tests above to work out which ones actually fit your operating model.</p>
                <div className="gb-table-shell gb-clean-shell">
                  <div className="gb-table-scroll" role="region" aria-label="Global employee benefits platform comparison table; scroll horizontally on smaller screens" tabIndex={0}>
                    <table className="gb-table gb-clean">
                      <thead><tr><th scope="col">Platform</th><th scope="col">Best for</th><th scope="col">Main distinction</th><th scope="col">Pricing / what to check</th></tr></thead>
                      <tbody>
                        {vendors.map((v) => (
                          <tr key={v.id}>
                            <td><a href={`#${v.id}`}>{v.name} ↗</a></td>
                            <td>{v.best}</td>
                            <td>{v.summary}</td>
                            <td><strong>{v.priceShort}.</strong><small>Check: {v.watch}</small></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
   
                </div>
              </section>

         {vendors.map((v, i) => (
  <section
    className="gb-tool"
    id={v.id}
    key={v.id}
    aria-labelledby={`${v.id}-title`}
  >
    {/* ─────────────────────────────────────────
        VENDOR INTRO / PRODUCT VIEW
    ───────────────────────────────────────── */}
    <div className="gb-vendor-hero">

      {/* PRODUCT IMAGE PLACEHOLDER
          Replace this whole div with the real screenshot later */}
      <div
        className="gb-vendor-preview"
        aria-label={`${v.name} product interface`}
      >
        {v.image ? (
          <img
            src={v.image}
            alt={`${v.name} product screenshot`}
            className="gb-vendor-preview-image"
            loading="lazy"
          />
        ) : (
          <>
            <div className="gb-preview-window">
              <div className="gb-preview-browser">
                <span />
                <span />
                <span />
                <strong>{v.name}</strong>
              </div>

              <div className="gb-preview-app">
                <aside className="gb-preview-nav" aria-hidden="true">
                  <b>{v.name.charAt(0)}</b>
                  <span className="is-active" />
                  <span />
                  <span />
                  <span />
                  <span />
                </aside>

                <div className="gb-preview-main">
                  <div className="gb-preview-title">
                    <div>
                      <small>GLOBAL BENEFITS</small>
                      <strong>Operations overview</strong>
                    </div>
                    <i />
                  </div>

                  <div className="gb-preview-kpis" aria-hidden="true">
                    <div>
                      <small>Employees</small>
                      <strong>2,842</strong>
                      <span>↑ 12%</span>
                    </div>
                    <div>
                      <small>Countries</small>
                      <strong>18</strong>
                      <span>+2</span>
                    </div>
                    <div>
                      <small>Benefits</small>
                      <strong>24</strong>
                      <span>Active</span>
                    </div>
                  </div>

                  <div className="gb-preview-dashboard" aria-hidden="true">
                    <div className="gb-preview-chart">
                      <div className="gb-preview-chart-top">
                        <span>Benefits spend</span>
                        <b>£12.4M</b>
                      </div>

                      <div className="gb-preview-bars">
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                        <i className="is-last" />
                      </div>
                    </div>

                    <div className="gb-preview-sidecard">
                      <small>Coverage</small>
                      <strong>96%</strong>
                      <span>Global workforce</span>

                      <div className="gb-preview-mini-row">
                        <i />
                        <div />
                      </div>
                      <div className="gb-preview-mini-row">
                        <i />
                        <div />
                      </div>
                      <div className="gb-preview-mini-row">
                        <i />
                        <div />
                      </div>
                    </div>
                  </div>

                  <div className="gb-preview-footer" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>

            <div className="gb-preview-label">
              Product screenshot placeholder
            </div>
          </>
        )}
      </div>

      <div className="gb-vendor-summary">
        <div className="gb-vendor-count">
          <span>0{i + 1}</span>
          <small>of 07</small>
        </div>

        <div className="gb-tool-heading">
          <div>
            <h2 id={`${v.id}-title`}>{v.name}</h2>
            <div className="gb-eyebrow">{v.tag}</div>
          </div>
        </div>

        <div className="gb-best">
          <span>Best for</span>
          <p>{v.best}</p>
        </div>


        <div className="gb-vendor-actions">
          <a
            className="gb-vendor-primary"
            href={sourceLink(v.refs[0])}
            target="_blank"
            rel="noreferrer"
          >
            Visit {v.name}
            <Icon name="arrowRight" size={14} />
          </a>

          {v.id === "ben" && (
            <a
              className="gb-vendor-secondary"
              href="https://www.thanksben.com/book-a-demo"
              target="_blank"
              rel="noreferrer"
            >
              Book a demo
            </a>
          )}
        </div>


      </div>
    </div>

    {/* ─────────────────────────────────────────
        EDITORIAL REVIEW
    ───────────────────────────────────────── */}
    <div className="gb-vendor-intro">
      {v.intro.map((t, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: t }} />
      ))}
    </div>

    {/* ─────────────────────────────────────────
        CAPABILITIES
    ───────────────────────────────────────── */}
    <div className="gb-section-heading">
      <div>
        <span className="gb-section-kicker">What it actually does</span>
        <h3 id={`${v.id}-features`}>Key capabilities</h3>
      </div>
      <span className="gb-section-side">What {v.name} does well</span>
    </div>

    <div className="gb-feature-grid">
      {v.features.map(([title, body], featureIndex) => {
        const featureIcons = ["globe", "sliders", "mobile", "chart", "spark"];
        const iconName = featureIcons[featureIndex] || "spark";
        return (
          <div className="gb-feature-card" key={title}>
            <span className="gb-feature-number">
              <Icon name={iconName} size={20} />
            </span>

            <div>
              <strong>{title}</strong>
              <p>{body}</p>
            </div>
          </div>
        );
      })}
    </div>

    {/* ─────────────────────────────────────────
        PROS / LIMITATIONS
    ───────────────────────────────────────── */}
    <div className="gb-balance">
      <div className="gb-balance-card is-positive">
        <div className="gb-balance-heading">
          <h3 id={`${v.id}-pros`}>Pros</h3>
        </div>

        <ul>
          {v.pros.map(([t, b]) => (
            <li key={t}>
              <span className="gb-list-dot">
                <Icon name="check" size={14} />
              </span>
              <div>
                <strong>{t}</strong>
                <p>{b}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="gb-balance-card is-caution">
        <div className="gb-balance-heading">
          <h3 id={`${v.id}-cons`}>
          Limitations
          </h3>
        </div>

        <ul>
          {v.cons.map(([t, b]) => (
            <li key={t}>
              <span className="gb-list-dot">
                <Icon name="minus" size={14} />

              </span>
              <div>
                <strong>{t}</strong>
                <p>{b}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* ─────────────────────────────────────────
        PRICING
    ───────────────────────────────────────── */}
    <div className="gb-price">
      <span className="gb-price-icon">
        <Icon name="payroll" size={19} />
      </span>

      <h3 id={`${v.id}-pricing`}>Pricing</h3>

      <div className="gb-price-body">
        <p>{v.pricing}</p>

        {v.id === "ben" && (
          <a
            className="gb-price-link"
            href="https://www.thanksben.com/compare-plan"
            target="_blank"
            rel="noreferrer"
          >
            View pricing
            <Icon name="arrowRight" size={13} />
          </a>
        )}
      </div>
    </div>

    {/* ─────────────────────────────────────────
        CUSTOMER EVIDENCE
    ───────────────────────────────────────── */}
    <div className="gb-section-heading gb-review-heading">
      <div>
        <span className="gb-section-kicker">Real-world evidence</span>
        <h3 id={`${v.id}-reviews`}>
          What does the customer evidence say about {v.name}?
        </h3>
      </div>

    </div>

    <div className="gb-review">
      <div className="gb-review-copy">
        <div className="gb-eyebrow">
          Customer evidence
        </div>

        <p>{v.review.body}</p>

        {v.id === "ben" ? (
          <a
            href="https://www.thanksben.com/customer-stories"
            target="_blank"
            rel="noreferrer"
          >
            See how global teams use Ben
            <span>↗</span>
          </a>
        ) : (
          <a
            href={sourceLink(v.review.source)}
            target="_blank"
            rel="noreferrer"
          >
            Read the source
            <span>↗</span>
          </a>
        )}
      </div>

      <div className="gb-review-logos">
        {v.id === "ben" && (
          <div className="gb-review-logo-row">
            <img
              src="/images/sigma-logo.avif"
              alt="Sigma Connected"
              className="gb-review-logo"
              loading="lazy"
            />
            <img
              src="/images/pleo-logo.svg"
              alt="Pleo"
              className="gb-review-logo"
              loading="lazy"
            />
          </div>
        )}

        {v.quote && (
          <div className="gb-review-quote">
            <span className="gb-review-quote-mark">“</span>
            <p>{v.quote}”</p>
            {v.quotePerson && (
              <div className="gb-review-quote-author">
                <strong>{v.quotePerson}</strong>
                {v.quoteRole && <span>{v.quoteRole}</span>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>

    <div className="gb-sources-inline">
      {v.refs.map((n) => (
        <a href={`#source-${n}`} key={n}>
          [{n}] {sources[n - 1][0]}
        </a>
      ))}
    </div>
  </section>
))}

              <section id="choose">
                <h2>Which global employee benefits platform should you choose?</h2>
                <p>I would not choose from this list by asking who has the longest feature set. I would start with the part of your current benefits operation that creates the most work, risk or confusion, then make the vendor prove they can remove it. That usually gets you to a much shorter shortlist very quickly.</p>
                <div className="gb-table-shell gb-clean-shell">
                  <div className="gb-table-scroll" role="region" aria-label="Shortlist global employee benefits platforms by business need" tabIndex={0}>
                    <table className="gb-table gb-clean gb-choose-table">
                      <thead><tr><th scope="col">If your priority is...</th><th scope="col">Start with</th><th scope="col">Why</th></tr></thead>
                      <tbody>{choices.map(([problem, tool, test]) => <tr key={problem}><td><strong>{problem}</strong></td><td>{tool}</td><td>{test}</td></tr>)}</tbody>
                    </table>
                  </div>
                </div>

                <div className="gb-author">
                  <div className="gb-author-mark" aria-hidden="true"><span>G</span></div>
                  <div className="gb-author-body"><div className="gb-author-eyebrow">Written by</div><div className="gb-author-name">GrowUp</div><p className="gb-author-bio">GrowUp writes content for HR technology brands. This guide is a portfolio sample created to demonstrate the kind of work GrowUp would produce for Ben. It is not published by or affiliated with Ben.</p></div>
                </div>
              </section>

              <section id="sources">
                <h2>Sources & research</h2>
                <p style={{ fontSize: 14, color: "#596a65" }}>Product facts, coverage claims and customer examples below come from vendor-published sources. They establish what each vendor publicly says and shows, not independently measured comparative performance. Public information was reviewed on 5 October 2026.</p>
                <ol className="gb-source-list">{sources.map(([title, url], i) => <li key={url} id={`source-${i + 1}`}><a href={url} target="_blank" rel="noreferrer">{title} ↗</a></li>)}</ol>
              </section>
            </article>
          </div>

          <section className="gb-cta">
            <div>
              <div className="gb-eyebrow">GrowUp · HR tech content writing</div>
              <h2>High-intent content for acquisition, sales enablement and pipeline growth.</h2>
              <p>From search-led articles to comparison pages and customer stories, we create content that brings buyers in, helps sales move deals forward and supports pipeline growth.</p>
            </div>
            <div>
              <a href={contactHref}>Commission an article like this <span>↗</span></a>
            </div>
          </section>
        </main>

        <footer className="gb-footer"><a href={portfolioHref}>← Back to writing portfolio</a><a href="#gb-top">Back to top ↑</a></footer>
      </div>
    </div>
  );
}

const styles = String.raw`
.gb-page{--ink:#002924;--ink-2:#05382F;--muted:#596a65;--line:#d9dfd7;--paper:#FFFFFF;--paper-2:#F2F4EA;--orange:#1F9FA1;--pink:#FFA2A8;--teal:#6BB8A8;--teal-dark:#26797E;font-family:Inter,Arial,Helvetica,sans-serif;background:#FFFFFF;color:var(--ink);line-height:1.72;font-size:17px;-webkit-font-smoothing:antialiased}.gb-page *{box-sizing:border-box}.gb-page h1,.gb-page h2,.gb-page h3,.gb-page p,.gb-page figure,.gb-page blockquote{margin:0}.gb-page a{color:inherit;text-underline-offset:4px}.gb-page button,.gb-page input{font:inherit}.gb-page button,.gb-page summary{cursor:pointer}.gb-page :focus-visible{outline:3px solid var(--orange);outline-offset:5px}.gb-wrap{width:min(1320px,calc(100% - 96px));margin:auto}.gb-skip{position:fixed;left:18px;top:12px;z-index:90;background:#fff;padding:11px 16px;transform:translateY(-180%)}.gb-skip:focus{transform:none}.gb-progress{position:fixed;top:0;left:0;height:3px;background:var(--orange);z-index:80;transition:width .08s linear}.gb-eyebrow{text-transform:uppercase;letter-spacing:.15em;font-size:11px;font-weight:750;line-height:1.6}

.gb-hero{background:#041b1c;color:#f5f8f2;overflow:hidden;width:100vw;position:relative;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;padding-top:96px}.gb-hero:before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:54px 54px;mask-image:linear-gradient(to right,transparent,black 38%,black);pointer-events:none}.gb-container{width:min(1320px,calc(100% - 96px));margin:auto}.gb-hero-main{min-height:680px;display:grid;grid-template-columns:.8fr 1.2fr;gap:20px;align-items:center;padding-block:44px 62px;position:relative;z-index:2}.gb-hero-copy{position:relative;z-index:2}.gb-hero .gb-eyebrow{color:var(--orange)}.gb-hero h1{color:#F7F9F2;font-size:clamp(36px,3.5vw,56px);line-height:1.06;font-weight:650;letter-spacing:-.052em;margin:20px 0 24px;max-width:720px}.gb-hero h1 span{display:block;color:#F7F9F2}.gb-deck{font-size:18px;line-height:1.65;max-width:650px;color:#eef2ea}.gb-meta{display:flex;gap:15px;flex-wrap:wrap;margin-top:27px;font-size:12px;color:#9db1a5}.gb-jump{display:inline-flex;gap:26px;align-items:center;text-decoration:none;margin-top:27px;font-size:14px;font-weight:750;border-bottom:1px solid var(--orange);padding:4px 0;color:var(--orange)!important}.gb-hero-art{position:relative;min-width:0;width:100%;padding:24px 4px 24px 22px;margin:0}
.gb-hero-art img{display:block;width:100%;height:auto;filter:drop-shadow(0 30px 60px rgba(0,0,0,.3))}.gb-control{background:#F7F9F2;color:#002924;border:1px solid rgba(255,255,255,.25);box-shadow:0 36px 80px rgba(0,0,0,.28);border-radius:16px;overflow:hidden;transform:rotate(.35deg)}.gb-control-top{height:58px;padding:0 18px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #dfe5dc;background:#F2F4EA}.gb-control-top>div{display:flex;align-items:center;gap:11px}.gb-ben-switch{display:inline-flex;width:31px;height:31px;border-radius:50%;align-items:center;justify-content:center;background:#002924;color:#F7F9F2;font-weight:900;font-size:14px;box-shadow:inset 0 0 0 5px #05382F}.gb-control-top small{display:block;font-size:7px;letter-spacing:.15em;color:#6f7f79}.gb-control-top strong{display:block;font-size:11px;margin-top:1px}.gb-live{font-size:8px;text-transform:uppercase;letter-spacing:.12em;color:#4E7A70;display:flex;align-items:center;gap:6px}.gb-live i{width:6px;height:6px;background:#6BB8A8;border-radius:50%}.gb-control-body{padding:18px}.gb-control-kpis{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid #dfe5dc;border-radius:10px;overflow:hidden;background:#fff}.gb-control-kpis>div{padding:14px 15px}.gb-control-kpis>div+div{border-left:1px solid #dfe5dc}.gb-control-kpis small{display:block;font-size:7px;text-transform:uppercase;letter-spacing:.12em;color:#83908b}.gb-control-kpis strong{display:block;font-size:22px;line-height:1.1;margin:5px 0 3px;letter-spacing:-.04em}.gb-control-kpis span{font-size:8px;color:#66766f}.gb-map-shell{height:188px;position:relative;margin-top:14px;background:#002924;border-radius:11px;overflow:hidden}.gb-map-head{height:38px;padding:0 13px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.1);font-size:8px;color:#dbe6df}.gb-map-head span:last-child{color:#FFA2A8}.gb-map-lines{position:absolute;inset:40px 0 0;width:100%;height:148px}.gb-map-lines path{fill:none;stroke:#6BB8A8;stroke-width:1;stroke-dasharray:4 6;opacity:.55}.gb-map-lines circle{fill:#1F9FA1}.gb-map-lines circle:not(:first-of-type){fill:#F7F9F2}.gb-map-core{position:absolute;left:50%;top:53%;transform:translate(-50%,-50%);width:98px;height:76px;background:#F7F9F2;border:4px solid #05382F;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 9px 24px rgba(0,0,0,.25)}.gb-map-core span{font-size:7px;letter-spacing:.14em;color:#6f7f79}.gb-map-core strong{font-size:10px;margin:3px 0}.gb-map-core small{font-size:7px;color:#26797E}.gb-market-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.gb-market{display:grid;grid-template-columns:8px 1fr auto;gap:8px;align-items:center;padding:9px 10px;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.gb-dot{width:7px;height:7px;border-radius:50%}.gb-dot.is-orange{background:#FF6635}.gb-dot.is-teal{background:#6BB8A8}.gb-dot.is-pink{background:#FFA2A8}.gb-market strong{display:block;font-size:9px}.gb-market small{display:block;font-size:7px;color:#88948f}.gb-market b{font-size:7px;font-weight:700;color:#4E7A70}.gb-control-alert{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;margin-top:10px;padding:11px 12px;background:#FFF4F0;border:1px solid #FFD5C8;border-radius:9px;color:#CA3A0C}.gb-control-alert strong{display:block;font-size:9px}.gb-control-alert span{display:block;font-size:7px;line-height:1.45;color:#8f4b39;margin-top:2px}.gb-control-alert button{border:0;background:#1F9FA1;color:#fff;border-radius:20px;font-size:7px;font-weight:800;padding:6px 9px}.gb-orbit-card{position:absolute;z-index:4;padding:10px 12px;border-radius:9px;box-shadow:0 16px 30px rgba(0,0,0,.22);min-width:122px}.gb-orbit-card span{display:block;font-size:7px;text-transform:uppercase;letter-spacing:.13em}.gb-orbit-card strong{display:block;font-size:9px;margin-top:2px}.gb-orbit-a{left:-5px;top:4px;background:#1F9FA1;color:#fff;transform:rotate(-3deg)}.gb-orbit-b{right:-17px;bottom:5px;background:#FFA2A8;color:#002924;transform:rotate(2.5deg)}

.gb-strip{display:flex;align-items:center;gap:24px;padding:23px 0;border-block:1px solid var(--line);font-size:14px;flex-wrap:wrap}.gb-strip .gb-eyebrow{color:#66766f;margin-right:auto}.gb-strip a{font-weight:750;text-decoration:none}.gb-layout{display:grid;grid-template-columns:235px minmax(0,850px);gap:75px;justify-content:space-between;padding-top:60px;align-items:start}.gb-toc{position:sticky;top:26px;max-height:calc(100vh - 52px);overflow-y:auto;padding-right:16px}.gb-toc>.gb-eyebrow{color:var(--muted);margin-bottom:17px}.gb-toc nav>a,.gb-toc summary{display:block;text-decoration:none;font-size:13px;padding:9px 0;line-height:1.5}.gb-toc details{border-bottom:1px solid var(--line)}.gb-toc summary{font-weight:700;list-style:none;display:flex;justify-content:space-between;gap:10px}.gb-toc summary::after{content:'+';font-weight:400;color:#4E7A70}.gb-toc details[open] summary::after{content:'−'}.gb-toc details a{display:block;font-size:12px;color:var(--muted);padding:5px 0 5px 14px;text-decoration:none}.gb-toc a[aria-current='location']{color:#26797E;font-weight:850}.gb-toc-foot{font-size:12px;border-top:1px solid var(--line);margin-top:25px;padding-top:18px;color:var(--muted)}.gb-copy-button{display:block;background:transparent;border:0;color:#26797E;padding:12px 0 0;font-size:12px;font-weight:750}.gb-sr-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.gb-mobile-toc{display:none}.gb-article{min-width:0}.gb-article p{margin-bottom:21px}.gb-article section{scroll-margin-top:35px;padding-top:60px}.gb-intro p:first-child{font-size:29px;line-height:1.3;font-weight:650;letter-spacing:-.035em}.gb-article h2{font-size:36px;line-height:1.2;letter-spacing:-.045em;font-weight:650;margin-bottom:24px;text-wrap:balance}.gb-article h3{font-size:22px;line-height:1.3;letter-spacing:-.025em;margin:35px 0 18px;scroll-margin-top:35px}

.gb-stress{margin:34px 0 38px!important;padding:24px;border:1px solid #d9dfd7;border-radius:14px;background:#fff}.gb-stress-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:20px}.gb-stress-head .gb-eyebrow{color:#26797E;font-size:9px}.gb-stress-head h3{margin:5px 0 0;font-size:24px}.gb-stress-tag{font-size:9px;letter-spacing:.12em;text-transform:uppercase;border:1px solid #FF6635;color:#CA3A0C;border-radius:999px;padding:5px 10px;white-space:nowrap}.gb-stress-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}.gb-stress-card{position:relative;min-height:168px;padding:16px;border:1px solid #dfe5dc;border-radius:10px;background:#F7F9F2;overflow:hidden}.gb-stress-number{font-size:10px;color:#73827c}.gb-stress-accent{position:absolute;right:14px;top:14px;width:11px;height:11px;border-radius:50%;background:#FF6635}.gb-stress-accent.is-1{background:#FFA2A8}.gb-stress-accent.is-2{background:#6BB8A8}.gb-stress-card strong{display:block;font-size:15px;margin:23px 0 5px}.gb-stress-card p{font-size:12px;line-height:1.5;margin:0 0 14px;color:#42554e}.gb-stress-card small{display:block;font-size:10px;line-height:1.45;color:#26797E;font-weight:700}.gb-stress figcaption{font-size:11px;color:#708079;border-top:1px solid #e2e7df;margin-top:18px;padding-top:14px;line-height:1.65}

.gb-method-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:28px 0}.gb-method-grid>div{padding:21px;border:1px solid #d9dfd7;background:#fff;border-radius:11px}.gb-method-grid span{font-size:10px;color:#26797E;font-weight:800}.gb-method-grid strong{display:block;font-size:16px;margin:11px 0 6px}.gb-article .gb-method-grid p{font-size:14px;line-height:1.6;color:var(--muted);margin:0}.gb-note{display:flex;gap:16px;align-items:flex-start;padding:21px 22px;background:#FFF4F0;border:1px solid #FFD5C8;border-radius:10px;margin-top:25px;color:#7c3c2a}.gb-note svg{margin-top:2px;color:#FF6635}.gb-note strong{display:block;font-size:15px;color:#7c3c2a;margin-bottom:5px}.gb-article .gb-note p{font-size:14px;line-height:1.65;margin:0;color:#7c3c2a}

.gb-crit{display:flex;flex-direction:column;gap:48px;margin-top:40px}
.gb-crit-item{display:flex;flex-direction:column;gap:24px}
.gb-crit-header{display:flex;gap:20px;align-items:center}
.gb-icon{display:inline-flex;align-items:center;justify-content:center;flex:none;width:48px;height:48px;border-radius:50%;background:#E3F4E1;color:#26797E}
.gb-crit-text{min-width:0}
.gb-check-num{display:block;font-size:11px;color:#7b8983;font-weight:650;margin-bottom:4px}
.gb-crit-text strong{display:block;font-size:22px;margin-bottom:0;letter-spacing:-.02em}
.gb-crit-content{display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:flex-start}
.gb-crit-image{width:100%;height:auto;border-radius:12px;box-shadow:0 12px 30px rgba(0,0,0,0.08);display:block}
.gb-article .gb-crit-content p{font-size:16px;line-height:1.7;margin:0;color:#011522}

.gb-table-shell{margin:34px 0}.gb-table-scroll{overflow-x:auto}.gb-table-scroll:focus{outline-offset:-3px}.gb-table{width:100%;border-collapse:separate;border-spacing:0;font-size:14px;min-width:760px;line-height:1.6}.gb-clean{background:#fff;border:1px solid #e3e8e1;border-radius:14px;overflow:hidden}.gb-clean th{background:#115f5a;color:#ffffff;font-size:10px;letter-spacing:.16em;text-transform:uppercase;font-weight:750;padding:18px 22px;border-bottom:1px solid #0d4a46;text-align:left;vertical-align:bottom}.gb-clean th:first-child{width:16%}.gb-clean td{padding:26px 22px;border-bottom:1px solid #eef1ec;vertical-align:top;color:#011522;font-size:13.5px}.gb-clean tr:last-child td{border-bottom:0}.gb-clean tbody tr{transition:background .18s ease}.gb-clean tbody tr:hover{background:#F0F5F1}.gb-clean td:first-child a{font-size:15px;font-weight:800;color:#011522;text-decoration:none;letter-spacing:-.012em;display:inline-flex;align-items:center;gap:4px;border-bottom:1px solid transparent;transition:border-color .18s ease}.gb-clean td:first-child a:hover{border-bottom-color:#167273}.gb-clean td strong{display:block;font-size:13.5px;font-weight:750;color:#011522;margin-bottom:4px;letter-spacing:-.005em}.gb-clean td small{font-size:12px;color:#011522;margin-top:6px;display:block;line-height:1.55}.gb-table-footer{font-size:12px!important;line-height:1.65;padding:18px 4px 0;color:#7b8983;margin:0!important}









/* =========================================================
   PREMIUM VENDOR REVIEW SECTIONS
========================================================= */

.gb-tool{
  border-top:1px solid #e1e7e2;
  margin-top:86px;
  padding-top:48px!important;
}


/* =========================================================
   TOP VENDOR HERO
========================================================= */

.gb-vendor-hero{
  display:grid;
  grid-template-columns:minmax(0,1.75fr) minmax(240px,.85fr);
  gap:34px;
  align-items:center;
  margin-bottom:48px;
}

.gb-vendor-preview{
  position:relative;
  min-width:0;
}

.gb-preview-window{
  overflow:hidden;
  border:1px solid #dfe6e1;
  border-radius:18px;
  background:#fff;
  box-shadow:
    0 24px 55px rgba(0,41,36,.09),
    0 2px 7px rgba(0,41,36,.04);
}

.gb-preview-browser{
  height:38px;
  display:flex;
  align-items:center;
  gap:6px;
  padding:0 13px;
  border-bottom:1px solid #e8ece9;
  background:#fbfcfb;
}

.gb-preview-browser>span{
  width:6px;
  height:6px;
  border-radius:50%;
  background:#d6ddd8;
}

.gb-preview-browser strong{
  margin-left:auto;
  font-size:8px;
  line-height:1;
  color:#66766f;
  font-weight:800;
  letter-spacing:.06em;
}

.gb-preview-app{
  min-height:332px;
  display:grid;
  grid-template-columns:66px 1fr;
}

.gb-preview-nav{
  border-right:1px solid #e9edea;
  padding:18px 13px;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:15px;
  background:#fbfcfb;
}

.gb-preview-nav b{
  width:29px;
  height:29px;
  border-radius:9px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#063c35;
  color:#fff;
  font-size:12px;
  margin-bottom:6px;
}

.gb-preview-nav span{
  display:block;
  width:25px;
  height:7px;
  border-radius:999px;
  background:#e5ebe7;
}

.gb-preview-nav span.is-active{
  background:#bfe7da;
}

.gb-preview-main{
  padding:22px;
  background:
    radial-gradient(circle at 88% 12%,rgba(107,184,168,.08),transparent 30%),
    #fff;
}

.gb-preview-title{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:16px;
  margin-bottom:18px;
}

.gb-preview-title small{
  display:block;
  color:#779087;
  font-size:7px;
  font-weight:800;
  letter-spacing:.15em;
}

.gb-preview-title strong{
  display:block;
  margin-top:4px;
  font-size:14px;
  color:#002924;
}

.gb-preview-title i{
  width:48px;
  height:19px;
  border:1px solid #dce4df;
  border-radius:999px;
  background:#fff;
}

.gb-preview-kpis{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:9px;
}

.gb-preview-kpis>div{
  padding:12px;
  border:1px solid #e4e9e5;
  border-radius:10px;
  background:#fff;
}

.gb-preview-kpis small{
  display:block;
  font-size:7px;
  color:#819089;
}

.gb-preview-kpis strong{
  display:block;
  margin:4px 0 2px;
  font-size:17px;
  line-height:1;
  color:#002924;
}

.gb-preview-kpis span{
  font-size:7px;
  color:#148566;
}

.gb-preview-dashboard{
  display:grid;
  grid-template-columns:1.45fr .75fr;
  gap:10px;
  margin-top:10px;
}

.gb-preview-chart,
.gb-preview-sidecard{
  min-height:135px;
  padding:13px;
  border:1px solid #e4e9e5;
  border-radius:11px;
  background:#fff;
}

.gb-preview-chart-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  font-size:8px;
  color:#677a72;
}

.gb-preview-chart-top b{
  color:#002924;
  font-size:12px;
}

.gb-preview-bars{
  height:75px;
  display:flex;
  align-items:flex-end;
  gap:7px;
  margin-top:16px;
  border-bottom:1px solid #edf0ee;
}

.gb-preview-bars i{
  flex:1;
  height:44%;
  border-radius:4px 4px 0 0;
  background:#dfe8e3;
}

.gb-preview-bars i:nth-child(2){height:61%}
.gb-preview-bars i:nth-child(3){height:49%}
.gb-preview-bars i:nth-child(4){height:73%}
.gb-preview-bars i:nth-child(5){height:66%}

.gb-preview-bars i.is-last{
  height:91%;
  background:#36a884;
}

.gb-preview-sidecard small{
  display:block;
  font-size:7px;
  color:#7c8d85;
}

.gb-preview-sidecard>strong{
  display:block;
  margin:4px 0 1px;
  font-size:21px;
  line-height:1;
}

.gb-preview-sidecard>span{
  display:block;
  font-size:7px;
  color:#829189;
  margin-bottom:14px;
}

.gb-preview-mini-row{
  display:grid;
  grid-template-columns:8px 1fr;
  gap:7px;
  align-items:center;
  margin-top:9px;
}

.gb-preview-mini-row i{
  width:7px;
  height:7px;
  background:#79c8ad;
  border-radius:50%;
}

.gb-preview-mini-row div{
  height:5px;
  border-radius:999px;
  background:#e5ebe7;
}

.gb-preview-footer{
  display:grid;
  grid-template-columns:1.2fr .8fr 1fr;
  gap:8px;
  margin-top:10px;
}

.gb-preview-footer span{
  height:36px;
  display:block;
  border:1px solid #e7ebe8;
  border-radius:9px;
  background:#fbfcfb;
}

.gb-preview-label{
  position:absolute;
  left:18px;
  bottom:-13px;
  padding:6px 10px;
  border:1px solid #dfe6e1;
  border-radius:999px;
  background:#fff;
  box-shadow:0 8px 20px rgba(0,41,36,.08);
  color:#71827b;
  font-size:8px;
  font-weight:750;
  letter-spacing:.09em;
  text-transform:uppercase;
}


/* =========================================================
   BRAND SUMMARY
========================================================= */

.gb-vendor-summary{
  min-width:0;
}

.gb-vendor-count{
  display:flex;
  align-items:center;
  gap:8px;
  margin-bottom:14px;
}

.gb-vendor-count span{
  display:flex;
  width:44px;
  height:44px;
  align-items:center;
  justify-content:center;
  border:none;
  border-radius:50%;
  background:transparent;
  color:#002924;
  font-size:15px;
  font-weight:800;
}

.gb-vendor-count small{
  font-size:10px;
  color:#89968f;
  text-transform:uppercase;
  letter-spacing:.14em;
}

.gb-tool-heading{
  margin:0;
}

.gb-tool-heading h2{
  margin:0;
  font-size:46px;
  line-height:1;
  letter-spacing:-.048em;
  color:#002924;
}

.gb-tool-heading .gb-eyebrow{
  margin-top:11px;
  color:#4f8175;
  font-size:10px;
  line-height:1.55;
}

.gb-best{
  margin:25px 0 18px!important;
  padding:18px 19px;
  border:none;
  border-radius:4px;
  background:#f4fbf6;
}

.gb-best>span{
  display:block;
  margin-bottom:7px;
  color:#29705f;
  font-size:10px;
  font-weight:850;
  letter-spacing:.13em;
  text-transform:uppercase;
}

.gb-article .gb-best p{
  margin:0;
  color:#0a302a;
  font-size:15px;
  line-height:1.6;
  font-weight:520;
}

.gb-signal{
  display:block;
  margin:18px 0 0;
  padding:0;
  border:0;
}

.gb-signal-label{
  display:block;
  margin-bottom:9px;
  color:#85938d;
  font-size:8px;
  font-weight:800;
  letter-spacing:.14em;
  text-transform:uppercase;
}

.gb-signal>div{
  display:flex;
  gap:7px;
  flex-wrap:wrap;
  justify-content:flex-start;
}

.gb-signal>div span,
.gb-signal>div span.is-1,
.gb-signal>div span.is-2{
  padding:5px 9px;
  border:1px solid #dce6df;
  border-radius:999px;
  background:#fff;
  color:#44665d;
  font-size:9px;
  font-weight:750;
}

.gb-vendor-actions{
  display:grid;
  grid-template-columns:1fr;
  gap:9px;
  margin-top:24px;
}

.gb-vendor-actions a{
  min-height:42px;
  padding:0 14px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  border-radius:8px;
  text-decoration:none;
  font-size:13px;
  font-weight:800;
}

.gb-vendor-primary{
  border:1px solid #063c35;
  background:#063c35;
  color:#fff!important;
}

.gb-vendor-secondary{
  border:1px solid #cbd8d0;
  background:#fff;
  color:#002924!important;
}


/* =========================================================
   EDITORIAL COPY
========================================================= */

.gb-vendor-intro{
  margin:45px 0 24px;
  padding-bottom:2px;
}

.gb-article .gb-vendor-intro p{
  max-width:790px;
  margin-bottom:22px;
  color:#011522;
  font-size:17px;
  line-height:1.78;
}


/* =========================================================
   SECTION HEADINGS
========================================================= */

.gb-section-heading{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:28px;
  margin:0 0 21px;
  padding-bottom:14px;
  border-bottom:1px solid #e0e6e2;
}

.gb-section-heading h3{
  margin:4px 0 0;
  font-size:25px;
  line-height:1.2;
}

.gb-section-kicker{
  display:block;
  color:#4e8175;
  font-size:8px;
  font-weight:850;
  letter-spacing:.17em;
  text-transform:uppercase;
}

.gb-section-side{
  flex:none;
  padding-bottom:4px;
  color:#8a9992;
  font-size:8px;
  font-weight:800;
  letter-spacing:.16em;
  text-transform:uppercase;
}


/* =========================================================
   CAPABILITIES
========================================================= */

.gb-feature-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:14px;
  margin-bottom:38px;
}

.gb-feature-card{
  display:grid;
  grid-template-columns:50px 1fr;
  gap:16px;
  align-items:start;
  min-height:150px;
  padding:22px;
  border:1px solid #e6ece7;
  border-radius:4px;
  background:#fff;
}

.gb-feature-card:last-child:nth-child(odd){
  grid-column:1/-1;
  min-height:auto;
}

.gb-feature-number{
  display:flex;
  width:44px;
  height:44px;
  align-items:center;
  justify-content:center;
  border-radius:50%;
  background:#e6f4ec;
  color:#1a8a5f;
}

.gb-feature-card strong{
  display:block;
  margin-top:4px;
  color:#011522;
  font-size:16px;
  font-weight:700;
  line-height:1.4;
}

.gb-article .gb-feature-card p{
  margin:8px 0 0;
  color:#011522;
  font-size:13.5px;
  line-height:1.7;
}


/* =========================================================
   PROS / LIMITATIONS — LIGHTER
========================================================= */

.gb-balance{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
  margin:38px 0 44px;
}

.gb-balance-card{
  padding:28px 26px;
  border:none;
  border-radius:4px;
}

.gb-balance-card.is-positive{
  background:#eef7f2;
}

.gb-balance-card.is-caution{
  background:#fdf1ee;
}

.gb-balance-heading{
  margin-bottom:22px;
}

.gb-balance-heading h3{
  margin:0;
  font-size:20px;
  font-weight:700;
  line-height:1.3;
}

.is-positive .gb-balance-heading h3{
  color:#011522;
}

.is-caution .gb-balance-heading h3{
  color:#c8260f;
}

.gb-balance ul{
  list-style:none;
  margin:0;
  padding:0;
}

.gb-balance li{
  display:grid;
  grid-template-columns:24px 1fr;
  gap:12px;
  align-items:start;
  padding:18px 0;
}

.gb-balance li:first-child{
  padding-top:0;
}

.gb-balance li:last-child{
  padding-bottom:0;
}

.gb-list-dot{
  width:22px;
  height:22px;
  margin-top:1px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:50%;
  background:#167273;
  color:#fff;
}

.is-caution .gb-list-dot{
  background:#f0452a;
  color:#fff;
}

.gb-list-dot svg{
  stroke-width:2.5;
}

.gb-balance li strong{
  display:block;
  color:#011522;
  font-size:14.5px;
  font-weight:700;
  line-height:1.45;
}

.gb-article .gb-balance li p{
  margin:6px 0 0;
  color:#011522;
  font-size:13px;
  line-height:1.65;
}


/* =========================================================
   PRICING
========================================================= */

.gb-price{
  display:grid;
  grid-template-columns:42px 92px 1fr;
  gap:17px;
  align-items:start;
  margin:35px 0 48px;
  padding:20px;
  border:1px solid #dfe6e1;
  border-radius:13px;
  background:#fff;
}

.gb-price-icon{
  width:40px;
  height:40px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:10px;
  background:#063c35;
  color:#ffffff;
}

.gb-price h3{
  margin:6px 0 0;
  font-size:16px;
}

.gb-price-body{
  padding-left:18px;
  border-left:1px solid #e3e8e5;
}

.gb-article .gb-price p{
  margin:3px 0 0;
  color:#011522;
  font-size:13px;
  line-height:1.65;
}

.gb-price-link{
  display:inline-flex;
  align-items:center;
  gap:6px;
  margin-top:14px;
  color:#15765f!important;
  font-size:12.5px;
  font-weight:800;
  text-decoration:none;
}

.gb-price-link svg{
  transition:transform .18s ease;
}

.gb-price-link:hover svg{
  transform:translateX(3px);
}


/* =========================================================
   CUSTOMER EVIDENCE
========================================================= */

.gb-review-heading{
  margin-top:0;
}

.gb-review{
  display:grid;
  grid-template-columns:1fr 300px;
  gap:32px;
  margin:0 0 28px;
  padding:28px 30px;
  border:1px solid #dfe6e1;
  border-radius:14px;
  background:#fff;
}

.gb-review-copy{
  min-width:0;
}

.gb-review .gb-eyebrow{
  margin-bottom:12px;
  color:#4e8175;
  font-size:9px;
}

.gb-review .gb-review-person{
  margin:0 0 28px;
  color:#0a332c;
  font-size:12px;
  font-weight:800;
}

.gb-review .gb-review-person span{
  color:#7e8d87;
  font-weight:450;
}

.gb-article .gb-review p{
  margin:0;
  padding-top:2px;
  color:#011522;
  font-size:14px;
  line-height:1.72;
}

.gb-review a{
  display:inline-flex;
  align-items:center;
  gap:7px;
  margin-top:17px;
  color:#15765f;
  font-size:12.5px;
  font-weight:800;
  text-decoration:none;
}

/* Logo strip */
.gb-review-logos{
  display:flex;
  flex-direction:column;
  gap:16px;
}

.gb-review-logo-row{
  display:flex;
  align-items:center;
  gap:24px;
  padding-bottom:16px;
  border-bottom:1px solid #edf0ee;
}

.gb-review-logo{
  max-height:28px;
  max-width:120px;
  width:auto;
  object-fit:contain;
}

/* Quote card */
.gb-review-quote{
  padding:16px 18px;
  border-radius:10px;
  background:#f3f9f6;
  color:#0b5545;
}

.gb-review-quote-mark{
  display:block;
  height:24px;
  font-family:Georgia,serif;
  font-size:38px;
  line-height:1;
  color:#167273;
}

.gb-article .gb-review-quote p{
  margin:6px 0 10px;
  color:#0b5545;
  font-size:13px;
  line-height:1.5;
  font-weight:600;
}

.gb-review-quote-author{
  display:flex;
  flex-direction:column;
  gap:2px;
}

.gb-review-quote-author strong{
  color:#0b5545;
  font-size:11px;
  font-weight:800;
  line-height:1.4;
}

.gb-review-quote-author span{
  color:#4d7469;
  font-size:10px;
  font-weight:500;
  line-height:1.4;
}


/* =========================================================
   VERDICT / MY TAKE
========================================================= */

 

.gb-sources-inline{
  display:flex;
  flex-wrap:wrap;
  gap:8px 15px;
  margin-top:16px;
  padding-bottom:4px;
}

.gb-sources-inline a{
  color:#688078;
  font-size:9px;
  line-height:1.5;
  text-decoration:none;
}


.gb-choose-table{font-size:17px}.gb-choose-table th{width:auto!important}.gb-ending{margin-top:36px;padding:28px 30px;background:#FFDDDF;border-left:4px solid #FF6635;border-radius:8px}.gb-ending .gb-eyebrow{font-size:9px;color:#A4433D}.gb-ending p{font-size:18px;line-height:1.65;margin:10px 0 0;color:#5d332f}.gb-author{margin-top:48px;padding:28px 30px;background:#fff;border:1px solid #e0e5df;border-radius:14px;display:flex;gap:28px;align-items:center}.gb-author-mark{flex:none;width:64px;height:64px;border-radius:50%;background:#002924;color:#F7F9F2;display:flex;align-items:center;justify-content:center}.gb-author-mark span{font-size:26px;font-weight:900}.gb-author-body{min-width:0;padding-left:28px;border-left:1px solid #e0e5df}.gb-author-eyebrow{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#7e8a85;font-weight:700}.gb-author-name{font-size:18px;font-weight:800;margin-top:4px}.gb-author-bio{font-size:13px!important;line-height:1.65!important;color:#697771;margin:6px 0 0!important}.gb-source-list{padding-left:23px}.gb-source-list li{padding:8px 0;font-size:13px;color:#50635b}.gb-source-list a{word-break:break-word}

.gb-cta{margin:75px 0 35px;background:#041b1c;color:#fff;padding:50px;border-radius:5px;display:grid;grid-template-columns:1.5fr 1fr;gap:65px;align-items:center}
.gb-cta .gb-eyebrow{color:#167273}
.gb-cta h2{font-size:39px;line-height:1.13;letter-spacing:-.04em;margin:16px 0}
.gb-cta p{font-size:15px;line-height:1.75;color:#cad7c9;max-width:630px}
.gb-cta a{display:flex;align-items:center;justify-content:space-between;gap:24px;background:#167273;color:#fff;text-decoration:none;border-radius:0;padding:18px 23px;font-size:14px;font-weight:700}.gb-footer{display:flex;justify-content:space-between;gap:30px;padding:28px 0 42px;font-size:13px}.gb-footer a{text-decoration:none}

.lc-maya-search{margin:30px 0}
.lc-maya-search img{display:block;width:100%;height:auto}
.lc-maya-caption{text-align:center;font-size:12px;line-height:1.7;color:#011522;padding-top:12px;max-width:640px;margin-inline:auto}



@media(max-width:1100px){.gb-wrap,.gb-container{width:calc(100% - 40px)}.gb-hero-main{grid-template-columns:1fr;padding-inline:24px}.gb-hero-copy{max-width:760px}.gb-hero-art{max-width:760px;margin:auto}.gb-layout{display:block;padding-top:32px}.gb-toc{display:none}.gb-mobile-toc{display:block;border-bottom:1px solid var(--line);margin-bottom:32px;padding-bottom:15px}.gb-mobile-toc summary{font-size:14px;font-weight:750}.gb-mobile-toc nav{display:grid;grid-template-columns:1fr 1fr;padding-top:12px;gap:9px}.gb-mobile-toc a{font-size:13px;text-decoration:none}.gb-stress-grid{grid-template-columns:1fr 1fr}.gb-cta{grid-template-columns:1fr;gap:28px}.gb-cta a{max-width:340px}}
@media(max-width:700px){.gb-hero{padding-top:46px}.gb-hero h1{font-size:43px}.gb-deck{font-size:15px}.gb-control-kpis{grid-template-columns:1fr}.gb-control-kpis>div+div{border-left:0;border-top:1px solid #dfe5dc}.gb-market-grid{grid-template-columns:1fr}.gb-orbit-card{display:none}.gb-method-grid,.gb-balance,.gb-crit-content{grid-template-columns:1fr}.gb-feature-list li{display:block}.gb-feature-list strong{display:block;margin-bottom:5px}.gb-signal{display:block}.gb-signal>div{justify-content:flex-start;margin-top:9px}.gb-cta{padding:34px 28px}}
@media(max-width:520px){.gb-page{font-size:16px}.gb-wrap,.gb-container{width:calc(100% - 32px)}.gb-hero-main{padding-inline:0}.gb-hero h1{font-size:38px}.gb-meta{font-size:11px}.gb-hero-art{padding:18px 0}.gb-control{border-radius:11px}.gb-map-shell{height:165px}.gb-stress{padding:18px}.gb-stress-head{display:block}.gb-stress-tag{display:inline-block;margin-top:10px}.gb-stress-grid{grid-template-columns:1fr}.gb-intro p:first-child{font-size:25px}.gb-article section{padding-top:45px}.gb-article h2{font-size:29px}.gb-tool-heading h2{font-size:36px}.gb-tool-heading{gap:13px}.gb-rank{width:46px;height:46px}.gb-review{padding:22px}.gb-ending{padding:23px}.gb-author{align-items:flex-start;padding:22px;gap:18px}.gb-author-mark{width:48px;height:48px}.gb-author-body{padding-left:18px}.gb-cta h2{font-size:31px}.gb-footer{gap:20px}.gb-crit-row{padding:18px;gap:14px}.gb-crit-row:not(:last-child):after{left:41px}}

/* =========================================================
   VENDOR SECTION RESPONSIVE
========================================================= */

@media(max-width:900px){
  .gb-vendor-hero{
    grid-template-columns:1fr;
    gap:34px;
  }

  .gb-vendor-preview{
    max-width:700px;
  }

  .gb-vendor-summary{
    max-width:700px;
  }

  .gb-vendor-actions{
    max-width:420px;
  }
}

@media(max-width:700px){
  .gb-tool{
    margin-top:68px;
    padding-top:38px!important;
  }

  .gb-preview-app{
    grid-template-columns:52px 1fr;
    min-height:300px;
  }

  .gb-preview-nav{
    padding-inline:10px;
  }

  .gb-preview-main{
    padding:16px;
  }

  .gb-preview-kpis{
    grid-template-columns:repeat(3,1fr);
  }

  .gb-preview-dashboard{
    grid-template-columns:1fr;
  }

  .gb-preview-sidecard{
    display:none;
  }

  .gb-feature-grid,
  .gb-balance{
    grid-template-columns:1fr;
  }

  .gb-feature-card:last-child:nth-child(odd){
    grid-column:auto;
  }

  .gb-feature-card{
    grid-template-columns:44px 1fr;
    gap:14px;
    padding:20px;
  }

  .gb-feature-number{
    width:40px;
    height:40px;
    font-size:12px;
  }

  .gb-balance-card{
    padding:24px 22px;
  }

  .gb-review{
    grid-template-columns:1fr;
  }

  .gb-review-mark{
    min-height:100px;
  }

  .gb-price{
    grid-template-columns:42px 1fr;
  }

  .gb-price h3{
    align-self:center;
  }

  .gb-article .gb-price p{
    grid-column:1/-1;
    padding:15px 0 0;
    border-left:0;
    border-top:1px solid #e3e8e5;
  }

  .gb-section-side{
    display:none;
  }
}

@media(max-width:520px){
  .gb-vendor-hero{
    gap:30px;
    margin-bottom:38px;
  }

  .gb-preview-window{
    border-radius:13px;
  }

  .gb-preview-browser{
    height:31px;
  }

  .gb-preview-app{
    grid-template-columns:44px 1fr;
    min-height:255px;
  }

  .gb-preview-nav{
    gap:12px;
    padding:13px 8px;
  }

  .gb-preview-nav b{
    width:25px;
    height:25px;
  }

  .gb-preview-nav span{
    width:20px;
  }

  .gb-preview-main{
    padding:13px;
  }

  .gb-preview-kpis>div{
    padding:9px;
  }

  .gb-preview-kpis strong{
    font-size:14px;
  }

  .gb-preview-footer{
    display:none;
  }

  .gb-preview-label{
    display:none;
  }

  .gb-tool-heading h2{
    font-size:38px;
  }

  .gb-vendor-actions{
    grid-template-columns:1fr;
  }

  .gb-vendor-intro{
    margin:36px 0 44px;
  }

  .gb-article .gb-vendor-intro p{
    font-size:15px;
  }

  .gb-feature-card{
    min-height:0;
  }

  .gb-balance-card{
    padding:22px 18px;
  }

  .gb-balance-heading h3{
    font-size:18px;
  }

  .gb-review{
    padding:22px;
  }

  
}

@media(prefers-reduced-motion:reduce){.gb-page *{scroll-behavior:auto!important}}
@media print{.gb-toc,.gb-mobile-toc,.gb-progress,.gb-cta,.gb-footer,.gb-copy-button{display:none}.gb-layout{display:block}.gb-wrap{width:100%}.gb-hero{padding:15px 0}.gb-hero h1{font-size:34px}.gb-table{min-width:0}.gb-balance,.gb-review,.gb-verdict{break-inside:avoid}.gb-tool{break-before:page}.gb-page{font-size:12px}.gb-article h2{font-size:27px}}
`;