import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Share2, ExternalLink, Plus, X, Save, CheckCircle2, Github, Star, BookOpen, Briefcase } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { getProfile, saveProfile, calcReadiness, DEMO_PROFILE, type UserProfile, type Project } from '../lib/profileStore';
import { useToast } from '../lib/toast';

type Tab = 'overview' | 'projects' | 'skills' | 'edit';

const SKILL_SUGGESTIONS = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'C++', 'React', 'Node.js',
    'PostgreSQL', 'Redis', 'MongoDB', 'Docker', 'AWS', 'System Design', 'DSA', 'Machine Learning',
];

const scoreColor = (s: number) => s >= 70 ? 'var(--color-success)' : s >= 50 ? 'var(--color-warn)' : 'var(--color-danger)';

function SkillBadge({ skill, removable, onRemove }: { skill: string; removable?: boolean; onRemove?: () => void }) {
    return (
        <motion.span whileHover={{ scale: 1.05 }} style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: removable ? '6px 10px 6px 14px' : '7px 16px',
            borderRadius: 20, fontSize: '0.82rem', fontWeight: 600,
            background: 'rgba(255,107,74,0.1)', border: '1.5px solid rgba(255,107,74,0.3)',
            color: 'var(--color-primary)', cursor: removable ? 'default' : 'default',
        }}>
            {skill}
            {removable && <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,107,74,0.6)', padding: 0, display: 'flex' }}><X size={12} /></button>}
        </motion.span>
    );
}

