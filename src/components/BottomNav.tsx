import { Link } from "@tanstack/react-router";
import { Heart, Home, Map, Settings, User } from "lucide-react";

const ITEMS = [
  { to: "/inicio", label: "Início", icon: Home },
  { to: "/mapa", label: "Mapa", icon: Map },
  { to: "/favoritos", label: "Favoritos", icon: Heart },
  { to: "/perfil", label: "Perfil", icon: User },
  { to: "/configuracoes", label: "Ajustes", icon: Settings },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur"
    >
      <ul className="app-shell flex items-stretch justify-between px-2 py-1.5">
        {ITEMS.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-xs font-semibold text-muted-foreground transition-colors data-[status=active]:bg-primary-soft data-[status=active]:text-primary"
              activeProps={{ "aria-current": "page" }}
            >
              <Icon className="size-6" aria-hidden="true" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
