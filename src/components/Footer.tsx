import { SITE } from "../data/site";

export default function Footer() {
  return (
    <footer
      className="bg-[#021516] text-white"
      style={{ fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <div className="mx-auto w-[min(1340px,calc(100%_-_32px))] border-t border-[#cdeee8]/[.14] pt-16 md:w-[min(1340px,calc(100%_-_96px))] lg:pt-20">
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
            <p className="mt-6 max-w-[320px] text-[18px] font-semibold leading-[1.5] text-[#f2fbf9]">
              Content built to support search, sales and pipeline.
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[.02em] text-[#8fd9cf]">
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
                  <a href={href} className="text-[#a9d9d1] transition-colors duration-200 hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[.02em] text-[#8fd9cf]">
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
                    className="text-[#a9d9d1] transition-colors duration-200 hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* LET'S TALK */}
          <div className="lg:border-l lg:border-[#cdeee8]/[.14] lg:pl-10">
            <p className="text-[13px] font-medium uppercase tracking-[.02em] text-[#8fd9cf]">
              Let&rsquo;s talk
            </p>
            <h3 className="mt-6 max-w-[340px] text-[26px] font-bold leading-[1.25] tracking-[-0.01em] text-[#f2fbf9]">
              Have a content project in mind?
            </h3>
            <a
              href="https://www.seo-growup.com/get-in-touch"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-14 items-center gap-6 rounded-full bg-[#167273] px-8 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#1f8f8f]"
            >
              Let&rsquo;s talk
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.7]">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 border-t border-[#cdeee8]/[.14] py-8">
          <p className="text-[14px] text-[#a9d9d1]/70">
            &copy; {new Date().getFullYear()} GrowUp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}