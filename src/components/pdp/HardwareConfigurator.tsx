"use client";

import React, { useState } from "react";
import {
  Cpu,
  Layers,
  HardDrive,
  Sparkles,
  ShieldCheck,
  Truck,
  ShoppingBag,
  Check,
  Zap,
} from "lucide-react";
import type { LaptopProduct } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface ConfigOptionItem {
  id: string;
  label: string;
  shortSummary: string;
  detail: string;
  priceDelta: number;
  tag?: string;
}

export const PROCESSOR_OPTIONS: ConfigOptionItem[] = [
  {
    id: "cpu-standard",
    label: "[Standard] TK Neural-9 16-Core (Base)",
    shortSummary: "16-Core Neural-9",
    detail: "16-Core CPU • 32-Core GPU • 180 TOPS Neural Engine",
    priceDelta: 0,
  },
  {
    id: "cpu-extreme",
    label: "[Performance] TK Neural-9 Extreme 24-Core",
    shortSummary: "24-Core Extreme",
    detail: "24-Core CPU • 48-Core GPU • 240 TOPS Neural Engine",
    priceDelta: 450,
    tag: "MOST POPULAR",
  },
];

export const MEMORY_CONFIG_OPTIONS: ConfigOptionItem[] = [
  {
    id: "ram-32",
    label: "32GB LPDDR5X-7500",
    shortSummary: "32GB",
    detail: "600 GB/s Unified Memory Bandwidth",
    priceDelta: 0,
  },
  {
    id: "ram-64",
    label: "64GB LPDDR5X-7500",
    shortSummary: "64GB",
    detail: "960 GB/s Unified Memory Bandwidth",
    priceDelta: 300,
    tag: "RECOMMENDED",
  },
  {
    id: "ram-128",
    label: "128GB LPDDR5X-8533 Ultra-Bandwidth",
    shortSummary: "128GB",
    detail: "1.2 TB/s Quad-Channel LLM Workstation Pool",
    priceDelta: 800,
  },
];

export const STORAGE_CONFIG_OPTIONS: ConfigOptionItem[] = [
  {
    id: "ssd-1tb",
    label: "1TB NVMe PCIe 5.0",
    shortSummary: "1TB",
    detail: "Up to 13,500 MB/s Sequential Read",
    priceDelta: 0,
  },
  {
    id: "ssd-2tb",
    label: "2TB NVMe PCIe 5.0",
    shortSummary: "2TB",
    detail: "Up to 14,200 MB/s Sequential Read",
    priceDelta: 240,
  },
  {
    id: "ssd-4tb",
    label: "4TB NVMe Dual-RAID 0",
    shortSummary: "4TB RAID-0",
    detail: "Up to 14,800 MB/s Sustained Studio Throughput",
    priceDelta: 620,
  },
];

export const DISPLAY_GLASS_OPTIONS: ConfigOptionItem[] = [
  {
    id: "glass-glossy",
    label: "Standard ProXDR Glossy",
    shortSummary: "ProXDR Glossy",
    detail: "Optical-grade low-reflectivity Gorilla Glass",
    priceDelta: 0,
  },
  {
    id: "glass-matte",
    label: "Nano-Texture Anti-Reflective Matte Etching",
    shortSummary: "Nano-Matte",
    detail: "Sub-micron etched glass scatters ambient studio glare",
    priceDelta: 180,
  },
];

export const WARRANTY_CONFIG_OPTIONS: ConfigOptionItem[] = [
  {
    id: "care-standard",
    label: "1-Year Standard Limited Hardware Warranty",
    shortSummary: "1-Yr Warranty",
    detail: "Direct foundry diagnostics & priority courier return",
    priceDelta: 0,
  },
  {
    id: "care-plus",
    label: "3-Year TK Care+ with Unlimited Accidental Damage Protection",
    shortSummary: "3-Yr TK Care+",
    detail: "24/7 Senior Engineer Concierge + Next-Day Global Replacement",
    priceDelta: 349,
    tag: "FULL COVERAGE",
  },
];

export interface HardwareConfigurationState {
  processorId: string;
  memoryId: string;
  storageId: string;
  displayGlassId: string;
  warrantyId: string;
}

export const DEFAULT_HARDWARE_CONFIG: HardwareConfigurationState = {
  processorId: PROCESSOR_OPTIONS[0].id,
  memoryId: MEMORY_CONFIG_OPTIONS[0].id,
  storageId: STORAGE_CONFIG_OPTIONS[0].id,
  displayGlassId: DISPLAY_GLASS_OPTIONS[0].id,
  warrantyId: WARRANTY_CONFIG_OPTIONS[0].id,
};

