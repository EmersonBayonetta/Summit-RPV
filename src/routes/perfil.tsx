import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Heart, LogOut, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { BottomNav } from "@/components/BottomNav";
import { Loading } from "@/components/Feedback";
import { Header } from "@/components/Header";
import { DISABILITY_LABEL, DISABILITY_OPTIONS } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import { usePlaces } from "@/contexts/PlacesContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import type { DisabilityType } from "@/types";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — AccessMap" },
      { name: "description", content: "Gerencie seus dados e o seu perfil de acessibilidade no AccessMap." },
      { property: "og:title", content: "Perfil — AccessMap" },
      { property: "og:description", content: "Gerencie seus dados e preferências de acessibilidade." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, isReady } = useRequireAuth();
  const { updateProfile, signOut } = useAuth();
  const { favorites, reviews } = usePlaces();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [deficiencia, setDeficiencia] = useState<DisabilityType>("cadeirante");

  useEffect(() => {
    if (!user) return;
    setNome(user.nome);
    setEmail(user.email);
    setDeficiencia(user.deficiencia);
  }, [user]);

  if (!isReady || !user) return <Loading />;

  const myReviews = reviews.filter((review) => review.userId === user.id);
  const initials = user.nome
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  const handleSave = () => {
    try {
      updateProfile({ nome, email, deficiencia });
      setEditing(false);
      toast.success("Perfil atualizado!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível salvar.");
    }
  };

  const field = "h-14 w-full rounded-2xl border border-border bg-card px-4 text-base text-foreground outline-none focus:border-primary";

  return (
    <div className="min-h-dvh bg-background pb-24">
      <Header title="Perfil" backTo="/inicio" />
      <main className="app-shell space-y-5 px-5 py-5">
        <section className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-card">
          <span
            aria-hidden="true"
            className="flex size-20 items-center justify-center rounded-3xl bg-primary text-2xl font-extrabold text-primary-foreground"
          >
            {initials}
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-xl font-extrabold text-foreground">{user.nome}</h2>
            <p className="truncate text-sm text-muted-foreground">{user.email}</p>
            <p className="mt-2 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
              {DISABILITY_LABEL[user.deficiencia]}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl border border-border bg-card p-4 shadow-card">
            <Heart className="size-6 text-danger" aria-hidden="true" />
            <p className="mt-2 text-2xl font-extrabold text-foreground">{favorites.length}</p>
            <p className="text-sm font-medium text-muted-foreground">Favoritos</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-4 shadow-card">
            <Star className="size-6 text-warning" aria-hidden="true" />
            <p className="mt-2 text-2xl font-extrabold text-foreground">{myReviews.length}</p>
            <p className="text-sm font-medium text-muted-foreground">Avaliações</p>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-5 shadow-card">
          <h2 className="text-lg font-extrabold text-foreground">Dados da conta</h2>

          {editing ? (
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="perfil-nome" className="mb-2 block text-sm font-bold text-foreground">
                  Nome
                </label>
                <input
                  id="perfil-nome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="perfil-email" className="mb-2 block text-sm font-bold text-foreground">
                  E-mail
                </label>
                <input
                  id="perfil-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={field}
                />
              </div>
              <fieldset>
                <legend className="mb-3 text-sm font-bold text-foreground">Tipo de deficiência</legend>
                <div className="grid grid-cols-2 gap-2.5">
                  {DISABILITY_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={deficiencia === option.id}
                      onClick={() => setDeficiencia(option.id)}
                      className={`min-h-12 rounded-2xl border px-3 text-sm font-bold transition-colors ${
                        deficiencia === option.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  className="min-h-13 h-13 flex-1 rounded-2xl bg-primary py-3.5 font-extrabold text-primary-foreground"
                >
                  Salvar alterações
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="h-13 rounded-2xl border border-border px-5 py-3.5 font-bold text-foreground"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="mt-4 min-h-14 w-full rounded-2xl border border-primary/40 bg-primary-soft font-extrabold text-primary"
            >
              Editar perfil
            </button>
          )}
        </section>

        <button
          type="button"
          onClick={() => {
            signOut();
            navigate({ to: "/login", replace: true });
          }}
          className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-danger/30 bg-danger-soft font-extrabold text-danger"
        >
          <LogOut className="size-5" aria-hidden="true" />
          Sair da conta
        </button>
      </main>
      <BottomNav />
    </div>
  );
}
