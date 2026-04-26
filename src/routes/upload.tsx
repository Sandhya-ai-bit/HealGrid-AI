import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileSpreadsheet, Check, Sparkles, ArrowRight } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload Dataset — HEALGRID AI" },
      { name: "description", content: "Upload your medical facility dataset (CSV, XLSX) and watch the AI pipeline parse, score, and validate it." },
      { property: "og:title", content: "HEALGRID AI Dataset Upload" },
      { property: "og:description", content: "Drop in messy hospital records — HEALGRID does the rest." },
    ],
  }),
  component: UploadPage,
});

const STEPS = ["Upload", "Validate", "Process", "Results"];

function UploadPage() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const startProcessing = () => {
    setStep(2);
    setProgress(0);
    setLogs([]);
    const messages = [
      "Deduplication pass complete (47 removed)",
      "Column normalization complete",
      "NLP parsing notes (8,432 records)…",
      "Capability extraction complete",
      "Trust scoring engine running…",
      "Contradiction detection active",
      "Desert zone calculation finished",
      "Search index rebuilt",
    ];
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setProgress(Math.min(100, i * 12.5));
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ✓ ${messages[i-1] || "complete"}`]);
      if (i >= 8) {
        clearInterval(iv);
        setTimeout(() => setStep(3), 600);
      }
    }, 600);
  };

  const onDrop = (e: React.DragEvent) => { e.preventDefault(); setStep(1); };
  const loadSample = () => setStep(1);

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={`flex items-center gap-2 ${i <= step ? "text-cyan" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full grid place-items-center font-mono text-xs border-2 ${i <= step ? "border-cyan bg-cyan/10" : "border-[var(--border)]"}`}>
                {i < step ? <Check className="w-4 h-4"/> : i+1}
              </div>
              <span className="text-sm font-medium hidden sm:inline">{s}</span>
            </div>
            {i < STEPS.length-1 && <div className={`flex-1 h-0.5 mx-3 ${i < step ? "bg-cyan" : "bg-[var(--border)]"}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="0" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}}>
            <GlowCard className="!p-10">
              <div onDragOver={e=>e.preventDefault()} onDrop={onDrop}
                className="border-2 border-dashed border-[var(--border-glow)] rounded-2xl p-12 text-center hover:border-cyan/60 transition cursor-pointer">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan/10 border border-cyan/30 grid place-items-center mb-4">
                  <Upload className="w-7 h-7 text-cyan" />
                </div>
                <div className="font-display font-semibold text-xl">Drop your dataset here</div>
                <div className="text-sm text-muted-foreground mt-1">Supported: .xlsx, .csv, .json · Max 50MB</div>
                <button onClick={() => setStep(1)} className="mt-6 px-5 py-2.5 rounded-lg bg-gradient-cyan text-background font-semibold glow-cyan hover:scale-105 transition">Browse Files</button>
                <div className="mt-6 text-sm">Or use sample dataset: <button onClick={loadSample} className="text-cyan underline">Load Sample →</button></div>
              </div>
            </GlowCard>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="1" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}}>
            <GlowCard className="!p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileSpreadsheet className="w-6 h-6 text-emerald"/>
                <div>
                  <div className="font-display font-semibold">VF_Hackathon_Dataset_India.xlsx</div>
                  <div className="text-xs text-muted-foreground">10,847 records · 23/26 columns mapped</div>
                </div>
                <div className="ml-auto text-emerald flex items-center gap-1 text-sm"><Check className="w-4 h-4"/> Validated</div>
              </div>

              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-4 mb-2">Column Mapping</div>
              <div className="space-y-1.5 text-sm font-mono">
                {[
                  ["✅","facility_name → Facility Name","emerald"],
                  ["✅","state → State","emerald"],
                  ["✅","beds_total → Total Beds","emerald"],
                  ["✅","notes → Unstructured Notes (AI will parse)","emerald"],
                  ["⚠️","equipment_list → Partially formatted","amber"],
                  ["❌","last_inspection → Missing (will estimate)","rose"],
                ].map(([icon, text, color]) => (
                  <div key={text} className={`text-${color}`}>{icon} {text}</div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                <div className="p-3 rounded-lg bg-[oklch(0.16_0.03_265)] border border-[var(--border)]">
                  <div className="text-xs text-muted-foreground">Missing values</div>
                  <div className="font-mono text-lg">23.4%</div>
                </div>
                <div className="p-3 rounded-lg bg-[oklch(0.16_0.03_265)] border border-[var(--border)]">
                  <div className="text-xs text-muted-foreground">Duplicates</div>
                  <div className="font-mono text-lg text-amber">47</div>
                </div>
                <div className="p-3 rounded-lg bg-[oklch(0.16_0.03_265)] border border-[var(--border)]">
                  <div className="text-xs text-muted-foreground">Notes with content</div>
                  <div className="font-mono text-lg text-emerald">77.7%</div>
                </div>
              </div>

              <button onClick={startProcessing} className="mt-6 w-full px-5 py-3 rounded-lg bg-gradient-cyan text-background font-semibold glow-cyan hover:scale-[1.02] transition flex items-center justify-center gap-2">
                Proceed to Processing <ArrowRight className="w-4 h-4"/>
              </button>
            </GlowCard>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="2" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}}>
            <GlowCard className="!p-6">
              <div className="flex items-center gap-2 text-cyan font-semibold uppercase tracking-widest text-xs"><Sparkles className="w-3.5 h-3.5"/> AI Pipeline Running</div>
              <div className="mt-4 mb-2 flex justify-between text-sm"><span>Processing 10,800 records…</span><span className="font-mono">{progress}%</span></div>
              <div className="h-2.5 rounded-full bg-[oklch(0.22_0.03_265)] overflow-hidden">
                <motion.div className="h-full bg-gradient-cyan glow-cyan" animate={{width: `${progress}%`}} transition={{duration:0.3}} />
              </div>
              <div className="mt-5 p-4 rounded-lg bg-[oklch(0.10_0.02_265)] border border-[var(--border)] font-mono text-xs h-56 overflow-y-auto scrollbar-thin">
                {logs.map((l, i) => (
                  <motion.div key={i} initial={{opacity:0}} animate={{opacity:1}} className="text-emerald">{l}</motion.div>
                ))}
                <div className="text-cyan animate-pulse mt-1">▌</div>
              </div>
            </GlowCard>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="3" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}}>
            <GlowCard className="!p-8 text-center" glow="emerald">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald/15 border border-emerald/40 grid place-items-center mb-4">
                <Check className="w-8 h-8 text-emerald" />
              </div>
              <h2 className="font-display font-bold text-2xl">Processing Complete</h2>
              <p className="text-muted-foreground mt-1">10,800 records processed · 47 duplicates removed</p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                {[
                  ["Capabilities Extracted", "94,231", "cyan"],
                  ["Trust Scores", "10,800", "emerald"],
                  ["Contradictions", "847", "amber"],
                  ["Desert Zones", "2,341", "rose"],
                ].map(([l, v, c]) => (
                  <div key={l} className={`p-4 rounded-lg bg-${c}/10 border border-${c}/30`}>
                    <div className={`font-mono text-xl text-${c}`}>{v}</div>
                    <div className="text-xs text-muted-foreground mt-1">{l}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <Link to="/dashboard" className="px-5 py-2.5 rounded-lg bg-gradient-cyan text-background font-semibold glow-cyan hover:scale-105 transition">→ View Dashboard</Link>
                <Link to="/map" className="px-5 py-2.5 rounded-lg glass font-semibold hover:border-cyan/60 transition">→ Explore Map</Link>
              </div>
            </GlowCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
