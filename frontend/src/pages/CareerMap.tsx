import { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, TrendingUp, Zap, Star, Lock, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { useToast } from '../lib/toast';

const CAREER_PATHS = [
    {
        id: 'sde', title: 'Software Development Engineer', emoji: '💻', color: '#ff6b4a',
        companies: ['Google', 'Microsoft', 'Amazon', 'Flipkart'],
        salary: '₹20–80 LPA', demand: 'Very High', match: 84,
        stages: [
            { name: 'DSA Fundamentals', done: true, weeks: 4 },
            { name: 'System Design', done: false, weeks: 6, current: true },
            { name: 'Backend Projects', done: false, weeks: 4 },
            { name: 'Mock Interviews', done: false, weeks: 2 },
        ]
    },
    {
        id: 'ml', title: 'Machine Learning Engineer', emoji: '🤖', color: '#00e5c3',
        companies: ['OpenAI', 'Google DeepMind', 'Anthropic', 'Meesho'],
        salary: '₹25–100 LPA', demand: 'High', match: 51,
        stages: [
            { name: 'Python & Math', done: true, weeks: 3 },
            { name: 'ML Algorithms', done: false, weeks: 8, current: true },
            { name: 'Deep Learning', done: false, weeks: 6 },
            { name: 'MLOps & Deployment', done: false, weeks: 4 },
        ]
    },
    {
        id: 'pm', title: 'Product Manager', emoji: '📊', color: '#ffb84d',
        companies: ['Zepto', 'CRED', 'Swiggy', 'PhonePe'],
        salary: '₹18–60 LPA', demand: 'Medium', match: 37,
        stages: [
            { name: 'PM Fundamentals', done: false, weeks: 3 },
            { name: 'Product Analytics', done: false, weeks: 4 },
            { name: 'Case Studies', done: false, weeks: 6 },
            { name: 'Portfolio & Networking', done: false, weeks: 3 },
        ]
    },
    {
        id: 'devops', title: 'DevOps / Cloud Engineer', emoji: '☁️', color: '#4477ff',
        companies: ['AWS', 'Azure', 'HashiCorp', 'Atlassian'],
        salary: '₹15–50 LPA', demand: 'High', match: 62,
        stages: [
            { name: 'Linux & Networking', done: true, weeks: 3 },
            { name: 'Docker & Kubernetes', done: false, weeks: 5, current: true },
            { name: 'CI/CD Pipelines', done: false, weeks: 4 },
            { name: 'Cloud Certifications', done: false, weeks: 6 },
        ]
    },
];

const SKILL_GAPS: Record<string, { skill: string; importance: 'critical' | 'high' | 'medium'; hasIt: boolean }[]> = {
    sde: [
        { skill: 'System Design', importance: 'critical', hasIt: false },
        { skill: 'Node.js', importance: 'high', hasIt: true },
        { skill: 'DSA (200+ problems)', importance: 'critical', hasIt: false },
        { skill: 'Docker', importance: 'medium', hasIt: false },
    ],
    ml: [
        { skill: 'PyTorch / TensorFlow', importance: 'critical', hasIt: false },
        { skill: 'Linear Algebra', importance: 'critical', hasIt: false },
        { skill: 'Python', importance: 'high', hasIt: true },
        { skill: 'ML Papers', importance: 'medium', hasIt: false },
    ],
    pm: [
        { skill: 'Product Thinking', importance: 'critical', hasIt: false },
        { skill: 'SQL Analytics', importance: 'high', hasIt: true },
        { skill: 'User Research', importance: 'high', hasIt: false },
        { skill: 'Figma / Wireframing', importance: 'medium', hasIt: false },
    ],
    devops: [
        { skill: 'Kubernetes', importance: 'critical', hasIt: false },
        { skill: 'Terraform', importance: 'high', hasIt: false },
        { skill: 'Linux', importance: 'high', hasIt: true },
        { skill: 'AWS/GCP', importance: 'critical', hasIt: false },
    ],
};

const impColor = { critical: '#ff4d6a', high: '#ffb84d', medium: '#00e5c3' };

export default function CareerMap() {
    const [selected, setSelected] = useState('sde');
    const { toast } = useToast();
    const path = CAREER_PATHS.find(p => p.id === selected)!;
    const gaps = SKILL_GAPS[selected];
    const missing = gaps.filter(g => !g.hasIt).length;

    return (
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Map size={22} color="var(--color-primary)" /> Career Map
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Explore career paths, see your skill gap, and get a personalized roadmap to get there.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
                {/* Path selector */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div className="card" style={{ padding: 16 }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Choose a Career Path</div>
                        {CAREER_PATHS.map(p => (
                            <motion.button
                                key={p.id}
                                whileHover={{ x: 3 }}
                                onClick={() => setSelected(p.id)}
                                style={{
                                    width: '100%', padding: '12px 14px', borderRadius: 10, marginBottom: 6,
                                    border: `1.5px solid ${selected === p.id ? p.color : 'var(--color-border)'}`,
                                    background: selected === p.id ? p.color + '12' : 'transparent',
                                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', fontFamily: 'var(--font-sans)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontSize: '1.1rem' }}>{p.emoji}</span>
                                    <span style={{
                                        fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                                        background: p.match >= 70 ? 'rgba(0,217,126,0.15)' : p.match >= 50 ? 'rgba(255,184,77,0.15)' : 'rgba(255,77,106,0.15)',
                                        color: p.match >= 70 ? 'var(--color-success)' : p.match >= 50 ? 'var(--color-warn)' : 'var(--color-danger)'
                                    }}>{p.match}% match</span>
                                </div>
                                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: selected === p.id ? p.color : 'var(--color-text-primary)' }}>{p.title}</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: 2 }}>{p.salary}</div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Main content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Path header */}
                    <motion.div key={selected} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                    <span style={{ fontSize: '1.5rem' }}>{path.emoji}</span>
                                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800 }}>{path.title}</h2>
                                </div>
                                <div style={{ display: 'flex', gap: 16, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                    <span>💰 {path.salary}</span>
                                    <span>📈 {path.demand} demand</span>
                                    <span>⏱ ~{path.stages.reduce((a, s) => a + s.weeks, 0)} weeks</span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: path.color, fontFamily: 'var(--font-display)' }}>{path.match}%</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Current match</div>
                            </div>
                        </div>

                        {/* Match bar */}
                        <div style={{ marginTop: 16 }}>
                            <div style={{ height: 8, background: 'var(--color-surface-3)', borderRadius: 4, overflow: 'hidden' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${path.match}%` }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                    style={{ height: '100%', background: `linear-gradient(90deg, ${path.color}, ${path.color}99)`, borderRadius: 4 }}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                                <span>0%</span>
                                <span>Fill {missing} skill gaps to reach 90%</span>
                                <span>100%</span>
                            </div>
                        </div>

                        {/* Hiring companies */}
                        <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {path.companies.map(c => (
                                <span key={c} style={{ fontSize: '0.75rem', padding: '4px 12px', borderRadius: 999, background: path.color + '15', color: path.color, fontWeight: 600, border: `1px solid ${path.color}30` }}>{c}</span>
                            ))}
                        </div>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {/* Roadmap stages */}
                        <div className="card" style={{ padding: 22 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                                <TrendingUp size={16} color={path.color} />
                                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Learning Roadmap</span>
                            </div>
                            {path.stages.map((stage, i) => (
                                <div key={stage.name} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{
                                            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                                            background: stage.done ? 'var(--color-success)' : stage.current ? path.color : 'var(--color-surface-3)',
                                            border: `2px solid ${stage.done ? 'var(--color-success)' : stage.current ? path.color : 'var(--color-border)'}`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            {stage.done ? <CheckCircle2 size={14} color="white" /> : stage.current ? <Zap size={12} color="white" /> : <Lock size={11} color="var(--color-text-muted)" />}
                                        </div>
                                        {i < path.stages.length - 1 && (
                                            <div style={{ width: 2, flex: 1, minHeight: 20, background: stage.done ? 'var(--color-success)' : 'var(--color-border)', margin: '4px 0' }} />
                                        )}
                                    </div>
                                    <div style={{ paddingBottom: 14 }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: stage.current ? path.color : stage.done ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>{stage.name}</div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Clock size={10} /> ~{stage.weeks} weeks
                                            {stage.current && <span style={{ color: path.color, fontWeight: 700 }}> · In progress</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Skill gap */}
                        <div className="card" style={{ padding: 22 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                                <Star size={16} color={path.color} />
                                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Skill Gap Analysis</span>
                            </div>
                            {gaps.map(g => (
                                <div key={g.skill} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        {g.hasIt ? <CheckCircle2 size={14} color="var(--color-success)" /> : <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid var(--color-border)' }} />}
                                        <span style={{ fontSize: '0.85rem', color: g.hasIt ? 'var(--color-text-secondary)' : 'var(--color-text-primary)', textDecoration: g.hasIt ? 'line-through' : 'none' }}>{g.skill}</span>
                                    </div>
                                    <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: impColor[g.importance] + '20', color: impColor[g.importance] }}>
                                        {g.importance}
                                    </span>
                                </div>
                            ))}
                            <button className="btn-primary" style={{ marginTop: 16, width: '100%', padding: '10px', fontSize: '0.82rem' }}
                                onClick={() => toast('Roadmap generated! Navigate to Roadmaps tab.', 'success')}>
                                <ArrowRight size={14} /> Generate Full Roadmap
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
