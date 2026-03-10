import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Briefcase, GraduationCap, Map, Target,
    User, MessageSquare, FileText, Search, Bell, ChevronDown, Map as MapIcon
} from 'lucide-react';
import { MOCK_STUDENT } from '../lib/mockData';

const NAV = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Jobs', path: '/jobs', icon: Briefcase },
    { label: 'Colleges', path: '/colleges', icon: GraduationCap },
    { label: 'Roadmaps', path: '/jobs/job_001/roadmap', icon: Map },
    { label: 'Progress', path: '/progress', icon: Target },
    { label: 'Community', path: '/community', icon: MessageSquare },
    { label: 'Resume', path: '/resume', icon: FileText },
    { label: 'Profile', path: '/profile', icon: User },
];

export default function DashboardLayout() {
    const loc = useLocation();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
            {/* SIDEBAR */}
            <aside style={{
                width: 240, flexShrink: 0, background: 'var(--color-surface)',
                borderRight: '1px solid var(--color-border)',
                display: 'flex', flexDirection: 'column', gap: 0,
                position: 'fixed', height: '100vh', overflowY: 'auto',
                zIndex: 40
            }}>
                {/* Logo */}
                <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid var(--color-border)' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                        <div style={{
                            width: 32, height: 32, borderRadius: 8,
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <MapIcon size={18} color="white" />
                        </div>
                        <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>HireMap</span>
                    </Link>
                </div>

                {/* Student mini card */}
                <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.875rem', fontWeight: 700, color: 'white', flexShrink: 0
                        }}>
                            {MOCK_STUDENT.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {MOCK_STUDENT.name}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                                {MOCK_STUDENT.branch} · {MOCK_STUDENT.college.split(',')[0]}
                            </div>
                        </div>
                        <ChevronDown size={14} style={{ color: 'var(--color-text-muted)', marginLeft: 'auto', flexShrink: 0 }} />
                    </div>
                </div>

                {/* Readiness score bar */}
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Readiness Score</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366f1' }}>{MOCK_STUDENT.readinessScore}%</span>
                    </div>
                    <div style={{ height: 6, background: 'var(--color-surface-3)', borderRadius: 3, overflow: 'hidden' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${MOCK_STUDENT.readinessScore}%` }}
                            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                            style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #22d3ee)', borderRadius: 3 }}
                        />
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
                        Ready for Backend roles · Top 22%
                    </div>
                </div>

                {/* Navigation */}
                <nav style={{ padding: '10px 10px', flex: 1 }}>
                    {NAV.map(({ label, path, icon: Icon }) => {
                        const active = loc.pathname === path || (path !== '/dashboard' && loc.pathname.startsWith(path.split('/').slice(0, 2).join('/')));
                        return (
                            <div key={path} style={{ position: 'relative' }}>
                                {active && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        style={{
                                            position: 'absolute', inset: 0, borderRadius: 8,
                                            background: 'rgba(99,102,241,0.12)',
                                            border: '1px solid rgba(99,102,241,0.25)',
                                        }}
                                        transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                                    />
                                )}
                                <Link
                                    to={path}
                                    className="nav-item"
                                    style={{
                                        color: active ? '#a5b4fc' : undefined,
                                        position: 'relative', zIndex: 1
                                    }}
                                >
                                    <Icon size={16} style={{ color: active ? '#6366f1' : undefined }} />
                                    {label}
                                </Link>
                            </div>
                        );
                    })}
                </nav>

                {/* Footer streak */}
                <div style={{ padding: '12px 16px', borderTop: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: '1.2rem' }}>🔥</span>
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{MOCK_STUDENT.streak} Day Streak</div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>Keep it going!</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN */}
            <div style={{ flex: 1, marginLeft: 240, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {/* Top bar */}
                <header style={{
                    position: 'sticky', top: 0, zIndex: 30,
                    background: 'rgba(13,15,20,0.85)', backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid var(--color-border)',
                    padding: '0 28px', height: 60,
                    display: 'flex', alignItems: 'center', gap: 16,
                }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: 400 }}>
                        <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                        <input
                            placeholder="Search companies, roles, skills..."
                            style={{
                                width: '100%', paddingLeft: 36, paddingRight: 16, height: 36,
                                background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
                                borderRadius: 8, fontSize: '0.8rem', color: 'var(--color-text-primary)',
                                outline: 'none',
                            }}
                        />
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <button style={{
                            width: 36, height: 36, borderRadius: 8,
                            background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'var(--color-text-secondary)'
                        }}>
                            <Bell size={16} />
                        </button>
                        <div style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.8rem', fontWeight: 700, color: 'white', cursor: 'pointer'
                        }}>
                            SB
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
                            transition={{ duration: 0.25 }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
