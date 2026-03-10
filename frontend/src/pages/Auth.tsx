import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Eye, EyeOff, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { useToast } from '../lib/toast';

export default function Auth() {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);
    const { login, signup, loginWithGoogle, loginWithGithub } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const result = mode === 'login'
            ? await login(email, password)
            : await signup(name, email, password);
        setLoading(false);
        if (result.success) {
            toast(mode === 'login' ? 'Welcome back! 🎉' : 'Account created! Let\'s build your profile.', 'success');
            navigate(mode === 'signup' ? '/onboarding' : '/dashboard');
        } else {
            toast(result.error || 'Something went wrong.', 'error');
        }
    };

    const handleGoogle = async () => {
        setOauthLoading('google');
        const result = await loginWithGoogle();
        setOauthLoading(null);
        if (result.success) {
            toast('Signed in with Google! 🎉', 'success');
            navigate(result.isNewUser ? '/onboarding' : '/dashboard');
        } else {
            toast('Google sign-in failed.', 'error');
        }
    };

    const handleGithub = async () => {
        setOauthLoading('github');
        const result = await loginWithGithub();
        setOauthLoading(null);
        if (result.success) {
            toast('Signed in with GitHub! 🎉', 'success');
            navigate(result.isNewUser ? '/onboarding' : '/dashboard');
        } else {
            toast('GitHub sign-in failed.', 'error');
        }
    };

    const switchMode = () => {
        setMode(m => m === 'login' ? 'signup' : 'login');
        setName(''); setEmail(''); setPassword('');
    };

    return (
        <div style={{
            minHeight: '100vh', background: 'var(--color-bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24, position: 'relative', overflow: 'hidden',
            fontFamily: 'var(--font-sans)'
        }}>
            {/* Animated background orbs */}
            <div className="orbital-bg" style={{ width: 500, height: 500, background: 'rgba(255,107,74,0.06)', top: '10%', left: '-10%' }} />
            <div className="orbital-bg" style={{ width: 400, height: 400, background: 'rgba(0,229,195,0.05)', bottom: '5%', right: '-5%' }} />
            <div className="orbital-bg" style={{ width: 300, height: 300, background: 'rgba(255,184,77,0.04)', top: '60%', left: '40%' }} />

            <div style={{ maxWidth: 460, width: '100%', position: 'relative', zIndex: 1 }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 28 }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: 12,
                            background: 'linear-gradient(135deg, #ff6b4a, #ffb84d)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 20px rgba(255,107,74,0.35)'
                        }}>
                            <Sparkles size={20} color="white" />
                        </div>
                        <span style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>HireMap</span>
                    </Link>
                    <AnimatePresence mode="wait">
                        <motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 8, fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                                {mode === 'login' ? 'Welcome back 👋' : 'Join the network'}
                            </h1>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                {mode === 'login' ? 'Your talent dashboard awaits.' : 'Join 28,400+ students landing better jobs.'}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <motion.div
                    className="card"
                    style={{ padding: '32px 36px', borderColor: 'var(--color-border-light)' }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {/* OAuth buttons */}
                    <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                        <button onClick={handleGoogle} disabled={!!oauthLoading || loading} style={{
                            flex: 1, padding: '11px', borderRadius: 10,
                            background: 'rgba(255,255,255,0.04)', border: '1.5px solid var(--color-border-light)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            cursor: oauthLoading ? 'not-allowed' : 'pointer', fontSize: '0.85rem', fontWeight: 600,
                            color: 'var(--color-text-primary)', transition: 'background 0.2s, border-color 0.2s',
                        }}
                            onMouseEnter={e => { if (!oauthLoading) (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-light)'; }}
                        >
                            {oauthLoading === 'google' ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : (
                                <svg width="16" height="16" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            )}
                            Google
                        </button>
                        <button onClick={handleGithub} disabled={!!oauthLoading || loading} style={{
                            flex: 1, padding: '11px', borderRadius: 10,
                            background: 'rgba(255,255,255,0.04)', border: '1.5px solid var(--color-border-light)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            cursor: oauthLoading ? 'not-allowed' : 'pointer', fontSize: '0.85rem', fontWeight: 600,
                            color: 'var(--color-text-primary)', transition: 'background 0.2s, border-color 0.2s',
                        }}
                            onMouseEnter={e => { if (!oauthLoading) (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-light)'; }}
                        >
                            {oauthLoading === 'github' ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Github size={16} />}
                            GitHub
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                        <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>or with email</span>
                        <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <AnimatePresence>
                            {mode === 'signup' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Full Name</label>
                                    <input
                                        value={name} onChange={e => setName(e.target.value)}
                                        placeholder="Your full name"
                                        className="input" required={mode === 'signup'}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Email Address</label>
                            <input
                                type="email" value={email} onChange={e => setEmail(e.target.value)}
                                placeholder="you@college.edu"
                                className="input" required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPass ? 'text' : 'password'} value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••" className="input" required
                                    style={{ paddingRight: 42 }}
                                />
                                <button type="button" onClick={() => setShowPass(p => !p)} style={{
                                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 0
                                }}>
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading || !!oauthLoading} style={{
                            marginTop: 4, padding: '13px', background: loading ? 'var(--color-surface-3)' : 'var(--color-primary)',
                            border: 'none', borderRadius: 10, color: 'white', fontWeight: 700, fontSize: '0.9rem',
                            cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', gap: 8, transition: 'background 0.2s, box-shadow 0.2s',
                            fontFamily: 'var(--font-sans)',
                            boxShadow: loading ? 'none' : '0 4px 20px rgba(255,107,74,0.3)'
                        }}>
                            {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : null}
                            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Free Account'}
                            {!loading && <ArrowRight size={16} />}
                        </button>
                    </form>

                    {mode === 'signup' && (
                        <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(0,229,195,0.06)', border: '1px solid rgba(0,229,195,0.2)', borderRadius: 10 }}>
                            {['Free forever plan', 'No credit card required', 'Connect GitHub & LeetCode'].map(item => (
                                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                                    <CheckCircle2 size={12} color="var(--color-accent)" /> {item}
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                    <button onClick={switchMode} style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'var(--color-primary)', fontWeight: 700, fontSize: 'inherit', fontFamily: 'var(--font-sans)'
                    }}>
                        {mode === 'login' ? 'Sign up free →' : 'Sign in'}
                    </button>
                </p>
            </div>

            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
