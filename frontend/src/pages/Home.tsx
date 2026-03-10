import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2, Zap, Users, Building2, GraduationCap, Globe, Star, TrendingUp, Shield, ChevronDown, Sparkles, FileText, Map, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../lib/auth';

const COUNTER_TARGETS = [
    { label: 'Students', value: 28400, suffix: '+', emoji: '🎓' },
    { label: 'Companies', value: 340, suffix: '+', emoji: '🏢' },
    { label: 'Job Matches', value: 92000, suffix: '+', emoji: '⚡' },
    { label: 'Colleges', value: 180, suffix: '+', emoji: '🏛️' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [started, setStarted] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);
    useEffect(() => {
        if (!started) return;
        let frame: number;
        const dur = 1800; const start = performance.now();
        const animate = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const e = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(e * target));
            if (p < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [started, target]);
    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const FEATURES = [
    { icon: <Code2 size={22} />, color: '#ff6b4a', title: 'Talent Graph', desc: 'Auto-maps your skills, projects and coding activity into a searchable intelligence graph.' },
    { icon: <Zap size={22} />, color: '#ffb84d', title: 'AI Job Matching', desc: 'Gets your skill match % for every job. Tells you exactly what to learn next.' },
    { icon: <FileText size={22} />, color: '#00e5c3', title: 'AI Resume Builder', desc: 'GPT-4-powered resume builder with 40+ ATS-friendly templates. Export PDF in seconds.' },
    { icon: <Globe size={22} />, color: '#4477ff', title: 'Cover Letter AI', desc: 'Generate a job-specific cover letter in seconds. No typing needed.' },
    { icon: <TrendingUp size={22} />, color: '#a855f7', title: 'Smart Roadmaps', desc: 'Role-specific week-by-week prep plans, adapted to your current skill gap.' },
    { icon: <Map size={22} />, color: '#ec4899', title: 'Career Map', desc: 'Visualize career paths, explore salary ranges, and find the fastest route to your dream role.' },
    { icon: <CheckCircle2 size={22} />, color: '#10b981', title: 'ATS Resume Checker', desc: 'Score your resume against real hiring criteria. Instant fixes and keyword recommendations.' },
    { icon: <Shield size={22} />, color: '#f97316', title: 'College DNA', desc: 'Unfiltered placement truth, ROI scores, and internship exposure for 180+ colleges.' },
];

const TOOLS = [
    { name: 'AI Resume Builder', desc: 'GPT-4 powered', color: '#ff6b4a' },
    { name: 'AI Cover Letter', desc: 'Job-specific drafts', color: '#ffb84d' },
    { name: '40+ Templates', desc: 'ATS-friendly', color: '#00e5c3' },
    { name: 'ATS Checker', desc: 'Beat the bots', color: '#4477ff' },
    { name: 'Career Map', desc: 'Visual path explorer', color: '#a855f7' },
    { name: 'AI Rewriter', desc: 'Upgrade any resume', color: '#ec4899' },
    { name: 'Job Matching', desc: 'Skill % score', color: '#10b981' },
    { name: 'Proofreading', desc: 'Impeccable grammar', color: '#f97316' },
];

export default function Home() {
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
    const { user } = useAuth();

    const [word, setWord] = useState(0);
    const words = ['Career', 'Future', 'Path', 'Story'];
    useEffect(() => {
        const t = setInterval(() => setWord(p => (p + 1) % words.length), 2200);
        return () => clearInterval(t);
    }, []);

    return (
        <div style={{ background: 'var(--color-bg)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)', overflowX: 'hidden' }}>
            {/* NAV */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                padding: '0 48px', height: 64,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'rgba(8,11,18,0.85)', backdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--color-border)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg, #ff6b4a, #ffb84d)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(255,107,74,0.35)' }}>
                        <Sparkles size={17} color="white" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '1.15rem', fontFamily: 'var(--font-display)' }}>HireMap</span>
                    <span style={{ fontSize: '0.58rem', fontWeight: 700, background: 'rgba(255,107,74,0.12)', color: '#ff9d87', padding: '2px 6px', borderRadius: 4, border: '1px solid rgba(255,107,74,0.25)' }}>BETA</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {user ? (
                        <Link to="/dashboard" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'white', padding: '8px 18px', background: 'var(--color-primary)', borderRadius: 9, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 16px rgba(255,107,74,0.3)' }}>
                            Go to Dashboard <ArrowRight size={14} />
                        </Link>
                    ) : (
                        <>
                            <Link to="/auth" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', padding: '8px 16px', textDecoration: 'none' }}>Log In</Link>
                            <Link to="/auth" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'white', padding: '8px 20px', background: 'var(--color-primary)', borderRadius: 9, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 16px rgba(255,107,74,0.3)' }}>
                                Get Started <ArrowRight size={14} />
                            </Link>
                        </>
                    )}
                    <Link to="/company" style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-text-secondary)', padding: '8px 14px', border: '1px solid var(--color-border)', borderRadius: 8, textDecoration: 'none' }}>
                        For Companies
                    </Link>
                </div>
            </nav>

            {/* HERO */}
            <section style={{ minHeight: '100vh', paddingTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}>
                {/* Animated orbs */}
                <div style={{ position: 'absolute', top: '15%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,74,0.1) 0%, transparent 70%)', pointerEvents: 'none', animation: 'float 8s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', bottom: '15%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,195,0.09) 0%, transparent 70%)', pointerEvents: 'none', animation: 'float 10s ease-in-out infinite reverse' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,184,77,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />

                <motion.div style={{ opacity: heroOpacity, y: heroY }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28, background: 'rgba(255,107,74,0.1)', border: '1px solid rgba(255,107,74,0.3)', borderRadius: 999, padding: '6px 18px', fontSize: '0.8rem', fontWeight: 600, color: '#ff9d87' }}>
                        <Star size={12} fill="#ff9d87" /> The AI Career Platform for Students
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                        style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: 20, maxWidth: 820, margin: '0 auto 20px', fontFamily: 'var(--font-display)' }}>
                        Build Your Best<br />
                        <span style={{ display: 'inline-block', position: 'relative' }}>
                            <AnimatePresence mode="wait">
                                <motion.span key={word} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="gradient-text" style={{ display: 'inline-block' }}>
                                    {words[word]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                        {' '}with AI
                    </motion.h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
                        style={{ fontSize: '1.15rem', color: 'var(--color-text-secondary)', maxWidth: 580, margin: '0 auto 40px', lineHeight: 1.75 }}>
                        AI resume builder, ATS checker, cover letter generator, career map — everything to land your dream job, in one platform.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/auth" style={{ padding: '15px 36px', background: 'var(--color-primary)', color: 'white', borderRadius: 12, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 6px 28px rgba(255,107,74,0.4)', transition: 'transform 0.2s' }}
                            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                            Build My Resume Free <ArrowRight size={16} />
                        </Link>
                        <Link to="/dashboard" style={{ padding: '15px 30px', background: 'var(--color-surface)', color: 'var(--color-text-primary)', borderRadius: 12, fontWeight: 600, fontSize: '1rem', textDecoration: 'none', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            See Dashboard
                        </Link>
                    </motion.div>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                        style={{ marginTop: 18, fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        Free forever · No credit card · Takes 2 minutes
                    </motion.p>
                </motion.div>

                <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: 'absolute', bottom: 32, color: 'var(--color-text-muted)' }}>
                    <ChevronDown size={20} />
                </motion.div>
            </section>

            {/* STATS */}
            <section style={{ padding: '60px 48px', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
                    {COUNTER_TARGETS.map(({ label, value, suffix, emoji }) => (
                        <div key={label}>
                            <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{emoji}</div>
                            <div style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                                <AnimatedCounter target={value} suffix={suffix} />
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 4, fontWeight: 500 }}>{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* TOOLS BELT */}
            <section style={{ padding: '80px 24px 60px', overflow: 'hidden' }}>
                <div style={{ textAlign: 'center', marginBottom: 50 }}>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: 12, fontFamily: 'var(--font-display)' }}>The only career toolbox you'll need</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>8 powerful tools. One subscription. Zero friction.</p>
                </div>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16 }}>
                    {TOOLS.map((tool, i) => (
                        <motion.div key={tool.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                            whileHover={{ y: -4 }}
                            style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 14, padding: '20px 20px', cursor: 'default', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = tool.color + '60'; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${tool.color}15`; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                            <div style={{ width: 10, height: 10, borderRadius: 3, background: tool.color, marginBottom: 14 }} />
                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 4, fontFamily: 'var(--font-display)' }}>{tool.name}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{tool.desc}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FEATURES */}
            <section style={{ padding: '60px 24px 100px', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 60 }}>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: 12, fontFamily: 'var(--font-display)' }}>Everything in one intelligent system</h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>Replacing six fragmented tools with one coherent platform.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
                        {FEATURES.map((f, i) => (
                            <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}
                                whileHover={{ y: -4 }}
                                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 14, padding: '24px 22px', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = f.color + '50'; (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${f.color}12`; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, marginBottom: 16, background: f.color + '1a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color }}>
                                    {f.icon}
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>{f.title}</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOR WHOM */}
            <section style={{ padding: '100px 24px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: 60, fontFamily: 'var(--font-display)' }}>Built for everyone in the talent loop</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                        {[
                            { icon: <Users size={26} />, color: '#ff6b4a', who: 'Students', pts: ['AI-powered resume in seconds', 'ATS score & instant fixes', 'Cover letter generator', 'Career path explorer', 'Smart job matching', 'Personalized roadmaps'] },
                            { icon: <Building2 size={26} />, color: '#00e5c3', who: 'Companies', pts: ['Search verified talent', 'Filter by CGPA + skills', 'See live coding stats', 'AI-ranked matching', 'Direct messaging', 'Campus hiring portal'] },
                            { icon: <GraduationCap size={26} />, color: '#ffb84d', who: 'Colleges', pts: ['Upload & verify student data', 'College DNA analytics', 'Track placement outcomes', 'Invite recruiters directly', 'Real-time dashboard', 'Brochure generator'] },
                        ].map(({ icon, color, who, pts }) => (
                            <div key={who} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: '28px 24px', transition: 'border-color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.borderColor = color + '50')}
                                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                    <div style={{ width: 50, height: 50, borderRadius: 13, background: color + '1a', display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</div>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>{who}</span>
                                </div>
                                {pts.map(p => (
                                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
                                        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{p}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BEFORE / AFTER */}
            <section style={{ padding: '80px 24px', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
                <div style={{ maxWidth: 920, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 60 }}>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: 12, fontFamily: 'var(--font-display)' }}>The old way is <span className="gradient-text">broken.</span></h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Students juggle 6 platforms. Recruiters waste hours. Colleges lose sight of outcomes.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', alignItems: 'start' }}>
                        <div style={{ background: 'rgba(255,77,106,0.06)', border: '1px solid rgba(255,77,106,0.2)', borderRadius: 14, padding: 28 }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-danger)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>❌ Before HireMap</div>
                            {['Build separate profiles on 6+ platforms', 'Upload different resume versions', 'Never know your job match %', 'Zero visibility on real college ROI', 'Prepare blindly, miss the target', 'Write cover letters from scratch'].map(txt => (
                                <div key={txt} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                                    <span style={{ color: 'var(--color-danger)', lineHeight: '1.4' }}>✗</span>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{txt}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
                            <ArrowRight size={28} style={{ color: 'var(--color-primary)' }} />
                        </div>
                        <div style={{ background: 'rgba(255,107,74,0.06)', border: '1px solid rgba(255,107,74,0.25)', borderRadius: 14, padding: 28 }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>✅ With HireMap</div>
                            {['One AI profile, auto-updated from GitHub & LC', 'AI generates ATS resume, exports to PDF', 'See exact skill match before applying', 'College DNA shows real ROI truth', 'Personalized roadmap for your skill gap', 'AI cover letter ready in 10 seconds'].map(txt => (
                                <div key={txt} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                                    <span style={{ color: 'var(--color-success)', lineHeight: '1.4' }}>✓</span>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-primary)', lineHeight: 1.5 }}>{txt}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, marginBottom: 48, fontFamily: 'var(--font-display)' }}>Frequently asked questions</h2>
                    {[
                        { q: 'Is HireMap free?', a: 'Yes! The core features — resume building, ATS checking, and job matching — are completely free. Premium AI features are available with a Pro plan.' },
                        { q: 'Does it work for freshers?', a: 'Absolutely. HireMap is built specifically for students and fresh graduates. We help you showcase projects, coding profiles, and skills even without work experience.' },
                        { q: 'How does the AI resume builder work?', a: 'You provide your job title. Our GPT-4-powered AI generates a professional resume draft in seconds from your profile data. You can edit, choose a template, and export as PDF.' },
                        { q: 'Is my data safe?', a: 'Your data is stored securely and never shared without consent. We use end-to-end encryption for all sensitive profile information.' },
                    ].map(({ q, a }) => (
                        <details key={q} style={{ marginBottom: 12, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden' }}>
                            <summary style={{ padding: '18px 20px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {q}
                                <ChevronDown size={16} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                            </summary>
                            <div style={{ padding: '0 20px 18px', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{a}</div>
                        </details>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '100px 24px', textAlign: 'center', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(255,107,74,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, marginBottom: 16, fontFamily: 'var(--font-display)' }}>
                        Stop guessing. <span className="gradient-text">Start mapping.</span>
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: 40 }}>Join 28,400+ students who replaced 6 platforms with one.</p>
                    <Link to="/auth" style={{ padding: '16px 44px', background: 'var(--color-primary)', color: 'white', borderRadius: 12, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 36px rgba(255,107,74,0.4)' }}>
                        Build Your Free Resume <ArrowRight size={18} />
                    </Link>
                    <div style={{ marginTop: 20, fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Connect GitHub → LeetCode → Done. Takes 2 minutes.</div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: '1px solid var(--color-border)', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, #ff6b4a, #ffb84d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Sparkles size={14} color="white" />
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-display)' }}>HireMap © 2026</span>
                </div>
                <div style={{ display: 'flex', gap: 24 }}>
                    {['Privacy', 'Terms', 'Contact', 'Blog', 'Careers'].map(l => (
                        <a key={l} href="#" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}>
                            {l}
                        </a>
                    ))}
                </div>
            </footer>
        </div>
    );
}
