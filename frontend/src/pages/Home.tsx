import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ChevronDown, Sparkles, Map, CheckCircle, ShieldCheck } from 'lucide-react';

export default function Home() {
    const { scrollYProgress } = useScroll();

    // Background color transitions based on scroll
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        ['#f8fafc', '#f1f5f9', '#ffffff', '#e2e8f0', '#0f172a']
    );

    const textColor = useTransform(
        scrollYProgress,
        [0, 0.75, 0.85, 1],
        ['#0f172a', '#0f172a', '#f8fafc', '#f8fafc']
    );

    return (
        <motion.div
            style={{ backgroundColor, color: textColor }}
            className="min-h-screen transition-colors duration-500 font-sans selection:bg-primary-300 selection:text-primary-900"
        >
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-opacity-70">
                <div className="flex items-center gap-2">
                    <Map className="w-8 h-8 text-primary-600" />
                    <span className="text-xl font-bold tracking-tight">HireMap</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/auth" className="font-medium hover:text-primary-600 transition-colors">Log In</Link>
                    <Button asChild className="rounded-full px-6">
                        <Link to="/auth">Sign Up</Link>
                    </Button>
                </div>
            </nav>

            <main className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">

                {/* HERO SECTION */}
                <section className="scrolly-section flex-col text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
                            <Sparkles className="w-4 h-4" /> The New Standard in Career Intelligence
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                            Stop guessing your career. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-500">
                                Start seeing the path.
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto">
                            A flow-first platform bridging the gap between confusion, fake hype, and real-world placement readiness.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button size="lg" className="rounded-full text-lg px-8 h-14 w-full sm:w-auto shadow-lg shadow-primary-500/30" asChild>
                                <Link to="/colleges">Explore Colleges</Link>
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full text-lg px-8 h-14 w-full sm:w-auto border-2" asChild>
                                <Link to="/jobs">Explore Jobs & Roadmaps</Link>
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute bottom-10"
                    >
                        <ChevronDown className="w-8 h-8 text-slate-400" />
                    </motion.div>
                </section>

                {/* PROBLEM -> SOLUTION SECTION */}
                <section className="scrolly-section px-4 md:px-24">
                    <div className="grid md:grid-cols-2 gap-16 items-center w-full max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">The System is Broken.</h2>
                            <div className="space-y-6 text-lg text-slate-600">
                                <p className="flex items-start gap-3">
                                    <span className="text-red-500 font-bold text-2xl">×</span>
                                    Hundreds of wasted applications, ATS black holes, and fake LinkedIn hype.
                                </p>
                                <p className="flex items-start gap-3">
                                    <span className="text-red-500 font-bold text-2xl">×</span>
                                    Colleges hiding true placement stats and ROI.
                                </p>
                                <p className="flex items-start gap-3">
                                    <span className="text-red-500 font-bold text-2xl">×</span>
                                    Students following blind roadmaps doing 500+ LeetCode problems with 0 calls.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
                        >
                            <h3 className="text-2xl font-bold text-primary-600 mb-6 flex items-center gap-2">
                                <CheckCircle className="w-6 h-6" /> How HireMap Fixes It
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold shrink-0">1</div>
                                    <p><strong>Unfiltered College Reality:</strong> Access true DNA scores, accurate placement percentages and verified student feeds.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold shrink-0">2</div>
                                    <p><strong>Smart Job Readiness:</strong> Know exactly what skills you lack and standard criteria before applying.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold shrink-0">3</div>
                                    <p><strong>Role-Specific Roadmaps:</strong> Week-wise skill trees linked directly to high-probability jobs.</p>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* COLLEGE & JOB HUB PREVIEWS */}
                <section className="scrolly-section flex-col px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-6xl w-full"
                    >
                        <h2 className="text-4xl font-bold mb-4">Discover Truth Through Data</h2>
                        <p className="text-xl text-slate-600 mb-12">Explore dual hubs tailored for your career clarity.</p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-8 hover:border-primary-400 transition-colors text-left group">
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors">College Hub</h3>
                                <p className="text-slate-500 mb-6">Instagram-style feeds + deep analytics. See ROI, internship caps, and anonymous reality checks.</p>
                                <div className="bg-white rounded-xl h-48 border shadow-sm p-4 relative overflow-hidden">
                                    <div className="w-3/4 h-4 bg-slate-200 rounded mb-4"></div>
                                    <div className="w-1/2 h-4 bg-slate-200 rounded mb-8"></div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-indigo-100 rounded-full"></div>
                                        <div className="space-y-2 flex-1">
                                            <div className="w-full h-3 bg-slate-100 rounded"></div>
                                            <div className="w-5/6 h-3 bg-slate-100 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-8 hover:border-primary-400 transition-colors text-left group">
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors">Job Hub</h3>
                                <p className="text-slate-500 mb-6">Jobs you actually qualify for, with readiness meters matching your skills to job spec allocations.</p>
                                <div className="bg-white rounded-xl h-48 border shadow-sm p-4 relative overflow-hidden flex flex-col justify-end">
                                    <div className="items-end gap-2 flex">
                                        <div className="w-1/4 h-24 bg-primary-100 rounded-t-lg"></div>
                                        <div className="w-1/4 h-16 bg-slate-100 rounded-t-lg"></div>
                                        <div className="w-1/4 h-32 bg-primary-500 rounded-t-lg"></div>
                                        <div className="w-1/4 h-12 bg-slate-100 rounded-t-lg"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* TRUST SECTION */}
                <section className="scrolly-section bg-transparent flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-center px-4 max-w-4xl mx-auto"
                    >
                        <ShieldCheck className="w-20 h-20 mx-auto text-primary-400 mb-6" />
                        <h2 className="text-5xl font-bold mb-6">High Trust. Zero Clutter.</h2>
                        <p className="text-2xl text-slate-400 mb-10 leading-relaxed font-light">
                            We filter the noise so you can focus on building the skills that matter. Transparency, real data, and targeted preparation.
                        </p>
                        <Button variant="default" size="lg" className="rounded-full text-xl px-12 h-16 bg-white text-slate-900 hover:bg-slate-100" asChild>
                            <Link to="/onboarding">Get Started Now</Link>
                        </Button>
                    </motion.div>
                </section>
            </main>
        </motion.div>
    );
}
