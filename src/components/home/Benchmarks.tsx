"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Cpu,
  Terminal,
  Sparkles,
  Film,
  Zap,
  Gauge,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface BenchmarkWorkload {
  id: string;
  label: string;
  unit: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  entries: {
    system: string;
    configNote: string;
    percentage: number;
    readout: string;
    tier: "apex" | "standard" | "previous";
  }[];
}

const BENCHMARK_WORKLOADS: BenchmarkWorkload[] = [
  {
    id: "blender-3d",
    label: "Blender 3D Render Speed",
    unit: "Samples / Min (Higher is Faster)",
    subtitle:
      "Blender 4.3 Classroom Path-Traced Scene • Optix + Neural Tensor Acceleration",
    icon: Sparkles,
    entries: [
      {
        system: "TK Titan X16 AI",
        configNote: "TK Neural M4 Extreme 24-Core • 600 TOPS • 260W Cryo",
        percentage: 100,
        readout: "8,420 samples/min (Baseline Apex)",
        tier: "apex",
      },
      {
        system: "Industry Standard Workstation",
        configNote: "16-Inch Flagship Aluminum Pro Laptop (2026)",
        percentage: 68,
        readout: "5,725 samples/min",
        tier: "standard",
      },
      {
        system: "Previous Gen Flagship",
        configNote: "2024 High-End Mobile Workstation",
        percentage: 54,
        readout: "4,540 samples/min",
        tier: "previous",
      },
    ],
  },
  {
    id: "xcode-compile",
    label: "Xcode Project Compile Time",
    unit: "Normalized Build Throughput Index",
    subtitle:
      "Multi-Target 1.4M Line C++ / Swift / Rust Monorepo Clean Build Benchmark",
    icon: Terminal,
    entries: [
      {
        system: "TK Titan X16 AI",
        configNote: "24-Core Neural-9 Extreme • 14,200 MB/s Gen5 NVMe",
        percentage: 100,
        readout: "38.2 sec Clean Build (3.2x Faster)",
        tier: "apex",
      },
      {
        system: "Industry Standard Workstation",
        configNote: "16-Inch Flagship Developer Laptop",
        percentage: 69,
        readout: "64.8 sec Clean Build",
        tier: "standard",
      },
      {
        system: "Previous Gen Flagship",
        configNote: "2024 16-Core Workstation",
        percentage: 53,
        readout: "92.4 sec Clean Build",
        tier: "previous",
      },
    ],
  },
  {
    id: "local-llm",
    label: "Local LLM Token Generation (Llama 3 70B)",
    unit: "Tokens / Second (Q4_K_M In-Memory)",
    subtitle:
      "Sustained Offline Inference via 1.2 TB/s Unified LPDDR5X Memory Pool",
    icon: Cpu,
    entries: [
      {
        system: "TK Titan X16 AI",
        configNote: "128GB Unified LPDDR5X-9600 • 600 TOPS NPU",
        percentage: 100,
        readout: "42.4 tokens/sec (Zero Cloud Latency)",
        tier: "apex",
      },
      {
        system: "Industry Standard Workstation",
        configNote: "64GB Unified Memory Laptop",
        percentage: 67,
        readout: "28.4 tokens/sec",
        tier: "standard",
      },
      {
        system: "Previous Gen Flagship",
        configNote: "16GB VRAM Dedicated GPU Laptop (Offloaded)",
        percentage: 52,
        readout: "21.9 tokens/sec",
        tier: "previous",
      },
    ],
  },
  {
    id: "davinci-raw",
    label: "4K RAW Video Export (DaVinci)",
    unit: "Frames / Second (8K RED R3D -> 4K ProRes 4444)",
    subtitle:
      "DaVinci Resolve Studio 20 with Neural Magic Mask, Denoise & HDR Color Grade",
    icon: Film,
    entries: [
      {
        system: "TK Titan X16 AI",
        configNote: "Dual Hardware ProRes / AV1 Media Engines",
        percentage: 100,
        readout: "184 FPS Real-Time Export",
        tier: "apex",
      },
      {
        system: "Industry Standard Workstation",
        configNote: "Flagship Creator 16-Inch Laptop",
        percentage: 68,
        readout: "125 FPS Export",
        tier: "standard",
      },
      {
        system: "Previous Gen Flagship",
        configNote: "Previous Generation Studio Laptop",
        percentage: 55,
        readout: "101 FPS Export",
        tier: "previous",
      },
    ],
  },
];

const METRIC_CALLOUTS = [
  {
    value: "3.2x",
    title: "3.2x faster local code compilation",
    detail: "Sustained all-core 5.4 GHz boost with zero thermal throttling",
    icon: Terminal,
  },
  {
    value: "42 tok/s",
    title: "42 tokens/sec local inference",
    detail: "70B-parameter LLMs held entirely in 1.2 TB/s unified memory",
    icon: Cpu,
  },
  {
    value: "260W",
    title: "Sustained Cryo-Chamber TDP",
    detail: "Runs 12°C cooler under continuous 100% synthetic load",
    icon: Gauge,
  },
];

