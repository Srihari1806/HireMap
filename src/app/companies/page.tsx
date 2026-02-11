"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, Filter, ArrowUpDown, Building2, MapPin, IndianRupee, GraduationCap,
    X, ExternalLink, Briefcase, Clock, Calendar, ChevronDown, ChevronUp,
    BookOpen, Target, Code2, Trophy, Sparkles, ArrowRight, Link2
} from "lucide-react";
import { placementData } from "@/lib/data";
import { filterCompanies, sortCompanies, parseCtc } from "@/lib/utils";
import { getRoadmapForRole, getCompanyPrep, roleCategories, type CompanyPrep } from "@/lib/prep-data";
import type { Company } from "@/lib/types";

const MONTH_MAP: Record<string, number> = {
    jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2,
    apr: 3, april: 3, may: 4, jun: 5, june: 5, jul: 6, july: 6,
    aug: 7, august: 7, sep: 8, sept: 8, september: 8,
    oct: 9, october: 9, nov: 10, november: 10, dec: 11, december: 11,
};

function parseDateCustom(dateStr: string): Date | null {
    if (!dateStr || dateStr === "-") return null;
    // "4th Sept'2025" → day=4, month=Sept, year=2025
    const m = dateStr.match(/(\d+)\s*(?:st|nd|rd|th)?\s+([A-Za-z]+)[''']?\s*(\d{4})/);
    if (!m) return null;
    const day = parseInt(m[1]);
    const monthIdx = MONTH_MAP[m[2].toLowerCase()];
    const year = parseInt(m[3]);
    if (monthIdx === undefined || isNaN(day) || isNaN(year)) return null;
    return new Date(year, monthIdx, day);
}

function getMonthLabel(d: Date): string {
    return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

function getMonthKey(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
}

export default function CompaniesPage() {
    const [search, setSearch] = useState("");
    const [minCtc, setMinCtc] = useState(0);
    const [maxCtc, setMaxCtc] = useState(0);
    const [cgpa, setCgpa] = useState(0);
    const [location, setLocation] = useState("All");
    const [sortBy, setSortBy] = useState("ctc");
    const [sortOrder, setSortOrder] = useState("desc");
    const [dateOrder, setDateOrder] = useState<"newest" | "oldest" | "off">("off");
    const [roleFilter, setRoleFilter] = useState("");
    const [monthFilter, setMonthFilter] = useState("All");
    const [showFilters, setShowFilters] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [prepView, setPrepView] = useState<string | null>(null);

    // Extract unique months from data, sorted chronologically
    const monthOptions = useMemo(() => {
        const map = new Map<string, string>();
        placementData.forEach(c => {
            const d = parseDateCustom(c.date);
            if (d) {
                const key = getMonthKey(d);
                if (!map.has(key)) map.set(key, getMonthLabel(d));
            }
        });
        return [{ key: "All", label: "All Months" }, ...Array.from(map.entries())
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([key, label]) => ({ key, label }))];
    }, []);

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

    const filtered = useMemo(() => {
        let data = filterCompanies(placementData, search, minCtc, maxCtc, cgpa, location);

        // Role filter
        if (roleFilter) {
            const tokens = roleFilter.split(",").map(t => t.trim().toLowerCase());
            data = data.filter(c => tokens.some(t => c.role.toLowerCase().includes(t)));
        }

        // Month filter
        if (monthFilter !== "All") {
            data = data.filter(c => {
                const d = parseDateCustom(c.date);
                return d ? getMonthKey(d) === monthFilter : false;
            });
        }

        // Date sorting takes priority if active
        if (dateOrder !== "off") {
            return [...data].sort((a, b) => {
                const da = parseDateCustom(a.date)?.getTime() ?? 0;
                const db = parseDateCustom(b.date)?.getTime() ?? 0;
                return dateOrder === "newest" ? db - da : da - db;
            });
        }

        return sortCompanies(data, sortBy, sortOrder);
    }, [search, minCtc, maxCtc, cgpa, location, sortBy, sortOrder, dateOrder, roleFilter, monthFilter]);

    const getCtcBadge = (ctc: string) => {
        const v = parseCtc(ctc);
        if (v >= 15) return "badge-emerald";
        if (v >= 8) return "badge-purple";
        if (v >= 5) return "badge-cyan";
        return "badge-amber";
    };

    const getDiffColor = (d: string) =>
        d === "Hard" ? "#F43F5E" : d === "Medium" ? "#F59E0B" : "#10B981";

    const companyKey = (c: Company) => `${c.id}-${c.role}`;

    return (
        <div>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)]">Companies</h1>
                <p className="text-xs text-[rgba(240,238,233,0.5)] mt-1">
                    {filtered.length} opportunities from {new Set(filtered.map(c => c.name)).size} companies
                </p>
            </motion.div>

            {/* Search & Filters */}
            <div className="glass-card p-4 mb-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(240,238,233,0.4)]" />
                        <input type="text" placeholder="Search companies or roles..." className="input-glass pl-10"
                            value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <button onClick={() => setShowFilters(!showFilters)}
                            className={`btn-ghost text-xs ${showFilters ? "!border-[#8B5CF6] !text-[#8B5CF6]" : ""}`}>
                            <Filter className="w-3.5 h-3.5" /> Filters {showFilters ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                        {/* Date Sort Toggle */}
                        <button onClick={() => {
                            setDateOrder(d => d === "off" ? "newest" : d === "newest" ? "oldest" : "off");
                        }} className={`btn-ghost text-xs ${dateOrder !== "off" ? "!border-[#06B6D4] !text-[#06B6D4]" : ""}`}>
                            <Calendar className="w-3.5 h-3.5" />
                            {dateOrder === "off" ? "Date" : dateOrder === "newest" ? "Newest First" : "Oldest First"}
                        </button>
                        {/* CTC Sort Toggle */}
                        <button onClick={() => {
                            setDateOrder("off");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }} className="btn-ghost text-xs">
                            <ArrowUpDown className="w-3.5 h-3.5" /> {sortOrder === "desc" ? "High→Low" : "Low→High"}
                        </button>
                    </div>
                </div>

                {/* Role Filter Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[rgba(255,255,255,0.04)]">
                    {roleCategories.map(cat => (
                        <button key={cat.value} onClick={() => setRoleFilter(cat.value)}
                            className={`text-[10px] px-2.5 py-1.5 rounded-lg border transition-all ${roleFilter === cat.value
                                ? "bg-[rgba(139,92,246,0.12)] border-[rgba(139,92,246,0.3)] text-[#8B5CF6]"
                                : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[rgba(240,238,233,0.5)] hover:border-[rgba(255,255,255,0.12)]"
                                }`}>
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Month Filter Pills */}
                <div className="flex gap-1.5 mt-2 pt-2 border-t border-[rgba(255,255,255,0.03)] overflow-x-auto pb-1 scrollbar-hide">
                    {monthOptions.map(opt => (
                        <button key={opt.key} onClick={() => setMonthFilter(opt.key)}
                            className={`text-[10px] px-2.5 py-1.5 rounded-lg border transition-all whitespace-nowrap shrink-0 ${monthFilter === opt.key
                                ? "bg-[rgba(6,182,212,0.12)] border-[rgba(6,182,212,0.3)] text-[#06B6D4]"
                                : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[rgba(240,238,233,0.5)] hover:border-[rgba(255,255,255,0.12)]"
                                }`}>
                            <Calendar className="w-2.5 h-2.5 inline mr-1" />{opt.label}
                        </button>
                    ))}
                </div>

                {/* Advanced Filters */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-[rgba(255,255,255,0.05)] mt-3">
                                <div>
                                    <label className="text-[10px] text-[rgba(240,238,233,0.4)] uppercase tracking-wider mb-1 block">Min CTC</label>
                                    <input type="number" className="input-glass" placeholder="0" value={minCtc || ""} onChange={e => setMinCtc(Number(e.target.value))} />
                                </div>
                                <div>
                                    <label className="text-[10px] text-[rgba(240,238,233,0.4)] uppercase tracking-wider mb-1 block">Max CTC</label>
                                    <input type="number" className="input-glass" placeholder="Any" value={maxCtc || ""} onChange={e => setMaxCtc(Number(e.target.value))} />
                                </div>
                                <div>
                                    <label className="text-[10px] text-[rgba(240,238,233,0.4)] uppercase tracking-wider mb-1 block">Your CGPA</label>
                                    <input type="number" step="0.1" className="input-glass" placeholder="e.g. 7.5" value={cgpa || ""} onChange={e => setCgpa(Number(e.target.value))} />
                                </div>
                                <div>
                                    <label className="text-[10px] text-[rgba(240,238,233,0.4)] uppercase tracking-wider mb-1 block">Location</label>
                                    <select className="input-glass" value={location} onChange={e => setLocation(e.target.value)}>
                                        {locations.map(l => <option key={l} value={l} className="bg-[#141414]">{l}</option>)}
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Active Filter Summary */}
                {(search || minCtc > 0 || maxCtc > 0 || cgpa > 0 || location !== "All" || roleFilter || dateOrder !== "off" || monthFilter !== "All") && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[rgba(255,255,255,0.04)] flex-wrap">
                        <span className="text-[10px] text-[rgba(240,238,233,0.4)]">Active:</span>
                        {search && <span className="badge badge-purple text-[9px]">Search: {search}</span>}
                        {roleFilter && <span className="badge badge-cyan text-[9px]">Role: {roleCategories.find(c => c.value === roleFilter)?.label}</span>}
                        {monthFilter !== "All" && <span className="badge badge-cyan text-[9px]">📅 {monthOptions.find(o => o.key === monthFilter)?.label}</span>}
                        {dateOrder !== "off" && <span className="badge badge-amber text-[9px]">{dateOrder === "newest" ? "Newest First" : "Oldest First"}</span>}
                        {location !== "All" && <span className="badge badge-emerald text-[9px]">📍 {location}</span>}
                        <button onClick={() => { setSearch(""); setMinCtc(0); setMaxCtc(0); setCgpa(0); setLocation("All"); setRoleFilter(""); setDateOrder("off"); setMonthFilter("All"); }}
                            className="text-[10px] text-[#F43F5E] hover:underline ml-auto flex items-center gap-1"><X className="w-2.5 h-2.5" /> Clear All</button>
                    </div>
                )}
            </div>

            {/* Company Cards */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                <AnimatePresence mode="popLayout">
                    {filtered.map((c) => {
                        const key = companyKey(c);
                        const isExpanded = expandedId === key;
                        const isPrepView = prepView === key;
                        const prep = getCompanyPrep(c.name, c.role);
                        const roadmaps = getRoadmapForRole(c.role);

                        return (
                            <motion.div key={key} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                className="glass-card p-4 cursor-pointer group" onClick={() => { setExpandedId(isExpanded ? null : key); setPrepView(null); }}>

                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[rgba(139,92,246,0.15)] to-[rgba(6,182,212,0.15)] flex items-center justify-center text-sm font-bold text-[#8B5CF6] border border-[rgba(139,92,246,0.2)]">
                                            {c.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold group-hover:text-[#8B5CF6] transition-colors">{c.name}</h3>
                                            <p className="text-[11px] text-[rgba(240,238,233,0.4)] flex items-center gap-1"><Calendar className="w-2.5 h-2.5" />{c.date}</p>
                                        </div>
                                    </div>
                                    <span className="text-[9px] px-1.5 py-0.5 rounded-md font-medium" style={{ color: getDiffColor(prep.difficulty), background: `${getDiffColor(prep.difficulty)}15` }}>
                                        {prep.difficulty}
                                    </span>
                                </div>

                                <p className="text-xs text-[rgba(240,238,233,0.7)] mb-3 line-clamp-1">{c.role}</p>

                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {c.ctc && c.ctc !== "-" && (
                                        <span className={`badge ${getCtcBadge(c.ctc)}`}><IndianRupee className="w-2.5 h-2.5" /> {c.ctc.replace("₹", "").trim()}</span>
                                    )}
                                    {c.cgpa && <span className="badge badge-purple"><GraduationCap className="w-2.5 h-2.5" /> {c.cgpa}+</span>}
                                </div>

                                <div className="flex items-center justify-between text-[10px] text-[rgba(240,238,233,0.4)]">
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.location || "N/A"}</span>
                                    {c.duration && c.duration !== "-" && <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {c.duration}</span>}
                                </div>

                                {/* Expanded Details */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden" onClick={e => e.stopPropagation()}>
                                            <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.05)] space-y-2">
                                                <div className="flex justify-between text-xs"><span className="text-[rgba(240,238,233,0.4)]">Stipend</span><span>{c.stipend || "N/A"}</span></div>
                                                <div className="flex justify-between text-xs"><span className="text-[rgba(240,238,233,0.4)]">Duration</span><span>{c.duration || "N/A"}</span></div>
                                                <div className="flex justify-between text-xs"><span className="text-[rgba(240,238,233,0.4)]">CGPA Req</span><span>{c.cgpa || "None"}</span></div>

                                                {/* Roadmap Links */}
                                                <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.04)]">
                                                    <p className="text-[10px] uppercase tracking-wider text-[rgba(240,238,233,0.35)] mb-2">🗺️ Roadmap.sh (How to Prepare)</p>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {roadmaps.map((rm, i) => (
                                                            <a key={i} href={rm.roadmapUrl} target="_blank" rel="noreferrer"
                                                                className="text-[10px] px-2.5 py-1.5 rounded-lg bg-[rgba(139,92,246,0.06)] border border-[rgba(139,92,246,0.15)] text-[#8B5CF6] hover:bg-[rgba(139,92,246,0.12)] transition-all flex items-center gap-1"
                                                                onClick={e => e.stopPropagation()}>
                                                                {rm.icon} {rm.title} <ExternalLink className="w-2.5 h-2.5" />
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Prep Guide Toggle */}
                                                <button onClick={(e) => { e.stopPropagation(); setPrepView(isPrepView ? null : key); }}
                                                    className="w-full mt-2 py-2.5 rounded-xl text-xs font-medium border border-dashed border-[rgba(6,182,212,0.3)] text-[#06B6D4] hover:bg-[rgba(6,182,212,0.05)] transition-colors flex items-center justify-center gap-2">
                                                    <BookOpen className="w-3.5 h-3.5" /> {isPrepView ? "Hide" : "View"} Interview Prep Guide <ArrowRight className="w-3 h-3" />
                                                </button>

                                                {/* Full Prep Blog Card */}
                                                <AnimatePresence>
                                                    {isPrepView && (
                                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                            <PrepBlog company={c.name} role={c.role} prep={prep} />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-16 h-16 rounded-3xl bg-[rgba(139,92,246,0.1)] flex items-center justify-center mb-4"><Search className="w-7 h-7 text-[#8B5CF6]" /></div>
                    <h3 className="text-lg font-semibold mb-1">No matches found</h3>
                    <p className="text-sm text-[rgba(240,238,233,0.5)]">Try adjusting your filters</p>
                </div>
            )}
        </div>
    );
}

/* ────────── Prep Blog Component ────────── */
function PrepBlog({ company, role, prep }: { company: string; role: string; prep: CompanyPrep }) {
    return (
        <div className="mt-3 space-y-3">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[rgba(6,182,212,0.06)] to-[rgba(139,92,246,0.06)] border border-[rgba(6,182,212,0.12)]">
                <h4 className="text-sm font-bold mb-1">📋 How to Crack {company}</h4>
                <p className="text-[10px] text-[rgba(240,238,233,0.45)]">Role: {role} · Difficulty: {prep.difficulty}</p>
            </div>

            {/* Interview Rounds */}
            <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                <p className="text-[10px] uppercase tracking-wider text-[rgba(240,238,233,0.35)] mb-2 flex items-center gap-1"><Target className="w-3 h-3 text-[#8B5CF6]" /> Interview Rounds</p>
                <div className="space-y-1.5">
                    {prep.rounds.map((round, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                            <div className="w-5 h-5 rounded-md bg-[rgba(139,92,246,0.1)] flex items-center justify-center text-[9px] font-bold text-[#8B5CF6] shrink-0">{i + 1}</div>
                            <span className="text-[rgba(240,238,233,0.7)]">{round}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Key Topics */}
            <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                <p className="text-[10px] uppercase tracking-wider text-[rgba(240,238,233,0.35)] mb-2 flex items-center gap-1"><BookOpen className="w-3 h-3 text-[#10B981]" /> Key Topics Asked</p>
                <div className="flex flex-wrap gap-1.5">
                    {prep.topics.map((t, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-[rgba(16,185,129,0.06)] border border-[rgba(16,185,129,0.12)] text-[#10B981]">{t}</span>
                    ))}
                </div>
            </div>

            {/* LeetCode Patterns */}
            <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                <p className="text-[10px] uppercase tracking-wider text-[rgba(240,238,233,0.35)] mb-2 flex items-center gap-1"><Code2 className="w-3 h-3 text-[#F59E0B]" /> LeetCode Patterns to Focus</p>
                <div className="flex flex-wrap gap-1.5">
                    {prep.leetcodePatterns.map((p, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-[rgba(245,158,11,0.06)] border border-[rgba(245,158,11,0.12)] text-[#F59E0B]">{p}</span>
                    ))}
                </div>
            </div>

            {/* Striver Sheet */}
            <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                <p className="text-[10px] uppercase tracking-wider text-[rgba(240,238,233,0.35)] mb-2 flex items-center gap-1"><Trophy className="w-3 h-3 text-[#F43F5E]" /> Striver&apos;s Sheet / TakeUForward Focus</p>
                <div className="space-y-1">
                    {prep.striverSheetFocus.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-[rgba(240,238,233,0.65)]">
                            <span className="w-1 h-1 rounded-full bg-[#F43F5E] shrink-0" />{s}
                        </div>
                    ))}
                </div>
            </div>

            {/* Tips */}
            <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                <p className="text-[10px] uppercase tracking-wider text-[rgba(240,238,233,0.35)] mb-2 flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#8B5CF6]" /> Pro Tips</p>
                <div className="space-y-1.5">
                    {prep.tips.map((t, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px] text-[rgba(240,238,233,0.65)]">
                            <span className="text-[#8B5CF6]">💡</span>{t}
                        </div>
                    ))}
                </div>
            </div>

            {/* Resources */}
            <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                <p className="text-[10px] uppercase tracking-wider text-[rgba(240,238,233,0.35)] mb-2 flex items-center gap-1"><Link2 className="w-3 h-3 text-[#06B6D4]" /> Resources</p>
                <div className="grid grid-cols-1 gap-1.5">
                    {prep.resources.map((r, i) => (
                        <a key={i} href={r.url} target="_blank" rel="noreferrer"
                            className="flex items-center justify-between p-2 rounded-lg bg-[rgba(6,182,212,0.04)] border border-[rgba(6,182,212,0.1)] hover:border-[rgba(6,182,212,0.25)] transition-colors group/link"
                            onClick={e => e.stopPropagation()}>
                            <span className="text-[11px] text-[rgba(240,238,233,0.7)]">{r.label}</span>
                            <ExternalLink className="w-3 h-3 text-[rgba(240,238,233,0.3)] group-hover/link:text-[#06B6D4]" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
