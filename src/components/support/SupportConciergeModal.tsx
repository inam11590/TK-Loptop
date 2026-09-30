'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Laptop, 
  X, 
  Search, 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Send,
  AlertCircle,
  MessageCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

type TabType = 'whatsapp' | 'warranty' | 'inquiry' | 'contact';

// Configure your business WhatsApp number (international format without '+' or '-' or spaces)
const WHATSAPP_PHONE_NUMBER = '923159255165';

const WHATSAPP_PRESETS = [
  {
    id: 'dell-inquiry',
    icon: Laptop,
    label: 'Dell Fleet Consultation',
    preview: 'Specs, availability & pricing for Dell XPS 16 & Alienware m16 R2',
    text: 'Hello TK Concierge, I would like to inquire about specifications, pricing, and availability for the Dell XPS and Alienware lineup.'
  },
  {
    id: 'hp-inquiry',
    icon: Laptop,
    label: 'HP Spectre / OMEN Inquiry',
    preview: 'Pricing & custom configurations for HP Spectre x360 & OMEN Transcend',
    text: 'Hello TK Concierge, I am interested in purchasing an HP Spectre x360 or HP OMEN Transcend laptop. Can you share current stock and delivery timelines?'
  },
  {
    id: 'perfume-inquiry',
    icon: Sparkles,
    label: 'TK Haute Parfumerie Reserve',
    preview: 'Private consultation for TK Royal Oud Noir & Amber Impériale',
    text: 'Hello, I would like a personal consultation regarding the TK Perfumes collection (Royal Oud Noir / Amber Impériale flacons).'
  },
  {
    id: 'warranty-support',
    icon: ShieldCheck,
    label: 'Warranty & RMA Support',
    preview: 'Hardware diagnostics, service tag verification & claims',
    text: 'Hello TK Support, I need assistance verifying my hardware warranty and checking RMA eligibility for my order.'
  }
];

