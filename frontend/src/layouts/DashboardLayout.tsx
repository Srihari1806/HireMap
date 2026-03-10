import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, Briefcase, Map as MapIcon, Target, User, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
    { name: 'Feed', path: '/feed', icon: LayoutDashboard },
    { name: 'Colleges', path: '/colleges', icon: GraduationCap },
    { name: 'Jobs', path: '/jobs', icon: Briefcase },
    { name: 'Roadmaps', path: '/jobs/roadmap', icon: MapIcon },
    { name: 'Progress', path: '/progress', icon: Target },
    { name: 'Profile', path: '/profile', icon: User },
];

export default function DashboardLayout() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r border-slate-200 fixed h-screen p-4 flex flex-col gap-8 hidden md:flex z-10">
                <div className="flex items-center gap-2 px-2 pt-4 text-primary-600 font-bold text-xl tracking-tight">
                    <MapIcon className="w-7 h-7" /> HireMap
                </div>

                <nav className="flex-1 space-y-2 relative">
                    {NAV_ITEMS.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all font-medium relative z-10 ${isActive ? 'text-primary-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-primary-100 rounded-xl -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-slate-400'}`} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 bg-slate-100 rounded-xl space-y-2">
                    <p className="text-sm font-semibold">Readiness Score</p>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '64%' }}
                            className="bg-primary-500 h-full"
                        />
                    </div>
                    <p className="text-xs text-slate-500">You are 64% ready for SDE roles</p>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 md:ml-64 relative min-h-screen pb-20 md:pb-0">
                <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            className="w-full bg-slate-100 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-slate-400"
                            placeholder="Search companies, paths, or skills..."
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold border-2 border-primary-200">
                            U
                        </div>
                    </div>
                </header>

                <div className="p-6 lg:p-10 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
