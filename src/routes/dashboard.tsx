import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line, CartesianGrid } from "recharts";
import { FileText, Shield, AlertTriangle, Hospital, RefreshCw, Download, ArrowUpRight, ArrowDownRight, Search } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { TrustScoreBadge } from "@/components/shared/TrustScoreBadge";
import { StatusPulse } from "@/components/shared/StatusPulse";
import { mockFacilities, totalIndexed, avgTrust, totalContradictions, highCapHubs } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — HEALGRID AI" },
      { name: "description", content: "Live healthcare intelligence: trust scores, capability coverage, contradictions, and recent AI analysis." },
      { property: "og:title", content: "HEALGRID AI Dashboard" },
      { property: "og:description", content: "Real-time facility intelligence for India's healthcare grid." },
    ],
  }),
  component: Dashboard,
});

const trustDist = [
  { band: "0–20", count: 124 },
  { band: "20–40", count: 1342 },
  { band: "40–60", count: 3128 },
  { band: "60–80", count: 4205 },
  { band: "80–100", count: 2048 },
];

const capRadar = [
  { axis: "ICU", reported: 78, verified: 54 },
  { axis: "Emergency", reported: 91, verified: 62 },
  { axis: "Surgery", reported: 84, verified: 71 },
  { axis: "Imaging", reported: 67, verified: 48 },
  { axis: "Pediatrics", reported: 73, verified: 58 },
  { axis: "Maternity", reported: 81, verified: 72 },
  { axis: "Pharmacy", reported: 95, verified: 88 },
  { axis: "Specialists", reported: 56, verified: 34 },
];

const sparkline = [10,12,11,15,18,17,22,21,25,28,32,35].map((v,i) => ({ x:i, v }));

const flags = [
  { sev: "high", name: "AIIMS Delhi", time: "2 min ago", claim: "Claims MRI available", evid: "equipment under maintenance since 2022" },
  { sev: "med", name: "Civil Hospital Pune", time: "14 min ago", claim: "Listed 12 ICU beds", evid: "census shows max capacity 4" },
  { sev: "high", name: "PHC Rajasthan-447", time: "1 hr ago", claim: "Pediatric specialist listed", evid: "no qualification records found" },
  { sev: "med", name: "DH Surguja", time: "2 hr ago", claim: "ICU 6 beds", evid: "only 2 ventilators functional" },
  { sev: "high", name: "PHC Bastar-T", time: "3 hr ago", claim: "Emergency available", evid: "no emergency staff, no transport" },
];

const stateColors: Record<string,string> = {
  high: "oklch(0.72 0.17 162)", mid: "oklch(0.78 0.16 75)", low: "oklch(0.65 0.22 20)",
};

