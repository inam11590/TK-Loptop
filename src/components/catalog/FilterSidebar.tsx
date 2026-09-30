"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Check,
  Sliders,
  X,
} from "lucide-react";
import type {
  FilterSeriesOption,
  FilterDisplaySizeOption,
  FilterMemoryOption,
  FilterGpuTierOption,
} from "@/types/product";
import { cn } from "@/lib/utils";

export const SERIES_OPTIONS: FilterSeriesOption[] = [
  "Titan Series (AI/Studio)",
  "Blade Series (Gaming)",
  "Air Series (Ultraportable)",
];

export const DISPLAY_SIZE_OPTIONS: FilterDisplaySizeOption[] = [
  "13-inch",
  "14-inch",
  "16-inch",
  "18-inch",
];

export const MEMORY_OPTIONS: FilterMemoryOption[] = [
  "32GB Unified",
  "64GB LPDDR5X",
  "128GB Extreme",
];

export const GPU_TIER_OPTIONS: FilterGpuTierOption[] = [
  "NVIDIA RTX 50-Series",
  "TK Neural GPU Core",
  "Integrated Ultra",
];

export const MIN_CATALOG_PRICE = 1200;
export const MAX_CATALOG_PRICE = 4500;

export interface CatalogFilterState {
  series: FilterSeriesOption[];
  displaySizes: FilterDisplaySizeOption[];
  memory: FilterMemoryOption[];
  gpuTiers: FilterGpuTierOption[];
  maxPrice: number;
}

export interface FilterSidebarProps {
  filters: CatalogFilterState;
  onToggleSeries: (series: FilterSeriesOption) => void;
  onToggleDisplaySize: (size: FilterDisplaySizeOption) => void;
  onToggleMemory: (memory: FilterMemoryOption) => void;
  onToggleGpuTier: (gpu: FilterGpuTierOption) => void;
  onPriceChange: (maxPrice: number) => void;
  onResetAll: () => void;
  hasActiveFilters: boolean;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface CollapsibleFilterGroupProps {
  title: string;
  code: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleFilterGroup({
  title,
  code,
  children,
  defaultOpen = true,
}: CollapsibleFilterGroupProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#1f2232] py-4 first:pt-0 last:border-b-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left group cursor-pointer"
      >
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#94a3b8]">
            {code}
          </div>
          <div className="text-sm font-semibold text-[#f8fafc] group-hover:text-[#00f0ff] transition-colors">
            {title}
          </div>
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 text-[#94a3b8] group-hover:text-[#00f0ff]" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[#94a3b8] group-hover:text-[#00f0ff]" />
        )}
      </button>

      {open && <div className="mt-3.5 space-y-2">{children}</div>}
    </div>
  );
}

