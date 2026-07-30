import { createFileRoute, notFound } from "@tanstack/react-router";
import { Clock, MapPin, MessageSquarePlus, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AccessibilityBadge } from "@/components/AccessibilityBadge";
import { AccessibilityScore } from "@/components/AccessibilityScore";
import { FavoriteButton } from "@/components/FavoriteButton";
import { EmptyState, Loading } from "@/components/Feedback";
import { Header } from "@/components/Header";
import { RatingStars } from "@/components/RatingStars";
import { MapCard } from "@/components/map/MapCard";
import { ACCESSIBILITY_FEATURES, CATEGORY_LABEL, PRIORITY_FEATURES } from "@/constants";
import { usePlaces } from "@/contexts/PlacesContext";
import { useSettings } from "@/contexts/SettingsContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { accessibilityScore } from "@/utils/accessibility";
import { formatDate } from "@/utils/format";

export const Route = createFileRoute("/local/$placeId")({
  head: () => ({
    meta: [
      { title: "Detalhes do local — AccessMap" },
      {
        name: "description",
        content: "Veja recursos de acessibilidade, percentual acessível, avaliações e localização do estabelecimento.",
      },
      { property: "og:title", content: "Detalhes do local — AccessMap" },
      { property: "og:description", content: "Recursos de acessibilidade e avaliações do estabelecimento." },
    ],
  }),
  component: PlaceDetailPage,
  notFoundComponent: () => (
    <div className="app-shell px-5 py-16">
      <EmptyState icon={MapPin} title="Local não encontrado" description="Este estabelecimento não existe mais." />
    </div>
  ),
});

function PlaceDetailPage() {
  const { placeId } = Route.useParams();
  const { user, isReady } = useRequireAuth();
  const { places, reviewsOf, ratingOf, addReview } = usePlaces();
  const { speak, vibrate } = useSettings();
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState("");

  const place = useMemo(() => places.find((item) => item.id === placeId), [places, placeId]);

  if (!isReady || !user || places.length === 0) return <Loading />;
  if (!place) throw notFound();

  const reviews = reviewsOf(place.id);
  const rating = ratingOf(place);
  const score = accessibilityScore(place);
  const priorities = PRIORITY_FEATURES[user.deficiencia] ?? [];

  const handleSubmit = () => {
    if (!comentario.trim()) {
      toast.error("Escreva um comentário sobre a sua experiência.");
      return;
    }
    addReview({ placeId: place.id, nota, comentario });
    setComentario("");
    setNota(5);
    vibrate();
    speak("Avaliação registrada");
    toast.success("Avaliação registrada!");
  };

  return (
    <div className="min-h-dvh bg-background pb-16">
      <Header
        title={place.nome}
        subtitle={CATEGORY_LABEL[place.categoria]}
        backTo="/inicio"
        action={<FavoriteButton placeId={place.id} placeName={place.nome} />}
      />

      <main className="app-shell space-y-5 px-5 py-5">
        <img
          src={place.imagem}
          alt={`Imagem ilustrativa de ${place.nome}`}
          className="h-48 w-full rounded-3xl object-cover shadow-card"
        />

        <section className="rounded-3xl border border-border bg-card p-5 shadow-card">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">
            {CATEGORY_LABEL[place.categoria]}
          </p>
          <h2 className="mt-1 text-2xl font-extrabold leading-tight text-foreground">{place.nome}</h2>
          <div className="mt-2 flex items-center gap-2">
            <RatingStars value={rating.nota} size="md" />
            <span className="text-base font-bold text-foreground">{rating.nota.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({rating.total} avaliações)</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{place.descricao}</p>

          <ul className="mt-4 space-y-2.5 text-sm font-medium text-foreground">
            <li className="flex items-center gap-3">
              <MapPin className="size-5 shrink-0 text-primary" aria-hidden="true" />
              {place.endereco}
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <a href={`tel:${place.telefone.replace(/\D/g, "")}`} className="underline-offset-4 hover:underline">
                {place.telefone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="size-5 shrink-0 text-primary" aria-hidden="true" />
              {place.horario}
            </li>
          </ul>
        </section>

        <AccessibilityScore score={score} />

        <section aria-label="Recursos de acessibilidade" className="space-y-3">
          <h2 className="text-lg font-extrabold text-foreground">Recursos de acessibilidade</h2>
          <ul className="space-y-2">
            {ACCESSIBILITY_FEATURES.map((feature) => (
              <AccessibilityBadge
                key={feature.id}
                label={feature.label}
                available={place.acessibilidade[feature.id]}
                highlighted={priorities.includes(feature.id)}
              />
            ))}
          </ul>
          <p className="text-xs font-medium text-muted-foreground">
            Itens destacados são prioritários para o seu perfil de acessibilidade.
          </p>
        </section>

        <section aria-label="Localização" className="space-y-2">
          <h2 className="text-lg font-extrabold text-foreground">Localização</h2>
          <MapCard places={[place]} center={[place.latitude, place.longitude]} zoom={16} height="14rem" />
        </section>

        <section aria-label="Avaliações" className="space-y-3">
          <h2 className="text-lg font-extrabold text-foreground">Avaliações ({reviews.length})</h2>

          <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
            <p className="text-sm font-bold text-foreground">Sua nota</p>
            <RatingStars value={nota} size="lg" editable onChange={setNota} label="Sua nota para este local" />
            <label htmlFor="comentario" className="mt-4 mb-2 block text-sm font-bold text-foreground">
              Comentário
            </label>
            <textarea
              id="comentario"
              value={comentario}
              onChange={(event) => setComentario(event.target.value)}
              rows={3}
              placeholder="Conte como foi a sua experiência de acessibilidade neste local."
              className="w-full rounded-2xl border border-border bg-background p-4 text-base text-foreground outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-3 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary font-extrabold text-primary-foreground"
            >
              <MessageSquarePlus className="size-5" aria-hidden="true" />
              Enviar avaliação
            </button>
          </div>

          {reviews.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-border bg-card p-5 text-center text-sm font-medium text-muted-foreground">
              Ainda não há avaliações da comunidade neste dispositivo. Seja a primeira pessoa a avaliar!
            </p>
          ) : (
            <ul className="space-y-3">
              {reviews.map((review) => (
                <li key={review.id} className="rounded-3xl border border-border bg-card p-4 shadow-card">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-bold text-foreground">{review.userName}</p>
                    <span className="shrink-0 text-xs font-medium text-muted-foreground">
                      {formatDate(review.criadoEm)}
                    </span>
                  </div>
                  <RatingStars value={review.nota} />
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.comentario}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
