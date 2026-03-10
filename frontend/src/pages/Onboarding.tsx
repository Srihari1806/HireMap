export default function Onboarding() {
    return (
        <div className="flex h-screen items-center justify-center bg-slate-50 flex-col gap-6 px-4">
            <div className="p-10 bg-white shadow-xl rounded-3xl border border-slate-200 max-w-2xl w-full">
                <div className="flex gap-2 mb-8">
                    {[1, 2, 3, 4, 5].map(step => (
                        <div key={step} className={`h-2 flex-1 rounded-full ${step === 1 ? 'bg-primary-600' : 'bg-slate-200'}`} />
                    ))}
                </div>
                <h2 className="text-3xl font-bold mb-4">Select your core skills</h2>
                <p className="text-slate-500 mb-8">We use this to calculate your readiness score.</p>

                <div className="flex flex-wrap gap-3 mb-8">
                    {['React', 'Node.js', 'Python', 'Java', 'DSA', 'SQL'].map(skill => (
                        <button key={skill} className="px-4 py-2 border-2 border-slate-200 rounded-full hover:border-primary-500 font-medium text-slate-700">{skill}</button>
                    ))}
                </div>

                <button className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg" type="button" onClick={() => window.location.href = '/jobs'}>Continue Build Profile</button>
            </div>
        </div>
    );
}