export default function SupportConciergeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('whatsapp');

  // WhatsApp Custom Message State
  const [selectedPresetId, setSelectedPresetId] = useState<string>(WHATSAPP_PRESETS[0].id);
  const [customWhatsAppMsg, setCustomWhatsAppMsg] = useState<string>(WHATSAPP_PRESETS[0].text);

  // Warranty Lookup State
  const [serialQuery, setSerialQuery] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    status: 'success' | 'not_found' | null;
    title?: string;
    details?: string;
    coverage?: string;
    type?: 'hardware' | 'perfume';
  }>({ status: null });

  // Inquiry Form State
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Hardware Support (Dell / HP)',
    message: ''
  });

  const handleSelectPreset = (preset: typeof WHATSAPP_PRESETS[0]) => {
    setSelectedPresetId(preset.id);
    setCustomWhatsAppMsg(preset.text);
  };

  const handleLaunchWhatsApp = () => {
    const encoded = encodeURIComponent(customWhatsAppMsg.trim());
    const waUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const query = serialQuery.trim().toUpperCase();
    if (!query) return;

    if (query.startsWith('DELL') || query.startsWith('HP') || query.length === 7) {
      setVerificationResult({
        status: 'success',
        type: 'hardware',
        title: 'Authorized Hardware Coverage Active',
        details: 'Dell ProSupport Plus & TK Premier Hardware Care',
        coverage: 'Valid through October 2027 • On-site hardware repair & zero-dead-pixel coverage included.'
      });
    } else if (query.startsWith('TK-') || query.startsWith('TK') || query.includes('OUD')) {
      setVerificationResult({
        status: 'success',
        type: 'perfume',
        title: 'Authentic Private Reserve Batch Verified',
        details: 'TK Royal Oud Noir — Batch #2026-A1',
        coverage: 'Origin: Grasse & Phnom Penh • Cold-matured 12 months • Extrait concentration certified.'
      });
    } else {
      setVerificationResult({
        status: 'not_found',
        title: 'No Active Record Found',
        details: 'The entered identifier was not recognized in our authorized registry. Please check your invoice or message us on WhatsApp.'
      });
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', category: 'Hardware Support (Dell / HP)', message: '' });
      setIsOpen(false);
    }, 2200);
  };

  return (
    <>
      {/* Floating Concierge Launcher */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            setActiveTab('whatsapp');
            setIsOpen(true);
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-105"
          aria-label="Instant WhatsApp Chat"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
        </button>

        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 px-4 py-3 rounded-full bg-[#0c0e17]/95 border border-cyan-400/40 text-slate-100 shadow-[0_0_25px_-5px_rgba(0,240,255,0.35)] hover:border-cyan-400 hover:shadow-[0_0_35px_-5px_rgba(0,240,255,0.6)] backdrop-blur-xl transition-all duration-300 hover:scale-105"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-mono font-semibold tracking-wider">TK CONCIERGE</span>
        </button>
      </div>

      {/* Main Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#090a12] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#0c0d18]">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 block">
                  High-Touch Client Services
                </span>
                <h3 className="text-lg font-bold text-white">TK Concierge & Support Desk</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-4 border-b border-white/[0.08] bg-[#06070c] text-[11px] sm:text-xs font-semibold">
              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`py-3.5 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeTab === 'whatsapp'
                    ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => setActiveTab('warranty')}
                className={`py-3.5 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeTab === 'warranty'
                    ? 'border-cyan-400 text-cyan-400 bg-white/[0.02]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Warranty</span>
              </button>

              <button
                onClick={() => setActiveTab('inquiry')}
                className={`py-3.5 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeTab === 'inquiry'
                    ? 'border-cyan-400 text-cyan-400 bg-white/[0.02]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Desk Form</span>
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className={`py-3.5 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeTab === 'contact'
                    ? 'border-cyan-400 text-cyan-400 bg-white/[0.02]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Direct Line</span>
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="p-6 overflow-y-auto space-y-6">

              {/* TAB 1: WHATSAPP DIRECT CHAT WITH PRESETS */}
              {activeTab === 'whatsapp' && (
                <div className="space-y-5">
                  <div className="flex items-start justify-between bg-emerald-950/20 border border-emerald-500/25 rounded-2xl p-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <h4 className="text-sm font-bold text-white">Live Concierge on WhatsApp</h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Connect directly with our senior hardware advisors or master perfumers. Select an inquiry template below or tailor your custom message.
                      </p>
                    </div>
                  </div>

                  {/* Preset Options Grid */}
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
                      Select Topic Preset
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {WHATSAPP_PRESETS.map((preset) => {
                        const Icon = preset.icon;
                        const isSelected = selectedPresetId === preset.id;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => handleSelectPreset(preset)}
                            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'bg-emerald-500/10 border-emerald-400 shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]'
                                : 'bg-white/[0.02] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className={`text-xs font-bold flex items-center gap-1.5 ${
                                isSelected ? 'text-emerald-300' : 'text-slate-200'
                              }`}>
                                <Icon className="w-3.5 h-3.5" />
                                {preset.label}
                              </span>
                              {isSelected && <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />}
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                              {preset.preview}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message Preview & Editor */}
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                      Outgoing Message Preview
                    </label>
                    <textarea
                      rows={3}
                      value={customWhatsAppMsg}
                      onChange={(e) => setCustomWhatsAppMsg(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-emerald-400 resize-none leading-relaxed"
                      placeholder="Type your WhatsApp message..."
                    />
                  </div>

                  {/* WhatsApp Primary Launch CTA */}
                  <button
                    onClick={handleLaunchWhatsApp}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-[1.01]"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Launch WhatsApp Chat</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
                  </button>
                </div>
              )}

              {/* TAB 2: WARRANTY & AUTHENTICITY */}
              {activeTab === 'warranty' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Verify Serial Tag or Fragrance Batch Code</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Enter your Dell Service Tag, HP Serial Number, or TK Fragrance Reserve Batch Code to check warranty coverage.
                    </p>
                  </div>

                  <form onSubmit={handleVerify} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. DELL-9640, HP-7821, or TK-OUD-26"
                      value={serialQuery}
                      onChange={(e) => setSerialQuery(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 font-mono text-xs focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Verify</span>
                    </button>
                  </form>

                  {verificationResult.status === 'success' && (
                    <div className={`p-4 rounded-2xl border ${
                      verificationResult.type === 'perfume' 
                        ? 'bg-amber-500/10 border-amber-500/30' 
                        : 'bg-cyan-500/10 border-cyan-500/30'
                    }`}>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${
                          verificationResult.type === 'perfume' ? 'text-amber-400' : 'text-cyan-400'
                        }`} />
                        <div>
                          <span className={`text-xs font-bold uppercase tracking-wider block ${
                            verificationResult.type === 'perfume' ? 'text-amber-300' : 'text-cyan-300'
                          }`}>
                            {verificationResult.title}
                          </span>
                          <p className="text-xs text-white font-medium mt-0.5">{verificationResult.details}</p>
                          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{verificationResult.coverage}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {verificationResult.status === 'not_found' && (
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block">
                          {verificationResult.title}
                        </span>
                        <p className="text-[11px] text-slate-300 mt-1">{verificationResult.details}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: CONCIERGE DESK FORM */}
              {activeTab === 'inquiry' && (
                <div>
                  {submitted ? (
                    <div className="py-12 text-center space-y-3">
                      <CheckCircle2 className="w-10 h-10 text-cyan-400 mx-auto" />
                      <h4 className="text-base font-bold text-white">Inquiry Received</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        Your concierge ticket has been routed to our senior technical and fragrance advisors.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1.5">Full Name</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                            placeholder="Inam Khan"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1.5">Email Address</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                            placeholder="client@domain.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1.5">Department</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0f18] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                        >
                          <option>Hardware Support (Dell / HP)</option>
                          <option>Fragrance Curation & Custom Order</option>
                          <option>Enterprise Fleet Bulk Inquiries</option>
                          <option>Warranty Claim & RMA</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1.5">Message / Requirement</label>
                        <textarea
                          rows={3}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 resize-none"
                          placeholder="Please describe your hardware configuration question or perfume consultation need..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_-3px_rgba(0,240,255,0.4)]"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch to Concierge Desk</span>
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 4: DIRECT CHANNELS */}
              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <MessageCircle className="w-4 h-4 fill-current" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-slate-400 block">WhatsApp VIP Desk</span>
                        <span className="text-sm font-bold text-white">0300-0000000</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('whatsapp')}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-400 text-black hover:bg-emerald-300 transition-colors"
                    >
                      Chat Now
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-slate-400 block">Direct Priority Line</span>
                        <span className="text-sm font-bold text-white">0300-0000000</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                      24/7 Active
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-slate-400 block">Concierge & Fragrance Desk</span>
                        <span className="text-sm font-bold text-white">concierge@tklaptop.com</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Sub-2hr SLA</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-300">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Studio Hours</span>
                      <span className="text-xs text-slate-200">Mon – Sat: 08:00 – 21:00 UTC • White-glove courier dispatch active</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
