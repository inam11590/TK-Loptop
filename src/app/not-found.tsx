import React from 'react';
import Link from 'next/link';
import { Terminal, Laptop, Sparkles, Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#050507] overflow-hidden">
      
      {/* Ambient Radial Cyber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full text-center py-16">
        
        {/* Status Micro-Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-8 shadow-[0_0_20px_-3px_rgba(0,240,255,0.3)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span>404 // TELEMETRY LOST</span>
        </div>

        {/* Futuristic 404 Headline Display */}
        <div className="relative select-none mb-6">
          <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-300 to-white/10 font-mono">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center opacity-20 blur-sm pointer-events-none">
            <span className="text-8xl sm:text-9xl font-black text-cyan-400 font-mono">
              404
            </span>
          </div>
        </div>

        {/* Error Details */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
          Hardware Coordinate Not Found
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8">
          The requested silicon build, flacon reserve, or server route does not exist or has been reallocated across the TK network.
        </p>

        {/* Diagnostic HUD Box */}
        <div className="mx-auto max-w-md bg-[#0a0b12] border border-white/[0.08] rounded-2xl p-4 mb-10 text-left font-mono text-xs shadow-inner">
          <div className="flex items-center gap-2 text-slate-500 pb-2 mb-2 border-b border-white/[0.06]">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase tracking-wider">System Diagnostic Log</span>
          </div>
          <div className="space-y-1 text-slate-400 text-[11px]">
            <p><span className="text-cyan-400">&gt;</span> STATUS: <span className="text-rose-400">ERR_NULL_COORDINATE</span></p>
            <p><span className="text-cyan-400">&gt;</span> REGISTRY: <span className="text-slate-300">TK_HARDWARE_INDEX_FAILURE</span></p>
            <p><span className="text-cyan-400">&gt;</span> RECOVERY: <span className="text-emerald-400">Reroute recommended</span></p>
          </div>
        </div>

        {/* Action Route Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs transition-all duration-300 shadow-[0_0_20px_-3px_rgba(0,240,255,0.5)] hover:scale-[1.02]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Fleet Base</span>
          </Link>

          <Link
            href="/catalog"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/10 font-semibold text-xs transition-all duration-300"
          >
            <Laptop className="w-4 h-4 text-cyan-400" />
            <span>Browse Dell & HP Fleet</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <Link
            href="/#perfumes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold text-xs transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>TK Perfumes</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
