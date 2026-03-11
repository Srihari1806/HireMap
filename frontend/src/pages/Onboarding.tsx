import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronRight, Sparkles, User, Code2, Star, Briefcase, Rocket } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { saveProfile, calcReadiness, type UserProfile } from '../lib/profileStore';
import { useToast } from '../lib/toast';

const ALL_SKILLS = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'C++', 'C', 'Rust', 'Kotlin',
    'React', 'Vue', 'Angular', 'Next.js', 'Node.js', 'Express', 'FastAPI', 'Django', 'Spring Boot',
    'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase',
    'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Linux', 'Git', 'CI/CD',
    'System Design', 'DSA', 'Machine Learning', 'Deep Learning', 'SQL', 'REST APIs', 'GraphQL',
];

const JOB_FOCUS_OPTIONS = ['Full Time', 'Internship', 'Full Time + Internship', 'Part Time', 'Freelance'];

interface FormData {
    name: string; college: string; branch: string; cgpa: string;
    graduationYear: string; location: string; bio: string;
    github: string; leetcode: string; codeforces: string; hackerrank: string;
    targetRole: string; preferredLocation: string; jobFocus: string; weeklyHours: string;
}

const STEP_META = [
    { title: 'Basic Info', icon: User, desc: 'Tell us about yourself so we can set up your talent profile.' },
    { title: 'Coding Profiles', icon: Code2, desc: "Link your coding platforms — we'll auto-sync your stats." },
    { title: 'Your Skills', icon: Star, desc: 'Pick all the skills you\'re comfortable with. Be honest!' },
    { title: 'Career Intent', icon: Briefcase, desc: 'Help us understand what kind of opportunities you\'re looking for.' },
    { title: 'All Set! 🚀', icon: Rocket, desc: 'Your talent graph is being built. Welcome to HireMap!' },
];

const InputField = ({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }) => (
    <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>{label}</label>
        <input
            type={type} value={value} onChange={e => onChange(e.target.value)}
            placeholder={placeholder} className="input"
        />
    </div>
);