function MiniSpark({ color = "oklch(0.74 0.16 210)" }: { color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={36}>
      <LineChart data={sparkline}>
        <Line dataKey="v" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function Dashboard() {
  const recent = mockFacilities.slice(0, 8);
  return (
    <div className="max-w-[1500px] mx-auto px-5 sm:px-8 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Sunday, 26 April 2026</div>
          <h1 className="font-display font-bold text-3xl mt-1">Good morning, Analyst</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg glass text-sm flex items-center gap-2 hover:border-cyan/50 transition"><RefreshCw className="w-4 h-4"/> Refresh</button>
          <button className="px-3 py-2 rounded-lg glass text-sm flex items-center gap-2 hover:border-cyan/50 transition"><Download className="w-4 h-4"/> Export</button>
        </div>
      </div>

      <div className="mb-6 relative">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input className="w-full pl-11 pr-4 py-3 rounded-xl glass text-sm focus:outline-none focus:border-cyan/60 placeholder:text-muted-foreground" placeholder="Search facilities, states, capabilities…" />
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: FileText, color: "cyan", label: "Total Facilities", value: totalIndexed, sub: "+234 this week", trend: "up" },
          { icon: Shield, color: "emerald", label: "Avg Trust Score", value: avgTrust, decimals: 1, sub: "+2.1 vs last", trend: "up", suffix: " /100" },
          { icon: AlertTriangle, color: "rose", label: "Contradictions", value: totalContradictions, sub: "12% resolved", trend: "down" },
          { icon: Hospital, color: "amber", label: "High-Cap Hubs", value: highCapHubs, sub: "across 28 states", trend: "up" },
        ].map((k) => (
          <GlowCard key={k.label} className="!p-5 relative overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-${k.color}`} />
            <div className="flex items-start justify-between">
              <div className={`w-9 h-9 rounded-lg grid place-items-center bg-${k.color}/10 border border-${k.color}/30`}>
                <k.icon className={`w-4 h-4 text-${k.color}`} />
              </div>
              <div className={`text-xs flex items-center gap-1 ${k.trend === "up" ? "text-emerald" : "text-rose"}`}>
                {k.trend === "up" ? <ArrowUpRight className="w-3 h-3"/> : <ArrowDownRight className="w-3 h-3"/>}
                {k.sub}
              </div>
            </div>
            <div className="mt-3 font-display font-bold text-3xl">
              <AnimatedNumber value={k.value} decimals={k.decimals||0} suffix={k.suffix||""} />
            </div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{k.label}</div>
            <div className="mt-2 -mx-1"><MiniSpark color={`var(--accent-${k.color})`} /></div>
          </GlowCard>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <GlowCard className="lg:col-span-2 !p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-display font-semibold text-lg">Trust Score Distribution</h3>
              <p className="text-xs text-muted-foreground">Across all 10,847 indexed facilities</p>
            </div>
            <StatusPulse label="Live" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trustDist}>
                <defs>
                  <linearGradient id="trustGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="oklch(0.65 0.22 20)" stopOpacity={0.85}/>
                    <stop offset="50%" stopColor="oklch(0.78 0.16 75)" stopOpacity={0.85}/>
                    <stop offset="100%" stopColor="oklch(0.72 0.17 162)" stopOpacity={0.85}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(0.28 0.03 265)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="band" stroke="oklch(0.68 0.03 255)" fontSize={12} />
                <YAxis stroke="oklch(0.68 0.03 255)" fontSize={12} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.03 265)", border: "1px solid oklch(0.74 0.16 210 / 0.4)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="count" stroke="oklch(0.74 0.16 210)" strokeWidth={2} fill="url(#trustGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlowCard>

        <GlowCard className="!p-5">
          <h3 className="font-display font-semibold text-lg">Capability Coverage</h3>
          <p className="text-xs text-muted-foreground">Reported vs AI-Verified</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={capRadar}>
                <PolarGrid stroke="oklch(0.28 0.03 265)" />
                <PolarAngleAxis dataKey="axis" tick={{ fill: "oklch(0.68 0.03 255)", fontSize: 11 }} />
                <PolarRadiusAxis stroke="transparent" tick={false} />
                <Radar name="Reported" dataKey="reported" stroke="oklch(0.74 0.16 210)" fill="oklch(0.74 0.16 210)" fillOpacity={0.25} />
                <Radar name="Verified" dataKey="verified" stroke="oklch(0.72 0.17 162)" fill="oklch(0.72 0.17 162)" fillOpacity={0.35} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.03 265)", border: "1px solid oklch(0.74 0.16 210 / 0.4)", borderRadius: 8 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 text-xs justify-center pt-2">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan"/> Reported</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald"/> Verified</span>
          </div>
        </GlowCard>
      </div>

      {/* Feed + Map preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <GlowCard className="!p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold text-lg flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber"/> Live Contradiction Flags</h3>
            <StatusPulse status="warning" label="Streaming" />
          </div>
          <div className="space-y-2.5">
            {flags.map((f, i) => (
              <motion.div key={i} initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay:i*0.08}}
                className="flex gap-3 p-3 rounded-lg bg-[oklch(0.16_0.03_265/0.6)] border border-[var(--border)] hover:border-[var(--border-glow)] transition">
                <div className={`mt-1.5 w-2 h-2 rounded-full pulse-dot ${f.sev === "high" ? "bg-rose" : "bg-amber"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm truncate">{f.name}</span>
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap">{f.time}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5"><span className="text-foreground">"{f.claim}"</span> but {f.evid}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlowCard>

        <GlowCard className="!p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold text-lg">State Coverage</h3>
            <Link to="/map" className="text-xs text-cyan hover:underline flex items-center gap-1">View Full Map <ArrowUpRight className="w-3 h-3"/></Link>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              {st:"Delhi", t:91, lvl:"high"},{st:"Tamil Nadu", t:88, lvl:"high"},
              {st:"Maharashtra", t:82, lvl:"high"},{st:"Karnataka", t:78, lvl:"high"},
              {st:"Kerala", t:84, lvl:"high"},{st:"Gujarat", t:76, lvl:"high"},
              {st:"Rajasthan", t:48, lvl:"mid"},{st:"Bihar", t:42, lvl:"mid"},
              {st:"Chhattisgarh", t:38, lvl:"low"},{st:"Arunachal Pradesh", t:31, lvl:"low"},
            ].map(s => (
              <div key={s.st} className="flex items-center justify-between p-2.5 rounded-lg bg-[oklch(0.16_0.03_265/0.5)]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full" style={{background: stateColors[s.lvl]}} />
                  <span className="text-xs truncate">{s.st}</span>
                </div>
                <span className="font-mono text-xs">{s.t}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-4 pt-3 border-t border-[var(--border)]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose"/> Low</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber"/> Medium</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald"/> High</span>
          </div>
        </GlowCard>
      </div>

      {/* Recent Table */}
      <GlowCard className="!p-0 overflow-hidden">
        <div className="p-5 border-b border-[var(--border)] flex items-center justify-between flex-wrap gap-3">
          <h3 className="font-display font-semibold text-lg">Recently Analyzed Facilities</h3>
          <Link to="/search" className="text-xs text-cyan hover:underline">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-[11px] uppercase tracking-widest text-muted-foreground bg-[oklch(0.16_0.03_265/0.6)]">
              <tr>
                <th className="text-left px-5 py-3">Facility</th>
                <th className="text-left px-3 py-3">State</th>
                <th className="text-left px-3 py-3">Type</th>
                <th className="text-left px-3 py-3">Trust</th>
                <th className="text-left px-3 py-3">Capabilities</th>
                <th className="text-left px-3 py-3">Flags</th>
              </tr>
            </thead>
            <tbody>
              {recent.map(f => (
                <tr key={f.id} className="border-t border-[var(--border)] hover:bg-white/[0.02] transition">
                  <td className="px-5 py-3 font-medium">{f.shortName}</td>
                  <td className="px-3 py-3 text-muted-foreground">{f.state}</td>
                  <td className="px-3 py-3 text-muted-foreground capitalize">{f.type}</td>
                  <td className="px-3 py-3"><TrustScoreBadge score={f.trust_score} size="sm"/></td>
                  <td className="px-3 py-3 text-muted-foreground text-xs">{f.verified_capabilities.slice(0,3).join(", ")}{f.verified_capabilities.length > 3 && ` +${f.verified_capabilities.length-3}`}</td>
                  <td className="px-3 py-3">
                    {f.contradiction_flags.length === 0
                      ? <span className="text-emerald text-xs">✓ Clean</span>
                      : <span className="text-rose text-xs">⚠ {f.contradiction_flags.length}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlowCard>
    </div>
  );
}
