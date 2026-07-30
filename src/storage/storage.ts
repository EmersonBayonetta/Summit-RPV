/**
 * Low level persistence adapter.
 *
 * This is the ONLY module in the app that touches localStorage. Swapping it
 * for a remote backend later means reimplementing this interface only.
 */
export interface StorageAdapter {
  read<T>(key: string, fallback: T): T;
  write<T>(key: string, value: T): void;
  remove(key: string): void;
}

const isBrowser = () => typeof window !== "undefined" && !!window.localStorage;

export const localStorageAdapter: StorageAdapter = {
  read<T>(key: string, fallback: T): T {
    if (!isBrowser()) return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  write<T>(key: string, value: T) {
    if (!isBrowser()) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or unavailable */
    }
  },
  remove(key: string) {
    if (!isBrowser()) return;
    window.localStorage.removeItem(key);
  },
};

export const storage: StorageAdapter = localStorageAdapter;
