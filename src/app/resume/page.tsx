"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Upload, Target, CheckCircle2, AlertTriangle, XCircle, Sparkles, Brain } from "lucide-react";

const sampleJDs = [
    "Software Engineer - React, Node.js, TypeScript, REST APIs, PostgreSQL",
    "Data Scientist - Python, ML, TensorFlow, SQL, Statistics",
    "Full Stack Developer - Java, Spring Boot, Angular, MongoDB",
    "DevOps Engineer - AWS, Docker, Kubernetes, CI/CD, Terraform",
];

export default function ResumePage() {
    const [resumeText, setResumeText] = useState("");
    const [jdText, setJdText] = useState("");
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<{ score: number; matched: string[]; missing: string[]; tips: string[] } | null>(null);

    const analyze = () => {
        if (!resumeText.trim() || !jdText.trim()) return;
        setAnalyzing(true);
        const jdKeywords = jdText.toLowerCase().split(/[,\s-]+/).filter(w => w.length > 2);
        const resumeLower = resumeText.toLowerCase();
        const matched = jdKeywords.filter(k => resumeLower.includes(k));
        const missing = jdKeywords.filter(k => !resumeLower.includes(k));
        const score = Math.round((matched.length / Math.max(jdKeywords.length, 1)) * 100);

        setTimeout(() => {
            setResult({
                score: Math.min(score + 15, 100),
                matched: matched.length > 0 ? matched.slice(0, 8) : ["No direct keyword matches found"],
                missing: missing.length > 0 ? missing.slice(0, 8) : ["Great coverage!"],
                tips: [
                    "Use exact keywords from the JD in your resume",
                    "Quantify achievements with numbers and percentages",
                    "Add a 'Technical Skills' section at the top",
                    "Include relevant project links (GitHub, deployed apps)",
                ],
            });
            setAnalyzing(false);
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#06B6D4]" /> Resume ATS Checker
                </h1>
                <p className="text-xs text-[rgba(240,238,233,0.5)] mt-1">Check how well your resume matches against a Job Description</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="glass-card p-5">
                    <h3 className="text-sm font-semibold mb-3">📄 Your Resume</h3>
                    <textarea className="input-glass min-h-[200px] resize-none text-xs" placeholder="Paste your resume text..." value={resumeText} onChange={e => setResumeText(e.target.value)} />
                </div>
                <div className="glass-card p-5">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold">📋 Job Description</h3>
                    </div>
                    <textarea className="input-glass min-h-[150px] resize-none text-xs mb-3" placeholder="Paste job description..." value={jdText} onChange={e => setJdText(e.target.value)} />
                    <p className="text-[10px] text-[rgba(240,238,233,0.35)] mb-2">Quick fill:</p>
                    <div className="flex flex-wrap gap-1.5">
                        {sampleJDs.map((jd, i) => (
                            <button key={i} onClick={() => setJdText(jd)} className="text-[10px] px-2.5 py-1.5 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(139,92,246,0.3)] transition-colors truncate max-w-[200px]">{jd.split(" - ")[0]}</button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-center mb-6">
                <button onClick={analyze} disabled={analyzing || !resumeText || !jdText} className="btn-primary disabled:opacity-50">
                    {analyzing ? <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Brain className="w-4 h-4" /></motion.div> Scanning...</> : <><Target className="w-4 h-4" /> Check ATS Score</>}
                </button>
            </div>

            {result && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="glass-card p-6 text-center">
                        <div className="relative w-28 h-28 mx-auto mb-3">
                            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                <circle cx="60" cy="60" r="52" fill="none" stroke={result.score >= 70 ? "#10B981" : result.score >= 50 ? "#F59E0B" : "#F43F5E"} strokeWidth="8" strokeDasharray={`${result.score * 3.27} 327`} strokeLinecap="round" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">{result.score}%</span>
                        </div>
                        <span className={`badge ${result.score >= 70 ? "badge-emerald" : result.score >= 50 ? "badge-amber" : "badge-rose"}`}>
                            {result.score >= 70 ? "Strong Match" : result.score >= 50 ? "Moderate Match" : "Weak Match"}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="glass-card p-5">
                            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Matched Keywords</h3>
                            <div className="flex flex-wrap gap-1.5">
                                {result.matched.map((k, i) => <span key={i} className="badge badge-emerald text-[10px]">{k}</span>)}
                            </div>
                        </div>
                        <div className="glass-card p-5">
                            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><XCircle className="w-4 h-4 text-[#F43F5E]" /> Missing Keywords</h3>
                            <div className="flex flex-wrap gap-1.5">
                                {result.missing.map((k, i) => <span key={i} className="badge badge-rose text-[10px]">{k}</span>)}
                            </div>
                        </div>
                    </div>
                    <div className="glass-card p-5">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Pro Tips</h3>
                        <div className="space-y-2">
                            {result.tips.map((t, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs p-2 rounded-lg bg-[rgba(245,158,11,0.04)]">
                                    <AlertTriangle className="w-3 h-3 text-[#F59E0B] mt-0.5 shrink-0" />{t}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
