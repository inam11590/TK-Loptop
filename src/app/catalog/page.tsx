import React, { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogClient } from "@/components/catalog/CatalogClient";

export const metadata: Metadata = {
  title: "The TK Fleet — All Configurations",
  description:
    "Filter the TK Laptop fleet by silicon tier, thermal architecture, memory bandwidth, and display calibration. Compare up to 3 flagship workstations side-by-side.",
};

interface CatalogPageProps {
  searchParams: Promise<{ series?: string; q?: string }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedParams = await searchParams;

  return (
    <main className="flex-1 bg-[#050507]">
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-24 text-center font-mono text-sm text-[#00f0ff]">
            INITIALIZING TK FLEET TELEMETRY MATRIX...
          </div>
        }
      >
        <CatalogClient
          initialSeriesParam={resolvedParams.series}
          initialSearchParam={resolvedParams.q}
        />
      </Suspense>
    </main>
  );
}
