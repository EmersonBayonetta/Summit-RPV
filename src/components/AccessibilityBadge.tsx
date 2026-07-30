import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface AccessibilityBadgeProps {
  label: string;
  available: boolean;
  highlighted?: boolean;
}

export function AccessibilityBadge({ label, available, highlighted }: AccessibilityBadgeProps) {
  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-sm font-semibold",
        available
          ? "border-success/25 bg-success-soft text-success"
          : "border-danger/20 bg-danger-soft text-danger",
        highlighted && "ring-2 ring-primary/60",
      )}
    >
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full",
          available ? "bg-success text-success-foreground" : "bg-danger text-danger-foreground",
        )}
        aria-hidden="true"
      >
        {available ? <Check className="size-4" /> : <X className="size-4" />}
      </span>
      <span className="leading-tight">
        {available ? "Possui" : "Não possui"} {label.toLowerCase()}
      </span>
    </li>
  );
}
