import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, Minimize2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const SYSTEM_MESSAGES = {
    '/dashboard': "Hi there! I'm your HireMap AI Guide. I see you're on the Dashboard. Connect your GitHub and LeetCode so I can analyze your readiness score!",
    '/jobs': "Looking for roles? Use the filters above to find the perfect match. I can also help you prep for specific interviews!",
    '/profile': "A complete profile boosts your matching score by 40%. Want me to review your resume?",
    '/community': "Welcome to the community! Don't hesitate to ask questions—alumni and recruiters are active here.",
    '/progress': "You're making great progress. Keep up your daily streak to rank higher on recruiter searches.",
    '/colleges': "Explore placement stats here. Did you know you can filter by Top Package and DNA Score?",
    '/career-map': "This visualizes your potential trajectory. Should we focus on Backend or Full Stack?",
    'default': "Hello! I'm your HireMap AI assistant. What would you like to explore today?"
};

const SUGGESTIONS = [
    "How do I improve my readiness score?",
    "Show me the roadmap for SDE roles.",
    "Help me build my portfolio.",
    "What AI tools should I learn?"
];

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ id: string, text: string, isBot: boolean }[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const loc = useLocation();

    // Auto-welcome based on route
    useEffect(() => {
        const routeKey = Object.keys(SYSTEM_MESSAGES).find(k => loc.pathname.startsWith(k)) || 'default';
        const welcomeText = SYSTEM_MESSAGES[routeKey as keyof typeof SYSTEM_MESSAGES];
        
        setMessages([{ id: 'msg_0', text: welcomeText, isBot: true }]);
    }, [loc.pathname]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = (text: string = input) => {
        if (!text.trim()) return;
        
        const newMsg = { id: Date.now().toString(), text, isBot: false };
        setMessages(prev => [...prev, newMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            let reply = "I'm still learning, but I can guide you through HireMap! Try checking out the Jobs Roadmaps for LeetCode & TUF cheat codes.";
            
            if (text.toLowerCase().includes('score') || text.toLowerCase().includes('readiness')) {
                reply = "Your readiness score is calculated based on your DS&A progress (LeetCode), GitHub activity, and profile completeness. Focus on the TUF 75 to boost it quickly!";
            } else if (text.toLowerCase().includes('roadmap') || text.toLowerCase().includes('sde')) {
                reply = "Head over to the Jobs tab and click on any job. The AI will generate a daily step-by-step roadmap using roadmap.sh best practices and TUF 90 sheet!";
            } else if (text.toLowerCase().includes('ai tool')) {
                reply = "I highly recommend mastering Cursor/Copilot for coding, and using ChatGPT for system design reviews. They are integrated into our advanced roadmaps.";
            }

            setMessages(prev => [...prev, { id: (Date.now()+1).toString(), text: reply, isBot: true }]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <div style={{ position: 'fixed', bottom: 24, right: 28, zIndex: 9999, fontFamily: 'var(--font-sans)' }}>
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.15 } }}
                        style={{
                            width: 360,
                            height: 540,
                            background: 'rgba(12, 16, 24, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 107, 74, 0.3)',
                            borderRadius: 16,
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(255,107,74,0.15)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            marginBottom: 16
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '16px 20px',
                            background: 'linear-gradient(90deg, rgba(255, 107, 74, 0.15), rgba(255, 184, 77, 0.05))',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: 10,
                                    background: 'linear-gradient(135deg, #ff6b4a, #ffb84d)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Bot size={18} color="white" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: '#fff' }}>HireMap AI</h3>
                                    <span style={{ fontSize: '0.7rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} /> Online
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: 4 }}>
                                <Minimize2 size={18} />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div style={{ flex: 1, padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, scale: 0.98, y: 5 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    style={{
                                        alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                                        maxWidth: '85%',
                                    }}
                                >
                                    <div style={{
                                        padding: '12px 16px',
                                        background: msg.isBot ? 'var(--color-surface-2)' : 'linear-gradient(135deg, #ff6b4a, #ffb84d)',
                                        color: msg.isBot ? 'var(--color-text-primary)' : '#fff',
                                        borderRadius: msg.isBot ? '2px 16px 16px 16px' : '16px 16px 2px 16px',
                                        fontSize: '0.85rem',
                                        lineHeight: 1.5,
                                        border: msg.isBot ? '1px solid var(--color-border)' : 'none',
                                    }}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <div style={{ alignSelf: 'flex-start', background: 'var(--color-surface-2)', padding: '12px 16px', borderRadius: '2px 16px 16px 16px', border: '1px solid var(--color-border)', display: 'flex', gap: 4 }}>
                                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: 6, height: 6, background: '#a5b4fc', borderRadius: '50%' }} />
                                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: 6, height: 6, background: '#a5b4fc', borderRadius: '50%' }} />
                                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: 6, height: 6, background: '#a5b4fc', borderRadius: '50%' }} />
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestions */}
                        {messages.length < 3 && !isTyping && (
                            <div style={{ padding: '0 16px 12px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {SUGGESTIONS.map(s => (
                                    <button 
                                        key={s} 
                                        onClick={() => handleSend(s)}
                                        style={{ 
                                            padding: '6px 12px', fontSize: '0.75rem', 
                                            background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', 
                                            border: '1px solid rgba(99,102,241,0.2)', borderRadius: 999,
                                            cursor: 'pointer', textAlign: 'left'
                                        }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'var(--color-surface)', display: 'flex', gap: 10 }}>
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                placeholder="Ask me anything..."
                                style={{
                                    flex: 1, background: 'var(--color-bg)', border: '1px solid var(--color-border)', 
                                    padding: '10px 14px', borderRadius: 12, color: '#fff', fontSize: '0.85rem'
                                }}
                            />
                            <button 
                                onClick={() => handleSend()}
                                disabled={!input.trim()}
                                style={{
                                    width: 40, height: 40, borderRadius: 12, 
                                    background: input.trim() ? 'var(--color-primary)' : 'var(--color-surface-2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Send size={18} color={input.trim() ? 'white' : 'var(--color-text-muted)'} style={{ marginLeft: -2, marginTop: 2 }} />
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        style={{
                            width: 60, height: 60, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ff6b4a, #ffb84d)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: 'none', cursor: 'pointer',
                            boxShadow: '0 8px 32px rgba(255,107,74,0.4)',
                            position: 'relative'
                        }}
                    >
                        <Sparkles size={26} color="white" />
                        <div style={{
                            position: 'absolute', top: 0, right: 0,
                            width: 14, height: 14, background: '#10b981', border: '2px solid #0c1018',
                            borderRadius: '50%'
                        }} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
