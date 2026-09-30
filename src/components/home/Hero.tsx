"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Cpu,
  Monitor,
  BatteryCharging,
  Feather,
  Sparkles,
  Activity,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SpecPillar {
  metric: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SPEC_HUD_PILLARS: SpecPillar[] = [
  {
    metric: "Up to 64-Core",
    label: "Neural Compute Engine",
    sublabel: "240 TOPS On-Device AI",
    icon: Cpu,
  },
  {
    metric: "3.8K ProXDR",
    label: "240Hz Nano-Matte Display",
    sublabel: "1,600 Nits Peak HDR // 100% DCI-P3",
    icon: Monitor,
  },
  {
    metric: "24-Hour",
    label: "Battery Efficiency",
    sublabel: "99.9Wh Silicon-Carbon Cell",
    icon: BatteryCharging,
  },
  {
    metric: "1.38 kg",
    label: "Aerogel & Forged Carbon Chassis",
    sublabel: "CNC Grade-5 Stealth Titanium",
    icon: Feather,
  },
];

export function Hero() {
  return (
    <section
      aria-label="TK Titan-X16 Flagship Showcase"
      className="relative isolate overflow-hidden pt-10 pb-24 sm:pt-16 sm:pb-32"
    >
      {/* Ambient Cyber Cyan & Cobalt Radial Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[680px] w-[1150px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,240,255,0.15), transparent 70%)",
          }}
        />
        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 h-[460px] w-[860px] rounded-full bg-[#3b82f6]/[0.08] blur-[150px]" />

        {/* Subtle Architectural Precision Grid */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1f2232 1px, transparent 1px), linear-gradient(to bottom, #1f2232 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 75% 65% at 50% 32%, #000 25%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 65% at 50% 32%, #000 25%, transparent 100%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Headline & Positioning */}
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Top Micro-Badge with Pulsing Green/Cyan Live Status Dot */}
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full bg-[#0d0e15]/90 border border-[#00f0ff]/35 px-4 py-1.5 shadow-[0_0_24px_-4px_rgba(0,240,255,0.28)] backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-emerald-400 to-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
            </span>
            <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#f8fafc]">
              NEW RELEASE //{" "}
              <span className="text-[#00f0ff]">TK TITAN-X16 GENERATION 3</span>
            </span>
          </div>

          {/* Primary Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-black tracking-tight text-[#f8fafc] uppercase leading-[1.03]">
            UNREFINED POWER.{" "}
            <span className="block mt-1 bg-gradient-to-r from-[#f8fafc] via-[#00f0ff] to-[#3b82f6] bg-clip-text text-transparent drop-shadow-[0_0_38px_rgba(0,240,255,0.28)]">
              ZERO COMPROMISE.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-[#94a3b8] leading-relaxed font-normal">
            Engineered with liquid-metal thermal architecture, up to 128GB
            unified memory, and edge AI acceleration. Built for creators and
            developers who refuse limits.
          </p>

          {/* Call-to-Action Group */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/catalog/tk-titan-x16-apex"
              className="w-full sm:w-auto"
            >
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Sparkles className="h-4 w-4" />}
                rightIcon={<ArrowUpRight className="h-4 w-4" />}
                className="w-full sm:w-auto hover:-translate-y-0.5 shadow-[0_0_30px_-4px_rgba(0,240,255,0.45)]"
              >
                Pre-Order Titan-X16
              </Button>
            </Link>

            <Link href="/catalog" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-white/15 hover:border-white/35 hover:-translate-y-0.5"
              >
                Compare Specs
              </Button>
            </Link>
          </div>

          {/* Telemetry Micro-Captions */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-[#94a3b8]/80">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#00f0ff]" />
              3-Year TK Care+ Global Concierge
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-[#00f0ff]" />
              Ships Directly from TK Precision Foundry
            </span>
          </div>
        </div>

        {/* Visual Hardware Spotlight */}
        <div className="relative mx-auto mt-14 sm:mt-16 max-w-5xl">
          {/* Ambient Spotlight Backdrop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 rounded-[40px]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,240,255,0.18), rgba(59,130,246,0.06) 45%, transparent 72%)",
            }}
          />

          {/* Floating Hardware Telemetry Callout — Top Left */}
          <div className="hidden lg:flex absolute -left-6 top-10 z-20 items-center gap-3 rounded-2xl bg-[#0d0e15]/90 border border-white/10 px-4 py-3 backdrop-blur-xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.75)]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff]">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#94a3b8]">
                CRYO-CHAMBER VAPOR
              </div>
              <div className="text-xs font-semibold text-[#f8fafc]">
                Liquid-Metal // 260W TDP Sustained
              </div>
            </div>
          </div>

          {/* Floating Hardware Telemetry Callout — Top Right */}
          <div className="hidden lg:flex absolute -right-6 top-16 z-20 items-center gap-3 rounded-2xl bg-[#0d0e15]/90 border border-white/10 px-4 py-3 backdrop-blur-xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.75)]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3b82f6]/15 border border-[#3b82f6]/40 text-[#00f0ff]">
              <Cpu className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#94a3b8]">
                UNIFIED MEMORY ARCHITECTURE
              </div>
              <div className="text-xs font-semibold text-[#f8fafc]">
                128GB LPDDR5X // 1.2 TB/s Bandwidth
              </div>
            </div>
          </div>

          {/* Flagship Laptop Presentation Stage */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#131522] via-[#0d0e15] to-[#07080d] border border-[#1f2232] p-4 sm:p-8 lg:p-10 shadow-[0_25px_80px_-15px_rgba(0,240,255,0.18)] overflow-hidden">
            {/* Top Stage Rim Light */}
            <div className="pointer-events-none absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/70 to-transparent" />

            {/* Flagship Laptop Lid / Open Glowing 3.8K ProXDR Screen */}
            <div className="relative mx-auto max-w-3xl">
              {/* Outer CNC Titanium Display Bezel */}
              <div className="relative aspect-[16/10] w-full rounded-t-2xl rounded-b-md bg-[#050507] p-2 sm:p-3 border-t-2 border-x-2 border-b border-[#2a2f45] shadow-[0_0_50px_-10px_rgba(0,240,255,0.3)] overflow-hidden">
                {/* Camera Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex h-3.5 w-24 items-center justify-center rounded-b-lg bg-[#050507] border-x border-b border-white/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff]/80 shadow-[0_0_6px_#00f0ff]" />
                </div>

                {/* Glowing Screen Viewport */}
                <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#070913] border border-white/10">
                  {/* High-Resolution Unsplash Tech Hardware Imagery with LCP Priority */}
                  <img
                    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1800&q=85"
                    alt="TK Titan-X16 Generation 3 flagship dark titanium laptop with glowing display"
                    fetchPriority="high"
                    width={1600}
                    height={1000}
                    className="h-full w-full object-cover object-center opacity-70 mix-blend-luminosity scale-105 transition-transform duration-700 hover:scale-100"
                  />

                  {/* Cyber Cyan & Cobalt Screen Shader Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#050507]/95 via-[#050507]/40 to-[#00f0ff]/20" />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 65% 35%, rgba(0,240,255,0.22), rgba(59,130,246,0.15) 45%, transparent 75%)",
                    }}
                  />

                  {/* On-Screen TK OS Kernel Live Telemetry HUD */}
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-md bg-[#050507]/80 border border-white/10 px-2.5 py-1 backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff]" />
                        <span className="font-mono text-[10px] tracking-widest text-[#f8fafc]">
                          TK-OS KERNEL 6.4 // NEURAL ENGINE ACTIVE
                        </span>
                      </div>
                      <span className="hidden sm:inline-block rounded-md bg-[#00f0ff]/15 border border-[#00f0ff]/40 px-2.5 py-1 font-mono text-[10px] font-semibold text-[#00f0ff]">
                        3840 × 2400 @ 240HZ
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg">
                      <div className="rounded-lg bg-[#050507]/80 border border-white/10 p-2.5 backdrop-blur-md">
                        <div className="font-mono text-[9px] text-[#94a3b8]">
                          NPU THROUGHPUT
                        </div>
                        <div className="font-mono text-xs sm:text-sm font-bold text-[#00f0ff]">
                          240.8 TOPS
                        </div>
                      </div>
                      <div className="rounded-lg bg-[#050507]/80 border border-white/10 p-2.5 backdrop-blur-md">
                        <div className="font-mono text-[9px] text-[#94a3b8]">
                          CORE TEMP
                        </div>
                        <div className="font-mono text-xs sm:text-sm font-bold text-emerald-400">
                          41.2°C CRYO
                        </div>
                      </div>
                      <div className="rounded-lg bg-[#050507]/80 border border-white/10 p-2.5 backdrop-blur-md">
                        <div className="font-mono text-[9px] text-[#94a3b8]">
                          VRAM POOL
                        </div>
                        <div className="font-mono text-xs sm:text-sm font-bold text-[#f8fafc]">
                          128 GB UNIFIED
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Precision Hinge Mechanism */}
              <div className="mx-auto h-2 w-[82%] bg-gradient-to-r from-[#12141f] via-[#2a3048] to-[#12141f] border-x border-white/10" />

              {/* Laptop Base Deck with Keyboard Under-Glow */}
              <div className="relative mx-auto -mt-0.5 h-6 sm:h-8 w-[106%] -left-[3%] rounded-b-2xl rounded-t-sm bg-gradient-to-b from-[#23273a] via-[#121420] to-[#08090f] border-t border-white/20 border-x border-b border-[#1f2232] shadow-[0_20px_50px_rgba(0,240,255,0.28)]">
                {/* Per-Key Cyber Cyan Keyboard Seam Glow */}
                <div className="mx-auto mt-1 h-[3px] w-[76%] rounded-full bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-90 blur-[1px]" />
                {/* Front Trackpad Notch */}
                <div className="mx-auto mt-1 h-1.5 w-20 sm:w-28 rounded-b-md bg-[#050507]/90 border-x border-b border-white/15" />
                {/* Underglow Reflection Bar */}
                <div className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 h-4 w-[85%] rounded-full bg-[#00f0ff]/40 blur-xl" />
              </div>
            </div>

            {/* Bottom Caption Strip inside Stage */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.07] pt-4 text-xs text-[#94a3b8]">
              <div className="flex items-center gap-2 font-mono">
                <span className="inline-block h-2 w-2 rounded-full bg-[#00f0ff]" />
                <span>
                  CHASSIS: ANODIZED STEALTH TITANIUM // ZERO-FLEX UNIBODY
                </span>
              </div>
              <div className="font-mono text-[#00f0ff]">
                STARTING AT $2,899 USD
              </div>
            </div>
          </div>
        </div>

        {/* Hardware Spec HUD Bar (4 Live Metric Pillars) */}
        <div
          aria-label="Hardware Specification HUD"
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SPEC_HUD_PILLARS.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.metric}
                className="group relative overflow-hidden rounded-2xl bg-[#0d0e15] border border-[#1f2232] p-6 transition-all duration-300 hover:border-[#00f0ff]/50 hover:shadow-[0_0_30px_-6px_rgba(0,240,255,0.22)]"
              >
                {/* Top Corner Spec Index & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#94a3b8] uppercase">
                    HUD // 0{index + 1}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/25 text-[#00f0ff] group-hover:scale-110 transition-transform">
                    <IconComponent className="h-4 w-4" />
                  </div>
                </div>

                {/* Primary Metric */}
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#f8fafc] group-hover:text-[#00f0ff] transition-colors">
                  {pillar.metric}
                </div>

                {/* Spec Pillar Label */}
                <div className="mt-1.5 text-sm font-semibold text-[#f8fafc]/90">
                  {pillar.label}
                </div>

                {/* Technical Sublabel */}
                <div className="mt-2 font-mono text-xs text-[#94a3b8]">
                  {pillar.sublabel}
                </div>

                {/* Subtle Bottom Cyber Cyan Accent Line */}
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Hero;
