import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

const STEPS = [
    { title: 'Basic Info', fields: ['Full Name', 'College', 'Degree & Branch', 'CGPA', 'Graduation Year'] },
    { title: 'Coding Profiles', fields: ['GitHub Username', 'LeetCode Username', 'Codeforces Username', 'HackerRank Username'] },
    { title: 'Select Skills', type: 'skills' },
    { title: 'Career Intent', fields: ['Target Roles (e.g. SDE, Data Scientist)', 'Preferred Locations', 'Job Focus (Internship / Full-time)', 'Weekly Availability (hrs)'] },
    { title: 'Connect & Go!', type: 'final' },
];

const SKILLS = ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'C++', 'Rust', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'MongoDB', 'Docker', 'AWS', 'System Design', 'DSA', 'Machine Learning'];

export default function Onboarding() {
    const [step, setStep] = useState(0);
    const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());
    const [form, setForm] = useState<Record<string, string>>({});

    const toggleSkill = (s: string) => {
        setSelectedSkills(prev => {
            const next = new Set(prev);
            next.has(s) ? next.delete(s) : next.add(s);
            return next;
        });
    };

    const current = STEPS[step];
    const pct = Math.round((step / (STEPS.length - 1)) * 100);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <div style={{ maxWidth: 560, width: '100%' }}>
                {/* Logo row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40, justifyContent: 'center' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontWeight: 800, color: 'white' }}>H</span>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>HireMap</span>
                </div>

                {/* Step labels */}
                <div style={{ display: 'flex', gap: 0, marginBottom: 32, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 14, left: '10%', right: '10%', height: 2, background: 'var(--color-surface-2)' }} />
                    <div style={{ position: 'absolute', top: 14, left: '10%', height: 2, background: '#6366f1', transition: 'width 0.4s', width: `${Math.min(100, pct * 0.8)}%` }} />
                    {STEPS.map((s, i) => (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: '50%', zIndex: 1,
                                background: i < step ? '#6366f1' : i === step ? '#6366f1' : 'var(--color-surface-2)',
                                border: i <= step ? '2px solid #6366f1' : '2px solid var(--color-border)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.75rem', fontWeight: 700, color: 'white', transition: 'all 0.3s'
                            }}>
                                {i < step ? <CheckCircle2 size={14} /> : i + 1}
                            </div>
                            <span style={{ fontSize: '0.62rem', color: i <= step ? '#a5b4fc' : 'var(--color-text-muted)', fontWeight: i === step ? 700 : 400, textAlign: 'center', lineHeight: 1.2 }}>
                                {s.title}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Card */}
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                    className="card"
                    style={{ padding: '32px 36px' }}
                >
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 6 }}>{current.title}</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: 28 }}>
                        {step === 0 && 'Tell us about yourself so we can set up your talent profile.'}
                        {step === 1 && 'Link your coding platforms. We\'ll auto-sync your stats.'}
                        {step === 2 && 'Pick all the skills you\'re comfortable with.'}
                        {step === 3 && 'Help us understand what kind of opportunities you\'re looking for.'}
                        {step === 4 && 'You\'re all set! Your Talent Graph is being built now.'}
                    </p>

                    {current.type === 'skills' ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
                            {SKILLS.map(skill => (
                                <button
                                    key={skill}
                                    onClick={() => toggleSkill(skill)}
                                    style={{
                                        padding: '7px 16px', borderRadius: 8, border: '1px solid', cursor: 'pointer',
                                        fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.15s',
                                        borderColor: selectedSkills.has(skill) ? '#6366f1' : 'var(--color-border)',
                                        background: selectedSkills.has(skill) ? 'rgba(99,102,241,0.15)' : 'var(--color-surface-2)',
                                        color: selectedSkills.has(skill) ? '#a5b4fc' : 'var(--color-text-muted)',
                                    }}
                                >
                                    {selectedSkills.has(skill) ? '✓ ' : ''}{skill}
                                </button>
                            ))}
                        </div>
                    ) : current.type === 'final' ? (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                            <div style={{ fontSize: '4rem', marginBottom: 16 }}>🚀</div>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 8 }}>
                                Your talent graph is ready! We've synced your coding profiles and calculated your readiness score.
                            </p>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px',
                                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                                borderRadius: 8, fontSize: '0.875rem', color: '#10b981', fontWeight: 600
                            }}>
                                <CheckCircle2 size={16} /> Profile Score: 78% · You qualify for 14 jobs
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {current.fields?.map((field) => (
                                <div key={field}>
                                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 6 }}>{field}</label>
                                    <input
                                        placeholder={field}
                                        value={form[field] || ''}
                                        onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                                        style={{
                                            width: '100%', padding: '10px 14px',
                                            background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
                                            borderRadius: 8, fontSize: '0.875rem', color: 'var(--color-text-primary)',
                                            outline: 'none', boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                    {step > 0 ? (
                        <button onClick={() => setStep(p => p - 1)} style={{ padding: '10px 20px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, cursor: 'pointer', fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                            ← Back
                        </button>
                    ) : <div />}

                    {step < STEPS.length - 1 ? (
                        <button onClick={() => setStep(p => p + 1)} style={{ padding: '10px 24px', background: '#6366f1', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '0.875rem', color: 'white', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                            Continue <ChevronRight size={14} />
                        </button>
                    ) : (
                        <Link to="/dashboard" style={{ padding: '10px 24px', background: '#10b981', borderRadius: 8, fontSize: '0.875rem', color: 'white', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                            Go to Dashboard <ArrowRight size={14} />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
