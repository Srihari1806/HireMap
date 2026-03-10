import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Eye, Wand2, CheckCircle2, AlertCircle, FileText, LayoutTemplate, BookOpen, Mail, Sparkles, ChevronRight, RotateCcw } from 'lucide-react';
import { MOCK_ATS_RESULT, MOCK_STUDENT } from '../lib/mockData';
import { useToast } from '../lib/toast';

const TEMPLATES = [
    { id: 't1', name: 'Nova', color: '#ff6b4a', style: 'Modern', badge: 'Popular' },
    { id: 't2', name: 'Slate', color: '#00e5c3', style: 'Minimal', badge: 'Clean' },
    { id: 't3', name: 'Cosmos', color: '#ffb84d', style: 'Creative', badge: 'Bold' },
    { id: 't4', name: 'Apex', color: '#4477ff', style: 'Professional', badge: 'ATS+' },
];

const TABS = [
    { id: 'builder', label: 'Resume Builder', icon: FileText },
    { id: 'templates', label: 'Templates', icon: LayoutTemplate },
    { id: 'cover', label: 'Cover Letter', icon: Mail },
    { id: 'ats', label: 'ATS Checker', icon: CheckCircle2 },
    { id: 'examples', label: 'Examples', icon: BookOpen },
];

const SECTIONS = [
    { name: 'Education', score: MOCK_ATS_RESULT.sections.education },
    { name: 'Skills', score: MOCK_ATS_RESULT.sections.skills },
    { name: 'Projects', score: MOCK_ATS_RESULT.sections.projects },
    { name: 'Experience', score: MOCK_ATS_RESULT.sections.experience },
    { name: 'Formatting', score: MOCK_ATS_RESULT.sections.formatting },
];

const RESUME_EXAMPLES = [
    { role: 'Software Engineer', company: 'Google', score: 96, color: '#4285F4' },
    { role: 'Product Manager', company: 'Flipkart', score: 91, color: '#2874F0' },
    { role: 'Backend Intern', company: 'Razorpay', score: 88, color: '#2D6EF5' },
    { role: 'Data Analyst', company: 'Microsoft', score: 94, color: '#00A4EF' },
    { role: 'Frontend Dev', company: 'Zepto', score: 87, color: '#8B5CF6' },
    { role: 'ML Engineer', company: 'Amazon', score: 92, color: '#FF9900' },
];

const scoreColor = (s: number) => s >= 80 ? 'var(--color-success)' : s >= 60 ? 'var(--color-warn)' : 'var(--color-danger)';

function ResumePreview({ template }: { template: typeof TEMPLATES[0] }) {
    return (
        <div className="card" style={{ padding: '36px 40px', fontFamily: 'serif', background: '#fff', color: '#1e293b' }}>
            <div style={{ borderLeft: `4px solid ${template.color}`, paddingLeft: 16, marginBottom: 20 }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>{MOCK_STUDENT.name}</h2>
                <p style={{ color: '#475569', fontSize: '0.875rem' }}>
                    {MOCK_STUDENT.college} · {MOCK_STUDENT.branch} · Class of {MOCK_STUDENT.graduationYear}
                </p>
                <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: '0.78rem', color: '#64748b' }}>
                    <span>github.com/{MOCK_STUDENT.codingProfiles.github}</span>
                    <span>·</span>
                    <span>leetcode.com/u/{MOCK_STUDENT.codingProfiles.leetcode}</span>
                    <span>·</span>
                    <span>{MOCK_STUDENT.location}</span>
                </div>
            </div>

            {[
                { title: 'Technical Skills', content: <div style={{ fontSize: '0.825rem', color: '#334155', lineHeight: 1.9 }}><strong>Languages:</strong> JS, TS, Python, SQL &nbsp;|&nbsp; <strong>Frameworks:</strong> React, Node.js &nbsp;|&nbsp; <strong>DBs:</strong> PostgreSQL, Redis</div> },
                { title: 'Projects', content: <div><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><strong style={{ fontSize: '0.875rem' }}>HireMap – Talent Intelligence Platform</strong><span style={{ fontSize: '0.78rem', color: '#64748b' }}>Jan 2026</span></div><ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.8rem', color: '#334155', lineHeight: 1.9 }}><li>Talent Graph connecting 5,000+ students via skill overlap matching</li><li>ATS resume engine with 85% average score improvement</li></ul></div> },
                { title: 'Education', content: <div style={{ display: 'flex', justifyContent: 'space-between' }}><div><div style={{ fontWeight: 700, fontSize: '0.875rem' }}>B.Tech, CSE</div><div style={{ fontSize: '0.8rem', color: '#64748b' }}>{MOCK_STUDENT.college}</div></div><div style={{ textAlign: 'right', fontSize: '0.8rem' }}><div style={{ fontWeight: 700 }}>CGPA: {MOCK_STUDENT.cgpa}/10</div><div style={{ color: '#64748b' }}>2023 – {MOCK_STUDENT.graduationYear}</div></div></div> },
            ].map(({ title, content }) => (
                <div key={title} style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: template.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, paddingBottom: 4, borderBottom: `1px solid ${template.color}30` }}>{title}</div>
                    {content}
                </div>
            ))}
        </div>
    );
}

