import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { DISABILITY_OPTIONS } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import type { DisabilityType } from "@/types";

const schema = z
  .object({
    nome: z.string().min(3, "Informe seu nome completo."),
    email: z.string().min(1, "Informe seu e-mail.").email("Digite um e-mail válido."),
    senha: z.string().min(6, "A senha deve ter ao menos 6 caracteres."),
    confirmarSenha: z.string().min(1, "Confirme sua senha."),
    deficiencia: z.string().min(1, "Selecione o seu perfil de acessibilidade."),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    path: ["confirmarSenha"],
    message: "As senhas não são iguais.",
  });

type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar conta — AccessMap" },
      {
        name: "description",
        content: "Crie sua conta no AccessMap e receba recomendações de locais acessíveis para o seu perfil.",
      },
      { property: "og:title", content: "Criar conta — AccessMap" },
      { property: "og:description", content: "Cadastre-se e personalize sua busca por acessibilidade." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", email: "", senha: "", confirmarSenha: "", deficiencia: "" },
  });

  const deficiencia = watch("deficiencia");

  const onSubmit = (values: FormValues) => {
    try {
      signUp({
        nome: values.nome,
        email: values.email,
        senha: values.senha,
        deficiencia: values.deficiencia as DisabilityType,
      });
      toast.success("Conta criada com sucesso!");
      navigate({ to: "/inicio", replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível criar a conta.");
    }
  };

  const field = "h-14 w-full rounded-2xl border border-border bg-card px-4 text-base text-foreground outline-none focus:border-primary";

  return (
    <div className="min-h-dvh bg-background">
      <div className="app-shell px-6 py-10">
        <h1 className="text-3xl font-extrabold text-foreground">Criar conta</h1>
        <p className="mt-2 text-sm font-medium text-muted-foreground">
          Seus dados ficam salvos apenas neste dispositivo.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
          <div>
            <label htmlFor="nome" className="mb-2 block text-sm font-bold text-foreground">
              Nome
            </label>
            <input id="nome" {...register("nome")} className={field} placeholder="Seu nome completo" />
            {errors.nome && <p className="mt-1.5 text-sm font-semibold text-danger">{errors.nome.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-bold text-foreground">
              E-mail
            </label>
            <input id="email" type="email" {...register("email")} className={field} placeholder="voce@email.com" />
            {errors.email && <p className="mt-1.5 text-sm font-semibold text-danger">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="senha" className="mb-2 block text-sm font-bold text-foreground">
              Senha
            </label>
            <input id="senha" type="password" {...register("senha")} className={field} placeholder="Mínimo 6 caracteres" />
            {errors.senha && <p className="mt-1.5 text-sm font-semibold text-danger">{errors.senha.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmarSenha" className="mb-2 block text-sm font-bold text-foreground">
              Confirmar senha
            </label>
            <input
              id="confirmarSenha"
              type="password"
              {...register("confirmarSenha")}
              className={field}
              placeholder="Repita a senha"
            />
            {errors.confirmarSenha && (
              <p className="mt-1.5 text-sm font-semibold text-danger">{errors.confirmarSenha.message}</p>
            )}
          </div>

          <fieldset>
            <legend className="mb-3 text-sm font-bold text-foreground">Tipo de deficiência</legend>
            <div className="grid grid-cols-2 gap-2.5">
              {DISABILITY_OPTIONS.map((option) => {
                const active = deficiencia === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setValue("deficiencia", option.id, { shouldValidate: true })}
                    className={`min-h-14 rounded-2xl border px-3 py-3 text-sm font-bold transition-colors ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/40"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            {errors.deficiencia && (
              <p className="mt-2 text-sm font-semibold text-danger">{errors.deficiencia.message}</p>
            )}
          </fieldset>

          <button
            type="submit"
            className="h-14 w-full rounded-2xl bg-primary text-base font-extrabold text-primary-foreground shadow-float transition-colors hover:bg-primary/90"
          >
            Criar conta e entrar
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-medium text-muted-foreground">
          Já tem conta?{" "}
          <Link to="/login" className="font-extrabold text-primary underline-offset-4 hover:underline">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
