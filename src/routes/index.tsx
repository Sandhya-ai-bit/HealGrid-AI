import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Brain, Shield, Search, Zap, Map as MapIcon, BarChart3, ArrowRight, Sparkles, Activity, Plus } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { TrustScoreBadge } from "@/components/shared/TrustScoreBadge";
import { totalIndexed, parseAccuracy, desertZones, totalContradictions } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HEALGRID AI — Transform Medical Records into Healthcare Intelligence" },
      { name: "description", content: "Agentic AI parses 10,000+ Indian hospital records, scores trustworthiness, detects contradictions, and maps healthcare deserts." },
      { property: "og:title", content: "HEALGRID AI — India's Healthcare Intelligence Grid" },
      { property: "og:description", content: "Agentic AI for trustworthy, explainable healthcare intelligence." },
    ],
  }),
  component: Index,
});

function Particles() {
  const items = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const left = (i * 53) % 100;
        const dur = 14 + (i % 6) * 3;
        const delay = (i % 8) * 1.4;
        return (
          <Plus key={i}
            className="absolute text-cyan/30 float-particle"
            style={{ left: `${left}%`, bottom: -40, width: 14 + (i%3)*4, height: 14 + (i%3)*4, animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
            strokeWidth={2.5}
          />
        );
      })}
    </div>
  );
}

const features = [
  { icon: Brain, color: "cyan", title: "AI Note Parser", desc: "Extracts capabilities from unstructured medical notes with multi-signal NLP." },
  { icon: Shield, color: "emerald", title: "Trust Engine", desc: "Scores reliability 0–100 across 6 weighted dimensions for every facility." },
  { icon: Search, color: "violet", title: "Semantic Search", desc: "Natural-language facility discovery with full explainability and source attribution." },
  { icon: Zap, color: "amber", title: "Contradiction Detector", desc: "Flags infrastructure inconsistencies between claims and ground truth." },
  { icon: MapIcon, color: "rose", title: "Desert Mapper", desc: "Identifies healthcare coverage gaps across India's geography." },
  { icon: BarChart3, color: "cyan", title: "NGO Analytics", desc: "Planning dashboards with intervention ROI simulation for resource allocation." },
];