function ATSCheckerTab() {
    const score = MOCK_ATS_RESULT.atsScore;
    const [checked, setChecked] = useState(false);
    const [checking, setChecking] = useState(false);
    const { toast } = useToast();

    const runCheck = async () => {
        setChecking(true);
        await new Promise(r => setTimeout(r, 1800));
        setChecking(false);
        setChecked(true);
        toast('ATS analysis complete!', 'success');
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
            <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>Upload Your Resume</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: 20 }}>We'll compare it against 50,000+ successful resumes in our database.</p>
                <div style={{
                    border: '2px dashed var(--color-border-light)', borderRadius: 12, padding: 40,
                    textAlign: 'center', marginBottom: 20, background: 'var(--color-surface-2)',
                    cursor: 'pointer', transition: 'border-color 0.2s'
                }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border-light)')}
                >
                    <FileText size={32} style={{ color: 'var(--color-text-muted)', marginBottom: 12 }} />
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 4 }}>Drop your resume here</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>PDF, DOCX — max 5MB</div>
                </div>
                <button className="btn-primary" onClick={runCheck} disabled={checking} style={{ width: '100%' }}>
                    {checking ? <><RotateCcw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing...</> : <><Sparkles size={16} /> Run ATS Check</>}
                </button>
            </div>

            {checked ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="card" style={{ padding: 24, textAlign: 'center' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>ATS Score</div>
                        <div style={{ position: 'relative', width: 110, height: 110, margin: '0 auto 14px' }}>
                            <svg width={110} height={110} style={{ transform: 'rotate(-90deg)' }}>
                                <circle cx={55} cy={55} r={46} fill="none" stroke="var(--color-surface-3)" strokeWidth={9} />
                                <motion.circle cx={55} cy={55} r={46} fill="none" stroke={scoreColor(score)} strokeWidth={9}
                                    strokeDasharray={2 * Math.PI * 46}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 46 }}
                                    animate={{ strokeDashoffset: 2 * Math.PI * 46 - (score / 100) * 2 * Math.PI * 46 }}
                                    transition={{ duration: 1.2, ease: 'easeOut' }} strokeLinecap="round" />
                            </svg>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: scoreColor(score), fontFamily: 'var(--font-display)' }}>{score}</span>
                                <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>/100</span>
                            </div>
                        </div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: scoreColor(score) }}>{score >= 80 ? 'Strong ATS Pass ✓' : score >= 60 ? 'Needs Improvement' : 'Below Threshold'}</div>
                    </div>
                    <div className="card" style={{ padding: 20 }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Section Scores</div>
                        {SECTIONS.map(s => (
                            <div key={s.name} style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontSize: '0.8rem' }}>{s.name}</span>
                                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: scoreColor(s.score) }}>{s.score}</span>
                                </div>
                                <div style={{ height: 4, background: 'var(--color-surface-3)', borderRadius: 2, overflow: 'hidden' }}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${s.score}%` }} transition={{ duration: 0.8, delay: 0.3 }}
                                        style={{ height: '100%', background: scoreColor(s.score), borderRadius: 2 }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="card" style={{ padding: 20 }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-success)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Strengths</div>
                        {MOCK_ATS_RESULT.strengths.map(s => (
                            <div key={s} style={{ display: 'flex', gap: 6, marginBottom: 8, fontSize: '0.78rem', color: 'var(--color-text-secondary)', alignItems: 'flex-start' }}>
                                <CheckCircle2 size={12} color="var(--color-success)" style={{ flexShrink: 0, marginTop: 2 }} /> {s}
                            </div>
                        ))}
                        <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-danger)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Missing Keywords</div>
                            {MOCK_ATS_RESULT.missingKeywords.map(k => (
                                <div key={k} style={{ display: 'flex', gap: 6, marginBottom: 8, fontSize: '0.78rem', color: '#fca5a5', alignItems: 'center' }}>
                                    <AlertCircle size={12} style={{ flexShrink: 0 }} /> {k}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 12 }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle2 size={28} color="var(--color-text-muted)" />
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Your score will appear here</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Upload your resume and run an ATS check</div>
                </div>
            )}
        </div>
    );
}

function CoverLetterTab() {
    const [jobTitle, setJobTitle] = useState('');
    const [company, setCompany] = useState('');
    const [generated, setGenerated] = useState(false);
    const [generating, setGenerating] = useState(false);
    const { toast } = useToast();

    const generate = async () => {
        if (!jobTitle || !company) { toast('Please fill in the job title and company.', 'error'); return; }
        setGenerating(true);
        await new Promise(r => setTimeout(r, 1500));
        setGenerating(false);
        setGenerated(true);
        toast('Cover letter generated!', 'success');
    };

    const coverLetterText = `Dear Hiring Manager at ${company},