export function FilterSidebar({
  filters,
  onToggleSeries,
  onToggleDisplaySize,
  onToggleMemory,
  onToggleGpuTier,
  onPriceChange,
  onResetAll,
  hasActiveFilters,
  mobileOpen = false,
  onCloseMobile,
}: FilterSidebarProps) {
  const filterContent = (
    <div className="space-y-2">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1f2232]">
        <div className="flex items-center gap-2">
          <Sliders className="h-4 w-4 text-[#00f0ff]" />
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#f8fafc]">
            HARDWARE FILTERS
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetAll}
            className="inline-flex items-center gap-1 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#00f0ff] hover:bg-[#00f0ff] hover:text-[#050507] transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* 1. Series Filter */}
      <CollapsibleFilterGroup title="Series Architecture" code="PARAM // 01">
        {SERIES_OPTIONS.map((option) => {
          const checked = filters.series.includes(option);
          return (
            <label
              key={option}
              onClick={() => onToggleSeries(option)}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-xs font-medium transition-all cursor-pointer select-none",
                checked
                  ? "bg-[#00f0ff]/10 border-[#00f0ff]/50 text-[#f8fafc]"
                  : "bg-[#050507]/80 border-[#1f2232] text-[#94a3b8] hover:border-white/20 hover:text-[#f8fafc]"
              )}
            >
              <span
                role="checkbox"
                aria-checked={checked}
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                  checked
                    ? "bg-[#00f0ff] border-[#00f0ff] text-[#050507]"
                    : "border-white/25 bg-transparent"
                )}
              >
                {checked && <Check className="h-3 w-3 stroke-[3]" />}
              </span>
              <span className="truncate">{option}</span>
            </label>
          );
        })}
      </CollapsibleFilterGroup>

      {/* 2. Display Size */}
      <CollapsibleFilterGroup title="Display Size" code="PARAM // 02">
        <div className="grid grid-cols-2 gap-2">
          {DISPLAY_SIZE_OPTIONS.map((size) => {
            const checked = filters.displaySizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                role="checkbox"
                aria-checked={checked}
                onClick={() => onToggleDisplaySize(size)}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-xl border px-2.5 py-2 font-mono text-xs font-medium transition-all cursor-pointer",
                  checked
                    ? "bg-[#00f0ff]/15 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_15px_-4px_rgba(0,240,255,0.4)]"
                    : "bg-[#050507]/80 border-[#1f2232] text-[#94a3b8] hover:border-white/20 hover:text-[#f8fafc]"
                )}
              >
                <span>{size}</span>
              </button>
            );
          })}
        </div>
      </CollapsibleFilterGroup>

      {/* 3. Memory / RAM */}
      <CollapsibleFilterGroup title="Memory / Unified RAM" code="PARAM // 03">
        {MEMORY_OPTIONS.map((memory) => {
          const checked = filters.memory.includes(memory);
          return (
            <label
              key={memory}
              onClick={() => onToggleMemory(memory)}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-xs font-medium transition-all cursor-pointer select-none",
                checked
                  ? "bg-[#00f0ff]/10 border-[#00f0ff]/50 text-[#f8fafc]"
                  : "bg-[#050507]/80 border-[#1f2232] text-[#94a3b8] hover:border-white/20 hover:text-[#f8fafc]"
              )}
            >
              <span
                role="checkbox"
                aria-checked={checked}
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                  checked
                    ? "bg-[#00f0ff] border-[#00f0ff] text-[#050507]"
                    : "border-white/25 bg-transparent"
                )}
              >
                {checked && <Check className="h-3 w-3 stroke-[3]" />}
              </span>
              <span>{memory}</span>
            </label>
          );
        })}
      </CollapsibleFilterGroup>

      {/* 4. Dedicated GPU Tier */}
      <CollapsibleFilterGroup title="Dedicated GPU Tier" code="PARAM // 04">
        {GPU_TIER_OPTIONS.map((gpu) => {
          const checked = filters.gpuTiers.includes(gpu);
          return (
            <label
              key={gpu}
              onClick={() => onToggleGpuTier(gpu)}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-xs font-medium transition-all cursor-pointer select-none",
                checked
                  ? "bg-[#00f0ff]/10 border-[#00f0ff]/50 text-[#f8fafc]"
                  : "bg-[#050507]/80 border-[#1f2232] text-[#94a3b8] hover:border-white/20 hover:text-[#f8fafc]"
              )}
            >
              <span
                role="checkbox"
                aria-checked={checked}
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                  checked
                    ? "bg-[#00f0ff] border-[#00f0ff] text-[#050507]"
                    : "border-white/25 bg-transparent"
                )}
              >
                {checked && <Check className="h-3 w-3 stroke-[3]" />}
              </span>
              <span>{gpu}</span>
            </label>
          );
        })}
      </CollapsibleFilterGroup>

      {/* 5. Interactive Price Range Slider ($1,200 to $4,500) */}
      <CollapsibleFilterGroup title="Price Ceiling" code="PARAM // 05">
        <div className="rounded-xl bg-[#050507] border border-[#1f2232] p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] text-[#94a3b8]">
              Max Budget
            </span>
            <span className="font-mono text-sm font-bold text-[#00f0ff]">
              ${filters.maxPrice.toLocaleString("en-US")}
            </span>
          </div>

          <input
            type="range"
            min={MIN_CATALOG_PRICE}
            max={MAX_CATALOG_PRICE}
            step={100}
            value={filters.maxPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            aria-label="Maximum price range in USD"
            className="w-full accent-[#00f0ff] cursor-pointer"
          />

          <div className="mt-1.5 flex items-center justify-between font-mono text-[10px] text-[#94a3b8]">
            <span>${MIN_CATALOG_PRICE.toLocaleString("en-US")}</span>
            <span>${MAX_CATALOG_PRICE.toLocaleString("en-US")}</span>
          </div>
        </div>
      </CollapsibleFilterGroup>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Filter Sidebar */}
      <aside
        aria-label="Hardware Specification Filters"
        className="hidden lg:block w-72 shrink-0"
      >
        <div className="sticky top-28 rounded-2xl bg-[#0d0e15] border border-[#1f2232] p-5 shadow-[0_15px_40px_-12px_rgba(0,0,0,0.8)]">
          {filterContent}
        </div>
      </aside>

      {/* Mobile Glass Drawer Filter Sidebar */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Hardware Filters"
          className="fixed inset-0 z-50 lg:hidden flex"
        >
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />
          <div className="relative z-10 ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-[#0d0e15] border-l border-white/10 p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1f2232]">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00f0ff]">
                FILTER SPECIFICATIONS
              </span>
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Close filter drawer"
                className="rounded-lg border border-white/10 p-1.5 text-[#94a3b8] hover:text-[#f8fafc]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}
    </>
  );
}

export default FilterSidebar;
