import { motion } from 'framer-motion';
import { MOCK_PROGRESS_STATS } from '../lib/mockData';
import { CheckCircle2, Flame, Award, Target } from 'lucide-react';

function Ring({ percent, color, size = 90 }: { percent: number; color: string; size?: number }) {
    const r = (size - 10) / 2;
    const circ = 2 * Math.PI * r;
    return (
        <div style={{ position: 'relative', width: size, height: size }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-surface-3)" strokeWidth={9} />
                <motion.circle
                    cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={9}
                    strokeDasharray={circ}
                    initial={{ strokeDashoffset: circ }}
                    animate={{ strokeDashoffset: circ - (percent / 100) * circ }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                    strokeLinecap="round"
                />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', color }}>
                {percent}%
            </div>
        </div>
    );
}

export default function Progress() {
    const ps = MOCK_PROGRESS_STATS;
    const overallPct = Math.round(ps.subjectProgress.reduce((s, x) => s + x.percent, 0) / ps.subjectProgress.length);

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>Your Progress</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: 28 }}>Track your career readiness journey</p>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
                {[
                    { label: 'Skills Mastered', value: ps.skillsMastered, icon: <CheckCircle2 size={18} />, color: '#10b981' },
                    { label: 'Jobs Unlocked', value: ps.jobsUnlocked, icon: <Target size={18} />, color: '#6366f1' },
                    { label: 'Current Streak', value: `${ps.weeklyStreak}d`, icon: <Flame size={18} />, color: '#f59e0b' },
                    { label: 'Badges Earned', value: ps.totalBadges, icon: <Award size={18} />, color: '#22d3ee' },
                ].map(({ label, value, icon, color }) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="card" style={{ padding: '20px', textAlign: 'center' }}
                    >
                        <div style={{ color, marginBottom: 8, display: 'flex', justifyContent: 'center' }}>{icon}</div>
                        <div style={{ fontSize: '2rem', fontWeight: 900, color, marginBottom: 4 }}>{value}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{label}</div>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {/* Subject progress bars */}
                <div className="card" style={{ padding: 24 }}>
                    <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 20 }}>Subject Mastery</h2>
                    {ps.subjectProgress.map((s, i) => (
                        <div key={s.name} style={{ marginBottom: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{s.name}</span>
                                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: s.percent >= 70 ? '#10b981' : s.percent >= 40 ? '#f59e0b' : '#ef4444' }}>{s.percent}%</span>
                            </div>
                            <div style={{ height: 7, background: 'var(--color-surface-3)', borderRadius: 4, overflow: 'hidden' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${s.percent}%` }}
                                    transition={{ duration: 0.9, delay: i * 0.08 }}
                                    style={{
                                        height: '100%', borderRadius: 4,
                                        background: s.percent >= 70 ? '#10b981' : s.percent >= 40 ? '#f59e0b' : '#ef4444'
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progress rings + badges */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className="card" style={{ padding: 24 }}>
                        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 20 }}>Overall Readiness</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
                            <div style={{ textAlign: 'center' }}>
                                <Ring percent={overallPct} color="#6366f1" size={100} />
                                <div style={{ marginTop: 8, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Overall</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Ring percent={68} color="#f59e0b" size={100} />
                                <div style={{ marginTop: 8, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>DSA</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Ring percent={23} color="#22d3ee" size={100} />
                                <div style={{ marginTop: 8, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>System Design</div>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 24 }}>
                        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 16 }}>Badges</h2>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            {[
                                { emoji: '🏆', label: 'Top 10%', unlocked: true },
                                { emoji: '🔥', label: '100 Days', unlocked: true },
                                { emoji: '⭐', label: 'Open Source', unlocked: true },
                                { emoji: '🚀', label: '500 Problems', unlocked: false },
                                { emoji: '💼', label: 'First Job', unlocked: false },
                                { emoji: '🎯', label: '95% Match', unlocked: false },
                            ].map(badge => (
                                <div key={badge.label} style={{
                                    textAlign: 'center', padding: '12px 14px', borderRadius: 10, minWidth: 70,
                                    background: badge.unlocked ? 'rgba(99,102,241,0.08)' : 'var(--color-surface-2)',
                                    border: badge.unlocked ? '1px solid rgba(99,102,241,0.25)' : '1px solid var(--color-border)',
                                    opacity: badge.unlocked ? 1 : 0.4
                                }}>
                                    <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{badge.emoji}</div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 600, color: badge.unlocked ? '#a5b4fc' : 'var(--color-text-muted)' }}>{badge.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
