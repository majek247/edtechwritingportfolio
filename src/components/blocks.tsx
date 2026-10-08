import type { ReactNode } from "react";
import Art, { ArtKind } from "./Art";

export const Section = ({ heading, children }: { heading: string; children: ReactNode }) => (
  <article className="grid gap-8 md:grid-cols-[0.8fr_1.6fr] md:gap-14">
    <h2 className="text-3xl leading-tight md:sticky md:top-8 md:self-start md:text-4xl">{heading}</h2>
    <div className="space-y-6">{children}</div>
  </article>
);

export const P = ({ children }: { children: ReactNode }) => (
  <p className="font-serif text-xl leading-[1.75] text-ink/85">{children}</p>
);

export const Quote = ({ children }: { children: ReactNode }) => (
  <blockquote className="border-l-4 border-mint pl-6 font-serif text-2xl leading-snug text-pine">{children}</blockquote>
);

export const Cards = ({ items }: { items: { title: string; text: string }[] }) => (
  <div className="grid gap-4 sm:grid-cols-2">
    {items.map((l) => (
      <div key={l.title} className="rounded-2xl border border-ink/10 bg-white p-6">
        <h3 className="text-xl">{l.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{l.text}</p>
      </div>
    ))}
  </div>
);

export const Figure = ({ kind, caption }: { kind: ArtKind; caption: string }) => (
  <figure>
    <div className="overflow-hidden rounded-3xl"><Art kind={kind} className="block aspect-[4/3] w-full" /></div>
    <figcaption className="mt-3 text-sm text-ink/60">{caption}</figcaption>
  </figure>
);
