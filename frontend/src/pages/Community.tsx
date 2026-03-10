import { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_COMMUNITY_SERVERS, MOCK_MESSAGES } from '../lib/mockData';
import { Hash, Users, Send, Plus, Smile } from 'lucide-react';

export default function Community() {
    const [activeServer, setActiveServer] = useState(MOCK_COMMUNITY_SERVERS[3]);
    const [activeChannel, setActiveChannel] = useState('general');
    const [input, setInput] = useState('');

    return (
        <div style={{ display: 'flex', height: 'calc(100vh - 120px)', gap: 0, overflow: 'hidden', borderRadius: 14, border: '1px solid var(--color-border)' }}>
            {/* Server list sidebar (discord-style icons) */}
            <div style={{
                width: 64, background: 'var(--color-bg)', borderRight: '1px solid var(--color-border)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '12px 0', overflowY: 'auto'
            }}>
                {MOCK_COMMUNITY_SERVERS.map(server => (
                    <div
                        key={server.id}
                        title={server.name}
                        onClick={() => { setActiveServer(server); setActiveChannel(server.channels[0]); }}
                        style={{
                            width: 44, height: 44, borderRadius: activeServer.id === server.id ? 14 : '50%',
                            background: server.color + '30', border: `2px solid ${activeServer.id === server.id ? server.color : 'transparent'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 800, color: server.color, fontSize: '1rem',
                            cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0
                        }}
                    >
                        {server.initial}
                    </div>
                ))}
                <div style={{
                    width: 44, height: 44, borderRadius: '50%', background: 'var(--color-surface-2)',
                    border: '2px dashed var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--color-text-muted)'
                }}>
                    <Plus size={18} />
                </div>
            </div>

            {/* Channel list */}
            <div style={{
                width: 200, background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)',
                display: 'flex', flexDirection: 'column', overflowY: 'auto'
            }}>
                <div style={{ padding: '16px 14px 10px', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{activeServer.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Users size={11} /> {activeServer.members.toLocaleString()} members
                    </div>
                </div>
                <div style={{ padding: '10px 8px' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: 8, padding: '0 6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Text Channels</div>
                    {activeServer.channels.map(ch => (
                        <button
                            key={ch}
                            onClick={() => setActiveChannel(ch)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6, width: '100%',
                                padding: '7px 8px', borderRadius: 6, border: 'none', cursor: 'pointer',
                                background: activeChannel === ch ? 'rgba(99,102,241,0.12)' : 'transparent',
                                color: activeChannel === ch ? '#a5b4fc' : 'var(--color-text-muted)',
                                fontSize: '0.82rem', fontWeight: activeChannel === ch ? 600 : 400,
                                textAlign: 'left'
                            }}
                        >
                            <Hash size={14} /> {ch}
                        </button>
                    ))}
                </div>
            </div>

            {/* Message area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--color-surface-2)', minWidth: 0 }}>
                {/* Channel header */}
                <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-surface)' }}>
                    <Hash size={16} color="var(--color-text-muted)" />
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{activeChannel}</span>
                    <span style={{ marginLeft: 8, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>· {activeServer.name}</span>
                </div>

                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {MOCK_MESSAGES.map((msg, i) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
                        >
                            <div style={{
                                width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                                background: `hsl(${msg.author.charCodeAt(0) * 17}deg, 60%, 35%)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 700, color: 'white', fontSize: '0.85rem'
                            }}>
                                {msg.avatar}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{msg.author}</span>
                                    <span style={{
                                        fontSize: '0.65rem', padding: '1px 6px', borderRadius: 4,
                                        background: msg.role.startsWith('CTO') ? 'rgba(239,68,68,0.15)' : msg.role.startsWith('HR') ? 'rgba(99,102,241,0.15)' : 'rgba(34,211,238,0.1)',
                                        color: msg.role.startsWith('CTO') ? '#fca5a5' : msg.role.startsWith('HR') ? '#a5b4fc' : '#67e8f9',
                                        fontWeight: 600
                                    }}>{msg.role}</span>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{msg.time}</span>
                                </div>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{msg.content}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Input box */}
                <div style={{ padding: '12px 20px', borderTop: '1px solid var(--color-border)' }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        background: 'var(--color-surface-3)', borderRadius: 10, padding: '10px 14px',
                        border: '1px solid var(--color-border)'
                    }}>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder={`Message #${activeChannel}`}
                            style={{
                                flex: 1, background: 'none', border: 'none', outline: 'none',
                                color: 'var(--color-text-primary)', fontSize: '0.875rem'
                            }}
                        />
                        <Smile size={18} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} />
                        <button
                            onClick={() => setInput('')}
                            style={{
                                width: 32, height: 32, borderRadius: 6, border: 'none', cursor: 'pointer',
                                background: input ? 'var(--color-primary)' : 'var(--color-surface)',
                                color: input ? 'white' : 'var(--color-text-muted)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s'
                            }}
                        >
                            <Send size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Members panel */}
            <div style={{
                width: 220, background: 'var(--color-surface)', borderLeft: '1px solid var(--color-border)',
                padding: '16px 12px', overflowY: 'auto'
            }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                    Online – {Math.floor(activeServer.members * 0.15).toLocaleString()}
                </div>
                {['HR Team', 'CTO', 'Recruiter', 'Srihari B.', 'Priya R.', 'Rohan M.', 'Aisha K.'].map((m, i) => (
                    <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                        <div style={{
                            width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                            background: `hsl(${m.charCodeAt(0) * 23}deg, 50%, 35%)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.7rem', fontWeight: 700, color: 'white', position: 'relative'
                        }}>
                            {m[0]}
                            <div style={{
                                position: 'absolute', bottom: 0, right: 0, width: 8, height: 8,
                                borderRadius: '50%', background: i < 4 ? '#10b981' : '#94a3b8',
                                border: '1.5px solid var(--color-surface)'
                            }} />
                        </div>
                        <span style={{ fontSize: '0.78rem', color: i < 4 ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>{m}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
