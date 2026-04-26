import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function GlowCard({ children, className, glow }: { children: ReactNode; className?: string; glow?: "cyan" | "emerald" | "rose" | "none" }) {
  const glowClass = glow === "cyan" ? "hover:glow-cyan" : glow === "emerald" ? "hover:glow-emerald" : glow === "rose" ? "hover:glow-rose" : "";
  return (
    <div className={cn(
      "relative rounded-2xl glass p-5 transition-all duration-300",
      "hover:border-[oklch(0.74_0.16_210/0.5)] hover:-translate-y-0.5",
      glowClass,
      className,
    )}>
      {children}
    </div>
  );
}
