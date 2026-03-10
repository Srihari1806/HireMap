export default function Auth() {
    return (
        <div className="flex h-screen items-center justify-center bg-slate-50 flex-col gap-6">
            <div className="p-10 bg-white shadow-xl rounded-3xl border border-slate-200 max-w-md w-full">
                <h2 className="text-3xl font-bold mb-8 text-center">Welcome Back</h2>
                <form className="space-y-4">
                    <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Email Address" type="email" />
                    <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Password" type="password" />
                    <button className="w-full bg-primary-600 text-white p-3 rounded-lg font-bold hover:bg-primary-700 transition" type="button" onClick={() => window.location.href = '/onboarding'}>Sign In</button>
                </form>
            </div>
        </div>
    );
}
