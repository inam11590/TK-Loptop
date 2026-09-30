'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const WA_ACTUAL_NUMBER = '923159255165';
const WA_DISPLAY_NUMBER = '0300-0000000';

export function CartDrawer() {
  const { isCartOpen, closeCart, items, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  if (!isCartOpen) return null;

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    let message = `*NEW ORDER - TK STORE*\n`;
    message += `-----------------------------\n`;
    items.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}* (x${item.quantity})\n`;
      message += `   • Price: $${item.totalPrice * item.quantity}\n`;
      if (item.configuredSpecs) {
        if (item.configuredSpecs.processor) message += `   • Spec: ${item.configuredSpecs.processor}\n`;
        if (item.configuredSpecs.ram) message += `   • Detail: ${item.configuredSpecs.ram}\n`;
      }
      message += `\n`;
    });
    message += `-----------------------------\n`;
    message += `*TOTAL AMOUNT:* $${subtotal.toLocaleString()}\n\n`;
    message += `Please confirm stock availability and payment instructions.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WA_ACTUAL_NUMBER}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={closeCart}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0b12] border-l border-white/[0.08] p-6 flex flex-col h-full shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white tracking-wide">YOUR HARDWARE BAG</h2>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                {totalItems}
              </span>
            </div>
            <button 
              onClick={closeCart}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="h-16 w-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Your bag is empty</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Explore our Dell, HP flagship fleet or private reserve perfumes.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-200 border border-white/10 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
                >
                  <div className="relative h-18 w-18 flex-shrink-0 overflow-hidden rounded-xl bg-black border border-white/10">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] font-mono text-cyan-400 mt-0.5">
                      ${item.totalPrice.toLocaleString()}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-0.5 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono px-1.5 text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-0.5 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-xs font-bold text-white">
                        ${(item.totalPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="pt-4 border-t border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Subtotal</span>
                <span className="text-lg font-bold text-white font-mono">${subtotal.toLocaleString()}</span>
              </div>

              {/* Direct WhatsApp Order Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Instant Order via WhatsApp</span>
              </button>

              <div className="text-center">
                <span className="text-[10px] font-mono text-slate-500">
                  WhatsApp Support Desk: <span className="text-emerald-400 font-semibold">{WA_DISPLAY_NUMBER}</span>
                </span>
              </div>

              {/* Web Checkout Link */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                <span>Proceed to Card Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
