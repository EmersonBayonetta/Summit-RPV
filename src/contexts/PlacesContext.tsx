import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { favoriteService } from "@/services/favorite.service";
import { placeService } from "@/services/place.service";
import { reviewService, type CreateReviewInput } from "@/services/review.service";
import type { Place, Review } from "@/types";
import { averageRating } from "@/utils/format";

interface PlacesContextValue {
  places: Place[];
  favorites: string[];
  reviews: Review[];
  isFavorite: (placeId: string) => boolean;
  toggleFavorite: (placeId: string) => void;
  addReview: (input: Omit<CreateReviewInput, "userId" | "userName">) => void;
  reviewsOf: (placeId: string) => Review[];
  ratingOf: (place: Place) => { nota: number; total: number };
}

const PlacesContext = createContext<PlacesContextValue | null>(null);

export function PlacesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [places, setPlaces] = useState<Place[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    setPlaces(placeService.list());
    setReviews(reviewService.list());
  }, []);

  useEffect(() => {
    setFavorites(user ? favoriteService.list(user.id) : []);
  }, [user]);

  const isFavorite = useCallback((placeId: string) => favorites.includes(placeId), [favorites]);

  const toggleFavorite = useCallback(
    (placeId: string) => {
      if (!user) return;
      setFavorites(favoriteService.toggle(user.id, placeId));
    },
    [user],
  );

  const addReview = useCallback(
    (input: Omit<CreateReviewInput, "userId" | "userName">) => {
      if (!user) return;
      setReviews(reviewService.create({ ...input, userId: user.id, userName: user.nome }));
    },
    [user],
  );

  const reviewsOf = useCallback(
    (placeId: string) =>
      reviews
        .filter((review) => review.placeId === placeId)
        .sort((a, b) => b.criadoEm.localeCompare(a.criadoEm)),
    [reviews],
  );

  const ratingOf = useCallback(
    (place: Place) => {
      const local = reviews.filter((review) => review.placeId === place.id);
      if (!local.length) return { nota: place.nota, total: place.quantidadeAvaliacoes };
      const combined =
        (place.nota * place.quantidadeAvaliacoes + local.reduce((sum, r) => sum + r.nota, 0)) /
        (place.quantidadeAvaliacoes + local.length);
      return {
        nota: Number(combined.toFixed(1)) || averageRating(local.map((r) => r.nota)),
        total: place.quantidadeAvaliacoes + local.length,
      };
    },
    [reviews],
  );

  const value = useMemo(
    () => ({ places, favorites, reviews, isFavorite, toggleFavorite, addReview, reviewsOf, ratingOf }),
    [places, favorites, reviews, isFavorite, toggleFavorite, addReview, reviewsOf, ratingOf],
  );

  return <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>;
}

export function usePlaces() {
  const context = useContext(PlacesContext);
  if (!context) throw new Error("usePlaces deve ser usado dentro de PlacesProvider.");
  return context;
}
