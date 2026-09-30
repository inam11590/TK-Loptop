"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Star,
  Activity,
  ShieldCheck,
  Award,
  Cpu,
} from "lucide-react";
import type { LaptopProduct } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { ProductGallery } from "@/components/pdp/ProductGallery";
import {
  HardwareConfigurator,
  DEFAULT_HARDWARE_CONFIG,
  calculateConfiguredTotals,
  type HardwareConfigurationState,
} from "@/components/pdp/HardwareConfigurator";
import { TechSpecMatrix } from "@/components/pdp/TechSpecMatrix";
import { StickyOrderBar } from "@/components/pdp/StickyOrderBar";

export interface ProductDetailClientProps {
  product: LaptopProduct;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem, totalItems } = useCart();
  const [config, setConfig] = useState<HardwareConfigurationState>(
    DEFAULT_HARDWARE_CONFIG
  );
  const [showStickyBar, setShowStickyBar] = useState(false);

  const configuratorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = configuratorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setShowStickyBar(rect.bottom < 220);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { totalPrice, monthlyPrice, summaryString, selectedItems } =
    calculateConfiguredTotals(product.basePrice, config);

  const seriesLabel = product.series ?? product.category;
  const seriesQuery = seriesLabel.split(" ")[0];

  const handleAddToBag = () => {
    addItem({
      laptopId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.featuredImage,
      basePrice: product.basePrice,
      totalPrice,
      quantity: 1,
      configuredSpecs: {
        processor: selectedItems.cpu.shortSummary,
        ram: `${selectedItems.ram.shortSummary} RAM`,
        storage: `${selectedItems.ssd.shortSummary} Gen5 NVMe`,
        display: selectedItems.glass.shortSummary,
        warranty: selectedItems.care.shortSummary,
      },
    });
  };

  return (
    <div className="relative min-h-screen pb-32">
      {/* Ambient Background Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[540px] overflow-hidden"
      >
        <div
          className="mx-auto h-full max-w-6xl"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(0,240,255,0.14), transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Clean Breadcrumb Navigation: Home / Catalog / [Series] / [Model Name] */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 rounded-2xl bg-[#0d0e15]/80 border border-white/[0.07] px-4 py-2.5 font-mono text-xs text-[#94a3b8] backdrop-blur-md"
        >
          <Link href="/" className="hover:text-[#00f0ff] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-white/25 shrink-0" />
          <Link
            href="/catalog"
            className="hover:text-[#00f0ff] transition-colors"
          >
            Catalog
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-white/25 shrink-0" />
          <Link
            href={`/catalog?series=${encodeURIComponent(seriesQuery)}`}
            className="hover:text-[#00f0ff] transition-colors"
          >
            {seriesLabel}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-white/25 shrink-0" />
          <span
            aria-current="page"
            className="font-semibold text-[#00f0ff] truncate"
          >
            {product.name}
          </span>
        </nav>

        {/* Product Headline Summary Header */}
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#1f2232] pb-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {product.badges.map((b, idx) => (
                <span
                  key={b}
                  className={
                    idx === 0
                      ? "rounded-full bg-[#00f0ff]/15 border border-[#00f0ff]/40 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#00f0ff]"
                      : "rounded-full bg-[#0d0e15] border border-[#1f2232] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#f8fafc]"
                  }
                >
                  {b}
                </span>
              ))}

              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0d0e15] border border-white/10 px-3 py-1 font-mono text-xs text-[#f8fafc]">
                <Star className="h-3.5 w-3.5 fill-[#00f0ff] text-[#00f0ff]" />
                <span>{product.rating.toFixed(2)}</span>
                <span className="text-[#94a3b8]">
                  ({product.reviewsCount} verified engineers)
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#f8fafc] uppercase">
              {product.name}
            </h1>
            <p className="mt-2 text-base sm:text-lg font-medium text-[#00f0ff]">
              {product.tagline}
            </p>
            <p className="mt-3 text-sm sm:text-base text-[#94a3b8] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Benchmark Telemetry Highlight Card */}
          <div className="shrink-0 rounded-2xl bg-[#0d0e15] border border-[#00f0ff]/35 p-4 sm:p-5 shadow-[0_0_28px_-6px_rgba(0,240,255,0.22)]">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#94a3b8]">
              <Activity className="h-3.5 w-3.5 text-[#00f0ff]" />
              <span>{product.benchmarkScore.name}</span>
            </div>
            <div className="mt-1.5 font-mono text-xl sm:text-2xl font-black text-[#00f0ff]">
              {product.benchmarkScore.score}
            </div>
            <div className="mt-1 font-mono text-[10px] text-emerald-400">
              ● VERIFIED LAB TELEMETRY
            </div>
          </div>
        </div>

        {/* Main 2-Column Split: Multi-Angle Gallery (Left) + Live Hardware Configurator (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Sticky Gallery & Foundry Guarantees */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 space-y-6">
            <ProductGallery product={product} />

            {/* Foundry Craftsmanship Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl bg-[#0d0e15] border border-[#1f2232] p-4">
                <Cpu className="h-4 w-4 text-[#00f0ff] mb-2" />
                <div className="text-xs font-bold text-[#f8fafc]">
                  Binned Flagship Silicon
                </div>
                <p className="mt-1 text-[11px] text-[#94a3b8]">
                  Top 5% wafer selection for maximum sustained clock stability.
                </p>
              </div>
              <div className="rounded-2xl bg-[#0d0e15] border border-[#1f2232] p-4">
                <Award className="h-4 w-4 text-[#00f0ff] mb-2" />
                <div className="text-xs font-bold text-[#f8fafc]">
                  Zero-Dead-Pixel Guarantee
                </div>
                <p className="mt-1 text-[11px] text-[#94a3b8]">
                  Every ProXDR panel is optically inspected and spectrophotometrically tuned.
                </p>
              </div>
              <div className="rounded-2xl bg-[#0d0e15] border border-[#1f2232] p-4">
                <ShieldCheck className="h-4 w-4 text-[#00f0ff] mb-2" />
                <div className="text-xs font-bold text-[#f8fafc]">
                  Direct Concierge Support
                </div>
                <p className="mt-1 text-[11px] text-[#94a3b8]">
                  Direct access to Level-3 systems engineers with zero script bots.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Hardware Configurator */}
          <div ref={configuratorRef} className="lg:col-span-5">
            <HardwareConfigurator
              product={product}
              config={config}
              onChangeConfig={setConfig}
              onAddToBag={handleAddToBag}
              addedCount={totalItems}
            />
          </div>
        </div>

        {/* Full Architectural Technical Specification Matrix */}
        <TechSpecMatrix product={product} />
      </div>

      {/* Floating Sticky Purchase Bar */}
      <StickyOrderBar
        visible={showStickyBar}
        modelName={product.name}
        specsSummary={summaryString}
        totalPrice={totalPrice}
        monthlyPrice={monthlyPrice}
        addedCount={totalItems}
        onAddToBag={handleAddToBag}
      />
    </div>
  );
}

export default ProductDetailClient;
