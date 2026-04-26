import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layers, Filter as FilterIcon } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";
import { TrustScoreBadge } from "@/components/shared/TrustScoreBadge";
import { mockFacilities, totalIndexed, desertZones, avgTrust } from "@/lib/mock-data";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "India Heatmap — HEALGRID AI" },
      { name: "description", content: "Interactive India healthcare heatmap with facility markers, desert zones, and trust score overlays." },
      { property: "og:title", content: "HEALGRID AI India Heatmap" },
      { property: "og:description", content: "Map facility coverage, deserts, and trust across India." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const [Comp, setComp] = useState<React.ComponentType | null>(null);
  const [filterType, setFilterType] = useState("all");
  const [showDeserts, setShowDeserts] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const RL = await import("react-leaflet");
      const L = (await import("leaflet")).default;
      // fix default icon
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const Inner = () => {
        const filtered = mockFacilities.filter(f => filterType === "all" || f.type === filterType);
        return (
          <RL.MapContainer center={[22.5, 80]} zoom={5} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
            <RL.TileLayer
              attribution='&copy; OpenStreetMap, &copy; CARTO'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {showMarkers && filtered.map(f => {
              const color = f.trust_score >= 70 ? "#10b981" : f.trust_score >= 40 ? "#f59e0b" : "#f43f5e";
              const radius = Math.max(5, Math.min(18, Math.sqrt(f.beds_total) / 2));
              return (
                <RL.CircleMarker
                  key={f.id}
                  center={[f.lat, f.lng]}
                  radius={radius}
                  pathOptions={{ color, fillColor: color, fillOpacity: 0.65, weight: 1.5 }}
                >
                  <RL.Popup>
                    <div style={{ minWidth: 200 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{f.shortName}</div>
                      <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{f.district}, {f.state}</div>
                      <div style={{ marginTop: 6, fontSize: 12 }}>
                        Trust: <strong style={{ color }}>{f.trust_score}</strong> · Beds: {f.beds_total} · ICU: {f.beds_icu}
                      </div>
                      <div style={{ marginTop: 4, fontSize: 11, opacity: 0.8 }}>{f.ai_summary}</div>
                    </div>
                  </RL.Popup>
                </RL.CircleMarker>
              );
            })}
            {showDeserts && mockFacilities.filter(f => f.desert_zone).map(f => (
              <RL.Circle key={`d-${f.id}`} center={[f.lat, f.lng]} radius={45000}
                pathOptions={{ color: "#f43f5e", fillColor: "#f43f5e", fillOpacity: 0.12, weight: 1, dashArray: "4 6" }}
              />
            ))}
          </RL.MapContainer>
        );
      };
      if (mounted) setComp(() => Inner);
    })();
    return () => { mounted = false; };
  }, [filterType, showDeserts, showMarkers]);

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      <div className="absolute inset-0">
        {Comp ? <Comp /> : <div className="h-full grid place-items-center text-muted-foreground">Loading map…</div>}
      </div>

      {/* Floating control panel */}
      <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}}
        className="absolute top-5 left-5 z-[400] w-72 space-y-3">
        <GlowCard className="!p-4 glass-strong">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-cyan font-semibold mb-3"><Layers className="w-3.5 h-3.5"/> Map Layers</div>
          <label className="flex items-center gap-2 text-sm cursor-pointer mb-2">
            <input type="checkbox" checked={showMarkers} onChange={e => setShowMarkers(e.target.checked)} className="accent-cyan" />
            Facility Markers
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={showDeserts} onChange={e => setShowDeserts(e.target.checked)} className="accent-cyan" />
            Healthcare Desert Zones
          </label>
        </GlowCard>

        <GlowCard className="!p-4 glass-strong">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-cyan font-semibold mb-3"><FilterIcon className="w-3.5 h-3.5"/> Filter</div>
          <label className="text-xs text-muted-foreground">Facility Type</label>
          <select value={filterType} onChange={e => setFilterType(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded-lg bg-[oklch(0.16_0.03_265)] border border-[var(--border)] text-sm focus:outline-none focus:border-cyan/60">
            <option value="all">All Types</option>
            <option value="tertiary">Tertiary</option>
            <option value="district">District</option>
            <option value="chc">CHC</option>
            <option value="phc">PHC</option>
            <option value="private">Private</option>
          </select>
          <div className="mt-4 pt-3 border-t border-[var(--border)] space-y-1.5 text-xs">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald"/> Trust ≥ 70</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber"/> Trust 40–69</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-rose"/> Trust &lt; 40</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full border-2 border-rose border-dashed"/> Desert zone</div>
          </div>
        </GlowCard>
      </motion.div>

      {/* Bottom stats bar */}
      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[400]">
        <div className="glass-strong rounded-full px-6 py-2.5 flex items-center gap-6 text-xs">
          <span><span className="text-muted-foreground">Viewing</span> <strong>All India</strong></span>
          <span className="text-cyan">·</span>
          <span><span className="text-muted-foreground">Facilities</span> <strong className="font-mono">{totalIndexed.toLocaleString()}</strong></span>
          <span className="text-cyan">·</span>
          <span><span className="text-muted-foreground">Deserts</span> <strong className="font-mono text-rose">{desertZones.toLocaleString()}</strong></span>
          <span className="text-cyan">·</span>
          <span><span className="text-muted-foreground">Avg Trust</span> <TrustScoreBadge score={Math.round(avgTrust)} size="sm"/></span>
        </div>
      </motion.div>
    </div>
  );
}
