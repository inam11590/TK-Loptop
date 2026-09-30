"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Snowflake,
  Shield,
  Cpu,
  Monitor,
  Activity,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface EngineeringFeatureTab {
  id: string;
  code: string;
  title: string;
  headline: string;
  description: string;
  keyMetric: string;
  keyMetricSub: string;
  icon: React.ComponentType<{ className?: string }>;
  telemetryPoints: { label: string; value: string; status: string }[];
  highlights: string[];
  schematicLabel: string;
}

const ENGINEERING_TABS: EngineeringFeatureTab[] = [
  {
    id: "cryo-chamber",
    code: "SUBSYSTEM 01 // THERMALS",
    title: "Cryo-Chamber V3 Thermals",
    headline: "12°C Cooler Under Sustained 260W Full-Load Torture.",
    description:
      "Engineered around a custom indium-gallium liquid-metal thermal layer, dual 0.1mm vacuum vapor chambers, and silent 98-blade magnetic-levitation impellers. Runs 12°C cooler than conventional aluminum gaming laptops with zero thermal throttling.",
    keyMetric: "-12.4°C",
    keyMetricSub: "vs. Conventional Aluminum Gaming Chassis",
    icon: Snowflake,
    telemetryPoints: [
      {
        label: "VAPOR CHAMBER WALL",
        value: "0.1mm Dual-Phase Vacuum",
        status: "OPTIMAL",
      },
      {
        label: "THERMAL INTERFACE",
        value: "Indium-Gallium Liquid Metal",
        status: "78 W/m·K",
      },
      {
        label: "IMPELLER ACOUSTICS",
        value: "Dual Maglev (0dB Idle / 34dB Load)",
        status: "SILENT",
      },
      {
        label: "SUSTAINED ENVELOPE",
        value: "260W Combined CPU + GPU TGP",
        status: "ZERO THROTTLE",
      },
    ],
    highlights: [
      "Dual 0.1mm copper-titanium vacuum vapor chambers span 68% of internal PCB surface area",
      "Magnetic-levitation fan bearings eliminate mechanical friction and high-pitch whine",
      "Iso-thermal intake barrier keeps keyboard deck below 32.5°C during 8K rendering",
    ],
    schematicLabel: "CRYO-CHAMBER V3 // LIQUID-METAL VAPOR FLOW MATRIX",
  },
  {
    id: "unibody-titanium",
    code: "SUBSYSTEM 02 // METALLURGY",
    title: "Unibody Forged Titanium",
    headline: "Aerospace Grade-5 Titanium Milled to 5-Micron Tolerances.",
    description:
      "Carved from a solid billet of Ti-6Al-4V Grade-5 titanium fused with a monocoque recycled Toray carbon-fiber deck. 14-stage CNC diamond-milling achieves 5-micron structural tolerances with zero deck flex.",
    keyMetric: "5 μm",
    keyMetricSub: "5-Axis CNC Diamond-Milled Precision Tolerance",
    icon: Shield,
    telemetryPoints: [
      {
        label: "ALLOY COMPOSITION",
        value: "Ti-6Al-4V Grade-5 + T1100G Carbon",
        status: "AEROSPACE",
      },
      {
        label: "TORSIONAL RIGIDITY",
        value: "3.4x Stiffer Than 6061 Aluminum",
        status: "ZERO FLEX",
      },
      {
        label: "SURFACE ANODIZATION",
        value: "PVD Stealth Micro-Bead Coating",
        status: "FINGERPRINT PROOF",
      },
      {
        label: "HINGE ENDURANCE",
        value: "120,000+ Open/Close Cycles Tested",
        status: "CERTIFIED",
      },
    ],
    highlights: [
      "Physical Vapor Deposition (PVD) obsidian finish resists scratches and skin oils",
      "100% recycled aerospace carbon-fiber inner lattice shaves 340g of structural mass",
      "Single-finger counterbalanced hinge opens smoothly from 0° to 180° flat",
    ],
    schematicLabel: "MONOCOQUE TI-6AL-4V // 5-MICRON CNC STRUCTURAL LATTICE",
  },
  {
    id: "neural-engine",
    code: "SUBSYSTEM 03 // AI SILICON",
    title: "TK Neural Engine",
    headline: "Up to 600 TOPS Combined Local AI & Tensor Compute.",
    description:
      "Hardware-accelerated on-device LLM inference and local AI compute running up to 600 TOPS across our unified neural tensor cluster and high-bandwidth LPDDR5X memory pool—run 70B-parameter models completely offline.",
    keyMetric: "600 TOPS",
    keyMetricSub: "Peak On-Device AI & Tensor Matrix Throughput",
    icon: Cpu,
    telemetryPoints: [
      {
        label: "AI COMPUTE DENSITY",
        value: "Up to 600 TOPS (INT4 / FP8 / FP16)",
        status: "PEAK",
      },
      {
        label: "UNIFIED MEMORY BUS",
        value: "1.2 TB/s Quad-Channel Interconnect",
        status: "128GB POOL",
      },
      {
        label: "LOCAL LLM CAPACITY",
        value: "70B+ Parameter Models In-Memory",
        status: "ZERO CLOUD LATENCY",
      },
      {
        label: "DIE LITHOGRAPHY",
        value: "2nm Gate-All-Around (GAA) Node",
        status: "ULTRA EFFICIENT",
      },
    ],
    highlights: [
      "Dedicated hardware transformer engines accelerate PyTorch, MLX, CUDA, and ONNX",
      "Zero-copy unified memory allows GPU and NPU to address up to 128GB directly",
      "Hardware-isolated TK Titan-Sec enclave protects proprietary weights and keys",
    ],
    schematicLabel: "TK NEURAL MATRIX // 600 TOPS UNIFIED TENSOR FABRIC",
  },
  {
    id: "proxdr-glass",
    code: "SUBSYSTEM 04 // OPTICS",
    title: "ProXDR Nano-Matte Glass",
    headline: "100% DCI-P3, Factory Delta-E < 0.8 & Zero-Glare Etching.",
    description:
      "Every Tandem OLED & Mini-LED ProXDR panel is individually calibrated at the foundry to Delta-E < 0.8 across 100% DCI-P3 and AdobeRGB. Optional sub-micron nano-etched matte glass eliminates 97% of ambient studio reflection without softening contrast.",
    keyMetric: "ΔE < 0.8",
    keyMetricSub: "Individual Spectrophotometer Factory Calibration",
    icon: Monitor,
    telemetryPoints: [
      {
        label: "COLOR GAMUT COVERAGE",
        value: "100% DCI-P3 • 100% AdobeRGB",
        status: "10-BIT TRUE",
      },
      {
        label: "COLOR ACCURACY",
        value: "Factory Calibrated Delta-E < 0.8",
        status: "PANTONE VALIDATED",
      },
      {
        label: "PEAK HDR LUMINANCE",
        value: "1,600 to 2,000 Nits Sustained Peak",
        status: "TRUE BLACK 1000",
      },
      {
        label: "GLARE SUPPRESSION",
        value: "Sub-Micron Nano-Texture Etching",
        status: "97% DIFFUSION",
      },
    ],
    highlights: [
      "1Hz–240Hz Adaptive ProMotion refresh rate with 0.1ms pixel response time",
      "Etched at the atomic level—unlike matte films, never hazes or reduces sharpness",
      "Built-in hardware LUT profiles for DaVinci Resolve, HDR10+, and Dolby Vision",
    ],
    schematicLabel: "PROXDR TANDEM OLED // SUB-MICRON NANO-TEXTURE OPTICS",
  },
];

