import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Code2, Zap, Users, Building2, GraduationCap, Globe, ChevronDown, Star, TrendingUp, Shield } from 'lucide-react';

const COUNTER_TARGETS = [
    { label: 'Students', value: 28400, suffix: '+' },
    { label: 'Companies', value: 340, suffix: '+' },
    { label: 'Job Matches', value: 92000, suffix: '+' },
    { label: 'Colleges', value: 180, suffix: '+' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !started) setStarted(true);
        });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        let frame: number;
        const duration = 1600;
        const start = performance.now();
        const animate = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(eased * target));
            if (p < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [started, target]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}{suffix}
        </span>
    );
}

const FEATURES = [
    {
        icon: <Code2 size={22} />,
        color: '#6366f1',
        title: 'Talent Graph',
        desc: 'Auto-maps your skills, projects and coding activity into a searchable intelligence graph.',
    },
    {
        icon: <Zap size={22} />,
        color: '#f59e0b',
        title: 'AI Job Matching',
        desc: 'Gets your skill match % for every job. Tells you exactly what to learn next.',
    },
    {
        icon: <Github size={22} />,
        color: '#10b981',
        title: 'Auto Data Sync',
        desc: 'Pulls live stats from GitHub, LeetCode, Codeforces, HackerRank into one profile.',
    },
    {
        icon: <Globe size={22} />,
        color: '#22d3ee',
        title: 'ATS Resume Engine',
        desc: 'Generates ATS-optimized resumes with keyword scoring. Export PDF instantly.',
    },
    {
        icon: <TrendingUp size={22} />,
        color: '#8b5cf6',
        title: 'Smart Roadmaps',
        desc: 'Role-specific week-by-week prep plans, adapted to your current skill gap.',
    },
    {
        icon: <Shield size={22} />,
        color: '#ef4444',
        title: 'College Reality',
        desc: 'Unfiltered DNA scores for placement truth, ROI, and internship exposure.',
    },
];

