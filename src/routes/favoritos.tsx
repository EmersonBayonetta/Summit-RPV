import { Link, createFileRoute } from "@tanstack/react-router";
import { HeartOff } from "lucide-react";

import { BottomNav } from "@/components/BottomNav";
import { EmptyState, Loading } from "@/components/Feedback";
import { Header } from "@/components/Header";
import { PlaceCard } from "@/components/PlaceCard";
import { usePlaces } from "@/contexts/PlacesContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos — AccessMap" },
      { name: "description", content: "Seus estabelecimentos acessíveis favoritos, salvos neste dispositivo." },
      { property: "og:title", content: "Favoritos — AccessMap" },
      { property: "og:description", content: "Acesse rapidamente os locais que você salvou." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { user, isReady } = useRequireAuth();
  const { places, favorites } = usePlaces();

  if (!isReady || !user) return <Loading />;

  const favoritePlaces = places.filter((place) => favorites.includes(place.id));

  return (
    <div className="min-h-dvh bg-background pb-24">
      <Header
        title="Favoritos"
        subtitle={`${favoritePlaces.length} ${favoritePlaces.length === 1 ? "local salvo" : "locais salvos"}`}
        backTo="/inicio"
      />
      <main className="app-shell px-5 py-5">
        {favoritePlaces.length === 0 ? (
          <EmptyState
            icon={HeartOff}
            title="Nenhum favorito ainda"
            description="Toque no coração de um local para salvá-lo e encontrá-lo rapidamente depois."
            action={
              <Link
                to="/inicio"
                className="inline-flex min-h-12 items-center rounded-2xl bg-primary px-6 font-bold text-primary-foreground"
              >
                Explorar locais
              </Link>
            }
          />
        ) : (
          <ul className="space-y-3">
            {favoritePlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </ul>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
