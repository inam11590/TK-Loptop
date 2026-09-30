'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LAPTOP_PRODUCTS } from '@/data/products';
import { Cpu, Eye, HardDrive, ArrowRight, ShieldCheck, Check, MessageCircle, Sparkles, Clock, Bell } from 'lucide-react';

const WA_ACTUAL_NUMBER = '923159255165';
const WA_DISPLAY_NUMBER = '0300-0000000';

type FilterTab = 'All' | 'Dell' | 'HP' | 'Apple';

export function FeaturedLaptops() {
  const [selectedBrand, setSelectedBrand] = useState<FilterTab>('All');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistJoined, setWaitlistJoined] = useState(false);

  const filteredLaptops = selectedBrand === 'All' 
    ? LAPTOP_PRODUCTS 
    : LAPTOP_PRODUCTS.filter(l => l.brand === selectedBrand);

  const handleWhatsAppWaitlist = () => {
    const text = encodeURIComponent('Hello TK Store, please add me to the VIP pre-order waitlist for Apple MacBook (M3 / M4 Pro / Max) laptops.');
    window.open(`https://wa.me/${WA_ACTUAL_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail.trim()) {
      setWaitlistJoined(true);
      setTimeout(() => {
        setWaitlistJoined(false);
        setWaitlistEmail('');
      }, 3500);
    }
  };

  return (
    <section id="laptops" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-orange-600 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct Factory Sealed Fleet</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Flagship Laptops Catalog
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Filter by authorized brand. 20 flagship machines ready for express courier dispatch.
            </p>
          </div>

          {/* Brand Filter Tabs with MacBook */}
          <div className="flex items-center gap-1.5 bg-gray-200/80 p-1.5 rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedBrand('All')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedBrand === 'All'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Hardware ({LAPTOP_PRODUCTS.length})
            </button>

            <button
              onClick={() => setSelectedBrand('Dell')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedBrand === 'Dell'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dell (10)
            </button>

            <button
              onClick={() => setSelectedBrand('HP')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedBrand === 'HP'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              HP (10)
            </button>

            {/* Apple MacBook Tab with Coming Soon Pill */}
            <button
              onClick={() => setSelectedBrand('Apple')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedBrand === 'Apple'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Apple MacBook</span>
              <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                Coming Soon
              </span>
            </button>
          </div>
        </div>

        {/* CONDITION 1: APPLE MACBOOK COMING SOON VIEW */}
        {selectedBrand === 'Apple' ? (
          <div className="rounded-3xl bg-white border border-gray-200 p-8 sm:p-14 text-center max-w-3xl mx-auto shadow-sm my-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-800 text-xs font-bold tracking-wide mb-6">
              <Clock className="w-3.5 h-3.5 text-orange-600" />
              <span>Apple Silicon Fleet // Arriving Q4 2026</span>
            </div>

            <div className="relative h-48 sm:h-64 w-full max-w-md mx-auto mb-6 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80"
                alt="Apple MacBook Fleet Coming Soon"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-black text-gray-900 bg-white/95 px-6 py-2 rounded-xl shadow-md border border-gray-200">
                  MacBook Pro & Air Fleet
                </span>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-3">
              Apple MacBook Lineup Coming Soon
            </h3>
            
            <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed mb-8">
              We are currently establishing authorized import allocations for factory-sealed Apple MacBook Pro (M-Series Pro / Max) and MacBook Air units with international AppleCare support.
            </p>

            {/* Email Waitlist Form */}
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto mb-6">
              <input
                type="email"
                required
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                placeholder="Enter your email for arrival alert"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-xs text-gray-900 focus:outline-none focus:border-orange-600 bg-gray-50"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs whitespace-nowrap transition-colors shadow-sm"
              >
                {waitlistJoined ? 'You are on the VIP list!' : 'Notify Me'}
              </button>
            </form>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleWhatsAppWaitlist}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Pre-Order via WhatsApp ({WA_DISPLAY_NUMBER})</span>
              </button>
            </div>

          </div>
        ) : (
          /* CONDITION 2: DELL & HP PRODUCTS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredLaptops.map((laptop) => (
              <div
                key={laptop.id}
                className="group relative flex flex-col rounded-2xl bg-white border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all duration-300 p-6"
              >
                {/* Top Label */}
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

                {/* Name & Tagline */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {laptop.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {laptop.tagline}
                  </p>
                </div>

                {/* Specs HUD */}
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

                {/* Key Features */}
                <div className="space-y-1 mb-5 text-[11px] text-gray-600">
                  {laptop.keyFeatures.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Price & Actions */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Direct Unit Price</span>
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
        )}

      </div>
    </section>
  );
}

export default FeaturedLaptops;
