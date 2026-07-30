import { CATEGORIES } from "@/constants";
import { cn } from "@/lib/utils";
import type { CategoryId } from "@/types";

interface CategoryFilterProps {
  value: CategoryId | "todos";
  onChange: (value: CategoryId | "todos") => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 pb-1">
      <ul className="flex w-max gap-2.5" role="tablist" aria-label="Filtrar por categoria">
        {CATEGORIES.map(({ id, label, icon: Icon }) => {
          const active = value === id;
          return (
            <li key={id}>
              <button
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onChange(id)}
                className={cn(
                  "flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-float"
                    : "border-border bg-card text-foreground hover:border-primary/40",
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