export function Benchmarks() {
  const [selectedId, setSelectedId] = useState<string>(
    BENCHMARK_WORKLOADS[0].id
  );

  const activeWorkload =
    BENCHMARK_WORKLOADS.find((w) => w.id === selectedId) ??
    BENCHMARK_WORKLOADS[0];

  return (
    <section
      aria-label="Silicon Benchmark Comparison Matrix"
      className="deferred-section relative py-24 sm:py-32 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Subtle Cobalt & Cyan Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[480px] w-[960px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,240,255,0.11), transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="cyan" pulse className="mb-5">
            VERIFIED LAB TELEMETRY // SILICON BENCHMARKS
          </Badge>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#f8fafc]">
            Empirical Proof of{" "}
            <span className="bg-gradient-to-r from-[#f8fafc] via-[#00f0ff] to-[#3b82f6] bg-clip-text text-transparent">
              Silicon Supremacy
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#94a3b8] leading-relaxed">
            Tested in ISO-certified 22°C ambient chambers across production
            compiler, rendering, and local LLM workloads.
          </p>
        </div>

        {/* Benchmark Category Selector */}
        <div
          role="tablist"
          aria-label="Benchmark workload categories"
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {BENCHMARK_WORKLOADS.map((workload) => {
            const IconComponent = workload.icon;
            const isSelected = workload.id === selectedId;

            return (
              <button
                key={workload.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedId(workload.id)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer",
                  isSelected
                    ? "bg-[#0d0e15] border-[#00f0ff] shadow-[0_0_26px_-6px_rgba(0,240,255,0.35)]"
                    : "bg-[#0d0e15]/60 border-[#1f2232] hover:border-white/25 hover:bg-[#0d0e15]"
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
                    isSelected
                      ? "bg-[#00f0ff] text-[#050507] border-[#00f0ff]"
                      : "bg-[#050507] text-[#00f0ff] border-[#1f2232]"
                  )}
                >
                  <IconComponent className="h-4 w-4" />
                </div>
                <span
                  className={cn(
                    "text-xs sm:text-sm font-bold leading-snug",
                    isSelected ? "text-[#f8fafc]" : "text-[#94a3b8]"
                  )}
                >
                  {workload.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Visual Benchmark Graph Container */}
        <div className="mt-8 rounded-3xl bg-[#0d0e15] border border-[#1f2232] p-6 sm:p-10 shadow-[0_25px_75px_-15px_rgba(0,0,0,0.85)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1f2232] pb-5 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#00f0ff]">
                <Activity className="h-4 w-4" />
                <span>{activeWorkload.label}</span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-[#94a3b8]">
                {activeWorkload.subtitle}
              </p>
            </div>
            <span className="self-start sm:self-center rounded-full bg-[#050507] border border-white/10 px-3.5 py-1.5 font-mono text-[11px] text-[#f8fafc]">
              {activeWorkload.unit}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeWorkload.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-7"
            >
              {activeWorkload.entries.map((entry) => {
                const isApex = entry.tier === "apex";
                const isStandard = entry.tier === "standard";

                return (
                  <div key={entry.system} className="space-y-2.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <span
                          className={cn(
                            "text-sm sm:text-base font-extrabold",
                            isApex ? "text-[#00f0ff]" : "text-[#f8fafc]"
                          )}
                        >
                          {entry.system}
                        </span>
                        <span className="ml-2.5 font-mono text-xs text-[#94a3b8]">
                          {entry.configNote}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "font-mono text-xs sm:text-sm font-bold",
                            isApex ? "text-[#00f0ff]" : "text-[#94a3b8]"
                          )}
                        >
                          {entry.readout}
                        </span>
                        <span
                          className={cn(
                            "rounded-md px-2 py-0.5 font-mono text-xs font-black",
                            isApex
                              ? "bg-[#00f0ff] text-[#050507] shadow-[0_0_15px_rgba(0,240,255,0.6)]"
                              : "bg-[#050507] text-[#94a3b8] border border-white/10"
                          )}
                        >
                          {entry.percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="relative h-5 w-full overflow-hidden rounded-full bg-[#050507] border border-[#1f2232] p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${entry.percentage}%` }}
                        transition={{ duration: 0.65, ease: "easeOut" }}
                        className={cn(
                          "relative h-full rounded-full",
                          isApex
                            ? "bg-gradient-to-r from-[#3b82f6] via-[#00f0ff] to-[#67f7ff] shadow-[0_0_24px_rgba(0,240,255,0.75)]"
                            : isStandard
                            ? "bg-[#64748b]"
                            : "bg-[#334155]"
                        )}
                      >
                        {isApex && (
                          <span className="absolute right-1.5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#050507] ring-2 ring-white" />
                        )}
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Real Metric Callouts Below Graph */}
          <div className="mt-10 pt-8 border-t border-[#1f2232] grid grid-cols-1 md:grid-cols-3 gap-4">
            {METRIC_CALLOUTS.map((callout) => {
              const IconComponent = callout.icon;
              return (
                <div
                  key={callout.title}
                  className="flex items-start gap-4 rounded-2xl bg-[#050507] border border-[#1f2232] p-4 sm:p-5 hover:border-[#00f0ff]/40 transition-colors"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff]">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-lg font-black text-[#00f0ff]">
                        {callout.value}
                      </span>
                      <Zap className="h-3.5 w-3.5 text-[#00f0ff]" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#f8fafc] mt-0.5">
                      {callout.title}
                    </div>
                    <p className="mt-1 text-xs text-[#94a3b8]">
                      {callout.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benchmarks;
