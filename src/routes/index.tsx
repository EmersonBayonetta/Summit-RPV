import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Accessibility } from "lucide-react";
import { useEffect } from "react";

import { APP_NAME, APP_SLOGAN } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AccessMap — Acessibilidade começa pela informação" },
      {
        name: "description",
        content:
          "AccessMap ajuda pessoas com deficiência a encontrar estabelecimentos acessíveis por perto, totalmente offline.",
      },
      { property: "og:title", content: "AccessMap — Acessibilidade começa pela informação" },
      {
        property: "og:description",
        content: "Encontre lugares acessíveis, avalie e favorite. Funciona 100% offline.",
      },
    ],
  }),
  component: SplashPage,
});

function SplashPage() {
  const { user, isReady } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isReady) return;
    const timer = window.setTimeout(() => {
      navigate({ to: user ? "/inicio" : "/login", replace: true });
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [isReady, user, navigate]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-primary px-8 text-center">
      <span className="flex size-28 animate-in zoom-in-50 items-center justify-center rounded-4xl bg-primary-foreground/15 ring-4 ring-primary-foreground/25 duration-700">
        <Accessibility className="size-16 text-primary-foreground" aria-hidden="true" />
      </span>
      <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-primary-foreground">{APP_NAME}</h1>
      <p className="mt-3 max-w-xs text-base font-medium text-primary-foreground/85">{APP_SLOGAN}</p>
      <div className="mt-10 flex gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="size-2.5 animate-pulse rounded-full bg-primary-foreground/70"
            style={{ animationDelay: `${dot * 160}ms` }}
          />
        ))}
      </div>
      <p className="sr-only" role="status">
        Carregando o AccessMap
      </p>
    </div>
  );
}
