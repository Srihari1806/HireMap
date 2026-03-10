import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Briefcase, GraduationCap, Map, Target,
    User, MessageSquare, FileText, Search, Bell, LogOut, Compass, Sparkles
} from 'lucide-react';
import { useAuth } from '../lib/auth';
import { useToast } from '../lib/toast';
import { getProfile, DEMO_PROFILE } from '../lib/profileStore';
import { useEffect, useState } from 'react';
import type { UserProfile } from '../lib/profileStore';

const NAV = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Jobs', path: '/jobs', icon: Briefcase },
    { label: 'Colleges', path: '/colleges', icon: GraduationCap },
    { label: 'Career Map', path: '/career-map', icon: Compass },
    { label: 'Roadmaps', path: '/jobs/job_001/roadmap', icon: Map },
    { label: 'Progress', path: '/progress', icon: Target },
    { label: 'Community', path: '/community', icon: MessageSquare },
    { label: 'Resume Studio', path: '/resume', icon: FileText },
    { label: 'Profile', path: '/profile', icon: User },
];

export default function DashboardLayout() {
    const loc = useLocation();
    const { user, logout } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserProfile>(DEMO_PROFILE);

    useEffect(() => {
        if (user) {
            const p = getProfile(user.id);
            setProfile(p.onboardingComplete ? p : DEMO_PROFILE);
        }
    }, [user]);

    const displayName = profile.name || user?.name || 'Student';
    const initials = displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();

    const handleLogout = () => {
        logout();
        toast('Signed out successfully.', 'info');
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
            {/* SIDEBAR */}
            <aside style={{
                width: 248, flexShrink: 0, background: 'var(--color-surface)',
                borderRight: '1px solid var(--color-border)',
                display: 'flex', flexDirection: 'column',
                position: 'fixed', height: '100vh', overflowY: 'auto',
                zIndex: 40
            }}>
                {/* Logo */}
                <div style={{ padding: '20px 18px 14px', borderBottom: '1px solid var(--color-border)' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                        <div style={{
                            width: 34, height: 34, borderRadius: 9,
                            background: 'linear-gradient(135deg, #ff6b4a, #ffb84d)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 14px rgba(255,107,74,0.3)'
                        }}>
                            <Sparkles size={17} color="white" />
                        </div>
                        <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>HireMap</span>
                        <span style={{
                            fontSize: '0.58rem', fontWeight: 700, background: 'rgba(255,107,74,0.12)',
                            color: '#ff9d87', padding: '2px 6px', borderRadius: 4, border: '1px solid rgba(255,107,74,0.25)'
                        }}>BETA</span>
                    </Link>
                </div>

                {/* Student mini card */}
                <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                            width: 38, height: 38, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ff6b4a, #00e5c3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.875rem', fontWeight: 800, color: 'white', flexShrink: 0,
                            boxShadow: '0 2px 10px rgba(255,107,74,0.25)'
                        }}>
                            {initials}
                        </div>
                        <div style={{ overflow: 'hidden', flex: 1 }}>
                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {displayName}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                                {profile.branch ? `${profile.branch} · ${profile.college?.split(',')[0] || ''}` : user?.email || ''}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Readiness score bar */}
                <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Readiness Score</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>{profile.readinessScore}%</span>
                    </div>
                    <div style={{ height: 6, background: 'var(--color-surface-3)', borderRadius: 3, overflow: 'hidden' }}>
                        <motion.div
                            key={profile.readinessScore}
                            initial={{ width: 0 }}
                            animate={{ width: `${profile.readinessScore}%` }}
                            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                            style={{ height: '100%', background: 'linear-gradient(90deg, #ff6b4a, #ffb84d)', borderRadius: 3 }}
                        />
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
                        {profile.targetRole ? `${profile.targetRole} · ` : ''}{profile.skills.length} skills · {profile.projects.length} projects
                    </div>
                </div>

                {/* Navigation */}
                <nav style={{ padding: '10px 10px', flex: 1 }}>
                    {NAV.map(({ label, path, icon: Icon }) => {
                        const active = loc.pathname === path ||
                            (path !== '/dashboard' && path !== '/jobs/job_001/roadmap' &&
                                loc.pathname.startsWith(path.split('/').slice(0, 2).join('/')));
                        return (
                            <div key={path} style={{ position: 'relative' }}>
                                {active && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        style={{
                                            position: 'absolute', inset: 0, borderRadius: 10,
                                            background: 'rgba(255,107,74,0.10)',
                                            border: '1px solid rgba(255,107,74,0.22)',
                                        }}
                                        transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                                    />
                                )}
                                <Link
                                    to={path}
                                    className="nav-item"
                                    style={{ color: active ? '#ffd4c9' : undefined, position: 'relative', zIndex: 1 }}
                                >
                                    <Icon size={15} style={{ color: active ? 'var(--color-primary)' : undefined }} />
                                    {label}
                                </Link>
                            </div>
                        );
                    })}
                </nav>

                {/* Footer streak + logout */}
                <div style={{ padding: '12px 18px', borderTop: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: '1.2rem' }}>🔥</span>
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{profile.streak} Day Streak</div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>Keep it going!</div>
                        </div>
                    </div>
                    <button onClick={handleLogout} style={{
                        width: '100%', padding: '8px 12px', borderRadius: 8, background: 'transparent',
                        border: '1px solid var(--color-border)', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-muted)',
                        fontSize: '0.8rem', fontWeight: 500, transition: 'all 0.15s', fontFamily: 'var(--font-sans)'
                    }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-danger)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-danger)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)'; }}
                    >
                        <LogOut size={14} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* MAIN */}
            <div style={{ flex: 1, marginLeft: 248, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {/* Top bar */}
                <header style={{
                    position: 'sticky', top: 0, zIndex: 30,
                    background: 'rgba(8,11,18,0.88)', backdropFilter: 'blur(16px)',
                    borderBottom: '1px solid var(--color-border)',
                    padding: '0 28px', height: 60,
                    display: 'flex', alignItems: 'center', gap: 16,
                }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: 380 }}>
                        <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                        <input
                            placeholder="Search companies, roles, skills..."
                            className="input"
                            style={{ paddingLeft: 36, height: 36, fontSize: '0.8rem', borderRadius: 8 }}
                        />
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <button style={{
                            width: 36, height: 36, borderRadius: 8,
                            background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'var(--color-text-secondary)', position: 'relative'
                        }}>
                            <Bell size={16} />
                            <div style={{ position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: '50%', background: 'var(--color-primary)', border: '1.5px solid var(--color-bg)' }} />
                        </button>
                        <div style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ff6b4a, #00e5c3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.78rem', fontWeight: 800, color: 'white', cursor: 'pointer',
                            boxShadow: '0 2px 10px rgba(255,107,74,0.3)'
                        }}>
                            {initials}
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={loc.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.22 }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
