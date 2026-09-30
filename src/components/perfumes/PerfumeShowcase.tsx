'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Droplet } from 'lucide-react';
import { getAllPerfumes } from '@/data/perfumes';
import PerfumeCard from './PerfumeCard';

export function PerfumeShowcase() {
  const perfumes = getAllPerfumes();

  return (
    <section id="perfumes" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-amber-50/30 to-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>TK Haute Parfumerie // Private Reserve</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Artisan Scent Formulations
          </h2>
          
          <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
            Crafted with natural aged agarwood, French lavender, and concentrated perfume oils. Designed for all-day 18+ hour sillage.
          </p>
        </div>

        {/* Perfume Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {perfumes.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>

        {/* Assurance Bar */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl bg-white border border-amber-200 p-5 text-center shadow-sm">
          <div className="flex flex-col items-center gap-1.5">
            <Droplet className="w-5 h-5 text-amber-600" />
            <span className="text-xs font-bold text-gray-900">Extrait Concentration</span>
            <span className="text-[11px] text-gray-500">Up to 30% oil concentration for high projection</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 border-y sm:border-y-0 sm:border-x border-gray-200 py-3 sm:py-0">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span className="text-xs font-bold text-gray-900">100% Rare Natural Sourcing</span>
            <span className="text-[11px] text-gray-500">Cambodian Agarwood, Bourbon Vanilla & Vetiver</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <span className="text-xs font-bold text-gray-900">Verified Flacon Batch</span>
            <span className="text-[11px] text-gray-500">Shipped in temperature-controlled packaging</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default PerfumeShowcase;
