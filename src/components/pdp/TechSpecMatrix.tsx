"use client";

import React, { useState } from "react";
import {
  Cpu,
  Monitor,
  Snowflake,
  Cable,
  Volume2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { LaptopProduct } from "@/types/product";
import { Badge } from "@/components/ui/Badge";

export interface TechSpecMatrixProps {
  product: LaptopProduct;
}

interface SpecMatrixSection {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  metrics: { label: string; value: string; highlight?: boolean }[];
}

export function TechSpecMatrix({ product }: TechSpecMatrixProps) {
  const sections: SpecMatrixSection[] = [
    {
      id: "silicon-ai",
      code: "SECTION 01 // COMPUTE",
      title: "Silicon & AI Engine",
      subtitle: "Teraflops, NPU TOPS, L3 Cache & Unified Fabric Architecture",
      icon: Cpu,
      metrics: [
        { label: "Primary Processor", value: product.specs.cpu, highlight: true },
        {
          label: "Clock Architecture",
          value: product.specs.cpuClock ?? "Up to 5.4 GHz Precision Turbo",
        },
        { label: "Graphics / Tensor Core", value: product.specs.gpu, highlight: true },
        {
          label: "AI Neural Throughput",
          value: "240 TOPS INT8 / FP16 Dedicated Neural Engine (84 TFLOPS GPU)",
        },
        {
          label: "On-Die System Cache",
          value: "96MB L3 Smart Cache + 64MB SLC Unified Fabric",
        },
        {
          label: "Memory Subsystem",
          value: `${product.specs.ram} (${product.specs.memoryBandwidth ?? "960 GB/s Bandwidth"})`,
        },
      ],
    },
    {
      id: "display-calibration",
      code: "SECTION 02 // OPTICS",
      title: "Display & Color Calibration",
      subtitle: "DCI-P3 100%, Factory Delta-E < 1, 1200+ Nits HDR Peak",
      icon: Monitor,
      metrics: [
        { label: "Panel Architecture", value: product.specs.display, highlight: true },
        {
          label: "Color Gamut & Accuracy",
          value: "100% DCI-P3 / 100% AdobeRGB • Individual Factory Delta-E < 0.8",
        },
        {
          label: "Peak Brightness & Contrast",
          value: "1,200 Nits Sustained HDR (1,600 Nits Peak) • 1,000,000:1 Contrast",
          highlight: true,
        },
        {
          label: "Refresh & Response",
          value: "240Hz Adaptive Sync (1Hz–240Hz ProMotion) • 0.1ms GtG",
        },
        {
          label: "Surface Coating",
          value: "Optical Gorilla Glass or Optional Sub-Micron Nano-Texture Matte",
        },
        {
          label: "HDR Certifications",
          value: "Dolby Vision IQ • VESA DisplayHDR True Black 1000 • Pantone Validated",
        },
      ],
    },
    {
      id: "thermal-engineering",
      code: "SECTION 03 // THERMALS",
      title: "Thermal Engineering",
      subtitle: "Cryo-Chamber liquid-metal vapor cooling & dual maglev fans",
      icon: Snowflake,
      metrics: [
        {
          label: "Cooling Architecture",
          value:
            product.specs.coolingTech ??
            "Cryo-Chamber Liquid-Metal Vapor Cooling",
          highlight: true,
        },
        {
          label: "Thermal Interface Material",
          value: "Custom Indium-Gallium Liquid Metal on CPU & GPU Dies",
        },
        {
          label: "Impeller Array",
          value: "Dual 98-Blade Liquid-Crystal Polymer Maglev Fans (0dB Idle Mode)",
          highlight: true,
        },
        {
          label: "Fin Stack Geometry",
          value: "0.05mm Ultra-Thin Copper Radiator Fins (312 Total Fins)",
        },
        {
          label: "Sustained Thermal Envelope",
          value: "Up to 260W Combined CPU + GPU TGP with Zero Thermal Throttling",
        },
        {
          label: "Keyboard Surface Temp",
          value: "Iso-Thermal Airflow Barrier Keeps WASD / Palm Rest < 33°C",
        },
      ],
    },
    {
      id: "ports-connectivity",
      code: "SECTION 04 // I/O & WIRELESS",
      title: "Ports & Connectivity",
      subtitle:
        "Thunderbolt 5 / USB4, HDMI 2.1, SD Express 8.0, 3.5mm Hi-Fi DAC, Wi-Fi 7 & BT 5.4",
      icon: Cable,
      metrics: [
        {
          label: "High-Speed Expansion",
          value: "2x Thunderbolt 5 / USB4 v2 (120Gbps Bandwidth, DisplayPort 2.1)",
          highlight: true,
        },
        {
          label: "Video & Media I/O",
          value: "1x HDMI 2.1b (8K 60Hz / 4K 240Hz) • SD Express 8.0 Card Reader",
        },
        {
          label: "Configured Chassis Ports",
          value: product.specs.ports.join(" • "),
        },
        {
          label: "Reference Analog Audio",
          value: "3.5mm Hi-Fi ESS Sabre 32-Bit/384kHz DAC Jack (Up to 600Ω Studio Headphones)",
        },
        {
          label: "Wireless Networking",
          value: "Tri-Band Wi-Fi 7 (802.11be, 320MHz Channels, 5.8Gbps Peak)",
          highlight: true,
        },
        {
          label: "Bluetooth & Power",
          value: `Bluetooth 5.4 Ultra-Low Latency LE Audio • ${product.specs.rapidCharge ?? "280W GaN MagCharge"}`,
        },
      ],
    },
    {
      id: "audio-biometrics",
      code: "SECTION 05 // ACOUSTICS & SECURITY",
      title: "Audio & Biometrics",
      subtitle:
        "6-speaker spatial audio array, studio mic array & 1080p IR Face Unlock",
      icon: Volume2,
      metrics: [
        {
          label: "Speaker Architecture",
          value: "6-Speaker Force-Cancelling Woofer + Titanium Dome Tweeter Array",
          highlight: true,
        },
        {
          label: "Spatial Audio Processing",
          value: "Dolby Atmos 3D Spatial Soundstage with Head-Tracking Support",
        },
        {
          label: "Studio Microphone Array",
          value: "3-Mic Beamforming Studio Array with Neural Voice Isolation (112dB SNR)",
        },
        {
          label: "Camera & Biometrics",
          value: "1080p 60fps FHD + Windows Hello / TK-OS Secure IR Face Unlock",
          highlight: true,
        },
        {
          label: "Cryptographic Security",
          value: "Dedicated TK Titan-Sec Vault Enclave + Ultrasonic Power Key Touch ID",
        },
        {
          label: "Battery & Chassis Mass",
          value: `${product.specs.battery} • ${product.specs.weight}`,
        },
      ],
    },
  ];

  const [expandedIds, setExpandedIds] = useState<string[]>(
    sections.map((s) => s.id)
  );

  const toggleSection = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => setExpandedIds(sections.map((s) => s.id));
  const collapseAll = () => setExpandedIds([]);

  return (
    <section
      aria-label="Technical Specification Matrix"
      className="mt-20 pt-16 border-t border-[#1f2232]"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <Badge variant="cyan" className="mb-4">
            ARCHITECTURAL BLUEPRINT // FULL TELEMETRY
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#f8fafc]">
            Technical Specification{" "}
            <span className="bg-gradient-to-r from-[#f8fafc] via-[#00f0ff] to-[#3b82f6] bg-clip-text text-transparent">
              Matrix
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#94a3b8]">
            Verified hardware tolerances and subsystem schematics for{" "}
            <span className="text-[#f8fafc] font-medium">{product.name}</span>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-end">
          <button
            type="button"
            onClick={expandAll}
            className="rounded-xl bg-[#0d0e15] border border-[#1f2232] px-3.5 py-2 font-mono text-xs text-[#94a3b8] hover:border-[#00f0ff]/40 hover:text-[#00f0ff] transition-colors cursor-pointer"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="rounded-xl bg-[#0d0e15] border border-[#1f2232] px-3.5 py-2 font-mono text-xs text-[#94a3b8] hover:border-[#00f0ff]/40 hover:text-[#00f0ff] transition-colors cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Expandable 5-Section Spec Accordion Grid */}
      <div className="space-y-4">
        {sections.map((section) => {
          const IconComponent = section.icon;
          const isOpen = expandedIds.includes(section.id);

          return (
            <div
              key={section.id}
              className="overflow-hidden rounded-2xl bg-[#0d0e15] border border-[#1f2232] transition-colors hover:border-white/15"
            >
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#050507] border border-[#00f0ff]/35 text-[#00f0ff] shadow-[0_0_20px_-5px_rgba(0,240,255,0.3)]">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#00f0ff]">
                      {section.code}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#f8fafc]">
                      {section.title}
                    </h3>
                    <p className="text-xs text-[#94a3b8] mt-0.5">
                      {section.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#050507] border border-[#1f2232] text-[#94a3b8]">
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-[#00f0ff]" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-[#1f2232] bg-[#050507]/60 p-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {section.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl bg-[#0d0e15] border border-[#1f2232] p-4"
                      >
                        <div className="font-mono text-[10px] uppercase tracking-wider text-[#94a3b8]">
                          {m.label}
                        </div>
                        <div
                          className={
                            m.highlight
                              ? "mt-1.5 text-xs sm:text-sm font-semibold text-[#00f0ff]"
                              : "mt-1.5 text-xs sm:text-sm font-medium text-[#f8fafc]"
                          }
                        >
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TechSpecMatrix;
