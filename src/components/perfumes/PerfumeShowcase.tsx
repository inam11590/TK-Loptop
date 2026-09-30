'use client';

import React from 'react';
import { getAllPerfumes } from '@/data/perfumes';
import PerfumeCard from './PerfumeCard';
import { Sparkles, ShieldCheck, Droplet, Clock } from 'lucide-react';

export default function PerfumeShowcase() {
  const perfumes = getAllPerfumes();

  return (
    <section id="perfumes" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TK Haute Parfumerie // Private Reserve</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Artisan Fragrance Collection
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              High-concentration extraits and eau de parfums crafted with natural oils and aged agarwood.
            </p>
          </div>

          <div className="text-xs text-gray-500 font-semibold self-start sm:self-auto">
            100ml / 3.4 fl. oz. Bottles • Tamper-Sealed Packaging
          </div>
        </div>

        {/* 3 Perfumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {perfumes.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>

        {/* Clean 3-Item Assurance Strip */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100 text-xs text-gray-600">
          <div className="flex items-center gap-2.5">
            <Droplet className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span><strong>High Oil Ratio:</strong> Up to 30% concentration for 18+ hour sillage.</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span><strong>100% Genuine Extracts:</strong> Certified Cambodian Oud & French Lavender.</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span><strong>Dispatched in 24h:</strong> Shock-resistant courier packaging.</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export { PerfumeShowcase };