export function calculateConfiguredTotals(
  basePrice: number,
  config: HardwareConfigurationState
) {
  const cpu =
    PROCESSOR_OPTIONS.find((o) => o.id === config.processorId) ??
    PROCESSOR_OPTIONS[0];
  const ram =
    MEMORY_CONFIG_OPTIONS.find((o) => o.id === config.memoryId) ??
    MEMORY_CONFIG_OPTIONS[0];
  const ssd =
    STORAGE_CONFIG_OPTIONS.find((o) => o.id === config.storageId) ??
    STORAGE_CONFIG_OPTIONS[0];
  const glass =
    DISPLAY_GLASS_OPTIONS.find((o) => o.id === config.displayGlassId) ??
    DISPLAY_GLASS_OPTIONS[0];
  const care =
    WARRANTY_CONFIG_OPTIONS.find((o) => o.id === config.warrantyId) ??
    WARRANTY_CONFIG_OPTIONS[0];

  const optionsTotal =
    cpu.priceDelta +
    ram.priceDelta +
    ssd.priceDelta +
    glass.priceDelta +
    care.priceDelta;

  const totalPrice = basePrice + optionsTotal;
  const monthlyPrice = Math.round(totalPrice / 24);
  const summaryString = `${ram.shortSummary} / ${ssd.shortSummary} / ${glass.shortSummary}`;

  return {
    totalPrice,
    optionsTotal,
    monthlyPrice,
    summaryString,
    selectedItems: { cpu, ram, ssd, glass, care },
  };
}

export interface HardwareConfiguratorProps {
  product: LaptopProduct;
  config?: HardwareConfigurationState;
  onChangeConfig?: (next: HardwareConfigurationState) => void;
  onAddToBag?: () => void;
  addedCount?: number;
}

