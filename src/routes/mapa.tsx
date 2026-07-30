import { createFileRoute } from "@tanstack/react-router";

import { BottomNav } from "@/components/BottomNav";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Feedback";
import { SearchBar } from "@/components/SearchBar";
import { MapCard } from "@/components/map/MapCard";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { usePlaceSearch } from "@/hooks/usePlaceSearch";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa — AccessMap" },
      {
        name: "description",
        content: "Veja no mapa interativo os estabelecimentos acessíveis e abra os detalhes de cada local.",
      },
      { property: "og:title", content: "Mapa — AccessMap" },
      { property: "og:description", content: "Mapa interativo de locais acessíveis." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const { user, isReady } = useRequireAuth();
  const { term, setTerm, category, setCategory, results, clear } = usePlaceSearch();

  if (!isReady || !user) return <Loading label="Carregando mapa…" />;

  return (
    <div className="min-h-dvh bg-background pb-24">
      <Header title="Mapa" subtitle={`${results.length} locais no mapa`} backTo="/inicio" />
      <div className="app-shell space-y-4 px-5 py-4">
        <SearchBar value={term} onChange={setTerm} onClear={clear} />
        <CategoryFilter value={category} onChange={setCategory} />
        <MapCard places={results} height="calc(100dvh - 22rem)" />
        <p className="text-center text-xs font-medium text-muted-foreground">
          Toque em um marcador para ver a nota e abrir os detalhes do local.
        </p>
      </div>
      <BottomNav />
    </div>
  );
}
