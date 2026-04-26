import { cn } from "@/lib/utils";
import { trustBand } from "@/lib/ai-engine";

const colorMap = {
  emerald: "bg-[oklch(0.72_0.17_162/0.15)] text-emerald border-emerald/40",
  amber: "bg-[oklch(0.78_0.16_75/0.15)] text-amber border-amber/40",
  orange: "bg-[oklch(0.7_0.18_50/0.15)] text-amber border-amber/40",
  rose: "bg-[oklch(0.65_0.22_20/0.15)] text-rose border-rose/40",
};

export function TrustScoreBadge({ score, size = "md", showLabel = false }: {
  score: number; size?: "sm" | "md" | "lg"; showLabel?: boolean;
}) {
  const band = trustBand(score);
  const dot = `bg-${band.color}`;
  const sizes = {
    sm: "px-2 py-0.5 text-xs gap-1.5",
    md: "px-3 py-1 text-sm gap-2",
    lg: "px-4 py-1.5 text-base gap-2.5",
  };
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border font-mono font-semibold",
      colorMap[band.color],
      sizes[size],
    )}>
      <span className={cn("w-1.5 h-1.5 rounded-full pulse-dot", dot)} />
      {score}{showLabel && <span className="font-sans font-normal opacity-80 ml-1">{band.label}</span>}
    </span>
  );
}

export function TrustGauge({ score, size = 140 }: { score: number; size?: number }) {
  const band = trustBand(score);
  const r = size / 2 - 14;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const stroke = band.color === "emerald" ? "oklch(0.72 0.17 162)" : band.color === "amber" ? "oklch(0.78 0.16 75)" : band.color === "orange" ? "oklch(0.7 0.18 50)" : "oklch(0.65 0.22 20)";
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} stroke="oklch(0.28 0.03 265)" strokeWidth="10" fill="none" />
        <circle
          cx={size/2} cy={size/2} r={r}
          stroke={stroke} strokeWidth="10" fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-mono text-3xl font-bold">{score}</div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Trust</div>
      </div>
    </div>
  );
}
