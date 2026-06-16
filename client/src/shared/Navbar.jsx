import React, { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null); // 'offer' | 'for' | null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative z-50 w-full px-4 py-3 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <nav className="mx-auto flex max-w-9xl items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <svg className="fill-foreground h-7 w-auto text-foreground dark:text-white" width="168" height="32" viewBox="0 0 168 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.2678 4.97627L27.1267 4.82808L26.9834 4.68202C20.916 -1.46285 11.1039 -1.55951 4.92104 4.39422L4.77561 4.53597L4.63018 4.67988C1.64462 7.70399 0 11.7247 0 16.001V16.2007C0.0513277 20.4018 1.69167 24.3452 4.63018 27.3199L4.77561 27.4638C7.83816 30.4879 11.8225 32 15.8089 32H15.9993C19.9836 31.9506 23.9529 30.3913 26.9877 27.3178L27.1288 27.1717C33.055 21.0161 33.1021 11.1856 27.27 4.97413L27.2678 4.97627ZM14.5856 7.64171L15.0946 15.2492L11.6107 10.8763L10.1329 12.3733L14.4167 15.885L6.55925 15.4404C4.43129 12.3454 3.70629 9.79596 4.04205 7.98106L4.04847 7.94455L4.0998 7.69111C4.14899 7.4527 4.20031 7.2508 4.29228 7.04461L4.34147 6.94152C4.46551 6.69667 4.66226 6.42175 5.00445 6.0738L5.1178 5.96212C5.36802 5.72156 5.54339 5.59914 5.71234 5.51108L5.78933 5.47242C5.86633 5.43591 5.94973 5.39939 6.04597 5.36073L6.24487 5.27912C6.31544 5.24905 6.39244 5.21683 6.47584 5.18032C8.31936 4.61759 11.0932 5.292 14.5856 7.64385V7.64171ZM15.0925 17.4465L14.6498 23.8211C13.7558 23.1253 12.8276 22.3284 11.8674 21.4306L15.0925 17.4443V17.4465ZM14.4359 16.7484L10.4986 20.1054C9.50204 19.1003 8.63161 18.1273 7.87452 17.1909L14.4359 16.7484ZM16.6216 15.8936L20.5182 12.6654C21.517 13.6728 22.3938 14.6479 23.1552 15.5822L16.6216 15.8936ZM16.4184 8.97549C17.3017 9.66924 18.2192 10.4618 19.1666 11.3488L15.9693 15.2621L16.4184 8.97335V8.97549ZM19.2286 21.5251L19.4553 21.8108L20.931 20.3159L20.8839 20.2773L16.6644 16.7677L24.5389 17.4185C26.5172 20.2816 27.2849 22.6635 27.1074 24.4247L27.086 24.5944L27.0582 24.7683C26.9406 25.417 26.5728 25.926 26.1386 26.3813L26.0509 26.4715C25.79 26.7379 25.5847 26.9441 25.3473 27.118L25.2425 27.1911C24.9645 27.3779 24.618 27.5369 24.0791 27.6765C22.2463 27.9793 19.6713 27.2533 16.5361 25.185L15.9715 17.4572L19.2265 21.5294L19.2286 21.5251ZM21.1983 9.51889C18.1978 6.70526 15.1716 5.19965 12.3849 4.32978L12.1069 4.24602L11.8225 4.16226C10.5885 3.81001 9.44857 3.6747 8.40705 3.76276C10.5393 2.43327 12.988 1.70088 15.548 1.65577H15.8046C19.5901 1.65362 23.1466 3.14634 25.8221 5.85473L26.0467 6.08884C30.3539 10.6486 31.1046 17.4013 28.3115 22.7322C28.3115 21.8666 28.1661 20.9431 27.8773 19.9637L27.8132 19.7489L27.7619 19.5878L27.6699 19.3107C26.7139 16.5293 24.9431 13.3334 22.0944 10.3973L21.8057 10.1052L21.4999 9.80455L21.2005 9.51889H21.1983ZM5.78933 26.1408L5.62252 25.9732C3.05186 23.282 1.64035 19.7532 1.64035 15.9988V15.8034C1.66815 13.8682 2.07022 11.9953 2.81233 10.2706C2.84441 11.1641 3.02833 12.1177 3.35982 13.1294L3.45606 13.415C4.46979 16.379 6.34111 19.7768 9.53625 22.8697C12.8362 26.0656 16.2666 27.6915 19.2971 28.5549C20.1996 28.8127 21.0529 28.9544 21.8528 28.9759C19.9879 29.8694 17.9347 30.3419 15.8068 30.3419C12.0813 30.3419 8.576 28.8964 5.91551 26.2675L5.78933 26.1408Z"></path>
          </svg>
        </a>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          {/* Dropdown 1: What we offer */}
          <div
            className="relative py-2"
            onMouseEnter={() => handleMouseEnter('offer')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              aria-expanded={activeDropdown === 'offer'}
              aria-haspopup="menu"
              className="flex cursor-pointer items-center gap-1 text-[15px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground outline-none"
            >
              What we offer
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className={`size-3 text-muted-foreground transition-transform duration-200 ${activeDropdown === 'offer' ? 'rotate-180' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
              </svg>
            </button>

            {/* Dropdown Content */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] bg-background border border-border rounded-2xl p-4 shadow-xl transition-all duration-300 ease-out ${
                activeDropdown === 'offer' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="flex gap-4">
                <a href="/what-we-offer/ai-crm-for-financial-advisors" className="group flex w-1/2 flex-col gap-3 overflow-hidden text-left">
                  <div className="h-[180px] w-full overflow-hidden rounded-xl bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 border border-border group-hover:border-purple-500/40 transition-all duration-300">
                    <div className="w-full h-full flex items-center justify-center text-purple-400 font-bold bg-black/40">AI Practice Management</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground group-hover:text-purple-500 transition-colors">AI Practice Management</span>
                    <span className="text-xs text-muted-foreground">Your clients, meetings, and tasks - captured by AI, searchable in seconds.</span>
                  </div>
                </a>

                <a href="/what-we-offer/custody-and-execution" className="group flex w-1/2 flex-col gap-3 overflow-hidden text-left">
                  <div className="h-[180px] w-full overflow-hidden rounded-xl bg-gradient-to-tr from-blue-500/20 to-teal-500/20 border border-border group-hover:border-blue-500/40 transition-all duration-300">
                    <div className="w-full h-full flex items-center justify-center text-blue-400 font-bold bg-black/40">Custody &amp; Execution</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground group-hover:text-blue-500 transition-colors">Custody &amp; Execution</span>
                    <span className="text-xs text-muted-foreground">Trade, rebalance, and custody - all in one place with instant opening.</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Dropdown 2: Who's it for */}
          <div
            className="relative py-2"
            onMouseEnter={() => handleMouseEnter('for')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              aria-expanded={activeDropdown === 'for'}
              aria-haspopup="menu"
              className="flex cursor-pointer items-center gap-1 text-[15px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground outline-none"
            >
              Who's it for
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className={`size-3 text-muted-foreground transition-transform duration-200 ${activeDropdown === 'for' ? 'rotate-180' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
              </svg>
            </button>

            {/* Dropdown Content */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] bg-background border border-border rounded-2xl p-4 shadow-xl transition-all duration-300 ease-out ${
                activeDropdown === 'for' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="flex gap-4">
                <a href="/whos-it-for/independent-firms" className="group flex w-1/2 flex-col gap-3 overflow-hidden text-left">
                  <div className="h-[180px] w-full overflow-hidden rounded-xl bg-gradient-to-tr from-pink-500/20 to-orange-500/20 border border-border group-hover:border-pink-500/40 transition-all duration-300">
                    <div className="w-full h-full flex items-center justify-center text-pink-400 font-bold bg-black/40">Independent Firms</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground group-hover:text-pink-500 transition-colors">Independent firms</span>
                    <span className="text-xs text-muted-foreground">Spend less time on admin and more time delivering advice that matters.</span>
                  </div>
                </a>

                <a href="/whos-it-for/consolidators" className="group flex w-1/2 flex-col gap-3 overflow-hidden text-left">
                  <div className="h-[180px] w-full overflow-hidden rounded-xl bg-gradient-to-tr from-green-500/20 to-emerald-500/20 border border-border group-hover:border-green-500/40 transition-all duration-300">
                    <div className="w-full h-full flex items-center justify-center text-emerald-400 font-bold bg-black/40">Consolidators</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground group-hover:text-green-500 transition-colors">Consolidators</span>
                    <span className="text-xs text-muted-foreground">Unify firms, data, and controls to scale faster – without drag.</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Regular Links */}
          <a href="/integrations" className="text-[15px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground">Integrations</a>
          <a href="/security" className="text-[15px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground">Security</a>
          <a href="/pricing" className="text-[15px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground">Pricing</a>
          <a href="/about" className="text-[15px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground">About</a>
        </div>

        {/* Action button */}
        <button
          className="shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-[14px] font-semibold transition-all duration-200 ease-in-out border border-border bg-secondary text-secondary-foreground hover:bg-secondary-hover h-9 px-4 hidden md:flex"
          type="button"
        >
          Get started
        </button>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-foreground md:hidden hover:bg-secondary/50 transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg transition-all duration-300 ${
        mobileMenuOpen ? 'opacity-100 max-h-[90vh] pointer-events-auto overflow-y-auto' : 'opacity-0 max-h-0 pointer-events-none overflow-hidden'
      }`}>
        <div className="flex flex-col gap-4 p-6 text-left">
          {/* Offer Dropdown (Accordion style) */}
          <div className="flex flex-col gap-2">
            <div className="font-bold text-foreground text-sm uppercase tracking-wider text-muted-foreground/60">What we offer</div>
            <a href="/what-we-offer/ai-crm-for-financial-advisors" className="pl-2 py-1 text-foreground hover:text-purple-500 text-sm font-medium">AI Practice Management</a>
            <a href="/what-we-offer/custody-and-execution" className="pl-2 py-1 text-foreground hover:text-blue-500 text-sm font-medium">Custody &amp; Execution</a>
          </div>

          <hr className="border-border" />

          {/* Who's it for Dropdown */}
          <div className="flex flex-col gap-2">
            <div className="font-bold text-foreground text-sm uppercase tracking-wider text-muted-foreground/60">Who's it for</div>
            <a href="/whos-it-for/independent-firms" className="pl-2 py-1 text-foreground hover:text-pink-500 text-sm font-medium">Independent Firms</a>
            <a href="/whos-it-for/consolidators" className="pl-2 py-1 text-foreground hover:text-green-500 text-sm font-medium">Consolidators</a>
          </div>

          <hr className="border-border" />

          {/* Simple Links */}
          <a href="/integrations" className="py-1 text-foreground hover:text-purple-500 text-sm font-medium">Integrations</a>
          <a href="/security" className="py-1 text-foreground hover:text-purple-500 text-sm font-medium">Security</a>
          <a href="/pricing" className="py-1 text-foreground hover:text-purple-500 text-sm font-medium">Pricing</a>
          <a href="/about" className="py-1 text-foreground hover:text-purple-500 text-sm font-medium">About</a>

          <button
            className="w-full mt-4 justify-center rounded-full text-[14px] font-semibold border border-border bg-secondary text-secondary-foreground hover:bg-secondary-hover h-10 px-4 flex items-center"
            type="button"
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
