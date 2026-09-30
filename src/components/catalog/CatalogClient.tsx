"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Cpu } from "lucide-react";
import { TK_LAPTOPS } from "@/data/products";
import type {
  LaptopProduct,
  FilterSeriesOption,
  FilterDisplaySizeOption,
  FilterMemoryOption,
  FilterGpuTierOption,
  CatalogSortOption,
} from "@/types/product";
import { ProductCard } from "@/components/ui/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { CatalogToolbar } from "@/components/catalog/CatalogToolbar";
import {
  FilterSidebar,
  MAX_CATALOG_PRICE,
  type CatalogFilterState,
} from "@/components/catalog/FilterSidebar";
import { CompareDock } from "@/components/catalog/CompareDock";
import { CompareModal } from "@/components/catalog/CompareModal";
import { EmptyCatalogState } from "@/components/catalog/EmptyCatalogState";

function mapSeriesQueryParam(param: string | null): FilterSeriesOption[] {
  if (!param) return [];
  const normalized = param.toLowerCase();
  if (normalized.includes("titan") || normalized.includes("studio")) {
    return ["Titan Series (AI/Studio)"];
  }
  if (normalized.includes("blade") || normalized.includes("gaming")) {
    return ["Blade Series (Gaming)"];
  }
  if (normalized.includes("air") || normalized.includes("ultraportable")) {
    return ["Air Series (Ultraportable)"];
  }
  return [];
}

export interface CatalogClientProps {
  initialSeriesParam?: string;
  initialSearchParam?: string;
}

export function CatalogClient({
  initialSeriesParam,
  initialSearchParam,
}: CatalogClientProps) {
  const searchParams = useSearchParams();
  const seriesFromUrl = searchParams.get("series") ?? initialSeriesParam;
  const searchFromUrl = searchParams.get("q") ?? initialSearchParam;
  const urlSyncKey = `${seriesFromUrl ?? ""}::${searchFromUrl ?? ""}`;

  return (
    <CatalogClientContent
      key={urlSyncKey}
      initialSeriesParam={seriesFromUrl}
      initialSearchParam={searchFromUrl}
    />
  );
}

