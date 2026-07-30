import { useNavigate } from "@tanstack/react-router";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { RatingStars } from "@/components/RatingStars";
import { CATEGORY_LABEL, MAP_CENTER } from "@/constants";
import type { Place } from "@/types";
import { accessibilityScore } from "@/utils/accessibility";

/** Inline SVG marker so the map needs no external image assets. */
const markerIcon = (score: number) =>
  L.divIcon({
    className: "",
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -30],
    html: `<span style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${
      score >= 70 ? "#16a34a" : score >= 40 ? "#eab308" : "#dc2626"
    };box-shadow:0 6px 14px rgba(15,23,42,.35);border:2px solid #fff"><span style="transform:rotate(45deg);color:#fff;font-weight:800;font-size:11px">${score}</span></span>`,
  });

interface PlacesMapProps {
  places: Place[];
  center?: [number, number];
  zoom?: number;
  className?: string;
}

export default function PlacesMap({ places, center, zoom = 13, className }: PlacesMapProps) {
  const navigate = useNavigate();

  return (
    <MapContainer
      center={center ?? MAP_CENTER}
      zoom={zoom}
      scrollWheelZoom
      className={className ?? "h-full w-full"}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place) => {
        const score = accessibilityScore(place);
        return (
          <Marker key={place.id} position={[place.latitude, place.longitude]} icon={markerIcon(score)}>
            <Popup>
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                {CATEGORY_LABEL[place.categoria]}
              </p>
              <p className="mt-0.5 text-base font-bold text-foreground">{place.nome}</p>
              <span className="mt-1 flex items-center gap-2">
                <RatingStars value={place.nota} />
                <span className="text-sm font-semibold text-foreground">{place.nota.toFixed(1)}</span>
              </span>
              <p className="mt-1 text-xs font-semibold text-muted-foreground">{score}% acessível</p>
              <button
                type="button"
                onClick={() => navigate({ to: "/local/$placeId", params: { placeId: place.id } })}
                className="mt-3 w-full rounded-xl bg-primary px-3 py-2 text-sm font-bold text-primary-foreground"
              >
                Ver detalhes
              </button>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
