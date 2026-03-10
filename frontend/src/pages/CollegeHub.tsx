import { motion } from 'framer-motion';

export default function CollegeHub() {
    return (
        <div className="max-w-3xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8 text-slate-900">College Reality Feed</h1>

            <div className="space-y-6">
                {[1, 2, 3].map((post) => (
                    <motion.div key={post} whileHover={{ y: -2 }} className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
                        <div className="flex justify-between items-center mb-4 text-sm">
                            <span className="font-bold text-slate-800">Anonymous Senior @ NIT</span>
                            <span className="text-slate-500">2 hours ago</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed font-medium mb-6">
                            "Reality Check: The 45 LPA package is mostly stock options vesting over 4 years. The base is 14 LPA. Focus on standardizing your DSA prep rather than chasing the highest number on the placement brochure."
                        </p>
                        <div className="flex gap-4">
                            <button className="text-primary-600 font-bold text-sm bg-primary-50 px-4 py-2 rounded-full">124 Helpful</button>
                            <button className="text-slate-500 font-bold text-sm px-4 py-2">8 Comments</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