export default function Profile() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [profile, setProfile] = useState<UserProfile>(DEMO_PROFILE);
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [isDemo, setIsDemo] = useState(false);
    const [newSkill, setNewSkill] = useState('');
    const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
    const [newProject, setNewProject] = useState({ name: '', desc: '', skills: '', link: '' });
    const [showAddProject, setShowAddProject] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!user) { setProfile(DEMO_PROFILE); setIsDemo(true); return; }
        const stored = getProfile(user.id);
        // If no profile yet, show the demo as example
        if (!stored.onboardingComplete) {
            setProfile(DEMO_PROFILE);
            setIsDemo(true);
        } else {
            setProfile(stored);
            setIsDemo(false);
        }
    }, [user]);

    const initials = profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    const handleSaveEdit = async () => {
        if (!user || isDemo) return;
        setSaving(true);
        await new Promise(r => setTimeout(r, 500));
        const merged = { ...profile, ...editForm };
        merged.readinessScore = calcReadiness(merged);
        const saved = saveProfile(user.id, merged);
        setProfile(saved);
        setSaving(false);
        setActiveTab('overview');
        toast('Profile updated! ✅', 'success');
    };

    const addSkill = () => {
        if (!newSkill.trim() || isDemo) return;
        const s = newSkill.trim();
        if (profile.skills.includes(s)) { toast('Skill already added.', 'info'); return; }
        const updated = saveProfile(user!.id, { skills: [...profile.skills, s] });
        setProfile(updated);
        setNewSkill('');
        toast(`"${s}" added to skills!`, 'success');
    };

    const removeSkill = (skill: string) => {
        if (isDemo) return;
        const updated = saveProfile(user!.id, { skills: profile.skills.filter(s => s !== skill) });
        setProfile(updated);
    };

    const addProject = () => {
        if (!newProject.name || isDemo) return;
        const proj: Project = {
            id: `p_${Date.now()}`,
            name: newProject.name,
            desc: newProject.desc,
            skills: newProject.skills.split(',').map(s => s.trim()).filter(Boolean),
            link: newProject.link || '#',
            stars: 0,
        };
        const updated = saveProfile(user!.id, { projects: [...profile.projects, proj] });
        setProfile(updated);
        setNewProject({ name: '', desc: '', skills: '', link: '' });
        setShowAddProject(false);
        toast('Project added! 🚀', 'success');
    };

    const removeProject = (id: string) => {
        if (isDemo) return;
        const updated = saveProfile(user!.id, { projects: profile.projects.filter(p => p.id !== id) });
        setProfile(updated);
    };

    const tabList: { id: Tab; label: string; icon: typeof BookOpen }[] = [
        { id: 'overview', label: 'Overview', icon: BookOpen },
        { id: 'projects', label: 'Projects', icon: Star },
        { id: 'skills', label: 'Skills', icon: CheckCircle2 },
        { id: 'edit', label: 'Edit Profile', icon: Edit3 },
    ];

    return (
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
            {/* Demo mode banner */}
            {isDemo && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    style={{ padding: '12px 20px', background: 'rgba(255,184,77,0.1)', border: '1px solid rgba(255,184,77,0.3)', borderRadius: 12, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--color-warn)' }}>
                        <Star size={15} />
                        <strong>Example Profile</strong> — This is Srihari's demo profile. Complete onboarding to create your own!
                    </div>
                    <a href="/#/onboarding" style={{ padding: '6px 16px', background: 'var(--color-warn)', color: 'black', borderRadius: 8, fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none' }}>Build Mine →</a>
                </motion.div>
            )}

            {/* Profile Header */}
            <div className="card" style={{ padding: '28px 32px', marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {/* Avatar */}
                    <div style={{
                        width: 90, height: 90, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ff6b4a, #00e5c3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2rem', fontWeight: 800, color: 'white', flexShrink: 0,
                        border: '3px solid rgba(255,107,74,0.4)',
                        boxShadow: '0 4px 20px rgba(255,107,74,0.25)'
                    }}>
                        {initials || '👤'}
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>{profile.name || 'Your Name'}</h1>
                            {profile.username && (
                                <span style={{ fontSize: '0.75rem', color: '#ff9d87', background: 'rgba(255,107,74,0.12)', border: '1px solid rgba(255,107,74,0.3)', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>@{profile.username}</span>
                            )}
                            {isDemo && <span style={{ fontSize: '0.65rem', background: 'rgba(255,184,77,0.15)', color: 'var(--color-warn)', border: '1px solid rgba(255,184,77,0.3)', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>DEMO</span>}
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: 8 }}>
                            {[profile.college, profile.branch, profile.graduationYear && `Class of ${profile.graduationYear}`, profile.cgpa && `CGPA: ${profile.cgpa}`].filter(Boolean).join(' · ')}
                        </p>
                        {profile.bio && <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.65, maxWidth: 560, marginBottom: 14 }}>{profile.bio}</p>}

                        {/* Readiness ring + badges */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--color-surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                    <svg width={36} height={36} style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
                                        <circle cx={18} cy={18} r={14} fill="none" stroke="var(--color-surface-3)" strokeWidth={4} />
                                        <motion.circle cx={18} cy={18} r={14} fill="none" stroke={scoreColor(profile.readinessScore)} strokeWidth={4}
                                            strokeDasharray={2 * Math.PI * 14}
                                            initial={{ strokeDashoffset: 2 * Math.PI * 14 }}
                                            animate={{ strokeDashoffset: 2 * Math.PI * 14 - (profile.readinessScore / 100) * 2 * Math.PI * 14 }}
                                            transition={{ duration: 1 }} strokeLinecap="round" />
                                    </svg>
                                    <span style={{ fontSize: '0.55rem', fontWeight: 800, color: scoreColor(profile.readinessScore), zIndex: 1 }}>{profile.readinessScore}%</span>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Readiness</span>
                            </div>
                            {profile.badges.map(b => (
                                <span key={b} style={{ fontSize: '0.7rem', fontWeight: 600, padding: '3px 10px', borderRadius: 4, background: 'rgba(255,184,77,0.1)', color: '#fcd34d', border: '1px solid rgba(255,184,77,0.2)' }}>
                                    🏆 {b}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
                        <button onClick={() => { setEditForm({ ...profile }); setActiveTab('edit'); }}
                            disabled={isDemo}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 8, cursor: isDemo ? 'not-allowed' : 'pointer', fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 600, opacity: isDemo ? 0.5 : 1, fontFamily: 'var(--font-sans)' }}>
                            <Edit3 size={13} /> Edit Profile
                        </button>
                        <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast('Profile link copied!', 'success'); }}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,107,74,0.1)', border: '1px solid rgba(255,107,74,0.3)', borderRadius: 8, cursor: 'pointer', fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
                            <Share2 size={13} /> Share Profile
                        </button>
                    </div>
                </div>

                {/* Platform links */}
                {(profile.github || profile.leetcode || profile.hackerrank) && (
                    <div style={{ display: 'flex', gap: 10, marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--color-border)', flexWrap: 'wrap' }}>
                        {profile.github && (
                            <a href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer"
                                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, textDecoration: 'none', fontSize: '0.78rem', fontWeight: 600, background: '#1f2937', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <Github size={12} /> github/{profile.github}
                            </a>
                        )}
                        {profile.leetcode && (
                            <a href={`https://leetcode.com/u/${profile.leetcode}`} target="_blank" rel="noreferrer"
                                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, textDecoration: 'none', fontSize: '0.78rem', fontWeight: 600, background: '#292524', color: '#fbbf24', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <ExternalLink size={11} /> leetcode/{profile.leetcode}
                            </a>
                        )}
                        {profile.hackerrank && (
                            <a href={`https://hackerrank.com/${profile.hackerrank}`} target="_blank" rel="noreferrer"
                                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, textDecoration: 'none', fontSize: '0.78rem', fontWeight: 600, background: '#0c1a2e', color: '#00e5c3', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <ExternalLink size={11} /> hackerrank/{profile.hackerrank}
                            </a>
                        )}
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, padding: 5, width: 'fit-content' }}>
                {tabList.filter(t => !isDemo || t.id !== 'edit').map(t => (
                    <button key={t.id} onClick={() => { if (t.id === 'edit') setEditForm({ ...profile }); setActiveTab(t.id); }}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: activeTab === t.id ? 'var(--color-primary)' : 'transparent', color: activeTab === t.id ? 'white' : 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s', fontFamily: 'var(--font-sans)' }}>
                        <t.icon size={14} />{t.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>

                    {/* OVERVIEW */}
                    {activeTab === 'overview' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                            <div className="card" style={{ padding: 24 }}>
                                <h3 style={{ fontWeight: 700, marginBottom: 18, fontSize: '0.95rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: 8 }}><Briefcase size={15} color="var(--color-primary)" /> Coding Stats</h3>
                                {[
                                    { l: 'LeetCode Solved', v: profile.leetcodeSolved || '—', c: 'var(--color-success)' },
                                    { l: 'Contest Rating', v: profile.contestRating || '—', c: 'var(--color-warn)' },
                                    { l: 'GitHub Commits', v: profile.githubCommits || '—', c: 'var(--color-accent)' },
                                    { l: 'Public Repos', v: profile.publicRepos || '—', c: 'var(--color-primary)' },
                                    { l: 'Day Streak 🔥', v: profile.streak || '0', c: 'var(--color-warn)' },
                                ].map(({ l, v, c }) => (
                                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--color-border)' }}>
                                        <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{l}</span>
                                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: c }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="card" style={{ padding: 24 }}>
                                <h3 style={{ fontWeight: 700, marginBottom: 18, fontSize: '0.95rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: 8 }}><Briefcase size={15} color="var(--color-accent)" /> Career Intent</h3>
                                {[
                                    { l: 'Target Role', v: profile.targetRole || '—' },
                                    { l: 'Location', v: profile.preferredLocation || '—' },
                                    { l: 'Focus', v: profile.jobFocus || '—' },
                                    { l: 'Weekly Hours', v: profile.weeklyHours ? `${profile.weeklyHours} hrs/week` : '—' },
                                    { l: 'Open to Relocate', v: profile.openToRelocate ? 'Yes' : 'No' },
                                ].map(({ l, v }) => (
                                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--color-border)' }}>
                                        <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{l}</span>
                                        <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* PROJECTS */}
                    {activeTab === 'projects' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {profile.projects.length === 0 && !showAddProject && (
                                <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                    <Star size={32} style={{ marginBottom: 12, opacity: 0.3 }} />
                                    <div style={{ marginBottom: 4, fontWeight: 600 }}>No projects yet</div>
                                    <div style={{ fontSize: '0.8rem' }}>Add your first project to showcase your work</div>
                                </div>
                            )}
                            {profile.projects.map(p => (
                                <div key={p.id} className="card" style={{ padding: '18px 22px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                        <div style={{ fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)' }}>
                                            {p.name}
                                            {p.stars > 0 && <span style={{ fontSize: '0.75rem', color: 'var(--color-warn)' }}>★ {p.stars}</span>}
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            {p.link && p.link !== '#' && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}><ExternalLink size={14} /></a>}
                                            {!isDemo && <button onClick={() => removeProject(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><X size={14} /></button>}
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 12 }}>{p.desc}</p>
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                        {p.skills.map(s => (
                                            <span key={s} style={{ padding: '3px 10px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 6, fontSize: '0.72rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Add Project form */}
                            {showAddProject && !isDemo && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: '20px 24px' }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 16, fontFamily: 'var(--font-display)' }}>Add New Project</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        <input value={newProject.name} onChange={e => setNewProject(p => ({ ...p, name: e.target.value }))} placeholder="Project Name *" className="input" />
                                        <input value={newProject.desc} onChange={e => setNewProject(p => ({ ...p, desc: e.target.value }))} placeholder="Short description" className="input" />
                                        <input value={newProject.skills} onChange={e => setNewProject(p => ({ ...p, skills: e.target.value }))} placeholder="Skills (comma-separated): React, Node.js, PostgreSQL" className="input" />
                                        <input value={newProject.link} onChange={e => setNewProject(p => ({ ...p, link: e.target.value }))} placeholder="GitHub / Live link (optional)" className="input" />
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button className="btn-primary" onClick={addProject} style={{ flex: 1 }}><Save size={14} /> Save Project</button>
                                            <button className="btn-secondary" onClick={() => setShowAddProject(false)} style={{ padding: '11px 16px' }}><X size={14} /></button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {!isDemo && !showAddProject && (
                                <button onClick={() => setShowAddProject(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '14px', background: 'transparent', border: '1.5px dashed var(--color-border)', borderRadius: 12, cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '0.875rem', fontFamily: 'var(--font-sans)', transition: 'border-color 0.15s, color 0.15s' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-primary)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)'; }}>
                                    <Plus size={14} /> Add Project
                                </button>
                            )}
                        </div>
                    )}

                    {/* SKILLS */}
                    {activeTab === 'skills' && (
                        <div className="card" style={{ padding: 28 }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                                {profile.skills.length === 0 ? (
                                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>No skills added yet. Use the input below to add some!</div>
                                ) : (
                                    profile.skills.map(skill => (
                                        <SkillBadge key={skill} skill={skill} removable={!isDemo} onRemove={() => removeSkill(skill)} />
                                    ))
                                )}
                            </div>

                            {!isDemo && (
                                <div>
                                    <div style={{ height: 1, background: 'var(--color-border)', marginBottom: 16 }} />
                                    <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                                        <input value={newSkill} onChange={e => setNewSkill(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && addSkill()}
                                            placeholder="Type a skill and press Enter…" className="input" style={{ maxWidth: 320 }} />
                                        <button onClick={addSkill} className="btn-primary" style={{ padding: '0 16px' }}><Plus size={15} /></button>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                        {SKILL_SUGGESTIONS.filter(s => !profile.skills.includes(s)).map(s => (
                                            <button key={s} onClick={() => { setNewSkill(s); }} style={{ padding: '4px 12px', borderRadius: 999, background: 'var(--color-surface-3)', border: '1px solid var(--color-border)', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)' }}>
                                                + {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* EDIT */}
                    {activeTab === 'edit' && !isDemo && (
                        <div className="card" style={{ padding: 28 }}>
                            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 24, fontFamily: 'var(--font-display)' }}>Edit Your Profile</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                {([
                                    ['Full Name', 'name', 'e.g. Arjun Sharma'],
                                    ['College', 'college', 'e.g. IIT Bombay'],
                                    ['Branch', 'branch', 'e.g. B.Tech CSE'],
                                    ['CGPA', 'cgpa', 'e.g. 8.5'],
                                    ['Graduation Year', 'graduationYear', 'e.g. 2027'],
                                    ['Location', 'location', 'e.g. Bangalore'],
                                    ['GitHub Username', 'github', 'e.g. yourhandle'],
                                    ['LeetCode Username', 'leetcode', 'e.g. yourhandle'],
                                    ['Target Role', 'targetRole', 'e.g. Backend SDE'],
                                    ['Preferred Location', 'preferredLocation', 'e.g. Bangalore, Remote'],
                                ] as [string, keyof UserProfile, string][]).map(([label, field, placeholder]) => (
                                    <div key={field as string}>
                                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>{label}</label>
                                        <input
                                            value={(editForm[field] as string) ?? (profile[field] as string) ?? ''}
                                            onChange={e => setEditForm(p => ({ ...p, [field]: e.target.value }))}
                                            placeholder={placeholder} className="input"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: 14 }}>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Bio</label>
                                <textarea
                                    value={(editForm.bio as string) ?? profile.bio} onChange={e => setEditForm(p => ({ ...p, bio: e.target.value }))}
                                    placeholder="Short bio about you..." className="input" rows={3} style={{ resize: 'vertical' }} />
                            </div>
                            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                                <button className="btn-primary" onClick={handleSaveEdit} disabled={saving} style={{ flex: 1 }}>
                                    {saving ? '⟳ Saving...' : <><Save size={15} /> Save Changes</>}
                                </button>
                                <button className="btn-secondary" onClick={() => setActiveTab('overview')} style={{ padding: '11px 20px' }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
