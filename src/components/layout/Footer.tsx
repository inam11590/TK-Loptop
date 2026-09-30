"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Globe, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Flagship Models",
    links: [
      { label: "Titan X16", href: "/catalog/tk-titan-x16-apex", tag: "FLAGSHIP" },
      { label: "Titan Pro 18", href: "/catalog/tk-titan-studio-18", tag: "AI STUDIO" },
      { label: "Stealth Blade 14", href: "/catalog/tk-stealth-blade-14", tag: "240HZ" },
      { label: "Air Carbon 13", href: "/catalog/tk-air-carbon-13" },
    ],
  },
  {
    title: "Engineered Tech",
    links: [
      { label: "Cryo-Chamber Cooling", href: "#architecture" },
      { label: "Neural Engine", href: "#architecture" },
      { label: "Titanium Unibody", href: "#architecture" },
      { label: "TK OS Kernel", href: "#architecture" },
    ],
  },
  {
    title: "Support & Sales",
    links: [
      { label: "Enterprise Fleet", href: "#support" },
      { label: "TK Care+ Warranty", href: "#support" },
      { label: "Track Order", href: "#support" },
      { label: "Driver Downloads", href: "#support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Mission", href: "#company" },
      { label: "Retail Studios", href: "#company" },
      { label: "Carbon Neutrality", href: "#company" },
      { label: "Careers", href: "#company" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer
      aria-label="Site Footer"
      className="relative border-t border-[#1f2232] bg-[#050507] text-[#f8fafc] overflow-hidden"
    >
      {/* Top Cyber Cyan Hairline Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-3/4 bg-gradient-to-r from-transparent via-[#00f0ff]/45 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        {/* 5-Column Luxury Architecture */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Column 1 (Brand + Philosophy Quote + Newsletter Subscription Box) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d0e15] border border-[#00f0ff]/40 shadow-[0_0_20px_-4px_rgba(0,240,255,0.3)] group-hover:border-[#00f0ff] transition-all">
                <span className="font-mono text-sm font-black tracking-tighter text-[#00f0ff]">
                  TK
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-[0.18em] text-[#f8fafc]">
                  TK LAPTOP
                </span>
                <span className="font-mono text-[10px] tracking-[0.22em] text-[#94a3b8] uppercase">
                  PRECISION FOUNDRY
                </span>
              </div>
            </Link>

            <blockquote className="border-l-2 border-[#00f0ff]/50 pl-4 text-sm italic text-[#94a3b8] leading-relaxed">
              &ldquo;We do not iterate for incremental gains. Every micron of
              titanium and every watt of silicon is forged for those who
              architect the future.&rdquo;
            </blockquote>

            {/* Newsletter Subscription Box */}
            <div className="rounded-2xl bg-[#0d0e15] border border-[#1f2232] p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#00f0ff]">
                  TK INSIDERS DISPATCH
                </span>
                <ShieldCheck className="h-4 w-4 text-[#94a3b8]" />
              </div>
              <p className="text-xs text-[#94a3b8] mb-3.5 leading-relaxed">
                Receive priority allocation access for flagship silicon drops
                and private architectural briefings.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2.5 text-xs font-medium text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Allocation priority registered. Welcome to TK Insiders.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-2.5"
                >
                  <label htmlFor="tk-insider-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="tk-insider-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="engineer@domain.com"
                    className="flex-1 min-w-0 rounded-xl bg-[#050507] border border-[#1f2232] px-3.5 py-2.5 text-xs text-[#f8fafc] placeholder-[#94a3b8]/60 focus:border-[#00f0ff] focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#00f0ff] px-4 py-2.5 text-xs font-semibold text-[#050507] glow-cyan hover:bg-[#33f3ff] transition-all shrink-0 cursor-pointer"
                  >
                    <span>Join TK Insiders</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Columns 2 to 5 (Flagship Models, Engineered Tech, Support & Sales, Company) */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#f8fafc] mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#00f0ff] transition-colors"
                      >
                        <span>{link.label}</span>
                        {link.tag && (
                          <span className="rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[#00f0ff]">
                            {link.tag}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#1f2232] flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-[#94a3b8]">
          {/* Copyright */}
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 TK Laptop Inc. All rights reserved.</span>
          </div>

          {/* Currency / Country Selector & Legal Links */}
          <div className="flex flex-wrap items-center gap-6">
            {/* Currency / Country Selector */}
            <button
              type="button"
              aria-label="Select region and currency"
              className="inline-flex items-center gap-2 rounded-full bg-[#0d0e15] border border-[#1f2232] px-3.5 py-1.5 font-mono text-xs text-[#f8fafc] hover:border-[#00f0ff]/40 hover:text-[#00f0ff] transition-colors cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5 text-[#00f0ff]" />
              <span>Global (USD $)</span>
            </button>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="#privacy"
                className="hover:text-[#f8fafc] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#terms"
                className="hover:text-[#f8fafc] transition-colors"
              >
                Terms of Hardware Sale
              </Link>
              <Link
                href="#status"
                className="inline-flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span>System Status</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
