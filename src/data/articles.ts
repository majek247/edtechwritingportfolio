import type { ArtKind } from "../components/Art";

export type ArticleData = {
  slug: string;
  category: string;
  title: string;
  dek: string;
  readTime: string;
  hero: ArtKind;
  meta: { format: string; length: string; seo: string; audience: string };
  takeaways: string[];
};

export const articles: ArticleData[] = [
  {
    slug: "open-banking-2025",
    category: "Open banking",
    title: "Open Banking in 2025: Key Trends, Benefits and What’s Next",
    dek: "A plain-English guide to how open banking is reshaping payments, lending and personal finance, and what businesses should prepare for next.",
    readTime: "9 min read",
    hero: "bank",
    meta: {
      format: "Long-form guide with visuals",
      length: "2,000 words",
      seo: "Open banking, fintech trends, data security",
      audience: "Fintech founders, product leaders, finance teams",
    },
    takeaways: [
      "What open banking is and how consent-based data sharing works",
      "The four trends shaping open banking in 2025",
      "Real benefits for businesses and everyday users",
      "Where the market is heading next",
    ],
  },
  {
    slug: "embedded-finance",
    category: "Embedded finance",
    title: "Embedded Finance: Why Every Brand Is Becoming a Bank",
    dek: "Payments, lending and insurance are moving inside the apps people already use. Here is how the model works and where the risk really sits.",
    readTime: "8 min read",
    hero: "embed",
    meta: {
      format: "Explainer with stack diagram",
      length: "1,800 words",
      seo: "Embedded finance, banking-as-a-service, fintech partnerships",
      audience: "SaaS founders, marketplace operators, product managers",
    },
    takeaways: [
      "How embedded finance works behind the checkout",
      "Why software platforms are adding financial products",
      "Where compliance and partner risk sit",
      "How to choose a first embedded product",
    ],
  },
  {
    slug: "ai-fraud-detection",
    category: "Risk and security",
    title: "AI-Powered Fraud Detection: Stopping Payment Fraud in Real Time",
    dek: "Instant payments leave seconds to decide. How machine learning scores risk, where it fails, and what good looks like for a fintech team.",
    readTime: "7 min read",
    hero: "fraud",
    meta: {
      format: "Thought-leadership article",
      length: "1,600 words",
      seo: "Fraud detection, machine learning, real-time payments",
      audience: "Risk leads, payments engineers, compliance teams",
    },
    takeaways: [
      "Why real-time payments changed the fraud problem",
      "How models score a transaction in milliseconds",
      "The false-positive cost most teams never budget for",
      "A practical checklist for fintech risk teams",
    ],
  },
];

export const getArticle = (slug?: string) => articles.find((a) => a.slug === slug);
