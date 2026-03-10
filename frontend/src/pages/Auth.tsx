import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';

export default function Auth() {
    const [mode, setMode] = useState<'login' | 'signup'>('login');

    return (
        <div style={{
            minHeight: '100vh', background: 'var(--color-bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
        }}>
            {/* Background glow */}
            <div style={{
                position: 'fixed', top: '30%', left: '50%', transform: 'translateX(-50%)',
                width: 500, height: 500, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: 420, width: '100%' }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 24 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white' }}>H</div>
                        <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-text-primary)' }}>HireMap</span>
                    </Link>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 8 }}>
                        {mode === 'login' ? 'Welcome back' : 'Create your profile'}
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                        {mode === 'login' ? 'Your talent graph awaits.' : 'Join 28,400+ students getting matched to better jobs.'}
                    </p>
                </div>

                <motion.div
                    className="card"
                    style={{ padding: '32px 36px' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Google OAuth button */}
                    <button style={{
                        width: '100%', padding: '12px', borderRadius: 9,
                        background: 'white', border: '1px solid #e2e8f0',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                        cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: '#1e293b',
                        marginBottom: 16, transition: 'box-shadow 0.2s'
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <button style={{
                        width: '100%', padding: '12px', borderRadius: 9,
                        background: '#1f2937', border: '1px solid #374151',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                        cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: 'white',
                        marginBottom: 20
                    }}>
                        <Github size={18} /> Continue with GitHub
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                        <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>or with email</span>
                        <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {mode === 'signup' && (
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 6 }}>Full Name</label>
                                <input placeholder="Srihari Beesetti" style={{ width: '100%', padding: '11px 14px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: '0.875rem', color: 'var(--color-text-primary)', outline: 'none', boxSizing: 'border-box' }} />
                            </div>
                        )}
                        <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 6 }}>Email</label>
                            <input type="email" placeholder="you@college.edu" style={{ width: '100%', padding: '11px 14px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: '0.875rem', color: 'var(--color-text-primary)', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 6 }}>Password</label>
                            <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '11px 14px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: '0.875rem', color: 'var(--color-text-primary)', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                    </div>

                    <Link to={mode === 'signup' ? '/onboarding' : '/dashboard'} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        marginTop: 20, padding: '12px', background: '#6366f1',
                        borderRadius: 9, color: 'white', fontWeight: 700, fontSize: '0.9rem',
                        textDecoration: 'none', boxShadow: '0 4px 16px rgba(99,102,241,0.3)'
                    }}>
                        {mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={16} />
                    </Link>
                </motion.div>

                <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                    <button onClick={() => setMode(m => m === 'login' ? 'signup' : 'login')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontWeight: 600, fontSize: 'inherit' }}>
                        {mode === 'login' ? 'Sign up free' : 'Sign in'}
                    </button>
                </p>
            </div>
        </div>
    );
}
