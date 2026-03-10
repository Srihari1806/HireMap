import { createContext, useContext, useState, type ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
}

interface ToastContextType {
    toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback((message: string, type: ToastType = 'info') => {
        const id = `toast_${Date.now()}_${Math.random()}`;
        setToasts(prev => [...prev, { id, type, message }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
    }, []);

    const remove = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

    const colors: Record<ToastType, { bg: string; border: string; icon: string }> = {
        success: { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', icon: '#10b981' },
        error: { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)', icon: '#ef4444' },
        info: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', icon: '#f59e0b' },
    };

    const icons: Record<ToastType, React.ReactNode> = {
        success: <CheckCircle2 size={16} />,
        error: <XCircle size={16} />,
        info: <Info size={16} />,
    };

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div style={{
                position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
                display: 'flex', flexDirection: 'column', gap: 10
            }}>
                <AnimatePresence>
                    {toasts.map(t => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, x: 60, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 60, scale: 0.9 }}
                            transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                            style={{
                                background: colors[t.type].bg,
                                border: `1px solid ${colors[t.type].border}`,
                                backdropFilter: 'blur(12px)',
                                borderRadius: 12, padding: '12px 16px',
                                display: 'flex', alignItems: 'center', gap: 10,
                                minWidth: 280, maxWidth: 380,
                                color: colors[t.type].icon,
                                fontSize: '0.875rem', fontWeight: 500,
                                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                            }}
                        >
                            {icons[t.type]}
                            <span style={{ flex: 1, color: 'var(--color-text-primary)' }}>{t.message}</span>
                            <button
                                onClick={() => remove(t.id)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 2 }}
                            >
                                <X size={14} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within ToastProvider');
    return ctx;
}
