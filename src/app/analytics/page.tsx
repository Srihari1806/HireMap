"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, MapPin, Building2, IndianRupee, GraduationCap, Briefcase, Users } from "lucide-react";
import { placementData } from "@/lib/data";
import { getStats, parseCtc, parseCgpa } from "@/lib/utils";

export default function AnalyticsPage() {
    const stats = useMemo(() => getStats(placementData), []);

    const cgpaDistribution = useMemo(() => {
        const ranges = [
            { label: "No criteria", min: 0, max: 0.01 },
            { label: "6.0", min: 5.9, max: 6.1 },
            { label: "6.5", min: 6.4, max: 6.6 },
            { label: "7.0", min: 6.9, max: 7.1 },
            { label: "7.5", min: 7.4, max: 7.6 },
            { label: "8.0+", min: 7.9, max: 10 },
        ];
        return ranges.map(r => ({
            label: r.label,
            count: placementData.filter(c => {
                const cg = parseCgpa(c.cgpa);
                return r.min === 0 ? cg === 0 : cg >= r.min && cg <= r.max;
            }).length,
        }));
    }, []);

    const roleTypes = useMemo(() => {
        const types: Record<string, number> = {};
        placementData.forEach(c => {
            const role = c.role.toLowerCase();
            if (role.includes("software") || role.includes("sde") || role.includes("developer")) types["SDE/Development"] = (types["SDE/Development"] || 0) + 1;
            else if (role.includes("data") || role.includes("analyst") || role.includes("ml") || role.includes("ai")) types["Data/AI/ML"] = (types["Data/AI/ML"] || 0) + 1;
            else if (role.includes("intern")) types["Internship"] = (types["Internship"] || 0) + 1;
            else if (role.includes("trainee") || role.includes("get")) types["Trainee/GET"] = (types["Trainee/GET"] || 0) + 1;
            else if (role.includes("business") || role.includes("sales") || role.includes("marketing")) types["Business/Sales"] = (types["Business/Sales"] || 0) + 1;
            else types["Other"] = (types["Other"] || 0) + 1;
        });
        return Object.entries(types).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
    }, []);

    const topPackages = useMemo(() =>
        [...placementData].sort((a, b) => parseCtc(b.ctc) - parseCtc(a.ctc)).slice(0, 10)
        , []);

    const colors = ["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#3B82F6", "#F43F5E"];

    const BarChart = ({ data, label }: { data: { label?: string; name?: string; count: number }[]; label: string }) => {
        const max = Math.max(...data.map(d => d.count), 1);
        return (
            <div className="space-y-2.5">
                {data.map((d, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <span className="text-[11px] text-[rgba(240,238,233,0.5)] w-28 shrink-0 truncate">{d.label || d.name}</span>
                        <div className="flex-1 h-7 rounded-lg bg-[rgba(255,255,255,0.02)] overflow-hidden relative">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${(d.count / max) * 100}%` }} transition={{ duration: 0.8, delay: i * 0.08 }}
                                className="h-full rounded-lg" style={{ background: `${colors[i % colors.length]}25` }} />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-medium" style={{ color: colors[i % colors.length] }}>{d.count}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] flex items-center gap-3"><BarChart3 className="w-6 h-6 text-[#10B981]" /> Analytics</h1>
                <p className="text-xs text-[rgba(240,238,233,0.5)] mt-1">Placement trends and insights for the 2026 batch</p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                    { label: "Companies", value: stats.totalCompanies, icon: Building2, color: "#8B5CF6" },
                    { label: "Avg Package", value: `₹${stats.avgPackage} LPA`, icon: IndianRupee, color: "#10B981" },
                    { label: "Top Package", value: `₹${stats.highestPackage} LPA`, icon: TrendingUp, color: "#F59E0B" },
                    { label: "Unique Roles", value: stats.totalRoles, icon: Briefcase, color: "#06B6D4" },
                ].map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ background: `${s.color}15` }}>
                            <s.icon className="w-4 h-4" style={{ color: s.color }} />
                        </div>
                        <p className="text-xl font-bold font-[family-name:var(--font-outfit)]">{s.value}</p>
                        <p className="text-[10px] text-[rgba(240,238,233,0.4)] uppercase tracking-wider">{s.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="glass-card p-5">
                    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2"><IndianRupee className="w-4 h-4 text-[#8B5CF6]" /> Package Distribution</h3>
                    <BarChart data={stats.packageRanges.map(r => ({ label: r.range, count: r.count }))} label="Range" />
                </div>
                <div className="glass-card p-5">
                    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-[#06B6D4]" /> CGPA Requirements</h3>
                    <BarChart data={cgpaDistribution} label="CGPA" />
                </div>
                <div className="glass-card p-5">
                    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2"><Briefcase className="w-4 h-4 text-[#10B981]" /> Role Distribution</h3>
                    <BarChart data={roleTypes} label="Role" />
                </div>
                <div className="glass-card p-5">
                    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-[#F59E0B]" /> Top Locations</h3>
                    <BarChart data={stats.topLocations} label="Location" />
                </div>
            </div>

            {/* Top 10 Packages */}
            <div className="glass-card p-5">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[#F59E0B]" /> Top 10 Packages</h3>
                <div className="space-y-2">
                    {topPackages.map((c, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: `${colors[i % colors.length]}15`, color: colors[i % colors.length] }}>{i + 1}</div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium">{c.name}</p>
                                <p className="text-[10px] text-[rgba(240,238,233,0.4)]">{c.role}</p>
                            </div>
                            <span className="text-xs font-semibold text-[#10B981]">{c.ctc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
