"use client";

import React from "react";
import { Cpu, RotateCcw, Sliders } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export interface EmptyCatalogStateProps {
  onResetAll: () => void;
}

export function EmptyCatalogState({ onResetAll }: EmptyCatalogStateProps) {
  return (
    <div className="relative flex flex-col items-center justify-center rounded-3xl bg-[#0d0e15] border border-[#1f2232] px-6 py-20 text-center overflow-hidden">
      {/* Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,240,255,0.08), transparent 65%)",
        }}
      />

      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#050507] border border-[#00f0ff]/40 text-[#00f0ff] shadow-[0_0_25px_-4px_rgba(0,240,255,0.35)] mb-6">
        <Cpu className="h-7 w-7" />
      </div>

      <span className="relative z-10 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#00f0ff]">
        ZERO TELEMETRY MATCHES // FILTER CONSTRAINT
      </span>

      <h3 className="relative z-10 mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#f8fafc]">
        No Configuration Found
      </h3>

      <p className="relative z-10 mt-3 max-w-md text-sm sm:text-base text-[#94a3b8] leading-relaxed">
        No machines match your exact hardware filter. Clear filters or customize
        a bespoke build.
      </p>

      <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3.5">
        <Button
          variant="primary"
          size="md"
          onClick={onResetAll}
          leftIcon={<RotateCcw className="h-4 w-4" />}
        >
          Reset All Specs
        </Button>

        <Link href="/catalog">
          <Button
            variant="outline"
            size="md"
            leftIcon={<Sliders className="h-4 w-4 text-[#00f0ff]" />}
          >
            Custom Configurator
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default EmptyCatalogState;
