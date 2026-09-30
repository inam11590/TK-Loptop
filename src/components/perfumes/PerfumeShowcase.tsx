'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Droplet } from 'lucide-react';
import { getAllPerfumes } from '@/data/perfumes';
import PerfumeCard from './PerfumeCard';

export default function PerfumeShowcase() {
  const perfumes = getAllPerfumes();

  return (
    <section id="perfumes" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#040508] overflow-hidden border-t border-amber-500/20">
      
      {/* Ambient Scent Glow Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4 shadow-[0_0_15px_-4px_rgba(245,158,11,0.3)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TK Haute Parfumerie // Private Reserve</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            The Olfactive Signature of <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">Power & Prestige</span>
          </h2>
          
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Engineered with rare natural extracts, aged agarwood, and high-concentration oils. A sensory counterpart to modern executive computing.
          </p>
        </div>

        {/* Perfume Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {perfumes.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>

        {/* Quality Guarantees Bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 rounded-2xl bg-white/[0.02] border border-amber-500/15 p-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Droplet className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold text-slate-200">Parfum Extrait Concentration</span>
            <span className="text-xs text-slate-400">Up to 30% fragrance oils for all-day 18hr projection</span>
          </div>
          <div className="flex flex-col items-center gap-2 border-y sm:border-y-0 sm:border-x border-white/[0.08] py-4 sm:py-0">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold text-slate-200">Rare Natural Sourcing</span>
            <span className="text-xs text-slate-400">Authentic Cambodian Oud, French Lavender & Haitian Vetiver</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold text-slate-200">Complimentary Courier Dispatch</span>
            <span className="text-xs text-slate-400">Shipped in temperature-controlled protective cases</span>
          </div>
        </div>

      </div>
    </section>
  );
}
