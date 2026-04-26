import { mockFacilities, type Facility } from "./mock-data";

export const CAPABILITY_KEYWORDS: Record<string, string[]> = {
  ICU: ["icu","intensive care","critical care","ventilator"],
  MRI: ["mri","magnetic resonance","1.5t","3t"],
  CT: ["ct scan","computed tomography","ct scanner","ct"],
  Emergency: ["emergency","casualty","trauma","24 hour","24hr","24/7"],
  Surgery: ["operation theater","ot ","surgical","surgery"],
  NICU: ["nicu","neonatal","newborn icu"],
  "Blood Bank": ["blood bank","blood storage"],
  Dialysis: ["dialysis","hemodialysis","renal replacement"],
  Cardiac: ["cardiac","cath lab","cardiology"],
  Neurology: ["neuro","neurology","neurosurgery"],
};

export type SearchResult = Facility & { matchScore: number; highlights: string[] };

export function semanticSearch(query: string, opts?: {
  state?: string; minTrust?: number; types?: string[]; capabilities?: string[]; flagsMode?: "all"|"clean"|"flagged";
}): SearchResult[] {
  const q = query.trim().toLowerCase();
  const tokens = q.split(/\s+/).filter(Boolean);
  return mockFacilities
    .filter(f => {
      if (opts?.state && opts.state !== "All" && f.state !== opts.state) return false;
      if (opts?.minTrust !== undefined && f.trust_score < opts.minTrust) return false;
      if (opts?.types && opts.types.length && !opts.types.includes(f.type)) return false;
      if (opts?.capabilities && opts.capabilities.length && !opts.capabilities.every(c => f.verified_capabilities.includes(c))) return false;
      if (opts?.flagsMode === "clean" && f.contradiction_flags.length > 0) return false;
      if (opts?.flagsMode === "flagged" && f.contradiction_flags.length === 0) return false;
      return true;
    })
    .map(f => {
      let score = 0;
      const highlights: string[] = [];
      const hay = `${f.name} ${f.state} ${f.district} ${f.verified_capabilities.join(" ")} ${f.specialists.join(" ")} ${f.raw_notes}`.toLowerCase();
      for (const t of tokens) {
        if (!t) continue;
        if (hay.includes(t)) { score += 5; highlights.push(t); }
        if (f.name.toLowerCase().includes(t)) score += 10;
        if (f.state.toLowerCase().includes(t)) score += 4;
        if (f.verified_capabilities.some(c => c.toLowerCase().includes(t))) score += 6;
      }
      score += f.trust_score / 20;
      return { ...f, matchScore: score, highlights };
    })
    .filter(f => q ? f.matchScore > 1 : true)
    .sort((a, b) => b.matchScore - a.matchScore);
}

export function trustBand(score: number): { label: string; color: "emerald"|"amber"|"orange"|"rose" } {
  if (score >= 80) return { label: "Highly Reliable", color: "emerald" };
  if (score >= 60) return { label: "Moderately Reliable", color: "amber" };
  if (score >= 40) return { label: "Low Reliability", color: "orange" };
  return { label: "Unreliable", color: "rose" };
}

export function reasoningChain(f: Facility): string[] {
  const totalCaps = f.reported_capabilities.length;
  const verifiedCaps = f.verified_capabilities.length;
  const flags = f.contradiction_flags.length;
  return [
    `Step 1 — Parsed ${f.raw_notes.split(/\s+/).length} words of facility notes; extracted ${verifiedCaps} verified capability signals.`,
    `Step 2 — Cross-referenced ${totalCaps} reported capabilities against structured registry → ${verifiedCaps}/${totalCaps} confirmed.`,
    `Step 3 — Contradiction scan: ${flags === 0 ? "no inconsistencies detected" : `${flags} flag${flags>1?"s":""} raised, score impact ${f.contradiction_flags.reduce((s,x)=>s+x.impact,0)}`}.`,
    `Step 4 — Temporal freshness: last update ${f.last_updated}; freshness component ${f.trust_breakdown.temporal_freshness}/100.`,
    `Final — Weighted aggregate produces trust score ${f.trust_score}/100 (${trustBand(f.trust_score).label}).`,
  ];
}

export function annotatedNotes(f: Facility): { text: string; kind: "verified"|"flagged"|"normal" }[] {
  const tokens = f.raw_notes.split(/(\.|\n)/);
  const verified = new Set(f.verified_capabilities.map(c => c.toLowerCase()));
  const flaggedClaims = f.contradiction_flags.flatMap(c => c.claim.toLowerCase().split(/\s+/));
  return tokens.map(t => {
    const lower = t.toLowerCase();
    if (flaggedClaims.some(fc => fc.length > 3 && lower.includes(fc))) return { text: t, kind: "flagged" as const };
    if ([...verified].some(v => lower.includes(v))) return { text: t, kind: "verified" as const };
    return { text: t, kind: "normal" as const };
  });
}
