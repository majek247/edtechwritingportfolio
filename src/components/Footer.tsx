import { SITE } from "../data/site";

export default function Footer() {
  return (
    <footer className="bg-[#041b1c] text-white">
      <div className="mx-auto w-[min(1340px,calc(100%-48px))] border-t border-[#3fcfc0]/20 pt-16 md:w-[min(1340px,calc(100%-96px))] lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_.7fr_.7fr_1fr] lg:gap-10">
          {/* BRAND */}
          <div>
            <a href="https://www.seo-growup.com/" target="_blank" rel="noopener noreferrer">
              <img
                src="/images/growupblacklogotransparent.png"
                alt="GrowUp"
                width="180"
                height="48"
                className="h-11 w-auto"
              />
            </a>
            <p className="mt-6 max-w-[320px] font-serif text-[22px] leading-[1.45] text-[#e8e4d9]">
          Content built to support search, sales and pipeline.
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.22em] text-[#6fdad1]">
              Navigation
            </p>
            <ul className="mt-6 space-y-4 text-[16px]">
              {[
                ["Portfolio", "/#work"],
                ["Approach", "/#approach"],
                ["Investment", "/#investment"],
                ["FAQ", "/#faq"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-[#e8e4d9] transition hover:text-[#4de3d2]">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.22em] text-[#6fdad1]">
              Company
            </p>
            <ul className="mt-6 space-y-4 text-[16px]">
              {[
                ["Why GrowUp", "https://www.seo-growup.com/why-growup?hsLang=en"],
                ["Success Stories", "https://www.seo-growup.com/success-stories?hsLang=en"],
                ["Pricing", "https://www.seo-growup.com/pricing?hsLang=en"],
                ["Contact Us", "https://www.seo-growup.com/get-in-touch?hsLang=en"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e8e4d9] transition hover:text-[#4de3d2]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* LET'S TALK */}
          <div className="lg:border-l lg:border-white/10 lg:pl-10">
            <p className="text-[11px] font-bold uppercase tracking-[.22em] text-[#6fdad1]">
              Let&rsquo;s talk
            </p>
            <h3 className="mt-6 max-w-[340px] font-serif text-[30px] font-normal leading-[1.2] tracking-[-.02em] text-[#f6f2e8]">
     Have a content project in mind?
            </h3>
            <a
              href="https://www.seo-growup.com/get-in-touch"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-14 items-center gap-8 rounded-full bg-[#167273] px-8 text-[16px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1d8f90]"
            >
              Let&rsquo;s talk
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.7]">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 border-t border-[#3fcfc0]/20 py-8">
          <p className="text-[14px] text-[#98ada8]">
            &copy; {new Date().getFullYear()} GrowUp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
