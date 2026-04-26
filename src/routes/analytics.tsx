import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { Download, Share2, FileText } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";
import { interventionDistricts } from "@/lib/mock-data";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "NGO Analytics — HEALGRID AI" },
      { name: "description", content: "Data-driven healthcare gap analysis and intervention ROI simulation for NGOs and policymakers." },
      { property: "og:title", content: "HEALGRID AI NGO Analytics" },
      { property: "og:description", content: "Strategic healthcare intervention planning, powered by AI." },
    ],
  }),
  component: AnalyticsPage,
});

const specialistGaps = [
  { name: "Cardiology", gap: 312 },{ name: "Neurology", gap: 287 },{ name: "Oncology", gap: 401 },
  { name: "Pediatrics", gap: 198 },{ name: "Nephrology", gap: 256 },{ name: "Psychiatry", gap: 367 },
  { name: "Pulmonology", gap: 224 },{ name: "Gastro", gap: 189 },
];

const phcCapability = [
  { state: "MH", basic: 45, lab: 30, emerg: 18, full: 7 },
  { state: "TN", basic: 32, lab: 38, emerg: 20, full: 10 },
  { state: "RJ", basic: 65, lab: 22, emerg: 10, full: 3 },
  { state: "BR", basic: 72, lab: 18, emerg: 7, full: 3 },
  { state: "CG", basic: 68, lab: 20, emerg: 9, full: 3 },
  { state: "KL", basic: 22, lab: 35, emerg: 28, full: 15 },
  { state: "KA", basic: 30, lab: 40, emerg: 22, full: 8 },
  { state: "GJ", basic: 38, lab: 35, emerg: 20, full: 7 },
];

const trend = Array.from({length:12}, (_,i) => ({
  m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  trust: 58 + i*0.9 + Math.random()*2,
  flags: 920 - i*8 + Math.random()*20,
}));

