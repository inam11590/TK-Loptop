import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tklaptop.com"),
  title: {
    default: "TK Laptop | Engineered for Extreme Performance",
    template: "%s | TK Laptop",
  },
  description:
    "Custom-configured neural workstations, high-FPS gaming laptops, and ultraportable machines milled from space-grade titanium.",
  keywords: [
    "TK Laptop",
    "luxury laptops",
    "AI workstation",
    "neural workstation",
    "gaming laptops",
    "titanium laptop",
    "engineering hardware",
    "Titan X1",
    "Blade Stealth",
    "Pro Studio",
  ],
  openGraph: {
    title: "TK Laptop | Engineered for Extreme Performance",
    description:
      "Custom-configured neural workstations, high-FPS gaming laptops, and ultraportable machines milled from space-grade titanium.",
    url: "https://tklaptop.com",
    siteName: "TK Laptop",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TK Laptop | Engineered for Extreme Performance",
    description:
      "Custom-configured neural workstations, high-FPS gaming laptops, and ultraportable machines milled from space-grade titanium.",
    creator: "@tklaptop",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#050507] text-[#f8fafc] selection:bg-[#00f0ff]/20 selection:text-[#00f0ff] flex flex-col"
      >
        <CartProvider>
          <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            <Navbar />
            <div className="flex-1 flex flex-col">{children}</div>
            <Footer />
            <CartDrawer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

