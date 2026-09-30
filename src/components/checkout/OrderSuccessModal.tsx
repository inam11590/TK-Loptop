"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Download,
  Home,
  Truck,
  ShieldCheck,
  Check,
} from "lucide-react";
import type { CartItem } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";

export interface OrderSuccessModalProps {
  isOpen: boolean;
  orderNumber?: string;
  purchasedItems: CartItem[];
  totalCharged: number;
  deliveryMethodLabel: string;
  customerEmail: string;
  onReturnHome: () => void;
}

export function OrderSuccessModal({
  isOpen,
  orderNumber = "TK-94821",
  purchasedItems,
  totalCharged,
  deliveryMethodLabel,
  customerEmail,
  onReturnHome,
}: OrderSuccessModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [downloaded, setDownloaded] = useState(false);

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

  const handleDownloadInvoice = () => {
    const lines = [
      "============================================================",
      `TK LAPTOP INC. — OFFICIAL TECHNICAL SPEC SHEET & INVOICE`,
      `ORDER REFERENCE: #${orderNumber}`,
      `DATE: ${new Date().toISOString().slice(0, 10)}`,
      `RECIPIENT: ${customerEmail || "Valued TK Engineer"}`,
      `COURIER: ${deliveryMethodLabel}`,
      "============================================================",
      "",
      "ALLOCATED HARDWARE BUILDS:",
      ...purchasedItems.map(
        (item, idx) =>
          `${idx + 1}. ${item.name} (Qty: ${item.quantity}) — $${(
            item.totalPrice * item.quantity
          ).toLocaleString("en-US")} USD\n   Specs: ${
            item.configuredSpecs.processor
          } | ${item.configuredSpecs.ram} | ${item.configuredSpecs.storage} | ${
            item.configuredSpecs.display
          } | ${item.configuredSpecs.warranty}`
      ),
      "",
      "------------------------------------------------------------",
      `TOTAL AUTHORIZED (USD): $${totalCharged.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      "ESTIMATED DISPATCH: Estimated delivery in 48 hours via TK Express",
      "============================================================",
    ];

    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `TK-Invoice-${orderNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
  };

  const handleCompleteReturnHome = () => {
    dialogRef.current?.close();
    onReturnHome();
    router.push("/");
  };

  return (
    <dialog
      ref={dialogRef}
      closedby="none"
      aria-labelledby="order-confirmed-title"
      className="m-auto w-full max-w-2xl rounded-3xl bg-[#08090f] border border-[#00f0ff]/50 text-[#f8fafc] p-0 shadow-[0_25px_95px_-10px_rgba(0,240,255,0.4)] backdrop:bg-black/85 backdrop:backdrop-blur-md open:flex open:flex-col overflow-hidden"
    >
      {/* Top Cyber Cyan Glow Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#3b82f6] via-[#00f0ff] to-emerald-400" />

      <div className="p-6 sm:p-8 space-y-6 max-h-[88vh] overflow-y-auto">
        {/* Glowing Cyan Checkmark & Transaction Header */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-[#00f0ff]/15 border-2 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_40px_rgba(0,240,255,0.5)] mb-5"
          >
            <CheckCircle2 className="h-10 w-10" />
          </motion.div>

          <span className="rounded-full bg-[#00f0ff]/15 border border-[#00f0ff]/40 px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#00f0ff]">
            TRANSACTION CONFIRMED // ORDER #{orderNumber}
          </span>

          <h2
            id="order-confirmed-title"
            className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-[#f8fafc]"
          >
            Foundry Allocation Locked
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-[#94a3b8] max-w-md">
            Your custom hardware build has been queued at the TK Precision
            Foundry. Telemetry and tracking credentials have been dispatched to{" "}
            <span className="text-[#f8fafc] font-medium">
              {customerEmail || "your registered email"}
            </span>
            .
          </p>
        </div>

        {/* Delivery Timeline Banner */}
        <div className="flex items-center gap-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/35 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
            <Truck className="h-5 w-5" />
          </div>
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              PRIORITY LOGISTICS ACTIVE
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#f8fafc]">
              Estimated delivery in 48 hours via TK Express
            </div>
            <div className="font-mono text-[11px] text-[#94a3b8]">
              Method: {deliveryMethodLabel}
            </div>
          </div>
        </div>

        {/* Summary of Purchased Machines */}
        <div className="rounded-2xl bg-[#0d0e15] border border-[#1f2232] p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#1f2232] pb-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
              ALLOCATED MACHINES ({purchasedItems.length})
            </span>
            <span className="font-mono text-xs font-bold text-[#00f0ff]">
              TOTAL PAID: $
              {totalCharged.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              USD
            </span>
          </div>

          <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
            {purchasedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-[#050507] border border-white/[0.06] p-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={56}
                    height={40}
                    className="h-10 w-14 rounded-lg object-cover border border-white/10 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-[#f8fafc] truncate">
                      {item.name}{" "}
                      <span className="font-mono text-xs text-[#00f0ff]">
                        ×{item.quantity}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] text-[#94a3b8] truncate">
                      {item.configuredSpecs.ram} • {item.configuredSpecs.storage}{" "}
                      • {item.configuredSpecs.warranty}
                    </div>
                  </div>
                </div>
                <div className="font-mono text-xs font-bold text-[#f8fafc] shrink-0">
                  ${(item.totalPrice * item.quantity).toLocaleString("en-US")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={handleDownloadInvoice}
            leftIcon={
              downloaded ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Download className="h-4 w-4 text-[#00f0ff]" />
              )
            }
          >
            {downloaded
              ? "Spec Sheet & Invoice Downloaded"
              : "Download Technical Spec Sheet & Invoice (PDF)"}
          </Button>

          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={handleCompleteReturnHome}
            leftIcon={<Home className="h-4 w-4" />}
          >
            Return to Homepage
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-[#94a3b8]">
          <ShieldCheck className="h-3.5 w-3.5 text-[#00f0ff]" />
          <span>
            Backed by TK 30-Day Zero-Dead-Pixel & Worldwide Courier Insurance
          </span>
        </div>
      </div>
    </dialog>
  );
}

export default OrderSuccessModal;
