import { motion } from 'framer-motion';
import { MOCK_ATS_RESULT, MOCK_STUDENT } from '../lib/mockData';
import { CheckCircle2, AlertCircle, Download, Eye } from 'lucide-react';

const SECTIONS = [
    { name: 'Education', score: MOCK_ATS_RESULT.sections.education },
    { name: 'Skills', score: MOCK_ATS_RESULT.sections.skills },
    { name: 'Projects', score: MOCK_ATS_RESULT.sections.projects },
    { name: 'Experience', score: MOCK_ATS_RESULT.sections.experience },
    { name: 'Formatting', score: MOCK_ATS_RESULT.sections.formatting },
];

export default function Resume() {
    const score = MOCK_ATS_RESULT.atsScore;
    const scoreColor = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';

    return (
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>ATS Resume Engine</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>AI-generated ATS-optimized resume from your talent graph</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, cursor: 'pointer', fontSize: '0.82rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                        <Eye size={14} /> Preview
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: '#6366f1', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '0.82rem', color: 'white', fontWeight: 700 }}>
                        <Download size={14} /> Export PDF
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
                {/* Resume preview */}
                <div className="card" style={{ padding: '36px 40px', fontFamily: 'sans-serif' }}>
                    {/* Resume Header */}
                    <div style={{ textAlign: 'center', marginBottom: 24, paddingBottom: 20, borderBottom: '2px solid #e2e8f0' }}>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', marginBottom: 4 }}>{MOCK_STUDENT.name}</h2>
                        <p style={{ color: '#475569', fontSize: '0.875rem', marginBottom: 8 }}>
                            {MOCK_STUDENT.college} · {MOCK_STUDENT.branch} · Class of {MOCK_STUDENT.graduationYear}
                        </p>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', fontSize: '0.78rem', color: '#64748b' }}>
                            <span>github.com/{MOCK_STUDENT.codingProfiles.github}</span>
                            <span>·</span>
                            <span>leetcode.com/u/{MOCK_STUDENT.codingProfiles.leetcode}</span>
                            <span>·</span>
                            <span>{MOCK_STUDENT.location}</span>
                        </div>
                    </div>

                    {/* Skills */}
                    <div style={{ marginBottom: 22 }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, paddingBottom: 4, borderBottom: '1px solid #e2e8f0' }}>Technical Skills</div>
                        <div style={{ fontSize: '0.825rem', color: '#334155', lineHeight: 1.8 }}>
                            <strong>Languages:</strong> JavaScript (ES6+), TypeScript, Python, SQL &nbsp;|&nbsp;
                            <strong>Frameworks:</strong> React, Node.js, Express &nbsp;|&nbsp;
                            <strong>Databases:</strong> PostgreSQL, Redis, MongoDB &nbsp;|&nbsp;
                            <strong>Tools:</strong> Git, Docker (basic), Prisma ORM
                        </div>
                    </div>

                    {/* Projects */}
                    <div style={{ marginBottom: 22 }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, paddingBottom: 4, borderBottom: '1px solid #e2e8f0' }}>Projects</div>
                        <div style={{ marginBottom: 14 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                <strong style={{ fontSize: '0.875rem' }}>HireMap – Talent Intelligence Platform</strong>
                                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Jan 2026 – Present</span>
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#475569', marginBottom: 6 }}>React · Node.js · PostgreSQL · Redis · Prisma</div>
                            <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.8rem', color: '#334155', lineHeight: 1.9 }}>
                                <li>Built a Talent Graph connecting 5,000+ students with job roles via skill overlap matching</li>
                                <li>Implemented ATS resume engine with 85% average score improvement for users</li>
                                <li>Designed Redis-cached job aggregation pipeline supporting 200+ jobs/day</li>
                            </ul>
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, paddingBottom: 4, borderBottom: '1px solid #e2e8f0' }}>Education</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>B.Tech, Computer Science & Engineering</div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{MOCK_STUDENT.college}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>CGPA: {MOCK_STUDENT.cgpa}/10</div>
                                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>2023 – {MOCK_STUDENT.graduationYear}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ATS Score panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Score ring */}
                    <div className="card" style={{ padding: 24, textAlign: 'center' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>ATS Score</div>
                        <div style={{ position: 'relative', width: 110, height: 110, margin: '0 auto 14px' }}>
                            <svg width={110} height={110} style={{ transform: 'rotate(-90deg)' }}>
                                <circle cx={55} cy={55} r={46} fill="none" stroke="var(--color-surface-3)" strokeWidth={9} />
                                <motion.circle
                                    cx={55} cy={55} r={46} fill="none"
                                    stroke={scoreColor} strokeWidth={9}
                                    strokeDasharray={2 * Math.PI * 46}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 46 }}
                                    animate={{ strokeDashoffset: 2 * Math.PI * 46 - (score / 100) * 2 * Math.PI * 46 }}
                                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: scoreColor }}>{score}</span>
                                <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>/100</span>
                            </div>
                        </div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: scoreColor }}>
                            {score >= 80 ? 'Strong ATS Pass' : score >= 60 ? 'Needs Improvement' : 'Below Threshold'}
                        </div>
                    </div>

                    {/* Section scores */}
                    <div className="card" style={{ padding: 20 }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Section Breakdown</div>
                        {SECTIONS.map(s => (
                            <div key={s.name} style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontSize: '0.8rem' }}>{s.name}</span>
                                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: s.score >= 80 ? '#10b981' : s.score >= 60 ? '#f59e0b' : '#ef4444' }}>{s.score}</span>
                                </div>
                                <div style={{ height: 4, background: 'var(--color-surface-3)', borderRadius: 2, overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }} animate={{ width: `${s.score}%` }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                        style={{ height: '100%', background: s.score >= 80 ? '#10b981' : s.score >= 60 ? '#f59e0b' : '#ef4444', borderRadius: 2 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Strengths & missing */}
                    <div className="card" style={{ padding: 20 }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Strengths</div>
                        {MOCK_ATS_RESULT.strengths.map(s => (
                            <div key={s} style={{ display: 'flex', gap: 6, marginBottom: 8, fontSize: '0.78rem', color: 'var(--color-text-secondary)', alignItems: 'flex-start' }}>
                                <CheckCircle2 size={12} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} /> {s}
                            </div>
                        ))}
                        <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ef4444', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Missing Keywords</div>
                            {MOCK_ATS_RESULT.missingKeywords.map(k => (
                                <div key={k} style={{ display: 'flex', gap: 6, marginBottom: 8, fontSize: '0.78rem', alignItems: 'center', color: '#fca5a5' }}>
                                    <AlertCircle size={12} style={{ flexShrink: 0 }} /> {k}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
