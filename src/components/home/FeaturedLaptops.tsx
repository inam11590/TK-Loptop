'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LAPTOP_PRODUCTS } from '@/data/products';
import { Cpu, Eye, HardDrive, ArrowRight, ShieldCheck } from 'lucide-react';

export default function FeaturedLaptops() {
  const [selectedBrand, setSelectedBrand] = useState<'All' | 'Dell' | 'HP'>('All');

  const filteredLaptops = selectedBrand === 'All' 
    ? LAPTOP_PRODUCTS 
    : LAPTOP_PRODUCTS.filter(l => l.brand === selectedBrand);

  return (
    <section id="laptops" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050507]">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-wider uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authorized Flagship Hardware</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Dell & HP Performance Fleet
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Precision-curated Dell XPS, Alienware, HP Spectre, and OMEN flagship workstations with verified warranty and express courier dispatch.
            </p>
          </div>

          {/* Brand Filter Tabs */}
          <div className="flex items-center gap-2 bg-white/[0.03] p-1.5 rounded-xl border border-white/[0.08] self-start md:self-auto">
            {(['All', 'Dell', 'HP'] as const).map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  selectedBrand === brand
                    ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {brand === 'All' ? 'All Hardware' : `${brand} Machines`}
              </button>
            ))}
          </div>
        </div>

        {/* Laptops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredLaptops.map((laptop) => (
            <div
              key={laptop.id}
              className="group relative flex flex-col rounded-3xl bg-[#0b0c13] border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-500 p-6 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.2)]"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-semibold tracking-wider px-3 py-1 rounded-full bg-white/[0.05] text-cyan-300 border border-white/10">
                  {laptop.brand.toUpperCase()} // {laptop.series}
                </span>
                {laptop.badge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-cyan-400 px-2.5 py-0.5 rounded-full">
                    {laptop.badge}
                  </span>
                )}
              </div>

              {/* Laptop Image */}
              <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-[#07080d] mb-6">
                <Image
                  src={laptop.images[0]}
                  alt={laptop.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c13] via-transparent to-transparent opacity-60" />
              </div>

              {/* Title & Tagline */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {laptop.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {laptop.tagline}
                </p>
              </div>

              {/* Spec HUD Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <Cpu className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-slate-300 truncate">{laptop.specs.processor.split('(')[0]}</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <Eye className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-slate-300 truncate">{laptop.specs.graphics.split(' ')[0]} {laptop.specs.graphics.split(' ')[1]}</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <HardDrive className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-slate-300 truncate">{laptop.specs.memory.split(' ')[0]} RAM</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-cyan-400 font-bold ml-1">SSD</span>
                  <span className="text-slate-300 truncate">{laptop.specs.storage.split(' ')[0]} Gen4</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-auto flex items-center justify-between pt-5 border-t border-white/[0.08]">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Starting From</span>
                  <span className="text-2xl font-extrabold text-white">${laptop.basePrice.toLocaleString()}</span>
                </div>

                <Link
                  href={`/catalog/${laptop.slug}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-400 text-black font-semibold text-xs hover:bg-cyan-300 hover:shadow-[0_0_20px_-3px_rgba(0,240,255,0.6)] transition-all duration-300"
                >
                  <span>Configure & Buy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
