import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_JOBS, type Job, type DataSource } from '../lib/jobData';
import { Link } from 'react-router-dom';
import {
    MapPin, Clock, DollarSign, Filter,
    ChevronRight, Zap, Bookmark, Building2, Linkedin,
    GraduationCap, Globe, BadgeCheck, ChevronDown
} from 'lucide-react';

// ─── Source badge config ───────────────────────────────────────
const SOURCE_META: Record<DataSource, { label: string; color: string; bg: string; icon: React.ReactNode; description: string }> = {
    'KIIT T&P': {
        label: 'KIIT T&P',
        color: '#fbbf24',
        bg: 'rgba(251,191,36,0.12)',
        icon: <GraduationCap size={11} />,
        description: 'KIIT University Training & Placement Department (2025-26)',
    },
    'Company Career': {
        label: 'Career Page',
        color: '#10b981',
        bg: 'rgba(16,185,129,0.12)',
        icon: <Building2 size={11} />,
        description: 'Sourced directly from the company\'s official careers website',
    },
    'LinkedIn': {
        label: 'LinkedIn',
        color: '#0A66C2',
        bg: 'rgba(10,102,194,0.12)',
        icon: <Linkedin size={11} />,
        description: 'LinkedIn job posting',
    },
    'Internshala': {
        label: 'Internshala',
        color: '#009ee3',
        bg: 'rgba(0,158,227,0.12)',
        icon: <Globe size={11} />,
        description: 'Sourced from Internshala platform',
    },
    'HireMap AI': {
        label: 'HireMap AI',
        color: '#6366f1',
        bg: 'rgba(99,102,241,0.12)',
        icon: <Zap size={11} />,
        description: 'AI-aggregated from multiple public sources',
    },
};

function SourceBadge({ source, showTooltip = false }: { source: DataSource; showTooltip?: boolean }) {
    const meta = SOURCE_META[source];
    const [tip, setTip] = useState(false);
    return (
        <div style={{ position: 'relative', display: 'inline-flex' }}>
            <span
                onMouseEnter={() => showTooltip && setTip(true)}
                onMouseLeave={() => setTip(false)}
                style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    fontSize: '0.65rem', fontWeight: 700, padding: '3px 8px', borderRadius: 4,
                    background: meta.bg, color: meta.color,
                    border: `1px solid ${meta.color}30`, cursor: showTooltip ? 'help' : 'default'
                }}
            >
                {meta.icon} {meta.label}
            </span>
            {showTooltip && tip && (
                <div style={{
                    position: 'absolute', bottom: '120%', left: 0, width: 220, zIndex: 50,
                    background: 'var(--color-surface-3)', border: '1px solid var(--color-border)',
                    borderRadius: 8, padding: '8px 12px', fontSize: '0.72rem', color: 'var(--color-text-secondary)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
                }}>
                    {meta.description}
                </div>
            )}
        </div>
    );
}

// ─── Source filter tab ─────────────────────────────────────────
const ALL_SOURCES: DataSource[] = ['KIIT T&P', 'Company Career', 'LinkedIn', 'Internshala', 'HireMap AI'];

const ROLE_FILTERS = ['All Roles', 'Full Stack', 'Backend', 'Frontend', 'Data Science', 'DevOps', 'AI/ML', 'Business Analyst', 'Others'];
const TYPE_FILTERS = ['All', 'Internship', 'Full Time'];
const SORT_OPTIONS = ['Best Match', 'Highest CTC', 'Latest', 'CGPA Friendly'];

function jobMatchesRole(job: Job, role: string): boolean {
    if (role === 'All Roles') return true;
    const r = (job.role + ' ' + job.skills.join(' ')).toLowerCase();
    if (role === 'Full Stack') return r.includes('full stack') || (r.includes('react') && r.includes('node'));
    if (role === 'Backend') return r.includes('backend') || r.includes('node.js') || r.includes('django') || r.includes('spring');
    if (role === 'Frontend') return r.includes('frontend') || r.includes('react') || r.includes('angular');
    if (role === 'Data Science') return r.includes('data sci') || r.includes('ml') || r.includes('machine learning');
    if (role === 'DevOps') return r.includes('devops') || r.includes('docker') || r.includes('kubernetes');
    if (role === 'AI/ML') return r.includes('ai') || r.includes('ml') || r.includes('deep learning') || r.includes('nlp') || r.includes('llvm') || r.includes('automation');
    if (role === 'Business Analyst') return r.includes('analyst') || r.includes('business');
    if (role === 'Others') return !jobMatchesRole(job, 'Full Stack') && !jobMatchesRole(job, 'Backend') && !jobMatchesRole(job, 'Frontend') && !jobMatchesRole(job, 'Data Science') && !jobMatchesRole(job, 'DevOps') && !jobMatchesRole(job, 'AI/ML') && !jobMatchesRole(job, 'Business Analyst');
    return true;
}

