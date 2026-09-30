import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TK_LAPTOPS, getLaptopBySlug } from "@/data/products";
import { ProductDetailClient } from "@/components/pdp/ProductDetailClient";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TK_LAPTOPS.map((laptop) => ({
    slug: laptop.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const laptop = getLaptopBySlug(slug);

  if (!laptop) {
    return {
      title: "Hardware Configuration Not Found",
    };
  }

  return {
    title: `${laptop.name} — Custom Hardware Configurator`,
    description: `${laptop.tagline} ${laptop.description}`,
    openGraph: {
      title: `${laptop.name} | TK Laptop`,
      description: laptop.tagline,
      images: [laptop.featuredImage],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const laptop = getLaptopBySlug(slug);

  if (!laptop) {
    notFound();
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: laptop.name,
    description: `${laptop.tagline} ${laptop.description}`,
    image: laptop.galleryImages,
    sku: `TK-${laptop.id.toUpperCase()}`,
    category: laptop.category,
    brand: {
      "@type": "Brand",
      name: "TK Laptop",
    },
    offers: {
      "@type": "Offer",
      url: `https://tklaptop.com/catalog/${laptop.slug}`,
      priceCurrency: "USD",
      price: laptop.basePrice,
      availability:
        laptop.inStock !== false
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: laptop.rating,
      reviewCount: laptop.reviewsCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <main className="flex-1 bg-[#050507]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailClient product={laptop} />
    </main>
  );
}

