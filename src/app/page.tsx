"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, SlidersHorizontal, TrendingUp, Building2, MapPin,
  Briefcase, ArrowUpDown, ChevronDown, Sparkles, Brain,
  IndianRupee, GraduationCap, X, ExternalLink, Filter
} from "lucide-react";
import { placementData } from "@/lib/data";
import { getStats, filterCompanies, sortCompanies, parseCtc } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [minCtc, setMinCtc] = useState(0);
  const [maxCtc, setMaxCtc] = useState(0);
  const [cgpa, setCgpa] = useState(0);
  const [location, setLocation] = useState("All");
  const [sortBy, setSortBy] = useState("ctc");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);

  const stats = useMemo(() => getStats(placementData), []);
  const filtered = useMemo(() => {
    const f = filterCompanies(placementData, search, minCtc, maxCtc, cgpa, location);
    return sortCompanies(f, sortBy, sortOrder);
  }, [search, minCtc, maxCtc, cgpa, location, sortBy, sortOrder]);

  const locations = useMemo(() => {
    const locs = new Set<string>();
    locs.add("All");
    placementData.forEach(c => {
      if (c.location && c.location !== "-") {
        c.location.split("/").forEach(l => {
          const t = l.trim();
          if (t && t !== "Multiple Locations") locs.add(t);
        });
      }
    });
    return Array.from(locs).sort();
  }, []);

  const getCtcBadge = (ctc: string) => {
    const v = parseCtc(ctc);
    if (v >= 15) return "badge-emerald";
    if (v >= 8) return "badge-purple";
    if (v >= 5) return "badge-cyan";
    return "badge-amber";
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)]">Dashboard</h1>
        <p className="text-xs text-[rgba(240,238,233,0.5)] mt-1">Your placement intelligence overview</p>
      </motion.div>

      {/* Bento Stats Grid */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Companies", value: stats.totalCompanies, icon: Building2, color: "#8B5CF6", suffix: "+" },
          { label: "Avg Package", value: `₹${stats.avgPackage}`, icon: IndianRupee, color: "#10B981", suffix: " LPA" },
          { label: "Highest CTC", value: `₹${stats.highestPackage}`, icon: TrendingUp, color: "#F59E0B", suffix: " LPA" },
          { label: "Unique Roles", value: stats.totalRoles, icon: Briefcase, color: "#06B6D4", suffix: "+" },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants} className="glass-card p-4 stat-card group cursor-pointer" style={{ ["--stat-color" as string]: stat.color }}>
            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[20px]" style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }} />
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
              <span className="text-[10px] text-[var(--color-cloud-dancer-60)] uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold font-[family-name:var(--font-outfit)] tracking-tight">
              {stat.value}<span className="text-sm font-normal text-[var(--color-cloud-dancer-60)]">{stat.suffix}</span>
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Package Distribution + Top Locations Bento */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <motion.div variants={itemVariants} className="glass-card p-5">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#8B5CF6]" /> Package Distribution
          </h3>
          <div className="space-y-3">
            {stats.packageRanges.map((r, i) => {
              const max = Math.max(...stats.packageRanges.map(r => r.count));
              const pct = max > 0 ? (r.count / max) * 100 : 0;
              const colors = ["#F43F5E", "#F59E0B", "#8B5CF6", "#3B82F6", "#10B981"];
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-[var(--color-cloud-dancer-60)] w-20 shrink-0">{r.range}</span>
                  <div className="flex-1 h-6 rounded-lg bg-[rgba(255,255,255,0.03)] overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                      className="h-full rounded-lg" style={{ background: `${colors[i]}30` }}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-medium" style={{ color: colors[i] }}>{r.count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-5">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#06B6D4]" /> Top Hiring Locations
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {stats.topLocations.map((loc, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: `${["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#3B82F6", "#F43F5E"][i]}15`, color: ["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#3B82F6", "#F43F5E"][i] }}>
                  {i + 1}
                </div>
                <div>
                  <p className="text-xs font-medium truncate max-w-[100px]">{loc.name}</p>
                  <p className="text-[10px] text-[var(--color-cloud-dancer-60)]">{loc.count} companies</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Search & Filters */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-cloud-dancer-60)]" />
            <input type="text" placeholder="Search companies or roles... (⌘K)" className="input-glass pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowFilters(!showFilters)} className={`btn-ghost text-xs ${showFilters ? "!border-[#8B5CF6] !text-[#8B5CF6]" : ""}`}>
              <Filter className="w-3.5 h-3.5" /> Filters {showFilters ? <X className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")} className="btn-ghost text-xs">
              <ArrowUpDown className="w-3.5 h-3.5" /> {sortOrder === "desc" ? "High→Low" : "Low→High"}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-4 border-t border-[rgba(255,255,255,0.05)] mt-4">
                <div>
                  <label className="text-[10px] text-[var(--color-cloud-dancer-60)] uppercase tracking-wider mb-1 block">Min CTC (LPA)</label>
                  <input type="number" className="input-glass" placeholder="0" value={minCtc || ""} onChange={e => setMinCtc(Number(e.target.value))} />
                </div>
                <div>
                  <label className="text-[10px] text-[var(--color-cloud-dancer-60)] uppercase tracking-wider mb-1 block">Max CTC (LPA)</label>
                  <input type="number" className="input-glass" placeholder="Any" value={maxCtc || ""} onChange={e => setMaxCtc(Number(e.target.value))} />
                </div>
                <div>
                  <label className="text-[10px] text-[var(--color-cloud-dancer-60)] uppercase tracking-wider mb-1 block">Your CGPA</label>
                  <input type="number" step="0.1" className="input-glass" placeholder="e.g. 7.5" value={cgpa || ""} onChange={e => setCgpa(Number(e.target.value))} />
                </div>
                <div>
                  <label className="text-[10px] text-[var(--color-cloud-dancer-60)] uppercase tracking-wider mb-1 block">Location</label>
                  <select className="input-glass" value={location} onChange={e => setLocation(e.target.value)}>
                    {locations.map(l => <option key={l} value={l} className="bg-[#141414]">{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[var(--color-cloud-dancer-60)] uppercase tracking-wider mb-1 block">Sort By</label>
                  <select className="input-glass" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="ctc" className="bg-[#141414]">Package (CTC)</option>
                    <option value="name" className="bg-[#141414]">Company Name</option>
                    <option value="cgpa" className="bg-[#141414]">CGPA Required</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-xs text-[var(--color-cloud-dancer-60)]">
          Showing <span className="text-[var(--color-cloud-dancer)] font-semibold">{filtered.length}</span> opportunities
        </p>
        {(search || minCtc > 0 || maxCtc > 0 || cgpa > 0 || location !== "All") && (
          <button onClick={() => { setSearch(""); setMinCtc(0); setMaxCtc(0); setCgpa(0); setLocation("All"); }} className="text-xs text-[#8B5CF6] hover:underline cursor-pointer flex items-center gap-1">
            <X className="w-3 h-3" /> Clear All
          </button>
        )}
      </div>

      {/* Company Cards Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        <AnimatePresence mode="popLayout">
          {filtered.map((company) => (
            <motion.div
              key={`${company.id}-${company.role}`}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-4 cursor-pointer group"
              onClick={() => setSelectedCompany(selectedCompany === company.id ? null : company.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[rgba(139,92,246,0.15)] to-[rgba(6,182,212,0.15)] flex items-center justify-center text-sm font-bold text-[#8B5CF6] border border-[rgba(139,92,246,0.2)]">
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold group-hover:text-[#8B5CF6] transition-colors">{company.name}</h3>
                    <p className="text-[11px] text-[var(--color-cloud-dancer-60)]">{company.date}</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--color-cloud-dancer-20)] group-hover:text-[var(--color-cloud-dancer-60)] transition-colors" />
              </div>

              <p className="text-xs text-[var(--color-cloud-dancer-80)] mb-3 line-clamp-1">{company.role}</p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {company.ctc && company.ctc !== "-" && (
                  <span className={`badge ${getCtcBadge(company.ctc)}`}>
                    <IndianRupee className="w-2.5 h-2.5" /> {company.ctc.replace("₹", "").trim()}
                  </span>
                )}
                {company.cgpa && (
                  <span className="badge badge-purple">
                    <GraduationCap className="w-2.5 h-2.5" /> {company.cgpa} CGPA
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-[10px] text-[var(--color-cloud-dancer-60)]">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {company.location || "Not specified"}</span>
                {company.stipend && company.stipend !== "-" && company.stipend !== "No stipend" && (
                  <span className="text-[#10B981]">{company.stipend}</span>
                )}
              </div>

              <AnimatePresence>
                {selectedCompany === company.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.05)] space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-[var(--color-cloud-dancer-60)]">Duration</span>
                        <span>{company.duration || "Not specified"}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-[var(--color-cloud-dancer-60)]">Stipend</span>
                        <span>{company.stipend || "Not specified"}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-[var(--color-cloud-dancer-60)]">CGPA Required</span>
                        <span>{company.cgpa || "No criteria"}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-3xl bg-[rgba(139,92,246,0.1)] flex items-center justify-center mb-4">
            <Search className="w-7 h-7 text-[#8B5CF6]" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No matches found</h3>
          <p className="text-sm text-[var(--color-cloud-dancer-60)]">Try adjusting your filters or search query</p>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="text-center py-8 border-t border-[rgba(255,255,255,0.05)]">
        <p className="text-[11px] text-[rgba(240,238,233,0.5)]">
          HireMap · Built with 📍 for the 2026 Batch · {placementData.length} opportunities loaded
        </p>
      </footer>
    </div>
  );
}

