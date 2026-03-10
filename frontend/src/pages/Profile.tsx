import { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_STUDENT, MOCK_CODING_STATS } from '../lib/mockData';
import { Edit3, Share2, ExternalLink, Plus } from 'lucide-react';

const PROJECTS = [
    { name: 'HireMap', desc: 'Talent Intelligence Platform – React, Node, PostgreSQL, Redis', skills: ['React', 'Node.js', 'PostgreSQL', 'Redis'], stars: 42, link: '#' },
    { name: 'DSA Tracker', desc: 'Personal Dashboard for tracking DSA progress visually', skills: ['React', 'TypeScript', 'Chart.js'], stars: 18, link: '#' },
    { name: 'MiniDB', desc: 'Toy SQL database engine written in Python', skills: ['Python', 'File I/O'], stars: 9, link: '#' },
];

export default function Profile() {
    const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'skills'>('overview');
    const s = MOCK_STUDENT;
    const lc = MOCK_CODING_STATS.leetcode;
    const gh = MOCK_CODING_STATS.github;

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'projects', label: 'Projects' },
        { id: 'skills', label: 'Skills' },
    ] as const;

    return (
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {/* Profile Header */}
            <div className="card" style={{ padding: '28px 32px', marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {/* Avatar */}
                    <div style={{
                        width: 90, height: 90, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2rem', fontWeight: 800, color: 'white', flexShrink: 0,
                        border: '3px solid rgba(99,102,241,0.4)'
                    }}>
                        SB
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{s.name}</h1>
                            <span style={{ fontSize: '0.75rem', color: '#a5b4fc', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>@{s.username}</span>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: 12 }}>
                            {s.college} · {s.branch} · Class of {s.graduationYear} · CGPA: {s.cgpa}
                        </p>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: 560, marginBottom: 14 }}>
                            {s.bio}
                        </p>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {s.badges.map(b => (
                                <span key={b} style={{ fontSize: '0.7rem', fontWeight: 600, padding: '3px 10px', borderRadius: 4, background: 'rgba(245,158,11,0.1)', color: '#fcd34d', border: '1px solid rgba(245,158,11,0.2)' }}>
                                    🏆 {b}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 8, cursor: 'pointer', fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                            <Edit3 size={13} /> Edit Profile
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8, cursor: 'pointer', fontSize: '0.8rem', color: '#a5b4fc', fontWeight: 600 }}>
                            <Share2 size={13} /> Share Profile
                        </button>
                    </div>
                </div>

                {/* Platform links */}
                <div style={{ display: 'flex', gap: 10, marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--color-border)', flexWrap: 'wrap' }}>
                    {[
                        { label: `GitHub · ${gh.username}`, color: '#f1f5f9', bg: '#1f2937' },
                        { label: `LeetCode · ${lc.username}`, color: '#fbbf24', bg: '#292524' },
                        { label: `HackerRank · ${s.codingProfiles.hackerrank}`, color: '#22d3ee', bg: '#0c1a2e' },
                    ].map(pl => (
                        <a key={pl.label} href="#" style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '6px 12px', borderRadius: 7, textDecoration: 'none', fontSize: '0.78rem', fontWeight: 600,
                            background: pl.bg, color: pl.color, border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <ExternalLink size={11} /> {pl.label}
                        </a>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 2, marginBottom: 20, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 10, padding: 4, width: 'fit-content' }}>
                {tabs.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        style={{
                            padding: '7px 20px', borderRadius: 7, border: 'none', cursor: 'pointer',
                            background: activeTab === t.id ? '#6366f1' : 'transparent',
                            color: activeTab === t.id ? 'white' : 'var(--color-text-muted)',
                            fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s'
                        }}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Overview */}
            {activeTab === 'overview' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div className="card" style={{ padding: 22 }}>
                        <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.95rem' }}>Coding Stats</h3>
                        {[
                            { l: 'LeetCode Solved', v: lc.totalSolved, c: '#10b981' },
                            { l: 'Contest Rating', v: lc.contestRating, c: '#f59e0b' },
                            { l: 'GitHub Commits', v: gh.totalCommits, c: '#22d3ee' },
                            { l: 'Public Repos', v: gh.publicRepos, c: '#6366f1' },
                            { l: 'Max Streak', v: `${lc.maxStreak}d 🔥`, c: '#f59e0b' },
                        ].map(({ l, v, c }) => (
                            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--color-border)' }}>
                                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{l}</span>
                                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: c }}>{v}</span>
                            </div>
                        ))}
                    </div>
                    <div className="card" style={{ padding: 22 }}>
                        <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.95rem' }}>Career Intent</h3>
                        {[
                            { l: 'Target Role', v: 'Backend / Full-stack SDE' },
                            { l: 'Preferred Location', v: 'Bangalore, Remote' },
                            { l: 'Focus', v: 'Full Time + Internship' },
                            { l: 'Weekly Hours', v: '20+ hrs / week' },
                            { l: 'Open to Relocate', v: 'Yes' },
                        ].map(({ l, v }) => (
                            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--color-border)' }}>
                                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{l}</span>
                                <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{v}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'projects' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {PROJECTS.map(p => (
                        <div key={p.name} className="card" style={{ padding: '18px 22px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                <div style={{ fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    {p.name}
                                    <span style={{ fontSize: '0.75rem', color: '#f59e0b' }}>★ {p.stars}</span>
                                </div>
                                <a href={p.link} style={{ color: '#6366f1', textDecoration: 'none' }}><ExternalLink size={14} /></a>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 12 }}>{p.desc}</p>
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                {p.skills.map(s => (
                                    <span key={s} style={{ padding: '3px 10px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 6, fontSize: '0.72rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{s}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px', background: 'transparent', border: '1px dashed var(--color-border)', borderRadius: 10, cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                        <Plus size={14} /> Add Project
                    </button>
                </div>
            )}

            {activeTab === 'skills' && (
                <div className="card" style={{ padding: 24 }}>
                    <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.95rem' }}>Skills</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        {s.skills.map(skill => (
                            <motion.span
                                key={skill}
                                whileHover={{ scale: 1.05 }}
                                style={{
                                    padding: '7px 16px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600,
                                    background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
                                    color: '#a5b4fc', cursor: 'default'
                                }}
                            >
                                {skill}
                            </motion.span>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            style={{
                                padding: '7px 16px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600,
                                background: 'transparent', border: '1px dashed var(--color-border)',
                                color: 'var(--color-text-muted)', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: 4
                            }}
                        >
                            <Plus size={14} /> Add Skill
                        </motion.button>
                    </div>
                </div>
            )}
        </div>
    );
}
