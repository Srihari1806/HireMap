import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function CollegeDetail() {
    return (
        <div style={{ padding: 24 }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>College Detail Page</h1>
            <p style={{ color: 'var(--color-text-muted)' }}>
                Detailed college profile with branch stats, alumni outcomes, and full DNA breakdown coming soon.
            </p>
        </div>
    );
}

export function CompanyPortal() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', maxWidth: 520 }}
            >
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>🏢</div>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 12, color: 'var(--color-text-primary)' }}>Company Portal</h1>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 28 }}>
                    Access our recruiter dashboard to post jobs, search student talent by skills and CGPA,
                    view live coding stats, and message candidates directly.
                </p>
                <Link to="/auth" style={{ padding: '12px 28px', background: '#6366f1', color: 'white', borderRadius: 9, fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
                    Register as Company →
                </Link>
            </motion.div>
        </div>
    );
}

export default CollegeDetail;
