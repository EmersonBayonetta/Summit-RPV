import { Link, createFileRoute } from "@tanstack/react-router";
import { Heart, MapIcon, SearchX, Settings, User } from "lucide-react";

import { AppLayout } from "@/components/AppLayout";
import { CategoryFilter } from "@/components/CategoryFilter";
import { EmptyState, Loading } from "@/components/Feedback";
import { PlaceCard } from "@/components/PlaceCard";
import { SearchBar } from "@/components/SearchBar";
import { MapCard } from "@/components/map/MapCard";
import { DISABILITY_LABEL } from "@/constants";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { usePlaceSearch } from "@/hooks/usePlaceSearch";

export const Route = createFileRoute("/inicio")({
  head: () => ({
    meta: [
      { title: "Início — AccessMap" },
      {
        name: "description",
        content: "Pesquise, filtre e descubra estabelecimentos acessíveis próximos de você no AccessMap.",
      },
      { property: "og:title", content: "Início — AccessMap" },
      { property: "og:description", content: "Descubra estabelecimentos acessíveis perto de você." },
    ],
  }),
  component: HomePage,
});

const SHORTCUTS = [
  { to: "/favoritos", label: "Favoritos", icon: Heart },
  { to: "/perfil", label: "Perfil", icon: User },
  { to: "/configuracoes", label: "Ajustes", icon: Settings },
] as const;

function HomePage() {
  const { user, isReady } = useRequireAuth();
  const { term, setTerm, category, setCategory, results, clear } = usePlaceSearch();

  if (!isReady || !user) return <Loading label="Preparando seu mapa…" />;

  return (
    <AppLayout>
      <div className="space-y-5">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Olá, {user.nome.split(" ")[0]} 👋</p>
          <h1 className="mt-1 text-2xl font-extrabold leading-tight text-foreground">
            Encontre lugares acessíveis perto de você
          </h1>
          <p className="mt-2 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
            Perfil: {DISABILITY_LABEL[user.deficiencia]}
          </p>
        </div>

        <SearchBar value={term} onChange={setTerm} onClear={clear} />

        <div className="grid grid-cols-3 gap-2.5">
          {SHORTCUTS.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-3xl border border-border bg-card text-sm font-bold text-foreground shadow-card transition-transform hover:-translate-y-0.5"
            >
              <Icon className="size-6 text-primary" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>

        <CategoryFilter value={category} onChange={setCategory} />

        <section aria-label="Mapa" className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-foreground">Mapa</h2>
            <Link to="/mapa" className="text-sm font-bold text-primary underline-offset-4 hover:underline">
              Abrir mapa completo
            </Link>
          </div>
          <MapCard places={results} height="15rem" />
        </section>

        <section aria-label="Locais encontrados" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-foreground">Locais</h2>
            <span className="rounded-full bg-muted px-3 py-1 text-sm font-bold text-muted-foreground">
              {results.length} {results.length === 1 ? "local encontrado" : "locais encontrados"}
            </span>
          </div>

          {results.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="Nenhum local encontrado"
              description="Tente outro termo de busca ou selecione a categoria Todos."
              action={
                <button
                  type="button"
                  onClick={() => {
                    clear();
                    setCategory("todos");
                  }}
                  className="min-h-12 rounded-2xl bg-primary px-6 font-bold text-primary-foreground"
                >
                  Limpar filtros
                </button>
              }
            />
          ) : (
            <ul className="space-y-3">
              {results.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </ul>
          )}
        </section>

        <Link
          to="/mapa"
          className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-primary font-extrabold text-primary-foreground shadow-float"
        >
          <MapIcon className="size-5" aria-hidden="true" />
          Ver todos no mapa
        </Link>
      </div>
    </AppLayout>
  );
}
