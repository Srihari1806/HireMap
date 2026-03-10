import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import DashboardLayout from './layouts/DashboardLayout';
import JobHub from './pages/JobHub';
import CollegeHub from './pages/CollegeHub';
import JobDetail from './pages/JobDetail';
import JobRoadmap from './pages/JobRoadmap';
import Progress from './pages/Progress';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Dashboard Routes with Sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/jobs" element={<JobHub />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/jobs/:id/roadmap" element={<JobRoadmap />} />
          <Route path="/colleges" element={<CollegeHub />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}