export default function JobHub() {
    const [activeRole, setActiveRole] = useState('All Roles');
    const [activeType, setActiveType] = useState('All');
    const [activeSource, setActiveSource] = useState<'All' | DataSource>('All');
    const [matchFilter, setMatchFilter] = useState(false);
    const [cgpaFilter, setCgpaFilter] = useState(6.0);
    const [sortBy, setSortBy] = useState('Best Match');
    const [showFilters, setShowFilters] = useState(true);
    const [remoteOnly, setRemoteOnly] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'company'>('list');

    const filtered = useMemo(() => {
        let jobs = ALL_JOBS.filter(j => {
            if (activeType !== 'All' && j.type !== activeType) return false;
            if (activeSource !== 'All' && j.source !== activeSource) return false;
            if (matchFilter && j.matchScore < 70) return false;
            if (j.minCgpa > cgpaFilter) return false;
            if (remoteOnly && !j.remote) return false;
            if (!jobMatchesRole(j, activeRole)) return false;
            return true;
        });

        if (sortBy === 'Best Match') jobs = [...jobs].sort((a, b) => b.matchScore - a.matchScore);
        else if (sortBy === 'Highest CTC') {
            jobs = [...jobs].sort((a, b) => {
                const getN = (ctc: string) => { const m = ctc.match(/[\d.]+/); return m ? parseFloat(m[0]) : 0; };
                return getN(b.ctc) - getN(a.ctc);
            });
        }
        else if (sortBy === 'Latest') {
            // Keep original order (most recent first by postedDate)
        }
        else if (sortBy === 'CGPA Friendly') {
            jobs = [...jobs].sort((a, b) => a.minCgpa - b.minCgpa);
        }

        return jobs;
    }, [activeRole, activeType, activeSource, matchFilter, cgpaFilter, sortBy, remoteOnly]);

    const groupedByCompany = useMemo(() => {
        const map = new Map<string, typeof filtered>();
        for (const job of filtered) {
            if (!map.has(job.company)) map.set(job.company, []);
            map.get(job.company)!.push(job);
        }
        return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length);
    }, [filtered]);

    // Source counts for tab badges
    const sourceCounts = useMemo(() => {
        const counts: Record<string, number> = { All: ALL_JOBS.length };
        for (const src of ALL_SOURCES) {
            counts[src] = ALL_JOBS.filter(j => j.source === src).length;
        }
        return counts;
    }, []);

    return (
        <div style={{ display: 'flex', gap: 24, maxWidth: 1200, margin: '0 auto' }}>
            {/* Left filter panel */}
            <aside style={{ width: 240, flexShrink: 0 }}>
                <div className="card" style={{ position: 'sticky', top: 24, overflow: 'hidden' }}>
                    <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Filter size={13} color="#6366f1" />
                            <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Filters</span>
                        </div>
                        <button onClick={() => setShowFilters(f => !f)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                            <ChevronDown size={14} style={{ transform: showFilters ? 'rotate(0)' : 'rotate(-90deg)', transition: 'transform 0.2s' }} />
                        </button>
                    </div>

                    {showFilters && (
                        <div style={{ padding: '14px 14px' }}>
                            {/* Smart filters */}
                            <div style={{ marginBottom: 18 }}>
                                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Smart Filters</div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer' }}>
                                    <input type="checkbox" checked={matchFilter} onChange={e => setMatchFilter(e.target.checked)} style={{ accentColor: '#6366f1' }} />
                                    <span style={{ fontSize: '0.8rem' }}>I qualify (70%+ match)</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                    <input type="checkbox" checked={remoteOnly} onChange={e => setRemoteOnly(e.target.checked)} style={{ accentColor: '#6366f1' }} />
                                    <span style={{ fontSize: '0.8rem' }}>Remote / WFH only</span>
                                </label>
                            </div>

                            {/* Role */}
                            <div style={{ marginBottom: 18 }}>
                                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Role</div>
                                {ROLE_FILTERS.map(r => (
                                    <button key={r} onClick={() => setActiveRole(r)} style={{
                                        display: 'block', width: '100%', textAlign: 'left',
                                        padding: '6px 10px', borderRadius: 6, marginBottom: 2, border: 'none', cursor: 'pointer',
                                        fontSize: '0.8rem', fontWeight: 500,
                                        background: activeRole === r ? 'rgba(99,102,241,0.12)' : 'transparent',
                                        color: activeRole === r ? '#a5b4fc' : 'var(--color-text-secondary)'
                                    }}>{r}</button>
                                ))}
                            </div>

                            {/* Type */}
                            <div style={{ marginBottom: 18 }}>
                                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Type</div>
                                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                    {TYPE_FILTERS.map(t => (
                                        <button key={t} onClick={() => setActiveType(t)} style={{
                                            padding: '4px 10px', borderRadius: 6, border: '1px solid', cursor: 'pointer',
                                            borderColor: activeType === t ? '#6366f1' : 'var(--color-border)',
                                            background: activeType === t ? 'rgba(99,102,241,0.12)' : 'transparent',
                                            color: activeType === t ? '#a5b4fc' : 'var(--color-text-secondary)',
                                            fontSize: '0.75rem', fontWeight: 500
                                        }}>{t}</button>
                                    ))}
                                </div>
                            </div>

                            {/* Min CGPA */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your CGPA</span>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6366f1' }}>{cgpaFilter.toFixed(1)}</span>
                                </div>
                                <input type="range" min={5} max={10} step={0.5} value={cgpaFilter}
                                    onChange={e => setCgpaFilter(Number(e.target.value))}
                                    style={{ width: '100%', accentColor: '#6366f1' }} />
                                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
                                    Shows jobs where min CGPA ≤ {cgpaFilter}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main content */}
            <div style={{ flex: 1, minWidth: 0 }}>
                {/* Header */}
                <div style={{ marginBottom: 16 }}>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 4 }}>Job Opportunities</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                        {ALL_JOBS.length} listings · KIIT T&P data + live company openings · Batch 2025-26
                    </p>
                </div>

                {/* ── DATA SOURCE TABS ─────────────────────────────── */}
                <div style={{
                    marginBottom: 16, overflowX: 'auto', paddingBottom: 4,
                    display: 'flex', gap: 0, borderBottom: '1px solid var(--color-border)'
                }}>
                    {(['All', ...ALL_SOURCES] as const).map(src => {
                        const isActive = activeSource === src;
                        const meta = src === 'All' ? null : SOURCE_META[src];
                        return (
                            <button
                                key={src}
                                onClick={() => setActiveSource(src as any)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 6,
                                    padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer',
                                    borderBottom: `2px solid ${isActive ? '#6366f1' : 'transparent'}`,
                                    color: isActive ? '#a5b4fc' : 'var(--color-text-muted)',
                                    fontWeight: isActive ? 700 : 500, fontSize: '0.8rem',
                                    whiteSpace: 'nowrap', transition: 'all 0.15s'
                                }}
                            >
                                {meta && <span style={{ color: isActive ? meta.color : 'inherit' }}>{meta.icon}</span>}
                                {src === 'All' ? 'All Sources' : src}
                                <span style={{
                                    fontSize: '0.65rem', padding: '1px 6px', borderRadius: 4, fontWeight: 700,
                                    background: isActive ? 'rgba(99,102,241,0.15)' : 'var(--color-surface-2)',
                                    color: isActive ? '#a5b4fc' : 'var(--color-text-muted)'
                                }}>
                                    {sourceCounts[src] ?? 0}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Info banner for KIIT T&P */}
                {activeSource === 'KIIT T&P' && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            marginBottom: 14, padding: '10px 14px',
                            background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)',
                            borderRadius: 9, display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.78rem'
                        }}
                    >
                        <BadgeCheck size={15} color="#fbbf24" style={{ flexShrink: 0 }} />
                        <span style={{ color: 'var(--color-text-secondary)' }}>
                            <strong style={{ color: '#fbbf24' }}>KIIT T&P Verified</strong> —
                            {' '}All listings sourced from KIIT University Training & Placement Department, Batch 2025-26.
                            Stipend, CGPA criteria, and CTC are as officially communicated.
                        </span>
                    </motion.div>
                )}

                {/* Sort + count row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{filtered.length}</span> results
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ display: 'flex', background: 'var(--color-surface-2)', padding: 4, borderRadius: 8 }}>
                            <button onClick={() => setViewMode('list')} style={{ padding: '5px 12px', background: viewMode === 'list' ? 'var(--color-primary)' : 'transparent', color: viewMode === 'list' ? 'white' : 'var(--color-text-secondary)', border: 'none', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6 }}>List</button>
                            <button onClick={() => setViewMode('company')} style={{ padding: '5px 12px', background: viewMode === 'company' ? 'var(--color-primary)' : 'transparent', color: viewMode === 'company' ? 'white' : 'var(--color-text-secondary)', border: 'none', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6 }}><Building2 size={12} /> By Company</button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                style={{
                                    padding: '5px 10px', borderRadius: 7, fontSize: '0.78rem', fontWeight: 600,
                                    background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
                                    color: 'var(--color-text-primary)', cursor: 'pointer', outline: 'none'
                                }}
                            >
                                {SORT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Job cards */}
                {viewMode === 'list' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <AnimatePresence mode="popLayout">
                        {filtered.slice(0, 60).map((job, i) => (
                            <JobCard key={job.id} job={job} index={i} />
                        ))}
                    </AnimatePresence>

                    {filtered.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-muted)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: 12 }}>🔍</div>
                            <div style={{ fontWeight: 600, marginBottom: 6 }}>No jobs match your filters</div>
                            <div style={{ fontSize: '0.85rem' }}>Try relaxing the CGPA, role, or match filters</div>
                        </div>
                    )}

                    {filtered.length > 60 && (
                        <div style={{ textAlign: 'center', padding: '20px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                            Showing 60 of {filtered.length} jobs. Use filters to narrow down.
                        </div>
                    )}
                </div>
                ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                    {groupedByCompany.map(([companyName, jobs]) => (
                        <div key={companyName} className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s, transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 12, background: jobs[0].companyColor + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800, color: jobs[0].companyColor, flexShrink: 0 }}>
                                    {jobs[0].companyLogo}
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{companyName}</h3>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{jobs.length} open position{jobs.length > 1 ? 's' : ''}</div>
                                </div>
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {jobs.slice(0, 3).map(job => (
                                    <Link to={`/jobs/${job.id}`} key={job.id} style={{ display: 'block', textDecoration: 'none', padding: '12px 14px', background: 'var(--color-surface-2)', borderRadius: 10, border: '1px solid var(--color-border)', color: 'inherit', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-primary)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, gap: 10 }}>
                                            <div style={{ fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{job.role}</div>
                                            {job.matchScore >= 70 && <span style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 700, flexShrink: 0 }}>{job.matchScore}% Match</span>}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', gap: 10 }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={10} /> {job.location}</span>
                                        </div>
                                    </Link>
                                ))}
                                {jobs.length > 3 && (
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', textAlign: 'center', cursor: 'pointer', fontWeight: 600, padding: 8 }}>
                                        + {jobs.length - 3} more roles
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--color-text-muted)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: 12 }}>🔍</div>
                            <div style={{ fontWeight: 600, marginBottom: 6 }}>No companies match your filters</div>
                        </div>
                    )}
                </div>
                )}
            </div>
        </div>
    );
}

