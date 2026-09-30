"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Layers,
  Keyboard,
  Cable,
  Sparkles,
} from "lucide-react";
import type { LaptopProduct } from "@/types/product";
import { cn } from "@/lib/utils";

export interface CameraAngle {
  id: string;
  label: string;
  shortLabel: string;
  caption: string;
  telemetryTag: string;
  imageUrl: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DEFAULT_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=85",
  "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1600&q=85",
  "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1600&q=85",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=85",
];

export interface ProductGalleryProps {
  product: LaptopProduct;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const angles: CameraAngle[] = [
    {
      id: "front-open",
      label: "Front Open Display",
      shortLabel: "01 // DISPLAY",
      caption: `${product.specs.display} — Factory Calibrated Delta-E < 1`,
      telemetryTag: "3.8K PROXDR // 240HZ",
      imageUrl: product.featuredImage || DEFAULT_FALLBACK_IMAGES[0],
      icon: Monitor,
    },
    {
      id: "top-closed",
      label: "Top Closed CNC Lid",
      shortLabel: "02 // CNC LID",
      caption:
        "CNC-Milled Grade-5 Stealth Titanium Unibody with Anodized Micro-Bead Finish",
      telemetryTag: "ZERO-FLEX CHASSIS",
      imageUrl: product.galleryImages[1] || DEFAULT_FALLBACK_IMAGES[1],
      icon: Layers,
    },
    {
      id: "keyboard-deck",
      label: "Keyboard Deck & Trackpad",
      shortLabel: "03 // DECK",
      caption:
        "Per-Key Cyber-Cyan Backlit Tactile Switch Array & Haptic Gorilla Glass Trackpad",
      telemetryTag: "OPTICAL-TACTILE // HAPTIC",
      imageUrl: product.galleryImages[2] || DEFAULT_FALLBACK_IMAGES[2],
      icon: Keyboard,
    },
    {
      id: "side-ports",
      label: "Side I/O Port Profile",
      shortLabel: "04 // I/O PROFILE",
      caption: product.specs.ports.join(" • "),
      telemetryTag: "THUNDERBOLT 5 // 120GBPS",
      imageUrl: product.galleryImages[0] || DEFAULT_FALLBACK_IMAGES[3],
      icon: Cable,
    },
  ];

  const currentAngle = angles[activeIndex] ?? angles[0];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (lightboxOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [lightboxOpen]);

  // Light-dismiss fallback for browsers without native <dialog closedby="any">
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => setLightboxOpen(false);
    dialog.addEventListener("close", handleClose);

