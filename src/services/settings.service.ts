import { STORAGE_KEYS } from "@/constants";
import { storage } from "@/storage/storage";
import type { AppSettings } from "@/types";

export const DEFAULT_SETTINGS: AppSettings = {
  altoContraste: false,
  fonteGrande: false,
  leituraPorVoz: false,
  vibracao: false,
};

export const settingsService = {
  get: (): AppSettings => ({
    ...DEFAULT_SETTINGS,
    ...storage.read<Partial<AppSettings>>(STORAGE_KEYS.settings, {}),
  }),
  save: (settings: AppSettings) => storage.write(STORAGE_KEYS.settings, settings),
};
