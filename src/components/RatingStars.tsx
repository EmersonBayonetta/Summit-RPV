import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface RatingStarsProps {
  value: number;
  size?: "sm" | "md" | "lg";
  editable?: boolean;
  onChange?: (value: number) => void;
  label?: string;
}

const SIZES = { sm: "size-4", md: "size-5", lg: "size-8" } as const;

export function RatingStars({ value, size = "sm", editable, onChange, label }: RatingStarsProps) {
  const stars = [1, 2, 3, 4, 5];

  if (!editable) {
    return (
      <span className="flex items-center gap-0.5" aria-label={`Nota ${value} de 5`}>
        {stars.map((star) => (
          <Star
            key={star}
            className={cn(
              SIZES[size],
              star <= Math.round(value) ? "fill-warning text-warning" : "text-muted-foreground/40",
            )}
            aria-hidden="true"
          />
        ))}
      </span>
    );
  }

  return (
    <div role="radiogroup" aria-label={label ?? "Escolha uma nota"} className="flex items-center gap-1.5">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={star === value}
          aria-label={`${star} ${star === 1 ? "estrela" : "estrelas"}`}
          onClick={() => onChange?.(star)}
          className="rounded-full p-1 transition-transform hover:scale-110"
        >
          <Star
            className={cn(SIZES[size], star <= value ? "fill-warning text-warning" : "text-muted-foreground/40")}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}