function AnalyticsPage() {
  const [district, setDistrict] = useState("Barmer, Rajasthan");
  const [units, setUnits] = useState(3);
  return (
    <div className="max-w-[1500px] mx-auto px-5 sm:px-8 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs uppercase tracking-widest text-cyan font-semibold">NGO Planning Intelligence</div>
          <h1 className="font-display font-bold text-3xl mt-1">Healthcare Gap Analysis</h1>
          <p className="text-muted-foreground text-sm mt-1">Data-driven intervention planning for India's underserved regions.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 rounded-lg glass text-sm flex items-center gap-2 hover:border-cyan/50"><FileText className="w-4 h-4"/> Export PDF</button>
          <button className="px-3 py-2 rounded-lg glass text-sm flex items-center gap-2 hover:border-cyan/50"><Download className="w-4 h-4"/> CSV</button>
          <button className="px-3 py-2 rounded-lg glass text-sm flex items-center gap-2 hover:border-cyan/50"><Share2 className="w-4 h-4"/> Share</button>
        </div>
      </div>

      {/* Priority districts */}
      <GlowCard className="!p-0 overflow-hidden mb-6">
        <div className="p-5 border-b border-[var(--border)]">
          <h3 className="font-display font-semibold text-lg">Top 10 Districts Needing Immediate Intervention</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-[11px] uppercase tracking-widest text-muted-foreground bg-[oklch(0.16_0.03_265/0.6)]">
              <tr>
                <th className="text-left px-5 py-3">Rank</th>
                <th className="text-left px-3 py-3">District</th>
                <th className="text-left px-3 py-3">State</th>
                <th className="text-left px-3 py-3">Population</th>
                <th className="text-left px-3 py-3">Nearest Hospital</th>
                <th className="text-left px-3 py-3">Trust</th>
                <th className="text-left px-3 py-3">Priority</th>
              </tr>
            </thead>
            <tbody>
              {interventionDistricts.map(d => (
                <tr key={d.rank} className="border-t border-[var(--border)] hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-mono">{d.rank}</td>
                  <td className="px-3 py-3 font-medium">{d.district}</td>
                  <td className="px-3 py-3 text-muted-foreground">{d.state}</td>
                  <td className="px-3 py-3 font-mono">{d.population}</td>
                  <td className="px-3 py-3 font-mono text-amber">{d.nearest}</td>
                  <td className="px-3 py-3 font-mono text-rose">{d.trust}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-md text-xs border ${d.priority === "CRITICAL" ? "bg-rose/15 text-rose border-rose/40" : "bg-amber/15 text-amber border-amber/40"}`}>{d.priority}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlowCard>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <GlowCard className="!p-5">
          <h3 className="font-display font-semibold text-lg">Specialty Access Gaps</h3>
          <p className="text-xs text-muted-foreground mb-2">Districts with zero specialist access</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={specialistGaps}>
                <CartesianGrid stroke="oklch(0.28 0.03 265)" strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="name" stroke="oklch(0.68 0.03 255)" fontSize={11}/>
                <YAxis stroke="oklch(0.68 0.03 255)" fontSize={11}/>
                <Tooltip contentStyle={{ background: "oklch(0.18 0.03 265)", border: "1px solid oklch(0.74 0.16 210 / 0.4)", borderRadius: 8 }}/>
                <Bar dataKey="gap" fill="oklch(0.65 0.22 20)" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlowCard>

        <GlowCard className="!p-5">
          <h3 className="font-display font-semibold text-lg">PHC Capability Distribution</h3>
          <p className="text-xs text-muted-foreground mb-2">% PHCs by capability tier (per state)</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={phcCapability}>
                <CartesianGrid stroke="oklch(0.28 0.03 265)" strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="state" stroke="oklch(0.68 0.03 255)" fontSize={11}/>
                <YAxis stroke="oklch(0.68 0.03 255)" fontSize={11}/>
                <Tooltip contentStyle={{ background: "oklch(0.18 0.03 265)", border: "1px solid oklch(0.74 0.16 210 / 0.4)", borderRadius: 8 }}/>
                <Legend wrapperStyle={{ fontSize: 11 }}/>
                <Bar dataKey="basic" stackId="a" fill="oklch(0.65 0.22 20)" name="Basic only"/>
                <Bar dataKey="lab" stackId="a" fill="oklch(0.78 0.16 75)" name="+ Lab"/>
                <Bar dataKey="emerg" stackId="a" fill="oklch(0.74 0.16 210)" name="+ Emergency"/>
                <Bar dataKey="full" stackId="a" fill="oklch(0.72 0.17 162)" name="Full"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlowCard>
      </div>

      {/* Emergency network */}
      <GlowCard className="!p-5 mb-6">
        <h3 className="font-display font-semibold text-lg">Emergency Care Network Gaps</h3>
        <p className="text-xs text-muted-foreground mb-4">Golden Hour coverage (within 60-min drive)</p>
        <div className="space-y-3">
          {[
            { label: "Urban population", pct: 67, color: "emerald" },
            { label: "Rural population", pct: 38, color: "amber" },
            { label: "Tribal / remote areas", pct: 12, color: "rose" },
          ].map(b => (
            <div key={b.label}>
              <div className="flex justify-between text-sm mb-1"><span>{b.label}</span><span className={`font-mono text-${b.color}`}>{b.pct}%</span></div>
              <div className="h-2.5 rounded-full bg-[oklch(0.22_0.03_265)] overflow-hidden">
                <div className={`h-full bg-${b.color}`} style={{width: `${b.pct}%`}}/>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-[var(--border)] grid sm:grid-cols-3 gap-3 text-sm">
          <div className="p-3 rounded-lg bg-rose/10 border border-rose/30"><span className="text-rose font-mono text-lg">347</span><div className="text-xs text-muted-foreground">Districts lack 24-hr emergency</div></div>
          <div className="p-3 rounded-lg bg-amber/10 border border-amber/30"><span className="text-amber font-mono text-lg">89</span><div className="text-xs text-muted-foreground">No functional ICU within 100km</div></div>
          <div className="p-3 rounded-lg bg-rose/10 border border-rose/30"><span className="text-rose font-mono text-lg">23</span><div className="text-xs text-muted-foreground">No blood bank within 150km</div></div>
        </div>
      </GlowCard>

      {/* Simulator */}
      <GlowCard className="!p-5 mb-6" glow="cyan">
        <h3 className="font-display font-semibold text-lg">Intervention Impact Simulator</h3>
        <p className="text-xs text-muted-foreground mb-4">Project the ROI of resource deployment.</p>
        <div className="grid sm:grid-cols-3 gap-3 mb-5">
          <div>
            <label className="text-xs text-muted-foreground">District</label>
            <select value={district} onChange={e => setDistrict(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg bg-[oklch(0.16_0.03_265)] border border-[var(--border)] text-sm focus:outline-none focus:border-cyan/60">
              {interventionDistricts.map(d => <option key={d.rank}>{d.district}, {d.state}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Resource</label>
            <select className="mt-1 w-full px-3 py-2 rounded-lg bg-[oklch(0.16_0.03_265)] border border-[var(--border)] text-sm focus:outline-none focus:border-cyan/60">
              <option>Mobile Medical Unit</option><option>Telemedicine Hub</option><option>Specialist Outreach</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Number of units: <span className="text-cyan font-mono">{units}</span></label>
            <input type="range" min={1} max={10} value={units} onChange={e => setUnits(+e.target.value)} className="mt-2 w-full accent-cyan"/>
          </div>
        </div>
        <div className="rounded-xl bg-gradient-card border border-cyan/30 p-5 grid sm:grid-cols-4 gap-4">
          {[
            ["Population served", `~${(units*41000).toLocaleString()}`, "cyan"],
            ["ER response", `127km → ${Math.max(8, 30-units*4)}km`, "emerald"],
            ["Trust improvement", `31 → ${31 + units*9}`, "emerald"],
            ["Cost", `₹${(units*0.8).toFixed(1)}Cr/yr`, "amber"],
          ].map(([l, v, c]) => (
            <div key={l}>
              <div className="text-xs text-muted-foreground">{l}</div>
              <div className={`font-mono text-lg text-${c} mt-1`}>{v}</div>
            </div>
          ))}
        </div>
      </GlowCard>

      {/* Trend */}
      <GlowCard className="!p-5">
        <h3 className="font-display font-semibold text-lg">Healthcare Intelligence Quality Trend</h3>
        <p className="text-xs text-muted-foreground mb-2">India 2025–2026 · Trust score & contradictions resolved</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <CartesianGrid stroke="oklch(0.28 0.03 265)" strokeDasharray="3 3"/>
              <XAxis dataKey="m" stroke="oklch(0.68 0.03 255)" fontSize={11}/>
              <YAxis yAxisId="l" stroke="oklch(0.68 0.03 255)" fontSize={11}/>
              <YAxis yAxisId="r" orientation="right" stroke="oklch(0.68 0.03 255)" fontSize={11}/>
              <Tooltip contentStyle={{ background: "oklch(0.18 0.03 265)", border: "1px solid oklch(0.74 0.16 210 / 0.4)", borderRadius: 8 }}/>
              <Legend wrapperStyle={{ fontSize: 11 }}/>
              <Line yAxisId="l" type="monotone" dataKey="trust" stroke="oklch(0.72 0.17 162)" strokeWidth={2.5} dot={false} name="Avg Trust Score"/>
              <Line yAxisId="r" type="monotone" dataKey="flags" stroke="oklch(0.65 0.22 20)" strokeWidth={2.5} dot={false} name="Open Flags"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlowCard>
    </div>
  );
}