export default function Home() {
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);

    const [currentWord, setCurrentWord] = useState(0);
    const words = ['Talent', 'Future', 'Path', 'Career'];
    useEffect(() => {
        const t = setInterval(() => setCurrentWord(p => (p + 1) % words.length), 2200);
        return () => clearInterval(t);
    }, []);

    return (
        <div style={{ background: 'var(--color-bg)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
            {/* NAV */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                padding: '0 48px', height: 64,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'rgba(13,15,20,0.8)', backdropFilter: 'blur(16px)',
                borderBottom: '1px solid var(--color-border)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <span style={{ color: 'white', fontWeight: 800, fontSize: '0.9rem' }}>H</span>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>HireMap</span>
                    <span style={{
                        fontSize: '0.6rem', fontWeight: 600, background: 'rgba(99,102,241,0.15)',
                        color: '#a5b4fc', padding: '2px 7px', borderRadius: 4, border: '1px solid rgba(99,102,241,0.3)'
                    }}>BETA</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Link to="/auth" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', padding: '8px 16px', textDecoration: 'none' }}>Log In</Link>
                    <Link to="/auth" style={{
                        fontSize: '0.875rem', fontWeight: 600, color: 'white', padding: '8px 18px',
                        background: 'var(--color-primary)', borderRadius: 8, textDecoration: 'none',
                        display: 'flex', alignItems: 'center', gap: 6
                    }}>
                        Get Started <ArrowRight size={14} />
                    </Link>
                    <Link to="/company" style={{
                        fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-text-secondary)',
                        padding: '8px 14px', border: '1px solid var(--color-border)', borderRadius: 8, textDecoration: 'none'
                    }}>
                        For Companies
                    </Link>
                </div>
            </nav>

            {/* HERO */}
            <section style={{
                minHeight: '100vh', paddingTop: 64,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden'
            }}>
                {/* Background radial */}
                <div style={{
                    position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
                    width: 600, height: 600, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <motion.div style={{ opacity: heroOpacity, y: heroY }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28,
                            background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
                            borderRadius: 999, padding: '6px 16px',
                            fontSize: '0.8rem', fontWeight: 600, color: '#a5b4fc'
                        }}
                    >
                        <Star size={12} fill="#a5b4fc" /> The Talent Intelligence Platform is here
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16, maxWidth: 780, margin: '0 auto 20px' }}
                    >
                        One Profile.
                        <span style={{ display: 'block' }}>
                            Your Entire{' '}
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={currentWord}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="gradient-text"
                                    style={{ display: 'inline-block' }}
                                >
                                    {words[currentWord]}
                                </motion.span>
                            </AnimatePresence>
                            .
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
                        style={{ fontSize: '1.15rem', color: 'var(--color-text-secondary)', maxWidth: 580, margin: '0 auto 40px', lineHeight: 1.7 }}
                    >
                        HireMap replaces LinkedIn, Naukri, GitHub portfolios and PDF resumes.
                        One intelligent platform connecting students, colleges and companies.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
                    >
                        <Link to="/onboarding" style={{
                            padding: '14px 32px', background: 'var(--color-primary)', color: 'white',
                            borderRadius: 10, fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
                            display: 'flex', alignItems: 'center', gap: 8,
                            boxShadow: '0 4px 24px rgba(99,102,241,0.35)'
                        }}>
                            Build My Profile Free <ArrowRight size={16} />
                        </Link>
                        <Link to="/dashboard" style={{
                            padding: '14px 28px', background: 'var(--color-surface)',
                            color: 'var(--color-text-primary)', borderRadius: 10, fontWeight: 600,
                            fontSize: '0.95rem', textDecoration: 'none', border: '1px solid var(--color-border)',
                            display: 'flex', alignItems: 'center', gap: 8
                        }}>
                            See Student Dashboard
                        </Link>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                        style={{ marginTop: 16, fontSize: '0.78rem', color: 'var(--color-text-muted)' }}
                    >
                        No credit card. No resume upload needed. Just connect your profiles.
                    </motion.p>
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                    animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
                    style={{ position: 'absolute', bottom: 32, color: 'var(--color-text-muted)' }}
                >
                    <ChevronDown size={20} />
                </motion.div>
            </section>

            {/* STATS COUNTER */}
            <section style={{ padding: '60px 48px', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
                    {COUNTER_TARGETS.map(({ label, value, suffix }) => (
                        <div key={label}>
                            <div style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, color: '#6366f1' }}>
                                <AnimatedCounter target={value} suffix={suffix} />
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 4, fontWeight: 500 }}>{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* PROBLEM → SOLUTION */}
            <section style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 70 }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: 16 }}>The old way is <span className="gradient-text">broken.</span></h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', maxWidth: 540, margin: '0 auto' }}>Students juggle 6 platforms. Recruiters waste hours. Colleges lose sight of outcomes.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: 0, alignItems: 'start', maxWidth: 900, margin: '0 auto' }}>
                    {/* Before */}
                    <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, padding: 28 }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ef4444', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Before HireMap</div>
                        {[
                            'Build separate profiles on LinkedIn, GitHub, Naukri',
                            'Upload different PDFs with different versions of your resume',
                            'Never know if you match a job before applying',
                            'Zero understanding of true college placement ROI',
                            'Prepare blindly with generic LeetCode grinds',
                        ].map(txt => (
                            <div key={txt} style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'flex-start' }}>
                                <span style={{ color: '#ef4444', fontSize: '1rem', lineHeight: 1 }}>✗</span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{txt}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, marginTop: 60 }}>
                        <ArrowRight size={28} style={{ color: '#6366f1' }} />
                    </div>
                    {/* After */}
                    <div style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 12, padding: 28 }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6366f1', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>With HireMap</div>
                        {[
                            'One profile auto-syncs GitHub, LeetCode, Codeforces stats',
                            'AI generates ATS-optimized resume, exports in PDF/DOCX',
                            'See exact skill match % before applying to any job',
                            'College DNA score shows real ROI and placement truth',
                            'Personalized week-by-week roadmap based on your skill gap',
                        ].map(txt => (
                            <div key={txt} style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'flex-start' }}>
                                <span style={{ color: '#10b981', fontSize: '1rem', lineHeight: 1 }}>✓</span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-primary)', lineHeight: 1.5 }}>{txt}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES GRID */}
            <section style={{ padding: '60px 24px 100px', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 60 }}>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: 12 }}>Everything in one intelligent system</h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>Replacing six fragmented tools with one coherent platform.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                        {FEATURES.map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.5 }}
                                whileHover={{ y: -4, borderColor: f.color + '60' }}
                                style={{
                                    background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
                                    borderRadius: 12, padding: '24px 22px', cursor: 'default',
                                    transition: 'border-color 0.2s, transform 0.2s'
                                }}
                            >
                                <div style={{
                                    width: 44, height: 44, borderRadius: 10, marginBottom: 16,
                                    background: f.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: f.color
                                }}>
                                    {f.icon}
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, color: 'var(--color-text-primary)' }}>{f.title}</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOR WHOM */}
            <section style={{ padding: '100px 24px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: 60 }}>Built for everyone in the talent loop</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                        {[
                            { icon: <Users size={28} />, color: '#6366f1', who: 'Students', pts: ['Auto-sync coding profiles', 'AI skill gap roadmaps', 'Smart job matching', 'ATS resume generator', 'One public talent profile'] },
                            { icon: <Building2 size={28} />, color: '#22d3ee', who: 'Companies', pts: ['Search verified talent', 'Filter by CGPA + skills', 'See live coding stats', 'AI-ranked candidate matching', 'Direct messaging'] },
                            { icon: <GraduationCap size={28} />, color: '#f59e0b', who: 'Colleges', pts: ['Upload & verify student data', 'College DNA analytics', 'Track placement outcomes', 'Invite recruiters directly', 'Placement dashboard'] },
                        ].map(({ icon, color, who, pts }) => (
                            <div key={who} style={{
                                background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                                borderRadius: 14, padding: '28px 24px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 12, background: color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</div>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{who}</span>
                                </div>
                                {pts.map(p => (
                                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                                        <span style={{ color, fontSize: '0.75rem' }}>●</span>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{p}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section style={{
                padding: '100px 24px', textAlign: 'center',
                background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)'
            }}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, marginBottom: 16 }}>
                        Stop guessing. <span className="gradient-text">Start mapping.</span>
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: 40 }}>Join 28,400+ students who replaced 6 platforms with one.</p>
                    <Link to="/onboarding" style={{
                        padding: '16px 40px', background: 'var(--color-primary)', color: 'white',
                        borderRadius: 10, fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        boxShadow: '0 8px 32px rgba(99,102,241,0.4)'
                    }}>
                        Build My Talent Profile <ArrowRight size={18} />
                    </Link>
                    <div style={{ marginTop: 20, fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        Connect GitHub → LeetCode → Done. Takes 2 minutes.
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: '1px solid var(--color-border)', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-text-secondary)' }}>HireMap © 2026</span>
                <div style={{ display: 'flex', gap: 24 }}>
                    {['Privacy', 'Terms', 'Contact'].map(l => (
                        <a key={l} href="#" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textDecoration: 'none' }}>{l}</a>
                    ))}
                </div>
            </footer>
        </div>
    );
}
