"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cpu,
  Layers,
  Monitor,
  Sparkles,
  Star,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  HardDrive,
  BatteryCharging,
  Scale,
  Cable,
  Activity,
  GitCompare,
  Check,
} from "lucide-react";
import type { LaptopProduct } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  product: LaptopProduct;
  onConfigure?: (product: LaptopProduct) => void;
  isCompared?: boolean;
  onToggleCompare?: (product: LaptopProduct) => void;
  compareDisabled?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  onConfigure,
  isCompared = false,
  onToggleCompare,
  compareDisabled = false,
  className,
}: ProductCardProps) {
  const [specsExpanded, setSpecsExpanded] = useState(false);

  const formattedPrice = product.basePrice.toLocaleString("en-US");
  const pdpUrl = `/catalog/${product.slug}`;

  return (
    <article
      className={cn(
        "bg-[#0c0d14] border transition-all duration-300 rounded-2xl overflow-hidden group flex flex-col",
        isCompared
          ? "border-[#00f0ff] shadow-[0_0_32px_-4px_rgba(0,240,255,0.3)]"
          : "border-white/[0.08] hover:border-[#00f0ff]/40 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.2)]",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#07080d] border-b border-white/[0.06]">
        <Link href={pdpUrl} className="block h-full w-full">
          <img
            src={product.featuredImage}
            alt={product.name}
            loading="lazy"
            width={700}
            height={440}
            className="h-full w-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Subtle Dark Vignette & Cyber Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c0d14] via-[#0c0d14]/25 to-transparent" />

        {/* Top Badges for Series & Innovations */}
        <div className="pointer-events-none absolute top-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2 z-10">
          <div className="flex flex-wrap items-center gap-1.5">
            {product.badges.slice(0, 2).map((badgeText, idx) => (
              <span
                key={badgeText}
                className={cn(
                  "rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md border",
                  idx === 0
                    ? "bg-[#00f0ff]/15 text-[#00f0ff] border-[#00f0ff]/40 shadow-[0_0_15px_-3px_rgba(0,240,255,0.35)]"
                    : "bg-[#050507]/85 text-[#f8fafc] border-white/15"
                )}
              >
                {badgeText}
              </span>
            ))}
          </div>

          {/* Rating Pill */}
          <div className="inline-flex items-center gap-1 rounded-full bg-[#050507]/85 border border-white/10 px-2.5 py-1 backdrop-blur-md text-[11px] font-mono text-[#f8fafc]">
            <Star className="h-3 w-3 fill-[#00f0ff] text-[#00f0ff]" />
            <span>{product.rating.toFixed(2)}</span>
            <span className="text-[#94a3b8]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Bottom Benchmark Telemetry Strip on Image */}
        <div className="pointer-events-none absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between rounded-lg bg-[#050507]/85 border border-white/[0.08] px-3 py-1.5 backdrop-blur-md">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#94a3b8] truncate">
            <Activity className="h-3 w-3 text-[#00f0ff] shrink-0" />
            <span className="truncate">{product.benchmarkScore.name}</span>
          </span>
          <span className="font-mono text-[10px] font-bold text-[#00f0ff] shrink-0 ml-2">
            {product.benchmarkScore.score}
          </span>
        </div>
      </div>

      {/* Content & Spec HUD */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Category Label in Glowing Electric Cyan + Compare Checkbox Toggle */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#00f0ff] drop-shadow-[0_0_8px_rgba(0,240,255,0.35)]">
            {product.category}
          </span>

          {onToggleCompare ? (
            <button
              type="button"
              role="checkbox"
              aria-checked={isCompared}
              disabled={!isCompared && compareDisabled}
              onClick={() => onToggleCompare(product)}
              title={
                !isCompared && compareDisabled
                  ? "Maximum 3 machines can be compared at once"
                  : "Select machine for side-by-side spec comparison"
              }
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer",
                isCompared
                  ? "bg-[#00f0ff] text-[#050507] border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                  : "bg-[#050507] text-[#94a3b8] border-[#1f2232] hover:border-[#00f0ff]/50 hover:text-[#f8fafc]",
                !isCompared &&
                  compareDisabled &&
                  "opacity-40 cursor-not-allowed hover:border-[#1f2232] hover:text-[#94a3b8]"
              )}
            >
              <span
                className={cn(
                  "flex h-3.5 w-3.5 items-center justify-center rounded-sm border",
                  isCompared
                    ? "border-[#050507] bg-[#050507] text-[#00f0ff]"
                    : "border-white/25 bg-transparent"
                )}
              >
                {isCompared ? (
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                ) : (
                  <GitCompare className="h-2.5 w-2.5 text-[#00f0ff]" />
                )}
              </span>
              <span>{isCompared ? "Comparing" : "Compare"}</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              IN STOCK
            </span>
          )}
        </div>

        {/* Product Title */}
        <Link href={pdpUrl}>
          <h3 className="text-xl font-bold tracking-tight text-[#f8fafc] group-hover:text-[#00f0ff] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Subtitle / Tagline */}
        <p className="mt-1.5 text-xs sm:text-sm text-[#94a3b8] line-clamp-2 leading-relaxed">
          {product.tagline}
        </p>

        {/* 4-Item Quick Spec Grid */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          {/* 1. Chip / CPU Badge */}
          <div className="rounded-xl bg-[#050507]/90 border border-[#1f2232] p-2.5 group-hover:border-white/15 transition-colors">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#94a3b8]">
              <Cpu className="h-3.5 w-3.5 text-[#00f0ff] shrink-0" />
              <span>PROCESSOR</span>
            </div>
            <div
              className="mt-1 text-xs font-semibold text-[#f8fafc] truncate"
              title={product.specs.cpu}
            >
              {product.specs.cpu}
            </div>
          </div>

          {/* 2. RAM Capacity Pill */}
          <div className="rounded-xl bg-[#050507]/90 border border-[#1f2232] p-2.5 group-hover:border-white/15 transition-colors">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#94a3b8]">
              <Layers className="h-3.5 w-3.5 text-[#00f0ff] shrink-0" />
              <span>MEMORY</span>
            </div>
            <div
              className="mt-1 text-xs font-semibold text-[#f8fafc] truncate"
              title={product.specs.ram}
            >
              {product.specs.ram}
            </div>
          </div>

          {/* 3. GPU Architecture Tag */}
          <div className="rounded-xl bg-[#050507]/90 border border-[#1f2232] p-2.5 group-hover:border-white/15 transition-colors">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#94a3b8]">
              <Sparkles className="h-3.5 w-3.5 text-[#3b82f6] shrink-0" />
              <span>GRAPHICS / NPU</span>
            </div>
            <div
              className="mt-1 text-xs font-semibold text-[#f8fafc] truncate"
              title={product.specs.gpu}
            >
              {product.specs.gpu}
            </div>
          </div>

          {/* 4. Display Resolution / Refresh Rate */}
          <div className="rounded-xl bg-[#050507]/90 border border-[#1f2232] p-2.5 group-hover:border-white/15 transition-colors">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#94a3b8]">
              <Monitor className="h-3.5 w-3.5 text-[#3b82f6] shrink-0" />
              <span>DISPLAY</span>
            </div>
            <div
              className="mt-1 text-xs font-semibold text-[#f8fafc] truncate"
              title={product.specs.display}
            >
              {product.specs.display}
            </div>
          </div>
        </div>

        {/* Expandable Full Spec Matrix Drawer */}
        {specsExpanded && (
          <div className="mt-3 space-y-2.5 rounded-xl bg-[#050507] border border-[#00f0ff]/25 p-3.5 text-xs animate-in fade-in duration-200">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#00f0ff] pb-1 border-b border-white/[0.08]">
              FULL HARDWARE ARCHITECTURE MATRIX
            </div>

            <div className="grid grid-cols-1 gap-2 text-[#94a3b8]">
              <div className="flex items-start gap-2">
                <HardDrive className="h-3.5 w-3.5 text-[#00f0ff] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#f8fafc] font-medium">Storage: </span>
                  {product.specs.storage}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <BatteryCharging className="h-3.5 w-3.5 text-[#00f0ff] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#f8fafc] font-medium">Battery: </span>
                  {product.specs.battery}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Scale className="h-3.5 w-3.5 text-[#00f0ff] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#f8fafc] font-medium">
                    Chassis Mass:{" "}
                  </span>
                  {product.specs.weight}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Cable className="h-3.5 w-3.5 text-[#00f0ff] shrink-0 mt-0.5" />
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {product.specs.ports.map((port) => (
                    <span
                      key={port}
                      className="rounded-md bg-[#0d0e15] border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-[#f8fafc]"
                    >
                      {port}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Spacer to push pricing & CTA to bottom */}
        <div className="mt-auto pt-5">
          {/* Pricing & CTA Actions */}
          <div className="flex items-end justify-between border-t border-white/[0.08] pt-4 mb-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#94a3b8]">
                STARTING CONFIGURATION
              </div>
              <div className="mt-0.5 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-[#f8fafc]">
                  ${formattedPrice}
                </span>
                <span className="font-mono text-xs text-[#94a3b8]">USD</span>
              </div>
              <p className="mt-0.5 text-[11px] text-[#94a3b8]">
                or{" "}
                <span className="text-[#00f0ff] font-medium">
                  ${product.monthlyFinancingPrice}/mo
                </span>{" "}
                with 0% APR
              </p>
            </div>

            {/* Quick Spec Expander Trigger */}
            <button
              type="button"
              onClick={() => setSpecsExpanded((prev) => !prev)}
              aria-expanded={specsExpanded}
              className="inline-flex items-center gap-1 rounded-lg bg-[#050507] border border-[#1f2232] px-2.5 py-1.5 font-mono text-[11px] text-[#94a3b8] hover:text-[#00f0ff] hover:border-[#00f0ff]/40 transition-colors cursor-pointer"
            >
              <span>{specsExpanded ? "Hide Matrix" : "Full Specs"}</span>
              {specsExpanded ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          {/* Configure & Buy Action Button routing to /catalog/[slug] */}
          <Link
            href={pdpUrl}
            onClick={() => onConfigure?.(product)}
            className="block w-full"
          >
            <Button
              variant="primary"
              size="md"
              fullWidth
              rightIcon={<ArrowUpRight className="h-4 w-4" />}
            >
              Configure & Buy
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