function Index() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden mesh-bg">
        <Particles />
        <div className="relative max-w-[1500px] mx-auto px-5 sm:px-8 pt-20 pb-28">
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-[var(--border-glow)] text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-cyan" />
              <span className="text-muted-foreground">Powered by</span>
              <span className="text-cyan">Agentic AI</span>
            </div>

            <h1 className="mt-6 font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight max-w-4xl leading-[1.05]">
              India's Healthcare<br />Intelligence <span className="text-gradient-cyan">Grid</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              Transform 10,000+ messy hospital records into trustworthy, explainable healthcare intelligence.
              Detect capabilities. Expose contradictions. Map the underserved.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-cyan text-background font-semibold glow-cyan hover:scale-105 transition-transform">
                Explore Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/map" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass font-semibold hover:border-[oklch(0.74_0.16_210/0.6)] transition-colors">
                <MapIcon className="w-4 h-4" /> View Live Map
              </Link>
            </div>

            {/* Floating preview */}
            <motion.div
              initial={{opacity:0, y:40}} animate={{opacity:1, y:0}} transition={{delay:0.4, duration:0.7}}
              className="mt-16 w-full max-w-2xl"
            >
              <GlowCard className="text-left bg-gradient-card">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Live Analysis</div>
                    <div className="mt-1 font-display font-semibold text-lg">AIIMS New Delhi</div>
                    <div className="text-sm text-muted-foreground">Tertiary • Public • Delhi</div>
                  </div>
                  <TrustScoreBadge score={94} size="lg" />
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["ICU","MRI","CT","NICU","Trauma","Cardiac"].map(c => (
                    <span key={c} className="px-2 py-0.5 rounded-md text-xs bg-[oklch(0.72_0.17_162/0.12)] text-emerald border border-emerald/30">✓ {c}</span>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                  <div className="text-muted-foreground">Beds <div className="text-foreground font-mono text-base">2,478</div></div>
                  <div className="text-muted-foreground">ICU <div className="text-foreground font-mono text-base">148</div></div>
                  <div className="text-muted-foreground">Flags <div className="text-emerald font-mono text-base">0</div></div>
                </div>
              </GlowCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-[var(--border-glow)] bg-[oklch(0.16_0.03_265/0.6)]">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Facilities Indexed", value: totalIndexed, color: "text-cyan" },
            { label: "Parse Accuracy", value: parseAccuracy, suffix: "%", decimals: 1, color: "text-emerald" },
            { label: "Deserts Detected", value: desertZones, color: "text-rose" },
            { label: "Contradiction Flags", value: totalContradictions, color: "text-amber" },
          ].map(s => (
            <div key={s.label} className="text-center md:text-left">
              <div className={`font-display font-bold text-3xl sm:text-4xl ${s.color}`}>
                <AnimatedNumber value={s.value} suffix={s.suffix||""} decimals={s.decimals||0} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-[1500px] mx-auto px-5 sm:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-cyan font-semibold">Capabilities</div>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl">An agentic system, not a dashboard</h2>
          <p className="mt-3 text-muted-foreground">Six AI engines collaborate to turn raw records into decisions you can trust.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.05, duration:0.4}}
            >
              <GlowCard glow={f.color === "rose" ? "rose" : f.color === "emerald" ? "emerald" : "cyan"} className="h-full">
                <div className={`w-11 h-11 rounded-xl grid place-items-center mb-4 bg-${f.color}/10 border border-${f.color}/30`}>
                  <f.icon className={`w-5 h-5 text-${f.color}`} />
                </div>
                <h3 className="font-display font-semibold text-lg">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DEMO CONTRAST */}
      <section className="max-w-[1500px] mx-auto px-5 sm:px-8 pb-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display font-bold text-3xl sm:text-4xl">From mess to intelligence</h2>
          <p className="mt-3 text-muted-foreground">Watch HEALGRID transform raw notes into structured, scored insight.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          <div className="relative rounded-2xl border border-rose/30 bg-[oklch(0.65_0.22_20/0.05)] p-6">
            <div className="text-[11px] uppercase tracking-widest text-rose font-semibold">Raw Input</div>
            <div className="mt-2 font-display text-lg">Hospital Notes (unstructured)</div>
            <pre className="mt-4 text-xs leading-relaxed font-mono text-muted-foreground whitespace-pre-wrap">
{`PHC functional 9am-5pm weekdays.
Doctor avail Mon-Sat. ICU 2 beds listed
in registry but no functional vents.
Emergency cases sent to Jodhpur 127km.
Last updated Nov 2024. No specialists.`}
            </pre>
          </div>
          <div className="relative rounded-2xl border border-emerald/40 bg-[oklch(0.72_0.17_162/0.05)] p-6 glow-emerald">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-emerald font-semibold">HEALGRID Output</div>
                <div className="mt-2 font-display text-lg">PHC Barmer-7</div>
              </div>
              <TrustScoreBadge score={23} size="md" showLabel />
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div><span className="text-muted-foreground">Verified:</span> <span className="text-emerald">OPD only</span></div>
              <div><span className="text-muted-foreground">Reported but unverified:</span> <span className="text-rose">ICU, 24hr Emergency</span></div>
              <div><span className="text-muted-foreground">Contradiction flags:</span> <span className="font-mono text-rose">2 high severity</span></div>
              <div><span className="text-muted-foreground">Desert zone:</span> <span className="text-amber">Yes — nearest care 127km</span></div>
            </div>
            <div className="mt-4 pt-4 border-t border-emerald/20 text-xs text-muted-foreground">
              Recommendation: Do not rely on for emergencies. Field verification required.
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border-glow)] py-10">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan" />
            <span className="font-display font-bold">HEALGRID <span className="text-cyan">AI</span></span>
          </div>
          <div className="text-xs text-muted-foreground">Built for India's Healthcare Future · Hackathon Demo Build</div>
        </div>
      </footer>
    </div>
  );
}
