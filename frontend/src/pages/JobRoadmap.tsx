import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MOCK_JOBS, MOCK_ROADMAPS } from '../lib/mockData';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function JobRoadmap() {
    const { id } = useParams();
    const job = MOCK_JOBS.find(j => j.id === id) ?? MOCK_JOBS[0];
    const roadmapWeeks = MOCK_ROADMAPS[job.id] || MOCK_ROADMAPS['job_001'];
    const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set([
        'w0t0', 'w0t1', 'w0t2', 'w1t0', 'w1t1',
    ]));

    const toggleTask = (key: string) => {
        setCompletedTasks(prev => {
            const next = new Set(prev);
            next.has(key) ? next.delete(key) : next.add(key);
            return next;
        });
    };

    const totalTasks = roadmapWeeks.reduce((s: number, w: any) => s + w.tasks.length, 0);
    const doneTasks = completedTasks.size;
    const overallPct = Math.round((doneTasks / totalTasks) * 100);

    return (
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                <Link to="/jobs" style={{ color: '#6366f1', textDecoration: 'none' }}>Jobs</Link>
                <ChevronRight size={12} />
                <Link to={`/jobs/${id}`} style={{ color: '#6366f1', textDecoration: 'none' }}>{job.company}</Link>
                <ChevronRight size={12} />
                <span style={{ color: 'var(--color-text-primary)' }}>Roadmap</span>
            </div>

            {/* Header */}
            <div className="card" style={{ padding: '24px 28px', marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 6 }}>{job.role} Roadmap</h1>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>@ {job.company} · AI-generated based on your {job.missingSkills.length} skill gap(s)</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6366f1' }}>{overallPct}%</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Complete</div>
                    </div>
                </div>

                {/* Overall progress bar */}
                <div style={{ marginTop: 16 }}>
                    <div style={{ height: 8, background: 'var(--color-surface-3)', borderRadius: 4, overflow: 'hidden' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${overallPct}%` }}
                            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                            style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #22d3ee)', borderRadius: 4 }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                        <span>{doneTasks}/{totalTasks} tasks done</span>
                        <span>~{roadmapWeeks.length} weeks total</span>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div style={{ position: 'relative', paddingLeft: 28 }}>
                {/* Vertical line */}
                <div style={{
                    position: 'absolute', left: 10, top: 12, bottom: 12, width: 2,
                    background: 'linear-gradient(180deg, #6366f1 0%, var(--color-surface-3) 100%)'
                }} />

                {roadmapWeeks.map((week: any, wi: number) => {
                    const weekDone = week.tasks.every((_: any, ti: number) => completedTasks.has(`w${wi}t${ti}`));
                    const weekPct = Math.round(week.tasks.filter((_: any, ti: number) => completedTasks.has(`w${wi}t${ti}`)).length / week.tasks.length * 100);

                    return (
                        <motion.div
                            key={wi}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: wi * 0.1, duration: 0.4 }}
                            style={{ marginBottom: 24, position: 'relative' }}
                        >
                            {/* Timeline dot */}
                            <div style={{
                                position: 'absolute', left: -22, top: 16,
                                width: 20, height: 20, borderRadius: '50%',
                                background: weekDone ? '#6366f1' : 'var(--color-surface-2)',
                                border: `2px solid ${weekDone ? '#6366f1' : 'var(--color-border-light)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                zIndex: 1
                            }}>
                                {weekDone && <CheckCircle2 size={12} color="white" />}
                            </div>

                            <div className="card" style={{
                                borderColor: weekDone ? 'rgba(99,102,241,0.3)' : 'var(--color-border)',
                                background: weekDone ? 'rgba(99,102,241,0.05)' : 'var(--color-surface)'
                            }}>
                                <div style={{ padding: '16px 20px' }}>
                                    {/* Week header */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                        <div>
                                            <span style={{
                                                fontSize: '0.65rem', fontWeight: 700,
                                                color: weekDone ? '#6366f1' : 'var(--color-text-muted)',
                                                textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4, display: 'block'
                                            }}>
                                                Week {week.week}
                                            </span>
                                            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: weekDone ? '#a5b4fc' : 'var(--color-text-primary)' }}>
                                                {week.title}
                                            </h3>
                                        </div>
                                        <div style={{
                                            padding: '4px 12px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 700,
                                            background: weekDone ? 'rgba(16,185,129,0.12)' : 'var(--color-surface-3)',
                                            color: weekDone ? '#10b981' : 'var(--color-text-muted)'
                                        }}>
                                            {weekPct}%
                                        </div>
                                    </div>

                                    {/* Week progress bar */}
                                    <div style={{ height: 3, background: 'var(--color-surface-3)', borderRadius: 2, marginBottom: 16, overflow: 'hidden' }}>
                                        <div style={{ width: `${weekPct}%`, height: '100%', background: weekDone ? '#10b981' : '#6366f1', transition: 'width 0.3s' }} />
                                    </div>

                                    {/* Tasks */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        {week.tasks.map((task: any, ti: number) => {
                                            const key = `w${wi}t${ti}`;
                                            const done = completedTasks.has(key);
                                            return (
                                                <label key={ti} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', userSelect: 'none' }}>
                                                    <div onClick={() => toggleTask(key)} style={{ marginTop: 2, flexShrink: 0 }}>
                                                        {done
                                                            ? <CheckCircle2 size={18} color="#6366f1" />
                                                            : <Circle size={18} color="var(--color-border-light)" />
                                                        }
                                                    </div>
                                                    {task.link ? (
                                                        <a href={task.link} target="_blank" rel="noreferrer" style={{
                                                            fontSize: '0.875rem', color: done ? 'var(--color-text-muted)' : '#a5b4fc',
                                                            textDecoration: done ? 'line-through' : 'none', lineHeight: 1.5,
                                                            display: 'block'
                                                        }}>
                                                            {task.text} ↗
                                                        </a>
                                                    ) : (
                                                        <span style={{
                                                            fontSize: '0.875rem', color: done ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                                                            textDecoration: done ? 'line-through' : 'none', lineHeight: 1.5,
                                                            display: 'block'
                                                        }}>
                                                            {task.text}
                                                        </span>
                                                    )}
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Celebrate completion CTA */}
            {overallPct === 100 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        textAlign: 'center', padding: '32px', background: 'rgba(16,185,129,0.08)',
                        border: '1px solid rgba(16,185,129,0.3)', borderRadius: 14, marginTop: 12
                    }}
                >
                    <div style={{ fontSize: '2rem', marginBottom: 8 }}>🎉</div>
                    <h3 style={{ fontWeight: 800, color: '#10b981', marginBottom: 6 }}>Roadmap Complete!</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: 16 }}>You're now ready to apply. Your profile score has increased.</p>
                    <a href="#" style={{ padding: '10px 24px', background: '#10b981', color: 'white', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>Apply to {job.company} →</a>
                </motion.div>
            )}
        </div>
    );
}
