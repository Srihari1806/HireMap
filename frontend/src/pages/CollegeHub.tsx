import { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_FEED_POSTS, MOCK_COLLEGES } from '../lib/mockData';
import { Link } from 'react-router-dom';
import { ThumbsUp, MessageCircle, ShieldCheck, AlertTriangle, TrendingUp, Users } from 'lucide-react';

const TYPE_META: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    REALITY_CHECK: { label: 'Reality Check', color: '#ef4444', icon: <AlertTriangle size={12} /> },
    PLACEMENT_UPDATE: { label: 'Placement Update', color: '#10b981', icon: <TrendingUp size={12} /> },
    STUDENT_EXP: { label: 'Student Experience', color: '#6366f1', icon: <Users size={12} /> },
    ALUMNI_OUTCOME: { label: 'Alumni Outcome', color: '#22d3ee', icon: <ShieldCheck size={12} /> },
    INTERNSHIP_STATS: { label: 'Internship Stats', color: '#f59e0b', icon: <ShieldCheck size={12} /> },
};

function DnaBar({ label, score }: { label: string; score: number }) {
    return (
        <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{label}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444' }}>{score}</span>
            </div>
            <div style={{ height: 6, background: 'var(--color-surface-3)', borderRadius: 3, overflow: 'hidden' }}>
                <motion.div
                    initial={{ width: 0 }} animate={{ width: `${score}%` }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    style={{ height: '100%', borderRadius: 3, background: score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444' }}
                />
            </div>
        </div>
    );
}

export default function CollegeHub() {
    const [liked, setLiked] = useState<Set<string>>(new Set());

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, maxWidth: 1200, margin: '0 auto' }}>
            {/* Feed */}
            <div>
                <div style={{ marginBottom: 22 }}>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 4 }}>College Reality Feed</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.825rem' }}>Verified placements, anonymous reality checks, student experiences</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {MOCK_FEED_POSTS.map((post, i) => {
                        const meta = TYPE_META[post.type];
                        const isLiked = liked.has(post.id);
                        return (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="card"
                                style={{ padding: '20px 22px' }}
                            >
                                {/* Post header */}
                                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                            {/* Type badge */}
                                            <span style={{
                                                display: 'inline-flex', alignItems: 'center', gap: 4,
                                                fontSize: '0.65rem', fontWeight: 700, padding: '3px 8px', borderRadius: 4,
                                                background: meta.color + '15', color: meta.color,
                                                border: `1px solid ${meta.color}30`
                                            }}>
                                                {meta.icon} {meta.label}
                                            </span>
                                            {post.verified && (
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: '0.65rem', color: '#10b981', fontWeight: 600 }}>
                                                    <ShieldCheck size={11} /> Verified
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#a5b4fc', fontSize: '0.75rem' }}>
                                                {post.author[0]}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{post.author}</div>
                                                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{post.college} · {post.timeAgo}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: 16 }}>
                                    {post.content}
                                </p>

                                {/* Actions */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 14, borderTop: '1px solid var(--color-border)' }}>
                                    <button
                                        onClick={() => {
                                            setLiked(prev => {
                                                const next = new Set(prev);
                                                next.has(post.id) ? next.delete(post.id) : next.add(post.id);
                                                return next;
                                            });
                                        }}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 6,
                                            padding: '6px 12px', borderRadius: 7,
                                            background: isLiked ? 'rgba(99,102,241,0.12)' : 'var(--color-surface-2)',
                                            border: isLiked ? '1px solid rgba(99,102,241,0.3)' : '1px solid var(--color-border)',
                                            color: isLiked ? '#a5b4fc' : 'var(--color-text-muted)',
                                            cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600
                                        }}
                                    >
                                        <ThumbsUp size={13} fill={isLiked ? '#a5b4fc' : 'none'} />
                                        {post.helpful + (isLiked ? 1 : 0)} Helpful
                                    </button>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}>
                                        <MessageCircle size={13} /> {post.comments} Comments
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Right: College cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>Top Colleges</h2>
                {MOCK_COLLEGES.map((col, i) => (
                    <motion.div
                        key={col.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="card"
                        style={{ padding: '18px 20px' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 2 }}>{col.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{col.location}</div>
                            </div>
                            <span style={{
                                fontSize: '0.65rem', fontWeight: 700, padding: '3px 8px', borderRadius: 4,
                                background: col.tier === 'IIT' ? 'rgba(239,68,68,0.1)' : col.tier === 'NIT' ? 'rgba(245,158,11,0.1)' : 'rgba(99,102,241,0.1)',
                                color: col.tier === 'IIT' ? '#fca5a5' : col.tier === 'NIT' ? '#fcd34d' : '#a5b4fc'
                            }}>{col.tier}</span>
                        </div>

                        <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                            <div style={{ textAlign: 'center', flex: 1, padding: '8px', background: 'var(--color-surface-2)', borderRadius: 8 }}>
                                <div style={{ fontWeight: 800, color: '#10b981' }}>₹{col.avgPackage}L</div>
                                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>Avg Package</div>
                            </div>
                            <div style={{ textAlign: 'center', flex: 1, padding: '8px', background: 'var(--color-surface-2)', borderRadius: 8 }}>
                                <div style={{ fontWeight: 800 }}>{col.placedPercent}%</div>
                                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>Placed</div>
                            </div>
                        </div>

                        <div style={{ marginBottom: 14 }}>
                            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 8 }}>College DNA Score</div>
                            <DnaBar label="Placement Reality" score={col.dnaScore.placementReality} />
                            <DnaBar label="Internship Exposure" score={col.dnaScore.internshipExposure} />
                            <DnaBar label="ROI" score={col.dnaScore.roi} />
                        </div>

                        <Link
                            to={`/colleges/${col.id}`}
                            style={{
                                display: 'block', textAlign: 'center', padding: '8px',
                                background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
                                borderRadius: 7, color: '#a5b4fc', fontWeight: 600, fontSize: '0.78rem', textDecoration: 'none'
                            }}
                        >
                            View College Profile →
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
