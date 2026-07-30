import { STORAGE_KEYS } from "@/constants";
import { MOCK_PLACES } from "@/mock/places";
import { storage } from "@/storage/storage";
import type { Place } from "@/types";

/**
 * Places are seeded into local storage on first run so the dataset behaves
 * exactly like a remote collection would (read, find, update).
 */
const seed = (): Place[] => {
  const stored = storage.read<Place[] | null>(STORAGE_KEYS.places, null);
  if (stored && stored.length > 0) return stored;
  storage.write(STORAGE_KEYS.places, MOCK_PLACES);
  return MOCK_PLACES;
};

export const placeService = {
  list: (): Place[] => seed(),
  findById: (id: string): Place | null => seed().find((place) => place.id === id) ?? null,
  listByIds: (ids: string[]): Place[] => seed().filter((place) => ids.includes(place.id)),
};
