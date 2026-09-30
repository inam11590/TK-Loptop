"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  Building2,
  Smartphone,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Tag,
  Check,
  ArrowLeft,
  Award,
  Globe,
} from "lucide-react";
import { useCart, type CartItem } from "@/context/CartContext";
import { TK_LAPTOPS } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { OrderSuccessModal } from "@/components/checkout/OrderSuccessModal";
import { cn } from "@/lib/utils";

type DeliveryMethodId = "priority-air" | "white-glove";
type PaymentTabId = "card" | "wire" | "wallet";

const DELIVERY_METHODS: {
  id: DeliveryMethodId;
  label: string;
  detail: string;
  price: number;
  badge: string;
}[] = [
  {
    id: "priority-air",
    label: "TK Priority Air Courier (1-2 Business Days)",
    detail: "Armored climate-controlled air freight with signature release.",
    price: 0,
    badge: "FREE / INCLUDED",
  },
  {
    id: "white-glove",
    label: "TK White-Glove VIP Delivery & On-Site Setup",
    detail:
      "Dedicated TK systems engineer delivers, unboxes, and calibrates your workstation on-site.",
    price: 99,
    badge: "+ $99 USD",
  },
];

const PAYMENT_TABS: {
  id: PaymentTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "wire", label: "Wire Transfer / Corporate Net-30", icon: Building2 },
  {
    id: "wallet",
    label: "Digital Wallets (Apple/Google Pay)",
    icon: Smartphone,
  },
];

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiration(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart, addItem } = useCart();

  // Step 1: Customer Contact & Courier Delivery Address
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("United States");

  // Step 2: White-Glove Delivery Method
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethodId>("priority-air");

  // Step 3: Payment Architecture
  const [paymentTab, setPaymentTab] = useState<PaymentTabId>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  // Order Summary Collapsible & Promo Voucher State
  const [itemsCollapsed, setItemsCollapsed] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);

  // Order Confirmation Modal Snapshot State
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [confirmedSnapshot, setConfirmedSnapshot] = useState<{
    items: CartItem[];
    total: number;
    deliveryLabel: string;
  } | null>(null);

  const selectedDelivery =
    DELIVERY_METHODS.find((d) => d.id === deliveryMethod) ??
    DELIVERY_METHODS[0];

  const shippingCost = items.length > 0 ? selectedDelivery.price : 0;
  const voucherDiscount = appliedVoucher ? 150 : 0;
  const taxableSubtotal = Math.max(0, subtotal - voucherDiscount);
  const estimatedTax = +(taxableSubtotal * 0.0825).toFixed(2);
  const grandTotal = +(taxableSubtotal + shippingCost + estimatedTax).toFixed(
    2
  );

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCode.trim()) return;
    setAppliedVoucher(voucherCode.trim().toUpperCase());
  };

  const handleLoadSampleAllocation = () => {
    const flagship = TK_LAPTOPS[0];
    if (!flagship) return;
    addItem({
      laptopId: flagship.id,
      name: flagship.name,
      slug: flagship.slug,
      image: flagship.featuredImage,
      basePrice: flagship.basePrice,
      totalPrice: flagship.basePrice + 300,
      quantity: 1,
      configuredSpecs: {
        processor: "24-Core Extreme",
        ram: "64GB RAM",
        storage: "2TB Gen5 NVMe",
        display: "Nano-Matte",
        warranty: "3-Yr TK Care+",
      },
    });
  };

  const handleAuthorizeOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return;

    setConfirmedSnapshot({
      items: [...items],
      total: grandTotal,
      deliveryLabel: selectedDelivery.label,
    });
    setOrderModalOpen(true);
  };

  const orderItemsForModal = useMemo(
    () => confirmedSnapshot?.items ?? items,
    [confirmedSnapshot, items]
  );

  return (
    <main className="relative flex-1 bg-[#050507] pb-28">
      {/* Ambient Top Radial Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] overflow-hidden"
      >
        <div
          className="mx-auto h-full max-w-6xl"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(0,240,255,0.12), transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Top Checkout Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1f2232] pb-6">
          <div>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#94a3b8] hover:text-[#00f0ff] transition-colors mb-3"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Return to Hardware Fleet</span>
            </Link>
            <div className="flex items-center gap-3">
              <Badge variant="cyan" pulse>
                ENCRYPTED DIRECT DISPATCH
              </Badge>
              <span className="font-mono text-xs text-[#94a3b8]">
                TLS 1.3 // 256-BIT AES
              </span>
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-[#f8fafc] uppercase">
              Hardware Allocation &{" "}
              <span className="bg-gradient-to-r from-[#f8fafc] via-[#00f0ff] to-[#3b82f6] bg-clip-text text-transparent">
                Checkout
              </span>
            </h1>
          </div>

          <div className="inline-flex items-center gap-2.5 rounded-2xl bg-[#0d0e15] border border-[#1f2232] px-4 py-2.5 font-mono text-xs text-[#94a3b8]">
            <Lock className="h-4 w-4 text-[#00f0ff]" />
            <span>PCI-DSS Level 1 Verified Foundry Checkout</span>
          </div>
        </div>

        {/* Split-Screen Checkout Architecture */}
        <form
          onSubmit={handleAuthorizeOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          {/* LEFT COLUMN: 3 Checkout Steps */}
          <div className="lg:col-span-7 space-y-8">
            {/* STEP 1: Customer Contact & Courier Delivery Address */}
            <section
              aria-labelledby="checkout-step-1"
              className="rounded-3xl bg-[#0d0e15] border border-[#1f2232] p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center justify-between border-b border-[#1f2232] pb-4 mb-6">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#00f0ff]">
                    STEP 01 // RECIPIENT TELEMETRY
                  </span>
                  <h2
                    id="checkout-step-1"
                    className="mt-0.5 text-lg sm:text-xl font-bold text-[#f8fafc]"
                  >
                    Customer Contact & Courier Delivery Address
                  </h2>
                </div>
                <Globe className="h-5 w-5 text-[#00f0ff]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="checkout-first-name"
                    className="block font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mb-1.5"
                  >
                    First Name *
                  </label>
                  <input
                    id="checkout-first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    enterKeyHint="next"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Aria"
                    className="w-full rounded-xl bg-[#050507] border border-[#1f2232] px-3.5 py-2.5 text-sm text-[#f8fafc] placeholder-[#94a3b8]/45 focus:border-[#00f0ff] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-last-name"
                    className="block font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mb-1.5"
                  >
                    Last Name *
                  </label>
                  <input
                    id="checkout-last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    enterKeyHint="next"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Vance"
                    className="w-full rounded-xl bg-[#050507] border border-[#1f2232] px-3.5 py-2.5 text-sm text-[#f8fafc] placeholder-[#94a3b8]/45 focus:border-[#00f0ff] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-email"
                    className="block font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="checkout-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    enterKeyHint="next"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aria.vance@neuralfoundry.ai"
                    className="w-full rounded-xl bg-[#050507] border border-[#1f2232] px-3.5 py-2.5 text-sm text-[#f8fafc] placeholder-[#94a3b8]/45 focus:border-[#00f0ff] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="block font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mb-1.5"
                  >
                    Direct Phone (Courier SMS) *
                  </label>
                  <input
                    id="checkout-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    enterKeyHint="next"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (415) 890-4421"
                    className="w-full rounded-xl bg-[#050507] border border-[#1f2232] px-3.5 py-2.5 text-sm text-[#f8fafc] placeholder-[#94a3b8]/45 focus:border-[#00f0ff] focus:outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="checkout-address"
                    className="block font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mb-1.5"
                  >
                    Shipping Street Address *
                  </label>
                  <textarea
                    id="checkout-address"
                    name="streetAddress"
                    autoComplete="shipping street-address"
                    rows={2}
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="740 Titanium Way, Suite 1200"
                    className="w-full rounded-xl bg-[#050507] border border-[#1f2232] px-3.5 py-2.5 text-sm text-[#f8fafc] placeholder-[#94a3b8]/45 focus:border-[#00f0ff] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-city"
                    className="block font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mb-1.5"
                  >
                    City *
                  </label>
                  <input
                    id="checkout-city"
                    name="city"
                    type="text"
                    autoComplete="shipping address-level2"
                    enterKeyHint="next"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="San Francisco"
                    className="w-full rounded-xl bg-[#050507] border border-[#1f2232] px-3.5 py-2.5 text-sm text-[#f8fafc] placeholder-[#94a3b8]/45 focus:border-[#00f0ff] focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="checkout-postal"
                      className="block font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mb-1.5"
                    >
                      Postal Code *
                    </label>
                    <input
                      id="checkout-postal"
                      name="postalCode"
                      type="text"
                      autoComplete="shipping postal-code"
                      enterKeyHint="next"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="94107"
                      className="w-full rounded-xl bg-[#050507] border border-[#1f2232] px-3.5 py-2.5 text-sm text-[#f8fafc] placeholder-[#94a3b8]/45 focus:border-[#00f0ff] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-country"
                      className="block font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mb-1.5"
                    >
                      Country *
                    </label>
                    <select
                      id="checkout-country"
                      name="country"
                      autoComplete="shipping country-name"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded-xl bg-[#050507] border border-[#1f2232] px-3 py-2.5 text-sm text-[#f8fafc] focus:border-[#00f0ff] focus:outline-none"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="Japan">Japan</option>
                      <option value="Singapore">Singapore</option>
                      <option value="United Arab Emirates">
                        United Arab Emirates
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* STEP 2: White-Glove Delivery Method */}
            <section
              aria-labelledby="checkout-step-2"
              className="rounded-3xl bg-[#0d0e15] border border-[#1f2232] p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center justify-between border-b border-[#1f2232] pb-4 mb-6">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#00f0ff]">
                    STEP 02 // LOGISTICS TIER
                  </span>
                  <h2
                    id="checkout-step-2"
                    className="mt-0.5 text-lg sm:text-xl font-bold text-[#f8fafc]"
                  >
                    White-Glove Delivery Method
                  </h2>
                </div>
                <Truck className="h-5 w-5 text-[#00f0ff]" />
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {DELIVERY_METHODS.map((option) => {
                  const isSelected = deliveryMethod === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setDeliveryMethod(option.id)}
                      className={cn(
                        "flex items-start justify-between gap-4 rounded-2xl border p-4 sm:p-5 text-left transition-all cursor-pointer",
                        isSelected
                          ? "bg-[#00f0ff]/[0.08] border-[#00f0ff] shadow-[0_0_25px_-6px_rgba(0,240,255,0.35)]"
                          : "bg-[#050507] border-[#1f2232] hover:border-white/25"
                      )}
                    >
                      <div className="flex items-start gap-3.5">
                        <span
                          className={cn(
                            "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                            isSelected
                              ? "border-[#00f0ff] bg-[#00f0ff] text-[#050507]"
                              : "border-white/30 bg-transparent"
                          )}
                        >
                          {isSelected && (
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          )}
                        </span>
                        <div>
                          <div className="text-sm font-bold text-[#f8fafc]">
                            {option.label}
                          </div>
                          <p className="mt-1 text-xs text-[#94a3b8] leading-relaxed">
                            {option.detail}
                          </p>
                        </div>
                      </div>

                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase",
                          option.price === 0
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/35"
                        )}
                      >
                        {option.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STEP 3: Payment Architecture */}
            <section
              aria-labelledby="checkout-step-3"
              className="rounded-3xl bg-[#0d0e15] border border-[#1f2232] p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center justify-between border-b border-[#1f2232] pb-4 mb-6">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#00f0ff]">
                    STEP 03 // SETTLEMENT PROTOCOL
                  </span>
                  <h2
                    id="checkout-step-3"
                    className="mt-0.5 text-lg sm:text-xl font-bold text-[#f8fafc]"
                  >
                    Payment Architecture
                  </h2>
                </div>
                <CreditCard className="h-5 w-5 text-[#00f0ff]" />
              </div>

              {/* Payment Method Tab Switcher */}
              <div
                role="tablist"
                aria-label="Payment method options"
                className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6"
              >
                {PAYMENT_TABS.map((tab) => {
                  const IconComponent = tab.icon;
                  const active = paymentTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setPaymentTab(tab.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-xl border p-3 text-left text-xs font-semibold transition-all cursor-pointer",
                        active
                          ? "bg-[#00f0ff] text-[#050507] border-[#00f0ff] glow-cyan"
                          : "bg-[#050507] text-[#94a3b8] border-[#1f2232] hover:border-white/25 hover:text-[#f8fafc]"
                      )}
                    >
                      <IconComponent className="h-4 w-4 shrink-0" />
                      <span className="line-clamp-1">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab 1: Credit / Debit Card Form */}
              {paymentTab === "card" && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="cc-number"
                      className="block font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mb-1.5"
                    >
                      Card Number *
                    </label>
                    <input
                      id="cc-number"
                      name="cc-number"
                      type="text"
                      autoComplete="cc-number"
                      inputMode="numeric"
                      enterKeyHint="next"
                      maxLength={19}
                      pattern="[\d ]{13,19}"
                      required
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                      placeholder="4532 •••• •••• 8891"
                      className="w-full rounded-xl bg-[#050507] border border-[#1f2232] px-3.5 py-2.5 font-mono text-sm text-[#f8fafc] placeholder-[#94a3b8]/45 focus:border-[#00f0ff] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="cc-exp"
                          className="font-mono text-[11px] uppercase tracking-wider text-[#94a3b8]"
                        >
                          Expiration *
                        </label>
                        <span
                          id="exp-hint"
                          className="font-mono text-[10px] text-[#00f0ff]"
                        >
                          Format: MM/YY
                        </span>
                      </div>
                      <input
                        id="cc-exp"
                        name="cc-exp"
                        type="text"
                        autoComplete="cc-exp"
                        aria-describedby="exp-hint"
                        enterKeyHint="next"
                        maxLength={5}
                        required
                        value={cardExpiry}
                        onChange={(e) =>
                          setCardExpiry(formatExpiration(e.target.value))
                        }
                        placeholder="08/29"
                        className="w-full rounded-xl bg-[#050507] border border-[#1f2232] px-3.5 py-2.5 font-mono text-sm text-[#f8fafc] placeholder-[#94a3b8]/45 focus:border-[#00f0ff] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cc-csc"
                        className="block font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mb-1.5"
                      >
                        Security Code (CVV) *
                      </label>
                      <input
                        id="cc-csc"
                        name="cc-csc"
                        type="text"
                        autoComplete="cc-csc"
                        inputMode="numeric"
                        enterKeyHint="next"
                        maxLength={4}
                        pattern="[0-9]{3,4}"
                        required
                        value={cardCvv}
                        onChange={(e) =>
                          setCardCvv(
                            e.target.value.replace(/\D/g, "").slice(0, 4)
                          )
                        }
                        placeholder="942"
                        className="w-full rounded-xl bg-[#050507] border border-[#1f2232] px-3.5 py-2.5 font-mono text-sm text-[#f8fafc] placeholder-[#94a3b8]/45 focus:border-[#00f0ff] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="cc-name"
                      className="block font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mb-1.5"
                    >
                      Cardholder Name *
                    </label>
                    <input
                      id="cc-name"
                      name="cc-name"
                      type="text"
                      autoComplete="cc-name"
                      enterKeyHint="done"
                      maxLength={50}
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="ARIA VANCE"
                      className="w-full rounded-xl bg-[#050507] border border-[#1f2232] px-3.5 py-2.5 text-sm text-[#f8fafc] placeholder-[#94a3b8]/45 focus:border-[#00f0ff] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Wire Transfer / Corporate Net-30 */}
              {paymentTab === "wire" && (
                <div className="rounded-2xl bg-[#050507] border border-[#1f2232] p-5 space-y-3 text-xs text-[#94a3b8]">
                  <div className="font-mono text-xs font-bold text-[#00f0ff] uppercase">
                    ENTERPRISE WIRE & CORPORATE NET-30 SETTLEMENT
                  </div>
                  <p className="leading-relaxed">
                    Submitting this order generates an official Pro-Forma SWIFT
                    / Fedwire routing instruction sheet and reserves your wafer
                    allocation for 72 hours.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-[11px]">
                    <div className="rounded-xl bg-[#0d0e15] border border-white/10 p-3">
                      <span className="text-[#94a3b8] block">BENEFICIARY</span>
                      <span className="text-[#f8fafc] font-bold">
                        TK LAPTOP FOUNDRY INC.
                      </span>
                    </div>
                    <div className="rounded-xl bg-[#0d0e15] border border-white/10 p-3">
                      <span className="text-[#94a3b8] block">NET TERMS</span>
                      <span className="text-emerald-400 font-bold">
                        INSTANT APPROVAL
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Digital Wallets (Apple/Google Pay) */}
              {paymentTab === "wallet" && (
                <div className="rounded-2xl bg-[#050507] border border-[#1f2232] p-5 text-center space-y-3">
                  <Smartphone className="h-8 w-8 text-[#00f0ff] mx-auto" />
                  <div className="text-sm font-bold text-[#f8fafc]">
                    Biometric Express Tokenization Ready
                  </div>
                  <p className="text-xs text-[#94a3b8] max-w-md mx-auto">
                    Click &ldquo;Authorize & Place Order&rdquo; below to invoke
                    native Apple Pay / Google Pay hardware passkey verification.
                  </p>
                </div>
              )}

              {/* Security Badges */}
              <div className="mt-6 pt-5 border-t border-[#1f2232] flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[#94a3b8]">
                <span className="inline-flex items-center gap-1.5 text-emerald-400">
                  <Lock className="h-3.5 w-3.5" />
                  <span>256-bit AES Encryption</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[#00f0ff]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>PCI-DSS Level 1 Compliant</span>
                </span>
                <span>Zero-Knowledge Token Vault</span>
              </div>
            </section>

            {/* Primary Authorize & Place Order CTA */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={items.length === 0}
              leftIcon={<Sparkles className="h-5 w-5" />}
              className="h-14 text-base font-extrabold uppercase tracking-wider glow-cyan"
            >
              Authorize & Place Order — $
              {grandTotal.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Button>
          </div>

          {/* RIGHT COLUMN: Live Order Summary Card */}
          <aside
            aria-label="Live Order Summary"
            className="lg:col-span-5 lg:sticky lg:top-28 space-y-6"
          >
            <div className="rounded-3xl bg-[#0d0e15] border border-[#1f2232] p-6 sm:p-7 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)]">
              {/* Collapsible Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1f2232]">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#00f0ff]">
                    LIVE ORDER SUMMARY
                  </span>
                  <h2 className="text-lg font-extrabold text-[#f8fafc]">
                    Configured Machines ({items.length})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setItemsCollapsed((prev) => !prev)}
                  aria-expanded={!itemsCollapsed}
                  className="inline-flex items-center gap-1 rounded-xl bg-[#050507] border border-[#1f2232] px-3 py-1.5 font-mono text-xs text-[#94a3b8] hover:text-[#00f0ff] cursor-pointer"
                >
                  <span>{itemsCollapsed ? "Expand" : "Collapse"}</span>
                  {itemsCollapsed ? (
                    <ChevronDown className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronUp className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              {/* Configured Laptops List */}
              {!itemsCollapsed && (
                <div className="py-5 border-b border-[#1f2232] space-y-4">
                  {items.length === 0 ? (
                    <div className="rounded-2xl bg-[#050507] border border-dashed border-[#1f2232] p-5 text-center space-y-3">
                      <p className="text-xs text-[#94a3b8]">
                        Your hardware bag is currently empty. Add a custom
                        machine from the catalog or load a flagship allocation
                        to test checkout.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={handleLoadSampleAllocation}
                        >
                          Load Sample Titan X16 Build
                        </Button>
                        <Link href="/catalog">
                          <Button type="button" variant="outline" size="sm">
                            Browse Fleet
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-3.5 rounded-2xl bg-[#050507] border border-white/[0.06] p-3.5"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          width={68}
                          height={48}
                          className="h-12 w-16 rounded-xl object-cover border border-white/10 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm font-bold text-[#f8fafc] truncate">
                              {item.name}
                            </span>
                            <span className="font-mono text-xs font-bold text-[#00f0ff]">
                              ×{item.quantity}
                            </span>
                          </div>
                          <div className="mt-1 flex flex-wrap gap-1 font-mono text-[10px] text-[#94a3b8]">
                            <span>{item.configuredSpecs.processor}</span>
                            <span>•</span>
                            <span className="text-[#00f0ff]">
                              {item.configuredSpecs.ram}
                            </span>
                            <span>•</span>
                            <span>{item.configuredSpecs.storage}</span>
                            <span>•</span>
                            <span>{item.configuredSpecs.warranty}</span>
                          </div>
                        </div>
                        <div className="font-mono text-xs font-bold text-[#f8fafc] shrink-0">
                          $
                          {(item.totalPrice * item.quantity).toLocaleString(
                            "en-US"
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Promo / VIP Hardware Voucher Input */}
              <div className="py-5 border-b border-[#1f2232]">
                <label
                  htmlFor="vip-voucher-input"
                  className="block font-mono text-[10px] uppercase tracking-widest text-[#94a3b8] mb-2"
                >
                  PROMO / VIP HARDWARE VOUCHER CODE
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#00f0ff]" />
                    <input
                      id="vip-voucher-input"
                      type="text"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      placeholder="Enter VIP code (e.g. TKVIP)"
                      className="w-full rounded-xl bg-[#050507] border border-[#1f2232] pl-9 pr-3 py-2 font-mono text-xs text-[#f8fafc] uppercase placeholder-[#94a3b8]/50 focus:border-[#00f0ff] focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyVoucher}
                    className="rounded-xl bg-[#050507] border border-[#00f0ff]/40 px-4 py-2 font-mono text-xs font-bold text-[#00f0ff] hover:bg-[#00f0ff] hover:text-[#050507] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedVoucher && (
                  <p className="mt-2 font-mono text-[11px] text-emerald-400">
                    ✓ Voucher &ldquo;{appliedVoucher}&rdquo; applied (-$150.00
                    USD Founder Credit)
                  </p>
                )}
              </div>

              {/* Financial Breakdown */}
              <div className="pt-5 space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-[#94a3b8]">
                  <span>Hardware Subtotal</span>
                  <span className="font-mono font-semibold text-[#f8fafc]">
                    ${subtotal.toLocaleString("en-US")}.00
                  </span>
                </div>

                {appliedVoucher && (
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>VIP Hardware Voucher ({appliedVoucher})</span>
                    <span className="font-mono font-semibold">-$150.00</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[#94a3b8]">
                  <span>Shipping ({selectedDelivery.label.split(" (")[0]})</span>
                  <span className="font-mono font-semibold text-emerald-400">
                    {shippingCost === 0 ? "Free" : `$${shippingCost}.00`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#94a3b8]">
                  <span>Estimated Tax (8.25%)</span>
                  <span className="font-mono font-semibold text-[#f8fafc]">
                    $
                    {estimatedTax.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <div className="pt-4 border-t border-[#1f2232] flex items-baseline justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00f0ff]">
                      TOTAL AUTHORIZATION
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black text-[#f8fafc]">
                      $
                      {grandTotal.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <span className="ml-1.5 font-mono text-xs text-[#94a3b8]">
                      USD
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enterprise Guarantee Box */}
            <div className="rounded-3xl bg-[#0d0e15] border border-[#1f2232] p-5 space-y-3.5">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#00f0ff]">
                TK ENTERPRISE FOUNDRY GUARANTEES
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff]">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#f8fafc]">
                    30-Day Zero-Dead-Pixel Guarantee
                  </div>
                  <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                    Instant advance replacement courier dispatch if any sub-pixel
                    imperfection is detected within 30 days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#f8fafc]">
                    Complimentary Worldwide Courier Insurance
                  </div>
                  <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                    Every shipment is underwritten for 100% of its configured
                    hardware value from foundry dock to your desk.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </form>
      </div>

      {/* Order Confirmation Modal */}
      <OrderSuccessModal
        isOpen={orderModalOpen}
        orderNumber="TK-94821"
        purchasedItems={orderItemsForModal}
        totalCharged={confirmedSnapshot?.total ?? grandTotal}
        deliveryMethodLabel={
          confirmedSnapshot?.deliveryLabel ?? selectedDelivery.label
        }
        customerEmail={email}
        onReturnHome={() => {
          clearCart();
          setOrderModalOpen(false);
        }}
      />
    </main>
  );
}
