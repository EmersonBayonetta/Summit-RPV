import type { ReactNode } from "react";

import { BottomNav } from "@/components/BottomNav";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background pb-24">
      <main className="app-shell px-5 py-5">{children}</main>
      <BottomNav />
    </div>
  );
}