    const supportsClosedBy =
      typeof HTMLDialogElement !== "undefined" &&
      "closedBy" in HTMLDialogElement.prototype;

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (isDialogContent) return;
      dialog.close();
    };

    if (!supportsClosedBy) {
      dialog.addEventListener("click", handleBackdropClick);
    }

    return () => {
      dialog.removeEventListener("close", handleClose);
      if (!supportsClosedBy) {
        dialog.removeEventListener("click", handleBackdropClick);
      }
    };
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? angles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === angles.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Interactive Viewport */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0b0c13] border border-[#1f2232] p-4 sm:p-6 shadow-[0_25px_70px_-15px_rgba(0,240,255,0.16)] group">
        {/* Ambient Radial Backlight Glow (#00f0ff matching keyboard accents) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, rgba(0,240,255,0.22), rgba(59,130,246,0.08) 48%, transparent 75%)",
          }}
        />

        {/* Top Viewport HUD Overlay */}
        <div className="relative z-20 flex items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#050507]/85 border border-[#00f0ff]/35 px-3 py-1 backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-[#00f0ff]" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#00f0ff]">
              {currentAngle.telemetryTag}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Inspect chassis craftsmanship in fullscreen lightbox"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#050507]/85 border border-white/15 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-[#f8fafc] hover:border-[#00f0ff] hover:text-[#00f0ff] transition-colors cursor-pointer"
          >
            <Maximize2 className="h-3.5 w-3.5 text-[#00f0ff]" />
            <span>Inspect Chassis</span>
          </button>
        </div>

        {/* Main Image Stage with Smooth Fade Transition */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#050507] border border-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAngle.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative h-full w-full"
            >
              <img
                src={currentAngle.imageUrl}
                alt={`${product.name} — ${currentAngle.label}`}
                fetchPriority="high"
                width={1400}
                height={875}
                onClick={() => setLightboxOpen(true)}
                className="h-full w-full object-cover object-center cursor-zoom-in"
              />

              {/* Subtle Cyber-Cyan Keyboard Underglow Accent */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050507]/90 via-transparent to-[#050507]/30" />
              <div className="pointer-events-none absolute bottom-0 inset-x-12 h-1 bg-gradient-to-r from-transparent via-[#00f0ff]/80 to-transparent blur-[1px]" />
            </motion.div>
          </AnimatePresence>

          {/* Left / Right Quick Angle Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous camera angle"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#050507]/80 border border-white/15 text-[#f8fafc] opacity-0 group-hover:opacity-100 hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next camera angle"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#050507]/80 border border-white/15 text-[#f8fafc] opacity-0 group-hover:opacity-100 hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Bottom Angle Caption Bar */}
          <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-3 rounded-xl bg-[#050507]/85 border border-white/10 px-3.5 py-2 backdrop-blur-md">
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#00f0ff]">
                {currentAngle.label}
              </div>
              <div className="text-xs text-[#94a3b8] line-clamp-1">
                {currentAngle.caption}
              </div>
            </div>
            <span className="font-mono text-[10px] text-[#f8fafc]/80 shrink-0">
              0{activeIndex + 1} / 0{angles.length}
            </span>
          </div>
        </div>
      </div>

      {/* 4-Camera Angle Thumbnail Selector */}
      <div
        role="tablist"
        aria-label="Hardware camera angles"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {angles.map((angle, idx) => {
          const IconComponent = angle.icon;
          const isSelected = idx === activeIndex;
          return (
            <button
              key={angle.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border p-2 text-left transition-all duration-200 cursor-pointer",
                isSelected
                  ? "bg-[#0d0e15] border-[#00f0ff] shadow-[0_0_22px_-4px_rgba(0,240,255,0.35)]"
                  : "bg-[#0d0e15]/60 border-[#1f2232] hover:border-white/25"
              )}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#050507] mb-2">
                <img
                  src={angle.imageUrl}
                  alt={angle.label}
                  loading="lazy"
                  width={300}
                  height={188}
                  className={cn(
                    "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105",
                    isSelected ? "opacity-100" : "opacity-60 group-hover:opacity-85"
                  )}
                />
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
                )}
              </div>

              <div className="flex items-center gap-1.5 px-1">
                <IconComponent
                  className={cn(
                    "h-3.5 w-3.5 shrink-0",
                    isSelected ? "text-[#00f0ff]" : "text-[#94a3b8]"
                  )}
                />
                <span
                  className={cn(
                    "font-mono text-[10px] font-semibold uppercase tracking-wider truncate",
                    isSelected ? "text-[#00f0ff]" : "text-[#94a3b8]"
                  )}
                >
                  {angle.shortLabel}
                </span>
              </div>
              <div className="px-1 mt-0.5 text-xs font-medium text-[#f8fafc] truncate">
                {angle.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Fullscreen Zoom / Lightbox Modal */}
      <dialog
        ref={dialogRef}
        closedby="any"
        aria-label={`${product.name} Fullscreen Chassis Lightbox`}
        className="m-auto w-full max-w-5xl rounded-3xl bg-[#050507] border border-[#00f0ff]/40 text-[#f8fafc] p-0 shadow-[0_25px_90px_-10px_rgba(0,240,255,0.35)] backdrop:bg-black/85 backdrop:backdrop-blur-md open:flex open:flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-[#1f2232] bg-[#0d0e15] px-6 py-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#00f0ff]">
              CHASSIS INSPECTION LIGHTBOX // {currentAngle.shortLabel}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#f8fafc]">
              {product.name} — {currentAngle.label}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close fullscreen inspection modal"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#050507] border border-[#1f2232] text-[#94a3b8] hover:border-[#00f0ff] hover:text-[#00f0ff] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative aspect-[16/10] w-full bg-[#050507]">
          <img
            src={currentAngle.imageUrl}
            alt={`${product.name} — ${currentAngle.label}`}
            width={1600}
            height={1000}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-70" />
          <div className="absolute bottom-5 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-sm text-[#f8fafc] font-medium">
              {currentAngle.caption}
            </p>
            <div className="flex items-center gap-2">
              {angles.map((a, i) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "rounded-lg border px-2.5 py-1 font-mono text-[10px] uppercase transition-colors cursor-pointer",
                    i === activeIndex
                      ? "bg-[#00f0ff] text-[#050507] border-[#00f0ff] font-bold"
                      : "bg-[#0d0e15]/90 text-[#94a3b8] border-white/15 hover:text-[#f8fafc]"
                  )}
                >
                  0{i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ProductGallery;
