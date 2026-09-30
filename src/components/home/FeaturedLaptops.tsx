'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LAPTOP_PRODUCTS } from '@/data/products';
import { Cpu, Eye, HardDrive, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export function FeaturedLaptops() {
  const [selectedBrand, setSelectedBrand] = useState<'All' | 'Dell' | 'HP'>('All');

  const filteredLaptops = selectedBrand === 'All' 
    ? LAPTOP_PRODUCTS 
    : LAPTOP_PRODUCTS.filter(l => l.brand === selectedBrand);

  return (
    <section id="laptops" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-orange-600 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Tier-1 Computing Fleet</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Dell & HP High-Performance Machines
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Precision-curated hardware with official service tags, on-site warranty, and zero-dead-pixel inspection.
            </p>
          </div>

          {/* Filter Tabs (Alibaba Tab Style) */}
          <div className="flex items-center gap-1.5 bg-gray-200/80 p-1 rounded-xl">
            {(['All', 'Dell', 'HP'] as const).map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedBrand === brand
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {brand === 'All' ? 'All Hardware' : `${brand} Only`}
              </button>
            ))}
          </div>
        </div>

        {/* Laptops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredLaptops.map((laptop) => (
            <div
              key={laptop.id}
              className="group relative flex flex-col rounded-2xl bg-white border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all duration-300 p-6"
            >
              {/* Card Top Label */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200 uppercase tracking-wide">
                  {laptop.brand} // {laptop.series}
                </span>
                {laptop.badge && (
                  <span className="text-[10px] font-black uppercase tracking-wider text-white bg-orange-600 px-2 py-0.5 rounded">
                    {laptop.badge}
                  </span>
                )}
              </div>

              {/* Laptop Photo */}
              <div className="relative h-60 w-full overflow-hidden rounded-xl bg-gray-50 mb-4 border border-gray-100">
                <Image
                  src={laptop.images[0]}
                  alt={laptop.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Title & Tagline */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {laptop.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  {laptop.tagline}
                </p>
              </div>

              {/* Spec HUD Grid */}
              <div className="grid grid-cols-2 gap-2 mb-5 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                  <Cpu className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                  <span className="text-gray-700 truncate font-medium">{laptop.specs.processor.split('(')[0]}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                  <Eye className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                  <span className="text-gray-700 truncate font-medium">{laptop.specs.graphics.split(' ')[0]} {laptop.specs.graphics.split(' ')[1]}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                  <HardDrive className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                  <span className="text-gray-700 truncate font-medium">{laptop.specs.memory.split(' ')[0]} RAM</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                  <span className="text-orange-600 font-bold text-[11px] ml-0.5">SSD</span>
                  <span className="text-gray-700 truncate font-medium">{laptop.specs.storage.split(' ')[0]} Gen4</span>
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-1 mb-5 text-[11px] text-gray-600">
                {laptop.keyFeatures.slice(0, 2).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Price & Commercial Action */}
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Unit Price (FOB)</span>
                  <span className="text-2xl font-black text-orange-600">${laptop.basePrice.toLocaleString()}</span>
                </div>

                <Link
                  href={`/catalog/${laptop.slug}`}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all"
                >
                  <span>Configure & Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FeaturedLaptops;