function CatalogClientContent({
  initialSeriesParam,
  initialSearchParam,
}: CatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchParam ?? "");
  const [sortBy, setSortBy] = useState<CatalogSortOption>("performance-desc");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState<CatalogFilterState>(() => ({
    series: mapSeriesQueryParam(initialSeriesParam ?? null),
    displaySizes: [],
    memory: [],
    gpuTiers: [],
    maxPrice: MAX_CATALOG_PRICE,
  }));

  // Comparison state (Up to 3 laptops)
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const handleToggleSeries = (series: FilterSeriesOption) => {
    setFilters((prev) => ({
      ...prev,
      series: prev.series.includes(series)
        ? prev.series.filter((item) => item !== series)
        : [...prev.series, series],
    }));
  };

  const handleToggleDisplaySize = (size: FilterDisplaySizeOption) => {
    setFilters((prev) => ({
      ...prev,
      displaySizes: prev.displaySizes.includes(size)
        ? prev.displaySizes.filter((item) => item !== size)
        : [...prev.displaySizes, size],
    }));
  };

  const handleToggleMemory = (memory: FilterMemoryOption) => {
    setFilters((prev) => ({
      ...prev,
      memory: prev.memory.includes(memory)
        ? prev.memory.filter((item) => item !== memory)
        : [...prev.memory, memory],
    }));
  };

  const handleToggleGpuTier = (gpu: FilterGpuTierOption) => {
    setFilters((prev) => ({
      ...prev,
      gpuTiers: prev.gpuTiers.includes(gpu)
        ? prev.gpuTiers.filter((item) => item !== gpu)
        : [...prev.gpuTiers, gpu],
    }));
  };

  const handlePriceChange = (maxPrice: number) => {
    setFilters((prev) => ({ ...prev, maxPrice }));
  };

  const handleResetAll = () => {
    setSearchQuery("");
    setFilters({
      series: [],
      displaySizes: [],
      memory: [],
      gpuTiers: [],
      maxPrice: MAX_CATALOG_PRICE,
    });
  };

  const activeFilterPills = useMemo(() => {
    const pills: { id: string; label: string; onRemove: () => void }[] = [];

    if (searchQuery.trim()) {
      pills.push({
        id: `search-${searchQuery}`,
        label: `Search: "${searchQuery.trim()}"`,
        onRemove: () => setSearchQuery(""),
      });
    }

    filters.series.forEach((s) => {
      pills.push({
        id: `series-${s}`,
        label: s,
        onRemove: () => handleToggleSeries(s),
      });
    });

    filters.displaySizes.forEach((d) => {
      pills.push({
        id: `display-${d}`,
        label: `Display: ${d}`,
        onRemove: () => handleToggleDisplaySize(d),
      });
    });

    filters.memory.forEach((m) => {
      pills.push({
        id: `memory-${m}`,
        label: `RAM: ${m}`,
        onRemove: () => handleToggleMemory(m),
      });
    });

    filters.gpuTiers.forEach((g) => {
      pills.push({
        id: `gpu-${g}`,
        label: `GPU: ${g}`,
        onRemove: () => handleToggleGpuTier(g),
      });
    });

    if (filters.maxPrice < MAX_CATALOG_PRICE) {
      pills.push({
        id: "max-price",
        label: `Under $${filters.maxPrice.toLocaleString("en-US")}`,
        onRemove: () => handlePriceChange(MAX_CATALOG_PRICE),
      });
    }

    return pills;
  }, [searchQuery, filters]);

  const hasActiveFilters = activeFilterPills.length > 0;

  // Real-time filtering & sorting engine
  const filteredAndSortedLaptops = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = TK_LAPTOPS.filter((laptop) => {
      // 1. Search query match across name, processor, GPU, series, category, badges
      if (q) {
        const searchable = [
          laptop.name,
          laptop.tagline,
          laptop.category,
          laptop.series ?? "",
          laptop.specs.cpu,
          laptop.specs.gpu,
          laptop.specs.ram,
          laptop.specs.display,
          laptop.filterMeta?.seriesGroup ?? "",
          ...laptop.badges,
        ]
          .join(" ")
          .toLowerCase();

        if (!searchable.includes(q)) {
          return false;
        }
      }

      // 2. Series filter
      if (filters.series.length > 0) {
        const seriesGroup = laptop.filterMeta?.seriesGroup;
        if (!seriesGroup || !filters.series.includes(seriesGroup)) {
          return false;
        }
      }

      // 3. Display size filter
      if (filters.displaySizes.length > 0) {
        const displayGroup = laptop.filterMeta?.displaySizeGroup;
        if (!displayGroup || !filters.displaySizes.includes(displayGroup)) {
          return false;
        }
      }

      // 4. Memory / RAM filter
      if (filters.memory.length > 0) {
        const memoryGroup = laptop.filterMeta?.memoryGroup;
        if (!memoryGroup || !filters.memory.includes(memoryGroup)) {
          return false;
        }
      }

      // 5. GPU Tier filter
      if (filters.gpuTiers.length > 0) {
        const gpuGroup = laptop.filterMeta?.gpuTierGroup;
        if (!gpuGroup || !filters.gpuTiers.includes(gpuGroup)) {
          return false;
        }
      }

      // 6. Max Price ceiling filter
      if (laptop.basePrice > filters.maxPrice) {
        return false;
      }

      return true;
    });

    // Sort results
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "performance-desc":
          return (
            (b.specs.performanceIndex ?? 0) - (a.specs.performanceIndex ?? 0)
          );
        case "price-asc":
          return a.basePrice - b.basePrice;
        case "price-desc":
          return b.basePrice - a.basePrice;
        case "display-desc":
          return (b.specs.displayInches ?? 0) - (a.specs.displayInches ?? 0);
        default:
          return 0;
      }
    });
  }, [searchQuery, filters, sortBy]);

  const selectedComparisonLaptops = useMemo(
    () =>
      comparedIds
        .map((id) => TK_LAPTOPS.find((item) => item.id === id))
        .filter((item): item is LaptopProduct => Boolean(item)),
    [comparedIds]
  );

  const handleToggleCompare = (laptop: LaptopProduct) => {
    setComparedIds((prev) => {
      if (prev.includes(laptop.id)) {
        return prev.filter((id) => id !== laptop.id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, laptop.id];
    });
  };

  const handleRemoveCompare = (id: string) => {
    setComparedIds((prev) => prev.filter((item) => item !== id));
  };

  return (
    <div className="relative min-h-screen pb-28">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-white/[0.08] pt-12 pb-12 sm:pt-16 sm:pb-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[960px]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,240,255,0.14), transparent 70%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <Badge variant="cyan" pulse className="mb-4">
                APEX HARDWARE MATRIX // 2026
              </Badge>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#f8fafc] uppercase">
                THE TK FLEET //{" "}
                <span className="bg-gradient-to-r from-[#f8fafc] via-[#00f0ff] to-[#3b82f6] bg-clip-text text-transparent">
                  ALL CONFIGURATIONS
                </span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                Filter by silicon tier, thermal architecture, memory bandwidth,
                and display calibration.
              </p>
            </div>

            {/* Live Metric Counter Card */}
            <div className="inline-flex items-center gap-3 self-start lg:self-end rounded-2xl bg-[#0d0e15] border border-[#00f0ff]/35 px-5 py-3.5 shadow-[0_0_25px_-6px_rgba(0,240,255,0.25)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff]">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#94a3b8]">
                  LIVE FLEET TELEMETRY
                </div>
                <div
                  aria-live="polite"
                  className="font-mono text-sm sm:text-base font-bold text-[#f8fafc]"
                >
                  Showing{" "}
                  <span className="text-[#00f0ff]">
                    {filteredAndSortedLaptops.length}
                  </span>{" "}
                  of {TK_LAPTOPS.length} Machines
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Workspace */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Search & Sort Toolbar */}
        <CatalogToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          activeFilterCount={activeFilterPills.length}
          onOpenMobileFilters={() => setMobileFiltersOpen(true)}
          showingCount={filteredAndSortedLaptops.length}
          totalCount={TK_LAPTOPS.length}
        />

        {/* Sidebar + Product Grid Layout */}
        <div className="mt-8 flex flex-col lg:flex-row items-start gap-8">
          {/* Multi-Parameter Hardware Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onToggleSeries={handleToggleSeries}
            onToggleDisplaySize={handleToggleDisplaySize}
            onToggleMemory={handleToggleMemory}
            onToggleGpuTier={handleToggleGpuTier}
            onPriceChange={handlePriceChange}
            onResetAll={handleResetAll}
            hasActiveFilters={hasActiveFilters}
            mobileOpen={mobileFiltersOpen}
            onCloseMobile={() => setMobileFiltersOpen(false)}
          />

          {/* Main Product Results Column */}
          <div className="flex-1 w-full min-w-0">
            {/* Active Filter Pills Bar above Product Grid */}
            {hasActiveFilters && (
              <div
                aria-label="Active hardware filters"
                className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl bg-[#0d0e15]/90 border border-[#1f2232] p-3.5"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mr-1">
                  Active Specs:
                </span>

                {activeFilterPills.map((pill) => (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={pill.onRemove}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#00f0ff]/12 border border-[#00f0ff]/40 px-3 py-1 font-mono text-xs font-medium text-[#00f0ff] hover:bg-[#00f0ff]/25 transition-colors cursor-pointer"
                  >
                    <span>{pill.label}</span>
                    <X className="h-3 w-3" />
                  </button>
                ))}

                <button
                  type="button"
                  onClick={handleResetAll}
                  className="ml-auto inline-flex items-center gap-1 font-mono text-xs text-[#94a3b8] hover:text-[#f8fafc] transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3 text-[#00f0ff]" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}

            {/* Filtered Grid or Zero Results Fallback */}
            {filteredAndSortedLaptops.length === 0 ? (
              <EmptyCatalogState onResetAll={handleResetAll} />
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
              >
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedLaptops.map((laptop) => (
                    <motion.div
                      key={laptop.id}
                      layout
                      initial={{ opacity: 0, y: 16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="flex"
                    >
                      <ProductCard
                        product={laptop}
                        isCompared={comparedIds.includes(laptop.id)}
                        onToggleCompare={handleToggleCompare}
                        compareDisabled={comparedIds.length >= 3}
                        className="w-full"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Side-by-Side Comparison Dock */}
      <CompareDock
        selectedLaptops={selectedComparisonLaptops}
        onRemoveLaptop={handleRemoveCompare}
        onClearAll={() => setComparedIds([])}
        onOpenModal={() => setCompareModalOpen(true)}
      />

      {/* Side-by-Side Comparison Matrix Modal */}
      <CompareModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        laptops={selectedComparisonLaptops}
        onRemoveLaptop={handleRemoveCompare}
      />
    </div>
  );
}

export default CatalogClient;
