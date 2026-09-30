'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ShoppingBag, 
  MessageCircle, 
  Check, 
  Plus, 
  Tag, 
  ArrowRight 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

const WA_ACTUAL_NUMBER = '923159255165';
const WA_DISPLAY_NUMBER = '0300-0000000';

export default function DealOfTheWeek() {
  const [added, setAdded] = useState(false);
  const cart = useCart();

  const laptopPrice = 2499;
  const perfumePrice = 280;
  const originalTotal = laptopPrice + perfumePrice; // $2,779
  const bundleDiscount = 180;
  const bundlePrice = originalTotal - bundleDiscount; // $2,599

  const handleAddBundleToBag = () => {
    try {
      // 1. Add Dell XPS 16
      cart.addItem({
        laptopId: 'dell-xps-16-bundle',
        name: 'Dell XPS 16 (9640) - Executive Bundle Edition',
        slug: 'dell-xps-16',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80',
        basePrice: 2499,
        totalPrice: 2399, // discounted within bundle
        quantity: 1,
        configuredSpecs: {
          processor: 'Intel Core Ultra 9 185H',
          ram: '32GB LPDDR5X',
          storage: '1TB Gen4 SSD',
          display: '16.3" 4K+ OLED Touch',
          warranty: 'Premier On-Site Support'
        }
      });

      // 2. Add TK Royal Oud Noir
      cart.addItem({
        laptopId: 'tk-royal-oud-bundle',
        name: 'TK Royal Oud Noir 100ml - Bundle Tier',
        slug: 'tk-royal-oud-noir',
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
        basePrice: 280,
        totalPrice: 200, // discounted within bundle
        quantity: 1,
        configuredSpecs: {
          processor: 'Parfum Extrait (30% Conc.)',
          ram: '100ml / 3.4 fl. oz.',
          storage: 'Smoky Woody Oriental',
          display: 'Numbered Flacon',
          warranty: 'Authentic Batch Certificate'
        }
      });

      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
      cart.openCart();
    } catch (err) {
      console.error('Error adding bundle:', err);
    }
  };

  const handleWhatsAppBundleOrder = () => {
    let msg = `*DEAL OF THE WEEK - EXECUTIVE BUNDLE ORDER*\n`;
    msg += `------------------------------------\n`;
    msg += `• *Hardware:* Dell XPS 16 (9640) OLED Touch (Intel Ultra 9, 32GB, 1TB SSD, RTX 4070)\n`;
    msg += `• *Fragrance:* TK Royal Oud Noir (100ml Parfum Extrait)\n`;
    msg += `• *Original Total:* $${originalTotal}\n`;
    msg += `• *Bundle Discounted Price:* $${bundlePrice} (Save $${bundleDiscount})\n`;
    msg += `------------------------------------\n`;
    msg += `Please reserve this bundle and share dispatch details.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${WA_ACTUAL_NUMBER}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl">
        
        {/* Deal Card Container */}
        <div className="relative rounded-3xl bg-gradient-to-br from-orange-50/70 via-white to-amber-50/60 border-2 border-orange-200/90 shadow-md p-6 sm:p-10 overflow-hidden">
          
          {/* Subtle Ambient Background Watermark */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-orange-400/5 blur-3xl pointer-events-none" />

          {/* Banner Header Tag & Countdown Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-orange-200/60 mb-8">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600 text-white font-extrabold text-[11px] uppercase tracking-wider shadow-sm">
                <Tag className="w-3.5 h-3.5" />
                <span>Deal of the Week</span>
              </span>
              <span className="text-xs font-bold text-orange-800 bg-orange-100/80 px-2.5 py-1 rounded-full border border-orange-200">
                Executive Pairing No. 01
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <Clock className="w-4 h-4 text-orange-600" />
              <span>Limited Stock Allocation • <strong>Only 4 Bundles Left</strong></span>
            </div>
          </div>

          {/* Main Dual Presentation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* ITEM 1: DELL XPS 16 (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="relative h-44 w-full sm:w-44 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80"
                  alt="Dell XPS 16 Flagship"
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 text-[10px] font-black bg-gray-900 text-white px-2 py-0.5 rounded">
                  DELL FLAGSHIP
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-700 bg-orange-50 inline-block px-2 py-0.5 rounded mb-1">
                  XPS Studio Fleet
                </div>
                <h3 className="text-base font-bold text-gray-900 truncate">Dell XPS 16 (9640)</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  Intel Core Ultra 9 • 32GB RAM • 1TB SSD • RTX 4070 • 4K OLED Touch
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-lg font-black text-gray-900">${laptopPrice.toLocaleString()}</span>
                  <span className="text-xs text-gray-400 font-medium">Single Price</span>
                </div>
              </div>
            </div>

            {/* PLUS ICON CONNECTOR (2 Cols) */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center py-2 lg:py-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-white shadow-md">
                <Plus className="w-6 h-6 stroke-[3]" />
              </div>
              <span className="mt-2 text-xs font-black text-orange-700 uppercase tracking-widest bg-orange-100 px-2 py-0.5 rounded">
                Paired With
              </span>
            </div>

            {/* ITEM 2: TK ROYAL OUD NOIR (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl bg-white border border-amber-200 shadow-sm">
              <div className="relative h-44 w-full sm:w-44 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
                  alt="TK Royal Oud Noir Flacon"
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 text-[10px] font-black bg-amber-700 text-white px-2 py-0.5 rounded">
                  EXTRAIT RESERVE
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 inline-block px-2 py-0.5 rounded mb-1">
                  Haute Parfumerie
                </div>
                <h3 className="text-base font-bold text-gray-900 truncate">TK Royal Oud Noir</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  100ml Parfum Extrait • Aged Cambodian Agarwood, Black Cardamom & Smoky Amber
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-lg font-black text-amber-900">${perfumePrice}</span>
                  <span className="text-xs text-gray-400 font-medium">Single Price</span>
                </div>
              </div>
            </div>

          </div>

          {/* Pricing Summary & Commercial Call to Action */}
          <div className="mt-8 pt-6 border-t border-orange-200/70 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200">
            
            {/* Price Calculations */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 line-through font-semibold">
                  Standard Total: ${originalTotal.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Save ${bundleDiscount} Instantly
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-black text-orange-600">
                  ${bundlePrice.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-gray-600">
                  Full Bundle Deal • Factory Sealed with Certificates
                </span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              
              {/* WhatsApp Quick Order */}
              <button
                onClick={handleWhatsAppBundleOrder}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Order Bundle via WhatsApp ({WA_DISPLAY_NUMBER})</span>
              </button>

              {/* Add Both to Shopping Bag */}
              <button
                onClick={handleAddBundleToBag}
                disabled={added}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs transition-all shadow-sm ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-orange-600 hover:bg-orange-700 text-white hover:shadow'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Bundle Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Both to Bag</span>
                  </>
                )}
              </button>

            </div>

          </div>

          {/* Guarantee Badges Footer */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-[11px] font-semibold text-gray-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Dell Official ProSupport Included
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Authenticated 100ml Extraction Certificate
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Insured White-Glove Courier Dispatch</span>
          </div>

        </div>

      </div>
    </section>
  );
}
