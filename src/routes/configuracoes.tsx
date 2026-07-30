import { createFileRoute } from "@tanstack/react-router";
import { Contrast, Type, Volume2, Vibrate, WifiOff, type LucideIcon } from "lucide-react";

import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Feedback";
import { useSettings } from "@/contexts/SettingsContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import type { AppSettings } from "@/types";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — AccessMap" },
      { name: "description", content: "Ajuste contraste, tamanho da fonte, leitura por voz e vibração no AccessMap." },
      { property: "og:title", content: "Configurações — AccessMap" },
      { property: "og:description", content: "Personalize a acessibilidade do aplicativo." },
    ],
  }),
  component: SettingsPage,
});

const OPTIONS: { key: keyof AppSettings; label: string; description: string; icon: LucideIcon }[] = [
  {
    key: "altoContraste",
    label: "Modo alto contraste",
    description: "Aumenta o contraste entre textos, fundos e bordas.",
    icon: Contrast,
  },
  { key: "fonteGrande", label: "Fonte grande", description: "Amplia o tamanho dos textos do aplicativo.", icon: Type },
  {
    key: "leituraPorVoz",
    label: "Leitura por voz (simulada)",
    description: "Anuncia ações importantes em voz alta.",
    icon: Volume2,
  },
  {
    key: "vibracao",
    label: "Vibração (simulada)",
    description: "Retorno tátil ao favoritar e avaliar locais.",
    icon: Vibrate,
  },
];

function SettingsPage() {
  const { user, isReady } = useRequireAuth();
  const { settings, toggle, speak, vibrate } = useSettings();

  if (!isReady || !user) return <Loading />;

  return (
    <div className="min-h-dvh bg-background pb-24">
      <Header title="Configurações" subtitle="Preferências de acessibilidade" backTo="/inicio" />
      <main className="app-shell space-y-3 px-5 py-5">
        {OPTIONS.map(({ key, label, description, icon: Icon }) => {
          const active = settings[key];
          return (
            <div
              key={key}
              className="flex items-center gap-4 rounded-3xl border border-border bg-card p-4 shadow-card"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-bold text-foreground">{label}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={active}
                aria-label={label}
                onClick={() => {
                  toggle(key);
                  vibrate();
                  speak(`${label} ${active ? "desativado" : "ativado"}`);
                }}
                className={`relative h-9 w-16 shrink-0 rounded-full border transition-colors ${
                  active ? "border-primary bg-primary" : "border-border bg-muted"
                }`}
              >
                <span
                  className={`absolute top-1 size-7 rounded-full bg-card shadow transition-all ${
                    active ? "left-8" : "left-1"
                  }`}
                />
              </button>
            </div>
          );
        })}

        <div className="flex items-start gap-3 rounded-3xl border border-success/25 bg-success-soft p-4 text-success">
          <WifiOff className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p className="text-sm font-semibold">
            O AccessMap funciona 100% offline. Contas, favoritos, avaliações e preferências ficam salvos apenas
            neste dispositivo.
          </p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
