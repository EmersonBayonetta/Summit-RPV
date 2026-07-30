import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

import { AccessibilityScore } from "@/components/AccessibilityScore";
import { FavoriteButton } from "@/components/FavoriteButton";
import { RatingStars } from "@/components/RatingStars";
import { CATEGORY_LABEL } from "@/constants";
import { usePlaces } from "@/contexts/PlacesContext";
import type { Place } from "@/types";
import { accessibilityScore } from "@/utils/accessibility";

export function PlaceCard({ place }: { place: Place }) {
  const { ratingOf } = usePlaces();
  const rating = ratingOf(place);
  const score = accessibilityScore(place);

  return (
    <li>
      <Link
        to="/local/$placeId"
        params={{ placeId: place.id }}
        className="flex gap-4 rounded-3xl border border-border bg-card p-3.5 shadow-card transition-transform hover:-translate-y-0.5"
      >
        <img
          src={place.imagem}
          alt={`Imagem ilustrativa de ${place.nome}`}
          loading="lazy"
          className="size-24 shrink-0 rounded-2xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                {CATEGORY_LABEL[place.categoria]}
              </p>
              <h3 className="truncate text-base font-bold text-foreground">{place.nome}</h3>
            </div>
            <FavoriteButton placeId={place.id} placeName={place.nome} className="size-9 shrink-0" />
          </div>
          <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0" aria-hidden="true" />
            {place.endereco}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <RatingStars value={rating.nota} />
            <span className="text-sm font-semibold text-foreground">{rating.nota.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({rating.total})</span>
            <AccessibilityScore score={score} compact />
          </div>
        </div>
      </Link>
    </li>
  );
}
