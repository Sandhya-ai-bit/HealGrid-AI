import { Link, useLocation } from "@tanstack/react-router";
import { Activity, Search, Upload, Map, BarChart3, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { StatusPulse } from "./StatusPulse";

const links = [
  { to: "/", label: "Home", icon: Activity },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/search", label: "Search", icon: Search },
  { to: "/map", label: "India Map", icon: Map },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/upload", label: "Upload", icon: Upload },
] as const;

export function Navbar() {
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-[var(--border-glow)]">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-cyan grid place-items-center">
            <Activity className="w-4 h-4 text-background" strokeWidth={2.5} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald pulse-dot" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display font-bold text-lg tracking-tight">HEALGRID</span>
            <span className="font-display font-bold text-lg text-gradient-cyan">AI</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => {
            const active = loc.pathname === to || (to !== "/" && loc.pathname.startsWith(to));
            return (
              <Link
                key={to} to={to}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all",
                  active ? "bg-[oklch(0.74_0.16_210/0.15)] text-cyan border border-[var(--border-glow)]" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <StatusPulse label="AI Engine Active" />
          <Link to="/dashboard" className="px-4 py-2 rounded-lg bg-gradient-cyan text-background font-semibold text-sm hover:scale-105 transition-transform glow-cyan">
            Launch App →
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg hover:bg-white/5">
          {open ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
        </button>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-[var(--border-glow)] glass px-5 py-3 flex flex-col gap-1">
          {links.map(({to,label,icon:Icon}) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-white/5">
              <Icon className="w-4 h-4" /> {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
