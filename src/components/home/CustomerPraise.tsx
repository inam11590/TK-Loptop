"use client";

import React from "react";
import { Star, ShieldCheck, Quote, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface EngineerReview {
  id: string;
  author: string;
  role: string;
  organization: string;
  machine: string;
  configTag: string;
  quote: string;
  rating: number;
}

const VERIFIED_REVIEWS: EngineerReview[] = [
  {
    id: "review-1",
    author: "Dr. Marcus Chen",
    role: "Principal AI Research Scientist",
    organization: "Aether Neural Labs",
    machine: "TK Titan X16 Apex",
    configTag: "128GB Unified • 4TB RAID-0",
    quote:
      "Having 128GB of 1.2 TB/s unified memory inside a 1.42 kg Grade-5 titanium chassis completely changed how our team prototypes quantized 70B models on flights. The Cryo-Chamber V3 fans barely whisper even during multi-hour fine-tuning runs.",
    rating: 5,
  },
  {
    id: "review-2",
    author: "Elena Rostova",
    role: "Lead Unreal Engine Technical Director",
    organization: "Valkyrie VFX Studio",
    machine: "TK Titan Studio 18",
    configTag: "RTX 5090 24GB • Nano-Matte",
    quote:
      "The factory Delta-E < 0.8 calibration on the ProXDR Nano-Matte panel matches our $30,000 studio reference monitors out of the box. Zero glare under stage lighting and zero thermal clock drops during 8K path-traced dailies.",
    rating: 5,
  },
  {
    id: "review-3",
    author: "Soren Lindqvist",
    role: "Distinguished Kernel & Infrastructure Architect",
    organization: "Nordic Cloud Systems",
    machine: "TK Pro Engine 15",
    configTag: "64GB ECC • Linux Certified",
    quote:
      "First laptop in a decade where mainline Linux suspend, Thunderbolt 5 daisy-chaining, and hardware kill-switches work with zero kernel patches. Milled titanium unibody feels like an aerospace instrument, not consumer plastic.",
    rating: 5,
  },
];

export function CustomerPraise() {
  return (
    <section
      id="support"
      aria-label="Verified Enterprise Engineer and Creator Reviews"
      className="deferred-section relative py-24 sm:py-32 border-t border-white/[0.06] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="cyan" className="mb-5">
            FIELD VALIDATION // VERIFIED OWNERS
          </Badge>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#f8fafc]">
            Trusted by Principal{" "}
            <span className="bg-gradient-to-r from-[#f8fafc] via-[#00f0ff] to-[#3b82f6] bg-clip-text text-transparent">
              Engineers & Visionaries
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#94a3b8] leading-relaxed">
            Deployed across frontier AI research labs, Hollywood VFX houses, and
            autonomous systems teams worldwide.
          </p>
        </div>

        {/* 3-Column Review Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {VERIFIED_REVIEWS.map((review) => (
            <article
              key={review.id}
              className="flex flex-col justify-between rounded-3xl bg-[#0d0e15] border border-[#1f2232] p-6 sm:p-8 transition-all duration-300 hover:border-[#00f0ff]/40 hover:shadow-[0_0_32px_-8px_rgba(0,240,255,0.22)]"
            >
              <div>
                {/* Top Rating & Machine Pill */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-1 text-[#00f0ff]">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-[#00f0ff] text-[#00f0ff]"
                      />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#050507] border border-white/10 px-2.5 py-1 font-mono text-[10px] text-emerald-400">
                    <ShieldCheck className="h-3 w-3" />
                    <span>VERIFIED SERIAL</span>
                  </span>
                </div>

                {/* Quote Body */}
                <div className="relative">
                  <Quote className="h-6 w-6 text-[#00f0ff]/25 mb-2" />
                  <p className="text-sm sm:text-base text-[#f8fafc]/90 leading-relaxed">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Author & Hardware Config Footer */}
              <div className="mt-6 pt-5 border-t border-[#1f2232]">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold text-[#f8fafc]">
                      {review.author}
                    </div>
                    <div className="text-xs text-[#94a3b8]">
                      {review.role} —{" "}
                      <span className="text-[#f8fafc]/80">
                        {review.organization}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#050507] border border-[#1f2232] px-3 py-1.5 font-mono text-[10px] text-[#00f0ff]">
                  <Terminal className="h-3 w-3 shrink-0" />
                  <span>
                    {review.machine} ({review.configTag})
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerPraise;
