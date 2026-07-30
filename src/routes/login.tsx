import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Accessibility } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { APP_NAME, APP_SLOGAN } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";

const schema = z.object({
  email: z.string().min(1, "Informe seu e-mail.").email("Digite um e-mail válido."),
  senha: z.string().min(1, "Informe sua senha."),
});

type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — AccessMap" },
      { name: "description", content: "Acesse sua conta do AccessMap e encontre lugares acessíveis." },
      { property: "og:title", content: "Entrar — AccessMap" },
      { property: "og:description", content: "Acesse sua conta do AccessMap." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn, user, isReady } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: "", senha: "" } });

  useEffect(() => {
    if (isReady && user) navigate({ to: "/inicio", replace: true });
  }, [isReady, user, navigate]);

  const onSubmit = (values: FormValues) => {
    try {
      const authenticated = signIn(values);
      toast.success(`Bem-vindo de volta, ${authenticated.nome.split(" ")[0]}!`);
      navigate({ to: "/inicio", replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível entrar.");
    }
  };

  return (
    <div className="min-h-dvh bg-background">
      <div className="app-shell px-6 py-12">
        <div className="flex flex-col items-center text-center">
          <span className="flex size-16 items-center justify-center rounded-3xl bg-primary text-primary-foreground">
            <Accessibility className="size-9" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-3xl font-extrabold text-foreground">{APP_NAME}</h1>
          <p className="mt-2 text-sm font-medium text-muted-foreground">{APP_SLOGAN}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-bold text-foreground">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
              className="h-14 w-full rounded-2xl border border-border bg-card px-4 text-base text-foreground outline-none focus:border-primary"
              placeholder="voce@email.com"
            />
            {errors.email && <p className="mt-1.5 text-sm font-semibold text-danger">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="senha" className="mb-2 block text-sm font-bold text-foreground">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              autoComplete="current-password"
              aria-invalid={!!errors.senha}
              {...register("senha")}
              className="h-14 w-full rounded-2xl border border-border bg-card px-4 text-base text-foreground outline-none focus:border-primary"
              placeholder="••••••••"
            />
            {errors.senha && <p className="mt-1.5 text-sm font-semibold text-danger">{errors.senha.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-14 w-full rounded-2xl bg-primary text-base font-extrabold text-primary-foreground shadow-float transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            Entrar
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-medium text-muted-foreground">
          Ainda não tem conta?{" "}
          <Link to="/cadastro" className="font-extrabold text-primary underline-offset-4 hover:underline">
            Criar conta gratuita
          </Link>
        </p>
      </div>
    </div>
  );
}
