import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  action?: ReactNode;
}

export function Header({ title, subtitle, backTo, action }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur">
      <div className="app-shell flex items-center gap-3 px-5 py-4">
        {backTo && (
          <Link
            to={backTo}
            aria-label="Voltar"
            className="flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </Link>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-extrabold text-foreground">{title}</h1>
          {subtitle && <p className="truncate text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
    </header>
  );
}
