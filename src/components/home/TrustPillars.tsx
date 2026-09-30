'use client';

import React from 'react';
import { ShieldCheck, Truck, Award, RefreshCw, Lock, Sparkles } from 'lucide-react';

const TRUST_METRICS = [
  {
    icon: ShieldCheck,
    title: 'Factory Sealed & Certified',
    description: 'Every Dell XPS, Alienware, and HP Spectre is 100% factory original with uncompromised tamper seals and valid OEM serial numbers.',
    tag: 'Hardware Guarantee'
  },
  {
    icon: Sparkles,
    title: 'Cold-Matured Perfume Extraits',
    description: 'TK Perfumes are blended using authentic Grasse and Cambodian oils with up to 30% concentration for unmatched 18+ hour sillage.',
    tag: 'Haute Parfumerie'
  },
  {
    icon: Truck,
    title: 'Insured White-Glove Courier',
    description: 'Temperature-stabilized packaging and fully insured courier delivery with live GPS telemetry tracking from dispatch to your door.',
    tag: 'Global Logistics'
  },
  {
    icon: RefreshCw,
    title: 'Zero-Dead-Pixel Policy',
    description: 'Comprehensive 14-day replacement coverage on all laptop displays plus manufacturer on-site technical warranty support.',
    tag: 'Client Protection'
  }
];

export default function TrustPillars() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#07080e] border-y border-white/[0.06]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3.5 py-1 rounded-full border border-cyan-500/20">
            Enterprise Client Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4">
            Authenticity Without Compromise
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Direct-sourced flagship computing hardware paired with artisan private-reserve perfumery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_METRICS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.title}
                className="rounded-2xl bg-[#0b0c14] border border-white/[0.08] p-6 hover:border-cyan-400/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{pillar.tag}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
