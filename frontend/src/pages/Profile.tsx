export default function Profile() {
    return (
        <div className="max-w-2xl bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-primary-100 text-primary-700 text-4xl font-bold rounded-full flex items-center justify-center border-4 border-primary-200">
                    JS
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">John Student</h1>
                    <p className="text-slate-500 font-medium">B.Tech Computer Science @ Tier 2</p>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="text-sm font-bold text-slate-500">CGPA</label>
                    <p className="text-xl font-bold">8.4 / 10.0</p>
                </div>
                <div>
                    <label className="text-sm font-bold text-slate-500">Graduation Year</label>
                    <p className="text-xl font-bold">2027</p>
                </div>
                <div>
                    <label className="text-sm font-bold text-slate-500">Career Focus</label>
                    <p className="text-xl font-bold text-slate-900">Frontend & Full-stack Engineering</p>
                </div>

                <button className="text-red-500 font-bold text-sm bg-red-50 px-4 py-2 rounded-lg mt-8 border border-red-200">Logout</button>
            </div>
        </div>
    )
}
