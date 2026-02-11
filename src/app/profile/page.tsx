"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User, Github, Linkedin, Globe, Twitter, Code2, Award,
    Plus, X, Save, ExternalLink, Mail, Phone, MapPin,
    GraduationCap, Pencil, Trash2, ChevronDown, Link2,
    BookOpen, Trophy, Star, Zap, CheckCircle2
} from "lucide-react";

interface SocialLink {
    platform: string;
    url: string;
    icon: string;
    connected: boolean;
}

interface Skill {
    name: string;
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    category: string;
}

interface Certificate {
    title: string;
    issuer: string;
    date: string;
    url: string;
    credentialId: string;
}

const platformIcons: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
    GitHub: { icon: Github, color: "#E6EDF3", bg: "rgba(230,237,243,0.08)" },
    LinkedIn: { icon: Linkedin, color: "#0A66C2", bg: "rgba(10,102,194,0.1)" },
    Twitter: { icon: Twitter, color: "#1DA1F2", bg: "rgba(29,161,242,0.1)" },
    LeetCode: { icon: Code2, color: "#FFA116", bg: "rgba(255,161,22,0.1)" },
    Portfolio: { icon: Globe, color: "#10B981", bg: "rgba(16,185,129,0.1)" },
    HackerRank: { icon: Code2, color: "#2EC866", bg: "rgba(46,200,102,0.1)" },
    CodeForces: { icon: Code2, color: "#1890FF", bg: "rgba(24,144,255,0.1)" },
    GeeksforGeeks: { icon: BookOpen, color: "#2F8D46", bg: "rgba(47,141,70,0.1)" },
};

const skillCategories = ["Languages", "Frameworks", "Tools", "Databases", "Cloud", "Soft Skills"];
const skillLevels: Skill["level"][] = ["Beginner", "Intermediate", "Advanced", "Expert"];
const levelColors: Record<string, string> = {
    Beginner: "#F59E0B", Intermediate: "#3B82F6", Advanced: "#8B5CF6", Expert: "#10B981",
};