export function EngineeringDeepDive() {
  const [activeTabId, setActiveTabId] = useState<string>(
    ENGINEERING_TABS[0].id
  );

  const activeTab =
    ENGINEERING_TABS.find((t) => t.id === activeTabId) ?? ENGINEERING_TABS[0];
  const ActiveIcon = activeTab.icon;

  return (
    <section
      id="architecture"
      aria-label="Engineering Deep-Dive Architectural Showcase"
      className="deferred-section relative py-24 sm:py-32 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Ambient Cyber Cyan Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute top-1/2 right-[8%] -translate-y-1/2 h-[540px] w-[680px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,240,255,0.12), rgba(59,130,246,0.05) 50%, transparent 72%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <Badge variant="cyan" pulse className="mb-5">
            ARCHITECTURAL DEEP-DIVE // FOUNDRY R&D
          </Badge>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#f8fafc] leading-tight">
            Why TK Hardware{" "}
            <span className="bg-gradient-to-r from-[#f8fafc] via-[#00f0ff] to-[#3b82f6] bg-clip-text text-transparent">
              Outclasses the Industry
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#94a3b8] leading-relaxed">
            Every subsystem is custom-architected from raw metallurgy to neural
            silicon—eliminating thermal bottlenecks and chassis compromises.
          </p>
        </div>

        {/* Split View: Interactive Spec Selector (Left) + Animated Diagnostic Container (Right) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 4 Interactive Feature Tabs */}
          <div
            role="tablist"
            aria-label="Engineering subsystem tabs"
            className="lg:col-span-5 flex flex-col justify-between gap-3.5"
          >
            {ENGINEERING_TABS.map((tab) => {
              const IconComponent = tab.icon;
              const isSelected = tab.id === activeTabId;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTabId(tab.id)}
                  className={cn(
                    "group relative flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-200 cursor-pointer",
                    isSelected
                      ? "bg-[#0d0e15] border-[#00f0ff] shadow-[0_0_30px_-6px_rgba(0,240,255,0.3)]"
                      : "bg-[#0d0e15]/50 border-[#1f2232] hover:border-white/20 hover:bg-[#0d0e15]"
                  )}
                >
                  {/* Active Left Indicator Bar */}
                  {isSelected && (
                    <span className="absolute left-0 inset-y-4 w-1 rounded-r-full bg-[#00f0ff] shadow-[0_0_12px_#00f0ff]" />
                  )}

                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors",
                      isSelected
                        ? "bg-[#00f0ff] text-[#050507] border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.5)]"
                        : "bg-[#050507] text-[#00f0ff] border-[#1f2232] group-hover:border-[#00f0ff]/40"
                    )}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">
                        {tab.code}
                      </span>
                      <span
                        className={cn(
                          "font-mono text-xs font-extrabold",
                          isSelected ? "text-[#00f0ff]" : "text-[#94a3b8]"
                        )}
                      >
                        {tab.keyMetric}
                      </span>
                    </div>

                    <h3
                      className={cn(
                        "mt-1 text-base sm:text-lg font-bold transition-colors",
                        isSelected
                          ? "text-[#f8fafc]"
                          : "text-[#f8fafc]/85 group-hover:text-[#f8fafc]"
                      )}
                    >
                      {tab.title}
                    </h3>

                    <p className="mt-1 text-xs text-[#94a3b8] line-clamp-2 leading-relaxed">
                      {tab.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: High-Tech Animated Diagnostic Container */}
          <div className="lg:col-span-7 flex">
            <div className="relative flex-1 rounded-3xl bg-[#0d0e15] border border-[#1f2232] p-6 sm:p-8 lg:p-10 overflow-hidden shadow-[0_25px_80px_-15px_rgba(0,240,255,0.18)] flex flex-col justify-between">
              {/* Ambient Corner Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#00f0ff]/15 blur-3xl"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="relative z-10 flex flex-col h-full justify-between space-y-6"
                >
                  {/* Top Diagnostic Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1f2232] pb-4">
                    <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00f0ff]">
                      <Activity className="h-4 w-4 animate-pulse" />
                      <span>{activeTab.schematicLabel}</span>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 border border-emerald-500/35 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                      ● DIAGNOSTIC ONLINE
                    </span>
                  </div>

                  {/* Primary Metric & Headline Callout */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl bg-[#050507] border border-white/[0.08] p-5">
                    <div className="space-y-1.5 max-w-md">
                      <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#00f0ff]">
                        <Sparkles className="h-3 w-3" />
                        <span>{activeTab.title}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#f8fafc] leading-snug">
                        {activeTab.headline}
                      </h3>
                    </div>

                    <div className="shrink-0 rounded-2xl bg-[#0d0e15] border border-[#00f0ff]/40 px-5 py-3.5 text-center shadow-[0_0_25px_-4px_rgba(0,240,255,0.3)]">
                      <div className="font-mono text-3xl sm:text-4xl font-black text-[#00f0ff]">
                        {activeTab.keyMetric}
                      </div>
                      <div className="mt-1 font-mono text-[10px] text-[#94a3b8] max-w-[160px]">
                        {activeTab.keyMetricSub}
                      </div>
                    </div>
                  </div>

                  {/* 4-Cell Live Telemetry Diagnostic Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {activeTab.telemetryPoints.map((pt) => (
                      <div
                        key={pt.label}
                        className="rounded-2xl bg-[#050507]/90 border border-[#1f2232] p-4 hover:border-[#00f0ff]/40 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#94a3b8]">
                            {pt.label}
                          </span>
                          <span className="rounded bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#00f0ff]">
                            {pt.status}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-[#f8fafc]">
                          {pt.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Architectural Highlights List */}
                  <div className="rounded-2xl bg-[#050507]/60 border border-white/[0.06] p-4 sm:p-5 space-y-2.5">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#94a3b8]">
                      <ActiveIcon className="h-3.5 w-3.5 text-[#00f0ff]" />
                      <span>VERIFIED HARDWARE ADVANTAGES</span>
                    </div>
                    <ul className="space-y-2">
                      {activeTab.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#f8fafc]/90"
                        >
                          <CheckCircle2 className="h-4 w-4 text-[#00f0ff] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EngineeringDeepDive;
