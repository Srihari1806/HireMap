import { motion } from 'framer-motion';
import { MapPin, BriefcaseIcon, DollarSign, Filter, ChevronRight, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function JobHub() {
    const JOBS = [
        { id: 1, role: 'Frontend Engineer', company: 'Google', location: 'Bangalore / Remote', salary: '25-45 LPA', match: 88, skills: ['React', 'TypeScript', 'System Design'] },
        { id: 2, role: 'SDE 1', company: 'Amazon', location: 'Hyderabad', salary: '30-45 LPA', match: 65, skills: ['Java', 'DSA', 'AWS'] },
        { id: 3, role: 'Software Engineer', company: 'Atlassian', location: 'Remote', salary: '50-80 LPA', match: 42, skills: ['Go', 'React', 'Distributed Systems'] },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
            <aside className="w-full lg:w-72 shrink-0 space-y-6 sticky top-24">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Job Filters</h2>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700 block mb-2">Smart Filters</label>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 p-2 focus-within:bg-slate-50 hover:bg-slate-50 cursor-pointer rounded-lg border border-transparent transition-colors">
                                    <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4 bg-slate-100 border-slate-300" defaultChecked />
                                    <span className="text-sm text-slate-700 font-medium">Jobs I qualify for</span>
                                </label>
                                <label className="flex items-center gap-2 p-2 hover:bg-slate-50 cursor-pointer rounded-lg border border-transparent transition-colors">
                                    <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4 bg-slate-100 border-slate-300" />
                                    <span className="text-sm text-slate-700 font-medium">Low competition</span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 block mb-2">Role/Sector</label>
                            <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none">
                                <option>Software Engineering</option>
                                <option>Data Science</option>
                                <option>Product Management</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 block mb-2">Min Stipend / Salary</label>
                            <input type="range" min="0" max="100" defaultValue="15" className="w-full accent-primary-600" />
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>0</span>
                                <span>15+ LPA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <div className="flex-1 space-y-4">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900">Job Opportunities</h1>
                        <p className="text-slate-500 mt-1">Data-backed allocations & reality-checked openings</p>
                    </div>
                    <Button variant="outline" className="gap-2 hidden sm:flex">
                        <Filter className="w-4 h-4" /> Reset
                    </Button>
                </div>

                {JOBS.map((job) => (
                    <motion.div
                        key={job.id}
                        whileHover={{ y: -2 }}
                        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 items-start sm:items-center relative overflow-hidden group hover:border-primary-200"
                    >
                        <div className="absolute top-0 right-0 p-4">
                            <div className={`px-3 py-1 text-xs font-bold rounded-full border ${job.match > 80 ? 'bg-green-50 text-green-700 border-green-200' : job.match > 50 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                {job.match}% Match
                            </div>
                        </div>

                        <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 font-bold text-2xl text-slate-400">
                            {job.company[0]}
                        </div>

                        <div className="flex-1 space-y-1">
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors">{job.role}</h3>
                            <p className="text-slate-500 font-medium">{job.company}</p>

                            <div className="flex flex-wrap gap-4 pt-2 text-sm text-slate-600">
                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {job.location}</span>
                                <span className="flex items-center gap-1.5"><BriefcaseIcon className="w-4 h-4 text-slate-400" /> Full Time</span>
                                <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-slate-400" /> {job.salary}</span>
                            </div>

                            <div className="flex gap-2 pt-3">
                                {job.skills.map(s => (
                                    <span key={s} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">{s}</span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                            <Button className="w-full gap-2 group-hover:bg-primary-700 transition-colors">
                                Job Details <ChevronRight className="w-4 h-4" />
                            </Button>
                            <Button variant="secondary" className="w-full gap-2 !bg-primary-50 !text-primary-700 hover:!bg-primary-100">
                                <Zap className="w-4 h-4" /> Prep Roadmap
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
