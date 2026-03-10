import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function JobDetail() {
    const { id } = useParams();

    return (
        <div className="max-w-4xl space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200">
                <h1 className="text-4xl font-extrabold mb-4">Frontend Engineer <span className="text-slate-400">@ Google</span></h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div className="p-4 bg-slate-50 rounded-xl"><p className="text-xs text-slate-500 font-bold">Openings</p><h3 className="text-2xl font-black text-slate-900 mt-1">45</h3></div>
                    <div className="p-4 bg-slate-50 rounded-xl"><p className="text-xs text-slate-500 font-bold">Applicants</p><h3 className="text-2xl font-black text-slate-900 mt-1">12,040</h3></div>
                    <div className="p-4 bg-slate-50 rounded-xl"><p className="text-xs text-slate-500 font-bold">Shortlist Ratio</p><h3 className="text-2xl font-black text-red-500 mt-1">0.3%</h3></div>
                    <div className="p-4 bg-slate-50 rounded-xl"><p className="text-xs text-slate-500 font-bold">Interviews</p><h3 className="text-2xl font-black text-slate-900 mt-1">4 Rounds</h3></div>
                </div>
            </div>

            <div className="bg-primary-50 p-8 rounded-3xl border border-primary-100 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-primary-900">Readiness Meter: <span className="text-primary-600">88%</span></h2>
                    <p className="text-primary-700 font-medium mt-2">Missing Skills: Advanced System Design (Frontend)</p>
                    <p className="text-primary-600 text-sm font-semibold">Estimated Prep Time: 3 Weeks</p>
                </div>
                <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-lg" onClick={() => window.location.href = `/jobs/${id}/roadmap`}>
                    Generate Roadmap
                </Button>
            </div>
        </div>
    );
}
