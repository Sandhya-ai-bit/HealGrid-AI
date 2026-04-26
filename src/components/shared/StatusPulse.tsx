import { cn } from "@/lib/utils";

export function StatusPulse({ status = "active", label }: { status?: "active"|"warning"|"critical"; label?: string }) {
  const color = status === "active" ? "bg-emerald" : status === "warning" ? "bg-amber" : "bg-rose";
  return (
    <span className="inline-flex items-center gap-2 text-xs">
      <span className="relative flex h-2 w-2">
        <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", color)} />
        <span className={cn("relative inline-flex rounded-full h-2 w-2", color)} />
      </span>
      {label && <span className="text-muted-foreground">{label}</span>}
    </span>
  );
}
