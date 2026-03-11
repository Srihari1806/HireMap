import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MOCK_ATS_RESULT } from '../lib/mockData';
import { ALL_JOBS } from '../lib/jobData';
import { MapPin, Clock, ChevronRight, Zap, Bookmark, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function JobDetail() {
    const { id } = useParams();
    const job = ALL_JOBS.find(j => j.id === id) ?? ALL_JOBS[0];

    const allocStats = [
        { label: 'Openings', value: job.openings, color: '#10b981' },
        { label: 'Applicants', value: job.applicants.toLocaleString(), color: '#f59e0b' },
        { label: 'Shortlist %', value: `${(job.shortlistRatio * 100).toFixed(1)}%`, color: '#ef4444' },
        { label: 'Interview Rounds', value: job.interviewRounds, color: '#6366f1' },
    ];

    const readinessCirc = 2 * Math.PI * 54;
    const readinessOffset = readinessCirc - (job.matchScore / 100) * readinessCirc;

    return (
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                <Link to="/jobs" style={{ color: '#6366f1', textDecoration: 'none' }}>Jobs</Link>
                <ChevronRight size={12} />
                <span>{job.company}</span>
                <ChevronRight size={12} />
                <span style={{ color: 'var(--color-text-primary)' }}>{job.role}</span>
            </div>

            {/* Header card */}
            <div className="card" style={{ padding: '28px 32px', marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <div style={{
                            width: 64, height: 64, borderRadius: 14,
                            background: job.companyColor + '22', border: `1px solid ${job.companyColor}44`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 900, color: job.companyColor, fontSize: '1.6rem', flexShrink: 0
                        }}>
                            {job.companyLogo}
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 4 }}>{job.role}</h1>
                            <div style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', fontWeight: 500, marginBottom: 8 }}>{job.company}</div>
                            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                                    <MapPin size={13} /> {job.location}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                                    <Clock size={13} /> {job.type}
                                </span>
                                <span style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 600 }}>💰 {job.type === 'Internship' && job.stipend !== 'Not Disclosed' ? job.stipend : job.ctc}</span>
                                {job.remote && <span style={{ padding: '2px 8px', background: 'rgba(34,211,238,0.1)', color: '#22d3ee', borderRadius: 4, fontSize: '0.72rem', fontWeight: 600, border: '1px solid rgba(34,211,238,0.2)' }}>Remote</span>}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <button style={{ padding: '9px 14px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 8, color: 'var(--color-text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem' }}>
                            <Bookmark size={14} /> Save
                        </button>
                        <a href="#" style={{ padding: '9px 20px', background: '#6366f1', color: 'white', borderRadius: 8, fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none' }}>
                            Apply Now
                        </a>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
                {/* Left column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Allocation Stats */}
                    <div className="card" style={{ padding: 24 }}>
                        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 18 }}>📊 Allocation Intelligence</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                            {allocStats.map(s => (
                                <div key={s.label} style={{
                                    textAlign: 'center', padding: '14px 10px',
                                    background: 'var(--color-surface-2)', borderRadius: 10,
                                    border: `1px solid ${s.color}25`
                                }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: 14, padding: 12, background: 'rgba(239,68,68,0.07)', borderRadius: 8, border: '1px solid rgba(239,68,68,0.15)' }}>
                            <div style={{ display: 'flex', gap: 6, color: '#fca5a5', fontSize: '0.8rem', alignItems: 'center' }}>
                                <AlertCircle size={13} />
                                <strong>Reality check:</strong> Only {Math.round(job.openings)} out of {job.applicants.toLocaleString()} applicants will get a callback. Preparation matters.
                            </div>
                        </div>
                    </div>

                    {/* Required skills */}
                    <div className="card" style={{ padding: 24 }}>
                        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 18 }}>Required Skills</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {job.skills.map(skill => {
                                const missing = job.missingSkills.includes(skill);
                                return (
                                    <div key={skill} style={{
                                        padding: '6px 14px', borderRadius: 8,
                                        background: missing ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                                        border: `1px solid ${missing ? 'rgba(239,68,68,0.25)' : 'rgba(16,185,129,0.25)'}`,
                                        color: missing ? '#fca5a5' : '#6ee7b7',
                                        fontSize: '0.82rem', fontWeight: 600,
                                        display: 'flex', alignItems: 'center', gap: 6
                                    }}>
                                        {missing ? <AlertCircle size={12} /> : <CheckCircle2 size={12} />}
                                        {skill}
                                    </div>
                                );
                            })}
                        </div>
                        {job.missingSkills.length > 0 && (
                            <div style={{ marginTop: 14, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                <span style={{ color: '#fca5a5' }}>Red = skills you need to build. </span>
                                Generate a roadmap to close the gap in {job.missingSkills.length * 1.5} weeks.
                            </div>
                        )}
                    </div>
                </div>

                {/* Right column: readiness meter */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Readiness meter */}
                    <div className="card" style={{ padding: 24, textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Readiness</div>
                        <div style={{ position: 'relative', width: 130, height: 130, margin: '0 auto 16px' }}>
                            <svg width={130} height={130} style={{ transform: 'rotate(-90deg)' }}>
                                <circle cx={65} cy={65} r={54} fill="none" stroke="var(--color-surface-3)" strokeWidth={10} />
                                <motion.circle
                                    cx={65} cy={65} r={54} fill="none"
                                    stroke={job.matchScore >= 80 ? '#10b981' : job.matchScore >= 60 ? '#f59e0b' : '#ef4444'}
                                    strokeWidth={10} strokeDasharray={readinessCirc}
                                    initial={{ strokeDashoffset: readinessCirc }}
                                    animate={{ strokeDashoffset: readinessOffset }}
                                    transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '2rem', fontWeight: 900, color: job.matchScore >= 80 ? '#10b981' : job.matchScore >= 60 ? '#f59e0b' : '#ef4444' }}>{job.matchScore}%</span>
                                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>Match</span>
                            </div>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: 4 }}>
                            {job.missingSkills.length > 0
                                ? `${job.missingSkills.length} skill gap(s) detected`
                                : 'You fully qualify!'}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#6366f1', fontWeight: 600 }}>
                            Prep time: ~{job.missingSkills.length * 1.5} weeks
                        </div>
                        <Link to={`/jobs/${job.id}/roadmap`} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                            marginTop: 16, padding: '10px', background: 'rgba(99,102,241,0.15)',
                            border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8,
                            color: '#a5b4fc', fontWeight: 600, fontSize: '0.82rem', textDecoration: 'none'
                        }}>
                            <Zap size={13} /> Generate Roadmap
                        </Link>
                    </div>

                    {/* ATS Score */}
                    <div className="card" style={{ padding: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>ATS Score</span>
                            <span style={{ fontWeight: 800, color: '#10b981', fontSize: '1.1rem' }}>{MOCK_ATS_RESULT.atsScore}</span>
                        </div>
                        {MOCK_ATS_RESULT.strengths.map(s => (
                            <div key={s} style={{ display: 'flex', gap: 6, marginBottom: 7, fontSize: '0.75rem', color: 'var(--color-text-secondary)', alignItems: 'flex-start' }}>
                                <CheckCircle2 size={12} color="#10b981" style={{ flexShrink: 0, marginTop: 1 }} />
                                {s}
                            </div>
                        ))}
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: 6 }}>Missing keywords:</div>
                            {MOCK_ATS_RESULT.missingKeywords.map(k => (
                                <span key={k} style={{ display: 'inline-block', marginRight: 4, marginBottom: 4, padding: '2px 8px', background: 'rgba(239,68,68,0.08)', color: '#fca5a5', borderRadius: 4, fontSize: '0.7rem' }}>{k}</span>
                            ))}
                        </div>
                        <Link to="/resume" style={{ display: 'block', textAlign: 'center', marginTop: 12, padding: '8px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 7, color: 'var(--color-text-secondary)', fontSize: '0.78rem', textDecoration: 'none', fontWeight: 600 }}>
                            View Full ATS Resume →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
