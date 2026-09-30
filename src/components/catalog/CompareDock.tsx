"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCompare, X, Trash2, Sparkles } from "lucide-react";
import type { LaptopProduct } from "@/types/product";
import { Button } from "@/components/ui/Button";

export interface CompareDockProps {
  selectedLaptops: LaptopProduct[];
  onRemoveLaptop: (id: string) => void;
  onClearAll: () => void;
  onOpenModal: () => void;
}

export function CompareDock({
  selectedLaptops,
  onRemoveLaptop,
  onClearAll,
  onOpenModal,
}: CompareDockProps) {
  return (
    <AnimatePresence>
      {selectedLaptops.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          role="region"
          aria-label="Side-by-Side Laptop Comparison Dock"
          className="fixed bottom-6 inset-x-0 z-40 mx-auto max-w-5xl px-4"
        >
          <div className="rounded-2xl bg-[#0d0e15]/95 border border-[#00f0ff]/50 p-3.5 sm:p-4 backdrop-blur-2xl shadow-[0_20px_60px_-10px_rgba(0,240,255,0.3)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Selected Laptop Slots (Up to 3) */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0">
                <div className="hidden sm:flex items-center gap-2 pr-2 border-r border-[#1f2232] shrink-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00f0ff]/15 border border-[#00f0ff]/40 text-[#00f0ff]">
                    <GitCompare className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[#00f0ff]">
                      COMPARE MATRIX
                    </div>
                    <div className="text-xs font-semibold text-[#f8fafc]">
                      {selectedLaptops.length} of 3 Selected
                    </div>
                  </div>
                </div>

                {selectedLaptops.map((laptop) => (
                  <div
                    key={laptop.id}
                    className="flex items-center gap-2.5 rounded-xl bg-[#050507] border border-[#1f2232] pl-2 pr-2.5 py-1.5 shrink-0"
                  >
                    <img
                      src={laptop.featuredImage}
                      alt={laptop.name}
                      width={44}
                      height={28}
                      className="h-7 w-11 rounded-md object-cover border border-white/10"
                    />
                    <div className="max-w-[130px] sm:max-w-[160px]">
                      <div className="text-xs font-semibold text-[#f8fafc] truncate">
                        {laptop.name}
                      </div>
                      <div className="font-mono text-[10px] text-[#00f0ff]">
                        ${laptop.basePrice.toLocaleString("en-US")}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveLaptop(laptop.id)}
                      aria-label={`Remove ${laptop.name} from comparison`}
                      className="rounded-md p-1 text-[#94a3b8] hover:bg-white/10 hover:text-[#f8fafc] transition-colors cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}

                {/* Empty Slot Placeholders */}
                {Array.from({ length: 3 - selectedLaptops.length }).map(
                  (_, idx) => (
                    <div
                      key={`empty-slot-${idx}`}
                      className="hidden lg:flex h-11 w-40 items-center justify-center rounded-xl border border-dashed border-[#1f2232] font-mono text-[10px] text-[#94a3b8]/60 shrink-0"
                    >
                      + Select Machine {selectedLaptops.length + idx + 1}
                    </div>
                  )
                )}
              </div>

              {/* Action Controls */}
              <div className="flex items-center justify-end gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={onClearAll}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#050507] border border-[#1f2232] px-3 py-2.5 font-mono text-xs font-medium text-[#94a3b8] hover:border-white/25 hover:text-[#f8fafc] transition-colors cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear</span>
                </button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={onOpenModal}
                  leftIcon={<Sparkles className="h-3.5 w-3.5" />}
                  className="h-10 px-4 text-xs"
                >
                  Launch Side-by-Side Comparison
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CompareDock;
