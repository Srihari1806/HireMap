import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MOCK_CODING_STATS, MOCK_HEATMAP, MOCK_JOBS } from '../lib/mockData';
import { Github, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { DEFAULT_PROFILE, type UserProfile } from '../lib/profileStore';


// --- Activity Heatmap ---
function Heatmap() {
    const data = MOCK_HEATMAP;
    const weeks: { date: string; count: number }[][] = [];
    for (let i = 0; i < data.length; i += 7) {
        weeks.push(data.slice(i, i + 7));
    }
    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

    return (
        <div>
            <div style={{ display: 'flex', gap: 3, overflowX: 'auto', paddingBottom: 4 }}>
                {weeks.map((week, wi) => (
                    <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {week.map((day, di) => (
                            <div
                                key={di}
                                title={`${day.date}: ${day.count} submissions`}
                                className={`heat-cell heat-${Math.min(day.count, 5)}`}
                                style={{ width: 11, height: 11 }}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 3, marginTop: 6 }}>
                {months.map(m => (
                    <div key={m} style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', width: 30, textAlign: 'center' }}>{m}</div>
                ))}
            </div>
        </div>
    );
}

// --- Stat box ---
function StatBox({ label, value, sub, color = '#6366f1' }: { label: string; value: string | number; sub?: string; color?: string }) {
    return (
        <div className="card" style={{ padding: '16px 18px', flex: 1 }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color }}>{value}</div>
            {sub && <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: 2 }}>{sub}</div>}
        </div>
    );
}

export default function StudentDashboard() {
    const { user } = useAuth();
    const [studentProfile, setStudentProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (!user?.id) return;
        const unsub = onSnapshot(doc(db, 'profiles', user.id), (docSnap) => {
            if (docSnap.exists()) {
                setStudentProfile({ ...DEFAULT_PROFILE, ...(docSnap.data() as Partial<UserProfile>) });
            } else {
                setStudentProfile({ ...DEFAULT_PROFILE, name: user.name || '' });
            }
        });
        return () => unsub();
    }, [user]);

    if (!studentProfile) {
        return <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading dashboard...</div>;
    }

    const student = studentProfile;
    const lc = MOCK_CODING_STATS.leetcode;
    const gh = MOCK_CODING_STATS.github;

    const submissions = MOCK_HEATMAP.reduce((sum, d) => sum + d.count, 0);
    const activeDays = MOCK_HEATMAP.filter(d => d.count > 0).length;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200, margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 4 }}>Good morning, {(student.name || 'Student').split(' ')[0]} 👋</h1>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        {student.college || <span style={{ opacity: 0.5 }}>[Add College]</span>}
                        <span>·</span>
                        {student.branch || <span style={{ opacity: 0.5 }}>[Add Branch]</span>}
                        <span>·</span>
                        {student.graduationYear ? `Class of ${student.graduationYear}` : <span style={{ opacity: 0.5 }}>[Add Grad Year]</span>}
                        {(!student.college || !student.branch || !student.graduationYear) && (
                            <Link to="/profile" style={{ fontSize: '0.75rem', color: '#f59e0b', textDecoration: 'none', fontWeight: 600, background: 'rgba(245, 158, 11, 0.1)', padding: '2px 8px', borderRadius: 4, marginLeft: 4 }}>
                                Complete Profile
                            </Link>
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    {student.badges.map(b => (
                        <span key={b} style={{
                            fontSize: '0.7rem', fontWeight: 600, padding: '4px 10px',
                            background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
                            borderRadius: 6, color: '#a5b4fc'
                        }}>🏆 {b}</span>
                    ))}
                </div>
            </div>

            {/* Top stats row */}
            <div style={{ display: 'flex', gap: 16 }}>
                <StatBox label="Readiness Score" value={`${student.readinessScore}%`} sub="Ready for SDE roles" color="#6366f1" />
                <StatBox label="Current Streak" value={`${student.streak}d`} sub="🔥 Keep it up!" color="#f59e0b" />
                <StatBox label="LeetCode Solved" value={student.leetcode ? lc.totalSolved : '-'} sub={student.leetcode ? `/ ${lc.totalProblems} total` : 'Not linked'} color="#10b981" />
                <StatBox label="GitHub Commits" value={student.github ? gh.totalCommits : '-'} sub={student.github ? "This year" : "Not linked"} color="#22d3ee" />
                <StatBox label="Jobs Matched" value="14" sub="5 high confidence" color="#8b5cf6" />
            </div>

            {/* DSA Progress + GitHub stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {/* DSA Progress card (TUF style) */}
                <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <div>
                            <div style={{ fontSize: '1rem', fontWeight: 700 }}>DSA Progress</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 2 }}>TUF + LeetCode</div>
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                            <button style={{ padding: '4px 10px', background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', borderRadius: 6, border: 'none', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>TUF</button>
                            <button style={{ padding: '4px 10px', background: 'var(--color-surface-3)', color: 'var(--color-text-muted)', borderRadius: 6, border: 'none', fontSize: '0.75rem', cursor: 'pointer' }}>LeetCode</button>
                        </div>
                    </div>

                    {!student.leetcode ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--color-text-muted)', minHeight: 180 }}>
                            <div style={{ fontSize: '2rem', marginBottom: 16, opacity: 0.5 }}>💻</div>
                            <div style={{ fontWeight: 600, marginBottom: 8, color: 'var(--color-text-secondary)' }}>No LeetCode Account Linked</div>
                            <div style={{ fontSize: '0.8rem', marginBottom: 16 }}>Connect your account to track DSA progress.</div>
                            <Link to="/profile" style={{ padding: '8px 16px', background: 'var(--color-primary)', color: 'white', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}>Connect LeetCode</Link>
                        </div>
                    ) : (
                    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
                        {/* Big center ring */}
                        <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
                            <svg width={140} height={140} style={{ transform: 'rotate(-90deg)' }}>
                                {/* Easy ring */}
                                <motion.circle cx={70} cy={70} r={60} fill="none" stroke="#10b981" strokeWidth={8}
                                    strokeDasharray={2 * Math.PI * 60}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                                    animate={{ strokeDashoffset: 2 * Math.PI * 60 - (lc.easy.solved / lc.easy.total) * 2 * Math.PI * 60 }}
                                    transition={{ duration: 1.2, delay: 0.2 }} strokeLinecap="round" />
                                {/* Medium ring */}
                                <motion.circle cx={70} cy={70} r={46} fill="none" stroke="#f59e0b" strokeWidth={8}
                                    strokeDasharray={2 * Math.PI * 46}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 46 }}
                                    animate={{ strokeDashoffset: 2 * Math.PI * 46 - (lc.medium.solved / lc.medium.total) * 2 * Math.PI * 46 }}
                                    transition={{ duration: 1.2, delay: 0.3 }} strokeLinecap="round" />
                                {/* Hard ring */}
                                <motion.circle cx={70} cy={70} r={32} fill="none" stroke="#ef4444" strokeWidth={8}
                                    strokeDasharray={2 * Math.PI * 32}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                                    animate={{ strokeDashoffset: 2 * Math.PI * 32 - (lc.hard.solved / lc.hard.total) * 2 * Math.PI * 32 }}
                                    transition={{ duration: 1.2, delay: 0.4 }} strokeLinecap="round" />
                            </svg>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '1.8rem', fontWeight: 900 }}>{lc.totalSolved}</span>
                                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>{lc.totalProblems}</span>
                            </div>
                        </div>

                        {/* Stats breakdown */}
                        <div style={{ flex: 1 }}>
                            {[
                                { label: 'Easy', solved: lc.easy.solved, total: lc.easy.total, color: '#10b981' },
                                { label: 'Medium', solved: lc.medium.solved, total: lc.medium.total, color: '#f59e0b' },
                                { label: 'Hard', solved: lc.hard.solved, total: lc.hard.total, color: '#ef4444' },
                            ].map(({ label, solved, total, color }) => (
                                <div key={label} style={{ marginBottom: 12 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                        <span style={{ fontSize: '0.8rem', color, fontWeight: 600 }}>● {label}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{solved}/{total}</span>
                                    </div>
                                    <div style={{ height: 5, background: 'var(--color-surface-3)', borderRadius: 3, overflow: 'hidden' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(solved / total) * 100}%` }}
                                            transition={{ duration: 1.0, delay: 0.3 }}
                                            style={{ height: '100%', background: color, borderRadius: 3 }}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
                                <div>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>Contest Rating</div>
                                    <div style={{ fontWeight: 700, color: '#f59e0b' }}>{lc.contestRating}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>Global Rank</div>
                                    <div style={{ fontWeight: 700 }}>#{lc.globalRank.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>Max Streak</div>
                                    <div style={{ fontWeight: 700, color: '#f59e0b' }}>{lc.maxStreak} 🔥</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>

                {/* GitHub stats card */}
                <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                        <Github size={18} />
                        <span style={{ fontWeight: 700 }}>GitHub Activity</span>
                        {student.github && <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>@{student.github}</span>}
                    </div>

                    {!student.github ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--color-text-muted)', minHeight: 180 }}>
                            <div style={{ fontSize: '2rem', marginBottom: 16, opacity: 0.5 }}>🐙</div>
                            <div style={{ fontWeight: 600, marginBottom: 8, color: 'var(--color-text-secondary)' }}>No GitHub Account Linked</div>
                            <div style={{ fontSize: '0.8rem', marginBottom: 16 }}>Connect your GitHub to showcase your open source contributions.</div>
                            <Link to="/profile" style={{ padding: '8px 16px', background: 'var(--color-primary)', color: 'white', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}>Connect GitHub</Link>
                        </div>
                    ) : (
                    <>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22d3ee' }}>{gh.totalCommits}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Commits</div>
                        </div>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22d3ee' }}>{gh.publicRepos}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Repos</div>
                        </div>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b' }}>{gh.totalStars}★</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Stars</div>
                        </div>
                    </div>

                    <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 10 }}>Top Languages</div>
                        {gh.topLanguages.map(lang => (
                            <div key={lang.name} style={{ marginBottom: 8 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                                    <span style={{ fontSize: '0.78rem' }}>{lang.name}</span>
                                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{lang.percent}%</span>
                                </div>
                                <div style={{ height: 4, background: 'var(--color-surface-3)', borderRadius: 2 }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${lang.percent}%` }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #22d3ee)', borderRadius: 2 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    </>
                    )}
                </div>
            </div>

            {/* Heatmap */}
            <div className="card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <CalendarDays size={16} color="#6366f1" />
                        <span style={{ fontWeight: 700 }}>
                            {student.leetcode || student.github ? `${submissions} submissions in the last 12 months` : 'Activity Timeline'}
                        </span>
                    </div>
                    {(student.leetcode || student.github) && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                            Active Days: {activeDays} · Max Streak: {lc.maxStreak}
                        </div>
                    )}
                </div>
                {!student.leetcode && !student.github ? (
                    <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-muted)', background: 'var(--color-surface-2)', borderRadius: 12 }}>
                        Connect your GitHub or LeetCode account to see your activity timeline.
                    </div>
                ) : (
                    <>
                        <Heatmap />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
                            <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>Less</span>
                            {[0, 1, 2, 3, 4, 5].map(n => (
                                <div key={n} className={`heat-cell heat-${n}`} style={{ width: 11, height: 11 }} />
                            ))}
                            <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>More</span>
                        </div>
                    </>
                )}
            </div>

            {/* Job matches preview */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h2 style={{ fontWeight: 700, fontSize: '1.05rem' }}>Top Job Matches</h2>
                    <Link to="/jobs" style={{ fontSize: '0.8rem', color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>View all →</Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {MOCK_JOBS.slice(0, 3).map(job => (
                        <motion.div
                            key={job.id}
                            whileHover={{ x: 4 }}
                            style={{
                                background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                                borderRadius: 10, padding: '14px 18px',
                                display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer'
                            }}
                        >
                            <div style={{
                                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                                background: job.companyColor + '25',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 800, color: job.companyColor, fontSize: '1rem'
                            }}>
                                {job.companyLogo}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{job.role}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{job.company} · {job.location} · {job.type}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Match</div>
                                    <div style={{
                                        fontWeight: 800, fontSize: '1rem',
                                        color: job.matchScore >= 80 ? '#10b981' : job.matchScore >= 60 ? '#f59e0b' : '#ef4444'
                                    }}>{job.matchScore}%</div>
                                </div>
                                <Link to={`/jobs/${job.id}`} style={{ padding: '6px 14px', background: 'rgba(99,102,241,0.12)', color: '#a5b4fc', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none' }}>View</Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