I am writing to express my strong interest in the ${jobTitle} position at ${company}. As a Computer Science student at KIIT University with a CGPA of 8.4 and hands-on experience in full-stack development, I am confident in my ability to contribute meaningfully to your engineering team.

Throughout my academic career, I have developed proficiency in JavaScript, TypeScript, React, and Node.js. My flagship project, HireMap, demonstrates my capacity to architect scalable, production-ready systems — connecting 5,000+ students with job opportunities through a real-time talent graph.

My active presence on GitHub (782+ commits this year) and LeetCode (130+ problems solved) reflects my commitment to continuous learning. I thrive in collaborative, fast-paced environments and am excited by ${company}'s innovative approach to technology.

I would welcome the opportunity to discuss how my skills align with your team's goals. Thank you for your consideration.

Sincerely,
${MOCK_STUDENT.name}`;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
                <div className="card" style={{ padding: 24, marginBottom: 16 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 16 }}>AI Cover Letter Generator</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Job Title</label>
                            <input value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="e.g. Backend Engineer Intern" className="input" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Company Name</label>
                            <input value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. Razorpay" className="input" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Tone</label>
                            <select className="input" style={{ cursor: 'pointer' }}>
                                <option>Professional & Confident</option>
                                <option>Enthusiastic & Creative</option>
                                <option>Formal & Traditional</option>
                            </select>
                        </div>
                        <button className="btn-primary" onClick={generate} disabled={generating}>
                            {generating ? <><RotateCcw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Generating...</> : <><Wand2 size={16} /> Generate with AI</>}
                        </button>
                    </div>
                </div>
                <div className="card" style={{ padding: 20 }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>Tips for a Strong Cover Letter</div>
                    {['Mention specific projects relevant to the role', 'Reference the company\'s recent work', 'Keep it under 300 words', 'End with a clear call to action'].map(tip => (
                        <div key={tip} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: '0.8rem', color: 'var(--color-text-secondary)', alignItems: 'flex-start' }}>
                            <ChevronRight size={14} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: 1 }} />{tip}
                        </div>
                    ))}
                </div>
            </div>
            <div className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem' }}>Generated Cover Letter</h3>
                    {generated && <button className="btn-secondary" style={{ padding: '7px 14px', fontSize: '0.78rem' }}><Download size={13} /> Export</button>}
                </div>
                {generated ? (
                    <div style={{ flex: 1, background: 'var(--color-surface-2)', borderRadius: 10, padding: 20, fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-wrap', overflowY: 'auto', maxHeight: 440 }}>
                        {coverLetterText}
                    </div>
                ) : (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', gap: 12 }}>
                        <Mail size={36} style={{ opacity: 0.3 }} />
                        <span style={{ fontSize: '0.875rem' }}>Your cover letter will appear here</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Resume() {
    const [activeTab, setActiveTab] = useState('builder');
    const [selectedTemplate, setSelectedTemplate] = useState('t1');
    const { toast } = useToast();

    const template = TEMPLATES.find(t => t.id === selectedTemplate) || TEMPLATES[0];

    return (
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4, fontFamily: 'var(--font-display)' }}>Resume Studio</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Build, check, and perfect your resume with AI</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-secondary" style={{ padding: '9px 16px', fontSize: '0.82rem' }} onClick={() => toast('Preview opened!', 'info')}>
                        <Eye size={14} /> Preview
                    </button>
                    <button className="btn-primary" style={{ padding: '9px 16px', fontSize: '0.82rem' }} onClick={() => toast('Exporting PDF...', 'success')}>
                        <Download size={14} /> Export PDF
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--color-surface)', padding: 6, borderRadius: 12, border: '1px solid var(--color-border)', width: 'fit-content' }}>
                {TABS.map(({ id, label, icon: Icon }) => (
                    <button key={id} onClick={() => setActiveTab(id)} style={{
                        display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
                        borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600,
                        transition: 'all 0.2s', fontFamily: 'var(--font-sans)',
                        background: activeTab === id ? 'var(--color-primary)' : 'transparent',
                        color: activeTab === id ? 'white' : 'var(--color-text-secondary)',
                    }}>
                        <Icon size={14} />{label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                    {activeTab === 'builder' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <div className="card" style={{ padding: 16 }}>
                                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>Template</div>
                                    {TEMPLATES.map(t => (
                                        <button key={t.id} onClick={() => setSelectedTemplate(t.id)} style={{
                                            width: '100%', padding: '9px 12px', borderRadius: 8, border: `1.5px solid ${selectedTemplate === t.id ? t.color : 'var(--color-border)'}`,
                                            background: selectedTemplate === t.id ? t.color + '15' : 'transparent', cursor: 'pointer', marginBottom: 6,
                                            display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.15s', fontFamily: 'var(--font-sans)'
                                        }}>
                                            <div style={{ width: 12, height: 12, borderRadius: 3, background: t.color, flexShrink: 0 }} />
                                            <div style={{ textAlign: 'left' }}>
                                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{t.name}</div>
                                                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>{t.style}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="card" style={{ padding: 16 }}>
                                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>Sections</div>
                                    {['Contact', 'Summary', 'Skills', 'Projects', 'Education', 'Experience'].map(s => (
                                        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '1px solid var(--color-border)', cursor: 'pointer' }}>
                                            <CheckCircle2 size={13} color="var(--color-success)" />
                                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{s}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <ResumePreview template={template} />
                        </div>
                    )}
                    {activeTab === 'templates' && (
                        <div>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: 24, fontSize: '0.875rem' }}>40+ ATS-friendly templates designed by HR experts. Pick one and customize freely.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
                                {[...TEMPLATES, ...TEMPLATES].map((t, i) => (
                                    <div key={`${t.id}-${i}`} className={`template-card ${selectedTemplate === t.id && i < 4 ? 'selected' : ''}`}
                                        onClick={() => { setSelectedTemplate(t.id); setActiveTab('builder'); toast(`Template "${t.name}" selected!`, 'success'); }}>
                                        <div style={{ height: 160, background: `linear-gradient(135deg, ${t.color}20, ${t.color}08)`, borderBottom: `3px solid ${t.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ width: 60, height: 6, background: t.color, borderRadius: 3, margin: '0 auto 8px' }} />
                                                {[40, 30, 35].map((w, j) => <div key={j} style={{ width: `${w}%`, height: 4, background: t.color + '40', borderRadius: 2, margin: '5px auto' }} />)}
                                                {[90, 70, 80].map((w, j) => <div key={j} style={{ width: `${w}%`, height: 3, background: t.color + '25', borderRadius: 2, margin: '4px auto' }} />)}
                                            </div>
                                        </div>
                                        <div style={{ padding: '12px 14px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{t.name}</span>
                                                <span style={{ fontSize: '0.65rem', background: t.color + '20', color: t.color, padding: '2px 8px', borderRadius: 999, fontWeight: 700 }}>{t.badge}</span>
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 2 }}>{t.style}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'cover' && <CoverLetterTab />}
                    {activeTab === 'ats' && <ATSCheckerTab />}
                    {activeTab === 'examples' && (
                        <div>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: 24, fontSize: '0.875rem' }}>Learn from 1,500+ real resumes that got people hired at top companies.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                                {RESUME_EXAMPLES.map(ex => (
                                    <div key={ex.role} className="card card-hover" style={{ padding: '20px 22px', cursor: 'pointer' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                            <div style={{ width: 40, height: 40, borderRadius: 10, background: ex.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 800, color: ex.color }}>
                                                {ex.company[0]}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{ex.role}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Hired by {ex.company}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>ATS Score</span>
                                            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: scoreColor(ex.score) }}>{ex.score}/100</span>
                                        </div>
                                        <div style={{ height: 4, background: 'var(--color-surface-3)', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
                                            <div style={{ width: `${ex.score}%`, height: '100%', background: ex.color, borderRadius: 2 }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
