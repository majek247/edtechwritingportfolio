import type { ReactNode } from "react";
import { Link, Navigate } from "react-router-dom";
import Art from "./Art";
import { articles, getArticle } from "../data/articles";
import { SITE } from "../data/site";

// Header, overview strip, key takeaways and footer CTA for every article.
// Title, dek, hero art, meta and takeaways come from src/data/articles.ts.
// The article body is whatever you put inside the page file.
export default function ArticleShell({ slug, children }: { slug: string; children: ReactNode }) {
  const a = getArticle(slug);
  if (!a) return <Navigate to="/" replace />;
  const next = articles[(articles.indexOf(a) + 1) % articles.length];

  return (
    <main>
      <section className="bg-gradient-to-br from-forest via-ink to-ink pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 md:px-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="hero-in">
            <Link to="/" className="block w-fit text-sm text-sage hover:text-mint">← Back to portfolio</Link>
            <p className="mt-8 w-fit rounded-full border border-mint/40 px-4 py-1.5 text-xs font-semibold text-mint">{a.category}</p>
            <h1 className="mt-6 text-4xl leading-[1.08] md:text-6xl">{a.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-sage">{a.dek}</p>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_120px_-30px_rgba(123,224,164,.35)]">
            <Art kind={a.hero} className="block aspect-[4/3] w-full" />
          </div>
        </div>
        <div className="border-t border-white/10 bg-ink/60">
          <dl className="mx-auto grid max-w-7xl gap-6 px-6 py-7 text-sm md:grid-cols-4 md:px-10">
            {[["Format", a.meta.format], ["Length", a.meta.length], ["SEO focus", a.meta.seo], ["Target audience", a.meta.audience]].map(([k, v]) => (
              <div key={k}><dt className="text-xs text-sage">{k}</dt><dd className="mt-1 font-medium">{v}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-10">
          <div className="rounded-3xl bg-forest p-8 text-paper md:p-12">
            <h2 className="text-3xl">Key takeaways</h2>
            <ul className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-2">
              {a.takeaways.map((t) => (
                <li key={t} className="flex gap-3 text-sage"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-mint" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="mt-20 space-y-24">{children}</div>
        </div>
      </section>

      <section className="bg-forest">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:px-10 lg:grid-cols-2">
          <div>
            <p className="text-sm text-sage">Next article</p>
            <Link to={`/articles/${next.slug}`} className="mt-3 block font-serif text-3xl leading-tight hover:text-mint md:text-4xl">{next.title}</Link>
          </div>
          <div className="lg:text-right">
            <a href={SITE.contact} className="inline-block rounded-full bg-mint px-8 py-4 text-sm font-semibold text-ink transition hover:bg-paper">Commission a piece like this</a>
          </div>
        </div>
      </section>
    </main>
  );
}
