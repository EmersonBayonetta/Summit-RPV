import { Suspense, lazy, useEffect, useState } from "react";

import type { Place } from "@/types";

// Leaflet touches `window` at import time, so it is only loaded in the browser.
const PlacesMap = lazy(() => import("@/components/map/PlacesMap"));

interface MapCardProps {
  places: Place[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  rounded?: boolean;
}

const Skeleton = ({ height, rounded }: { height: string; rounded?: boolean }) => (
  <div
    className={`w-full animate-pulse bg-muted ${rounded ? "rounded-3xl" : ""}`}
    style={{ height }}
    aria-hidden="true"
  />
);

export function MapCard({ places, center, zoom, height = "16rem", rounded = true }: MapCardProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <Skeleton height={height} rounded={rounded} />;

  return (
    <div
      className={`overflow-hidden ${rounded ? "rounded-3xl border border-border shadow-card" : ""}`}
      style={{ height }}
      role="region"
      aria-label="Mapa de estabelecimentos acessíveis"
    >
      <Suspense fallback={<Skeleton height={height} />}>
        <PlacesMap places={places} center={center} zoom={zoom} />
      </Suspense>
    </div>
  );
}
