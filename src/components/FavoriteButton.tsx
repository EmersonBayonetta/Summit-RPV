import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { usePlaces } from "@/contexts/PlacesContext";
import { useSettings } from "@/contexts/SettingsContext";

interface FavoriteButtonProps {
  placeId: string;
  placeName: string;
  className?: string;
}

export function FavoriteButton({ placeId, placeName, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = usePlaces();
  const { speak, vibrate } = useSettings();
  const active = isFavorite(placeId);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(placeId);
        vibrate();
        speak(active ? `${placeName} removido dos favoritos` : `${placeName} adicionado aos favoritos`);
      }}
      aria-pressed={active}
      aria-label={active ? `Remover ${placeName} dos favoritos` : `Adicionar ${placeName} aos favoritos`}
      className={cn(
        "flex size-11 items-center justify-center rounded-full border bg-card transition-colors",
        active ? "border-danger/30 text-danger" : "border-border text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      <Heart className={cn("size-5", active && "fill-danger")} aria-hidden="true" />
    </button>
  );
}
