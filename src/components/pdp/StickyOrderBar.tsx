"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface StickyOrderBarProps {
  visible: boolean;
  modelName: string;
  specsSummary: string;
  totalPrice: number;
  monthlyPrice: number;
  addedCount: number;
  onAddToBag: () => void;
}

export function StickyOrderBar({
  visible,
  modelName,
  specsSummary,
  totalPrice,
  monthlyPrice,
  addedCount,
  onAddToBag,
}: StickyOrderBarProps) {
  const [pulseBag, setPulseBag] = useState(false);

  const handleAdd = () => {
    onAddToBag();
    setPulseBag(true);
    setTimeout(() => setPulseBag(false), 1200);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 70 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          role="region"
          aria-label="Sticky Configuration Order Bar"
          className="fixed bottom-4 inset-x-0 z-40 mx-auto max-w-6xl px-4"
        >
          <div className="rounded-2xl bg-[#0d0e15]/95 border border-[#00f0ff]/45 px-4 py-3.5 sm:px-6 backdrop-blur-2xl shadow-[0_20px_60px_-10px_rgba(0,240,255,0.32)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
              {/* Model Name & Selected Specs Summary */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00f0ff]/15 border border-[#00f0ff]/40 text-[#00f0ff]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-extrabold text-[#f8fafc] truncate">
                      {modelName}
                    </span>
                    <span className="hidden sm:inline-block rounded-full bg-emerald-500/15 border border-emerald-500/35 px-2 py-0.5 font-mono text-[9px] font-semibold text-emerald-400">
                      SHIPS 24–48H
                    </span>
                  </div>
                  <div className="font-mono text-xs text-[#00f0ff] truncate">
                    {specsSummary}
                  </div>
                </div>
              </div>

              {/* Live Recalculated Price & Glowing Cyan Add to Bag CTA */}
              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                <div className="text-left sm:text-right">
                  <div className="text-lg sm:text-xl font-black text-[#f8fafc]">
                    ${totalPrice.toLocaleString("en-US")}{" "}
                    <span className="font-mono text-[10px] font-normal text-[#94a3b8]">
                      USD
                    </span>
                  </div>
                  <div className="font-mono text-[10px] text-[#94a3b8]">
                    or ${monthlyPrice}/mo for 24 mos
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleAdd}
                  leftIcon={
                    pulseBag ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <ShoppingBag className="h-4 w-4" />
                    )
                  }
                  rightIcon={
                    <motion.span
                      key={addedCount}
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 18 }}
                      className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#050507] px-1.5 font-mono text-[10px] font-bold text-[#00f0ff]"
                    >
                      {addedCount}
                    </motion.span>
                  }
                >
                  {pulseBag ? "Added" : "Add to Bag"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default StickyOrderBar;
