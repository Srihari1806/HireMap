export default function Progress() {
    return (
        <div>
            <h1 className="text-3xl font-extrabold mb-8">Your Journey</h1>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="p-8 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-3xl text-white shadow-xl">
                    <p className="text-primary-100 font-bold mb-2">Current Streak</p>
                    <h2 className="text-6xl font-black">14 Days</h2>
                    <p className="mt-4 font-medium opacity-80">Top 5% consistency this week!</p>
                </div>

                <div className="p-8 bg-white border border-slate-200 rounded-3xl col-span-2 shadow-sm">
                    <h3 className="text-xl font-bold mb-6">Skills Mastered</h3>
                    <div className="flex flex-wrap gap-3">
                        {['React', 'CSS', 'JavaScript', 'Node.js', 'Express', 'SQL', 'Git', 'TypeScript'].map(s => (
                            <span key={s} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-sm rounded-xl">✓ {s}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
