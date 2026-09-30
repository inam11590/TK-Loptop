"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    totalItems,
    lastAddedToast,
    clearToast,
  } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  const handleProceedToCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
          className="fixed inset-0 z-50 flex justify-end"
        >
          {/* Smooth Darkened Backdrop with backdrop-blur-md */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Slide-in Drawer Panel from Right Edge */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-[#0a0b12] border-l border-white/[0.08] p-6 flex flex-col h-full z-50 shadow-[-20px_0_70px_rgba(0,0,0,0.85)]"
          >
            {/* Top Cyber Cyan Accent Line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/60 to-transparent"
            />

            {/* Header: "YOUR HARDWARE BAG" + Item Counter + Close Button (X) */}
            <div className="flex items-center justify-between pb-5 border-b border-[#1f2232]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d0e15] border border-[#00f0ff]/40 text-[#00f0ff] shadow-[0_0_20px_-4px_rgba(0,240,255,0.3)]">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2
                      id="cart-drawer-title"
                      className="font-mono text-sm font-extrabold uppercase tracking-[0.18em] text-[#f8fafc]"
                    >
                      YOUR HARDWARE BAG
                    </h2>
                    <span className="rounded-full bg-[#00f0ff] px-2 py-0.5 font-mono text-[10px] font-bold text-[#050507]">
                      {totalItems}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-[#94a3b8] uppercase tracking-wider">
                    DIRECT FOUNDRY ALLOCATION
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCart}
                aria-label="Close hardware bag drawer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0d0e15] border border-[#1f2232] text-[#94a3b8] hover:border-[#00f0ff]/50 hover:text-[#00f0ff] transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Confirmation Toast when Item Added */}
            <AnimatePresence>
              {lastAddedToast && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 flex items-center justify-between gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/35 px-3.5 py-2.5 text-xs text-emerald-300"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="truncate font-medium">
                      {lastAddedToast}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={clearToast}
                    aria-label="Dismiss notification"
                    className="text-emerald-300/70 hover:text-emerald-200 shrink-0"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Drawer Body: Empty State vs Populated Item List */}
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center text-center py-12 px-4">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-[#0d0e15] border border-[#1f2232] text-[#94a3b8] shadow-[0_0_35px_-8px_rgba(0,240,255,0.2)] mb-6">
                  <Cpu className="h-9 w-9 text-[#00f0ff]/80" />
                </div>

                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#00f0ff]">
                  ZERO ALLOCATIONS
                </span>

                <h3 className="mt-2 text-xl font-bold text-[#f8fafc]">
                  Your bag is currently empty
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#94a3b8] max-w-xs leading-relaxed">
                  Configure a flagship Titan AI workstation, Stealth Blade
                  gaming rig, or Air Carbon ultraportable to begin.
                </p>

                <Link
                  href="/catalog"
                  onClick={closeCart}
                  className="mt-7 w-full max-w-xs"
                >
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Explore TK Fleet
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                  {items.map((item) => {
                    const lineTotal = item.totalPrice * item.quantity;
                    return (
                      <div
                        key={item.id}
                        className="rounded-2xl bg-[#0d0e15] border border-[#1f2232] p-4 transition-colors hover:border-[#00f0ff]/35"
                      >
                        <div className="flex gap-3.5">
                          {/* Thumbnail with Dark Frame and Subtle Cyan Backlight */}
                          <Link
                            href={`/catalog/${item.slug}`}
                            onClick={closeCart}
                            className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-[#050507] border border-white/10 shadow-[0_0_18px_-4px_rgba(0,240,255,0.3)]"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              width={120}
                              height={90}
                              className="h-full w-full object-cover"
                            />
                          </Link>

                          {/* Item Details & Custom Spec Summary Pills */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <Link
                                href={`/catalog/${item.slug}`}
                                onClick={closeCart}
                                className="text-sm font-bold text-[#f8fafc] hover:text-[#00f0ff] transition-colors truncate"
                              >
                                {item.name}
                              </Link>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                aria-label={`Remove ${item.name} from bag`}
                                className="text-[#94a3b8] hover:text-rose-400 transition-colors p-0.5 cursor-pointer shrink-0"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            {/* Spec Summary Pills */}
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              <span className="rounded-md bg-[#050507] border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-[#00f0ff]">
                                {item.configuredSpecs.ram}
                              </span>
                              <span className="rounded-md bg-[#050507] border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-[#f8fafc]">
                                {item.configuredSpecs.storage}
                              </span>
                              <span className="rounded-md bg-[#050507] border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-[#94a3b8]">
                                {item.configuredSpecs.display}
                              </span>
                              <span className="rounded-md bg-[#050507] border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-emerald-400">
                                {item.configuredSpecs.warranty}
                              </span>
                            </div>

                            <div className="mt-1 font-mono text-[10px] text-[#94a3b8] truncate">
                              {item.configuredSpecs.processor}
                            </div>
                          </div>
                        </div>

                        {/* Quantity Stepper (- / +) & Item Price */}
                        <div className="mt-3.5 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                          <div className="inline-flex items-center rounded-xl bg-[#050507] border border-[#1f2232] p-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              aria-label="Decrease quantity"
                              className="flex h-7 w-7 items-center justify-center rounded-lg text-[#94a3b8] hover:bg-white/10 hover:text-[#f8fafc] transition-colors cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span
                              aria-live="polite"
                              className="px-3 font-mono text-xs font-bold text-[#f8fafc]"
                            >
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              aria-label="Increase quantity"
                              className="flex h-7 w-7 items-center justify-center rounded-lg text-[#94a3b8] hover:bg-white/10 hover:text-[#f8fafc] transition-colors cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-sm font-extrabold text-[#f8fafc]">
                              ${lineTotal.toLocaleString("en-US")}{" "}
                              <span className="font-mono text-[10px] font-normal text-[#94a3b8]">
                                USD
                              </span>
                            </div>
                            {item.quantity > 1 && (
                              <div className="font-mono text-[10px] text-[#94a3b8]">
                                ${item.totalPrice.toLocaleString("en-US")} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Summary Footer */}
                <div className="pt-4 border-t border-[#1f2232] space-y-4">
                  {/* Complimentary Courier Shipping Indicator */}
                  <div className="flex items-center justify-between rounded-xl bg-[#050507] border border-emerald-500/25 px-3.5 py-2.5 text-xs">
                    <span className="inline-flex items-center gap-2 text-emerald-400 font-medium">
                      <Truck className="h-4 w-4 shrink-0" />
                      <span>TK Priority Air Courier</span>
                    </span>
                    <span className="font-mono text-[11px] font-bold text-emerald-400">
                      COMPLIMENTARY
                    </span>
                  </div>

                  {/* Subtotal Row */}
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-[#94a3b8]">
                        ESTIMATED SUBTOTAL
                      </span>
                      <p className="text-[11px] text-[#94a3b8]">
                        Taxes calculated at checkout
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-[#f8fafc]">
                        ${subtotal.toLocaleString("en-US")}
                      </span>
                      <span className="ml-1 font-mono text-xs text-[#94a3b8]">
                        USD
                      </span>
                    </div>
                  </div>

                  {/* Proceed to Secure Checkout Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleProceedToCheckout}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="glow-cyan"
                  >
                    Proceed to Secure Checkout
                  </Button>

                  <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-[#94a3b8]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#00f0ff]" />
                    <span>256-Bit Encrypted • 30-Day Zero-Dead-Pixel Guarantee</span>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
