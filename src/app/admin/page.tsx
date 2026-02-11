"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, CheckCircle2, Brain, Plus, Trash2 } from "lucide-react";

interface ParsedEntry { company: string; role: string; ctc: string; date: string; location: string; cgpa: string; stipend: string; duration: string; }

export default function AdminPage() {
    const [entries, setEntries] = useState<ParsedEntry[]>([]);
    const [manual, setManual] = useState<ParsedEntry>({ company: "", role: "", ctc: "", date: "", location: "", cgpa: "", stipend: "", duration: "" });
    const [parsing, setParsing] = useState(false);
    const [rawText, setRawText] = useState("");

    const parseText = () => {
        if (!rawText.trim()) return;
        setParsing(true);
        setTimeout(() => {
            setEntries(prev => [...prev, {
                company: rawText.match(/company[:\s]*([^\n,]+)/i)?.[1]?.trim() || "Parsed Company",
                role: rawText.match(/role[:\s]*([^\n,]+)/i)?.[1]?.trim() || "Software Engineer",
                ctc: rawText.match(/(?:ctc|package|lpa)[:\s]*([\d.]+)/i)?.[1] ? `₹${rawText.match(/(?:ctc|package|lpa)[:\s]*([\d.]+)/i)![1]} LPA` : "₹6.00 LPA",
                date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
                location: rawText.match(/location[:\s]*([^\n,]+)/i)?.[1]?.trim() || "Bengaluru",
                cgpa: rawText.match(/cgpa[:\s]*([\d.]+)/i)?.[1] || "6",
                stipend: "₹25,000 / month", duration: "6 Months",
            }]);
            setRawText("");
            setParsing(false);
        }, 1500);
    };

    const addManual = () => {
        if (!manual.company) return;
        setEntries(prev => [...prev, { ...manual }]);
        setManual({ company: "", role: "", ctc: "", date: "", location: "", cgpa: "", stipend: "", duration: "" });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] flex items-center gap-3"><Upload className="w-6 h-6 text-[#F59E0B]" /> TNP Admin Panel</h1>
                <p className="text-xs text-[rgba(240,238,233,0.5)] mt-1">Add new placement data via text parsing or manual entry</p>
            </motion.div>

            {/* Auto Parse */}
            <div className="glass-card p-5 mb-4">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Brain className="w-4 h-4 text-[#8B5CF6]" /> Auto-Parse from Text</h3>
                <textarea className="input-glass min-h-[120px] resize-none text-xs mb-3" placeholder="Paste placement notification text here... Include company name, role, CTC, CGPA criteria, location etc." value={rawText} onChange={e => setRawText(e.target.value)} />
                <button onClick={parseText} disabled={parsing} className="btn-primary text-xs disabled:opacity-50">
                    {parsing ? "Parsing..." : <><Sparkles className="w-3.5 h-3.5" /> Parse & Add</>}
                </button>
            </div>

            {/* Manual Entry */}
            <div className="glass-card p-5 mb-4">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Plus className="w-4 h-4 text-[#10B981]" /> Manual Entry</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    {(["company", "role", "ctc", "date", "location", "cgpa", "stipend", "duration"] as const).map(f => (
                        <div key={f}>
                            <label className="text-[10px] uppercase tracking-wider text-[rgba(240,238,233,0.4)] mb-1 block">{f}</label>
                            <input className="input-glass" placeholder={f} value={manual[f]} onChange={e => setManual(m => ({ ...m, [f]: e.target.value }))} />
                        </div>
                    ))}
                </div>
                <button onClick={addManual} className="btn-primary text-xs"><Plus className="w-3.5 h-3.5" /> Add Entry</button>
            </div>

            {/* Entries */}
            {entries.length > 0 && (
                <div className="glass-card p-5">
                    <h3 className="text-sm font-semibold mb-3">📋 New Entries ({entries.length})</h3>
                    <div className="space-y-2">
                        {entries.map((e, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
                                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium">{e.company} — {e.role}</p>
                                    <p className="text-[10px] text-[rgba(240,238,233,0.4)]">{e.ctc} · {e.location} · CGPA: {e.cgpa}</p>
                                </div>
                                <button onClick={() => setEntries(prev => prev.filter((_, idx) => idx !== i))} className="text-[#F43F5E] hover:bg-[rgba(244,63,94,0.1)] p-1.5 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function Sparkles(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /></svg>;
}
