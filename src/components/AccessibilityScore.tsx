import { Accessibility } from "lucide-react";

import { cn } from "@/lib/utils";
import { accessibilityTone } from "@/utils/accessibility";

const TONE_CLASS = {
  success: "bg-success-soft text-success border-success/25",
  warning: "bg-warning/15 text-foreground border-warning/40",
  danger: "bg-danger-soft text-danger border-danger/25",
} as const;

interface AccessibilityScoreProps {
  score: number;
  compact?: boolean;
}

export function AccessibilityScore({ score, compact }: AccessibilityScoreProps) {
  const tone = accessibilityTone(score);

  if (compact) {
    return (
      <span
        className={cn("rounded-full border px-2.5 py-1 text-xs font-bold", TONE_CLASS[tone])}
        aria-label={`${score} por cento acessível`}
      >
        {score}% acessível
      </span>
    );
  }

  return (
    <div className={cn("rounded-3xl border p-4", TONE_CLASS[tone])}>
      <div className="flex items-center gap-3">
        <Accessibility className="size-7" aria-hidden="true" />
        <div>
          <p className="text-2xl font-extrabold leading-none">{score}% acessível</p>
          <p className="mt-1 text-sm font-medium opacity-80">
            Calculado automaticamente com base nos recursos disponíveis
          </p>
        </div>
      </div>
      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-card/70">
        <div className="h-full rounded-full bg-current transition-all" style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
