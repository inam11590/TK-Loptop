'use client';

import React from 'react';
import { ShieldCheck, Truck, Sparkles, RefreshCw } from 'lucide-react';

const TRUST_METRICS = [
  {
    icon: ShieldCheck,
    title: 'Factory Sealed Laptops',
    description: 'Every Dell XPS, Alienware, and HP Spectre is 100% factory original with untampered packaging and verifiable service tags.',
    tag: 'Hardware Guarantee'
  },
  {
    icon: Sparkles,
    title: 'Cold-Matured Perfumes',
    description: 'TK Perfumes use aged agarwood and essential oils with up to 30% concentration for long-lasting sillage.',
    tag: 'Haute Parfumerie'
  },
  {
    icon: Truck,
    title: 'Fast Courier Dispatch',
    description: 'Secure, shock-resistant protective shipping with full transit coverage directly to your location.',
    tag: 'Safe Delivery'
  },
  {
    icon: RefreshCw,
    title: 'Zero-Dead-Pixel Policy',
    description: 'Complete display inspection guarantee alongside official manufacturer hardware warranty coverage.',
    tag: 'Client Protection'
  }
];

export function TrustPillars() {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-200">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Certified Store Standards
          </span>
          <h2 className="text-2xl font-black text-gray-900 mt-2">
            Authenticity & Quality Assured
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRUST_METRICS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.title}
                className="rounded-xl bg-gray-50 border border-gray-200 p-5 hover:border-orange-400 hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="h-9 w-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{pillar.tag}</span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{pillar.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustPillars;
