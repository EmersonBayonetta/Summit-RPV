import { STORAGE_KEYS } from "@/constants";
import { storage } from "@/storage/storage";

type FavoritesMap = Record<string, string[]>;

const read = (): FavoritesMap => storage.read<FavoritesMap>(STORAGE_KEYS.favorites, {});

export const favoriteService = {
  list: (userId: string): string[] => read()[userId] ?? [],

  toggle: (userId: string, placeId: string): string[] => {
    const all = read();
    const current = all[userId] ?? [];
    const next = current.includes(placeId)
      ? current.filter((id) => id !== placeId)
      : [...current, placeId];
    storage.write<FavoritesMap>(STORAGE_KEYS.favorites, { ...all, [userId]: next });
    return next;
  },

  clear: (userId: string) => {
    const all = read();
    storage.write<FavoritesMap>(STORAGE_KEYS.favorites, { ...all, [userId]: [] });
  },
};
