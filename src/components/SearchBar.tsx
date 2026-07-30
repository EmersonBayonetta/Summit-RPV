import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, onClear, placeholder }: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? "Buscar por nome, categoria ou endereço"}
        aria-label="Pesquisar estabelecimentos"
        className="h-14 w-full rounded-2xl border border-border bg-card pl-12 pr-12 text-base font-medium text-foreground shadow-card outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Limpar pesquisa"
          className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