export default function Onboarding() {
    const [step, setStep] = useState(0);
    const [skills, setSkills] = useState<Set<string>>(new Set());
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState<FormData>({
        name: '', college: '', branch: '', cgpa: '', graduationYear: '', location: '', bio: '',
        github: '', leetcode: '', codeforces: '', hackerrank: '',
        targetRole: '', preferredLocation: '', jobFocus: 'Full Time + Internship', weeklyHours: '15',
    });
    const { user } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const set = (k: keyof FormData, v: string) => setForm(p => ({ ...p, [k]: v }));
    const toggleSkill = (s: string) => setSkills(prev => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n; });

    const pct = Math.round((step / (STEP_META.length - 1)) * 100);

    const handleFinish = async () => {
        if (!user) { toast('Not logged in!', 'error'); return; }
        setSaving(true);
        await new Promise(r => setTimeout(r, 900)); // simulate sync

        const profileData: Partial<UserProfile> = {
            name: form.name || user.name,
            username: (form.name || user.name).toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 100),
            college: form.college,
            branch: form.branch,
            cgpa: form.cgpa,
            graduationYear: form.graduationYear,
            location: form.location,
            bio: form.bio,
            github: form.github,
            leetcode: form.leetcode,
            codeforces: form.codeforces,
            hackerrank: form.hackerrank,
            skills: Array.from(skills),
            targetRole: form.targetRole,
            preferredLocation: form.preferredLocation,
            jobFocus: form.jobFocus,
            weeklyHours: form.weeklyHours,
            openToRelocate: true,
            projects: [],
            streak: 0,
            badges: form.github ? ['GitHub Connected'] : [],
            leetcodeSolved: form.leetcode ? Math.floor(Math.random() * 50) + 10 : 0,
            contestRating: form.leetcode ? Math.floor(Math.random() * 300) + 1200 : 0,
            githubCommits: form.github ? Math.floor(Math.random() * 200) + 50 : 0,
            publicRepos: form.github ? Math.floor(Math.random() * 12) + 2 : 0,
            onboardingComplete: true,
            createdAt: new Date().toISOString(),
        };

        profileData.readinessScore = calcReadiness(profileData as UserProfile);
        await saveProfile(user.id, profileData);
        setSaving(false);
        toast(`Profile created! Readiness: ${profileData.readinessScore}% 🎉`, 'success');
        navigate('/dashboard');
    };

    const handleContinue = () => {
        if (step === STEP_META.length - 1) { handleFinish(); return; }
        // Basic validation
        if (step === 0 && !form.name.trim()) { toast('Please enter your name.', 'error'); return; }
        setStep(p => p + 1);
    };



    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', overflow: 'hidden', fontFamily: 'var(--font-sans)' }}>
            {/* Background orbs */}
            <div style={{ position: 'absolute', top: '10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,74,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,195,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: 600, width: '100%', position: 'relative', zIndex: 1 }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40, justifyContent: 'center' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #ff6b4a, #ffb84d)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(255,107,74,0.3)' }}>
                        <Sparkles size={18} color="white" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '1.15rem', fontFamily: 'var(--font-display)' }}>HireMap</span>
                </div>

                {/* Step indicator */}
                <div style={{ display: 'flex', gap: 0, marginBottom: 36, position: 'relative', alignItems: 'flex-start' }}>
                    <div style={{ position: 'absolute', top: 13, left: '10%', right: '10%', height: 2, background: 'var(--color-surface-3)' }} />
                    <motion.div style={{ position: 'absolute', top: 13, left: '10%', height: 2, background: 'linear-gradient(90deg, #ff6b4a, #ffb84d)', transition: 'width 0.5s ease', width: `${Math.min(80, pct * 0.8)}%` }} />
                    {STEP_META.map((s, i) => (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: '50%', zIndex: 1,
                                background: i <= step ? 'var(--color-primary)' : 'var(--color-surface-2)',
                                border: `2px solid ${i <= step ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.75rem', fontWeight: 700, color: 'white',
                                transition: 'all 0.3s', boxShadow: i === step ? '0 0 12px rgba(255,107,74,0.4)' : 'none'
                            }}>
                                {i < step ? <CheckCircle2 size={14} /> : i + 1}
                            </div>
                            <span style={{ fontSize: '0.6rem', color: i <= step ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: i === step ? 700 : 400, textAlign: 'center', lineHeight: 1.2 }}>
                                {s.title}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.28 }}
                        className="card"
                        style={{ padding: '32px 36px', borderColor: 'var(--color-border-light)' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>{STEP_META[step].title}</h2>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: 28 }}>{STEP_META[step].desc}</p>

                        {/* Step 0 — Basic Info */}
                        {step === 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <InputField label="Full Name *" value={form.name} onChange={v => set('name', v)} placeholder="e.g. Arjun Sharma" />
                                <InputField label="College / University" value={form.college} onChange={v => set('college', v)} placeholder="e.g. KIIT University, Bhubaneswar" />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <InputField label="Degree & Branch" value={form.branch} onChange={v => set('branch', v)} placeholder="e.g. B.Tech CSE" />
                                    <InputField label="CGPA" value={form.cgpa} onChange={v => set('cgpa', v)} placeholder="e.g. 8.4" type="number" />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <InputField label="Graduation Year" value={form.graduationYear} onChange={v => set('graduationYear', v)} placeholder="e.g. 2027" />
                                    <InputField label="Location" value={form.location} onChange={v => set('location', v)} placeholder="e.g. Bangalore" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Short Bio</label>
                                    <textarea
                                        value={form.bio} onChange={e => set('bio', e.target.value)}
                                        placeholder="e.g. Final year CSE student building scalable systems. Open to backend roles."
                                        className="input" rows={3} style={{ resize: 'vertical', lineHeight: 1.6 }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 1 — Coding Profiles */}
                        {step === 1 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                {[
                                    { label: 'GitHub Username', field: 'github' as keyof FormData, placeholder: 'e.g. Srihari1806', hint: 'github.com/' },
                                    { label: 'LeetCode Username', field: 'leetcode' as keyof FormData, placeholder: 'e.g. srihari1806', hint: 'leetcode.com/u/' },
                                    { label: 'Codeforces Handle', field: 'codeforces' as keyof FormData, placeholder: 'Optional', hint: 'codeforces.com/profile/' },
                                    { label: 'HackerRank Username', field: 'hackerrank' as keyof FormData, placeholder: 'Optional', hint: 'hackerrank.com/profile/' },
                                ].map(({ label, field, placeholder, hint }) => (
                                    <div key={field}>
                                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>{label}</label>
                                        <div style={{ position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', color: 'var(--color-text-muted)', pointerEvents: 'none', fontFamily: 'var(--font-mono)' }}>{hint}</span>
                                            <input
                                                value={form[field]} onChange={e => set(field, e.target.value)}
                                                placeholder={placeholder} className="input"
                                                style={{ paddingLeft: `${hint.length * 7 + 14}px` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div style={{ padding: '12px 16px', background: 'rgba(0,229,195,0.06)', border: '1px solid rgba(0,229,195,0.2)', borderRadius: 10, fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                                    💡 We'll simulate syncing your stats. In production this connects to real APIs.
                                </div>
                            </div>
                        )}

                        {/* Step 2 — Skills */}
                        {step === 2 && (
                            <div>
                                <div style={{ marginBottom: 12, fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                                    {skills.size} selected · click to toggle
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxHeight: 320, overflowY: 'auto' }}>
                                    {ALL_SKILLS.map(skill => (
                                        <button key={skill} onClick={() => toggleSkill(skill)} style={{
                                            padding: '7px 16px', borderRadius: 20, border: '1.5px solid',
                                            cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', transition: 'all 0.15s',
                                            borderColor: skills.has(skill) ? 'var(--color-primary)' : 'var(--color-border)',
                                            background: skills.has(skill) ? 'rgba(255,107,74,0.12)' : 'var(--color-surface-2)',
                                            color: skills.has(skill) ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                            fontFamily: 'var(--font-sans)',
                                        }}>
                                            {skills.has(skill) ? '✓ ' : ''}{skill}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 3 — Career Intent */}
                        {step === 3 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <InputField label="Target Role(s)" value={form.targetRole} onChange={v => set('targetRole', v)} placeholder="e.g. Backend SDE, Data Analyst" />
                                <InputField label="Preferred Location(s)" value={form.preferredLocation} onChange={v => set('preferredLocation', v)} placeholder="e.g. Bangalore, Remote, Mumbai" />
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Job Focus</label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                        {JOB_FOCUS_OPTIONS.map(opt => (
                                            <button key={opt} onClick={() => set('jobFocus', opt)} style={{
                                                padding: '7px 16px', borderRadius: 20, border: '1.5px solid',
                                                cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', transition: 'all 0.15s',
                                                borderColor: form.jobFocus === opt ? 'var(--color-primary)' : 'var(--color-border)',
                                                background: form.jobFocus === opt ? 'rgba(255,107,74,0.12)' : 'var(--color-surface-2)',
                                                color: form.jobFocus === opt ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                                fontFamily: 'var(--font-sans)',
                                            }}>
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Weekly Availability (hours)</label>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        {['5', '10', '15', '20', '30', '40+'].map(h => (
                                            <button key={h} onClick={() => set('weeklyHours', h)} style={{
                                                padding: '7px 14px', borderRadius: 8, border: '1.5px solid',
                                                cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', transition: 'all 0.15s',
                                                borderColor: form.weeklyHours === h ? 'var(--color-primary)' : 'var(--color-border)',
                                                background: form.weeklyHours === h ? 'rgba(255,107,74,0.12)' : 'var(--color-surface-2)',
                                                color: form.weeklyHours === h ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                                fontFamily: 'var(--font-sans)',
                                            }}>
                                                {h}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4 — Final */}
                        {step === 4 && (
                            <div style={{ textAlign: 'center', padding: '12px 0' }}>
                                <div style={{ fontSize: '4rem', marginBottom: 16 }}>🚀</div>
                                <div style={{ marginBottom: 20 }}>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 8 }}>
                                        Welcome, {form.name || user?.name || 'there'}!
                                    </div>
                                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '0.875rem' }}>
                                        Your talent graph is ready. We've set up your profile and calculated your readiness score.
                                    </p>
                                </div>
                                {/* Summary pills */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
                                    {[
                                        form.college && `🏛️ ${form.college.split(',')[0]}`,
                                        form.branch && `📚 ${form.branch}`,
                                        skills.size > 0 && `⚡ ${skills.size} skills added`,
                                        form.github && `🐙 GitHub connected`,
                                        form.leetcode && `💻 LeetCode connected`,
                                    ].filter(Boolean).map(item => (
                                        <span key={item as string} style={{ fontSize: '0.78rem', padding: '4px 12px', background: 'rgba(0,229,195,0.08)', border: '1px solid rgba(0,229,195,0.2)', borderRadius: 999, color: 'var(--color-accent)', fontWeight: 600 }}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'rgba(255,107,74,0.1)', border: '1px solid rgba(255,107,74,0.3)', borderRadius: 10, fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                                    <CheckCircle2 size={16} /> Your profile is being built!
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
                    {step > 0 ? (
                        <button onClick={() => setStep(p => p - 1)} className="btn-secondary" style={{ padding: '10px 22px' }}>
                            ← Back
                        </button>
                    ) : <div />}

                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {step < STEP_META.length - 1 && step > 0 && (
                            <button onClick={() => setStep(p => p + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)' }}>
                                Skip for now
                            </button>
                        )}
                        <button onClick={handleContinue} disabled={saving} className="btn-primary" style={{ padding: '11px 26px' }}>
                            {saving ? (
                                <><span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span> Saving...</>
                            ) : step === STEP_META.length - 1 ? (
                                <>Launch Dashboard <ArrowRight size={15} /></>
                            ) : (
                                <>Continue <ChevronRight size={14} /></>
                            )}
                        </button>
                    </div>
                </div>

                <p style={{ textAlign: 'center', marginTop: 16, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Step {step + 1} of {STEP_META.length} · All fields except name are optional
                </p>
            </div>

            <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
        </div>
    );
}
