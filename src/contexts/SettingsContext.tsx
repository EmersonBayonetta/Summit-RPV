import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { DEFAULT_SETTINGS, settingsService } from "@/services/settings.service";
import type { AppSettings } from "@/types";

interface SettingsContextValue {
  settings: AppSettings;
  toggle: (key: keyof AppSettings) => void;
  speak: (text: string) => void;
  vibrate: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    setSettings(settingsService.get());
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("high-contrast", settings.altoContraste);
    document.documentElement.classList.toggle("large-font", settings.fonteGrande);
  }, [settings.altoContraste, settings.fonteGrande]);

  const toggle = useCallback((key: keyof AppSettings) => {
    setSettings((current) => {
      const next = { ...current, [key]: !current[key] };
      settingsService.save(next);
      return next;
    });
  }, []);

  // Simulated voice reading — logs and announces via the live region.
  const speak = useCallback(
    (text: string) => {
      if (!settings.leituraPorVoz) return;
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "pt-BR";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
    },
    [settings.leituraPorVoz],
  );

  const vibrate = useCallback(() => {
    if (!settings.vibracao) return;
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.(35);
  }, [settings.vibracao]);

  const value = useMemo(() => ({ settings, toggle, speak, vibrate }), [settings, toggle, speak, vibrate]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings deve ser usado dentro de SettingsProvider.");
  return context;
}
