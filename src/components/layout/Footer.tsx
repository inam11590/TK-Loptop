'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, ShieldCheck, Mail, Phone } from 'lucide-react';

const WA_ACTUAL_NUMBER = '923159255165';
const WA_DISPLAY_NUMBER = '0300-0000000';

export function Footer() {
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent('Hello TK Store, I need assistance with an order or product inquiry.');
    window.open(`https://wa.me/${WA_ACTUAL_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-gray-100 border-t border-gray-200 text-gray-600 text-xs">
      
      {/* Top Assistance Banner (Alibaba style) */}
      <div className="bg-white border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-orange-500 text-white font-black text-lg flex items-center justify-center">
              TK
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Need Immediate Assistance?</h4>
              <p className="text-xs text-gray-500">Contact our sales and order fulfillment team directly.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp: {WA_DISPLAY_NUMBER}</span>
            </button>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1.5 text-gray-700 font-semibold">
              <Phone className="w-3.5 h-3.5 text-orange-600" />
              <span>{WA_DISPLAY_NUMBER}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Columns */}
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Col 1: Dell Hardware */}
          <div>
            <h5 className="font-bold text-gray-900 uppercase text-[11px] tracking-wider mb-3">Dell Hardware</h5>
            <ul className="space-y-2">
              <li><Link href="/catalog?brand=Dell" className="hover:text-orange-600">Dell XPS 16 (9640)</Link></li>
              <li><Link href="/catalog?brand=Dell" className="hover:text-orange-600">Dell Alienware m16 R2</Link></li>
              <li><Link href="/catalog?brand=Dell" className="hover:text-orange-600">Precision Workstations</Link></li>
              <li><Link href="/catalog" className="hover:text-orange-600">All Dell Machines</Link></li>
            </ul>
          </div>

          {/* Col 2: HP Hardware */}
          <div>
            <h5 className="font-bold text-gray-900 uppercase text-[11px] tracking-wider mb-3">HP Hardware</h5>
            <ul className="space-y-2">
              <li><Link href="/catalog?brand=HP" className="hover:text-orange-600">HP Spectre x360 16</Link></li>
              <li><Link href="/catalog?brand=HP" className="hover:text-orange-600">HP OMEN Transcend 14</Link></li>
              <li><Link href="/catalog?brand=HP" className="hover:text-orange-600">Envy Studio Series</Link></li>
              <li><Link href="/catalog" className="hover:text-orange-600">All HP Machines</Link></li>
            </ul>
          </div>

          {/* Col 3: TK Perfumes */}
          <div>
            <h5 className="font-bold text-gray-900 uppercase text-[11px] tracking-wider mb-3">TK Haute Parfumerie</h5>
            <ul className="space-y-2">
              <li><Link href="/#perfumes" className="hover:text-orange-600">TK Royal Oud Noir</Link></li>
              <li><Link href="/#perfumes" className="hover:text-orange-600">TK Amber Impériale</Link></li>
              <li><Link href="/#perfumes" className="hover:text-orange-600">TK Platinum Vétiver</Link></li>
              <li><Link href="/#perfumes" className="hover:text-orange-600">All Fragrance Reserves</Link></li>
            </ul>
          </div>

          {/* Col 4: Assurance & Company */}
          <div>
            <h5 className="font-bold text-gray-900 uppercase text-[11px] tracking-wider mb-3">Customer Assurances</h5>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-orange-600" /> Factory Tamper Sealed</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-orange-600" /> Zero-Dead-Pixel Policy</li>
              <li className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-orange-600" /> concierge@tklaptop.com</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>© 2026 TK Store Inc. All rights reserved. Authorized Dell & HP Flagships and Private Fragrance Line.</p>
          <div className="flex items-center gap-4">
            <span>Verified Merchant</span>
            <span>•</span>
            <span>Direct Courier Dispatch</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
