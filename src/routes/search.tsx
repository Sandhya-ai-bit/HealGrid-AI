import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, Sparkles, Filter, MapPin, ChevronRight } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";
import { TrustScoreBadge, TrustGauge } from "@/components/shared/TrustScoreBadge";
import { semanticSearch, reasoningChain, annotatedNotes, trustBand } from "@/lib/ai-engine";
import { ALL_STATES, ALL_CAPABILITIES, type Facility } from "@/lib/mock-data";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search & Discover — HEALGRID AI" },
      { name: "description", content: "Semantic AI search across 10,847 Indian healthcare facilities with trust scoring and explainability." },
      { property: "og:title", content: "HEALGRID AI Hospital Search" },
      { property: "og:description", content: "Natural-language facility discovery with full AI explainability." },
    ],
  }),
  component: SearchPage,
});

const TYPES = [
  { id: "tertiary", label: "Tertiary" },
  { id: "district", label: "District" },
  { id: "chc", label: "CHC" },
  { id: "phc", label: "PHC" },
  { id: "private", label: "Private" },
];

const QUICK_FILTERS = ["ICU", "Emergency", "NICU", "Cardiac", "Neurology", "Surgery", "MRI", "Trauma"];

function SearchPage() {
  const [q, setQ] = useState("");
  const [state, setState] = useState("All");
  const [minTrust, setMinTrust] = useState(0);
  const [types, setTypes] = useState<string[]>([]);
  const [caps, setCaps] = useState<string[]>([]);
  const [flagsMode, setFlagsMode] = useState<"all"|"clean"|"flagged">("all");
  const [selected, setSelected] = useState<Facility | null>(null);

  const results = useMemo(() => semanticSearch(q, { state, minTrust, types, capabilities: caps, flagsMode }), [q, state, minTrust, types, caps, flagsMode]);

  const toggle = (arr: string[], setArr: (v: string[]) => void, v: string) => {
    setArr(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  };

  return (
    <div>
      {/* Hero search */}
      <section className="mesh-bg border-b border-[var(--border-glow)]">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-8 py-10">
          <div className="flex items-center gap-2 text-xs text-cyan font-semibold uppercase tracking-widest"><Sparkles className="w-3.5 h-3.5"/> Semantic AI Search</div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl mt-2">Hospital Intelligence Search</h1>
          <p className="text-muted-foreground mt-1">Natural-language search across 10,847 facilities</p>
          <div className="mt-6 relative">
            <SearchIcon className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-cyan" />
            <input
              value={q} onChange={e => setQ(e.target.value)}
              placeholder='Try: "ICU hospital with trauma care in Rajasthan"'
              className="w-full pl-14 pr-5 py-4 rounded-xl glass-strong text-base focus:outline-none focus:border-cyan/60 focus:glow-cyan transition placeholder:text-muted-foreground"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {QUICK_FILTERS.map(c => (
              <button key={c} onClick={() => toggle(caps, setCaps, c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${caps.includes(c) ? "bg-cyan text-background border-cyan" : "glass border-[var(--border-glow)] hover:border-cyan/60"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1500px] mx-auto px-5 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Filters */}
        <aside className="space-y-4">
          <GlowCard className="!p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-3"><Filter className="w-3.5 h-3.5"/> Filters</div>

            <div className="mb-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">State</label>
              <select value={state} onChange={e => setState(e.target.value)} className="mt-1.5 w-full px-3 py-2 rounded-lg bg-[oklch(0.16_0.03_265)] border border-[var(--border)] text-sm focus:outline-none focus:border-cyan/60">
                <option value="All">All States</option>
                {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Facility Type</label>
              <div className="mt-2 space-y-1.5">
                {TYPES.map(t => (
                  <label key={t.id} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={types.includes(t.id)} onChange={() => toggle(types, setTypes, t.id)} className="accent-cyan" />
                    {t.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Min Trust Score: <span className="text-cyan font-mono">{minTrust}</span></label>
              <input type="range" min={0} max={100} value={minTrust} onChange={e => setMinTrust(+e.target.value)} className="mt-2 w-full accent-cyan" />
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Capabilities</label>
              <div className="mt-2 space-y-1.5 max-h-48 overflow-y-auto scrollbar-thin">
                {ALL_CAPABILITIES.map(c => (
                  <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={caps.includes(c)} onChange={() => toggle(caps, setCaps, c)} className="accent-cyan" />
                    {c}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contradiction Flags</label>
              <div className="mt-2 space-y-1.5">
                {(["all","clean","flagged"] as const).map(m => (
                  <label key={m} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" checked={flagsMode === m} onChange={() => setFlagsMode(m)} className="accent-cyan" />
                    {m === "all" ? "Show All" : m === "clean" ? "Clean Only" : "Flagged Only"}
                  </label>
                ))}
              </div>
            </div>

            <button onClick={() => { setState("All"); setMinTrust(0); setTypes([]); setCaps([]); setFlagsMode("all"); setQ(""); }}
              className="w-full px-3 py-2 text-sm rounded-lg bg-white/5 hover:bg-white/10 transition">Reset Filters</button>
          </GlowCard>
        </aside>

        {/* Results */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              <span className="text-foreground font-mono font-semibold">{results.length}</span> facilities matched
            </div>
          </div>
          <div className="grid gap-4">
            {results.slice(0, 30).map((f, i) => (
              <motion.div key={f.id} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: Math.min(i*0.03, 0.4)}}>
                <HospitalCard facility={f} onClick={() => setSelected(f)} />
              </motion.div>
            ))}
            {results.length === 0 && (
              <GlowCard className="text-center py-12">
                <div className="text-muted-foreground">No facilities match your filters.</div>
              </GlowCard>
            )}
          </div>
        </section>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {selected && <ProfileDrawer facility={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}

function HospitalCard({ facility, onClick }: { facility: Facility; onClick: () => void }) {
  return (
    <GlowCard className="!p-5 cursor-pointer" glow={facility.contradiction_flags.length === 0 ? "emerald" : "rose"}>
      <div onClick={onClick}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-lg flex items-center gap-2">🏥 {facility.shortName}</h3>
            <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
              <MapPin className="w-3 h-3"/> {facility.district}, {facility.state} • <span className="capitalize">{facility.type}</span> • {facility.ownership}
            </div>
          </div>
          <TrustScoreBadge score={facility.trust_score} size="md" />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4">
          <div className="rounded-xl bg-[oklch(0.16_0.03_265/0.7)] p-3 border border-[var(--border)]">
            <div className="text-[10px] uppercase tracking-widest text-cyan font-semibold">AI Summary</div>
            <p className="text-xs mt-1.5 text-muted-foreground leading-snug">{facility.ai_summary}</p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">Verified Capabilities</div>
            <div className="flex flex-wrap gap-1.5">
              {facility.verified_capabilities.slice(0, 8).map(c => (
                <span key={c} className="px-2 py-0.5 rounded-md text-xs bg-[oklch(0.72_0.17_162/0.12)] text-emerald border border-emerald/30">{c}</span>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="flex justify-between text-muted-foreground"><span>Total Beds</span><span className="text-foreground font-mono">{facility.beds_total.toLocaleString()}</span></div>
                <div className="mt-1 h-1.5 rounded-full bg-[oklch(0.22_0.03_265)] overflow-hidden">
                  <div className="h-full bg-cyan" style={{width: `${Math.min(100, facility.beds_total/30)}%`}}/>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-muted-foreground"><span>ICU Beds</span><span className="text-foreground font-mono">{facility.beds_icu}</span></div>
                <div className="mt-1 h-1.5 rounded-full bg-[oklch(0.22_0.03_265)] overflow-hidden">
                  <div className="h-full bg-emerald" style={{width: `${Math.min(100, facility.beds_icu*1.5)}%`}}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
          <div className={facility.contradiction_flags.length === 0 ? "text-emerald" : "text-rose"}>
            {facility.contradiction_flags.length === 0 ? "✓ 0 contradiction flags" : `⚠ ${facility.contradiction_flags.length} flag${facility.contradiction_flags.length>1?"s":""} raised`}
            <span className="text-muted-foreground ml-3">Updated {facility.last_updated}</span>
          </div>
          <span className="text-cyan flex items-center gap-1 font-medium">View Profile <ChevronRight className="w-3.5 h-3.5"/></span>
        </div>
      </div>
    </GlowCard>
  );
}

function ProfileDrawer({ facility, onClose }: { facility: Facility; onClose: () => void }) {
  const [tab, setTab] = useState<"overview"|"capabilities"|"trust"|"explain"|"notes">("overview");
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "capabilities", label: "Capabilities" },
    { id: "trust", label: "Trust Analysis" },
    { id: "explain", label: "AI Explainability" },
    { id: "notes", label: "Raw Notes" },
  ] as const;
  const reasoning = reasoningChain(facility);
  const notes = annotatedNotes(facility);
  const band = trustBand(facility.trust_score);

  return (
    <>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        className="fixed inset-0 bg-background/70 backdrop-blur-sm z-40" onClick={onClose} />
      <motion.aside
        initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring", damping:30, stiffness:280}}
        className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-[oklch(0.14_0.03_265)] border-l border-[var(--border-glow)] z-50 overflow-y-auto scrollbar-thin"
      >
        <div className="sticky top-0 glass-strong border-b border-[var(--border-glow)] px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-xl">{facility.name}</h2>
            <div className="text-xs text-muted-foreground mt-1 capitalize">{facility.type} · {facility.ownership} · {facility.district}, {facility.state}</div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10"><X className="w-5 h-5"/></button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-6 mb-6">
            <TrustGauge score={facility.trust_score} />
            <div className="flex-1">
              <div className={`text-${band.color} font-semibold`}>{band.label}</div>
              <div className="text-xs text-muted-foreground mt-1">Recommended for: {facility.trust_score >= 80 ? "Emergency referrals, specialist consultations" : facility.trust_score >= 60 ? "Routine referrals with verification" : "Field verification before any planning use"}</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {facility.emergency_ready && <span className="px-2 py-0.5 rounded-md text-xs bg-emerald/15 text-emerald border border-emerald/30">Emergency Ready</span>}
                {facility.beds_icu > 0 && <span className="px-2 py-0.5 rounded-md text-xs bg-cyan/15 text-cyan border border-cyan/30">{facility.beds_icu} ICU Beds</span>}
                {facility.desert_zone && <span className="px-2 py-0.5 rounded-md text-xs bg-rose/15 text-rose border border-rose/30">Desert Zone</span>}
              </div>
            </div>
          </div>

          <div className="flex border-b border-[var(--border)] mb-5 overflow-x-auto scrollbar-thin">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`px-4 py-2.5 text-sm whitespace-nowrap border-b-2 transition ${tab === t.id ? "border-cyan text-cyan" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                {t.label}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["State", facility.state], ["District", facility.district],
                  ["Coordinates", `${facility.lat.toFixed(3)}, ${facility.lng.toFixed(3)}`],
                  ["Ownership", facility.ownership],
                  ["Total Beds", facility.beds_total.toLocaleString()],
                  ["ICU Beds", facility.beds_icu], ["Emergency Beds", facility.beds_emergency],
                  ["Last Updated", facility.last_updated],
                ].map(([k,v]) => (
                  <div key={String(k)} className="p-3 rounded-lg bg-[oklch(0.16_0.03_265)] border border-[var(--border)]">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div>
                    <div className="font-mono mt-0.5">{v}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Specialists</div>
                <div className="flex flex-wrap gap-1.5">
                  {facility.specialists.length ? facility.specialists.map(s => (
                    <span key={s} className="px-2 py-0.5 text-xs rounded-md bg-violet/15 text-violet border border-violet/30">{s}</span>
                  )) : <span className="text-xs text-muted-foreground">None recorded</span>}
                </div>
              </div>
            </div>
          )}

          {tab === "capabilities" && (
            <div className="space-y-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-emerald mb-2">✓ Verified ({facility.verified_capabilities.length})</div>
                <div className="flex flex-wrap gap-1.5">
                  {facility.verified_capabilities.map(c => (
                    <span key={c} className="px-2.5 py-1 rounded-md text-xs bg-emerald/15 text-emerald border border-emerald/30">{c}</span>
                  ))}
                </div>
              </div>
              {facility.reported_capabilities.filter(c => !facility.verified_capabilities.includes(c)).length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-widest text-rose mb-2">⚠ Reported but Unverified</div>
                  <div className="flex flex-wrap gap-1.5">
                    {facility.reported_capabilities.filter(c => !facility.verified_capabilities.includes(c)).map(c => (
                      <span key={c} className="px-2.5 py-1 rounded-md text-xs bg-rose/15 text-rose border border-rose/30 line-through">{c}</span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Equipment</div>
                <ul className="text-sm space-y-1">
                  {facility.equipment.map(e => <li key={e} className="text-muted-foreground">• {e}</li>)}
                </ul>
              </div>
            </div>
          )}

          {tab === "trust" && (
            <div className="space-y-3">
              <div className="font-mono text-2xl">Overall Trust Score: <span className="text-cyan">{facility.trust_score}/100</span></div>
              {Object.entries(facility.trust_breakdown).map(([k, v]) => (
                <div key={k}>
                  <div className="flex justify-between text-xs mb-1"><span className="capitalize">{k.replaceAll("_"," ")}</span><span className="font-mono">{v}/100</span></div>
                  <div className="h-2 rounded-full bg-[oklch(0.22_0.03_265)] overflow-hidden">
                    <div className="h-full bg-gradient-cyan" style={{width: `${v}%`}}/>
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-1.5 text-sm">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Trust Factors</div>
                {facility.contradiction_flags.length === 0 ? (
                  <>
                    <div className="text-emerald">✅ Structured data matches unstructured notes</div>
                    <div className="text-emerald">✅ Equipment list corroborated by multiple sources</div>
                    <div className="text-emerald">✅ Bed capacity consistent across records</div>
                  </>
                ) : (
                  facility.contradiction_flags.map((c, i) => (
                    <div key={i} className={c.severity === "high" ? "text-rose" : "text-amber"}>
                      ⚠️ {c.claim} — {c.evidence} <span className="font-mono">(score impact {c.impact})</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {tab === "explain" && (
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-violet mb-1 flex items-center gap-1.5"><Sparkles className="w-3 h-3"/> AI Reasoning Chain</div>
              {reasoning.map((step, i) => (
                <motion.div key={i} initial={{opacity:0, x:-8}} animate={{opacity:1, x:0}} transition={{delay:i*0.1}}
                  className="flex gap-3 p-3 rounded-lg bg-[oklch(0.16_0.03_265)] border border-[var(--border)]">
                  <div className="w-7 h-7 rounded-full bg-violet/20 text-violet font-mono text-xs grid place-items-center flex-shrink-0">{i+1}</div>
                  <p className="text-sm leading-relaxed">{step}</p>
                </motion.div>
              ))}
              <div className="mt-4 p-4 rounded-lg bg-gradient-card border border-cyan/30">
                <div className="text-xs uppercase tracking-widest text-cyan">Final Verdict</div>
                <div className="font-display font-semibold text-lg mt-1">{band.label} Facility</div>
              </div>
            </div>
          )}

          {tab === "notes" && (
            <div>
              <div className="text-xs text-muted-foreground mb-3">Color legend: <span className="text-emerald">verified</span> · <span className="text-rose">flagged</span></div>
              <div className="p-4 rounded-lg bg-[oklch(0.16_0.03_265)] border border-[var(--border)] font-mono text-sm leading-relaxed">
                {notes.map((n, i) => (
                  <span key={i} className={n.kind === "verified" ? "bg-emerald/15 text-emerald rounded px-0.5" : n.kind === "flagged" ? "bg-rose/15 text-rose rounded px-0.5" : ""}>{n.text}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
}