// ─── Job Card Component ────────────────────────────────────────
function JobCard({ job, index }: { job: Job; index: number }) {
    const [saved, setSaved] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ delay: Math.min(index * 0.04, 0.4) }}
            style={{
                background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                borderRadius: 12, padding: '16px 20px', transition: 'border-color 0.2s, box-shadow 0.2s'
            }}
            whileHover={{ borderColor: 'rgba(99,102,241,0.4)', boxShadow: '0 4px 20px rgba(99,102,241,0.08)' }}
        >
            {/* Top row */}
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: job.companyColor + '22', border: `1px solid ${job.companyColor}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, color: job.companyColor, fontSize: '1.1rem'
                }}>
                    {job.companyLogo}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                        <div style={{ minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>{job.role}</h3>
                                {job.verified && <BadgeCheck size={13} color="#10b981" />}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{job.company}</span>
                                {/* SOURCE BADGE */}
                                <SourceBadge source={job.source} showTooltip />
                                {job.remote && (
                                    <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '2px 6px', background: 'rgba(34,211,238,0.1)', color: '#22d3ee', borderRadius: 4, border: '1px solid rgba(34,211,238,0.2)' }}>Remote</span>
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                    <MapPin size={11} /> {job.location}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                    <Clock size={11} /> {job.type}{job.duration !== '-' ? ` · ${job.duration}` : ''}
                                </span>
                                {job.stipend !== 'Not Disclosed' && job.type === 'Internship' && (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                                        <DollarSign size={11} /> {job.stipend}
                                    </span>
                                )}
                                {job.ctc !== 'Not Disclosed' && (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#f59e0b', fontWeight: 600 }}>
                                        💼 {job.ctc}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Match score & save */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                            <div style={{
                                padding: '4px 12px', borderRadius: 999, fontWeight: 700, fontSize: '0.8rem',
                                background: job.matchScore >= 80 ? 'rgba(16,185,129,0.12)' : job.matchScore >= 60 ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)',
                                color: job.matchScore >= 80 ? '#10b981' : job.matchScore >= 60 ? '#f59e0b' : '#ef4444',
                                border: `1px solid ${job.matchScore >= 80 ? '#10b98130' : job.matchScore >= 60 ? '#f59e0b30' : '#ef444430'}`
                            }}>
                                {job.matchScore}% Match
                            </div>
                            <button
                                onClick={() => setSaved(s => !s)}
                                style={{
                                    background: saved ? 'rgba(99,102,241,0.1)' : 'none', border: 'none',
                                    cursor: 'pointer', color: saved ? '#6366f1' : 'var(--color-text-muted)', padding: 4, borderRadius: 4
                                }}
                            >
                                <Bookmark size={15} fill={saved ? '#6366f1' : 'none'} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills */}
            <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                {job.skills.map(s => (
                    <span key={s} style={{
                        padding: '2px 9px', borderRadius: 5, fontSize: '0.7rem', fontWeight: 500,
                        background: job.missingSkills.includes(s) ? 'rgba(239,68,68,0.08)' : 'var(--color-surface-2)',
                        color: job.missingSkills.includes(s) ? '#fca5a5' : 'var(--color-text-secondary)',
                        border: `1px solid ${job.missingSkills.includes(s) ? 'rgba(239,68,68,0.2)' : 'var(--color-border)'}`,
                    }}>
                        {job.missingSkills.includes(s) ? '! ' : '✓ '}{s}
                    </span>
                ))}
            </div>

            {/* Bottom row */}
            <div style={{ display: 'flex', gap: 20, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--color-border)', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                    Min CGPA: <strong style={{ color: job.minCgpa > 0 ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
                        {job.minCgpa > 0 ? job.minCgpa : 'Any'}
                    </strong>
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                    Posted: <strong>{job.postedDate}</strong>
                </span>
                {job.source === 'KIIT T&P' && (
                    <span style={{ fontSize: '0.65rem', background: 'rgba(251,191,36,0.08)', color: '#fbbf24', padding: '1px 6px', borderRadius: 4, border: '1px solid rgba(251,191,36,0.2)', fontWeight: 600 }}>
                        Batch {job.batch}
                    </span>
                )}

                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                    <Link
                        to={`/jobs/${job.id}/roadmap`}
                        style={{
                            padding: '6px 12px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600,
                            background: 'rgba(99,102,241,0.1)', color: '#a5b4fc',
                            border: '1px solid rgba(99,102,241,0.25)', textDecoration: 'none',
                            display: 'flex', alignItems: 'center', gap: 4
                        }}
                    >
                        <Zap size={11} /> Prep Road
                    </Link>
                    <Link
                        to={`/jobs/${job.id}`}
                        style={{
                            padding: '6px 12px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600,
                            background: '#6366f1', color: 'white', textDecoration: 'none',
                            display: 'flex', alignItems: 'center', gap: 4
                        }}
                    >
                        Details <ChevronRight size={11} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
