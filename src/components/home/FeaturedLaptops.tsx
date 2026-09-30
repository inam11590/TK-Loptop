"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Cpu, Gamepad2, Feather, ArrowUpRight } from "lucide-react";
import { TK_LAPTOPS } from "@/data/products";
import type { LaptopProduct } from "@/types/product";
import { ProductCard } from "@/components/ui/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CompareDock } from "@/components/catalog/CompareDock";
import { CompareModal } from "@/components/catalog/CompareModal";
import { cn } from "@/lib/utils";

export type CatalogFilterTab =
  | "All Systems"
  | "AI & Workstation"
  | "Gaming Blade"
  | "Ultraportable";

interface FilterTabConfig {
  id: CatalogFilterTab;
  label: CatalogFilterTab;
  icon: React.ComponentType<{ className?: string }>;
}

const FILTER_TABS: FilterTabConfig[] = [
  { id: "All Systems", label: "All Systems", icon: Layers },
  { id: "AI & Workstation", label: "AI & Workstation", icon: Cpu },
  { id: "Gaming Blade", label: "Gaming Blade", icon: Gamepad2 },
  { id: "Ultraportable", label: "Ultraportable", icon: Feather },
];

export function FeaturedLaptops() {
  const [activeTab, setActiveTab] = useState<CatalogFilterTab>("All Systems");
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const filteredLaptops = useMemo(() => {
    if (activeTab === "All Systems") {
      return TK_LAPTOPS;
    }
    if (activeTab === "AI & Workstation") {
      return TK_LAPTOPS.filter(
        (laptop) =>
          laptop.category === "AI & Workstation" ||
          laptop.category === "Flagship"
      );
    }
    return TK_LAPTOPS.filter((laptop) => laptop.category === activeTab);
  }, [activeTab]);

  const getTabCount = (tab: CatalogFilterTab) => {
    if (tab === "All Systems") return TK_LAPTOPS.length;
    if (tab === "AI & Workstation") {
      return TK_LAPTOPS.filter(
        (l) => l.category === "AI & Workstation" || l.category === "Flagship"
      ).length;
    }
    return TK_LAPTOPS.filter((l) => l.category === tab).length;
  };

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
      if (prev.length >= 3) return prev;
      return [...prev, laptop.id];
    });
  };

  return (
    <section
      id="catalog"
      aria-label="The Apex Portfolio Featured Laptops"
      className="relative py-24 sm:py-32 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Ambient Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[520px] w-[980px] rounded-full bg-[#00f0ff]/[0.04] blur-[150px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="cyan" pulse className="mb-5">
            THE APEX PORTFOLIO // 2026 RELEASES
          </Badge>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#f8fafc] leading-tight">
            Engineered for Every{" "}
            <span className="bg-gradient-to-r from-[#f8fafc] via-[#00f0ff] to-[#3b82f6] bg-clip-text text-transparent">
              Threshold of Performance
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#94a3b8] leading-relaxed">
            From extreme neural network training to ultra-responsive competitive
            play.
          </p>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Filter laptops by performance category"
            className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-[#0d0e15] border border-[#1f2232] p-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
          >
            {FILTER_TABS.map((tab) => {
              const IconComponent = tab.icon;
              const isSelected = activeTab === tab.id;
              const count = getTabCount(tab.id);

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer",
                    isSelected
                      ? "bg-[#00f0ff] text-[#050507] font-semibold glow-cyan"
                      : "text-[#94a3b8] hover:text-[#f8fafc] hover:bg-white/[0.04]"
                  )}
                >
                  <IconComponent
                    className={cn(
                      "h-4 w-4 shrink-0",
                      isSelected ? "text-[#050507]" : "text-[#00f0ff]"
                    )}
                  />
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 font-mono text-[10px]",
                      isSelected
                        ? "bg-[#050507]/20 text-[#050507] font-bold"
                        : "bg-white/[0.06] text-[#94a3b8]"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive 3-Column / 2-Column / 1-Column Product Grid with Smooth Transitions */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredLaptops.map((laptop) => (
              <motion.div
                key={laptop.id}
                layout
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
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

        {/* Bottom CTA to Full Hardware Catalog & Filter Matrix */}
        <div className="mt-14 flex justify-center">
          <Link href="/catalog">
            <Button
              variant="outline"
              size="lg"
              rightIcon={<ArrowUpRight className="h-4 w-4" />}
            >
              Open Full Hardware Catalog & Spec Filter Matrix
            </Button>
          </Link>
        </div>
      </div>

      {/* Floating Comparison Dock & Modal */}
      <CompareDock
        selectedLaptops={selectedComparisonLaptops}
        onRemoveLaptop={(id) =>
          setComparedIds((prev) => prev.filter((item) => item !== id))
        }
        onClearAll={() => setComparedIds([])}
        onOpenModal={() => setCompareModalOpen(true)}
      />

      <CompareModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        laptops={selectedComparisonLaptops}
        onRemoveLaptop={(id) =>
          setComparedIds((prev) => prev.filter((item) => item !== id))
        }
      />
    </section>
  );
}

export default FeaturedLaptops;
