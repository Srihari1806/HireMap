import { motion } from 'framer-motion';

export default function JobRoadmap() {
    const weeks = [
        { title: "Week 1: Core JavaScript & React Patterns", done: true },
        { title: "Week 2: Advanced State & Performance", done: true },
        { title: "Week 3: Frontend System Design & Architecture", done: false },
        { title: "Week 4: Mock Interviews & Deployment Check", done: false }
    ];

    return (
        <div className="max-w-3xl py-8">
            <h1 className="text-3xl font-extrabold mb-2">Frontend Engineer Roadmap</h1>
            <p className="text-lg text-slate-500 mb-10 font-medium">Customized for your current skill gap (12% remaining)</p>

            <div className="relative pl-8 space-y-12 before:w-1 before:bg-slate-200 before:absolute before:left-3.5 before:top-4 before:bottom-0">
                {weeks.map((week, idx) => (
                    <motion.div key={idx} className="relative z-10"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className={`absolute -left-12 top-1.5 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white ${week.done ? 'bg-primary-600' : 'bg-slate-300'}`}>
                            {week.done && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <div className={`p-6 rounded-2xl border ${week.done ? 'bg-primary-50 border-primary-100' : 'bg-white border-slate-200 shadow-sm'}`}>
                            <h3 className={`text-xl font-bold mb-4 ${week.done ? 'text-primary-800' : 'text-slate-800'}`}>{week.title}</h3>
                            <div className="space-y-3">
                                <label className="flex gap-3 text-sm font-medium items-center cursor-pointer text-slate-600">
                                    <input type="checkbox" className="w-5 h-5 rounded text-primary-600" defaultChecked={week.done} /> Read: "Designing Data-Intensive Applications" JS Notes
                                </label>
                                <label className="flex gap-3 text-sm font-medium items-center cursor-pointer text-slate-600">
                                    <input type="checkbox" className="w-5 h-5 rounded text-primary-600" defaultChecked={week.done} /> Task: Build a paginated dynamic cache
                                </label>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
