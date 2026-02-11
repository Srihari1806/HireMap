"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Upload, FileText, Target, TrendingUp, AlertCircle, CheckCircle2, Zap, Brain } from "lucide-react";

export default function MatchPage() {
    const [resumeText, setResumeText] = useState("");
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<{ score: number; strengths: string[]; gaps: string[]; projects: string[] } | null>(null);

    const analyze = () => {
        if (!resumeText.trim()) return;
        setAnalyzing(true);
        setTimeout(() => {
            setResult({
                score: Math.floor(Math.random() * 30) + 60,
                strengths: ["Strong foundational knowledge in Data Structures", "Experience with React ecosystem", "Good project diversity"],
                gaps: ["No cloud certifications (AWS/GCP)", "Limited system design experience", "Missing competitive programming profile"],
                projects: [
                    "Build a real-time collaborative code editor using WebSockets + React",
                    "Create an AI-powered resume parser with Python + Gemini API",
                    "Deploy a microservices e-commerce app on AWS with CI/CD pipeline"
                ]
            });
            setAnalyzing(false);
        }, 2500);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-[#8B5CF6]" /> AI Match-Maker
                </h1>
                <p className="text-xs text-[rgba(240,238,233,0.5)] mt-1">Paste your resume and get matched with the best opportunities</p>
            </motion.div>

            <div className="glass-card p-5 mb-4">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><FileText className="w-4 h-4 text-[#06B6D4]" /> Paste Your Resume</h3>
                <textarea className="input-glass min-h-[200px] resize-none text-xs leading-relaxed" placeholder="Paste your resume text here... Include your education, skills, experience, projects, and certifications."
                    value={resumeText} onChange={e => setResumeText(e.target.value)} />
                <div className="flex justify-end mt-3">
                    <button onClick={analyze} disabled={analyzing || !resumeText.trim()} className="btn-primary text-xs disabled:opacity-50 disabled:cursor-not-allowed">
                        {analyzing ? (
                            <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Brain className="w-4 h-4" /></motion.div> Analyzing...</>
                        ) : (
                            <><Sparkles className="w-4 h-4" /> Analyze & Match</>
                        )}
                    </button>
                </div>
            </div>

            {result && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    {/* ATS Score */}
                    <div className="glass-card p-6 text-center">
                        <p className="text-xs text-[rgba(240,238,233,0.5)] mb-3">Your ATS Match Score</p>
                        <div className="relative w-32 h-32 mx-auto mb-3">
                            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                <circle cx="60" cy="60" r="52" fill="none"
                                    stroke={result.score >= 80 ? "#10B981" : result.score >= 60 ? "#F59E0B" : "#F43F5E"}
                                    strokeWidth="8" strokeDasharray={`${result.score * 3.27} 327`} strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold font-[family-name:var(--font-outfit)]">{result.score}</span>
                                <span className="text-[10px] text-[rgba(240,238,233,0.5)]">out of 100</span>
                            </div>
                        </div>
                        <span className={`badge ${result.score >= 80 ? "badge-emerald" : result.score >= 60 ? "badge-amber" : "badge-rose"}`}>
                            {result.score >= 80 ? "Excellent" : result.score >= 60 ? "Good - Room to improve" : "Needs work"}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Strengths */}
                        <div className="glass-card p-5">
                            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Strengths</h3>
                            <div className="space-y-2">
                                {result.strengths.map((s, i) => (
                                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.1)]">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mt-0.5 shrink-0" />
                                        <span className="text-xs">{s}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skill Gaps */}
                        <div className="glass-card p-5">
                            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-[#F59E0B]" /> Skill Gaps</h3>
                            <div className="space-y-2">
                                {result.gaps.map((g, i) => (
                                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.1)]">
                                        <AlertCircle className="w-3.5 h-3.5 text-[#F59E0B] mt-0.5 shrink-0" />
                                        <span className="text-xs">{g}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Power Projects */}
                    <div className="glass-card p-5">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Zap className="w-4 h-4 text-[#8B5CF6]" /> 3 Power Projects to Build</h3>
                        <div className="space-y-3">
                            {result.projects.map((p, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[rgba(139,92,246,0.04)] border border-[rgba(139,92,246,0.1)]">
                                    <div className="w-7 h-7 rounded-lg bg-[rgba(139,92,246,0.15)] flex items-center justify-center shrink-0 text-xs font-bold text-[#8B5CF6]">{i + 1}</div>
                                    <span className="text-xs leading-relaxed">{p}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