export function HardwareConfigurator({
  product,
  config: controlledConfig,
  onChangeConfig,
  onAddToBag,
  addedCount = 0,
}: HardwareConfiguratorProps) {
  const [internalConfig, setInternalConfig] =
    useState<HardwareConfigurationState>(DEFAULT_HARDWARE_CONFIG);
  const [justAdded, setJustAdded] = useState(false);

  const activeConfig = controlledConfig ?? internalConfig;

  const updateField = (
    field: keyof HardwareConfigurationState,
    value: string
  ) => {
    const next = { ...activeConfig, [field]: value };
    if (onChangeConfig) {
      onChangeConfig(next);
    } else {
      setInternalConfig(next);
    }
  };

  const { totalPrice, optionsTotal, monthlyPrice, summaryString } =
    calculateConfiguredTotals(product.basePrice, activeConfig);

  const handleTriggerAddToBag = () => {
    onAddToBag?.();
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const renderOptionGroup = (
    stepCode: string,
    title: string,
    IconComponent: React.ComponentType<{ className?: string }>,
    options: ConfigOptionItem[],
    selectedId: string,
    onSelect: (id: string) => void
  ) => (
    <div className="space-y-3 pt-6 border-t border-[#1f2232] first:border-t-0 first:pt-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff]">
            <IconComponent className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#94a3b8] block">
              {stepCode}
            </span>
            <h3 className="text-sm font-bold text-[#f8fafc]">{title}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {options.map((option) => {
          const isSelected = option.id === selectedId;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(option.id)}
              className={cn(
                "group relative flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer",
                isSelected
                  ? "bg-[#00f0ff]/[0.08] border-[#00f0ff] shadow-[0_0_25px_-6px_rgba(0,240,255,0.35)]"
                  : "bg-[#050507]/90 border-[#1f2232] hover:border-white/25 hover:bg-[#0d0e15]"
              )}
            >
              <div className="flex items-start gap-3 min-w-0">
                <span
                  className={cn(
                    "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                    isSelected
                      ? "border-[#00f0ff] bg-[#00f0ff] text-[#050507]"
                      : "border-white/30 bg-transparent"
                  )}
                >
                  {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-[#f8fafc]">
                      {option.label}
                    </span>
                    {option.tag && (
                      <span className="rounded-full bg-[#00f0ff]/15 border border-[#00f0ff]/40 px-2 py-0.5 font-mono text-[9px] font-bold text-[#00f0ff]">
                        {option.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-[#94a3b8]">
                    {option.detail}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right font-mono text-xs font-semibold">
                {option.priceDelta === 0 ? (
                  <span className="text-[#94a3b8]">Included</span>
                ) : (
                  <span className="text-[#00f0ff]">
                    + ${option.priceDelta.toLocaleString("en-US")}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="rounded-3xl bg-[#0d0e15] border border-[#1f2232] p-5 sm:p-7 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)]">
      {/* Live Dynamic Price Header Banner */}
      <div className="rounded-2xl bg-[#050507] border border-[#00f0ff]/35 p-5 mb-6 shadow-[0_0_30px_-8px_rgba(0,240,255,0.22)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#00f0ff]">
              LIVE HARDWARE CONFIGURATOR
            </span>
            <div className="mt-1 flex items-baseline gap-2.5">
              <span
                aria-live="polite"
                className="text-3xl sm:text-4xl font-black tracking-tight text-[#f8fafc]"
              >
                ${totalPrice.toLocaleString("en-US")}
              </span>
              <span className="font-mono text-xs text-[#94a3b8]">USD</span>
              {optionsTotal > 0 && (
                <span className="rounded-full bg-[#00f0ff]/15 border border-[#00f0ff]/30 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#00f0ff]">
                  +${optionsTotal.toLocaleString("en-US")} Custom Silicon
                </span>
              )}
            </div>
            <p className="mt-1 font-mono text-xs text-[#94a3b8]">
              Starting at{" "}
              <span className="text-[#00f0ff] font-semibold">
                ${monthlyPrice}/mo
              </span>{" "}
              for 24 months with 0% APR
            </p>
          </div>

          <div className="rounded-xl bg-[#0d0e15] border border-white/10 px-3 py-2 text-right">
            <div className="font-mono text-[10px] uppercase text-[#94a3b8]">
              ACTIVE BUILD
            </div>
            <div className="font-mono text-xs font-semibold text-[#f8fafc]">
              {summaryString}
            </div>
          </div>
        </div>
      </div>

      {/* Configurator Option Groups */}
      <div className="space-y-6">
        {renderOptionGroup(
          "STEP 01 // SILICON",
          "Silicon / Processor Tier",
          Cpu,
          PROCESSOR_OPTIONS,
          activeConfig.processorId,
          (id) => updateField("processorId", id)
        )}

        {renderOptionGroup(
          "STEP 02 // MEMORY",
          "Unified Memory (RAM)",
          Layers,
          MEMORY_CONFIG_OPTIONS,
          activeConfig.memoryId,
          (id) => updateField("memoryId", id)
        )}

        {renderOptionGroup(
          "STEP 03 // STORAGE",
          "Solid-State Storage (NVMe Gen5)",
          HardDrive,
          STORAGE_CONFIG_OPTIONS,
          activeConfig.storageId,
          (id) => updateField("storageId", id)
        )}

        {renderOptionGroup(
          "STEP 04 // OPTICS",
          "Display Glass Treatment",
          Sparkles,
          DISPLAY_GLASS_OPTIONS,
          activeConfig.displayGlassId,
          (id) => updateField("displayGlassId", id)
        )}

        {renderOptionGroup(
          "STEP 05 // PROTECTION",
          "TK Care+ Extended Protection",
          ShieldCheck,
          WARRANTY_CONFIG_OPTIONS,
          activeConfig.warrantyId,
          (id) => updateField("warrantyId", id)
        )}
      </div>

      {/* Dispatch Status & Primary Add to Bag Action */}
      <div className="mt-8 pt-6 border-t border-[#1f2232] space-y-4">
        <div className="flex items-center gap-3 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/30 px-4 py-3 text-xs text-emerald-300">
          <Truck className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="font-medium">
            Estimated Dispatch: Ships in 24–48 Hours with Complimentary Express
            Courier
          </span>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleTriggerAddToBag}
          leftIcon={
            justAdded ? (
              <Check className="h-5 w-5" />
            ) : (
              <ShoppingBag className="h-5 w-5" />
            )
          }
          rightIcon={
            addedCount > 0 ? (
              <span className="ml-1 rounded-full bg-[#050507] px-2 py-0.5 font-mono text-xs font-bold text-[#00f0ff]">
                {addedCount} in Bag
              </span>
            ) : undefined
          }
        >
          {justAdded
            ? `Added Configuration — $${totalPrice.toLocaleString("en-US")}`
            : `Add to Bag — $${totalPrice.toLocaleString("en-US")}`}
        </Button>

        <div className="flex items-center justify-center gap-2 font-mono text-[11px] text-[#94a3b8]">
          <Zap className="h-3.5 w-3.5 text-[#00f0ff]" />
          <span>30-Day Trial • Free Return Courier • ISO-9001 Burn-In Tested</span>
        </div>
      </div>
    </div>
  );
}

export default HardwareConfigurator;
