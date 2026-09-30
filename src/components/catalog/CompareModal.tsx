"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  X,
  Cpu,
  Sparkles,
  Layers,
  Monitor,
  Snowflake,
  Scale,
  BatteryCharging,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";
import type { LaptopProduct } from "@/types/product";
import { Button } from "@/components/ui/Button";

export interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  laptops: LaptopProduct[];
  onRemoveLaptop: (id: string) => void;
  onConfigure?: (product: LaptopProduct) => void;
}

export function CompareModal({
  isOpen,
  onClose,
  laptops,
  onRemoveLaptop,
  onConfigure,
}: CompareModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Fallback for browsers without native <dialog closedby="any"> support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose();
    };
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
  }, [onClose]);

  const comparisonRows = [
    {
      label: "Base Price & Monthly Financing",
      icon: DollarSign,
      render: (p: LaptopProduct) => (
        <div>
          <div className="text-lg font-extrabold text-[#f8fafc]">
            ${p.basePrice.toLocaleString("en-US")}{" "}
            <span className="font-mono text-xs font-normal text-[#94a3b8]">
              USD
            </span>
          </div>
          <div className="font-mono text-xs text-[#00f0ff]">
            or ${p.monthlyFinancingPrice}/mo at 0% APR
          </div>
        </div>
      ),
    },
    {
      label: "Processor Architecture & Clock Speed",
      icon: Cpu,
      render: (p: LaptopProduct) => (
        <div>
          <div className="font-semibold text-[#f8fafc]">{p.specs.cpu}</div>
          <div className="mt-0.5 font-mono text-xs text-[#94a3b8]">
            {p.specs.cpuClock ?? "Up to 5.4 GHz Turbo Boost"}
          </div>
        </div>
      ),
    },
    {
      label: "GPU Core Count & VRAM",
      icon: Sparkles,
      render: (p: LaptopProduct) => (
        <div>
          <div className="font-semibold text-[#f8fafc]">{p.specs.gpu}</div>
          <div className="mt-0.5 font-mono text-xs text-[#00f0ff]">
            {p.specs.gpuVramAndCores ?? "Dedicated High-Bandwidth Tensor Core"}
          </div>
        </div>
      ),
    },
    {
      label: "Memory Bandwidth & Max RAM",
      icon: Layers,
      render: (p: LaptopProduct) => (
        <div>
          <div className="font-semibold text-[#f8fafc]">{p.specs.ram}</div>
          <div className="mt-0.5 font-mono text-xs text-[#94a3b8]">
            {p.specs.memoryBandwidth ?? "8533MHz High-Speed Unified Bus"}
          </div>
        </div>
      ),
    },
    {
      label: "Display Resolution, Refresh Rate & Nits Peak Brightness",
      icon: Monitor,
      render: (p: LaptopProduct) => (
        <div>
          <div className="font-semibold text-[#f8fafc]">{p.specs.display}</div>
          <div className="mt-0.5 font-mono text-xs text-[#00f0ff]">
            {p.specs.displayPeakNits ?? "240Hz • 1,600 nits Peak HDR"}
          </div>
        </div>
      ),
    },
    {
      label: "Cooling Technology (Cryo-Chamber vs Dual Vapor-Plate)",
      icon: Snowflake,
      render: (p: LaptopProduct) => (
        <div>
          <div className="font-semibold text-[#f8fafc]">
            {p.specs.coolingTech ?? "Cryo-Chamber Liquid-Metal Vapor"}
          </div>
          <div className="mt-0.5 font-mono text-xs text-emerald-400">
            Zero-Throttle Sustained Thermal Envelope
          </div>
        </div>
      ),
    },
    {
      label: "Weight & Dimensions",
      icon: Scale,
      render: (p: LaptopProduct) => (
        <div>
          <div className="font-semibold text-[#f8fafc]">{p.specs.weight}</div>
          <div className="mt-0.5 font-mono text-xs text-[#94a3b8]">
            {p.specs.dimensions ?? "Precision CNC Unibody Enclosure"}
          </div>
        </div>
      ),
    },
    {
      label: "Battery Capacity & Rapid Charge Rating",
      icon: BatteryCharging,
      render: (p: LaptopProduct) => (
        <div>
          <div className="font-semibold text-[#f8fafc]">{p.specs.battery}</div>
          <div className="mt-0.5 font-mono text-xs text-[#00f0ff]">
            {p.specs.rapidCharge ?? "GaN Rapid Charge (0–80% in 28 min)"}
          </div>
        </div>
      ),
    },
  ];

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="compare-modal-title"
      className="m-auto w-full max-w-6xl rounded-3xl bg-[#08090f] border border-[#00f0ff]/40 text-[#f8fafc] p-0 shadow-[0_25px_90px_-15px_rgba(0,240,255,0.3)] backdrop:bg-black/80 backdrop:backdrop-blur-md open:flex open:flex-col max-h-[90vh]"
    >
      {/* Modal Header */}
      <div className="flex items-center justify-between border-b border-[#1f2232] px-6 py-5 bg-[#0d0e15]">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#00f0ff]">
            SIDE-BY-SIDE TELEMETRY MATRIX
          </div>
          <h2
            id="compare-modal-title"
            className="mt-1 text-xl sm:text-2xl font-extrabold tracking-tight text-[#f8fafc]"
          >
            Hardware Architecture Comparison ({laptops.length} Machine
            {laptops.length === 1 ? "" : "s"})
          </h2>
        </div>

        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close comparison modal"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#050507] border border-[#1f2232] text-[#94a3b8] hover:border-[#00f0ff]/50 hover:text-[#00f0ff] transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Scrollable Comparison Table Body */}
      <div className="overflow-x-auto overflow-y-auto p-6">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#1f2232]">
              <th className="w-56 pb-5 pr-4 align-bottom">
                <div className="font-mono text-xs uppercase tracking-widest text-[#94a3b8]">
                  SPECIFICATION PARAMETER
                </div>
              </th>
              {laptops.map((laptop) => (
                <th
                  key={laptop.id}
                  className="pb-5 px-4 align-top min-w-[220px]"
                >
                  <div className="relative rounded-2xl bg-[#0d0e15] border border-[#1f2232] p-4">
                    <button
                      type="button"
                      onClick={() => onRemoveLaptop(laptop.id)}
                      aria-label={`Remove ${laptop.name}`}
                      className="absolute top-2.5 right-2.5 rounded-lg bg-[#050507]/85 border border-white/10 p-1 text-[#94a3b8] hover:text-[#f8fafc] cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    <img
                      src={laptop.featuredImage}
                      alt={laptop.name}
                      loading="lazy"
                      width={320}
                      height={200}
                      className="h-28 w-full rounded-xl object-cover border border-white/10 mb-3"
                    />
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[#00f0ff]">
                      {laptop.category}
                    </div>
                    <div className="mt-0.5 text-base font-bold text-[#f8fafc]">
                      {laptop.name}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#1f2232]">
            {comparisonRows.map((row) => {
              const IconComponent = row.icon;
              return (
                <tr
                  key={row.label}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 pr-4 align-top">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/25 text-[#00f0ff]">
                        <IconComponent className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-[#94a3b8] leading-snug">
                        {row.label}
                      </span>
                    </div>
                  </td>

                  {laptops.map((laptop) => (
                    <td
                      key={`${laptop.id}-${row.label}`}
                      className="py-4 px-4 align-top text-xs sm:text-sm"
                    >
                      {row.render(laptop)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>

          {/* Bottom Direct CTA Row */}
          <tfoot>
            <tr className="border-t border-[#1f2232]">
              <td className="pt-5 pr-4 font-mono text-xs uppercase tracking-widest text-[#94a3b8]">
                DIRECT ACTION
              </td>
              {laptops.map((laptop) => (
                <td key={`${laptop.id}-cta`} className="pt-5 px-4">
                  <Link
                    href={`/catalog/${laptop.slug}`}
                    onClick={() => {
                      dialogRef.current?.close();
                      onConfigure?.(laptop);
                    }}
                    className="block w-full"
                  >
                    <Button
                      variant="primary"
                      size="md"
                      fullWidth
                      rightIcon={<ArrowUpRight className="h-4 w-4" />}
                    >
                      Configure This Model
                    </Button>
                  </Link>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </dialog>
  );
}

export default CompareModal;