const itemV = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ProfilePage() {
    const [profile, setProfile] = useState({
        name: "", email: "", phone: "", branch: "", cgpa: "", batch: "2026", college: "KIIT University", bio: "",
    });
    const [socials, setSocials] = useState<SocialLink[]>([
        { platform: "GitHub", url: "", icon: "Github", connected: false },
        { platform: "LinkedIn", url: "", icon: "Linkedin", connected: false },
        { platform: "Twitter", url: "", icon: "Twitter", connected: false },
        { platform: "LeetCode", url: "", icon: "Code2", connected: false },
        { platform: "Portfolio", url: "", icon: "Globe", connected: false },
        { platform: "HackerRank", url: "", icon: "Code2", connected: false },
        { platform: "CodeForces", url: "", icon: "Code2", connected: false },
        { platform: "GeeksforGeeks", url: "", icon: "BookOpen", connected: false },
    ]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [newSkill, setNewSkill] = useState({ name: "", level: "Intermediate" as Skill["level"], category: "Languages" });
    const [newCert, setNewCert] = useState({ title: "", issuer: "", date: "", url: "", credentialId: "" });
    const [showAddSkill, setShowAddSkill] = useState(false);
    const [showAddCert, setShowAddCert] = useState(false);
    const [editingSocial, setEditingSocial] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"overview" | "socials" | "skills" | "certs">("overview");
    const [saved, setSaved] = useState(false);

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    const connectSocial = (platform: string, url: string) => {
        setSocials(prev => prev.map(s => s.platform === platform ? { ...s, url, connected: !!url } : s));
        setEditingSocial(null);
    };

    const addSkill = () => {
        if (!newSkill.name.trim()) return;
        setSkills(prev => [...prev, { ...newSkill }]);
        setNewSkill({ name: "", level: "Intermediate", category: "Languages" });
        setShowAddSkill(false);
    };

    const removeSkill = (i: number) => setSkills(prev => prev.filter((_, idx) => idx !== i));

    const addCert = () => {
        if (!newCert.title.trim()) return;
        setCertificates(prev => [...prev, { ...newCert }]);
        setNewCert({ title: "", issuer: "", date: "", url: "", credentialId: "" });
        setShowAddCert(false);
    };

    const removeCert = (i: number) => setCertificates(prev => prev.filter((_, idx) => idx !== i));

    const connectedCount = socials.filter(s => s.connected).length;
    const profileStrength = Math.min(100, Math.round(
        (profile.name ? 10 : 0) + (profile.email ? 10 : 0) + (profile.branch ? 10 : 0) +
        (profile.cgpa ? 10 : 0) + (connectedCount * 8) + (skills.length > 0 ? 15 : 0) +
        (certificates.length > 0 ? 15 : 0) + (profile.bio ? 10 : 0)
    ));

    const tabs = [
        { id: "overview" as const, label: "Overview", icon: User },
        { id: "socials" as const, label: "Platforms", icon: Link2 },
        { id: "skills" as const, label: "Skills", icon: Zap },
        { id: "certs" as const, label: "Certificates", icon: Award },
    ];

    return (
        <div className="max-w-5xl mx-auto">
            {/* Profile Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-[rgba(139,92,246,0.15)] via-[rgba(59,130,246,0.1)] to-[rgba(6,182,212,0.15)]" />
                <div className="relative flex flex-col sm:flex-row items-start sm:items-end gap-4 pt-10">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#8B5CF6] to-[#F43F5E] flex items-center justify-center text-2xl font-bold text-white border-4 border-[#0A0A0A] shadow-xl">
                        {profile.name ? profile.name.charAt(0).toUpperCase() : "?"}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold font-[family-name:var(--font-outfit)]">
                            {profile.name || "Setup Your Profile"}
                        </h2>
                        <p className="text-xs text-[rgba(240,238,233,0.5)] mt-0.5">
                            {profile.college} · Batch {profile.batch} {profile.branch && `· ${profile.branch}`}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Profile Strength */}
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
                            <div className="relative w-8 h-8">
                                <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
                                    <circle cx="16" cy="16" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" />
                                    <circle cx="16" cy="16" r="14" fill="none" stroke={profileStrength > 70 ? "#10B981" : profileStrength > 40 ? "#F59E0B" : "#F43F5E"} strokeWidth="2.5" strokeDasharray={`${profileStrength * 0.88} 88`} strokeLinecap="round" />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold">{profileStrength}%</span>
                            </div>
                            <span className="text-[10px] text-[rgba(240,238,233,0.5)]">Profile<br />Strength</span>
                        </div>
                        <button onClick={handleSave} className="btn-primary text-xs">
                            {saved ? <><CheckCircle2 className="w-3.5 h-3.5" /> Saved!</> : <><Save className="w-3.5 h-3.5" /> Save</>}
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 p-1 glass-card">
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-medium transition-all ${activeTab === tab.id ? "bg-[rgba(139,92,246,0.15)] text-white border border-[rgba(139,92,246,0.25)]" : "text-[rgba(240,238,233,0.5)] hover:text-[rgba(240,238,233,0.8)]"
                            }`}>
                        <tab.icon className="w-3.5 h-3.5" /> {tab.label}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <motion.div key="overview" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
                        <div className="glass-card p-5">
                            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2"><User className="w-4 h-4 text-[#8B5CF6]" /> Personal Info</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { label: "Full Name", key: "name", placeholder: "Your full name", icon: User },
                                    { label: "Email", key: "email", placeholder: "you@email.com", icon: Mail },
                                    { label: "Phone", key: "phone", placeholder: "+91 XXXXX XXXXX", icon: Phone },
                                    { label: "Branch", key: "branch", placeholder: "e.g. CSE, IT, ECE", icon: GraduationCap },
                                    { label: "CGPA", key: "cgpa", placeholder: "e.g. 8.5", icon: Star },
                                    { label: "Batch", key: "batch", placeholder: "2026", icon: GraduationCap },
                                ].map(field => (
                                    <div key={field.key}>
                                        <label className="text-[10px] uppercase tracking-wider text-[rgba(240,238,233,0.4)] mb-1 block">{field.label}</label>
                                        <div className="relative">
                                            <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[rgba(240,238,233,0.3)]" />
                                            <input className="input-glass pl-9" placeholder={field.placeholder}
                                                value={(profile as Record<string, string>)[field.key]}
                                                onChange={e => setProfile(p => ({ ...p, [field.key]: e.target.value }))} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3">
                                <label className="text-[10px] uppercase tracking-wider text-[rgba(240,238,233,0.4)] mb-1 block">Bio</label>
                                <textarea className="input-glass min-h-[80px] resize-none" placeholder="Tell recruiters about yourself..."
                                    value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Socials Tab */}
                {activeTab === "socials" && (
                    <motion.div key="socials" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                        <div className="glass-card p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold flex items-center gap-2"><Link2 className="w-4 h-4 text-[#06B6D4]" /> Connected Platforms</h3>
                                <span className="badge badge-cyan">{connectedCount}/{socials.length} connected</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {socials.map(social => {
                                    const pInfo = platformIcons[social.platform];
                                    const Icon = pInfo?.icon || Globe;
                                    return (
                                        <motion.div key={social.platform} variants={itemV} className={`p-4 rounded-2xl border transition-all ${social.connected
                                                ? "bg-[rgba(255,255,255,0.03)] border-[rgba(16,185,129,0.2)]"
                                                : "bg-[rgba(255,255,255,0.015)] border-[rgba(255,255,255,0.06)]"
                                            }`}>
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: pInfo?.bg }}>
                                                    <Icon className="w-5 h-5" style={{ color: pInfo?.color }} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">{social.platform}</p>
                                                    {social.connected && (
                                                        <p className="text-[10px] text-[#10B981] flex items-center gap-1"><CheckCircle2 className="w-2.5 h-2.5" /> Connected</p>
                                                    )}
                                                </div>
                                                {social.connected && social.url && (
                                                    <a href={social.url} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-lg bg-[rgba(255,255,255,0.04)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.08)] transition-colors">
                                                        <ExternalLink className="w-3 h-3 text-[rgba(240,238,233,0.5)]" />
                                                    </a>
                                                )}
                                            </div>
                                            {editingSocial === social.platform ? (
                                                <div className="flex gap-2">
                                                    <input className="input-glass text-xs flex-1" placeholder={`https://${social.platform.toLowerCase()}.com/username`}
                                                        defaultValue={social.url}
                                                        onKeyDown={e => { if (e.key === "Enter") connectSocial(social.platform, (e.target as HTMLInputElement).value); }}
                                                        autoFocus />
                                                    <button onClick={() => {
                                                        const inp = document.querySelector<HTMLInputElement>(`input[placeholder*="${social.platform.toLowerCase()}"]`);
                                                        connectSocial(social.platform, inp?.value || "");
                                                    }} className="btn-primary text-[10px] px-3 py-1.5"><Save className="w-3 h-3" /></button>
                                                    <button onClick={() => setEditingSocial(null)} className="btn-ghost text-[10px] px-3 py-1.5"><X className="w-3 h-3" /></button>
                                                </div>
                                            ) : (
                                                <button onClick={() => setEditingSocial(social.platform)}
                                                    className={`w-full text-xs py-2 rounded-xl border transition-all ${social.connected
                                                            ? "border-[rgba(255,255,255,0.06)] text-[rgba(240,238,233,0.5)] hover:bg-[rgba(255,255,255,0.04)]"
                                                            : "border-dashed border-[rgba(139,92,246,0.3)] text-[#8B5CF6] hover:bg-[rgba(139,92,246,0.05)]"
                                                        }`}>
                                                    {social.connected ? <><Pencil className="w-3 h-3 inline mr-1" /> Edit Link</> : <><Plus className="w-3 h-3 inline mr-1" /> Connect</>}
                                                </button>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Skills Tab */}
                {activeTab === "skills" && (
                    <motion.div key="skills" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                        <div className="glass-card p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold flex items-center gap-2"><Zap className="w-4 h-4 text-[#F59E0B]" /> Skills ({skills.length})</h3>
                                <button onClick={() => setShowAddSkill(true)} className="btn-primary text-xs"><Plus className="w-3.5 h-3.5" /> Add Skill</button>
                            </div>

                            <AnimatePresence>
                                {showAddSkill && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
                                        <div className="p-4 rounded-2xl border border-dashed border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.03)]">
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                                                <input className="input-glass" placeholder="Skill name (e.g. React, Python)" value={newSkill.name} onChange={e => setNewSkill(s => ({ ...s, name: e.target.value }))} autoFocus />
                                                <select className="input-glass" value={newSkill.category} onChange={e => setNewSkill(s => ({ ...s, category: e.target.value }))}>
                                                    {skillCategories.map(c => <option key={c} value={c} className="bg-[#141414]">{c}</option>)}
                                                </select>
                                                <select className="input-glass" value={newSkill.level} onChange={e => setNewSkill(s => ({ ...s, level: e.target.value as Skill["level"] }))}>
                                                    {skillLevels.map(l => <option key={l} value={l} className="bg-[#141414]">{l}</option>)}
                                                </select>
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                <button onClick={() => setShowAddSkill(false)} className="btn-ghost text-xs"><X className="w-3 h-3" /> Cancel</button>
                                                <button onClick={addSkill} className="btn-primary text-xs"><Plus className="w-3 h-3" /> Add</button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {skills.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-14 h-14 mx-auto rounded-3xl bg-[rgba(245,158,11,0.08)] flex items-center justify-center mb-3"><Zap className="w-6 h-6 text-[#F59E0B]" /></div>
                                    <p className="text-sm text-[rgba(240,238,233,0.6)] mb-1">No skills added yet</p>
                                    <p className="text-xs text-[rgba(240,238,233,0.35)]">Add your technical and soft skills to improve your match score</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {skillCategories.filter(cat => skills.some(s => s.category === cat)).map(cat => (
                                        <div key={cat}>
                                            <p className="text-[10px] uppercase tracking-wider text-[rgba(240,238,233,0.35)] mb-2">{cat}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.filter(s => s.category === cat).map((skill, si) => (
                                                    <motion.div key={si} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] group">
                                                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: levelColors[skill.level] }} />
                                                        <span className="text-xs font-medium">{skill.name}</span>
                                                        <span className="text-[9px] px-1.5 py-0.5 rounded-md" style={{ color: levelColors[skill.level], background: `${levelColors[skill.level]}15` }}>{skill.level}</span>
                                                        <button onClick={() => removeSkill(skills.indexOf(skill))} className="opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3 text-[#F43F5E]" /></button>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Certificates Tab */}
                {activeTab === "certs" && (
                    <motion.div key="certs" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                        <div className="glass-card p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold flex items-center gap-2"><Award className="w-4 h-4 text-[#10B981]" /> Certificates ({certificates.length})</h3>
                                <button onClick={() => setShowAddCert(true)} className="btn-primary text-xs"><Plus className="w-3.5 h-3.5" /> Add Certificate</button>
                            </div>

                            <AnimatePresence>
                                {showAddCert && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
                                        <div className="p-4 rounded-2xl border border-dashed border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.03)]">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                                <input className="input-glass" placeholder="Certificate Title" value={newCert.title} onChange={e => setNewCert(c => ({ ...c, title: e.target.value }))} autoFocus />
                                                <input className="input-glass" placeholder="Issuing Organization" value={newCert.issuer} onChange={e => setNewCert(c => ({ ...c, issuer: e.target.value }))} />
                                                <input className="input-glass" type="month" value={newCert.date} onChange={e => setNewCert(c => ({ ...c, date: e.target.value }))} />
                                                <input className="input-glass" placeholder="Credential ID (optional)" value={newCert.credentialId} onChange={e => setNewCert(c => ({ ...c, credentialId: e.target.value }))} />
                                                <input className="input-glass sm:col-span-2" placeholder="Verification URL (optional)" value={newCert.url} onChange={e => setNewCert(c => ({ ...c, url: e.target.value }))} />
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                <button onClick={() => setShowAddCert(false)} className="btn-ghost text-xs"><X className="w-3 h-3" /> Cancel</button>
                                                <button onClick={addCert} className="btn-primary text-xs"><Plus className="w-3 h-3" /> Add</button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {certificates.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-14 h-14 mx-auto rounded-3xl bg-[rgba(16,185,129,0.08)] flex items-center justify-center mb-3"><Trophy className="w-6 h-6 text-[#10B981]" /></div>
                                    <p className="text-sm text-[rgba(240,238,233,0.6)] mb-1">No certificates yet</p>
                                    <p className="text-xs text-[rgba(240,238,233,0.35)]">Add certifications from Coursera, Udemy, AWS, Google, etc.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {certificates.map((cert, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                            className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] flex items-start gap-4 group">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[rgba(16,185,129,0.15)] to-[rgba(6,182,212,0.15)] flex items-center justify-center shrink-0 border border-[rgba(16,185,129,0.2)]">
                                                <Award className="w-5 h-5 text-[#10B981]" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold">{cert.title}</h4>
                                                <p className="text-xs text-[rgba(240,238,233,0.5)] mt-0.5">{cert.issuer} {cert.date && `· ${cert.date}`}</p>
                                                {cert.credentialId && <p className="text-[10px] text-[rgba(240,238,233,0.35)] mt-1">Credential ID: {cert.credentialId}</p>}
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {cert.url && (
                                                    <a href={cert.url} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-lg bg-[rgba(255,255,255,0.04)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.08)]">
                                                        <ExternalLink className="w-3 h-3 text-[rgba(240,238,233,0.5)]" />
                                                    </a>
                                                )}
                                                <button onClick={() => removeCert(i)} className="w-7 h-7 rounded-lg bg-[rgba(244,63,94,0.08)] flex items-center justify-center hover:bg-[rgba(244,63,94,0.15)]">
                                                    <Trash2 className="w-3 h-3 text-[#F43F5E]" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
