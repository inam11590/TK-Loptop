'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, ArrowRight, MessageCircle, Laptop, Sparkles } from 'lucide-react';

const WA_ACTUAL_NUMBER = '923159255165';
const WA_DISPLAY_NUMBER = '0300-0000000';

export default function Hero() {
  const handleWhatsApp = () => {
    const text = encodeURIComponent('Hello TK Store, I am inquiring about available Dell & HP laptops and TK Perfumes.');
    window.open(`https://wa.me/${WA_ACTUAL_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="bg-white border-b border-gray-200">
      
      {/* Main Hero Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 text-gray-800 text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Authorized Dell & HP Inventory • Genuine TK Fragrances</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            Direct Flagship Laptops & <span className="text-orange-600">Luxury Perfumes</span>
          </h1>

          <p className="text-base text-gray-600 leading-relaxed mb-8">
            Factory-sealed Dell XPS, Alienware, and HP Spectre machines with verified warranties, paired with our private reserve of cold-matured extrait perfumes.
          </p>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors shadow-sm"
            >
              <span>Explore 20 Laptop Models</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Inquiries ({WA_DISPLAY_NUMBER})</span>
            </button>

            <Link
              href="/#perfumes"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>View Fragrances (from $220)</span>
            </Link>
          </div>

          {/* Key Guarantees */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-6 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Factory Sealed Box
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-orange-600" /> Insured Courier Dispatch
            </span>
            <span>•</span>
            <span>Zero-Dead-Pixel Guarantee</span>
          </div>

        </div>
      </div>

      {/* Quick Category Jump Strip */}
      <div className="bg-gray-50 border-t border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-gray-700">
          <span className="text-gray-400 font-normal">Quick Jump:</span>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <Link href="/catalog?brand=Dell" className="flex items-center gap-1.5 hover:text-orange-600">
              <Laptop className="w-3.5 h-3.5 text-gray-500" /> Dell Fleet (10 Models)
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/catalog?brand=HP" className="flex items-center gap-1.5 hover:text-orange-600">
              <Laptop className="w-3.5 h-3.5 text-gray-500" /> HP Fleet (10 Models)
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/#laptops" className="flex items-center gap-1.5 hover:text-gray-900 text-gray-500">
              MacBook (VIP Waitlist)
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/#perfumes" className="flex items-center gap-1.5 text-amber-700 hover:text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> TK Perfumes (3 Scents)
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}

export { Hero };
