import { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_JOBS } from '../lib/mockData';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Users, TrendingUp, Filter, ChevronRight, Zap, Bookmark } from 'lucide-react';

const ROLES = ['All Roles', 'Backend', 'Frontend', 'Full Stack', 'Data Science', 'DevOps'];
const TYPES = ['All', 'Full Time', 'Internship'];

export default function JobHub() {
    const [activeRole, setActiveRole] = useState('All Roles');
    const [activeType, setActiveType] = useState('All');
    const [matchFilter, setMatchFilter] = useState(false);
    const [cgpaFilter, setCgpaFilter] = useState(6.0);

    const filtered = MOCK_JOBS.filter(j => {
        if (activeType !== 'All' && j.type !== activeType) return false;
        if (matchFilter && j.matchScore < 70) return false;
        if (j.minCgpa > cgpaFilter) return false;
        return true;
    });

    return (
        <div style={{ display: 'flex', gap: 24, maxWidth: 1200, margin: '0 auto' }}>
            {/* Left filter panel */}
            <aside style={{ width: 240, flexShrink: 0 }}>
                <div className="card" style={{ padding: 20, position: 'sticky', top: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                        <Filter size={14} color="#6366f1" />
                        <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Filters</span>
                    </div>

                    {/* Smart filters */}
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Smart Filters</div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, cursor: 'pointer' }}>
                            <input type="checkbox" checked={matchFilter} onChange={e => setMatchFilter(e.target.checked)} style={{ accentColor: '#6366f1' }} />
                            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-primary)' }}>Jobs I qualify for (70%+)</span>
                        </label>
                    </div>

                    {/* Role */}
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role</div>
                        {ROLES.map(r => (
                            <button key={r} onClick={() => setActiveRole(r)} style={{
                                display: 'block', width: '100%', textAlign: 'left',
                                padding: '7px 10px', borderRadius: 6, marginBottom: 3, border: 'none', cursor: 'pointer',
                                fontSize: '0.82rem', fontWeight: 500,
                                background: activeRole === r ? 'rgba(99,102,241,0.12)' : 'transparent',
                                color: activeRole === r ? '#a5b4fc' : 'var(--color-text-secondary)'
                            }}>{r}</button>
                        ))}
                    </div>

                    {/* Type */}
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {TYPES.map(t => (
                                <button key={t} onClick={() => setActiveType(t)} style={{
                                    padding: '5px 12px', borderRadius: 6, border: '1px solid',
                                    borderColor: activeType === t ? '#6366f1' : 'var(--color-border)',
                                    background: activeType === t ? 'rgba(99,102,241,0.12)' : 'transparent',
                                    color: activeType === t ? '#a5b4fc' : 'var(--color-text-secondary)',
                                    fontSize: '0.78rem', cursor: 'pointer', fontWeight: 500
                                }}>{t}</button>
                            ))}
                        </div>
                    </div>

                    {/* Min CGPA */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Min CGPA</span>
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6366f1' }}>{cgpaFilter.toFixed(1)}</span>
                        </div>
                        <input type="range" min={5} max={10} step={0.5} value={cgpaFilter}
                            onChange={e => setCgpaFilter(Number(e.target.value))}
                            style={{ width: '100%', accentColor: '#6366f1' }} />
                    </div>
                </div>
            </aside>

            {/* Job list */}
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 4 }}>Job Opportunities</h1>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.825rem' }}>{filtered.length} positions · AI-matched to your profile</p>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <TrendingUp size={14} color="#10b981" /> Sorted by match score
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {filtered.map((job, i) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07 }}
                            whileHover={{ y: -2, borderColor: '#6366f1' }}
                            style={{
                                background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                                borderRadius: 12, padding: '18px 22px', transition: 'all 0.2s', cursor: 'default'
                            }}
                        >
                            {/* Card top row */}
                            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                                    background: job.companyColor + '22',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 800, color: job.companyColor, fontSize: '1.2rem',
                                    border: `1px solid ${job.companyColor}33`
                                }}>
                                    {job.companyLogo}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div>
                                            <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 2 }}>{job.role}</h3>
                                            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{job.company}</div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{
                                                padding: '4px 12px', borderRadius: 999, fontWeight: 700, fontSize: '0.8rem',
                                                background: job.matchScore >= 80 ? 'rgba(16,185,129,0.12)' : job.matchScore >= 60 ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)',
                                                color: job.matchScore >= 80 ? '#10b981' : job.matchScore >= 60 ? '#f59e0b' : '#ef4444',
                                                border: `1px solid ${job.matchScore >= 80 ? '#10b98130' : job.matchScore >= 60 ? '#f59e0b30' : '#ef444430'}`
                                            }}>
                                                {job.matchScore}% Match
                                            </div>
                                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 4 }}>
                                                <Bookmark size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Meta row */}
                                    <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                                            <MapPin size={12} /> {job.location}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                                            <Clock size={12} /> {job.type}{job.remote ? ' · Remote' : ''}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                                            <DollarSign size={12} /> {job.salary}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                                            <Users size={12} /> {job.applicants.toLocaleString()} applicants
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Skills */}
                            <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
                                {job.skills.map(s => (
                                    <span key={s} style={{
                                        padding: '3px 10px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 500,
                                        background: job.missingSkills.includes(s) ? 'rgba(239,68,68,0.08)' : 'var(--color-surface-2)',
                                        color: job.missingSkills.includes(s) ? '#fca5a5' : 'var(--color-text-secondary)',
                                        border: `1px solid ${job.missingSkills.includes(s) ? 'rgba(239,68,68,0.2)' : 'var(--color-border)'}`,
                                    }}>
                                        {job.missingSkills.includes(s) ? '!' : '✓'} {s}
                                    </span>
                                ))}
                            </div>

                            {/* Allocation row */}
                            <div style={{
                                display: 'flex', gap: 24, marginTop: 14, paddingTop: 14,
                                borderTop: '1px solid var(--color-border)', alignItems: 'center'
                            }}>
                                <div style={{ fontSize: '0.75rem' }}>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Openings: </span>
                                    <span style={{ fontWeight: 700 }}>{job.openings}</span>
                                </div>
                                <div style={{ fontSize: '0.75rem' }}>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Shortlist: </span>
                                    <span style={{ fontWeight: 700, color: '#ef4444' }}>{(job.shortlistRatio * 100).toFixed(1)}%</span>
                                </div>
                                <div style={{ fontSize: '0.75rem' }}>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Min CGPA: </span>
                                    <span style={{ fontWeight: 700 }}>{job.minCgpa}</span>
                                </div>
                                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                                    <Link to={`/jobs/${job.id}/roadmap`} style={{
                                        padding: '7px 14px', borderRadius: 7, fontSize: '0.78rem', fontWeight: 600,
                                        background: 'rgba(99,102,241,0.1)', color: '#a5b4fc',
                                        border: '1px solid rgba(99,102,241,0.25)', textDecoration: 'none',
                                        display: 'flex', alignItems: 'center', gap: 5
                                    }}>
                                        <Zap size={12} /> Prep Roadmap
                                    </Link>
                                    <Link to={`/jobs/${job.id}`} style={{
                                        padding: '7px 14px', borderRadius: 7, fontSize: '0.78rem', fontWeight: 600,
                                        background: '#6366f1', color: 'white', textDecoration: 'none',
                                        display: 'flex', alignItems: 'center', gap: 5
                                    }}>
                                        View Details <ChevronRight size={12} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {filtered.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-muted)' }}>
                            No jobs match your current filters. Try relaxing the criteria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
