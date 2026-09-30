'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Truck, ArrowRight, MessageCircle, Sparkles, Star } from 'lucide-react';

const WA_ACTUAL_NUMBER = '923159255165';

export function Hero() {
  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent('Hello TK Store, I am inquiring about current stock and pricing for Dell & HP laptops.');
    window.open(`https://wa.me/${WA_ACTUAL_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 border-b border-gray-200 py-12 lg:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text / Value Proposition (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Alibaba-style Verified Supplier Ribbon */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-orange-600" />
              <span>Verified Hardware Importer • Dell & HP Authorized Stock</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight">
              Premium Flagship Laptops & <span className="text-orange-600">Haute Parfumerie</span>
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Direct factory-sealed Dell XPS, Alienware, HP Spectre & Omen workstations. Paired exclusively with our artisan private-reserve TK Perfumes.
            </p>

            {/* Commercial Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <span>Browse Dell & HP Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={handleWhatsAppInquiry}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Instant WhatsApp Order</span>
              </button>

              <Link
                href="/#perfumes"
                className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm border border-gray-300 transition-all shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>TK Perfumes (from $220)</span>
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-4 border-t border-gray-200 grid grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <Truck className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <span>Express Courier Dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <span>100% Genuine Box Sealed</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <Star className="w-4 h-4 text-orange-600 fill-orange-500 flex-shrink-0" />
                <span>VIP Concierge Support</span>
              </div>
            </div>

          </div>

          {/* Right Product Showcase Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white p-5 border border-gray-200 shadow-xl">
              
              {/* Product Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-orange-600 text-white px-2.5 py-0.5 rounded">
                  TODAY'S FLAGSHIP DEAL
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Ready to Dispatch
                </span>
              </div>

              {/* Main Image */}
              <div className="relative h-60 w-full overflow-hidden rounded-xl bg-gray-100 mb-4 border border-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80"
                  alt="Dell XPS 16"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Mini Info */}
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">
                  Dell XPS 16 (9640) Touch OLED
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Intel Core Ultra 9 • 32GB RAM • 1TB SSD • RTX 4070
                </p>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block font-medium">Direct Unit Price</span>
                    <span className="text-2xl font-black text-orange-600">$2,499</span>
                  </div>

                  <Link
                    href="/catalog/dell-xps-16"
                    className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors"
                  >
                    View Specs
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
