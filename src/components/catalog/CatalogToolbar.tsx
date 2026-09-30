"use client";

import React from "react";
import { Search, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import type { CatalogSortOption } from "@/types/product";

export interface CatalogToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: CatalogSortOption;
  onSortChange: (value: CatalogSortOption) => void;
  activeFilterCount: number;
  onOpenMobileFilters: () => void;
  showingCount: number;
  totalCount: number;
}

const SORT_OPTIONS: { value: CatalogSortOption; label: string }[] = [
  { value: "performance-desc", label: "Performance (High to Low)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "display-desc", label: "Display Size" },
];

export function CatalogToolbar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  activeFilterCount,
  onOpenMobileFilters,
  showingCount,
  totalCount,
}: CatalogToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-[#0d0e15] border border-[#1f2232] p-4 sm:p-5 shadow-[0_12px_35px_-10px_rgba(0,0,0,0.75)]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Instant Search Input */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#00f0ff]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by model name, processor, GPU architecture, or series tag..."
            aria-label="Search laptops by name, processor, GPU, or series"
            className="w-full rounded-xl bg-[#050507] border border-[#1f2232] pl-10 pr-9 py-2.5 text-sm text-[#f8fafc] placeholder-[#94a3b8]/60 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/40 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search query"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-[#94a3b8] hover:text-[#f8fafc] cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Sort Controller & Mobile Filter Drawer Trigger */}
        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3">
          {/* Mobile Filter Toggle Button */}
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="inline-flex lg:hidden items-center gap-2 rounded-xl bg-[#050507] border border-[#1f2232] px-3.5 py-2.5 text-xs font-semibold text-[#f8fafc] hover:border-[#00f0ff]/50 hover:text-[#00f0ff] transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="h-4 w-4 text-[#00f0ff]" />
            <span>Hardware Filters</span>
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-[#00f0ff] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#050507]">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Live Readout Pill */}
          <div className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-[#050507] border border-white/[0.06] px-3.5 py-2.5 font-mono text-xs text-[#94a3b8]">
            <span className="h-2 w-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
            <span>
              Showing{" "}
              <strong className="text-[#f8fafc]">{showingCount}</strong> of{" "}
              <strong className="text-[#f8fafc]">{totalCount}</strong> Machines
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="catalog-sort-select"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#94a3b8]"
            >
              <ArrowUpDown className="h-3.5 w-3.5 text-[#00f0ff]" />
              <span className="hidden sm:inline">Sort:</span>
            </label>
            <select
              id="catalog-sort-select"
              value={sortBy}
              onChange={(e) =>
                onSortChange(e.target.value as CatalogSortOption)
              }
              className="rounded-xl bg-[#050507] border border-[#1f2232] px-3.5 py-2.5 text-xs sm:text-sm font-medium text-[#f8fafc] focus:border-[#00f0ff] focus:outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-[#0d0e15] text-[#f8fafc]"
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatalogToolbar;
