import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import DashboardLayout from './layouts/DashboardLayout';
import StudentDashboard from './pages/StudentDashboard';
import JobHub from './pages/JobHub';
import JobDetail from './pages/JobDetail';
import JobRoadmap from './pages/JobRoadmap';
import CollegeHub from './pages/CollegeHub';
import { CollegeDetail, CompanyPortal } from './pages/Stubs';
import Community from './pages/Community';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Resume from './pages/Resume';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/company" element={<CompanyPortal />} />

                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<StudentDashboard />} />
                    <Route path="/jobs" element={<JobHub />} />
                    <Route path="/jobs/:id" element={<JobDetail />} />
                    <Route path="/jobs/:id/roadmap" element={<JobRoadmap />} />
                    <Route path="/colleges" element={<CollegeHub />} />
                    <Route path="/colleges/:id" element={<CollegeDetail />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/resume" element={<Resume />} />
                </Route>
            </Routes>
        </Router>
    );
}
